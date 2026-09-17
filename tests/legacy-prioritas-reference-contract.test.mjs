import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const oldData = JSON.parse(fs.readFileSync(path.join(root, "old-be", "db", "data_prioritas.json"), "utf8"));
const newData = JSON.parse(fs.readFileSync(path.join(root, "src", "server", "legacy-db", "data_prioritas.json"), "utf8"));
const routeSource = fs.readFileSync(path.join(root, "src", "app", "[...legacy]", "route.js"), "utf8");
const { handleLegacyPrioritasReference } = await import(
  pathToFileURL(path.join(root, "src", "server", "controllers", "legacy-prioritas-reference.controller.js")).href
);

test("Prioritas static source exactly matches locked Old-BE ordering, fields, and values", () => {
  assert.deepEqual(newData, oldData);
  assert.deepEqual(newData, [
    { id: "1", prioritas: "Tinggi" },
    { id: "2", prioritas: "Menengah" },
    { id: "3", prioritas: "Rendah" },
  ]);
});

test("GET /prioritas returns exact legacy array with HTTP 200", async () => {
  const response = await handleLegacyPrioritasReference(new Request("http://localhost/prioritas"));
  assert.ok(response);
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), oldData);
});

test("Prioritas controller does not widen method or path ownership", async () => {
  assert.equal(await handleLegacyPrioritasReference(new Request("http://localhost/prioritas", { method: "POST" })), null);
  assert.equal(await handleLegacyPrioritasReference(new Request("http://localhost/usia")), null);
});

test("Prioritas native slice dispatches before generic legacy adapter", () => {
  const nativeIndex = routeSource.indexOf("handleLegacyPrioritasReference(request)");
  const fallbackIndex = routeSource.indexOf("handleLegacyApi(request)");
  assert.ok(nativeIndex >= 0);
  assert.ok(fallbackIndex > nativeIndex);
});
