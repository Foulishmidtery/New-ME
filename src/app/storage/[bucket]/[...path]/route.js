import { readFile, stat } from "node:fs/promises";
import {
  legacyStorageContentType,
  resolveLegacyStoragePath,
} from "@/server/compat/legacy-storage";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(_request, { params }) {
  return serveLegacyStorage(await params, false);
}

export async function HEAD(_request, { params }) {
  return serveLegacyStorage(await params, true);
}

async function serveLegacyStorage(params, headOnly) {
  const target = resolveLegacyStoragePath(params?.bucket, params?.path || []);
  if (!target) return new Response("Not Found", { status: 404 });

  try {
    const info = await stat(target);
    if (!info.isFile()) return new Response("Not Found", { status: 404 });

    const headers = new Headers({
      "Accept-Ranges": "bytes",
      "Cache-Control": "public, max-age=0",
      "Content-Length": String(info.size),
      "Content-Type": legacyStorageContentType(target),
      "Last-Modified": info.mtime.toUTCString(),
    });

    if (headOnly) return new Response(null, { status: 200, headers });
    return new Response(await readFile(target), { status: 200, headers });
  } catch (error) {
    if (error?.code === "ENOENT" || error?.code === "ENOTDIR") {
      return new Response("Not Found", { status: 404 });
    }
    console.error("Legacy storage alias failed", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
