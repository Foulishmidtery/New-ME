import { aboutsService } from "@/server/services/abouts.service";

/**
 * Read-only KDEKS profile/reference compatibility routes.
 * KDEKS mutations and province-specific shaped endpoints remain separate so
 * their distinct contracts can be migrated and tested independently.
 */
export async function handleLegacyKdeksProfileRead(request) {
  if (request.method !== "GET") return null;

  const pathname = new URL(request.url).pathname;

  try {
    if (pathname === "/api_kdeks_list") {
      return Response.json(await aboutsService.getKdeksAboutsList(), { status: 200 });
    }

    if (pathname === "/api_about_kdeks") {
      return Response.json(await aboutsService.getKdeksAbouts(), { status: 200 });
    }

    if (pathname === "/api_history_kdeks") {
      return Response.json(await aboutsService.getKdeksHistory(), { status: 200 });
    }

    if (pathname === "/api_maps_kdeks") {
      return Response.json(await aboutsService.getMapsKdeks(), { status: 200 });
    }
  } catch (error) {
    if (pathname === "/api_maps_kdeks") {
      return Response.json(
        { success: false, message: "Terjadi kesalahan server" },
        { status: 500 },
      );
    }

    return Response.json(
      { error: error?.message || "Terjadi kesalahan pada server." },
      { status: 500 },
    );
  }

  return null;
}
