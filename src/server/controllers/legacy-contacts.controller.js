import { profileService } from "@/server/services/profile.service";

export async function handleLegacyContacts(request) {
  const url = new URL(request.url);
  const pathname = url.pathname;

  try {
    if (request.method === "GET" && pathname === "/contacts") {
      const rows = await profileService.listContacts();
      return Response.json(rows.length ? rows : { success: false }, { status: 200 });
    }

    if (request.method === "POST" && pathname === "/updatecontacts") {
      const body = await readBody(request);
      await profileService.updateContact(body.id, body);
      return Response.redirect(new URL(`/c_edit/${encodeURIComponent(body.id ?? "")}`, request.url), 302);
    }

    if (request.method === "POST" && pathname === "/questbook") {
      await profileService.createQuestbook(await readBody(request));
      return Response.json({ success: true }, { status: 200 });
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
