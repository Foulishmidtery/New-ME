import { handleLegacyAuth } from "@/server/controllers/legacy-auth.controller";
import { handleLegacyApi } from "@/server/legacy-handler-adapter";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function dispatch(request) {
  const authResponse = await handleLegacyAuth(request);
  if (authResponse) return authResponse;

  const response = await handleLegacyApi(request);
  return response || Response.json({ message: "Route API tidak ditemukan." }, { status: 404 });
}

export const GET = dispatch;
export const POST = dispatch;
export const PUT = dispatch;
export const DELETE = dispatch;
