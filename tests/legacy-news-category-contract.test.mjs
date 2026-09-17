import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

const root = process.cwd();
const controllerSource = fs.readFileSync(
  path.join(root, "src/server/controllers/legacy-news-category.controller.js"),
  "utf8",
);
const serviceSource = fs.readFileSync(
  path.join(root, "src/server/services/news.service.js"),
  "utf8",
);
const repositorySource = fs.readFileSync(
  path.join(root, "src/server/repositories/news.repository.js"),
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

const modernNewsSource = repositorySource.split("// Legacy News Category compatibility")[0];
const legacyCategorySource = repositorySource
  .split("// Legacy News Category compatibility")[1]
  .split("// Legacy public News read/filter compatibility")[0];
const executableLegacyCategorySource = stripComments(legacyCategorySource);
const executableControllerSource = stripComments(controllerSource);

function stripComments(source) {
  return source
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\/\/.*$/gm, "");
}

test("News Category keeps the five exact Old-BE CRUD routes", () => {
  for (const [method, pattern, handler] of [
    ["GET", "/categories", "news_categories"],
    ["GET", "/detailnewscategory/:id", "detailnewscategory"],
    ["POST", "/insertnewscategory", "insertnewscategory"],
    ["POST", "/updatenewscategory", "updatenewscategory"],
    ["GET", "/deletenewscategory/:id", "deletenewscategory"],
  ]) {
    const routePattern = new RegExp(
      `"method": "${method}",\\s*"pattern": "${pattern.replaceAll("/", "\\/")}",\\s*"handler": "${handler}"`,
    );
    assert.match(manifestSource, routePattern, `missing ${method} ${pattern}`);
  }
});

test("News Category reads preserve Old-BE SQL, array success shape, empty behavior, and no ordering", () => {
  assert.match(executableLegacyCategorySource, /SELECT \* FROM news_categories/);
  assert.match(executableLegacyCategorySource, /SELECT \* FROM news_categories where id = \$1/);
  assert.doesNotMatch(executableLegacyCategorySource, /ORDER BY|LIMIT|OFFSET/);

  assert.match(
    controllerSource,
    /rows\.length \? rows : \{ success: false \}/,
  );
  assert.match(controllerSource, /\{ status: 200 \}/);
  assert.doesNotMatch(controllerSource, /Response\.json\(rows\[0\]/);
});

test("News Category legacy mutations preserve exact fields, body id, path delete id, redirects, and no RETURNING", () => {
  assert.match(
    executableLegacyCategorySource,
    /insert into news_categories\(title,title_en,description,description_en\) values\(\$1,\$2,\$3,\$4\)/,
  );
  assert.match(
    executableLegacyCategorySource,
    /\[data\.title, data\.title_en, data\.description, data\.description_en\]/,
  );
  assert.match(
    executableLegacyCategorySource,
    /update news_categories set title=\$1,title_en=\$2,description=\$3,description_en=\$4 where id = \$5/,
  );
  assert.match(
    executableLegacyCategorySource,
    /\[data\.title, data\.title_en, data\.description, data\.description_en, data\.id\]/,
  );
  assert.match(
    executableLegacyCategorySource,
    /DELETE FROM news_categories where id = \$1/,
  );
  assert.doesNotMatch(executableLegacyCategorySource, /RETURNING/);

  assert.ok(controllerSource.includes('const DELETE_RE = /^\\/deletenewscategory\\/([^/]+)$/;'));
  assert.match(controllerSource, /legacyRedirect\(request, "\/nc"\)/);
  assert.match(controllerSource, /Response\.redirect\(new URL\(pathname, request\.url\), 302\)/);
});

test("News Category service keeps compatibility orchestration HTTP independent", () => {
  assert.match(serviceSource, /legacyCategory: \{/);
  assert.match(serviceSource, /list: \(\) => newsRepository\.listLegacyCategories\(\)/);
  assert.match(serviceSource, /detail: \(id\) => newsRepository\.getLegacyCategoryRows\(id\)/);
  assert.match(serviceSource, /create: \(data\) => newsRepository\.createLegacyCategory\(data\)/);
  assert.match(serviceSource, /update: \(data\) => newsRepository\.updateLegacyCategory\(data\)/);
  assert.match(serviceSource, /remove: \(id\) => newsRepository\.deleteLegacyCategory\(id\)/);
  assert.doesNotMatch(serviceSource, /\breq\b|\bres\b|Response\.redirect/);
});

test("News Category controller stays DB-only and does not absorb related News read/filter routes", () => {
  assert.ok(controllerSource.includes('pathname === "/categories"'));
  assert.ok(controllerSource.includes('const DETAIL_RE = /^\\/detailnewscategory\\/([^/]+)$/;'));
  assert.ok(controllerSource.includes('pathname === "/insertnewscategory"'));
  assert.ok(controllerSource.includes('pathname === "/updatenewscategory"'));
  assert.ok(controllerSource.includes('const DELETE_RE = /^\\/deletenewscategory\\/([^/]+)$/;'));

  assert.doesNotMatch(executableControllerSource, /multipart\/form-data|request\.formData\(\)/);
  assert.doesNotMatch(executableControllerSource, /writeFile|unlink|mkdir|validateUpload|node:fs|uploads?\//);

  for (const relatedPath of [
    'pathname === "/posts/type/',
    'pathname === "/news_category/cat/',
    'pathname === "/news/search/',
    'pathname === "/insertnews"',
    'pathname === "/updatenews"',
  ]) {
    assert.ok(!controllerSource.includes(relatedPath), `controller widened into ${relatedPath}`);
  }
});

test("News Category migration leaves main News methods and RETURNING semantics intact", () => {
  for (const method of ["list", "search", "get", "create", "update", "remove"]) {
    assert.match(modernNewsSource, new RegExp(`async ${method}\\(`));
  }
  assert.match(modernNewsSource, /INSERT INTO news[\s\S]*RETURNING \*/);
  assert.match(modernNewsSource, /UPDATE news SET[\s\S]*RETURNING \*/);
  assert.match(modernNewsSource, /DELETE FROM news WHERE id = \$1 RETURNING id/);
});

test("News Category native slice dispatches before generic legacy fallback", () => {
  const nativeIndex = routeSource.indexOf("handleLegacyNewsCategory(request)");
  const fallbackIndex = routeSource.indexOf("handleLegacyApi(request)");
  assert.ok(nativeIndex >= 0);
  assert.ok(fallbackIndex > nativeIndex);
});
