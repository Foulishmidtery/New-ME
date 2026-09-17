import { handleLegacyAuth } from "@/server/controllers/legacy-auth.controller";
import { handleLegacyAgenda } from "@/server/controllers/legacy-agenda.controller";
import { handleLegacyDataMenu } from "@/server/controllers/legacy-data-menu.controller";
import { handleLegacyProvince } from "@/server/controllers/legacy-province.controller";
import { handleLegacyTagging } from "@/server/controllers/legacy-tagging.controller";
import { handleLegacyApi } from "@/server/legacy-handler-adapter";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function dispatch(request) {
  const authResponse = await handleLegacyAuth(request);
  if (authResponse) return authResponse;

  const agendaResponse = await handleLegacyAgenda(request);
  if (agendaResponse) return agendaResponse;

  const dataMenuResponse = await handleLegacyDataMenu(request);
  if (dataMenuResponse) return dataMenuResponse;

  const provinceResponse = await handleLegacyProvince(request);
  if (provinceResponse) return provinceResponse;

  const taggingResponse = await handleLegacyTagging(request);
  if (taggingResponse) return taggingResponse;

  const response = await handleLegacyApi(request);
  return response || Response.json({ message: "Route API tidak ditemukan." }, { status: 404 });
}

export const GET = dispatch;
export const POST = dispatch;
export const PUT = dispatch;
export const DELETE = dispatch;
