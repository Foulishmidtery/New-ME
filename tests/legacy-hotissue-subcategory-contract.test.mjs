import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

const root = process.cwd();
const controllerSource = fs.readFileSync(
  path.join(root, "src/server/controllers/legacy-hotissue-subcategory.controller.js"),
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

const subcategoryRepositorySource = repositorySource
  .split("// Sub Categories")[1]
  .split("// Hot Issues")[0];
const legacySubcategoryRepositorySource = repositorySource
  .split("// Legacy Sub Category compatibility")[1]
  .split("// Hot Issues")[0];
const legacySubcategoryExecutableSource = legacySubcategoryRepositorySource.replace(
  /\/\/.*$/gm,
  "",
);

test("Hot Issue Subcategory keeps the five exact Old-BE routes including insert typo", () => {
  for (const [method, pattern, handler] of [
    ["GET", "/hotissuesubcategory", "hotissuesubcategory"],
    ["GET", "/detailhotissuesubcategory/:id", "detailhotissuesubcategory"],
    ["POST", "/inserthotissubcategory", "inserthotissubcategory"],
    ["POST", "/updatehotissuesubcategory", "updatehotissuesubcategory"],
    ["GET", "/deletehotissuesubcategory/:id", "deletehotissuesubcategory"],
  ]) {
    const routePattern = new RegExp(
      `"method": "${method}",\\s*"pattern": "${pattern.replaceAll("/", "\\/")}",\\s*"handler": "${handler}"`,
    );
    assert.match(manifestSource, routePattern, `missing ${method} ${pattern}`);
  }

  assert.doesNotMatch(manifestSource, /"pattern": "\/inserthotissuesubcategory"/);
});

test("Hot Issue Subcategory list/detail keep Old-BE SQL source and no ordering", () => {
  assert.match(subcategoryRepositorySource, /SELECT \* FROM hot_subcategories/);
  assert.match(subcategoryRepositorySource, /SELECT \* FROM hot_subcategories WHERE id = \$1/);
  assert.doesNotMatch(subcategoryRepositorySource, /ORDER BY/);
});

test("Hot Issue Subcategory legacy mutations preserve split values and no RETURNING", () => {
  assert.match(legacySubcategoryRepositorySource, /data\.hot_category_id\.split\('-'\)/);
  assert.match(
    legacySubcategoryRepositorySource,
    /insert into hot_subcategories\(title,title_en,hot_category_id,hot_category_name\) values\(\$1,\$2,\$3,\$4\)/,
  );
  assert.match(
    legacySubcategoryRepositorySource,
    /\[data\.title, data\.title_en, hcid\[0\], hcid\[1\]\]/,
  );
  assert.match(
    legacySubcategoryRepositorySource,
    /update hot_subcategories set title=\$1,title_en=\$2,hot_category_id=\$3,hot_category_name=\$4 where id = \$5/,
  );
  assert.match(
    legacySubcategoryRepositorySource,
    /\[data\.title, data\.title_en, hcid\[0\], hcid\[1\], data\.id\]/,
  );
  assert.match(legacySubcategoryRepositorySource, /DELETE FROM hot_subcategories where id=\$1/);
  assert.doesNotMatch(legacySubcategoryExecutableSource, /RETURNING/);
  assert.doesNotMatch(legacySubcategoryExecutableSource, /writeFile|unlink|mkdir|fs\.|uploads?\//);
});

test("Hot Issue Subcategory service stays HTTP independent", () => {
  assert.match(serviceSource, /legacySubcategory: \{/);
  assert.match(serviceSource, /list: \(\) => hotissueRepository\.listSubcategories\(\)/);
  assert.match(serviceSource, /get: \(id\) => hotissueRepository\.getSubcategory\(id\)/);
  assert.match(serviceSource, /create: \(data\) => hotissueRepository\.legacyCreateSubcategory\(data\)/);
  assert.match(serviceSource, /update: \(data\) => hotissueRepository\.legacyUpdateSubcategory\(data\)/);
  assert.match(serviceSource, /remove: \(id\) => hotissueRepository\.legacyRemoveSubcategory\(id\)/);
  assert.doesNotMatch(serviceSource, /\breq\b|\bres\b|Response\.redirect/);
});

test("Hot Issue Subcategory controller preserves list/detail/mutation contracts", () => {
  assert.ok(controllerSource.includes('pathname === "/hotissuesubcategory"'));
  assert.ok(controllerSource.includes('const DETAIL_RE = /^\\/detailhotissuesubcategory\\/([^/]+)$/;'));
  assert.ok(controllerSource.includes('const DELETE_RE = /^\\/deletehotissuesubcategory\\/([^/]+)$/;'));
  assert.ok(controllerSource.includes('pathname === "/inserthotissubcategory"'));
  assert.ok(controllerSource.includes('pathname === "/updatehotissuesubcategory"'));
  assert.ok(!controllerSource.includes('pathname === "/inserthotissuesubcategory"'));
  assert.match(controllerSource, /rows\.length \? rows : \{ success: false \}/);
  assert.match(controllerSource, /row \? \[row\] : \{ success: false \}/);
  assert.match(controllerSource, /legacyRedirect\(request, "\/hisc"\)/);
  assert.match(controllerSource, /Response\.redirect\(new URL\(pathname, request\.url\), 302\)/);
  assert.doesNotMatch(controllerSource, /multipart\/form-data|request\.formData\(\)/);
  assert.doesNotMatch(controllerSource, /writeFile|unlink|mkdir|validateUpload/);

  for (const siblingPath of [
    'pathname === "/hotissuecategory"',
    'pathname === "/inserthotissuecategory"',
    'pathname === "/updatehotissuecategory"',
    'pathname === "/hotissue"',
    'pathname === "/inserthotissue"',
    'pathname === "/updatehotissue"',
  ]) {
    assert.ok(!controllerSource.includes(siblingPath), `controller widened into ${siblingPath}`);
  }
});

test("Hot Issue Subcategory native slice dispatches before generic legacy adapter", () => {
  const nativeIndex = routeSource.indexOf("handleLegacyHotIssueSubcategory(request)");
  const fallbackIndex = routeSource.indexOf("handleLegacyApi(request)");
  assert.ok(nativeIndex >= 0);
  assert.ok(fallbackIndex > nativeIndex);
});
