import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

const root = process.cwd();
const repositorySource = fs.readFileSync(path.join(root, "src/server/repositories/profile.repository.js"), "utf8");
const controllerSource = fs.readFileSync(path.join(root, "src/server/controllers/legacy-scopes.controller.js"), "utf8");

test("Scopes keeps Old-BE list/detail/delete/update routes", () => {
  assert.ok(controllerSource.includes("/scopes"));
  assert.ok(controllerSource.includes("/updatescopes"));
  assert.ok(controllerSource.includes('const DETAIL_RE = /^\\/detailscopes\\/([^/]+)$/;'));
  assert.ok(controllerSource.includes('const DELETE_RE = /^\\/deletescopes\\/([^/]+)$/;'));
  assert.match(controllerSource, /legacyRedirect\(request, "\/scp"\)/);
  assert.match(controllerSource, /row \? \[row\] : \{ success: false \}/);
});

test("legacy Scope update preserves Old-BE always-images branch", () => {
  const legacyUpdate = repositorySource.match(/async legacyUpdateScope\(data\) \{([\s\S]*?)\n  \},/);
  assert.ok(legacyUpdate, "legacyUpdateScope must exist");
  assert.match(legacyUpdate[1], /UPDATE scopes set title=\$1, icon=\$2, title_en=\$3, description=\$4, description_en=\$5, image=\$6 where id = \$7/);
  assert.match(legacyUpdate[1], /data\?\.images/);
  assert.doesNotMatch(legacyUpdate[1], /if \(/);
});

test("modern Scope update remains separate from compatibility behavior", () => {
  const modernUpdate = repositorySource.match(/async updateScope\(id, data\) \{([\s\S]*?)\n  \},\n  async legacyUpdateScope/);
  assert.ok(modernUpdate, "modern updateScope must remain available");
  assert.match(modernUpdate[1], /if \(data\.images\)/);
});
