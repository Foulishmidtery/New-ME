import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const oldData = JSON.parse(fs.readFileSync(path.join(root, "old-be", "db", "data_negara.json"), "utf8"));
const newData = JSON.parse(fs.readFileSync(path.join(root, "src", "server", "legacy-db", "data_negara.json"), "utf8"));
const routeSource = fs.readFileSync(path.join(root, "src", "app", "[...legacy]", "route.js"), "utf8");
const { handleLegacyNegaraReference } = await import(
  pathToFileURL(path.join(root, "src", "server", "controllers", "legacy-negara-reference.controller.js")).href
);

test("Negara static source exactly matches locked Old-BE ordering, fields, and values", () => {
  assert.deepEqual(newData, oldData);
  assert.deepEqual(newData, [
    { id: "1", negara: "Indonesia" },
    { id: "2", negara: "Luar Negeri" },
  ]);
});

test("GET /negara returns exact legacy array with HTTP 200", async () => {
  const response = await handleLegacyNegaraReference(new Request("http://localhost/negara"));
  assert.ok(response);
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), oldData);
});

test("Negara controller does not widen method or path ownership", async () => {
  assert.equal(await handleLegacyNegaraReference(new Request("http://localhost/negara", { method: "POST" })), null);
  assert.equal(await handleLegacyNegaraReference(new Request("http://localhost/pembuka")), null);
});

test("Negara native slice dispatches before generic legacy adapter", () => {
  const nativeIndex = routeSource.indexOf("handleLegacyNegaraReference(request)");
  const fallbackIndex = routeSource.indexOf("handleLegacyApi(request)");
  assert.ok(nativeIndex >= 0);
  assert.ok(fallbackIndex > nativeIndex);
});
