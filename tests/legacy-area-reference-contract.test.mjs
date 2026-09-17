import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const oldData = JSON.parse(fs.readFileSync(path.join(root, "old-be", "db", "data_area.json"), "utf8"));
const newData = JSON.parse(fs.readFileSync(path.join(root, "src", "server", "legacy-db", "data_area.json"), "utf8"));
const routeSource = fs.readFileSync(path.join(root, "src", "app", "[...legacy]", "route.js"), "utf8");
const { handleLegacyAreaReference } = await import(
  pathToFileURL(path.join(root, "src", "server", "controllers", "legacy-area-reference.controller.js")).href
);

test("Area static source exactly matches locked Old-BE ordering, fields, and values", () => {
  assert.deepEqual(newData, oldData);
  assert.deepEqual(newData, [
    { id: "1", area: "International" },
    { id: "2", area: "Nasional" },
    { id: "3", area: "Regional" },
  ]);
});

test("GET /area returns exact legacy array with HTTP 200", async () => {
  const response = await handleLegacyAreaReference(new Request("http://localhost/area"));
  assert.ok(response);
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), oldData);
});

test("Area controller does not widen method or path ownership", async () => {
  assert.equal(await handleLegacyAreaReference(new Request("http://localhost/area", { method: "POST" })), null);
  assert.equal(await handleLegacyAreaReference(new Request("http://localhost/gender")), null);
});

test("Area native slice dispatches before generic legacy adapter", () => {
  const nativeIndex = routeSource.indexOf("handleLegacyAreaReference(request)");
  const fallbackIndex = routeSource.indexOf("handleLegacyApi(request)");
  assert.ok(nativeIndex >= 0);
  assert.ok(fallbackIndex > nativeIndex);
});
