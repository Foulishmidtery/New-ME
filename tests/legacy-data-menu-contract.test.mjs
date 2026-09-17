import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

const root = process.cwd();
const repositorySource = fs.readFileSync(
  path.join(root, "src/server/repositories/data-menu.repository.js"),
  "utf8",
);
const controllerSource = fs.readFileSync(
  path.join(root, "src/server/controllers/legacy-data-menu.controller.js"),
  "utf8",
);

test("modern Data Menu remains additive and keeps deterministic ordering", () => {
  assert.match(repositorySource, /SELECT \$\{columns\} FROM data_menu ORDER BY data_sort ASC, id ASC/);
});

test("legacy Data Menu list keeps Old-BE SELECT without ordering", () => {
  const legacyList = repositorySource.match(/async legacyList\(\) \{([\s\S]*?)\n  \},/);
  assert.ok(legacyList, "legacyList repository method must exist");
  assert.match(legacyList[1], /SELECT \* FROM data_menu/);
  assert.doesNotMatch(legacyList[1], /ORDER BY/i);
});

test("legacy Data Menu mutation SQL does not introduce RETURNING or coercion", () => {
  const compatibilitySection = repositorySource.slice(repositorySource.indexOf("async legacyList"));
  assert.doesNotMatch(compatibilitySection, /RETURNING/i);
  assert.doesNotMatch(compatibilitySection, /Number\(/);
});

test("legacy Data Menu keeps Old-BE paths and redirect contract", () => {
  for (const pathname of [
    "/data_menu",
    "/detail_data_menus/",
    "/delete_data_menu/",
    "/insert_data_menu",
    "/update_data_menu",
  ]) {
    assert.ok(controllerSource.includes(pathname), `missing legacy path ${pathname}`);
  }
  assert.match(controllerSource, /legacyRedirect\(request, "\/menu_data"\)/);
  assert.match(controllerSource, /rows\.length \? rows : \{ success: false \}/);
  assert.match(controllerSource, /status: 200/);
});
