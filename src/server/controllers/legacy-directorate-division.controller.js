import { directoratService } from "@/server/services/directorat.service";

const DETAIL_RE = /^\/directorats_devisi_detail\/([^/]+)$/;
const DELETE_RE = /^\/division_delete\/([^/]+)$/;

export async function handleLegacyDirectorateDivision(request) {
  const url = new URL(request.url);
  const pathname = url.pathname;

  try {
    if (request.method === "GET" && pathname === "/directorat_devisi") {
      return Response.json(await directoratService.legacyDivision.list(), { status: 200 });
    }

    if (request.method === "GET") {
      const detailMatch = pathname.match(DETAIL_RE);
      if (detailMatch) {
        return Response.json(
          await directoratService.legacyDivision.detail(
            decodeURIComponent(detailMatch[1]),
          ),
          { status: 200 },
        );
      }

      const deleteMatch = pathname.match(DELETE_RE);
      if (deleteMatch) {
        await directoratService.legacyDivision.remove(
          decodeURIComponent(deleteMatch[1]),
        );
        return legacyRedirect(request, "/devision");
      }
    }

    if (request.method === "POST" && pathname === "/directorats_devisi_add") {
      await directoratService.legacyDivision.create(await readBody(request));
      return legacyRedirect(request, "/devision");
    }

    if (request.method === "POST" && pathname === "/directorats_devisi_edit") {
      await directoratService.legacyDivision.update(await readBody(request));
      return legacyRedirect(request, "/devision");
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
    try {
      return await request.json();
    } catch {
      return {};
    }
  }

  if (contentType.includes("application/x-www-form-urlencoded")) {
    return Object.fromEntries(new URLSearchParams(await request.text()));
  }

  return {};
}
