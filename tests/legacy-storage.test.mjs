import assert from "node:assert/strict";
import path from "node:path";
import test from "node:test";
import {
  LEGACY_STORAGE_BUCKETS,
  legacyStorageContentType,
  resolveLegacyStoragePath,
} from "../src/server/compat/legacy-storage.js";

const root = path.resolve("/tmp/cms/public/uploads");

test("legacy storage keeps the five Old-BE aliases", () => {
  assert.deepEqual(Object.keys(LEGACY_STORAGE_BUCKETS).sort(), [
    "filesupload",
    "hot_issue",
    "news",
    "photo",
    "structure",
  ]);
});

test("legacy storage resolves an allowed file below its original upload bucket", () => {
  assert.equal(
    resolveLegacyStoragePath("news", ["2026", "image.jpg"], root),
    path.resolve(root, "news", "2026", "image.jpg"),
  );
});

test("legacy storage rejects unknown buckets and traversal segments", () => {
  assert.equal(resolveLegacyStoragePath("profile", ["logo.png"], root), null);
  assert.equal(resolveLegacyStoragePath("news", ["..", "secret.txt"], root), null);
  assert.equal(resolveLegacyStoragePath("news", ["nested/escape.txt"], root), null);
  assert.equal(resolveLegacyStoragePath("news", ["nested\\escape.txt"], root), null);
});

test("legacy storage preserves common content types", () => {
  assert.equal(legacyStorageContentType("photo.JPG"), "image/jpeg");
  assert.equal(legacyStorageContentType("document.pdf"), "application/pdf");
  assert.equal(legacyStorageContentType("unknown.bin"), "application/octet-stream");
});
