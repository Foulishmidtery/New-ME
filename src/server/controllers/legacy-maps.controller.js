import { profileService } from "@/server/services/profile.service";

export async function handleLegacyMaps(request) {
  const url = new URL(request.url);
  const pathname = url.pathname;

  try {
    if (request.method === "GET" && pathname === "/maps") {
      const rows = await profileService.listMaps();
      return Response.json(rows.length ? rows : { success: false }, { status: 200 });
    }

    if (request.method === "POST" && pathname === "/updatemaps") {
      const body = await readBody(request);
      await profileService.updateMap(body.id, body);
      return Response.redirect(new URL(`/m_edit/${encodeURIComponent(body.id ?? "")}`, request.url), 302);
    }
  } catch (error) {
    return Response.json(
      { message: error.message || "Terjadi kesalahan pada server." },
      { status: error.status || 500 },
    );
  }

  return null;
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
