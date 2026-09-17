import { extraService } from "@/server/services/extra.service";

const DETAIL_RE = /^\/provinces_detail\/([^/]+)$/;
const DELETE_RE = /^\/province_delete\/([^/]+)$/;

export async function handleLegacyProvince(request) {
  const url = new URL(request.url);
  const pathname = url.pathname;

  try {
    if (request.method === "GET" && pathname === "/provinces") {
      const rows = await extraService.listProvinces();
      return Response.json(rows.length ? rows : { success: false }, { status: 200 });
    }

    if (request.method === "GET") {
      const detailMatch = pathname.match(DETAIL_RE);
      if (detailMatch) {
        const row = await extraService.getProvince(decodeURIComponent(detailMatch[1]));
        return Response.json(row ? [row] : { success: false }, { status: 200 });
      }

      const deleteMatch = pathname.match(DELETE_RE);
      if (deleteMatch) {
        await extraService.deleteProvince(decodeURIComponent(deleteMatch[1]));
        return legacyRedirect(request, "/province");
      }
    }

    if (request.method === "POST" && pathname === "/insertprovince") {
      await extraService.createProvince(await readBody(request));
      return legacyRedirect(request, "/province");
    }

    if (request.method === "POST" && pathname === "/updateprovince") {
      const body = await readBody(request);
      await extraService.updateProvince(body.id, body);
      return legacyRedirect(request, "/province");
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
