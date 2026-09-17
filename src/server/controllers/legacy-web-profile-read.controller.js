import { webProfileService } from "@/server/services/web-profile.service";

const DETAIL_RE = /^\/api_detail_webprofile\/([^/]+)$/;

export async function handleLegacyWebProfileRead(request) {
  if (request.method !== "GET") return null;

  const pathname = new URL(request.url).pathname;

  try {
    if (pathname === "/api_web_profile") {
      return legacyRows(await webProfileService.legacyList());
    }

    const detailMatch = pathname.match(DETAIL_RE);
    if (detailMatch) {
      return legacyRows(
        await webProfileService.legacyDetail(decodeURIComponent(detailMatch[1])),
      );
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
