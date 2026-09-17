import { profileService } from "@/server/services/profile.service";

const SOCIAL_DETAIL_RE = /^\/detailsosmed\/([^/]+)$/;
const SOCIAL_DELETE_RE = /^\/deletesosmed\/([^/]+)$/;
const POST_DETAIL_RE = /^\/postdetailsosmed\/([^/]+)$/;
const POST_DELETE_RE = /^\/postdeletesosmed\/([^/]+)$/;

export async function handleLegacySocialMedia(request) {
  const url = new URL(request.url);
  const pathname = url.pathname;

  try {
    if (request.method === "GET" && pathname === "/sosmed") {
      return legacyRows(await profileService.listSocialMedias());
    }

    if (request.method === "GET" && pathname === "/postsosmed") {
      return legacyRows(await profileService.listPostSocialMedias());
    }

    if (request.method === "GET" && pathname === "/postsosmedfe") {
      return legacyRows(await profileService.listPostSocialMediasFe());
    }

    if (request.method === "GET") {
      const socialDetail = pathname.match(SOCIAL_DETAIL_RE);
      if (socialDetail) {
        const row = await profileService.getSocialMedia(decodeURIComponent(socialDetail[1]));
        return Response.json(row ? [row] : { success: false }, { status: 200 });
      }

      const socialDelete = pathname.match(SOCIAL_DELETE_RE);
      if (socialDelete) {
        await profileService.deleteSocialMedia(decodeURIComponent(socialDelete[1]));
        return legacyRedirect(request, "/sm");
      }

      const postDetail = pathname.match(POST_DETAIL_RE);
      if (postDetail) {
        const row = await profileService.getPostSocialMedia(decodeURIComponent(postDetail[1]));
        return Response.json(row ? [row] : { success: false }, { status: 200 });
      }

      const postDelete = pathname.match(POST_DELETE_RE);
      if (postDelete) {
        await profileService.deletePostSocialMedia(decodeURIComponent(postDelete[1]));
        return legacyRedirect(request, "/psm");
      }
    }

    if (request.method === "POST" && pathname === "/updatesosmed") {
      const body = await readBody(request);
      await profileService.updateSocialMedia(body.id, body);
      return legacyRedirect(request, "/sm");
    }

    if (request.method === "POST" && pathname === "/insertpostsosmed") {
      await profileService.createPostSocialMedia(await readBody(request));
      return legacyRedirect(request, "/psm");
    }

    if (request.method === "POST" && pathname === "/updatepostsosmed") {
      const body = await readBody(request);
      await profileService.updatePostSocialMedia(body.id, body);
      return legacyRedirect(request, "/psm");
    }
  } catch (error) {
    return Response.json(
      { message: error.message || "Terjadi kesalahan pada server." },
      { status: error.status || 500 },
    );
  }

  return null;
}

function legacyRows(rows) {
  return Response.json(rows.length ? rows : { success: false }, { status: 200 });
}

function legacyRedirect(request, pathname) {
  return Response.redirect(new URL(pathname, request.url), 302);
}

async function readBody(request) {
  const contentType = request.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    try { return await request.json(); } catch { return {}; }
  }
  if (contentType.includes("application/x-www-form-urlencoded")) {
    return Object.fromEntries(new URLSearchParams(await request.text()));
  }
  if (contentType.includes("multipart/form-data")) {
    const formData = await request.formData();
    return Object.fromEntries([...formData.entries()].filter(([, value]) => typeof value === "string"));
  }
  return {};
}
