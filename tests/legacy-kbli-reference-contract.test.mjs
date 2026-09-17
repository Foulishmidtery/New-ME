import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const oldKbliPath = path.join(root, "old-be", "db", "data_kbli.json");
const newKbliPath = path.join(root, "src", "server", "legacy-db", "data_kbli.json");
const routeSource = fs.readFileSync(
  path.join(root, "src", "app", "[...legacy]", "route.js"),
  "utf8",
);

const oldKbli = JSON.parse(fs.readFileSync(oldKbliPath, "utf8"));
const newKbli = JSON.parse(fs.readFileSync(newKbliPath, "utf8"));
const controllerModule = await import(
  pathToFileURL(path.join(root, "src", "server", "controllers", "legacy-kbli-reference.controller.js")).href
);
const { handleLegacyKbliReference } = controllerModule;

test("KBLI static source exactly matches locked Old-BE ordering, fields, and values", () => {
  assert.deepEqual(newKbli, oldKbli);
  assert.equal(newKbli.length, 17);
  assert.deepEqual(newKbli[0], { id: "1", kbli: "1 - Makanan dan Minuman Halal" });
  assert.deepEqual(newKbli.at(-1), { id: "18", kbli: "8 - Sektor Syariah Lainnya" });
});

test("GET /kbli returns the exact legacy static array with HTTP 200", async () => {
  const response = await handleLegacyKbliReference(new Request("http://localhost/kbli"));
  assert.ok(response);
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), oldKbli);
});

test("KBLI controller does not widen method or path ownership", async () => {
  assert.equal(
    await handleLegacyKbliReference(new Request("http://localhost/kbli", { method: "POST" })),
    null,
  );
  assert.equal(
    await handleLegacyKbliReference(new Request("http://localhost/peserta")),
    null,
  );
});

test("KBLI native slice dispatches before the generic legacy adapter", () => {
  const nativeIndex = routeSource.indexOf("handleLegacyKbliReference(request)");
  const fallbackIndex = routeSource.indexOf("handleLegacyApi(request)");
  assert.ok(nativeIndex >= 0);
  assert.ok(fallbackIndex > nativeIndex);
});
