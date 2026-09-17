import { dataMenuService } from "@/server/services/data-menu.service";

const LIST_PATH = "/data_menu";
const INSERT_PATH = "/insert_data_menu";
const UPDATE_PATH = "/update_data_menu";
const DETAIL_RE = /^\/detail_data_menus\/([^/]+)$/;
const DELETE_RE = /^\/delete_data_menu\/([^/]+)$/;

export async function handleLegacyDataMenu(request) {
  const url = new URL(request.url);
  const pathname = url.pathname;

  if (request.method === "GET" && pathname === LIST_PATH) {
    const rows = await dataMenuService.legacy.list();
    return Response.json(rows.length ? rows : { success: false }, { status: 200 });
  }

  if (request.method === "GET") {
    const detailMatch = pathname.match(DETAIL_RE);
    if (detailMatch) {
      const rows = await dataMenuService.legacy.getRows(decodeURIComponent(detailMatch[1]));
      return Response.json(rows.length ? rows : { success: false }, { status: 200 });
    }

    const deleteMatch = pathname.match(DELETE_RE);
    if (deleteMatch) {
      await dataMenuService.legacy.remove(decodeURIComponent(deleteMatch[1]));
      return legacyRedirect(request, "/menu_data");
    }
  }

  if (request.method === "POST" && pathname === INSERT_PATH) {
    await dataMenuService.legacy.create(await readBody(request));
    return legacyRedirect(request, "/menu_data");
  }

  if (request.method === "POST" && pathname === UPDATE_PATH) {
    await dataMenuService.legacy.update(await readBody(request));
    return legacyRedirect(request, "/menu_data");
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
