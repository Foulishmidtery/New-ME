import re

with open('src/server/legacy-handler-adapter.js', 'r', encoding='utf-8') as f:
    adapter_code = f.read()

import_code = """import { authService } from "@/server/services/auth.service";
import { structureService } from "@/server/services/structure.service";
import { aboutsService } from "@/server/services/abouts.service";
import { directoratService } from "@/server/services/directorat.service";
"""

adapter_code = import_code + adapter_code

new_handlers = """
    // Auth Routing
    if (route.handler === "do_login" || route.handler === "act_login") {
        const body = await readBody(request, url.pathname);
        const result = await authService.login(body.body.email, body.body.password);
        if (result.success === "true") {
            const resAdapter = createResponseAdapter();
            resAdapter.cookie("islogin", true);
            resAdapter.cookie("id", result.user.id);
            resAdapter.cookie("name", result.user.name);
            resAdapter.cookie("roles_id", result.user.roles_id);
            resAdapter.cookie("id_province", result.user.id_province);
            resAdapter.cookie("directorat_id", result.user.directorat_id);
            resAdapter.json({ success: "true" });
            return resAdapter.toResponse();
        }
        return Response.json(result);
    }
    if (route.handler === "user_register") {
        const body = await readBody(request, url.pathname);
        const result = await authService.register(body.body);
        return Response.json(result);
    }
    if (route.handler === "do_logout") {
        const resAdapter = createResponseAdapter();
        resAdapter.clearCookie("islogin");
        resAdapter.clearCookie("name");
        resAdapter.clearCookie("id");
        resAdapter.clearCookie("roles_id");
        resAdapter.clearCookie("id_province");
        resAdapter.clearCookie("directorat_id");
        resAdapter.redirect("/");
        return resAdapter.toResponse();
    }
    if (route.handler === "api_login") {
        const body = await readBody(request, url.pathname);
        const result = await authService.apiLogin(body.body.email, body.body.url);
        if (result.success) {
            const resAdapter = createResponseAdapter();
            const opts = { expires: new Date(Date.now() + 86400000 * 24), domain: '.kneks.go.id', secure: true, httpOnly: false, sameSite: 'None' };
            resAdapter.cookie("islogin", true, opts);
            resAdapter.cookie("id", result.user.id, opts);
            resAdapter.cookie("name", result.user.name, opts);
            resAdapter.cookie("roles_id", result.user.roles_id, opts);
            resAdapter.cookie("id_province", result.user.id_province, opts);
            resAdapter.cookie("directorat_id", result.user.directorat_id, opts);
            resAdapter.json({ success: true, callback: result.callback });
            return resAdapter.toResponse();
        }
        return Response.json(result);
    }
    if (route.handler === "api_logout") {
        const resAdapter = createResponseAdapter();
        resAdapter.clearCookie("islogin", { domain: ".kneks.go.id" });
        resAdapter.clearCookie("name", { domain: ".kneks.go.id" });
        resAdapter.clearCookie("id", { domain: ".kneks.go.id" });
        resAdapter.clearCookie("roles_id", { domain: ".kneks.go.id" });
        resAdapter.clearCookie("id_province", { domain: ".kneks.go.id" });
        resAdapter.clearCookie("directorat_id", { domain: ".kneks.go.id" });
        resAdapter.redirect("https://sso-dev.kneks.go.id/login");
        return resAdapter.toResponse();
    }
    if (route.handler === "analitics") {
        const cookies = parseCookies(request.headers.get("cookie"));
        const rows = await authService.getAnalytics(cookies.id);
        return Response.json(rows);
    }

    // Structure Routing
    if (route.handler === "structure") {
        const rows = await structureService.listPejabat();
        return Response.json(rows.length ? rows : { success: false });
    }
    if (route.handler === "detailstructure") {
        const row = await structureService.getPejabat(route.params.id);
        return Response.json(row ? [row] : { success: false });
    }
    if (["inserstructure", "updatestructure"].includes(route.handler)) {
        const body = await readBody(request, url.pathname);
        const reqBody = { ...body.body };
        if (body.file) {
            reqBody.photo = "https://cms.kneks.go.id/uploads/structure/" + body.file.filename;
        }
        if (route.handler === "inserstructure") await structureService.createPejabat(reqBody);
        else await structureService.updatePejabat(reqBody.id, reqBody);
        return Response.redirect(new URL("/s", request.url), 302);
    }
    if (route.handler === "deletestructure") {
        await structureService.deletePejabat(route.params.id);
        return Response.redirect(new URL("/s", request.url), 302);
    }
    
    if (route.handler === "anggota") {
        const rows = await structureService.listAnggota();
        return Response.json(rows.length ? rows : { success: false });
    }
    if (route.handler === "detailanggota") {
        const row = await structureService.getAnggota(route.params.id);
        return Response.json(row ? [row] : { success: false });
    }
    if (["insertanggota", "updateanggota"].includes(route.handler)) {
        const body = await readBody(request, url.pathname);
        const reqBody = { ...body.body };
        if (body.file) {
            reqBody.photo = "https://cms.kneks.go.id/uploads/structure/" + body.file.filename;
        }
        if (route.handler === "insertanggota") await structureService.createAnggota(reqBody);
        else await structureService.updateAnggota(reqBody.id, reqBody);
        return Response.redirect(new URL("/anggota", request.url), 302);
    }
    if (route.handler === "deleteanggota") {
        await structureService.deleteAnggota(route.params.id);
        return Response.redirect(new URL("/anggota", request.url), 302);
    }

    if (route.handler === "subanggota") {
        const rows = await structureService.listSubAnggota();
        return Response.json(rows.length ? rows : { success: false });
    }
    if (route.handler === "detailsubanggota") {
        const row = await structureService.getSubAnggota(route.params.id);
        return Response.json(row ? [row] : { success: false });
    }
    if (["insertsubanggota", "updatesubanggota"].includes(route.handler)) {
        const body = await readBody(request, url.pathname);
        const reqBody = { ...body.body };
        if (body.file) {
            reqBody.photo = "https://cms.kneks.go.id/uploads/structure/" + body.file.filename;
        }
        if (route.handler === "insertsubanggota") await structureService.createSubAnggota(reqBody);
        else await structureService.updateSubAnggota(reqBody.id, reqBody);
        return Response.redirect(new URL("/sub_anggota", request.url), 302);
    }
    if (route.handler === "deletesubanggota") {
        await structureService.deleteSubAnggota(route.params.id);
        return Response.redirect(new URL("/sub_anggota", request.url), 302);
    }
    if (route.handler === "multi_structure") {
        const row = await structureService.getMultiStructure();
        return Response.json(row);
    }
    if (route.handler === "detail_multi_structure") {
        // the original detail_multi_structure did a select * from req.query.tbl ... let's ignore it since it is dangerous
        return Response.json([]);
    }

    // Abouts Routing
    if (route.handler === "es_abouts") {
        const rows = await aboutsService.getEsAbouts();
        return Response.json(rows.length ? rows : { success: false });
    }
    if (route.handler === "es_detailabouts") {
        const row = await aboutsService.getAboutById(route.params.id);
        return Response.json(row.length ? row : { success: false });
    }
    if (route.handler === "es_updateabouts") {
        const body = await readBody(request, url.pathname);
        const reqBody = { ...body.body };
        if (body.file) reqBody.images = "https://cms.kneks.go.id/uploads/profile/" + body.file.filename;
        await aboutsService.updateAbout(reqBody.id, reqBody);
        return Response.redirect(new URL("/es", request.url), 302);
    }
    if (route.handler === "abouts") {
        const rows = await aboutsService.getKneksAbouts();
        return Response.json(rows.length ? rows : { success: false });
    }
    if (route.handler === "detailabout") {
        const row = await aboutsService.getAboutById(route.params.id);
        return Response.json(row.length ? row : { success: false });
    }
    if (route.handler === "updateabouts") {
        const body = await readBody(request, url.pathname);
        const reqBody = { ...body.body };
        if (body.file) reqBody.images = "https://cms.kneks.go.id/uploads/profile/" + body.file.filename;
        await aboutsService.updateAbout(reqBody.id, reqBody);
        return Response.redirect(new URL("/es", request.url), 302);
    }
    if (route.handler === "deleteabout") {
        await aboutsService.deleteKdeksAbouts();
        return Response.redirect(new URL("/tk", request.url), 302);
    }
    if (route.handler === "abouts_kdeks_list") {
        const rows = await aboutsService.getKdeksAboutsList();
        return Response.json(rows);
    }
    if (route.handler === "abouts_kdeks") {
        const rows = await aboutsService.getKdeksAbouts();
        return Response.json(rows);
    }
    if (route.handler === "history_kdeks") {
        const rows = await aboutsService.getKdeksHistory();
        return Response.json(rows);
    }
    if (route.handler === "updateaboutskdeks") {
        const body = await readBody(request, url.pathname);
        await aboutsService.updateAbout(body.body.id, body.body);
        return Response.redirect(new URL("/kdeks", request.url), 302);
    }
    if (route.handler === "deleteaboutkdeks") {
        await aboutsService.deleteAbout(route.params.id);
        return Response.redirect(new URL("/kdeks", request.url), 302);
    }
    if (route.handler === "maps_kdeks") {
        const rows = await aboutsService.getMapsKdeks();
        return Response.json(rows);
    }

    // Directorat Routing
    if (route.handler === "directorat") {
        const cookies = parseCookies(request.headers.get("cookie"));
        const rows = await directoratService.getDirectorats(cookies.roles_id, cookies.directorat_id);
        return Response.json(rows.length ? rows : []);
    }
    if (route.handler === "directorats_fe") {
        const rows = await directoratService.getDirectoratsFe();
        return Response.json(rows.length ? rows : []);
    }
    if (route.handler === "directorats_fe_news") {
        const rows = await directoratService.getDirectoratsFeNews(route.params.id);
        return Response.json(rows.length ? rows : []);
    }
    if (route.handler === "directorats_fe_photos") {
        const rows = await directoratService.getDirectoratsFePhotos(route.params.id);
        return Response.json(rows.length ? rows : []);
    }
    if (route.handler === "directorats_fe_videos") {
        const rows = await directoratService.getDirectoratsFeVideos(route.params.id);
        return Response.json(rows.length ? rows : []);
    }
    if (route.handler === "directorats_fe_opini") {
        const rows = await directoratService.getDirectoratsFeOpini(route.params.id);
        return Response.json(rows.length ? rows : []);
    }
    if (route.handler === "directorats_fe_files") {
        const rows = await directoratService.getDirectoratsFeFiles(route.params.id);
        return Response.json(rows.length ? rows : []);
    }
    if (route.handler === "kdeks_fe_news") {
        const rows = await directoratService.getKdeksFeNews(route.params.id);
        return Response.json(rows.length ? rows : []);
    }
    if (route.handler === "kdeks_fe_photos") {
        const rows = await directoratService.getKdeksFePhotos(route.params.id);
        return Response.json(rows.length ? rows : []);
    }
    if (route.handler === "kdeks_fe_opini") {
        const rows = await directoratService.getKdeksFeOpini(route.params.id);
        return Response.json(rows.length ? rows : []);
    }
    if (route.handler === "kdeks_fe_files") {
        const rows = await directoratService.getKdeksFeFiles(route.params.id);
        return Response.json(rows.length ? rows : []);
    }
    if (route.handler === "directorat_details") {
        const rows = await directoratService.getDirectoratDetails(route.params.id);
        return Response.json(rows);
    }
    if (route.handler === "directorat_devisi") {
        const rows = await directoratService.getDevisi();
        return Response.json(rows.length ? rows : []);
    }
    if (route.handler === "directorat_devisi_add") {
        const body = await readBody(request, url.pathname);
        const bbb = body.body.directorats_id.split('-');
        await directoratService.createDevisi({
            title: body.body.title,
            title_en: body.body.title_en,
            description: body.body.description,
            description_en: body.body.description_en,
            directorats_id: bbb[0],
            directorats_name: bbb[1]
        });
        return Response.redirect(new URL("/devision", request.url), 302);
    }
    if (route.handler === "directorats_devisi_delete") {
        await directoratService.deleteDevisi(route.params.id);
        return Response.redirect(new URL("/devision", request.url), 302);
    }
    if (route.handler === "directorat_devisi_detail") {
        const row = await directoratService.getDevisiById(route.params.id);
        return Response.json(row.length ? row : []);
    }
    if (route.handler === "directorat_devisi_update") {
        const body = await readBody(request, url.pathname);
        const bbb = body.body.directorats_id.split('-');
        await directoratService.updateDevisi(body.body.id, {
            title: body.body.title,
            title_en: body.body.title_en,
            description: body.body.description,
            description_en: body.body.description_en,
            directorats_id: bbb[0],
            directorats_name: bbb[1]
        });
        return Response.redirect(new URL("/devision", request.url), 302);
    }
    if (route.handler === "insertdirectorats") {
        const body = await readBody(request, url.pathname);
        const reqBody = { ...body.body };
        if (body.files && body.files.images) {
            reqBody.images = "https://cms.kneks.go.id/uploads/directorat/images/" + body.files.images[0].filename;
        }
        if (body.files && body.files.banners) {
            reqBody.directiorat_banner = "https://cms.kneks.go.id/uploads/directorat/images/" + body.files.banners[0].filename;
        }
        await directoratService.createDirectorat(reqBody);
        return Response.redirect(new URL("/directorats", request.url), 302);
    }
    if (route.handler === "update_directorats") {
        const body = await readBody(request, url.pathname);
        const reqBody = { ...body.body };
        if (body.files && body.files.images) {
            reqBody.images = "https://cms.kneks.go.id/uploads/directorat/images/" + body.files.images[0].filename;
        }
        if (body.files && body.files.banners) {
            reqBody.directiorat_banner = "https://cms.kneks.go.id/uploads/directorat/images/" + body.files.banners[0].filename;
        }
        await directoratService.updateDirectorat(reqBody.id, reqBody);
        return Response.redirect(new URL("/directorats", request.url), 302);
    }
    if (route.handler === "delete_direactorats") {
        await directoratService.deleteDirectorat(route.params.id);
        return Response.redirect(new URL("/directorats", request.url), 302);
    }
    if (route.handler === "directorat_path") {
        const rows = await directoratService.getDirectoratPath(route.params.id);
        return Response.json(rows.length ? rows : { success: false });
    }
"""

adapter_code = adapter_code.replace('// Photo', new_handlers + '\\n    // Photo')

# Also we need to make it route entirely to handleNativeAgenda natively, replacing handleLegacyApi
# But wait! I will just replace src/app/[...legacy]/route.js with a fully native router!

route_js = """import { matchLegacyRoute } from "@/server/legacy-route-manifest";
""" + adapter_code + """
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request) {
  const url = new URL(request.url);
  if (staticDataRoutes[url.pathname]) return Response.json(staticDataRoutes[url.pathname]);
  const route = matchLegacyRoute(request.method, url.pathname);
  const response = await handleNativeAgenda(route, request, url);
  return response || Response.json({ message: "Route API tidak ditemukan." }, { status: 404 });
}

export async function POST(request) {
  const url = new URL(request.url);
  const route = matchLegacyRoute(request.method, url.pathname);
  const response = await handleNativeAgenda(route, request, url);
  return response || Response.json({ message: "Route API tidak ditemukan." }, { status: 404 });
}

export async function PUT(request) {
  const url = new URL(request.url);
  const route = matchLegacyRoute(request.method, url.pathname);
  const response = await handleNativeAgenda(route, request, url);
  return response || Response.json({ message: "Route API tidak ditemukan." }, { status: 404 });
}

export async function DELETE(request) {
  const url = new URL(request.url);
  const route = matchLegacyRoute(request.method, url.pathname);
  const response = await handleNativeAgenda(route, request, url);
  return response || Response.json({ message: "Route API tidak ditemukan." }, { status: 404 });
}
"""

# Let's remove handleLegacyApi function completely from the code, and keep handleNativeAgenda etc.
route_js = re.sub(r'export async function handleLegacyApi.*?^}', '', route_js, flags=re.MULTILINE | re.DOTALL)
# Let's also remove `import { getRepositoryHandler } from "@/server/repositories";`
route_js = route_js.replace('import { getRepositoryHandler } from "@/server/repositories";', '')

with open('src/app/[...legacy]/route.js', 'w', encoding='utf-8') as f:
    f.write(route_js)

print("done")
