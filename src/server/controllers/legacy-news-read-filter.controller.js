import { newsService } from "@/server/services/news.service";

const CATEGORY_RE = /^\/news_category\/cat\/([^/]+)$/;
const DATE_RE = /^\/news\/search\/([^/]+)$/;

export async function handleLegacyNewsReadFilter(request) {
  if (request.method !== "GET") return null;

  const url = new URL(request.url);
  const pathname = url.pathname;

  try {
    const categoryMatch = pathname.match(CATEGORY_RE);
    if (categoryMatch) {
      const rows = await newsService.legacyFilters.byCategory(
        decodeURIComponent(categoryMatch[1]),
      );
      return Response.json(rows, { status: 200 });
    }

    const dateMatch = pathname.match(DATE_RE);
    if (dateMatch) {
      const rows = await newsService.legacyFilters.byDate(
        decodeURIComponent(dateMatch[1]),
      );
      return Response.json(rows.length ? rows : { success: false }, { status: 200 });
    }
  } catch (error) {
    return Response.json(
      { message: error.message || "Terjadi kesalahan pada server." },
      { status: error.status || 500 },
    );
  }

  return null;
}
