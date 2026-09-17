import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const oldData = JSON.parse(fs.readFileSync(path.join(root, "old-be", "db", "data_usia.json"), "utf8"));
const newData = JSON.parse(fs.readFileSync(path.join(root, "src", "server", "legacy-db", "data_usia.json"), "utf8"));
const routeSource = fs.readFileSync(path.join(root, "src", "app", "[...legacy]", "route.js"), "utf8");
const { handleLegacyUsiaReference } = await import(
  pathToFileURL(path.join(root, "src", "server", "controllers", "legacy-usia-reference.controller.js")).href
);

test("Usia static source exactly matches locked Old-BE ordering, fields, values, and repeated ids", () => {
  assert.deepEqual(newData, oldData);
  assert.equal(newData.length, 9);
  assert.deepEqual(newData.map((row) => row.id), ["1", "2", "3", "1", "2", "3", "1", "2", "3"]);
  assert.equal(newData[0].usia, "Semua Usia");
  assert.equal(newData.at(-1).usia, ">56 Tahun");
});

test("GET /usia returns exact legacy array with HTTP 200", async () => {
  const response = await handleLegacyUsiaReference(new Request("http://localhost/usia"));
  assert.ok(response);
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), oldData);
});

test("Usia controller does not widen method or path ownership", async () => {
  assert.equal(await handleLegacyUsiaReference(new Request("http://localhost/usia", { method: "POST" })), null);
  assert.equal(await handleLegacyUsiaReference(new Request("http://localhost/roles")), null);
});

test("Usia native slice dispatches before generic legacy adapter", () => {
  const nativeIndex = routeSource.indexOf("handleLegacyUsiaReference(request)");
  const fallbackIndex = routeSource.indexOf("handleLegacyApi(request)");
  assert.ok(nativeIndex >= 0);
  assert.ok(fallbackIndex > nativeIndex);
});
