import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

const root = process.cwd();
const controllerSource = fs.readFileSync(
  path.join(root, "src/server/controllers/legacy-photo-detail.controller.js"),
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
const postTypeSource = fs.readFileSync(
  path.join(root, "src/server/controllers/legacy-posts-type.controller.js"),
  "utf8",
);

function stripComments(source) {
  return source
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\/\/.*$/gm, "");
}

const executableControllerSource = stripComments(controllerSource);
const legacyPhotoRepositorySource = repositorySource.split(
  "// Legacy Photo detail compatibility",
)[1];
const executablePhotoRepositorySource = stripComments(
  legacyPhotoRepositorySource,
);
const legacyPhotoServiceSource = serviceSource.split("legacyPhoto: {")[1];

test("Photo detail keeps the exact Old-BE route", () => {
  assert.match(
    manifestSource,
    /"method": "GET",\s*"pattern": "\/photodetail\/:id",\s*"handler": "photodetail"/,
  );
  assert.ok(
    controllerSource.includes('const PHOTO_DETAIL_RE = /^\\/photodetail\\/([^/]+)$/;'),
  );
  assert.match(controllerSource, /if \(request\.method !== "GET"\) return null;/);
});

test("Photo detail preserves exact SQL, path id bind, raw rows, and no ordering or pagination", () => {
  assert.match(
    executablePhotoRepositorySource,
    /SELECT \* FROM  news_photos where id=\$1/,
  );
  assert.match(executablePhotoRepositorySource, /\[id\]/);
  assert.doesNotMatch(
    executablePhotoRepositorySource,
    /ORDER BY|LIMIT|OFFSET|page|pagination/i,
  );
  assert.doesNotMatch(executablePhotoRepositorySource, /rows\[0\]/);
  assert.doesNotMatch(executablePhotoRepositorySource, /\.map\(/);

  assert.match(
    controllerSource,
    /newsService\.legacyPhoto\.detail\([\s\S]*decodeURIComponent\(match\[1\]\)/,
  );
  assert.match(
    controllerSource,
    /rows\.length \? rows : \{ success: false \}/,
  );
  assert.match(controllerSource, /\{ status: 200 \}/);
});

test("Photo detail does not inherit posts-type photo mapping or derived ph", () => {
  assert.doesNotMatch(executableControllerSource, /\.map\(/);
  assert.doesNotMatch(executableControllerSource, /\bph\b|split\s*\(/);
  assert.doesNotMatch(executablePhotoRepositorySource, /\bph\b|split\s*\(/);

  assert.match(postTypeSource, /ph: items\?\.photo\?\.split\("\/"\)\[5\]/);
  assert.match(postTypeSource, /new Set\(\["photos", "videos"\]\)/);
});

test("Photo detail service is isolated from legacy post-type mapping", () => {
  assert.match(
    legacyPhotoServiceSource,
    /detail: \(id\) => newsRepository\.getLegacyPhotoDetailRows\(id\)/,
  );
  assert.doesNotMatch(legacyPhotoServiceSource, /getLegacyPostTypeRows|legacyPostTypes/);
  assert.doesNotMatch(serviceSource, /\breq\b|\bres\b|Response\.json/);
});

test("Photo detail controller is DB-only and excludes Photo mutations", () => {
  assert.doesNotMatch(
    executableControllerSource,
    /multipart\/form-data|request\.formData\(\)|multer|writeFile|unlink|mkdir|node:fs|uploads?\//,
  );
  assert.doesNotMatch(
    executableControllerSource,
    /insertphoto|updatephoto|deletephoto/,
  );
});

test("Photo detail dispatches natively before generic fallback while Photo mutations remain unmatched", () => {
  const postsTypeIndex = routeSource.indexOf("handleLegacyPostsType(request)");
  const photoDetailIndex = routeSource.indexOf("handleLegacyPhotoDetail(request)");
  const fallbackIndex = routeSource.indexOf("handleLegacyApi(request)");

  assert.ok(postsTypeIndex >= 0);
  assert.ok(photoDetailIndex > postsTypeIndex);
  assert.ok(fallbackIndex > photoDetailIndex);

  assert.doesNotMatch(controllerSource, /insertphoto|updatephoto|deletephoto/);
});
