import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const oldData = JSON.parse(fs.readFileSync(path.join(root, "old-be", "db", "data_pembuka.json"), "utf8"));
const newData = JSON.parse(fs.readFileSync(path.join(root, "src", "server", "legacy-db", "data_pembuka.json"), "utf8"));
const routeSource = fs.readFileSync(path.join(root, "src", "app", "[...legacy]", "route.js"), "utf8");
const { handleLegacyPembukaReference } = await import(
  pathToFileURL(path.join(root, "src", "server", "controllers", "legacy-pembuka-reference.controller.js")).href
);

test("Pembuka static source exactly matches locked Old-BE ordering, fields, and values", () => {
  assert.deepEqual(newData, oldData);
  assert.equal(newData.length, 5);
  assert.deepEqual(newData[0], { id: "1", pembuka: "Presiden/Wakil Presiden" });
  assert.deepEqual(newData.at(-1), { id: "5", pembuka: "Eselon III/Pejabat Setingkat" });
});

test("GET /pembuka returns exact legacy array with HTTP 200", async () => {
  const response = await handleLegacyPembukaReference(new Request("http://localhost/pembuka"));
  assert.ok(response);
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), oldData);
});

test("Pembuka controller does not widen method or path ownership", async () => {
  assert.equal(await handleLegacyPembukaReference(new Request("http://localhost/pembuka", { method: "POST" })), null);
  assert.equal(await handleLegacyPembukaReference(new Request("http://localhost/prioritas")), null);
});

test("Pembuka native slice dispatches before generic legacy adapter", () => {
  const nativeIndex = routeSource.indexOf("handleLegacyPembukaReference(request)");
  const fallbackIndex = routeSource.indexOf("handleLegacyApi(request)");
  assert.ok(nativeIndex >= 0);
  assert.ok(fallbackIndex > nativeIndex);
});
