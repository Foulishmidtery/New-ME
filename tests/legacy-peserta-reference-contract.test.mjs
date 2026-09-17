import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const oldData = JSON.parse(fs.readFileSync(path.join(root, "old-be", "db", "data_peserta.json"), "utf8"));
const newData = JSON.parse(fs.readFileSync(path.join(root, "src", "server", "legacy-db", "data_peserta.json"), "utf8"));
const routeSource = fs.readFileSync(path.join(root, "src", "app", "[...legacy]", "route.js"), "utf8");
const { handleLegacyPesertaReference } = await import(
  pathToFileURL(path.join(root, "src", "server", "controllers", "legacy-peserta-reference.controller.js")).href
);

test("Peserta static source exactly matches locked Old-BE ordering, fields, and values", () => {
  assert.deepEqual(newData, oldData);
  assert.deepEqual(newData, [
    { id: "1", jumlah: ">500" },
    { id: "2", jumlah: "100 s.d. 500" },
    { id: "3", jumlah: "<100" },
  ]);
});

test("GET /peserta returns exact legacy array with HTTP 200", async () => {
  const response = await handleLegacyPesertaReference(new Request("http://localhost/peserta"));
  assert.ok(response);
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), oldData);
});

test("Peserta controller does not widen method or path ownership", async () => {
  assert.equal(await handleLegacyPesertaReference(new Request("http://localhost/peserta", { method: "POST" })), null);
  assert.equal(await handleLegacyPesertaReference(new Request("http://localhost/area")), null);
});

test("Peserta native slice dispatches before generic legacy adapter", () => {
  const nativeIndex = routeSource.indexOf("handleLegacyPesertaReference(request)");
  const fallbackIndex = routeSource.indexOf("handleLegacyApi(request)");
  assert.ok(nativeIndex >= 0);
  assert.ok(fallbackIndex > nativeIndex);
});
