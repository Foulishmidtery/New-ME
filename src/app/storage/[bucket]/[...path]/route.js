import { open, readFile, stat } from "node:fs/promises";
import {
  legacyStorageContentType,
  resolveLegacyStoragePath,
} from "@/server/compat/legacy-storage";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request, { params }) {
  return serveLegacyStorage(request, await params, false);
}

export async function HEAD(request, { params }) {
  return serveLegacyStorage(request, await params, true);
}

async function serveLegacyStorage(request, params, headOnly) {
  const target = resolveLegacyStoragePath(params?.bucket, params?.path || []);
  if (!target) return new Response("Not Found", { status: 404 });

  try {
    const info = await stat(target);
    if (!info.isFile()) return new Response("Not Found", { status: 404 });

    const etag = `W/\"${info.size.toString(16)}-${Math.floor(info.mtimeMs).toString(16)}\"`;
    const baseHeaders = new Headers({
      "Accept-Ranges": "bytes",
      "Cache-Control": "public, max-age=0",
      "Content-Type": legacyStorageContentType(target),
      "ETag": etag,
      "Last-Modified": info.mtime.toUTCString(),
    });

    if (request.headers.get("if-none-match") === etag) {
      return new Response(null, { status: 304, headers: baseHeaders });
    }

    const range = parseRange(request.headers.get("range"), info.size);
    if (range?.invalid) {
      baseHeaders.set("Content-Range", `bytes */${info.size}`);
      return new Response(null, { status: 416, headers: baseHeaders });
    }

    if (range) {
      const length = range.end - range.start + 1;
      baseHeaders.set("Content-Length", String(length));
      baseHeaders.set("Content-Range", `bytes ${range.start}-${range.end}/${info.size}`);
      if (headOnly) return new Response(null, { status: 206, headers: baseHeaders });
      return new Response(await readSlice(target, range.start, length), { status: 206, headers: baseHeaders });
    }

    baseHeaders.set("Content-Length", String(info.size));
    if (headOnly) return new Response(null, { status: 200, headers: baseHeaders });
    return new Response(await readFile(target), { status: 200, headers: baseHeaders });
  } catch (error) {
    if (error?.code === "ENOENT" || error?.code === "ENOTDIR") {
      return new Response("Not Found", { status: 404 });
    }
    console.error("Legacy storage alias failed", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

function parseRange(header, size) {
  if (!header) return null;
  const match = /^bytes=(\d*)-(\d*)$/.exec(header.trim());
  if (!match || size <= 0) return { invalid: true };

  let start;
  let end;
  if (match[1] === "") {
    const suffixLength = Number(match[2]);
    if (!Number.isInteger(suffixLength) || suffixLength <= 0) return { invalid: true };
    start = Math.max(0, size - suffixLength);
    end = size - 1;
  } else {
    start = Number(match[1]);
    end = match[2] === "" ? size - 1 : Number(match[2]);
    if (!Number.isInteger(start) || !Number.isInteger(end) || start < 0 || start >= size || end < start) {
      return { invalid: true };
    }
    end = Math.min(end, size - 1);
  }

  return { start, end };
}

async function readSlice(filePath, start, length) {
  const handle = await open(filePath, "r");
  try {
    const buffer = Buffer.allocUnsafe(length);
    const { bytesRead } = await handle.read(buffer, 0, length, start);
    return bytesRead === length ? buffer : buffer.subarray(0, bytesRead);
  } finally {
    await handle.close();
  }
}
