import { hotissueService } from "@/server/services/hotissue.service";

const DETAIL_RE = /^\/detailhotissuecategory\/([^/]+)$/;
const DELETE_RE = /^\/deletehotissuecategory\/([^/]+)$/;

export async function handleLegacyHotIssueCategory(request) {
  const url = new URL(request.url);
  const pathname = url.pathname;

  try {
    if (request.method === "GET" && pathname === "/hotissuecategory") {
      const rows = await hotissueService.listCategories();
      return Response.json(rows.length ? rows : { success: false }, { status: 200 });
    }

    if (request.method === "GET") {
      const detailMatch = pathname.match(DETAIL_RE);
      if (detailMatch) {
        const row = await hotissueService.getCategory(decodeURIComponent(detailMatch[1]));
        return Response.json(row ? [row] : { success: false }, { status: 200 });
      }

      const deleteMatch = pathname.match(DELETE_RE);
      if (deleteMatch) {
        await hotissueService.removeCategory(decodeURIComponent(deleteMatch[1]));
        return legacyRedirect(request, "/hic");
      }
    }

    if (request.method === "POST" && pathname === "/inserthotissuecategory") {
      await hotissueService.createCategory(await readBody(request));
      return legacyRedirect(request, "/hic");
    }

    if (request.method === "POST" && pathname === "/updatehotissuecategory") {
      const body = await readBody(request);
      await hotissueService.updateCategory(body.id, body);
      return legacyRedirect(request, "/hic");
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
  if (contentType.includes("multipart/form-data")) {
    const formData = await request.formData();
    return Object.fromEntries(
      [...formData.entries()].filter(([, value]) => typeof value === "string"),
    );
  }
  return {};
}
