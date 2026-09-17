import { handleLegacyAuth } from "@/server/controllers/legacy-auth.controller";
import { handleLegacyAboutsRead } from "@/server/controllers/legacy-abouts-read.controller";
import { handleLegacyAgenda } from "@/server/controllers/legacy-agenda.controller";
import { handleLegacyAreaReference } from "@/server/controllers/legacy-area-reference.controller";
import { handleLegacyContacts } from "@/server/controllers/legacy-contacts.controller";
import { handleLegacyDataMenu } from "@/server/controllers/legacy-data-menu.controller";
import { handleLegacyDirectorateDivision } from "@/server/controllers/legacy-directorate-division.controller";
import { handleLegacyGenderReference } from "@/server/controllers/legacy-gender-reference.controller";
import { handleLegacyHotIssueCategory } from "@/server/controllers/legacy-hotissue-category.controller";
import { handleLegacyHotIssueSubcategory } from "@/server/controllers/legacy-hotissue-subcategory.controller";
import { handleLegacyInstitutionsRead } from "@/server/controllers/legacy-institutions-read.controller";
import { handleLegacyKbliReference } from "@/server/controllers/legacy-kbli-reference.controller";
import { handleLegacyKdeksProfileRead } from "@/server/controllers/legacy-kdeks-profile-read.controller";
import { handleLegacyKdeksProvinceProfileRead } from "@/server/controllers/legacy-kdeks-province-profile-read.controller";
import { handleLegacyMaps } from "@/server/controllers/legacy-maps.controller";
import { handleLegacyMenuSettings } from "@/server/controllers/legacy-menu-settings.controller";
import { handleLegacyNegaraReference } from "@/server/controllers/legacy-negara-reference.controller";
import { handleLegacyNewsCategory } from "@/server/controllers/legacy-news-category.controller";
import { handleLegacyPembukaReference } from "@/server/controllers/legacy-pembuka-reference.controller";
import { handleLegacyPesertaReference } from "@/server/controllers/legacy-peserta-reference.controller";
import { handleLegacyPrioritasReference } from "@/server/controllers/legacy-prioritas-reference.controller";
import { handleLegacyProvince } from "@/server/controllers/legacy-province.controller";
import { handleLegacyRolesReference } from "@/server/controllers/legacy-roles-reference.controller";
import { handleLegacyScopes } from "@/server/controllers/legacy-scopes.controller";
import { handleLegacySocialMedia } from "@/server/controllers/legacy-social-media.controller";
import { handleLegacyTagging } from "@/server/controllers/legacy-tagging.controller";
import { handleLegacyUsiaReference } from "@/server/controllers/legacy-usia-reference.controller";
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

  const directorateDivisionResponse = await handleLegacyDirectorateDivision(request);
  if (directorateDivisionResponse) return directorateDivisionResponse;

  const genderReferenceResponse = await handleLegacyGenderReference(request);
  if (genderReferenceResponse) return genderReferenceResponse;

  const hotIssueCategoryResponse = await handleLegacyHotIssueCategory(request);
  if (hotIssueCategoryResponse) return hotIssueCategoryResponse;

  const hotIssueSubcategoryResponse = await handleLegacyHotIssueSubcategory(request);
  if (hotIssueSubcategoryResponse) return hotIssueSubcategoryResponse;

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

  const negaraReferenceResponse = await handleLegacyNegaraReference(request);
  if (negaraReferenceResponse) return negaraReferenceResponse;

  const newsCategoryResponse = await handleLegacyNewsCategory(request);
  if (newsCategoryResponse) return newsCategoryResponse;

  const pembukaReferenceResponse = await handleLegacyPembukaReference(request);
  if (pembukaReferenceResponse) return pembukaReferenceResponse;

  const pesertaReferenceResponse = await handleLegacyPesertaReference(request);
  if (pesertaReferenceResponse) return pesertaReferenceResponse;

  const prioritasReferenceResponse = await handleLegacyPrioritasReference(request);
  if (prioritasReferenceResponse) return prioritasReferenceResponse;

  const provinceResponse = await handleLegacyProvince(request);
  if (provinceResponse) return provinceResponse;

  const rolesReferenceResponse = await handleLegacyRolesReference(request);
  if (rolesReferenceResponse) return rolesReferenceResponse;

  const scopesResponse = await handleLegacyScopes(request);
  if (scopesResponse) return scopesResponse;

  const socialMediaResponse = await handleLegacySocialMedia(request);
  if (socialMediaResponse) return socialMediaResponse;

  const taggingResponse = await handleLegacyTagging(request);
  if (taggingResponse) return taggingResponse;

  const usiaReferenceResponse = await handleLegacyUsiaReference(request);
  if (usiaReferenceResponse) return usiaReferenceResponse;

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
