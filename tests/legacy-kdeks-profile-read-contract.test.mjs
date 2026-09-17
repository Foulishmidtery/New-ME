import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

const root = process.cwd();
const repositorySource = fs.readFileSync(
  path.join(root, "src/server/repositories/abouts.repository.js"),
  "utf8",
);
const serviceSource = fs.readFileSync(
  path.join(root, "src/server/services/abouts.service.js"),
  "utf8",
);
const controllerSource = fs.readFileSync(
  path.join(root, "src/server/controllers/legacy-kdeks-profile-read.controller.js"),
  "utf8",
);
const routeSource = fs.readFileSync(
  path.join(root, "src/app/[...legacy]/route.js"),
  "utf8",
);

test("KDEKS About/History repositories keep exact Old-BE filters", () => {
  assert.match(repositorySource, /SELECT \* FROM abouts WHERE web_identity = 'kdeks'/);
  assert.match(repositorySource, /web_identity = 'kdeks' AND tag = 'about'/);
  assert.match(repositorySource, /web_identity = 'kdeks' AND tag = 'history'/);
});

test("KDEKS maps repository keeps Old-BE join and has_image semantics", () => {
  assert.match(repositorySource, /FROM\s+kdeks k[\s\S]*JOIN\s+province p ON k\.id_province = p\.id/);
  assert.match(repositorySource, /p\.code AS bps_code/);
  assert.match(repositorySource, /WHEN k\.images IS NOT NULL AND k\.images != '' THEN true/);
  assert.match(serviceSource, /return \{ success: true, data: results \}/);
});

test("KDEKS profile native controller owns only static read endpoints", () => {
  for (const pathname of [
    "/api_kdeks_list",
    "/api_about_kdeks",
    "/api_history_kdeks",
    "/api_maps_kdeks",
  ]) {
    assert.ok(controllerSource.includes(`pathname === "${pathname}"`), `missing ${pathname}`);
  }
  assert.match(controllerSource, /request\.method !== "GET"/);
});

test("KDEKS About/History endpoints preserve array response even when empty", () => {
  assert.match(controllerSource, /Response\.json\(await aboutsService\.getKdeksAboutsList\(\), \{ status: 200 \}\)/);
  assert.match(controllerSource, /Response\.json\(await aboutsService\.getKdeksAbouts\(\), \{ status: 200 \}\)/);
  assert.match(controllerSource, /Response\.json\(await aboutsService\.getKdeksHistory\(\), \{ status: 200 \}\)/);
  assert.doesNotMatch(controllerSource, /rows\.length \? rows : \{ success: false \}/);
});

test("KDEKS maps failure preserves Old-BE 500 response shape", () => {
  assert.match(controllerSource, /\{ success: false, message: "Terjadi kesalahan server" \}/);
  assert.match(controllerSource, /\{ status: 500 \}/);
});

test("KDEKS mutations and province-specific reads remain outside this slice", () => {
  for (const pathname of [
    "/updateaboutkdeks",
    "/delete_about_kdeks",
    "/api_history_province_kdeks",
    "/api_about_province_kdeks",
    "/insertkdeks",
    "/updatekdeks",
  ]) {
    assert.ok(!controllerSource.includes(pathname), `scope widened to ${pathname}`);
  }
});

test("KDEKS profile reads dispatch before generic legacy fallback", () => {
  const nativeIndex = routeSource.indexOf("handleLegacyKdeksProfileRead(request)");
  const fallbackIndex = routeSource.indexOf("handleLegacyApi(request)");
  assert.ok(nativeIndex >= 0);
  assert.ok(fallbackIndex > nativeIndex);
});
