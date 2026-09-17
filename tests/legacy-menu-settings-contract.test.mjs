import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

const root = process.cwd();
const repositorySource = fs.readFileSync(
  path.join(root, "src/server/repositories/menu-settings.repository.js"),
  "utf8",
);
const serviceSource = fs.readFileSync(
  path.join(root, "src/server/services/menu-settings.service.js"),
  "utf8",
);
const controllerSource = fs.readFileSync(
  path.join(root, "src/server/controllers/legacy-menu-settings.controller.js"),
  "utf8",
);
const routeSource = fs.readFileSync(
  path.join(root, "src/app/[...legacy]/route.js"),
  "utf8",
);

test("Menu/Submenu read SQL keeps Old-BE response sources", () => {
  assert.match(repositorySource, /SELECT \* FROM menu/);
  assert.match(repositorySource, /SELECT \* FROM menu where id = \$1/);
  assert.match(repositorySource, /SELECT \* FROM menu_sub/);
  assert.match(repositorySource, /SELECT \* FROM menu_sub where id = \$1/);
});

test("Menu mutation SQL preserves Old-BE fields and does not add RETURNING", () => {
  assert.match(repositorySource, /insert into menu\(menu_name,menu_link,orders,menu_name_en\) values\(\$1,\$2,\$3,\$4\)/);
  assert.match(repositorySource, /update menu set menu_name=\$1, menu_link=\$2, orders=\$3, menu_name_en=\$4 where id = \$5/);
  assert.doesNotMatch(repositorySource, /RETURNING/i);
});

test("Submenu mutation preserves raw menu_id.split('-') semantics", () => {
  assert.match(repositorySource, /return value\.split\("-"\)/);
  assert.doesNotMatch(repositorySource, /String\(value/);
  assert.match(repositorySource, /insert into menu_sub\(menu_id,submenu_name,submenu_link,orders,submenu_name_en,menu_name\)/);
  assert.match(repositorySource, /update menu_sub set menu_id = \$1, submenu_name=\$2, submenu_link=\$3, orders=\$4, submenu_name_en=\$5, menu_name=\$6 where id = \$7/);
});

test("Menu settings service remains free of req/res", () => {
  assert.doesNotMatch(serviceSource, /\breq\b|\bres\b/);
  assert.match(serviceSource, /legacyInsertSubmenu: \(data\) => menuSettingsRepository\.legacyInsertSubmenu\(data\)/);
});

test("Menu/Submenu controller preserves route methods, empty result and redirects", () => {
  for (const pathname of ["/api_menu", "/api_submenu", "/insertmenu", "/updatemenu", "/insertsubmenu", "/updatesubmenu"]) {
    assert.ok(controllerSource.includes(`"${pathname}"`), `missing ${pathname}`);
  }
  assert.match(controllerSource, /MENU_DETAIL_RE = \/\^\\\/api_menu_detail\\\//);
  assert.match(controllerSource, /SUBMENU_DETAIL_RE = \/\^\\\/api_submenu_detail\\\//);
  assert.match(controllerSource, /rows\?\.length \? rows : \{ success: false \}/);
  assert.match(controllerSource, /legacyRedirect\(request, "\/menu"\)/);
  assert.match(controllerSource, /legacyRedirect\(request, "\/submenu"\)/);
  assert.match(controllerSource, /Response\.redirect\(new URL\(pathname, request\.url\), 302\)/);
});

test("Menu/Submenu native path dispatches before generic fallback", () => {
  const nativeIndex = routeSource.indexOf("handleLegacyMenuSettings(request)");
  const fallbackIndex = routeSource.indexOf("handleLegacyApi(request)");
  assert.ok(nativeIndex >= 0);
  assert.ok(fallbackIndex > nativeIndex);
});
