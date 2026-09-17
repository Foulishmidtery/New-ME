import { profileService } from "@/server/services/profile.service";

const DETAIL_RE = /^\/detailinstitutions\/([^/]+)$/;

/**
 * Read-only compatibility slice for Institutions.
 * Insert/update/delete routes intentionally remain in the fallback until the
 * logo_member upload contract has been inventoried and migrated separately.
 */
export async function handleLegacyInstitutionsRead(request) {
  if (request.method !== "GET") return null;

  const pathname = new URL(request.url).pathname;

  try {
    if (pathname === "/institutions") {
      const rows = await profileService.listInstitutions();
      return Response.json(rows.length ? rows : { success: false }, { status: 200 });
    }

    const detailMatch = pathname.match(DETAIL_RE);
    if (detailMatch) {
      const row = await profileService.getInstitution(decodeURIComponent(detailMatch[1]));
      return Response.json(row ? [row] : { success: false }, { status: 200 });
    }
  } catch (error) {
    return Response.json(
      { error: error?.message || "Terjadi kesalahan pada server." },
      { status: 500 },
    );
  }

  return null;
}
