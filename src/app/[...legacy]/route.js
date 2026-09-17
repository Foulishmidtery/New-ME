import { handleLegacyAuth } from "@/server/controllers/legacy-auth.controller";
import { handleLegacyAboutsRead } from "@/server/controllers/legacy-abouts-read.controller";
import { handleLegacyAgenda } from "@/server/controllers/legacy-agenda.controller";
import { handleLegacyContacts } from "@/server/controllers/legacy-contacts.controller";
import { handleLegacyDataMenu } from "@/server/controllers/legacy-data-menu.controller";
import { handleLegacyKdeksProfileRead } from "@/server/controllers/legacy-kdeks-profile-read.controller";
import { handleLegacyMaps } from "@/server/controllers/legacy-maps.controller";
import { handleLegacyProvince } from "@/server/controllers/legacy-province.controller";
import { handleLegacyScopes } from "@/server/controllers/legacy-scopes.controller";
import { handleLegacySocialMedia } from "@/server/controllers/legacy-social-media.controller";
import { handleLegacyTagging } from "@/server/controllers/legacy-tagging.controller";
import { handleLegacyZonaKhas } from "@/server/controllers/legacy-zona-khas.controller";
import { handleLegacyApi } from "@/server/legacy-handler-adapter";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function dispatch(request) {
  const authResponse = await handleLegacyAuth(request);
  if (authResponse) return authResponse;

  const aboutsReadResponse = await handleLegacyAboutsRead(request);
  if (aboutsReadResponse) return aboutsReadResponse;

  const agendaResponse = await handleLegacyAgenda(request);
  if (agendaResponse) return agendaResponse;

  const contactsResponse = await handleLegacyContacts(request);
  if (contactsResponse) return contactsResponse;

  const dataMenuResponse = await handleLegacyDataMenu(request);
  if (dataMenuResponse) return dataMenuResponse;

  const kdeksProfileReadResponse = await handleLegacyKdeksProfileRead(request);
  if (kdeksProfileReadResponse) return kdeksProfileReadResponse;

  const mapsResponse = await handleLegacyMaps(request);
  if (mapsResponse) return mapsResponse;

  const provinceResponse = await handleLegacyProvince(request);
  if (provinceResponse) return provinceResponse;

  const scopesResponse = await handleLegacyScopes(request);
  if (scopesResponse) return scopesResponse;

  const socialMediaResponse = await handleLegacySocialMedia(request);
  if (socialMediaResponse) return socialMediaResponse;

  const taggingResponse = await handleLegacyTagging(request);
  if (taggingResponse) return taggingResponse;

  const zonaKhasResponse = await handleLegacyZonaKhas(request);
  if (zonaKhasResponse) return zonaKhasResponse;

  const response = await handleLegacyApi(request);
  return response || Response.json({ message: "Route API tidak ditemukan." }, { status: 404 });
}

export const GET = dispatch;
export const POST = dispatch;
export const PUT = dispatch;
export const DELETE = dispatch;
