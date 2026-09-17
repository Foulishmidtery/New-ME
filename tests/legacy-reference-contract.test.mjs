import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

const root = process.cwd();
const provinceController = fs.readFileSync(path.join(root, "src/server/controllers/legacy-province.controller.js"), "utf8");
const taggingController = fs.readFileSync(path.join(root, "src/server/controllers/legacy-tagging.controller.js"), "utf8");
const repositorySource = fs.readFileSync(path.join(root, "src/server/repositories/extra.repository.js"), "utf8");

test("Province keeps Old-BE read response and mutation redirect contract", () => {
  for (const pathname of ["/provinces", "/insertprovince", "/updateprovince"]) {
    assert.ok(provinceController.includes(pathname), `missing Province path ${pathname}`);
  }
  assert.ok(provinceController.includes('const DETAIL_RE = /^\\/provinces_detail\\/([^/]+)$/;'));
  assert.ok(provinceController.includes('const DELETE_RE = /^\\/province_delete\\/([^/]+)$/;'));
  assert.match(provinceController, /row \? \[row\] : \{ success: false \}/);
  assert.match(provinceController, /legacyRedirect\(request, "\/province"\)/);
  assert.match(repositorySource, /SELECT \* FROM province/);
});

test("Tagging keeps Old-BE read response and mutation redirect contract", () => {
  for (const pathname of ["/tagging", "/inserttagging", "/updatetagging"]) {
    assert.ok(taggingController.includes(pathname), `missing Tagging path ${pathname}`);
  }
  assert.ok(taggingController.includes('const DETAIL_RE = /^\\/detailtagging\\/([^/]+)$/;'));
  assert.ok(taggingController.includes('const DELETE_RE = /^\\/deletetagging\\/([^/]+)$/;'));
  assert.match(taggingController, /row \? \[row\] : \{ success: false \}/);
  assert.match(taggingController, /legacyRedirect\(request, "\/tg"\)/);
  assert.match(repositorySource, /SELECT \* FROM tagging/);
});
