import { webProfileService } from "@/server/services/web-profile.service";

const MUTATIONS = Object.freeze({
  "/updatewebtitle": Object.freeze({ method: "legacyUpdateTitle", redirect: "/titleweb" }),
  "/updateweblogo": Object.freeze({ method: "legacyUpdateLogo", redirect: "/logo" }),
  "/updatewebheader": Object.freeze({ method: "legacyUpdateHeader", redirect: "/header" }),
  "/updatewebcolor": Object.freeze({ method: "legacyUpdateColor", redirect: "/color" }),
});

export async function handleLegacyWebProfileSettings(request) {
  if (request.method !== "POST") return null;

  const pathname = new URL(request.url).pathname;
  const mutation = MUTATIONS[pathname];
  if (!mutation) return null;

  try {
    const body = await readBody(request);
    await webProfileService[mutation.method](body);
    return Response.redirect(new URL(mutation.redirect, request.url), 302);
  } catch (error) {
    return Response.json(
      { error: error?.message || "Terjadi kesalahan pada server." },
      { status: 500 },
    );
  }
}

async function readBody(request) {
  const contentType = request.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    try {
      return await request.json();
    } catch {
      return {};
    }
  }

  if (contentType.includes("application/x-www-form-urlencoded")) {
    return Object.fromEntries(new URLSearchParams(await request.text()));
  }

  if (contentType.includes("multipart/form-data")) {
    const formData = await request.formData();
    return Object.fromEntries(
      [...formData.entries()].filter(([, value]) => typeof value === "string"),
    );
  }

  return {};
}
