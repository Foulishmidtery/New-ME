import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

const root = process.cwd();
const repositorySource = fs.readFileSync(
  path.join(root, "src/server/repositories/roles-reference.repository.js"),
  "utf8",
);
const serviceSource = fs.readFileSync(
  path.join(root, "src/server/services/roles-reference.service.js"),
  "utf8",
);
const controllerSource = fs.readFileSync(
  path.join(root, "src/server/controllers/legacy-roles-reference.controller.js"),
  "utf8",
);
const routeSource = fs.readFileSync(
  path.join(root, "src/app/[...legacy]/route.js"),
  "utf8",
);
const manifestSource = fs.readFileSync(
  path.join(root, "src/server/legacy-route-manifest.js"),
  "utf8",
);

test("Roles lookup keeps Old-BE route and SQL source semantics", () => {
  assert.match(manifestSource, /"method": "GET",\s*"pattern": "\/roles",\s*"handler": "userroles"/);
  assert.match(repositorySource, /SELECT \* FROM roles/);
  assert.doesNotMatch(repositorySource, /ORDER BY|WHERE|RETURNING/);
});

test("Roles service stays free of HTTP req/res concerns", () => {
  assert.match(serviceSource, /list: \(\) => rolesReferenceRepository\.list\(\)/);
  assert.doesNotMatch(serviceSource, /\breq\b|\bres\b|Response|redirect/);
});

test("Roles compatibility controller owns only GET /roles and preserves empty result shape", () => {
  assert.match(controllerSource, /request\.method !== "GET"/);
  assert.ok(controllerSource.includes('pathname !== "/roles"'));
  assert.match(controllerSource, /rows\.length \? rows : \{ success: false \}/);
  assert.match(controllerSource, /\{ status: 200 \}/);
  assert.doesNotMatch(controllerSource, /insertusers|updateusers|deleteuser|changespassword|approveusers/);
});

test("Roles native slice dispatches before generic legacy adapter", () => {
  const nativeIndex = routeSource.indexOf("handleLegacyRolesReference(request)");
  const fallbackIndex = routeSource.indexOf("handleLegacyApi(request)");
  assert.ok(nativeIndex >= 0);
  assert.ok(fallbackIndex > nativeIndex);
});
