import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { execFileSync } from "node:child_process";
import { legacyPages } from "../src/config/legacy-pages.js";
import { legacyPageRolePolicies } from "../src/config/role-policies.js";

const projectRoot = process.cwd();
const baselinePath = path.join(projectRoot, "migration", "old-be-baseline.json");
const baseline = JSON.parse(fs.readFileSync(baselinePath, "utf8"));
const oldBeRoot = resolveOldBeRoot(process.argv.slice(2));
const oldAppPath = path.join(oldBeRoot, "app.js");

if (!fs.existsSync(oldAppPath)) fail(`Old-BE app.js tidak ditemukan: ${oldAppPath}`);
verifyOldBeCommit(oldBeRoot, baseline.commit);

const source = fs.readFileSync(oldAppPath, "utf8");
const extracted = extractProtectedPagePolicies(source);
const configured = new Map(Object.entries(legacyPageRolePolicies));
const errors = [];

for (const item of extracted.protectedPages) {
  const policy = configured.get(item.pageKey);
  if (!policy) {
    errors.push(`MISSING ${item.pageKey}: ${item.method} ${item.legacyRoute} roles=[${item.allowedRoles.join(",")}]`);
    continue;
  }

  compareField(errors, item.pageKey, "legacyRoute", item.legacyRoute, policy.legacyRoute);
  compareField(errors, item.pageKey, "cookie", "roles_id", policy.cookie);
  compareField(errors, item.pageKey, "redirect status", 302, policy.unauthorized?.status);
  compareField(errors, item.pageKey, "redirect location", item.redirectLocation, policy.unauthorized?.location);

  const expectedRoles = [...item.allowedRoles].sort((a, b) => a - b);
  const actualRoles = [...(policy.allowedRoles || [])].sort((a, b) => a - b);
  if (JSON.stringify(expectedRoles) !== JSON.stringify(actualRoles)) {
    errors.push(`${item.pageKey}: roles Old-BE=[${expectedRoles.join(",")}] New-ME=[${actualRoles.join(",")}]`);
  }

  const definition = legacyPages[item.pageKey];
  if (!definition) {
    errors.push(`${item.pageKey}: tidak mempunyai metadata halaman New-ME`);
  } else if (definition.source !== item.source) {
    errors.push(`${item.pageKey}: source Old-BE=${item.source} New-ME=${definition.source}`);
  }
}

const extractedKeys = new Set(extracted.protectedPages.map((item) => item.pageKey));
for (const [pageKey, policy] of configured) {
  if (!extractedKeys.has(pageKey)) {
    errors.push(`EXTRA ${pageKey}: configured ${policy.legacyRoute} tetapi tidak ditemukan sebagai guarded sendFile Old-BE`);
  }
}

const allowedPublicSources = new Set(["login.html", "home.html", "register.html"]);
for (const item of extracted.publicPages) {
  if (!allowedPublicSources.has(item.source)) {
    errors.push(`UNEXPECTED PUBLIC PAGE ${item.method} ${item.legacyRoute} -> ${item.source}`);
  }
}

console.log(`Old-BE baseline       : ${baseline.repository}@${baseline.commit}`);
console.log(`Guarded CMS pages     : ${extracted.protectedPages.length}`);
console.log(`Configured policies   : ${configured.size}`);
console.log(`Public sendFile pages : ${extracted.publicPages.length}`);
console.log(`Policy mismatches     : ${errors.length}`);

if (errors.length) {
  console.error("\nROLE POLICY MISMATCHES");
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log("CMS role policy compatibility baseline: PASS");

function extractProtectedPagePolicies(appSource) {
  const protectedPages = [];
  const publicPages = [];
  const callStart = /apps\.(get|post|put|patch|delete)\s*\(/g;
  let match;

  while ((match = callStart.exec(appSource))) {
    const method = match[1].toUpperCase();
    const openIndex = appSource.indexOf("(", match.index);
    const closeIndex = findMatchingParen(appSource, openIndex);
    if (closeIndex === -1) continue;

    const body = appSource.slice(openIndex + 1, closeIndex);
    const pathMatch = body.match(/^\s*(["'`])([^"'`]+)\1/);
    if (!pathMatch) {
      callStart.lastIndex = closeIndex + 1;
      continue;
    }

    const sendFileMatch = body.match(/["']\.\/views\/([^"']+\.html)["']/);
    if (!sendFileMatch) {
      callStart.lastIndex = closeIndex + 1;
      continue;
    }

    const legacyRoute = pathMatch[2];
    const source = sendFileMatch[1];
    const pageKey = source.replace(/\.html$/, "");
    const usesRoleCookie = /req\.cookies\.roles_id/.test(body);

    if (!usesRoleCookie) {
      publicPages.push({ method, legacyRoute, source, pageKey });
      callStart.lastIndex = closeIndex + 1;
      continue;
    }

    const roles = new Set();
    for (const roleMatch of body.matchAll(/(?:role_id_users|req\.cookies\.roles_id)\s*==\s*["']?(\d+)["']?/g)) {
      roles.add(Number(roleMatch[1]));
    }

    const redirectMatch = body.match(/res\.redirect\(\s*["']([^"']+)["']\s*\)/);
    protectedPages.push({
      method,
      legacyRoute,
      source,
      pageKey,
      allowedRoles: [...roles].sort((a, b) => a - b),
      redirectLocation: redirectMatch?.[1] ?? null,
    });

    callStart.lastIndex = closeIndex + 1;
  }

  return { protectedPages, publicPages };
}

function resolveOldBeRoot(args) {
  const index = args.indexOf("--old-be");
  if (index !== -1 && args[index + 1]) return path.resolve(args[index + 1]);
  if (process.env.OLD_BE_PATH) return path.resolve(process.env.OLD_BE_PATH);
  return path.resolve(projectRoot, "..", "Old-BE");
}

function verifyOldBeCommit(repoRoot, expectedCommit) {
  try {
    const actual = execFileSync("git", ["-C", repoRoot, "rev-parse", "HEAD"], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    }).trim();
    if (actual !== expectedCommit) {
      fail(`Old-BE checkout bukan baseline terkunci. Expected ${expectedCommit}, actual ${actual}.`);
    }
  } catch (error) {
    if (error?.message?.startsWith("Old-BE checkout")) throw error;
    console.warn("Peringatan: commit Old-BE tidak dapat diverifikasi dengan git; source comparison tetap dilanjutkan.");
  }
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
      if (escaped) escaped = false;
      else if (char === "\\") escaped = true;
      else if (char === quote) quote = null;
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

function compareField(errors, pageKey, field, expected, actual) {
  if (expected !== actual) errors.push(`${pageKey}: ${field} Old-BE=${expected} New-ME=${actual}`);
}

function fail(message) {
  console.error(message);
  process.exit(1);
}
