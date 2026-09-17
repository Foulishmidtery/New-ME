import { newsService } from "@/server/services/news.service";

const DETAIL_RE = /^\/detailnewscategory\/([^/]+)$/;
const DELETE_RE = /^\/deletenewscategory\/([^/]+)$/;

export async function handleLegacyNewsCategory(request) {
  const url = new URL(request.url);
  const pathname = url.pathname;

  try {
    if (request.method === "GET" && pathname === "/categories") {
      const rows = await newsService.legacyCategory.list();
      return Response.json(rows.length ? rows : { success: false }, { status: 200 });
    }

    if (request.method === "GET") {
      const detailMatch = pathname.match(DETAIL_RE);
      if (detailMatch) {
        const rows = await newsService.legacyCategory.detail(
          decodeURIComponent(detailMatch[1]),
        );
        return Response.json(rows.length ? rows : { success: false }, { status: 200 });
      }

      const deleteMatch = pathname.match(DELETE_RE);
      if (deleteMatch) {
        await newsService.legacyCategory.remove(
          decodeURIComponent(deleteMatch[1]),
        );
        return legacyRedirect(request, "/nc");
      }
    }

    if (request.method === "POST" && pathname === "/insertnewscategory") {
      await newsService.legacyCategory.create(await readBody(request));
      return legacyRedirect(request, "/nc");
    }

    if (request.method === "POST" && pathname === "/updatenewscategory") {
      await newsService.legacyCategory.update(await readBody(request));
      return legacyRedirect(request, "/nc");
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
