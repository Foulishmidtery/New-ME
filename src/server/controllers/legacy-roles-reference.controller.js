import { rolesReferenceService } from "@/server/services/roles-reference.service";

/** Old-BE compatibility slice for GET /roles. */
export async function handleLegacyRolesReference(request) {
  if (request.method !== "GET") return null;

  const pathname = new URL(request.url).pathname;
  if (pathname !== "/roles") return null;

  try {
    const rows = await rolesReferenceService.list();
    return Response.json(rows.length ? rows : { success: false }, { status: 200 });
  } catch (error) {
    return Response.json(
      { error: error?.message || "Terjadi kesalahan pada server." },
      { status: 500 },
    );
  }
}
