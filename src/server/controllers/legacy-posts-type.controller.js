import { newsService } from "@/server/services/news.service";

const POSTS_TYPE_RE = /^\/posts\/type\/([^/]+)$/;
const LEGITIMATE_POST_TYPES = new Set(["photos", "videos"]);

function mapLegacyPhoto(items) {
  return {
    id: items?.id,
    title: items?.title,
    photo: items?.photo,
    content: items?.content,
    photos_datetime: items?.photos_datetime,
    title_en: items?.title_en,
    content_en: items?.content_en,
    ph: items?.photo?.split("/")[5],
    web_identity: items?.web_identity,
    tag: items?.tag,
    directorat: items?.directorat,
    id_province: items?.id_province,
    is_publish: items?.is_publish,
    users_name: items?.users_name,
  };
}

function mapLegacyVideo(items) {
  return {
    id: items?.id,
    title: items?.title,
    video: items?.video,
    duration: items?.duration,
    content: items?.content,
    videos_datetime: items?.videos_datetime,
    title_en: items?.title_en,
    content_en: items?.content_en,
    web_identity: items?.web_identity,
    tag: items?.tag,
    directorat: items?.directorat,
    id_province: items?.id_province,
    is_publish: items?.is_publish,
    users_name: items?.users_name,
  };
}

export async function handleLegacyPostsType(request) {
  if (request.method !== "GET") return null;

  const url = new URL(request.url);
  const match = url.pathname.match(POSTS_TYPE_RE);
  if (!match) return null;

  try {
    const name = decodeURIComponent(match[1]);

    // Available production consumers only use these two values. Reject everything
    // else before repository access so request input can never become a SQL identifier.
    if (!LEGITIMATE_POST_TYPES.has(name)) {
      return Response.json(
        { message: "Unsupported legacy post type." },
        { status: 400 },
      );
    }

    const rows = await newsService.legacyPostTypes.list(name);
    if (!rows.length) {
      return Response.json({ success: false }, { status: 200 });
    }

    const responseRows =
      name === "photos" ? rows.map(mapLegacyPhoto) : rows.map(mapLegacyVideo);
    return Response.json(responseRows, { status: 200 });
  } catch (error) {
    return Response.json(
      { message: error.message || "Terjadi kesalahan pada server." },
      { status: error.status || 500 },
    );
  }
}
