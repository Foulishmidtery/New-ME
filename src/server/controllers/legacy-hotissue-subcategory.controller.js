import { hotissueService } from "@/server/services/hotissue.service";

const DETAIL_RE = /^\/detailhotissuesubcategory\/([^/]+)$/;
const DELETE_RE = /^\/deletehotissuesubcategory\/([^/]+)$/;

export async function handleLegacyHotIssueSubcategory(request) {
  const url = new URL(request.url);
  const pathname = url.pathname;

  try {
    if (request.method === "GET" && pathname === "/hotissuesubcategory") {
      const rows = await hotissueService.legacySubcategory.list();
      return Response.json(rows.length ? rows : { success: false }, { status: 200 });
    }

    if (request.method === "GET") {
      const detailMatch = pathname.match(DETAIL_RE);
      if (detailMatch) {
        const row = await hotissueService.legacySubcategory.get(
          decodeURIComponent(detailMatch[1]),
        );
        return Response.json(row ? [row] : { success: false }, { status: 200 });
      }

      const deleteMatch = pathname.match(DELETE_RE);
      if (deleteMatch) {
        await hotissueService.legacySubcategory.remove(
          decodeURIComponent(deleteMatch[1]),
        );
        return legacyRedirect(request, "/hisc");
      }
    }

    // Old-BE intentionally exposes the historical typo `/inserthotissubcategory`.
    if (request.method === "POST" && pathname === "/inserthotissubcategory") {
      await hotissueService.legacySubcategory.create(await readBody(request));
      return legacyRedirect(request, "/hisc");
    }

    if (request.method === "POST" && pathname === "/updatehotissuesubcategory") {
      await hotissueService.legacySubcategory.update(await readBody(request));
      return legacyRedirect(request, "/hisc");
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
