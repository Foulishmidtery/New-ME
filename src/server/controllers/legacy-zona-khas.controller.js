import { zonaKhasService } from "@/server/services/zona-khas.service";

const DETAIL_RE = /^\/detail_zona_khas\/([^/]+)$/;
const DELETE_RE = /^\/deletezonakhas\/([^/]+)$/;

export async function handleLegacyZonaKhas(request) {
  const url = new URL(request.url);
  const pathname = url.pathname;

  try {
    if (request.method === "GET" && pathname === "/zona_khas") {
      return Response.json(await zonaKhasService.listNested(), { status: 200 });
    }

    if (request.method === "GET" && pathname === "/zona_peta") {
      const rows = await zonaKhasService.listMap();
      return Response.json(rows.length ? rows : { success: false }, { status: 200 });
    }

    if (request.method === "GET") {
      const detailMatch = pathname.match(DETAIL_RE);
      if (detailMatch) {
        const rows = await zonaKhasService.getRows(decodeURIComponent(detailMatch[1]));
        return Response.json(rows.length ? rows : { success: false }, { status: 200 });
      }

      const deleteMatch = pathname.match(DELETE_RE);
      if (deleteMatch) {
        await zonaKhasService.remove(decodeURIComponent(deleteMatch[1]));
        return legacyRedirect(request, "/zk");
      }
    }

    if (request.method === "POST" && pathname === "/insertzonakhas") {
      await zonaKhasService.create(await readBody(request));
      return legacyRedirect(request, "/zk");
    }

    if (request.method === "POST" && pathname === "/updatezonakhas") {
      await zonaKhasService.update(await readBody(request));
      return legacyRedirect(request, "/zk");
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
