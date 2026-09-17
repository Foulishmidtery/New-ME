import { newsService } from "@/server/services/news.service";

const PHOTO_DETAIL_RE = /^\/photodetail\/([^/]+)$/;

export async function handleLegacyPhotoDetail(request) {
  if (request.method !== "GET") return null;

  const url = new URL(request.url);
  const match = url.pathname.match(PHOTO_DETAIL_RE);
  if (!match) return null;

  try {
    const rows = await newsService.legacyPhoto.detail(
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
