import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

const root = process.cwd();
const controllerSource = fs.readFileSync(
  path.join(root, "src/server/controllers/legacy-directorate-division.controller.js"),
  "utf8",
);
const serviceSource = fs.readFileSync(
  path.join(root, "src/server/services/directorat.service.js"),
  "utf8",
);
const repositorySource = fs.readFileSync(
  path.join(root, "src/server/repositories/directorat.repository.js"),
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

const modernDivisionSource = repositorySource
  .split("// Devisi (Division)")[1]
  .split("// Legacy Devisi compatibility")[0];
const legacyDivisionSource = repositorySource
  .split("// Legacy Devisi compatibility")[1]
  .split("// Directorats FE resources")[0];
const executableLegacyDivisionSource = stripComments(legacyDivisionSource);
const executableControllerSource = stripComments(controllerSource);

function stripComments(source) {
  return source
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\/\/.*$/gm, "");
}

test("Directorate Division keeps the five exact Old-BE routes", () => {
  for (const [method, pattern, handler] of [
    ["GET", "/directorat_devisi", "directorat_devisi"],
    ["POST", "/directorats_devisi_add", "directorat_devisi_add"],
    ["GET", "/directorats_devisi_detail/:id", "directorat_devisi_detail"],
    ["GET", "/division_delete/:id", "directorats_devisi_delete"],
    ["POST", "/directorats_devisi_edit", "directorat_devisi_update"],
  ]) {
    const routePattern = new RegExp(
      `"method": "${method}",\\s*"pattern": "${pattern.replaceAll("/", "\\/")}",\\s*"handler": "${handler}"`,
    );
    assert.match(manifestSource, routePattern, `missing ${method} ${pattern}`);
  }

  assert.doesNotMatch(manifestSource, /"pattern": "\/directorate_division/);
  assert.doesNotMatch(manifestSource, /"pattern": "\/directorats_division/);
});

test("Directorate Division legacy reads preserve table, array shape source, and no ordering", () => {
  assert.match(legacyDivisionSource, /getLegacyDevisi\(\)/);
  assert.match(legacyDivisionSource, /SELECT \* FROM devisi/);
  assert.match(legacyDivisionSource, /getLegacyDevisiDetail\(id\)/);
  assert.match(legacyDivisionSource, /SELECT \*  FROM  devisi where id = \$1/);
  assert.doesNotMatch(legacyDivisionSource, /ORDER BY/);
  assert.match(controllerSource, /Response\.json\(await directoratService\.legacyDivision\.list\(\), \{ status: 200 \}\)/);
  assert.match(controllerSource, /directoratService\.legacyDivision\.detail/);
  assert.doesNotMatch(controllerSource, /success: false/);
});

test("Directorate Division legacy mutations preserve raw split, field mapping, body id, and no RETURNING", () => {
  assert.match(executableLegacyDivisionSource, /data\.directorats_id\.split\('-'\)/);
  assert.match(
    executableLegacyDivisionSource,
    /insert into devisi\(title,title_en,description,description_en,directorats_id,directorats_name\)values\(\$1,\$2,\$3,\$4,\$5,\$6\)/,
  );
  assert.match(
    executableLegacyDivisionSource,
    /\[data\.title, data\.title_en, data\.description, data\.description_en, bbb\[0\], bbb\[1\]\]/,
  );
  assert.match(
    executableLegacyDivisionSource,
    /update devisi set title = \$1, description = \$2, directorats_id = \$3 , directorats_name = \$4, title_en = \$5, description_en = \$6 where id = \$7/,
  );
  assert.match(
    executableLegacyDivisionSource,
    /\[data\.title, data\.description, bbb\[0\], bbb\[1\], data\.title_en, data\.description_en, data\.id\]/,
  );
  assert.match(executableLegacyDivisionSource, /DELETE FROM  devisi where id=\$1/);
  assert.doesNotMatch(executableLegacyDivisionSource, /RETURNING/);
});

test("Directorate Division service isolates legacy orchestration from HTTP", () => {
  assert.match(serviceSource, /legacyDivision: \{/);
  assert.match(serviceSource, /list: \(\) => directoratRepository\.getLegacyDevisi\(\)/);
  assert.match(serviceSource, /detail: \(id\) => directoratRepository\.getLegacyDevisiDetail\(id\)/);
  assert.match(serviceSource, /create: \(data\) => directoratRepository\.createLegacyDevisi\(data\)/);
  assert.match(serviceSource, /update: \(data\) => directoratRepository\.updateLegacyDevisi\(data\)/);
  assert.match(serviceSource, /remove: \(id\) => directoratRepository\.deleteLegacyDevisi\(id\)/);
  assert.doesNotMatch(serviceSource, /\breq\b|\bres\b|Response\.redirect/);
});

test("Directorate Division controller preserves methods, params, redirects, and DB-only boundary", () => {
  assert.ok(controllerSource.includes('pathname === "/directorat_devisi"'));
  assert.ok(controllerSource.includes('pathname === "/directorats_devisi_add"'));
  assert.ok(controllerSource.includes('const DETAIL_RE = /^\\/directorats_devisi_detail\\/([^/]+)$/;'));
  assert.ok(controllerSource.includes('const DELETE_RE = /^\\/division_delete\\/([^/]+)$/;'));
  assert.ok(controllerSource.includes('pathname === "/directorats_devisi_edit"'));
  assert.match(controllerSource, /legacyRedirect\(request, "\/devision"\)/);
  assert.match(controllerSource, /Response\.redirect\(new URL\(pathname, request\.url\), 302\)/);
  assert.doesNotMatch(executableControllerSource, /multipart\/form-data|request\.formData\(\)/);
  assert.doesNotMatch(executableControllerSource, /writeFile|unlink|mkdir|validateUpload|node:fs|uploads?\//);
});

test("Directorate Division modern methods remain separate with their existing RETURNING semantics", () => {
  assert.match(modernDivisionSource, /async createDevisi\(data\)/);
  assert.match(modernDivisionSource, /VALUES\(\$1,\$2,\$3,\$4,\$5,\$6\) RETURNING \*/);
  assert.match(modernDivisionSource, /async updateDevisi\(id, data\)/);
  assert.match(modernDivisionSource, /WHERE id=\$7 RETURNING \*/);
  assert.match(modernDivisionSource, /async deleteDevisi\(id\)/);
  assert.match(modernDivisionSource, /DELETE FROM devisi WHERE id=\$1 RETURNING id/);

  assert.match(serviceSource, /createDevisi: \(data\) => directoratRepository\.createDevisi\(data\)/);
  assert.match(serviceSource, /updateDevisi: \(id, data\) => directoratRepository\.updateDevisi\(id, data\)/);
  assert.match(serviceSource, /deleteDevisi: \(id\) => directoratRepository\.deleteDevisi\(id\)/);
});

test("Directorate Division native slice dispatches before generic legacy fallback", () => {
  const nativeIndex = routeSource.indexOf("handleLegacyDirectorateDivision(request)");
  const fallbackIndex = routeSource.indexOf("handleLegacyApi(request)");
  assert.ok(nativeIndex >= 0);
  assert.ok(fallbackIndex > nativeIndex);
});
