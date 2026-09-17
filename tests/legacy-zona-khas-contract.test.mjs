import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

const root = process.cwd();
const repositorySource = fs.readFileSync(path.join(root, "src/server/repositories/zona-khas.repository.js"), "utf8");
const serviceSource = fs.readFileSync(path.join(root, "src/server/services/zona-khas.service.js"), "utf8");
const controllerSource = fs.readFileSync(path.join(root, "src/server/controllers/legacy-zona-khas.controller.js"), "utf8");

test("Zona KHAS preserves Old-BE province ordering and per-province query", () => {
  assert.match(repositorySource, /SELECT \* FROM province ORDER BY id DESC/);
  assert.match(repositorySource, /SELECT \* FROM khas_zone WHERE province = \$1/);
});

test("Zona KHAS keeps Old-BE nested response fields", () => {
  for (const field of [
    "province_name",
    "zonakhas",
    "province_names",
    "inauguration",
    "tenant",
    "inaugurated",
    "status",
  ]) {
    assert.ok(serviceSource.includes(field), `missing nested Zona KHAS field ${field}`);
  }
});

test("Zona KHAS keeps Old-BE ceremony date null behavior", () => {
  assert.match(serviceSource, /data\?\.status === "diresmikan"/);
  assert.match(serviceSource, /inauguration: null, inaugurated: null/);
});

test("Zona KHAS controller owns all legacy paths and mutation redirect", () => {
  for (const pathname of ["/zona_khas", "/zona_peta", "/insertzonakhas", "/updatezonakhas"]) {
    assert.ok(controllerSource.includes(pathname), `missing Zona KHAS path ${pathname}`);
  }
  assert.ok(controllerSource.includes('const DETAIL_RE = /^\\/detail_zona_khas\\/([^/]+)$/;'));
  assert.ok(controllerSource.includes('const DELETE_RE = /^\\/deletezonakhas\\/([^/]+)$/;'));
  assert.match(controllerSource, /legacyRedirect\(request, "\/zk"\)/);
  assert.match(controllerSource, /rows\.length \? rows : \{ success: false \}/);
});
