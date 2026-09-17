import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

const root = process.cwd();
const controllerSource = fs.readFileSync(
  path.join(root, "src/server/controllers/legacy-hotissue-category.controller.js"),
  "utf8",
);
const serviceSource = fs.readFileSync(
  path.join(root, "src/server/services/hotissue.service.js"),
  "utf8",
);
const repositorySource = fs.readFileSync(
  path.join(root, "src/server/repositories/hotissue.repository.js"),
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

const categoryRepositorySource = repositorySource.split("// Sub Categories")[0];

test("Hot Issue Category keeps the five Old-BE legacy routes", () => {
  for (const [method, pattern, handler] of [
    ["GET", "/hotissuecategory", "hotissuecategory"],
    ["GET", "/detailhotissuecategory/:id", "detailhotissuecategory"],
    ["POST", "/inserthotissuecategory", "inserthotissuecategory"],
    ["POST", "/updatehotissuecategory", "updatehotissuecategory"],
    ["GET", "/deletehotissuecategory/:id", "deletehotissuecategory"],
  ]) {
    const routePattern = new RegExp(
      `"method": "${method}",\\s*"pattern": "${pattern.replaceAll("/", "\\/")}",\\s*"handler": "${handler}"`,
    );
    assert.match(manifestSource, routePattern, `missing ${method} ${pattern}`);
  }
});

test("Hot Issue Category keeps Old-BE SQL semantics without ordering or filesystem side effects", () => {
  assert.match(categoryRepositorySource, /SELECT \* FROM hot_categories/);
  assert.doesNotMatch(categoryRepositorySource, /ORDER BY/);
  assert.match(categoryRepositorySource, /SELECT \* FROM hot_categories WHERE id = \$1/);
  assert.match(categoryRepositorySource, /INSERT INTO hot_categories\(title, title_en\) VALUES\(\$1, \$2\)/);
  assert.match(categoryRepositorySource, /UPDATE hot_categories SET title=\$1, title_en=\$2 WHERE id = \$3/);
  assert.match(categoryRepositorySource, /DELETE FROM hot_categories WHERE id=\$1/);
  assert.doesNotMatch(categoryRepositorySource, /writeFile|unlink|mkdir|fs\.|uploads?\//);
});

test("Hot Issue Category service remains HTTP independent", () => {
  assert.match(serviceSource, /listCategories: \(\) => hotissueRepository\.listCategories\(\)/);
  assert.match(serviceSource, /getCategory: \(id\) => hotissueRepository\.getCategory\(id\)/);
  assert.match(serviceSource, /createCategory: \(data\) => hotissueRepository\.createCategory\(data\)/);
  assert.match(serviceSource, /updateCategory: \(id, data\) => hotissueRepository\.updateCategory\(id, data\)/);
  assert.match(serviceSource, /removeCategory: \(id\) => hotissueRepository\.removeCategory\(id\)/);
});

test("Hot Issue Category compatibility controller preserves response and redirect contract", () => {
  assert.ok(controllerSource.includes('pathname === "/hotissuecategory"'));
  assert.ok(controllerSource.includes('const DETAIL_RE = /^\\/detailhotissuecategory\\/([^/]+)$/;'));
  assert.ok(controllerSource.includes('const DELETE_RE = /^\\/deletehotissuecategory\\/([^/]+)$/;'));
  assert.ok(controllerSource.includes('pathname === "/inserthotissuecategory"'));
  assert.ok(controllerSource.includes('pathname === "/updatehotissuecategory"'));
  assert.match(controllerSource, /rows\.length \? rows : \{ success: false \}/);
  assert.match(controllerSource, /row \? \[row\] : \{ success: false \}/);
  assert.match(controllerSource, /legacyRedirect\(request, "\/hic"\)/);
  assert.match(controllerSource, /Response\.redirect\(new URL\(pathname, request\.url\), 302\)/);
  assert.doesNotMatch(controllerSource, /hotissuesubcategory|inserthotissue|updatehotissue|deletehotissue[^c]/);
  assert.doesNotMatch(controllerSource, /writeFile|unlink|mkdir|validateUpload/);
});

test("Hot Issue Category native slice dispatches before generic legacy adapter", () => {
  const nativeIndex = routeSource.indexOf("handleLegacyHotIssueCategory(request)");
  const fallbackIndex = routeSource.indexOf("handleLegacyApi(request)");
  assert.ok(nativeIndex >= 0);
  assert.ok(fallbackIndex > nativeIndex);
});
