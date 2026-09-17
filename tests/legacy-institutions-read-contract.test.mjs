import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

const root = process.cwd();
const repositorySource = fs.readFileSync(
  path.join(root, "src/server/repositories/profile.repository.js"),
  "utf8",
);
const serviceSource = fs.readFileSync(
  path.join(root, "src/server/services/profile.service.js"),
  "utf8",
);
const controllerSource = fs.readFileSync(
  path.join(root, "src/server/controllers/legacy-institutions-read.controller.js"),
  "utf8",
);
const routeSource = fs.readFileSync(
  path.join(root, "src/app/[...legacy]/route.js"),
  "utf8",
);

test("Institution list/detail SQL keeps Old-BE read semantics", () => {
  assert.match(repositorySource, /SELECT \* FROM institutions ORDER BY id ASC/);
  assert.match(repositorySource, /SELECT \* FROM institutions WHERE id=\$1/);
  assert.match(serviceSource, /listInstitutions: \(\) => profileRepository\.listInstitutions\(\)/);
  assert.match(serviceSource, /getInstitution: \(id\) => profileRepository\.getInstitution\(id\)/);
});

test("Institution native controller owns only list and detail GET routes", () => {
  assert.match(controllerSource, /request\.method !== "GET"/);
  assert.ok(controllerSource.includes('pathname === "/institutions"'));
  assert.match(controllerSource, /DETAIL_RE = \/\^\\\/detailinstitutions\\\//);
  assert.doesNotMatch(controllerSource, /insertinstitution|updateinstitution|deleteinstitutions/);
});

test("Institution empty response and detail array shape match Old-BE", () => {
  assert.match(
    controllerSource,
    /Response\.json\(rows\.length \? rows : \{ success: false \}, \{ status: 200 \}\)/,
  );
  assert.match(
    controllerSource,
    /Response\.json\(row \? \[row\] : \{ success: false \}, \{ status: 200 \}\)/,
  );
});

test("Institution upload mutations remain outside the read-only slice", () => {
  for (const pathname of ["/insertinstitution", "/updateinstitution", "/deleteinstitutions/"]) {
    assert.ok(!controllerSource.includes(pathname), `read slice widened to ${pathname}`);
  }

  const executableSource = controllerSource
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\/\/.*$/gm, "");
  assert.doesNotMatch(executableSource, /public\/uploads|node:fs|req\.file|formData\(/);
});

test("Institution reads dispatch before generic legacy fallback", () => {
  const nativeIndex = routeSource.indexOf("handleLegacyInstitutionsRead(request)");
  const fallbackIndex = routeSource.indexOf("handleLegacyApi(request)");
  assert.ok(nativeIndex >= 0);
  assert.ok(fallbackIndex > nativeIndex);
});
