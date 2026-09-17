import { menuSettingsService } from "@/server/services/menu-settings.service";

const MENU_DETAIL_RE = /^\/api_menu_detail\/([^/]+)$/;
const SUBMENU_DETAIL_RE = /^\/api_submenu_detail\/([^/]+)$/;

export async function handleLegacyMenuSettings(request) {
  const pathname = new URL(request.url).pathname;

  try {
    if (request.method === "GET" && pathname === "/api_menu") {
      return legacyRows(await menuSettingsService.legacyListMenus());
    }

    if (request.method === "GET" && pathname === "/api_submenu") {
      return legacyRows(await menuSettingsService.legacyListSubmenus());
    }

    if (request.method === "GET") {
      const menuDetailMatch = pathname.match(MENU_DETAIL_RE);
      if (menuDetailMatch) {
        return legacyRows(
          await menuSettingsService.legacyMenuDetail(decodeURIComponent(menuDetailMatch[1])),
        );
      }

      const submenuDetailMatch = pathname.match(SUBMENU_DETAIL_RE);
      if (submenuDetailMatch) {
        return legacyRows(
          await menuSettingsService.legacySubmenuDetail(decodeURIComponent(submenuDetailMatch[1])),
        );
      }
    }

    if (request.method === "POST" && pathname === "/insertmenu") {
      await menuSettingsService.legacyInsertMenu(await readBody(request));
      return legacyRedirect(request, "/menu");
    }

    if (request.method === "POST" && pathname === "/updatemenu") {
      await menuSettingsService.legacyUpdateMenu(await readBody(request));
      return legacyRedirect(request, "/menu");
    }

    if (request.method === "POST" && pathname === "/insertsubmenu") {
      await menuSettingsService.legacyInsertSubmenu(await readBody(request));
      return legacyRedirect(request, "/submenu");
    }

    if (request.method === "POST" && pathname === "/updatesubmenu") {
      await menuSettingsService.legacyUpdateSubmenu(await readBody(request));
      return legacyRedirect(request, "/submenu");
    }
  } catch (error) {
    return Response.json(
      { error: error?.message || "Terjadi kesalahan pada server." },
      { status: 500 },
    );
  }

  return null;
}

function legacyRows(rows) {
  return Response.json(rows?.length ? rows : { success: false }, { status: 200 });
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
