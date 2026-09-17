import { handleLegacyAuth } from "@/server/controllers/legacy-auth.controller";
import { handleLegacyAboutsRead } from "@/server/controllers/legacy-abouts-read.controller";
import { handleLegacyAgenda } from "@/server/controllers/legacy-agenda.controller";
import { handleLegacyAreaReference } from "@/server/controllers/legacy-area-reference.controller";
import { handleLegacyContacts } from "@/server/controllers/legacy-contacts.controller";
import { handleLegacyDataMenu } from "@/server/controllers/legacy-data-menu.controller";
import { handleLegacyInstitutionsRead } from "@/server/controllers/legacy-institutions-read.controller";
import { handleLegacyKbliReference } from "@/server/controllers/legacy-kbli-reference.controller";
import { handleLegacyKdeksProfileRead } from "@/server/controllers/legacy-kdeks-profile-read.controller";
import { handleLegacyKdeksProvinceProfileRead } from "@/server/controllers/legacy-kdeks-province-profile-read.controller";
import { handleLegacyMaps } from "@/server/controllers/legacy-maps.controller";
import { handleLegacyMenuSettings } from "@/server/controllers/legacy-menu-settings.controller";
import { handleLegacyPesertaReference } from "@/server/controllers/legacy-peserta-reference.controller";
import { handleLegacyProvince } from "@/server/controllers/legacy-province.controller";
import { handleLegacyScopes } from "@/server/controllers/legacy-scopes.controller";
import { handleLegacySocialMedia } from "@/server/controllers/legacy-social-media.controller";
import { handleLegacyTagging } from "@/server/controllers/legacy-tagging.controller";
import { handleLegacyWebProfileRead } from "@/server/controllers/legacy-web-profile-read.controller";
import { handleLegacyWebProfileSettings } from "@/server/controllers/legacy-web-profile-settings.controller";
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

  const areaReferenceResponse = await handleLegacyAreaReference(request);
  if (areaReferenceResponse) return areaReferenceResponse;

  const contactsResponse = await handleLegacyContacts(request);
  if (contactsResponse) return contactsResponse;

  const dataMenuResponse = await handleLegacyDataMenu(request);
  if (dataMenuResponse) return dataMenuResponse;

  const institutionsReadResponse = await handleLegacyInstitutionsRead(request);
  if (institutionsReadResponse) return institutionsReadResponse;

  const kbliReferenceResponse = await handleLegacyKbliReference(request);
  if (kbliReferenceResponse) return kbliReferenceResponse;

  const kdeksProfileReadResponse = await handleLegacyKdeksProfileRead(request);
  if (kdeksProfileReadResponse) return kdeksProfileReadResponse;

  const kdeksProvinceProfileReadResponse = await handleLegacyKdeksProvinceProfileRead(request);
  if (kdeksProvinceProfileReadResponse) return kdeksProvinceProfileReadResponse;

  const mapsResponse = await handleLegacyMaps(request);
  if (mapsResponse) return mapsResponse;

  const menuSettingsResponse = await handleLegacyMenuSettings(request);
  if (menuSettingsResponse) return menuSettingsResponse;

  const pesertaReferenceResponse = await handleLegacyPesertaReference(request);
  if (pesertaReferenceResponse) return pesertaReferenceResponse;

  const provinceResponse = await handleLegacyProvince(request);
  if (provinceResponse) return provinceResponse;

  const scopesResponse = await handleLegacyScopes(request);
  if (scopesResponse) return scopesResponse;

  const socialMediaResponse = await handleLegacySocialMedia(request);
  if (socialMediaResponse) return socialMediaResponse;

  const taggingResponse = await handleLegacyTagging(request);
  if (taggingResponse) return taggingResponse;

  const webProfileReadResponse = await handleLegacyWebProfileRead(request);
  if (webProfileReadResponse) return webProfileReadResponse;

  const webProfileSettingsResponse = await handleLegacyWebProfileSettings(request);
  if (webProfileSettingsResponse) return webProfileSettingsResponse;

  const zonaKhasResponse = await handleLegacyZonaKhas(request);
  if (zonaKhasResponse) return zonaKhasResponse;

  const response = await handleLegacyApi(request);
  return response || Response.json({ message: "Route API tidak ditemukan." }, { status: 404 });
}

export const GET = dispatch;
export const POST = dispatch;
export const PUT = dispatch;
export const DELETE = dispatch;
