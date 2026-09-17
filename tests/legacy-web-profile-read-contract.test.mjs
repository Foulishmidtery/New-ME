import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

const root = process.cwd();
const repositorySource = fs.readFileSync(
  path.join(root, "src/server/repositories/web-profile.repository.js"),
  "utf8",
);
const serviceSource = fs.readFileSync(
  path.join(root, "src/server/services/web-profile.service.js"),
  "utf8",
);
const controllerSource = fs.readFileSync(
  path.join(root, "src/server/controllers/legacy-web-profile-read.controller.js"),
  "utf8",
);
const routeSource = fs.readFileSync(
  path.join(root, "src/app/[...legacy]/route.js"),
  "utf8",
);

test("Web Profile read SQL keeps Old-BE semantics", () => {
  assert.match(repositorySource, /SELECT \* FROM web_profile where id = 1/);
  assert.match(repositorySource, /SELECT \* FROM web_profile where id = \$1/);
  assert.match(serviceSource, /legacyList: \(\) => webProfileRepository\.legacyList\(\)/);
  assert.match(serviceSource, /legacyDetail: \(id\) => webProfileRepository\.legacyDetail\(id\)/);
});

test("Web Profile native controller owns list and dynamic detail GET only", () => {
  assert.ok(controllerSource.includes('pathname === "/api_web_profile"'));
  assert.match(controllerSource, /DETAIL_RE = \/\^\\\/api_detail_webprofile\\\//);
  assert.match(controllerSource, /request\.method !== "GET"/);
});

test("Web Profile empty reads keep success:false with HTTP 200", () => {
  assert.match(
    controllerSource,
    /Response\.json\(rows\?\.length \? rows : \{ success: false \}, \{ status: 200 \}\)/,
  );
});

test("Web Profile update routes remain outside the read slice", () => {
  for (const pathname of [
    "/updatewebtitle",
    "/updateweblogo",
    "/updatewebheader",
    "/updatewebcolor",
  ]) {
    assert.ok(!controllerSource.includes(pathname), `read controller widened to ${pathname}`);
  }
});

test("Web Profile reads dispatch before generic legacy fallback", () => {
  const nativeIndex = routeSource.indexOf("handleLegacyWebProfileRead(request)");
  const fallbackIndex = routeSource.indexOf("handleLegacyApi(request)");
  assert.ok(nativeIndex >= 0);
  assert.ok(fallbackIndex > nativeIndex);
});
