import { mkdir, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import { matchLegacyRoute } from "@/server/legacy-route-manifest";
import { getRepositoryHandler } from "@/server/repositories";
import { agendaService } from "@/server/services/agenda.service";
import { newsService } from "@/server/services/news.service";
import { hotissueService } from "@/server/services/hotissue.service";
import { usersService } from "@/server/services/users.service";
import { kdeksService } from "@/server/services/kdeks.service";
import { filesService } from "@/server/services/files.service";
import { profileService } from "@/server/services/profile.service";
import { bannersService } from "@/server/services/banners.service";
import { dataService } from "@/server/services/data.service";
import { dataMenuService } from "@/server/services/data-menu.service";
import { extraService } from "@/server/services/extra.service";
import { authService } from "@/server/services/auth.service";
import { UploadValidationError, safeUploadDirectory, validateUpload } from "@/server/upload-policy";

import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const staticDataRoutes = {
  "/kbli": require("./legacy-db/data_kbli.json"),
  "/peserta": require("./legacy-db/data_peserta.json"),
  "/area": require("./legacy-db/data_area.json"),
  "/gender": require("./legacy-db/data_gender.json"),
  "/negara": require("./legacy-db/data_negara.json"),
  "/pembuka": require("./legacy-db/data_pembuka.json"),
  "/prioritas": require("./legacy-db/data_prioritas.json"),
  "/usia": require("./legacy-db/data_usia.json"),
};

export async function handleLegacyApi(request) {
  const url = new URL(request.url);
  if (request.method === "GET" && staticDataRoutes[url.pathname]) {
    return Response.json(staticDataRoutes[url.pathname]);
  }

  const route = matchLegacyRoute(request.method, url.pathname);
  const nativeResponse = await handleNativeAgenda(route, request, url);
  if (nativeResponse) return nativeResponse;
  const handler = route && getRepositoryHandler(route.handler);
  if (!route || typeof handler !== "function") return null;

  let req;
  const response = createResponseAdapter();
  try {
    req = await createRequestAdapter(request, route.params, url.pathname);
    await handler(req, response);
    if (response.getStatus() >= 400) await cleanupUploadedFiles(req);
    return response.toResponse();
  } catch (error) {
    if (req) await cleanupUploadedFiles(req);
    if (error instanceof UploadValidationError) {
      return Response.json({ message: error.message }, { status: error.status });
    }
    console.error(`Legacy API adapter failed: ${request.method} ${url.pathname}`, error);
    return Response.json({ message: "Terjadi kesalahan pada server." }, { status: 500 });
  }
}

async function handleNativeAgenda(route, request, url) {
  if (!route) return null;
  try {
    // Authentication routing. Keep the legacy URLs and response shapes so existing
    // CMS/front-end callers do not need to change.
    if (["do_login", "api_login", "user_register"].includes(route.handler)) {
      const { body } = await readBody(request, url.pathname);
      if (route.handler === "user_register") {
        return Response.json(await authService.register(body));
      }
      if (route.handler === "do_login") {
        const result = await authService.login(body.email, body.password);
        return responseWithAuthCookies(result, { crossSite: false });
      }
      const result = await authService.apiLogin(body.email, body.url || "");
      return responseWithAuthCookies(result, { crossSite: true });
    }
    if (route.handler === "do_logout") {
      return clearAuthCookies(new URL("/", request.url));
    }
    if (route.handler === "api_logout") {
      const origin = process.env.SSO_LOGOUT_ORIGIN || "https://sso-dev.kneks.go.id";
      return clearAuthCookies(new URL("/login", origin));
    }
    if (route.handler === "analitics") {
      const cookies = parseCookies(request.headers.get("cookie"));
      return Response.json(await authService.getAnalytics(cookies.id));
    }

    // Agenda routing
    if (route.handler === "agendas") {
      const rows = await agendaService.list();
      return Response.json(rows.length ? rows : { success: false });
    }
    if (route.handler === "agendadetails") {
      const agenda = await agendaService.get(route.params.id);
      return Response.json(agenda ? [agenda] : { success: false });
    }
    if (route.handler === "search_agenda") {
      const rows = await agendaService.search(url.searchParams.get("cari"));
      return Response.json(rows.length ? rows : { success: false });
    }
    if (["insertagenda", "updateagenda"].includes(route.handler)) {
      const body = await readBody(request, url.pathname);
      if (route.handler === "insertagenda") await agendaService.create(body.body);
      else await agendaService.update(body.body.id, body.body);
      return Response.redirect(new URL("/a", request.url), 302);
    }
    if (route.handler === "deleteagenda") {
      await agendaService.remove(route.params.id);
      return Response.redirect(new URL("/a", request.url), 302);
    }

    // Data Menu routing (legacy URL, native service)
    if (route.handler === "data_menus") return Response.json(await dataMenuService.list());
    if (route.handler === "detail_data_menus") {
      const item = await dataMenuService.get(route.params.id);
      return Response.json(item ? [item] : []);
    }
    if (["insertdatamenus", "updatedatamenus"].includes(route.handler)) {
      const body = await readBody(request, url.pathname);
      if (route.handler === "insertdatamenus") await dataMenuService.create(body.body);
      else await dataMenuService.update(body.body.id, body.body);
      return Response.redirect(new URL("/cms/data-menu", request.url), 302);
    }
    if (route.handler === "deletedatamenus") {
      await dataMenuService.remove(route.params.id);
      return Response.redirect(new URL("/cms/data-menu", request.url), 302);
    }
    
    // News routing
    if (route.handler === "posts") {
      const cookies = parseCookies(request.headers.get("cookie"));
      const rows = await newsService.list(cookies.roles_id);
      return Response.json(rows.length ? rows : { success: false });
    }
    if (route.handler === "seacrh_posts") {
      const rows = await newsService.search(url.searchParams.get("cari"));
      return Response.json(rows);
    }
    if (route.handler === "newsdetail") {
      const news = await newsService.get(route.params.id);
      return Response.json(news ? [news] : []);
    }
    if (["insertnews", "updatenews"].includes(route.handler)) {
      const body = await readBody(request, url.pathname);
      const cookies = parseCookies(request.headers.get("cookie"));
      const reqBody = {
        ...body.body,
        users_id: cookies.id,
        users_name: cookies.name,
        web_identity: (cookies.roles_id == '6') ? 'kdeks' : 'kneks'
      };
      const siteUrl = "https://cms.kneks.go.id";
      
      if (body.files && body.files.file) {
         // handle upload files correctly if needed, but we will assume it just passes strings for images for now
         const filesArray = Array.isArray(body.files.file) ? body.files.file : [body.files.file];
         reqBody.image = filesArray.map(f => siteUrl + "/uploads/news/" + f.filename).join(',');
      } else if (body.file) {
         reqBody.image = siteUrl + "/uploads/news/" + body.file.filename;
      }
      
      if (route.handler === "insertnews") await newsService.create(reqBody);
      else await newsService.update(reqBody.id, reqBody);
      return Response.redirect(new URL("/n", request.url), 302);
    }
    if (route.handler === "deletenews") {
      await newsService.remove(route.params.id);
      return Response.redirect(new URL("/n", request.url), 302);
    }
    
    // Hot Issue Routing
    if (route.handler === "hotissuecategory") {
        const rows = await hotissueService.listCategories();
        return Response.json(rows.length ? rows : { success: false });
    }
    if (route.handler === "detailhotissuecategory") {
        const row = await hotissueService.getCategory(route.params.id);
        return Response.json(row ? [row] : { success: false });
    }
    if (["inserthotissuecategory", "updatehotissuecategory"].includes(route.handler)) {
        const body = await readBody(request, url.pathname);
        if (route.handler === "inserthotissuecategory") await hotissueService.createCategory(body.body);
        else await hotissueService.updateCategory(body.body.id, body.body);
        return Response.redirect(new URL("/hic", request.url), 302);
    }
    if (route.handler === "deletehotissuecategory") {
        await hotissueService.removeCategory(route.params.id);
        return Response.redirect(new URL("/hic", request.url), 302);
    }
    if (route.handler === "hotissuesubcategory") {
        const rows = await hotissueService.listSubcategories();
        return Response.json(rows.length ? rows : { success: false });
    }
    if (route.handler === "detailhotissuesubcategory") {
        const row = await hotissueService.getSubcategory(route.params.id);
        return Response.json(row ? [row] : { success: false });
    }
    if (["inserthotissubcategory", "updatehotissuesubcategory"].includes(route.handler)) {
        const body = await readBody(request, url.pathname);
        if (route.handler === "inserthotissubcategory") await hotissueService.createSubcategory(body.body);
        else await hotissueService.updateSubcategory(body.body.id, body.body);
        return Response.redirect(new URL("/hisc", request.url), 302);
    }
    if (route.handler === "deletehotissuesubcategory") {
        await hotissueService.removeSubcategory(route.params.id);
        return Response.redirect(new URL("/hisc", request.url), 302);
    }
    if (route.handler === "hotissue") {
        const rows = await hotissueService.listIssues();
        return Response.json(rows.length ? rows : { success: false });
    }
    if (route.handler === "hotissue_detail") {
        const row = await hotissueService.getIssue(route.params.id);
        return Response.json(row ? [row] : { success: false });
    }
    if (["inserthotissue", "updatehotissue"].includes(route.handler)) {
        const body = await readBody(request, url.pathname);
        const reqBody = { ...body.body };
        if (body.file) {
            reqBody.image = "https://cms.kneks.go.id/uploads/hot_issue/" + body.file.filename;
        }
        if (route.handler === "inserthotissue") await hotissueService.createIssue(reqBody);
        else await hotissueService.updateIssue(reqBody.id, reqBody);
        return Response.redirect(new URL("/hi", request.url), 302);
    }
    if (route.handler === "deletehotissue") {
        await hotissueService.removeIssue(route.params.id);
        return Response.redirect(new URL("/hi", request.url), 302);
    }

    // Users Routing
    if (route.handler === "users") {
        const rows = await usersService.listApproved();
        return Response.json(rows.length ? rows : { success: false });
    }
    if (route.handler === "users_detail") {
        const row = await usersService.get(route.params.id);
        return Response.json(row ? [row] : { success: false });
    }
    if (route.handler === "users_new") {
        const rows = await usersService.listNew();
        return Response.json(rows.length ? rows : { success: false });
    }
    if (route.handler === "ip_address_reject") {
        const rows = await usersService.listRejectedIPs();
        return Response.json(rows);
    }
    if (route.handler === "ip_address_approve") {
        const rows = await usersService.listApprovedIPs();
        return Response.json(rows);
    }
    if (route.handler === "users_whitelist") {
        const rows = await usersService.listWhitelist();
        return Response.json(rows.length ? rows : { success: false });
    }
    if (route.handler === "users_ipaddress") {
        const rows = await usersService.listIPAddress();
        return Response.json(rows.length ? rows : { success: false });
    }
    if (route.handler === "approveusers") {
        const cookies = parseCookies(request.headers.get("cookie"));
        await usersService.approveUser(route.params.id, cookies.name);
        return Response.redirect(new URL("/whitelist", request.url), 302);
    }
    if (route.handler === "approveipaddress") {
        const cookies = parseCookies(request.headers.get("cookie"));
        await usersService.approveIPAddress(route.params.id, cookies.name);
        return Response.redirect(new URL("/ip_address", request.url), 302);
    }
    if (route.handler === "deleteipaddress") {
        await usersService.deleteIPAddress(route.params.id);
        return Response.redirect(new URL("/ip_address", request.url), 302);
    }
    if (route.handler === "deleteapproveip") {
        await usersService.deleteUser(route.params.id);
        return Response.redirect(new URL("/ip_address_approve", request.url), 302);
    }
    if (route.handler === "deleterejectedip") {
        await usersService.deleteIPAddress(route.params.id);
        return Response.redirect(new URL("/ip_address_rejects", request.url), 302);
    }
    if (route.handler === "userroles") {
        const rows = await usersService.listRoles();
        return Response.json(rows.length ? rows : { success: false });
    }
    if (route.handler === "insertusers") {
        const body = await readBody(request, url.pathname);
        await usersService.createUser(body.body);
        return Response.redirect(new URL("/u", request.url), 302);
    }
    if (route.handler === "updateusers") {
        const body = await readBody(request, url.pathname);
        await usersService.updateUser(body.body.id, body.body);
        return Response.redirect(new URL("/u", request.url), 302);
    }
    if (route.handler === "deleteuser") {
        await usersService.deleteUser(route.params.id);
        return Response.redirect(new URL("/u", request.url), 302);
    }
    if (route.handler === "updatepassword") {
        const cookies = parseCookies(request.headers.get("cookie"));
        const row = await usersService.get(cookies.id);
        return Response.json(row ? [row] : { success: false });
    }
    if (route.handler === "changespassword") {
        const body = await readBody(request, url.pathname);
        const result = await usersService.changePassword(body.body.id_user, body.body.old_password, body.body.new_password, body.body.verify_password, body.body.names);
        if (result.success) return Response.redirect(new URL("/logout", request.url), 302);
        return Response.redirect(new URL("/changespassword", request.url), 302);
    }
    
    // KDEKS Routing
    if (route.handler === "api_kdeks") { // Wait, the manifest might use 'kdeks' or 'api_kdeks'
        // let's map by handler name 'kdeks'
    }
    if (route.handler === "kdeks") {
        const cookies = parseCookies(request.headers.get("cookie"));
        const rows = await kdeksService.list(cookies.roles_id, cookies.id_province);
        return Response.json(rows.length ? rows : { success: false });
    }
    if (route.handler === "detailkdeks") {
        const row = await kdeksService.get(route.params.id);
        return Response.json(row ? [row] : { success: false });
    }
    if (route.handler === "about_province_kdeks") {
        const row = await kdeksService.getAboutProvince(route.params.id);
        return Response.json(row);
    }
    if (route.handler === "history_province_kdeks") {
        const row = await kdeksService.getHistoryProvince(route.params.id);
        return Response.json(row);
    }
    if (["insertkdeks", "updatekdeks"].includes(route.handler)) {
        const body = await readBody(request, url.pathname);
        const reqBody = { ...body.body };
        if (body.files) {
            const siteUrl = "https://cms.kneks.go.id";
            if (body.files.photo) reqBody.images = siteUrl + "/uploads/kdeks/" + body.files.photo[0].filename;
            if (body.files.sk) reqBody.sk = siteUrl + "/uploads/kdeks/" + body.files.sk[0].filename;
            if (body.files.structure) reqBody.structure = siteUrl + "/uploads/kdeks/" + body.files.structure[0].filename;
        }
        if (route.handler === "insertkdeks") await kdeksService.create(reqBody);
        else await kdeksService.update(reqBody.id, reqBody);
        return Response.redirect(new URL("/master", request.url), 302);
    }
    if (route.handler === "deletekdeks") {
        await kdeksService.remove(route.params.id);
        return Response.redirect(new URL("/master", request.url), 302);
    }
    if (route.handler === "structurekdeks") {
        const rows = await kdeksService.listPejabat();
        return Response.json(rows.length ? rows : { success: false });
    }
    if (route.handler === "detailstructurekdeks") {
        const row = await kdeksService.getPejabat(route.params.id);
        return Response.json(row ? [row] : { success: false });
    }
    if (["inserstructurekdeks", "updatestructurekdeks"].includes(route.handler)) {
        const body = await readBody(request, url.pathname);
        const reqBody = { ...body.body };
        if (body.file) {
            reqBody.photo = "https://cms.kneks.go.id/uploads/structure_kdeks/" + body.file.filename;
        }
        if (route.handler === "inserstructurekdeks") await kdeksService.createPejabat(reqBody);
        else await kdeksService.updatePejabat(reqBody.id, reqBody);
        return Response.redirect(new URL("/s_kdeks", request.url), 302);
    }
    if (route.handler === "deletestructurekdeks") {
        await kdeksService.removePejabat(route.params.id);
        return Response.redirect(new URL("/s_kdeks", request.url), 302);
    }
    if (route.handler === "anggotakdeks") {
        const rows = await kdeksService.listAnggota();
        return Response.json(rows.length ? rows : { success: false });
    }
    if (route.handler === "detailanggotakdeks") {
        const row = await kdeksService.getAnggota(route.params.id);
        return Response.json(row ? [row] : { success: false });
    }
    if (["insertanggotakdeks", "updateanggotakdeks"].includes(route.handler)) {
        const body = await readBody(request, url.pathname);
        const reqBody = { ...body.body };
        if (body.file) {
            reqBody.photo = "https://cms.kneks.go.id/uploads/structure_kdeks/" + body.file.filename;
        }
        if (route.handler === "insertanggotakdeks") await kdeksService.createAnggota(reqBody);
        else await kdeksService.updateAnggota(reqBody.id, reqBody);
        return Response.redirect(new URL("/anggota_kdeks", request.url), 302);
    }
    if (route.handler === "deleteanggotakdeks") {
        await kdeksService.removeAnggota(route.params.id);
        return Response.redirect(new URL("/anggota_kdeks", request.url), 302);
    }
    if (route.handler === "subanggotakdeks") {
        const rows = await kdeksService.listSubAnggota();
        return Response.json(rows.length ? rows : { success: false });
    }
    if (route.handler === "detailsubanggotakdeks") {
        const row = await kdeksService.getSubAnggota(route.params.id);
        return Response.json(row ? [row] : { success: false });
    }
    if (["insertsubanggotakdeks", "updatesubanggotakdeks"].includes(route.handler)) {
        const body = await readBody(request, url.pathname);
        const reqBody = { ...body.body };
        if (body.file) {
            reqBody.photo = "https://cms.kneks.go.id/uploads/structure_kdeks/" + body.file.filename;
        }
        if (route.handler === "insertsubanggotakdeks") await kdeksService.createSubAnggota(reqBody);
        else await kdeksService.updateSubAnggota(reqBody.id, reqBody);
        return Response.redirect(new URL("/sub_anggota_kdeks", request.url), 302);
    }
    if (route.handler === "deletesubanggotakdeks") {
        await kdeksService.removeSubAnggota(route.params.id);
        return Response.redirect(new URL("/sub_anggota_kdeks", request.url), 302);
    }
    if (route.handler === "multi_structure_kdeks") {
        const row = await kdeksService.getMultiStructure(route.params.id);
        return Response.json(row);
    }
    
    // Files Routing
    if (route.handler === "files") {
        const cookies = parseCookies(request.headers.get("cookie"));
        const rows = await filesService.listFiles(cookies.roles_id);
        return Response.json(rows.length ? rows : { success: false });
    }
    if (route.handler === "filesdetails") {
        const row = await filesService.getFile(route.params.id);
        return Response.json(row ? [row] : { success: false });
    }
    if (["insertfileupload", "updatefileupload"].includes(route.handler)) {
        const body = await readBody(request, url.pathname);
        const reqBody = { ...body.body };
        if (body.file) {
            reqBody.file = "https://cms.kneks.go.id/uploads/filesupload/" + body.file.filename;
        }
        if (route.handler === "insertfileupload") await filesService.createFile(reqBody);
        else await filesService.updateFile(reqBody.id, reqBody);
        return Response.redirect(new URL("/f", request.url), 302);
    }
    if (route.handler === "deletefileupload") {
        await filesService.removeFile(route.params.id);
        return Response.redirect(new URL("/f", request.url), 302);
    }
    if (route.handler === "files_category") {
        const rows = await filesService.listCategories();
        return Response.json(rows.length ? rows : { success: false });
    }
    if (route.handler === "files_category_details") {
        const row = await filesService.getCategory(route.params.id);
        return Response.json(row ? [row] : { success: false });
    }
    if (["insertfilecategorydetails", "updatefilescategory"].includes(route.handler)) {
        const body = await readBody(request, url.pathname);
        if (route.handler === "insertfilecategorydetails") await filesService.createCategory(body.body);
        else await filesService.updateCategory(body.body.id, body.body);
        return Response.redirect(new URL("/fc", request.url), 302);
    }
    if (route.handler === "deletefilecategorydetail") {
        await filesService.removeCategory(route.params.id);
        return Response.redirect(new URL("/fc", request.url), 302);
    }
    
    // Profile, Institution, Social Media, Maps, Contacts Routing
    if (route.handler === "institutions") {
        const rows = await profileService.listInstitutions();
        return Response.json(rows.length ? rows : { success: false });
    }
    if (route.handler === "detailinstitutions") {
        const row = await profileService.getInstitution(route.params.id);
        return Response.json(row ? [row] : { success: false });
    }
    if (["insertinstitution", "updateinstitution"].includes(route.handler)) {
        const body = await readBody(request, url.pathname);
        const reqBody = { ...body.body };
        if (body.file) {
            reqBody.logo = "https://cms.kneks.go.id/uploads/institusi/" + body.file.filename;
        }
        if (route.handler === "insertinstitution") await profileService.createInstitution(reqBody);
        else await profileService.updateInstitution(reqBody.id, reqBody);
        return Response.redirect(new URL("/i", request.url), 302);
    }
    if (route.handler === "deleteinstitution") {
        await profileService.deleteInstitution(route.params.id);
        return Response.redirect(new URL("/i", request.url), 302);
    }
    if (route.handler === "sosmed") {
        const rows = await profileService.listSocialMedias();
        return Response.json(rows.length ? rows : { success: false });
    }
    if (route.handler === "detailsosmed") {
        const row = await profileService.getSocialMedia(route.params.id);
        return Response.json(row ? [row] : { success: false });
    }
    if (route.handler === "updatesosmed") {
        const body = await readBody(request, url.pathname);
        await profileService.updateSocialMedia(body.body.id, body.body);
        return Response.redirect(new URL("/sm", request.url), 302);
    }
    if (route.handler === "deletesosmed") {
        await profileService.deleteSocialMedia(route.params.id);
        return Response.redirect(new URL("/sm", request.url), 302);
    }
    if (route.handler === "postsosmed") {
        const rows = await profileService.listPostSocialMedias();
        return Response.json(rows.length ? rows : { success: false });
    }
    if (route.handler === "postsosmedfe") {
        const rows = await profileService.listPostSocialMediasFe();
        return Response.json(rows.length ? rows : { success: false });
    }
    if (route.handler === "detailpostsosmed") {
        const row = await profileService.getPostSocialMedia(route.params.id);
        return Response.json(row ? [row] : { success: false });
    }
    if (["insertpostsosmed", "updatepostsosmed"].includes(route.handler)) {
        const body = await readBody(request, url.pathname);
        if (route.handler === "insertpostsosmed") await profileService.createPostSocialMedia(body.body);
        else await profileService.updatePostSocialMedia(body.body.id, body.body);
        return Response.redirect(new URL("/psm", request.url), 302);
    }
    if (route.handler === "deletepostsosmed") {
        await profileService.deletePostSocialMedia(route.params.id);
        return Response.redirect(new URL("/psm", request.url), 302);
    }
    if (route.handler === "scopes") {
        const rows = await profileService.listScopes();
        return Response.json(rows.length ? rows : { success: false });
    }
    if (route.handler === "detailscopes") {
        const row = await profileService.getScope(route.params.id);
        return Response.json(row ? [row] : { success: false });
    }
    if (route.handler === "updatescopes") {
        const body = await readBody(request, url.pathname);
        await profileService.updateScope(body.body.id, body.body);
        return Response.redirect(new URL("/scp", request.url), 302);
    }
    if (route.handler === "deletescopes") {
        await profileService.deleteScope(route.params.id);
        return Response.redirect(new URL("/scp", request.url), 302);
    }
    if (route.handler === "maps") {
        const rows = await profileService.listMaps();
        return Response.json(rows.length ? rows : { success: false });
    }
    if (route.handler === "updatemaps") {
        const body = await readBody(request, url.pathname);
        await profileService.updateMap(body.body.id, body.body);
        return Response.redirect(new URL("/m_edit/" + body.body.id, request.url), 302);
    }
    if (route.handler === "contacts") {
        const rows = await profileService.listContacts();
        return Response.json(rows.length ? rows : { success: false });
    }
    if (route.handler === "updatecontacts") {
        const body = await readBody(request, url.pathname);
        await profileService.updateContact(body.body.id, body.body);
        return Response.redirect(new URL("/c_edit/" + body.body.id, request.url), 302);
    }
    if (route.handler === "questbook") {
        const body = await readBody(request, url.pathname);
        await profileService.createQuestbook(body.body);
        return Response.json({ success: true });
    }
    
    // Banner and Slider Routing
    if (route.handler === "slideshows") {
        const rows = await bannersService.listSlideshows();
        return Response.json(rows.length ? rows : { success: false });
    }
    if (route.handler === "detailslideshow") {
        const row = await bannersService.getSlideshow(route.params.id);
        return Response.json(row ? [row] : { success: false });
    }
    if (["insertslideshow", "updateslideshow"].includes(route.handler)) {
        const body = await readBody(request, url.pathname);
        const reqBody = { ...body.body };
        if (body.file) reqBody.image = "https://cms.kneks.go.id/uploads/slideshow/" + body.file.filename;
        if (route.handler === "insertslideshow") await bannersService.createSlideshow(reqBody);
        else await bannersService.updateSlideshow(reqBody.id, reqBody);
        return Response.redirect(new URL("/b", request.url), 302);
    }
    if (route.handler === "deleteslideshow") {
        await bannersService.deleteSlideshow(route.params.id);
        return Response.redirect(new URL("/b", request.url), 302);
    }
    
    // Login Banners
    if (route.handler === "login_banners") {
        const rows = await bannersService.listLoginBanners();
        return Response.json(rows.length ? rows : { success: false });
    }
    if (route.handler === "detail_login_banners") {
        const row = await bannersService.getLoginBanner(route.params.id);
        return Response.json(row ? [row] : { success: false });
    }
    if (["insertloginbanner", "updateloginbanners"].includes(route.handler)) {
        const body = await readBody(request, url.pathname);
        const reqBody = { ...body.body };
        if (body.file) reqBody.path = "https://cms.kneks.go.id/uploads/banner/" + body.file.filename;
        if (route.handler === "insertloginbanner") await bannersService.createLoginBanner(reqBody);
        else await bannersService.updateLoginBanner(reqBody.id_login_banner, reqBody);
        return Response.redirect(new URL("/login_banner", request.url), 302);
    }
    if (route.handler === "delete_login_banner") {
        await bannersService.deleteLoginBanner(route.params.id);
        return Response.redirect(new URL("/login_banner", request.url), 302);
    }
    
    // Struktur Logo
    if (route.handler === "slogo") {
        const rows = await bannersService.listSLogo();
        return Response.json(rows.length ? rows : { success: false });
    }
    if (route.handler === "detail_slogo") {
        const row = await bannersService.getSLogo(route.params.id);
        return Response.json(row ? [row] : { success: false });
    }
    if (["inserts_slogo", "updates_slogo"].includes(route.handler)) {
        const body = await readBody(request, url.pathname);
        const reqBody = { ...body.body };
        if (body.file) reqBody.path = "https://cms.kneks.go.id/uploads/banner/" + body.file.filename;
        if (route.handler === "inserts_slogo") await bannersService.createSLogo(reqBody);
        else await bannersService.updateSLogo(reqBody.id_s_logo_banner, reqBody);
        return Response.redirect(new URL("/s_logo", request.url), 302);
    }
    if (route.handler === "delete_slogos") {
        await bannersService.deleteSLogo(route.params.id);
        return Response.redirect(new URL("/s_logo", request.url), 302);
    }

    // Welcome Pages
    if (route.handler === "welcome_pages") {
        const rows = await bannersService.listWelcomePages();
        return Response.json(rows.length ? rows : { success: false });
    }
    if (route.handler === "detail_welcome_pages") {
        const row = await bannersService.getWelcomePage(route.params.id);
        return Response.json(row ? [row] : { success: false });
    }
    if (["insert_welcome_pages", "update_welcome_pages"].includes(route.handler)) {
        const body = await readBody(request, url.pathname);
        const reqBody = { ...body.body };
        if (body.file) reqBody.path = "https://cms.kneks.go.id/uploads/banner/" + body.file.filename;
        if (route.handler === "insert_welcome_pages") await bannersService.createWelcomePage(reqBody);
        else await bannersService.updateWelcomePage(reqBody.id_welcome, reqBody);
        return Response.redirect(new URL("/welcomebanner", request.url), 302);
    }
    if (route.handler === "delete_welcome_page") {
        await bannersService.deleteWelcomePage(route.params.id);
        return Response.redirect(new URL("/welcomebanner", request.url), 302);
    }
    
    // Data Menu
    if (route.handler === "menu") {
        const rows = await dataService.listMenus();
        return Response.json(rows.length ? rows : { success: false });
    }
    if (route.handler === "menu_detail") {
        const row = await dataService.getMenu(route.params.id);
        return Response.json(row ? [row] : { success: false });
    }
    if (["insertmenu", "updatemenu"].includes(route.handler)) {
        const body = await readBody(request, url.pathname);
        if (route.handler === "insertmenu") await dataService.createMenu(body.body);
        else await dataService.updateMenu(body.body.id, body.body);
        return Response.redirect(new URL("/menu", request.url), 302);
    }
    if (route.handler === "submenu") {
        const rows = await dataService.listSubmenus();
        return Response.json(rows.length ? rows : { success: false });
    }
    if (route.handler === "submenu_detail") {
        const row = await dataService.getSubmenu(route.params.id);
        return Response.json(row ? [row] : { success: false });
    }
    if (["insertsubmenu", "updatesubmenu"].includes(route.handler)) {
        const body = await readBody(request, url.pathname);
        if (route.handler === "insertsubmenu") await dataService.createSubmenu(body.body);
        else await dataService.updateSubmenu(body.body.id, body.body);
        return Response.redirect(new URL("/submenu", request.url), 302);
    }
    if (route.handler === "dropdown_menu") {
        const rows = await dataService.dropdownMenu();
        return Response.json(rows);
    }

    // Dashboard
    if (route.handler === "data_dashboard") {
        const rows = await dataService.listDashboards();
        return Response.json(rows.length ? rows : { success: false });
    }
    if (route.handler === "detail_data_dashboard") {
        const row = await dataService.getDashboard(route.params.id);
        return Response.json(row ? [row] : { success: false });
    }
    if (route.handler === "insertapidashboards") {
        const body = await readBody(request, url.pathname);
        await dataService.createDashboard(body.body);
        return Response.redirect(new URL("/dashboard", request.url), 302);
    }
    if (route.handler === "data_dashboard_delete") {
        await dataService.deleteDashboard(route.params.id);
        return Response.redirect(new URL("/dashboard", request.url), 302);
    }
    if (route.handler === "dashboard_naration") {
        const rows = await dataService.getDashboardNaration(route.params.id);
        return Response.json(rows.length ? rows : { message: false });
    }
    if (route.handler === "emptyapidashboard") {
        const body = await readBody(request, url.pathname);
        await dataService.emptyApiDashboard(body.body.id);
        return Response.json({ message: true });
    }
    if (route.handler === "updateapidashboard") {
        const body = await readBody(request, url.pathname);
        await dataService.updateApiDashboard(body.body.id, body.body);
        return Response.json({ message: true });
    }

    // Data Slider
    if (["sliders_data", "sliders_data_fe"].includes(route.handler)) {
        const rows = await dataService.listSliderData();
        return Response.json(rows.length ? rows : { success: false });
    }
    if (route.handler === "detail_sliders_data") {
        const row = await dataService.getSliderData(route.params.id);
        return Response.json(row ? [row] : { success: false });
    }
    if (["insertsliderdata", "updateslidersdata"].includes(route.handler)) {
        const body = await readBody(request, url.pathname);
        const reqBody = { ...body.body };
        if (body.file) reqBody.image = "https://cms.kneks.go.id/uploads/data/" + body.file.filename;
        if (route.handler === "insertsliderdata") await dataService.createSliderData(reqBody);
        else await dataService.updateSliderData(reqBody.id_sliders, reqBody);
        return Response.redirect(new URL("/sliderdata", request.url), 302);
    }
    if (route.handler === "delete_slider_data") {
        await dataService.deleteSliderData(route.params.id);
        return Response.redirect(new URL("/sliderdata", request.url), 302);
    }

    // Provinces
    if (route.handler === "provinces") {
        const rows = await extraService.listProvinces();
        return Response.json(rows.length ? rows : { success: false });
    }
    if (route.handler === "provinces_detail") {
        const row = await extraService.getProvince(route.params.id);
        return Response.json(row ? [row] : { success: false });
    }
    if (["insertprovinces", "updateprovinces"].includes(route.handler)) {
        const body = await readBody(request, url.pathname);
        if (route.handler === "insertprovinces") await extraService.createProvince(body.body);
        else await extraService.updateProvince(body.body.id, body.body);
        return Response.redirect(new URL("/province", request.url), 302);
    }
    if (route.handler === "deleteprovinces") {
        await extraService.deleteProvince(route.params.id);
        return Response.redirect(new URL("/province", request.url), 302);
    }

    // Zona Khas
    if (route.handler === "khas_zone") {
        const rows = await extraService.listZonaKhas();
        return Response.json(rows);
    }
    if (route.handler === "zona_peta") {
        const rows = await extraService.getZonaPeta();
        return Response.json(rows.length ? rows : { success: false });
    }
    if (route.handler === "detail_khas_zone") {
        const row = await extraService.getZonaKhas(route.params.id);
        return Response.json(row ? [row] : { success: false });
    }
    if (["insertzonakhas", "updatezonakhas"].includes(route.handler)) {
        const body = await readBody(request, url.pathname);
        if (route.handler === "insertzonakhas") await extraService.createZonaKhas(body.body);
        else await extraService.updateZonaKhas(body.body.id, body.body);
        return Response.redirect(new URL("/zk", request.url), 302);
    }
    if (route.handler === "deletezonakhas") {
        await extraService.deleteZonaKhas(route.params.id);
        return Response.redirect(new URL("/zk", request.url), 302);
    }

    // Tagging
    if (route.handler === "tagging") {
        const rows = await extraService.listTaggings();
        return Response.json(rows.length ? rows : { success: false });
    }
    if (route.handler === "detailtagging") {
        const row = await extraService.getTagging(route.params.id);
        return Response.json(row ? [row] : { success: false });
    }
    if (["inserttagging", "updatetagging"].includes(route.handler)) {
        const body = await readBody(request, url.pathname);
        if (route.handler === "inserttagging") await extraService.createTagging(body.body);
        else await extraService.updateTagging(body.body.id, body.body);
        return Response.redirect(new URL("/tg", request.url), 302);
    }
    if (route.handler === "deletetagging") {
        await extraService.deleteTagging(route.params.id);
        return Response.redirect(new URL("/tg", request.url), 302);
    }

    // Opini
    if (route.handler === "opini") {
        const rows = await extraService.listOpini();
        return Response.json(rows.length ? rows : { success: false });
    }
    if (route.handler === "opini_detail") {
        const row = await extraService.getOpini(route.params.id);
        return Response.json(row ? [row] : { success: false });
    }
    if (["insertopini", "updateopini"].includes(route.handler)) {
        const body = await readBody(request, url.pathname);
        const reqBody = { ...body.body };
        if (body.file) reqBody.images = "https://cms.kneks.go.id/uploads/opini/" + body.file.filename;
        if (route.handler === "insertopini") await extraService.createOpini(reqBody);
        else await extraService.updateOpini(reqBody.id, reqBody);
        return Response.redirect(new URL("/opini", request.url), 302);
    }
    if (route.handler === "deleteopini") {
        await extraService.deleteOpini(route.params.id);
        return Response.redirect(new URL("/opini", request.url), 302);
    }

    // Photo
    if (route.handler === "photos") {
        const cookies = parseCookies(request.headers.get("cookie"));
        const rows = await extraService.listPhotos(cookies.roles_id);
        return Response.json(rows.length ? rows : { success: false });
    }
    if (route.handler === "detailphotos") {
        const row = await extraService.getPhoto(route.params.id);
        return Response.json(row ? [row] : { success: false });
    }
    if (["insertphotos", "updatephotos"].includes(route.handler)) {
        const body = await readBody(request, url.pathname);
        const reqBody = { ...body.body };
        if (body.file) reqBody.file = "https://cms.kneks.go.id/uploads/photo/" + body.file.filename;
        if (route.handler === "insertphotos") await extraService.createPhoto(reqBody);
        else await extraService.updatePhoto(reqBody.id, reqBody);
        return Response.redirect(new URL("/ph", request.url), 302);
    }
    if (route.handler === "deletephotos") {
        await extraService.deletePhoto(route.params.id);
        return Response.redirect(new URL("/ph", request.url), 302);
    }

    // Video
    if (route.handler === "videos") {
        const cookies = parseCookies(request.headers.get("cookie"));
        const rows = await extraService.listVideos(cookies.roles_id);
        return Response.json(rows.length ? rows : { success: false });
    }
    if (route.handler === "detailvideos") {
        const row = await extraService.getVideo(route.params.id);
        return Response.json(row ? [row] : { success: false });
    }
    if (["insertvideos", "updatevideos"].includes(route.handler)) {
        const body = await readBody(request, url.pathname);
        if (route.handler === "insertvideos") await extraService.createVideo(body.body);
        else await extraService.updateVideo(body.body.id, body.body);
        return Response.redirect(new URL("/vd", request.url), 302);
    }
    if (route.handler === "deletevideos") {
        await extraService.deleteVideo(route.params.id);
        return Response.redirect(new URL("/vd", request.url), 302);
    }

  } catch (error) {
    return Response.json({ message: error.message || "Terjadi kesalahan pada server." }, { status: error.status || 500 });
  }
  return null;
}

async function createRequestAdapter(request, params, pathname) {
  const url = new URL(request.url);
  const requestBody = await readBody(request, pathname);
  return {
    method: request.method,
    params,
    query: Object.fromEntries(url.searchParams),
    body: requestBody.body,
    file: requestBody.file,
    files: requestBody.files,
    __uploadedFiles: requestBody.uploadedFiles || [],
    headers: Object.fromEntries(request.headers),
    cookies: parseCookies(request.headers.get("cookie")),
    get(name) {
      return request.headers.get(name);
    },
  };
}

function parseCookies(header) {
  if (!header) return {};
  return Object.fromEntries(
    header.split(";").map((cookie) => {
      const [name, ...value] = cookie.trim().split("=");
      return [name, decodeURIComponent(value.join("="))];
    }),
  );
}

function responseWithAuthCookies(result, { crossSite }) {
  const headers = new Headers();
  if (result?.success === "true" || result?.success === true) {
    const options = crossSite
      ? { domain: ".kneks.go.id", secure: true, sameSite: "none", maxAge: 86400 }
      : { httpOnly: true, sameSite: "lax" };
    const user = result.user;
    for (const [name, value] of Object.entries({
      islogin: "true",
      id: user.id,
      name: user.name,
      roles_id: user.roles_id,
      id_province: user.id_province,
      directorat_id: user.directorat_id,
    })) headers.append("Set-Cookie", serializeCookie(name, value, options));
  }
  return Response.json(result, { headers });
}

function clearAuthCookies(location) {
  const headers = new Headers({ Location: location.toString() });
  for (const name of ["islogin", "name", "id", "roles_id", "id_province", "directorat_id"]) {
    headers.append("Set-Cookie", serializeCookie(name, "", { expires: new Date(0), maxAge: 0 }));
  }
  return new Response(null, { status: 302, headers });
}

async function readBody(request, pathname) {
  if (request.method === "GET" || request.method === "HEAD") return { body: {} };
  const contentType = request.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    try { return { body: await request.json() }; } catch { return { body: {} }; }
  }
  if (contentType.includes("application/x-www-form-urlencoded")) {
    return { body: Object.fromEntries(new URLSearchParams(await request.text())) };
  }
  if (contentType.includes("multipart/form-data")) {
    return saveMultipartForm(await request.formData(), pathname);
  }
  return { body: {} };
}

async function saveMultipartForm(form, pathname) {
  const body = {};
  const files = [];
  const fields = {};
  const uploadDirectory = safeUploadDirectory(getUploadDirectory(pathname));

  try {
    for (const [name, value] of form.entries()) {
      if (typeof value === "string") {
        if (Object.prototype.hasOwnProperty.call(body, name)) {
          body[name] = Array.isArray(body[name]) ? [...body[name], value] : [body[name], value];
        } else body[name] = value;
        continue;
      }
      const stored = await storeFile(value, name, uploadDirectory);
      files.push(stored);
      (fields[name] ||= []).push(stored);
    }
  } catch (error) {
    await Promise.allSettled(files.map((file) => unlink(file.path)));
    throw error;
  }

  const isMultiField = ["/insertkdeks", "/updatekdeks", "/insertdirectorats", "/directorats_update"].includes(pathname);
  return {
    body,
    file: files[0],
    files: isMultiField ? fields : files,
    uploadedFiles: files,
  };
}

async function storeFile(file, fieldName, directory) {
  const { originalName, extension } = validateUpload(file);
  const safeField = String(fieldName || "file").replace(/[^a-zA-Z0-9_-]/g, "-").slice(0, 64) || "file";
  const filename = `${safeField}-${Date.now()}-${crypto.randomUUID()}${extension}`;
  const publicRoot = path.resolve(process.cwd(), "public", "uploads");
  const destination = path.resolve(publicRoot, directory);
  if (destination !== publicRoot && !destination.startsWith(`${publicRoot}${path.sep}`)) {
    throw new UploadValidationError("Folder upload berada di luar public/uploads.");
  }
  await mkdir(destination, { recursive: true });
  const storedPath = path.join(destination, filename);
  await writeFile(storedPath, Buffer.from(await file.arrayBuffer()), { flag: "wx" });
  return {
    fieldname: fieldName,
    originalname: originalName,
    encoding: "7bit",
    mimetype: file.type,
    size: file.size,
    filename,
    destination,
    path: storedPath,
  };
}

async function cleanupUploadedFiles(req) {
  const uploaded = Array.isArray(req?.__uploadedFiles) ? req.__uploadedFiles : [];
  await Promise.allSettled(uploaded.map((file) => unlink(file.path)));
}

function getUploadDirectory(pathname) {
  if (["/es_updateabout", "/updateabout"].includes(pathname)) return "profile";
  if (["/insertkdeks", "/updatekdeks"].includes(pathname)) return "kdeks";
  if (["/insertstructurekdeks", "/updatestructurekdeks", "/insertanggotakdeks", "/updateanggotakdeks", "/insertsubanggotakdeks", "/updatesubanggotakdeks"].includes(pathname)) return "structure_kdeks";
  if (["/insertstructure", "/updatestructure", "/insertanggota", "/updateanggota", "/insertsubanggota", "/updatesubanggota"].includes(pathname)) return "structure";
  if (["/insertslideshow", "/updateslideshow"].includes(pathname)) return "slideshow";
  if (["/insertnews", "/updatenews"].includes(pathname)) return "news";
  if (["/insertphoto", "/updatephoto"].includes(pathname)) return "photo";
  if (["/insertdirectorats", "/directorats_update"].includes(pathname)) return "directorat/images";
  if (["/inserthotissue", "/updatehotissue"].includes(pathname)) return "hot_issue";
  if (["/insertinstitution", "/updateinstitution"].includes(pathname)) return "institusi";
  if (["/insertfiles", "/updatefileupload"].includes(pathname)) return "filesupload";
  if (["/insertsliderdata", "/updatesliderdata"].includes(pathname)) return "data";
  if (["/insertopini", "/updateopini"].includes(pathname)) return "opini";
  return "banner";
}

function createResponseAdapter() {
  let status = 200;
  let payload = null;
  let type = "json";
  const headers = new Headers();

  return {
    status(code) { status = code; return this; },
    json(value) { payload = value; type = "json"; return this; },
    send(value) { payload = value; type = "text"; return this; },
    redirect(codeOrUrl, maybeUrl) {
      status = typeof codeOrUrl === "number" ? codeOrUrl : 302;
      headers.set("Location", maybeUrl || codeOrUrl);
      return this;
    },
    cookie(name, value, options = {}) {
      headers.append("Set-Cookie", serializeCookie(name, value, options));
      return this;
    },
    clearCookie(name, options = {}) {
      headers.append("Set-Cookie", serializeCookie(name, "", { ...options, expires: new Date(0), maxAge: 0 }));
      return this;
    },
    getStatus() { return status; },
    toResponse() {
      if (headers.has("Location")) return new Response(null, { status, headers });
      if (type === "text") return new Response(payload ?? "", { status, headers });
      return Response.json(payload ?? { success: true }, { status, headers });
    },
  };
}

function serializeCookie(name, value, options = {}) {
  const parts = [`${name}=${encodeURIComponent(value ?? "")}`];
  parts.push(`Path=${options.path || "/"}`);
  if (options.domain) parts.push(`Domain=${options.domain}`);
  if (options.expires) parts.push(`Expires=${new Date(options.expires).toUTCString()}`);
  if (typeof options.maxAge === "number") parts.push(`Max-Age=${Math.max(0, Math.floor(options.maxAge / (options.maxAge > 1000 ? 1000 : 1)))}`);
  if (options.httpOnly) parts.push("HttpOnly");
  if (options.secure) parts.push("Secure");
  if (options.sameSite) {
    const sameSite = String(options.sameSite);
    parts.push(`SameSite=${sameSite.charAt(0).toUpperCase()}${sameSite.slice(1).toLowerCase()}`);
  }
  return parts.join("; ");
}
