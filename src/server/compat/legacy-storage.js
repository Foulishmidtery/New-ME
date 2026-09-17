import path from "node:path";

export const LEGACY_STORAGE_BUCKETS = Object.freeze({
  news: "news",
  hot_issue: "hot_issue",
  photo: "photo",
  structure: "structure",
  filesupload: "filesupload",
});

const CONTENT_TYPES = Object.freeze({
  ".avif": "image/avif",
  ".bmp": "image/bmp",
  ".csv": "text/csv; charset=utf-8",
  ".doc": "application/msword",
  ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ".gif": "image/gif",
  ".htm": "text/html; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".json": "application/json; charset=utf-8",
  ".pdf": "application/pdf",
  ".png": "image/png",
  ".ppt": "application/vnd.ms-powerpoint",
  ".pptx": "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp",
  ".xls": "application/vnd.ms-excel",
  ".xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
});

export function resolveLegacyStoragePath(bucket, segments, publicUploadsRoot = path.resolve(process.cwd(), "public", "uploads")) {
  const directory = LEGACY_STORAGE_BUCKETS[bucket];
  if (!directory) return null;

  const parts = Array.isArray(segments) ? segments : [segments];
  if (!parts.length || parts.some((part) => !isSafePathSegment(part))) return null;

  const bucketRoot = path.resolve(publicUploadsRoot, directory);
  const target = path.resolve(bucketRoot, ...parts);
  if (target !== bucketRoot && !target.startsWith(`${bucketRoot}${path.sep}`)) return null;
  return target;
}

export function legacyStorageContentType(filePath) {
  return CONTENT_TYPES[path.extname(filePath).toLowerCase()] || "application/octet-stream";
}

function isSafePathSegment(segment) {
  if (typeof segment !== "string" || !segment || segment === "." || segment === "..") return false;
  return !segment.includes("/") && !segment.includes("\\") && !segment.includes("\0");
}
