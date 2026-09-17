import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

const root = process.cwd();
const repositorySource = fs.readFileSync(
  path.join(root, "src/server/repositories/abouts.repository.js"),
  "utf8",
);
const controllerSource = fs.readFileSync(
  path.join(root, "src/server/controllers/legacy-abouts-read.controller.js"),
  "utf8",
);
const routeSource = fs.readFileSync(
  path.join(root, "src/app/[...legacy]/route.js"),
  "utf8",
);

test("Abouts read repositories keep exact Old-BE identity filters", () => {
  assert.match(repositorySource, /SELECT \* FROM abouts WHERE web_identity = 'ekonomi_syariah'/);
  assert.match(repositorySource, /SELECT \* FROM abouts WHERE web_identity = 'kneks'/);
  assert.match(repositorySource, /SELECT \* FROM abouts WHERE id = \$1/);
});

test("Abouts native controller owns only the four read-only legacy routes", () => {
  assert.ok(controllerSource.includes('pathname === "/es_abouts"'));
  assert.ok(controllerSource.includes('pathname === "/abouts"'));
  assert.match(controllerSource, /ES_DETAIL_RE = \/\^\\\/es_detailabouts\\\//);
  assert.match(controllerSource, /KNEKS_DETAIL_RE = \/\^\\\/detailabouts\\\//);
  assert.match(controllerSource, /request\.method !== "GET"/);
});

test("Abouts empty reads preserve HTTP 200 success:false response", () => {
  assert.match(
    controllerSource,
    /Response\.json\(rows\?\.length \? rows : \{ success: false \}, \{ status: 200 \}\)/,
  );
});

test("upload-capable Abouts mutations remain outside the native read controller", () => {
  assert.doesNotMatch(controllerSource, /\/es_updateabout/);
  assert.doesNotMatch(controllerSource, /\/updateabout/);
  assert.doesNotMatch(controllerSource, /\/deleteabouts/);
});

test("catch-all dispatch routes Abouts reads before legacy fallback", () => {
  const nativeIndex = routeSource.indexOf("handleLegacyAboutsRead(request)");
  const fallbackIndex = routeSource.indexOf("handleLegacyApi(request)");
  assert.ok(nativeIndex >= 0, "Abouts read compatibility controller is not dispatched");
  assert.ok(fallbackIndex > nativeIndex, "legacy fallback must remain after native Abouts reads");
});
