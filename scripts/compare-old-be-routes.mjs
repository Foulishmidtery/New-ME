import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { execFileSync } from "node:child_process";

const projectRoot = process.cwd();
const baselinePath = path.join(projectRoot, "migration", "old-be-baseline.json");
const manifestPath = path.join(projectRoot, "src", "server", "legacy-route-manifest.js");
const baseline = JSON.parse(fs.readFileSync(baselinePath, "utf8"));
const oldBeRoot = resolveOldBeRoot(process.argv.slice(2));
const oldAppPath = path.join(oldBeRoot, "app.js");

if (!fs.existsSync(oldAppPath)) {
  fail(`Old-BE app.js tidak ditemukan: ${oldAppPath}`);
}

verifyOldBeCommit(oldBeRoot, baseline.commit);

const oldRoutes = extractOldBeDbRoutes(fs.readFileSync(oldAppPath, "utf8"));
const newRoutes = extractManifestRoutes(fs.readFileSync(manifestPath, "utf8"));
const result = compareRoutes(oldRoutes, newRoutes);

console.log(`Old-BE baseline : ${baseline.repository}@${baseline.commit}`);
console.log(`Old-BE route DB : ${oldRoutes.length}`);
console.log(`New-ME manifest : ${newRoutes.length}`);
console.log(`Missing routes   : ${result.missing.length}`);
console.log(`Extra routes     : ${result.extra.length}`);
console.log(`Handler mismatch : ${result.handlerMismatch.length}`);
console.log(`Duplicate Old-BE : ${result.oldDuplicates.length}`);
console.log(`Duplicate New-ME : ${result.newDuplicates.length}`);

printSection("MISSING", result.missing);
printSection("EXTRA", result.extra);
printSection("HANDLER MISMATCH", result.handlerMismatch);
printSection("OLD DUPLICATES", result.oldDuplicates);
printSection("NEW DUPLICATES", result.newDuplicates);

if (result.missing.length || result.handlerMismatch.length) {
  process.exitCode = 1;
} else {
  console.log("Route compatibility baseline: PASS");
}

function resolveOldBeRoot(args) {
  const index = args.indexOf("--old-be");
  if (index !== -1 && args[index + 1]) return path.resolve(args[index + 1]);
  if (process.env.OLD_BE_PATH) return path.resolve(process.env.OLD_BE_PATH);
  return path.resolve(projectRoot, "..", "Old-BE");
}

function verifyOldBeCommit(repoRoot, expectedCommit) {
  let actual;
  try {
    actual = execFileSync("git", ["-C", repoRoot, "rev-parse", "HEAD"], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    }).trim();
  } catch {
    console.warn("Peringatan: commit Old-BE tidak dapat diverifikasi dengan git; perbandingan source tetap dilanjutkan.");
    return;
  }

  if (actual !== expectedCommit) {
    fail(`Old-BE checkout tidak berada pada baseline yang dikunci. Expected ${expectedCommit}, actual ${actual}.`);
  }
}

function extractOldBeDbRoutes(source) {
  const routes = [];
  const callStart = /apps\.(get|post|put|patch|delete)\s*\(/g;
  let match;

  while ((match = callStart.exec(source))) {
    const method = match[1].toUpperCase();
    const openIndex = source.indexOf("(", match.index);
    const closeIndex = findMatchingParen(source, openIndex);
    if (closeIndex === -1) continue;

    const body = source.slice(openIndex + 1, closeIndex);
    const pathMatch = body.match(/^\s*(["'`])([^"'`]+)\1/);
    const handlerMatches = [...body.matchAll(/\bdb\.([A-Za-z_$][\w$]*)\b/g)];
    if (!pathMatch || handlerMatches.length === 0) {
      callStart.lastIndex = closeIndex + 1;
      continue;
    }

    const handler = handlerMatches.at(-1)[1];
    routes.push({ method, pattern: pathMatch[2], handler });
    callStart.lastIndex = closeIndex + 1;
  }

  return routes;
}

function findMatchingParen(source, openIndex) {
  let depth = 0;
  let quote = null;
  let escaped = false;
  let lineComment = false;
  let blockComment = false;

  for (let i = openIndex; i < source.length; i += 1) {
    const char = source[i];
    const next = source[i + 1];

    if (lineComment) {
      if (char === "\n") lineComment = false;
      continue;
    }
    if (blockComment) {
      if (char === "*" && next === "/") {
        blockComment = false;
        i += 1;
      }
      continue;
    }
    if (quote) {
      if (escaped) {
        escaped = false;
        continue;
      }
      if (char === "\\") {
        escaped = true;
        continue;
      }
      if (char === quote) quote = null;
      continue;
    }

    if (char === "/" && next === "/") {
      lineComment = true;
      i += 1;
      continue;
    }
    if (char === "/" && next === "*") {
      blockComment = true;
      i += 1;
      continue;
    }
    if (char === '"' || char === "'" || char === "`") {
      quote = char;
      continue;
    }
    if (char === "(") depth += 1;
    if (char === ")") {
      depth -= 1;
      if (depth === 0) return i;
    }
  }

  return -1;
}

function extractManifestRoutes(source) {
  const marker = "export const legacyRoutes =";
  const markerIndex = source.indexOf(marker);
  if (markerIndex === -1) fail("legacyRoutes tidak ditemukan pada manifest New-ME.");

  const arrayStart = source.indexOf("[", markerIndex + marker.length);
  const arrayEnd = findArrayEnd(source, arrayStart);
  if (arrayStart === -1 || arrayEnd === -1) fail("Array legacyRoutes tidak dapat dibaca.");

  try {
    return JSON.parse(source.slice(arrayStart, arrayEnd + 1));
  } catch (error) {
    fail(`legacyRoutes bukan JSON-compatible array: ${error.message}`);
  }
}

function findArrayEnd(source, start) {
  let depth = 0;
  let quote = null;
  let escaped = false;
  for (let i = start; i < source.length; i += 1) {
    const char = source[i];
    if (quote) {
      if (escaped) escaped = false;
      else if (char === "\\") escaped = true;
      else if (char === quote) quote = null;
      continue;
    }
    if (char === '"') {
      quote = char;
      continue;
    }
    if (char === "[") depth += 1;
    if (char === "]") {
      depth -= 1;
      if (depth === 0) return i;
    }
  }
  return -1;
}

function compareRoutes(oldRoutes, newRoutes) {
  const oldMap = groupByKey(oldRoutes);
  const newMap = groupByKey(newRoutes);
  const missing = [];
  const extra = [];
  const handlerMismatch = [];

  for (const [key, oldItems] of oldMap) {
    const newItems = newMap.get(key);
    if (!newItems) {
      missing.push(formatRoute(oldItems[0]));
      continue;
    }
    const oldHandlers = new Set(oldItems.map((item) => item.handler));
    const newHandlers = new Set(newItems.map((item) => item.handler));
    if (![...oldHandlers].every((handler) => newHandlers.has(handler))) {
      handlerMismatch.push(`${key}: Old=[${[...oldHandlers].join(", ")}] New=[${[...newHandlers].join(", ")}]`);
    }
  }

  for (const [key, items] of newMap) {
    if (!oldMap.has(key)) extra.push(formatRoute(items[0]));
  }

  return {
    missing,
    extra,
    handlerMismatch,
    oldDuplicates: duplicateEntries(oldMap),
    newDuplicates: duplicateEntries(newMap),
  };
}

function groupByKey(routes) {
  const map = new Map();
  routes.forEach((route) => {
    const key = `${route.method} ${route.pattern}`;
    const items = map.get(key) || [];
    items.push(route);
    map.set(key, items);
  });
  return map;
}

function duplicateEntries(map) {
  return [...map.entries()]
    .filter(([, items]) => items.length > 1)
    .map(([key, items]) => `${key}: ${items.map((item) => item.handler).join(", ")}`);
}

function formatRoute(route) {
  return `${route.method} ${route.pattern} -> ${route.handler}`;
}

function printSection(title, items) {
  if (!items.length) return;
  console.log(`\n${title}`);
  items.forEach((item) => console.log(`- ${item}`));
}

function fail(message) {
  console.error(message);
  process.exit(1);
}
