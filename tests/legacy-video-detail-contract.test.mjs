import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

const root = process.cwd();
const controllerSource = fs.readFileSync(
  path.join(root, "src/server/controllers/legacy-video-detail.controller.js"),
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
const photoControllerSource = fs.readFileSync(
  path.join(root, "src/server/controllers/legacy-photo-detail.controller.js"),
  "utf8",
);

function stripComments(source) {
  return source
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\/\/.*$/gm, "");
}

const executableControllerSource = stripComments(controllerSource);
const legacyVideoRepositorySource = repositorySource.split(
  "// Legacy Video detail compatibility",
)[1];
const executableVideoRepositorySource = stripComments(
  legacyVideoRepositorySource,
);
const legacyVideoServiceSource = serviceSource.split("legacyVideo: {")[1];

test("Video detail keeps the exact Old-BE route", () => {
  assert.match(
    manifestSource,
    /"method": "GET",\s*"pattern": "\/videodetail\/:id",\s*"handler": "videodetail"/,
  );
  assert.ok(
    controllerSource.includes('const VIDEO_DETAIL_RE = /^\\/videodetail\\/([^/]+)$/;'),
  );
  assert.match(controllerSource, /if \(request\.method !== "GET"\) return null;/);
});

test("Video detail preserves exact SQL, path id bind, raw rows, and no ordering or pagination", () => {
  assert.match(
    executableVideoRepositorySource,
    /SELECT \* FROM  news_videos where id=\$1/,
  );
  assert.match(executableVideoRepositorySource, /\[id\]/);
  assert.doesNotMatch(
    executableVideoRepositorySource,
    /ORDER BY|LIMIT|OFFSET|page|pagination/i,
  );
  assert.doesNotMatch(executableVideoRepositorySource, /rows\[0\]/);
  assert.doesNotMatch(executableVideoRepositorySource, /\.map\(/);

  assert.match(
    controllerSource,
    /newsService\.legacyVideo\.detail\([\s\S]*decodeURIComponent\(match\[1\]\)/,
  );
  assert.match(
    controllerSource,
    /rows\.length \? rows : \{ success: false \}/,
  );
  assert.match(controllerSource, /\{ status: 200 \}/);
});

test("Video detail does not reuse posts-type video mapping or list filtering", () => {
  assert.doesNotMatch(executableControllerSource, /\.map\(|\.filter\(/);
  assert.doesNotMatch(executableVideoRepositorySource, /\.map\(|\.filter\(/);
  assert.doesNotMatch(
    executableVideoRepositorySource,
    /getLegacyPostTypeRows|LEGACY_POST_TYPE_QUERIES/,
  );

  assert.match(postTypeSource, /new Set\(\["photos", "videos"\]\)/);
  assert.match(postTypeSource, /mapLegacyVideo/);
});

test("Video detail service is isolated from legacy post-type and Photo detail compatibility", () => {
  assert.match(
    legacyVideoServiceSource,
    /detail: \(id\) => newsRepository\.getLegacyVideoDetailRows\(id\)/,
  );
  assert.doesNotMatch(legacyVideoServiceSource, /getLegacyPostTypeRows|legacyPostTypes/);
  assert.doesNotMatch(serviceSource, /\breq\b|\bres\b|Response\.json/);

  assert.match(serviceSource, /legacyPhoto:\s*\{[\s\S]*getLegacyPhotoDetailRows\(id\)/);
  assert.match(photoControllerSource, /handleLegacyPhotoDetail/);
});

test("Video detail controller is DB-only and excludes Video mutations", () => {
  assert.doesNotMatch(
    executableControllerSource,
    /multipart\/form-data|request\.formData\(\)|multer|writeFile|unlink|mkdir|node:fs|uploads?\//,
  );
  assert.doesNotMatch(
    executableControllerSource,
    /insertvideo|updatevideo|deletevideo/,
  );
});

test("Video detail dispatches natively after Photo detail and before generic fallback while Video mutations remain unmatched", () => {
  const photoDetailIndex = routeSource.indexOf("handleLegacyPhotoDetail(request)");
  const videoDetailIndex = routeSource.indexOf("handleLegacyVideoDetail(request)");
  const fallbackIndex = routeSource.indexOf("handleLegacyApi(request)");

  assert.ok(photoDetailIndex >= 0);
  assert.ok(videoDetailIndex > photoDetailIndex);
  assert.ok(fallbackIndex > videoDetailIndex);

  assert.doesNotMatch(controllerSource, /insertvideo|updatevideo|deletevideo/);
});
