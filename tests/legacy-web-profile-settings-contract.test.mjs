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
  path.join(root, "src/server/controllers/legacy-web-profile-settings.controller.js"),
  "utf8",
);
const routeSource = fs.readFileSync(
  path.join(root, "src/app/[...legacy]/route.js"),
  "utf8",
);

test("Web Profile mutations keep exact Old-BE SQL fields and body names", () => {
  assert.match(repositorySource, /UPDATE web_profile SET web_title=\$1 where id = \$2/);
  assert.match(repositorySource, /\[data\.web_title, data\.id\]/);
  assert.match(repositorySource, /UPDATE web_profile SET web_logo=\$1 where id = \$2/);
  assert.match(repositorySource, /\[data\.web_logo, data\.id\]/);
  assert.match(repositorySource, /UPDATE web_profile SET web_header=\$1 where id = \$2/);
  assert.match(repositorySource, /\[data\.web_header, data\.id\]/);
  assert.match(repositorySource, /UPDATE web_profile SET web_color=\$1 where id = \$2/);
  assert.match(repositorySource, /\[data\.web_color, data\.id\]/);
  assert.doesNotMatch(repositorySource, /RETURNING/);
});

test("Web Profile mutation service remains HTTP-independent", () => {
  assert.match(serviceSource, /legacyUpdateTitle: \(data\) => webProfileRepository\.legacyUpdateTitle\(data\)/);
  assert.match(serviceSource, /legacyUpdateLogo: \(data\) => webProfileRepository\.legacyUpdateLogo\(data\)/);
  assert.match(serviceSource, /legacyUpdateHeader: \(data\) => webProfileRepository\.legacyUpdateHeader\(data\)/);
  assert.match(serviceSource, /legacyUpdateColor: \(data\) => webProfileRepository\.legacyUpdateColor\(data\)/);
  assert.doesNotMatch(serviceSource, /\breq\b|\bres\b/);
});

test("Web Profile mutation routes preserve POST method and redirect destinations", () => {
  assert.match(controllerSource, /request\.method !== "POST"/);
  for (const [pathname, redirect] of [
    ["/updatewebtitle", "/titleweb"],
    ["/updateweblogo", "/logo"],
    ["/updatewebheader", "/header"],
    ["/updatewebcolor", "/color"],
  ]) {
    assert.ok(controllerSource.includes(`"${pathname}"`), `missing ${pathname}`);
    assert.ok(controllerSource.includes(`redirect: "${redirect}"`), `missing redirect ${redirect}`);
  }
  assert.match(controllerSource, /Response\.redirect\(new URL\(mutation\.redirect, request\.url\), 302\)/);
});

test("Web Profile setting mutation controller has no upload/filesystem behavior", () => {
  assert.doesNotMatch(controllerSource, /node:fs|readFile|writeFile|unlink|public\/uploads|req\.file/);
});

test("Web Profile settings dispatch before generic legacy fallback", () => {
  const nativeIndex = routeSource.indexOf("handleLegacyWebProfileSettings(request)");
  const fallbackIndex = routeSource.indexOf("handleLegacyApi(request)");
  assert.ok(nativeIndex >= 0);
  assert.ok(fallbackIndex > nativeIndex);
});
