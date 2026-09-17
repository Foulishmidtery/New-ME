import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

const root = process.cwd();
const controllerSource = fs.readFileSync(
  path.join(root, "src/server/controllers/legacy-posts-type.controller.js"),
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

/*
 * Legitimate production-value evidence audited before this compatibility path
 * was made native:
 *
 * - muhammad-rifqi/kneks_react@433972d7efe591330570cbe0ac7d625229c9986e
 *   .env/.env.dev/env.txt define REACT_APP_API_PHOTO=/posts/type/photos and
 *   REACT_APP_API_VIDEO=/posts/type/videos; GaleriFoto/GaleriVideo consume those
 *   environment variables.
 * - muhammad-rifqi/webdevkneks@c5939440427a48930cdbf2ff6d9db54658d0a6be
 *   views/photos/list.html and views/videos/list.html hardcode exactly those two
 *   endpoint values.
 * - muhammad-rifqi/super_kneks@03217e87e8c8b5b3bdcf1dfd0b3a64b3ae388751
 *   contains the same photo/video CMS consumers.
 *
 * No additional /posts/type/ consumer value was found in the accessible KNEKS
 * source audit. Tests therefore lock only photos and videos as legitimate values.
 */

const photoMapSource = controllerSource
  .split("function mapLegacyPhoto(items)")[1]
  .split("function mapLegacyVideo(items)")[0];
const videoMapSource = controllerSource
  .split("function mapLegacyVideo(items)")[1]
  .split("export async function handleLegacyPostsType")[0];
const legacyRepositorySource = repositorySource.split(
  "// Legacy /posts/type/:name compatibility.",
)[1];
const modernSearchSource = repositorySource
  .split("async search(keyword)")[1]
  .split("async get(id)")[0];

function stripComments(source) {
  return source
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\/\/.*$/gm, "");
}

const executableControllerSource = stripComments(controllerSource);
const executableLegacyRepositorySource = stripComments(legacyRepositorySource);

test("posts type keeps the exact Old-BE route and handler contract", () => {
  assert.match(
    manifestSource,
    /"method": "GET",\s*"pattern": "\/posts\/type\/:name",\s*"handler": "categories"/,
  );
  assert.ok(
    controllerSource.includes('const POSTS_TYPE_RE = /^\\/posts\\/type\\/([^/]+)$/;'),
  );
  assert.match(controllerSource, /if \(request\.method !== "GET"\) return null;/);
});

test("consumer evidence locks only photos and videos as legitimate post types", () => {
  assert.match(
    controllerSource,
    /const LEGITIMATE_POST_TYPES = new Set\(\["photos", "videos"\]\);/,
  );
  assert.match(
    repositorySource,
    /photos: "SELECT \* FROM news_photos"/,
  );
  assert.match(
    repositorySource,
    /videos: "SELECT \* FROM news_videos"/,
  );
});

test("repository uses fixed queries and never turns request input into an SQL identifier", () => {
  assert.match(
    executableLegacyRepositorySource,
    /const query = LEGACY_POST_TYPE_QUERIES\[name\];/,
  );
  assert.match(executableLegacyRepositorySource, /if \(!query\) return null;/);
  assert.match(executableLegacyRepositorySource, /db\.query\(query\)/);
  assert.doesNotMatch(executableLegacyRepositorySource, /ORDER BY|LIMIT|OFFSET/);
  assert.doesNotMatch(
    executableLegacyRepositorySource,
    /['"`]news_['"`]\s*\+\s*name|news_\$\{name\}|\$\{name\}/,
  );
  assert.doesNotMatch(repositorySource, /SELECT \* FROM news_['"`]\s*\+\s*name/);
});

test("photos response preserves the exact Old-BE mapped fields and derived ph", () => {
  for (const field of [
    "id",
    "title",
    "photo",
    "content",
    "photos_datetime",
    "title_en",
    "content_en",
    "web_identity",
    "tag",
    "directorat",
    "id_province",
    "is_publish",
    "users_name",
  ]) {
    assert.match(photoMapSource, new RegExp(`${field}: items\\?\\.${field}`));
  }
  assert.match(photoMapSource, /ph: items\?\.photo\?\.split\("\/"\)\[5\]/);
  assert.doesNotMatch(photoMapSource, /video:|duration:|videos_datetime:/);
});

test("videos response preserves the exact Old-BE non-photo mapped fields", () => {
  for (const field of [
    "id",
    "title",
    "video",
    "duration",
    "content",
    "videos_datetime",
    "title_en",
    "content_en",
    "web_identity",
    "tag",
    "directorat",
    "id_province",
    "is_publish",
    "users_name",
  ]) {
    assert.match(videoMapSource, new RegExp(`${field}: items\\?\\.${field}`));
  }
  assert.doesNotMatch(videoMapSource, /photo:|photos_datetime:|\bph:/);
});

test("legacy success and empty behavior remain HTTP 200", () => {
  assert.match(
    controllerSource,
    /return Response\.json\(\{ success: false \}, \{ status: 200 \}\);/,
  );
  assert.match(
    controllerSource,
    /return Response\.json\(responseRows, \{ status: 200 \}\);/,
  );
  assert.match(
    controllerSource,
    /name === "photos" \? rows\.map\(mapLegacyPhoto\) : rows\.map\(mapLegacyVideo\)/,
  );
});

test("unsupported names are rejected before repository access as an intentional security boundary", () => {
  const allowlistCheckIndex = controllerSource.indexOf(
    "if (!LEGITIMATE_POST_TYPES.has(name))",
  );
  const serviceCallIndex = controllerSource.indexOf(
    "newsService.legacyPostTypes.list(name)",
  );

  assert.ok(allowlistCheckIndex >= 0);
  assert.ok(serviceCallIndex > allowlistCheckIndex);
  assert.match(
    controllerSource,
    /Unsupported legacy post type\.[\s\S]*status: 400/,
  );
});

test("posts type service is HTTP independent and does not reuse unrelated News methods", () => {
  assert.match(serviceSource, /legacyPostTypes: \{/);
  assert.match(
    serviceSource,
    /list: \(name\) => newsRepository\.getLegacyPostTypeRows\(name\)/,
  );
  assert.doesNotMatch(
    serviceSource.split("legacyPostTypes: {")[1],
    /newsRepository\.(search|getLegacyNewsByCategory|getLegacyNewsByDate)\(/,
  );
  assert.doesNotMatch(serviceSource, /\breq\b|\bres\b|Response\.redirect/);

  assert.match(modernSearchSource, /ILIKE \$1/);
  assert.match(modernSearchSource, /ORDER BY id ASC LIMIT 5/);
});

test("posts type controller stays read-only and outside upload/filesystem behavior", () => {
  assert.doesNotMatch(executableControllerSource, /multipart\/form-data|request\.formData\(\)/);
  assert.doesNotMatch(
    executableControllerSource,
    /writeFile|unlink|mkdir|validateUpload|node:fs|uploads?\//,
  );
  assert.doesNotMatch(
    executableControllerSource,
    /insertnews|updatenews|deletenews|insertphoto|updatephoto|insertvideo|updatevideo/,
  );
});

test("posts type dispatches after News filters and before generic legacy fallback", () => {
  const filterIndex = routeSource.indexOf("handleLegacyNewsReadFilter(request)");
  const postsTypeIndex = routeSource.indexOf("handleLegacyPostsType(request)");
  const fallbackIndex = routeSource.indexOf("handleLegacyApi(request)");

  assert.ok(filterIndex >= 0);
  assert.ok(postsTypeIndex > filterIndex);
  assert.ok(fallbackIndex > postsTypeIndex);
});
