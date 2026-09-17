import { aboutsService } from "@/server/services/abouts.service";

const ABOUT_RE = /^\/api_about_province_kdeks\/([^/]+)$/;
const HISTORY_RE = /^\/api_history_province_kdeks\/([^/]+)$/;

export async function handleLegacyKdeksProvinceProfileRead(request) {
  if (request.method !== "GET") return null;

  const pathname = new URL(request.url).pathname;

  try {
    const aboutMatch = pathname.match(ABOUT_RE);
    if (aboutMatch) {
      return Response.json(
        await aboutsService.getKdeksAboutProvince(decodeURIComponent(aboutMatch[1])),
        { status: 200 },
      );
    }

    const historyMatch = pathname.match(HISTORY_RE);
    if (historyMatch) {
      return Response.json(
        await aboutsService.getKdeksHistoryProvince(decodeURIComponent(historyMatch[1])),
        { status: 200 },
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
