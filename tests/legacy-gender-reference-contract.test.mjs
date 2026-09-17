import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const oldData = JSON.parse(fs.readFileSync(path.join(root, "old-be", "db", "data_gender.json"), "utf8"));
const newData = JSON.parse(fs.readFileSync(path.join(root, "src", "server", "legacy-db", "data_gender.json"), "utf8"));
const routeSource = fs.readFileSync(path.join(root, "src", "app", "[...legacy]", "route.js"), "utf8");
const { handleLegacyGenderReference } = await import(
  pathToFileURL(path.join(root, "src", "server", "controllers", "legacy-gender-reference.controller.js")).href
);

test("Gender static source exactly matches locked Old-BE ordering, fields, and values", () => {
  assert.deepEqual(newData, oldData);
  assert.deepEqual(newData, [
    { id: "1", gender: "Laki-Laki" },
    { id: "2", gender: "Perempuan" },
    { id: "3", gender: "Semua" },
  ]);
});

test("GET /gender returns exact legacy array with HTTP 200", async () => {
  const response = await handleLegacyGenderReference(new Request("http://localhost/gender"));
  assert.ok(response);
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), oldData);
});

test("Gender controller does not widen method or path ownership", async () => {
  assert.equal(await handleLegacyGenderReference(new Request("http://localhost/gender", { method: "POST" })), null);
  assert.equal(await handleLegacyGenderReference(new Request("http://localhost/negara")), null);
});

test("Gender native slice dispatches before generic legacy adapter", () => {
  const nativeIndex = routeSource.indexOf("handleLegacyGenderReference(request)");
  const fallbackIndex = routeSource.indexOf("handleLegacyApi(request)");
  assert.ok(nativeIndex >= 0);
  assert.ok(fallbackIndex > nativeIndex);
});
