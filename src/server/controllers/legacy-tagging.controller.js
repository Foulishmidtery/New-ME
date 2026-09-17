import { extraService } from "@/server/services/extra.service";

const DETAIL_RE = /^\/detailtagging\/([^/]+)$/;
const DELETE_RE = /^\/deletetagging\/([^/]+)$/;

export async function handleLegacyTagging(request) {
  const url = new URL(request.url);
  const pathname = url.pathname;

  try {
    if (request.method === "GET" && pathname === "/tagging") {
      const rows = await extraService.listTaggings();
      return Response.json(rows.length ? rows : { success: false }, { status: 200 });
    }

    if (request.method === "GET") {
      const detailMatch = pathname.match(DETAIL_RE);
      if (detailMatch) {
        const row = await extraService.getTagging(decodeURIComponent(detailMatch[1]));
        return Response.json(row ? [row] : { success: false }, { status: 200 });
      }

      const deleteMatch = pathname.match(DELETE_RE);
      if (deleteMatch) {
        await extraService.deleteTagging(decodeURIComponent(deleteMatch[1]));
        return legacyRedirect(request, "/tg");
      }
    }

    if (request.method === "POST" && pathname === "/inserttagging") {
      await extraService.createTagging(await readBody(request));
      return legacyRedirect(request, "/tg");
    }

    if (request.method === "POST" && pathname === "/updatetagging") {
      const body = await readBody(request);
      await extraService.updateTagging(body.id, body);
      return legacyRedirect(request, "/tg");
    }
  } catch (error) {
    return Response.json(
      { message: error.message || "Terjadi kesalahan pada server." },
      { status: error.status || 500 },
    );
  }

  return null;
}

function legacyRedirect(request, pathname) {
  return Response.redirect(new URL(pathname, request.url), 302);
}

async function readBody(request) {
  const contentType = request.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    try { return await request.json(); } catch { return {}; }
  }
  if (contentType.includes("application/x-www-form-urlencoded")) {
    return Object.fromEntries(new URLSearchParams(await request.text()));
  }
  if (contentType.includes("multipart/form-data")) {
    const formData = await request.formData();
    return Object.fromEntries([...formData.entries()].filter(([, value]) => typeof value === "string"));
  }
  return {};
}
