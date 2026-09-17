import { aboutsService } from "@/server/services/abouts.service";

const ES_DETAIL_RE = /^\/es_detailabouts\/([^/]+)$/;
const KNEKS_DETAIL_RE = /^\/detailabouts\/([^/]+)$/;

/**
 * Read-only compatibility slice for the Old-BE About/Tentang Kami and
 * Ekonomi Syariah endpoints. Upload-capable mutations intentionally remain in
 * the legacy fallback until their per-route multipart contract is migrated.
 */
export async function handleLegacyAboutsRead(request) {
  if (request.method !== "GET") return null;

  const pathname = new URL(request.url).pathname;

  try {
    if (pathname === "/es_abouts") {
      return legacyRows(await aboutsService.getEsAbouts());
    }

    if (pathname === "/abouts") {
      return legacyRows(await aboutsService.getKneksAbouts());
    }

    const esDetailMatch = pathname.match(ES_DETAIL_RE);
    if (esDetailMatch) {
      return legacyRows(await aboutsService.getAboutById(decodeURIComponent(esDetailMatch[1])));
    }

    const kneksDetailMatch = pathname.match(KNEKS_DETAIL_RE);
    if (kneksDetailMatch) {
      return legacyRows(await aboutsService.getAboutById(decodeURIComponent(kneksDetailMatch[1])));
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
