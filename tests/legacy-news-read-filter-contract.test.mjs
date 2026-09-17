import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

const root = process.cwd();
const controllerSource = fs.readFileSync(
  path.join(root, "src/server/controllers/legacy-news-read-filter.controller.js"),
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

const legacyFilterSource = repositorySource.split(
  "// Legacy public News read/filter compatibility",
)[1];
const executableLegacyFilterSource = stripComments(legacyFilterSource);
const categoryRepositorySource = executableLegacyFilterSource
  .split("async getLegacyNewsByCategory(id)")[1]
  .split("async getLegacyNewsByDate(date)")[0];
const dateRepositorySource = executableLegacyFilterSource.split(
  "async getLegacyNewsByDate(date)",
)[1];
const executableControllerSource = stripComments(controllerSource);
const modernSearchSource = repositorySource
  .split("async search(keyword)")[1]
  .split("async get(id)")[0];

function stripComments(source) {
  return source
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\/\/.*$/gm, "");
}

test("News read filters keep the two exact Old-BE routes", () => {
  for (const [method, pattern, handler] of [
    ["GET", "/news_category/cat/:id", "news_categories_menu"],
    ["GET", "/news/search/:date", "news_categories_date"],
  ]) {
    const routePattern = new RegExp(
      `"method": "${method}",\\s*"pattern": "${pattern.replaceAll("/", "\\/")}",\\s*"handler": "${handler}"`,
    );
    assert.match(manifestSource, routePattern, `missing ${method} ${pattern}`);
  }
});

test("category filter preserves news table, path id bind, ordering, raw rows, and empty array", () => {
  assert.match(
    categoryRepositorySource,
    /SELECT \* FROM  news where category_id=\$1 ORDER BY news_datetime DESC/,
  );
  assert.match(categoryRepositorySource, /\[id\]/);
  assert.doesNotMatch(categoryRepositorySource, /LIMIT|OFFSET/);

  assert.ok(
    controllerSource.includes(
      'const CATEGORY_RE = /^\\/news_category\\/cat\\/([^/]+)$/;',
    ),
  );
  assert.match(
    controllerSource,
    /newsService\.legacyFilters\.byCategory\([\s\S]*decodeURIComponent\(categoryMatch\[1\]\)/,
  );
  assert.match(controllerSource, /return Response\.json\(rows, \{ status: 200 \}\);/);
});

test("date filter preserves LIKE bind, no ordering, raw rows success, and success-false empty response", () => {
  assert.match(
    dateRepositorySource,
    /SELECT \* FROM  news where news_datetime LIKE \$1/,
  );
  assert.match(dateRepositorySource, /'%' \+ date \+ '%'/);
  assert.doesNotMatch(dateRepositorySource, /ORDER BY|LIMIT|OFFSET|ILIKE/);

  assert.ok(
    controllerSource.includes('const DATE_RE = /^\\/news\\/search\\/([^/]+)$/;'),
  );
  assert.match(
    controllerSource,
    /newsService\.legacyFilters\.byDate\([\s\S]*decodeURIComponent\(dateMatch\[1\]\)/,
  );
  assert.match(
    controllerSource,
    /Response\.json\(rows\.length \? rows : \{ success: false \}, \{ status: 200 \}\)/,
  );
});

test("News read filter service is HTTP independent and does not reuse modern keyword search", () => {
  assert.match(serviceSource, /legacyFilters: \{/);
  assert.match(
    serviceSource,
    /byCategory: \(id\) => newsRepository\.getLegacyNewsByCategory\(id\)/,
  );
  assert.match(
    serviceSource,
    /byDate: \(date\) => newsRepository\.getLegacyNewsByDate\(date\)/,
  );
  assert.doesNotMatch(
    serviceSource.split("legacyFilters: {")[1],
    /newsRepository\.search\(/,
  );
  assert.doesNotMatch(serviceSource, /\breq\b|\bres\b|Response\.redirect/);

  assert.match(modernSearchSource, /ILIKE \$1/);
  assert.match(modernSearchSource, /news_photos/);
  assert.match(modernSearchSource, /news_videos/);
  assert.match(modernSearchSource, /ORDER BY id ASC LIMIT 5/);
});

test("News read filter controller remains GET-only, DB-only, and excludes posts type and main News upload", () => {
  assert.match(controllerSource, /if \(request\.method !== "GET"\) return null;/);
  assert.doesNotMatch(executableControllerSource, /multipart\/form-data|request\.formData\(\)/);
  assert.doesNotMatch(
    executableControllerSource,
    /writeFile|unlink|mkdir|validateUpload|node:fs|uploads?\//,
  );
  assert.doesNotMatch(controllerSource, /posts\/type|insertnews|updatenews|deletenews/);
});

test("News read filters dispatch after News Category and before generic legacy fallback", () => {
  const categoryIndex = routeSource.indexOf("handleLegacyNewsCategory(request)");
  const filterIndex = routeSource.indexOf("handleLegacyNewsReadFilter(request)");
  const fallbackIndex = routeSource.indexOf("handleLegacyApi(request)");

  assert.ok(categoryIndex >= 0);
  assert.ok(filterIndex > categoryIndex);
  assert.ok(fallbackIndex > filterIndex);
});
