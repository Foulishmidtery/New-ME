import { agendaService } from "@/server/services/agenda.service";

const DETAIL_RE = /^\/agendadetails\/([^/]+)$/;
const DELETE_RE = /^\/deleteagenda\/([^/]+)$/;

export async function handleLegacyAgenda(request) {
  const url = new URL(request.url);
  const pathname = url.pathname;

  try {
    if (request.method === "GET" && pathname === "/agenda") {
      const rows = await agendaService.legacy.list();
      return Response.json(rows.length ? rows : { success: false }, { status: 200 });
    }

    if (request.method === "GET" && pathname === "/agenda_graph") {
      return Response.json(await agendaService.legacy.graph(), { status: 200 });
    }

    if (request.method === "GET" && pathname === "/search_agenda") {
      const rows = await agendaService.legacy.search(url.searchParams.get("cari"));
      return Response.json(rows.length ? rows : { success: false }, { status: 200 });
    }

    if (request.method === "GET") {
      const detailMatch = pathname.match(DETAIL_RE);
      if (detailMatch) {
        const rows = await agendaService.legacy.getRows(decodeURIComponent(detailMatch[1]));
        return Response.json(rows.length ? rows : { success: false }, { status: 200 });
      }

      const deleteMatch = pathname.match(DELETE_RE);
      if (deleteMatch) {
        await agendaService.legacy.remove(decodeURIComponent(deleteMatch[1]));
        return legacyRedirect(request, "/a");
      }
    }

    if (request.method === "POST" && pathname === "/insertagenda") {
      await agendaService.legacy.create(await readBody(request));
      return legacyRedirect(request, "/a");
    }

    if (request.method === "POST" && pathname === "/updateagenda") {
      await agendaService.legacy.update(await readBody(request));
      return legacyRedirect(request, "/a");
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
