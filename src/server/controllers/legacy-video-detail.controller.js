import { newsService } from "@/server/services/news.service";

const VIDEO_DETAIL_RE = /^\/videodetail\/([^/]+)$/;

export async function handleLegacyVideoDetail(request) {
  if (request.method !== "GET") return null;

  const url = new URL(request.url);
  const match = url.pathname.match(VIDEO_DETAIL_RE);
  if (!match) return null;

  try {
    const rows = await newsService.legacyVideo.detail(
      decodeURIComponent(match[1]),
    );

    return Response.json(
      rows.length ? rows : { success: false },
      { status: 200 },
    );
  } catch (error) {
    return Response.json(
      { message: error.message || "Terjadi kesalahan pada server." },
      { status: error.status || 500 },
    );
  }
}
