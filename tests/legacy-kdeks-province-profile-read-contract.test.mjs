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
  path.join(root, "src/server/controllers/legacy-kdeks-province-profile-read.controller.js"),
  "utf8",
);
const routeSource = fs.readFileSync(
  path.join(root, "src/app/[...legacy]/route.js"),
  "utf8",
);

test("KDEKS province profile query keeps Old-BE id_province and identity filter", () => {
  assert.match(
    repositorySource,
    /SELECT \* FROM kdeks where id_province = \$1 AND web_identity = 'kdeks'/,
  );
  assert.match(repositorySource, /\[idProvince\]/);
});

test("KDEKS province About response keeps the exact extended Old-BE field set", () => {
  const method = serviceSource.match(/getKdeksAboutProvince: async \(idProvince\) => \{([\s\S]*?)\n  \},\n  getKdeksHistoryProvince/);
  assert.ok(method, "getKdeksAboutProvince must exist");
  for (const field of [
    "id", "title", "title_en", "abouts", "abouts_en", "historys", "historys_en",
    "web_identity", "id_province", "images", "province_name", "structure", "sk",
    "twitter", "facebook", "linkedin", "instagram", "youtube", "address", "phone_number",
    "fax", "email", "maps", "officials",
  ]) {
    assert.match(method[1], new RegExp(`\\b${field}: row\\?\\.${field}`), `missing About field ${field}`);
  }
  assert.match(method[1], /if \(!row\) return \[\]/);
});

test("KDEKS province History response stays intentionally narrower", () => {
  const method = serviceSource.match(/getKdeksHistoryProvince: async \(idProvince\) => \{([\s\S]*?)\n  \},\n  getAboutById/);
  assert.ok(method, "getKdeksHistoryProvince must exist");
  for (const field of [
    "id", "title", "title_en", "abouts", "abouts_en", "historys", "historys_en",
    "web_identity", "id_province", "images",
  ]) {
    assert.match(method[1], new RegExp(`\\b${field}: row\\?\\.${field}`), `missing History field ${field}`);
  }
  for (const forbidden of ["province_name", "structure", "sk", "officials", "maps"]) {
    assert.doesNotMatch(method[1], new RegExp(`\\b${forbidden}:`), `History response widened with ${forbidden}`);
  }
  assert.match(method[1], /if \(!row\) return \[\]/);
});

test("KDEKS province controller owns only the two GET dynamic routes", () => {
  assert.match(controllerSource, /request\.method !== "GET"/);
  assert.match(controllerSource, /ABOUT_RE = \/\^\\\/api_about_province_kdeks\\\//);
  assert.match(controllerSource, /HISTORY_RE = \/\^\\\/api_history_province_kdeks\\\//);
  assert.match(controllerSource, /\{ status: 200 \}/);
  assert.doesNotMatch(controllerSource, /insertkdeks|updatekdeks|deletekdeks|updateaboutkdeks/);
});

test("KDEKS province reads dispatch before the generic legacy fallback", () => {
  const nativeIndex = routeSource.indexOf("handleLegacyKdeksProvinceProfileRead(request)");
  const fallbackIndex = routeSource.indexOf("handleLegacyApi(request)");
  assert.ok(nativeIndex >= 0);
  assert.ok(fallbackIndex > nativeIndex);
});
