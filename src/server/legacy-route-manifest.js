/**
 * Static compatibility manifest generated from legacy/app.js during migration.
 * Runtime code MUST NOT read or parse legacy/app.js.
 */
export const legacyRoutes = [
  {
    "method": "GET",
    "pattern": "/es_abouts",
    "handler": "es_abouts"
  },
  {
    "method": "GET",
    "pattern": "/es_detailabouts/:id",
    "handler": "es_detailabouts"
  },
  {
    "method": "POST",
    "pattern": "/es_updateabout",
    "handler": "es_updateabouts"
  },
  {
    "method": "GET",
    "pattern": "/api/newspaging",
    "handler": "pagingnews"
  },
  {
    "method": "GET",
    "pattern": "/abouts",
    "handler": "abouts"
  },
  {
    "method": "GET",
    "pattern": "/detailabouts/:id",
    "handler": "detailabout"
  },
  {
    "method": "POST",
    "pattern": "/updateabout",
    "handler": "updateabouts"
  },
  {
    "method": "GET",
    "pattern": "/deleteabouts/:id",
    "handler": "deleteabout"
  },
  {
    "method": "GET",
    "pattern": "/api_news_kdeks",
    "handler": "news_kdeks"
  },
  {
    "method": "GET",
    "pattern": "/api_news_detail_kdeks/:id",
    "handler": "news_details_kdeks"
  },
  {
    "method": "GET",
    "pattern": "/api_newscategory_kdeks",
    "handler": "news_categories_kdeks"
  },
  {
    "method": "GET",
    "pattern": "/api_detailnewscategory_kdeks/:id",
    "handler": "news_detailnewscategory_kdeks"
  },
  {
    "method": "GET",
    "pattern": "/api_about_kdeks",
    "handler": "abouts_kdeks"
  },
  {
    "method": "GET",
    "pattern": "/api_maps_kdeks",
    "handler": "maps_kdeks"
  },
  {
    "method": "GET",
    "pattern": "/api_history_kdeks",
    "handler": "history_kdeks"
  },
  {
    "method": "GET",
    "pattern": "/api_history_province_kdeks/:id",
    "handler": "history_province_kdeks"
  },
  {
    "method": "GET",
    "pattern": "/api_about_province_kdeks/:id",
    "handler": "about_province_kdeks"
  },
  {
    "method": "GET",
    "pattern": "/api_kdeks",
    "handler": "kdeks"
  },
  {
    "method": "GET",
    "pattern": "/detail_kdeks/:id",
    "handler": "detailkdeks"
  },
  {
    "method": "POST",
    "pattern": "/insertkdeks",
    "handler": "insertkdeks"
  },
  {
    "method": "POST",
    "pattern": "/updatekdeks",
    "handler": "updatekdeks"
  },
  {
    "method": "GET",
    "pattern": "/deletekdeks/:id/:foto",
    "handler": "deletekdeks"
  },
  {
    "method": "GET",
    "pattern": "/api_kdeks_list",
    "handler": "abouts_kdeks_list"
  },
  {
    "method": "POST",
    "pattern": "/updateaboutkdeks",
    "handler": "updateaboutskdeks"
  },
  {
    "method": "GET",
    "pattern": "/delete_about_kdeks/:id",
    "handler": "deleteaboutkdeks"
  },
  {
    "method": "GET",
    "pattern": "/structurekdeks",
    "handler": "structurekdeks"
  },
  {
    "method": "GET",
    "pattern": "/detailstructurekdeks/:id",
    "handler": "detailstructurekdeks"
  },
  {
    "method": "GET",
    "pattern": "/deletestructurekdeks/:id/:foto",
    "handler": "deletestructurekdeks"
  },
  {
    "method": "POST",
    "pattern": "/insertstructurekdeks",
    "handler": "inserstructurekdeks"
  },
  {
    "method": "POST",
    "pattern": "/updatestructurekdeks",
    "handler": "updatestructurekdeks"
  },
  {
    "method": "GET",
    "pattern": "/anggotaskdeks",
    "handler": "anggotakdeks"
  },
  {
    "method": "GET",
    "pattern": "/detailanggotakdeks/:id",
    "handler": "detailanggotakdeks"
  },
  {
    "method": "GET",
    "pattern": "/deleteanggotakdeks/:id/:foto",
    "handler": "deleteanggotakdeks"
  },
  {
    "method": "POST",
    "pattern": "/insertanggotakdeks",
    "handler": "insertanggotakdeks"
  },
  {
    "method": "POST",
    "pattern": "/updateanggotakdeks",
    "handler": "updateanggotakdeks"
  },
  {
    "method": "GET",
    "pattern": "/subanggotaskdeks",
    "handler": "subanggotakdeks"
  },
  {
    "method": "GET",
    "pattern": "/detailsubanggotakdeks/:id",
    "handler": "detailsubanggotakdeks"
  },
  {
    "method": "GET",
    "pattern": "/deletesubanggotakdeks/:id/:foto",
    "handler": "deletesubanggotakdeks"
  },
  {
    "method": "POST",
    "pattern": "/insertsubanggotakdeks",
    "handler": "insertsubanggotakdeks"
  },
  {
    "method": "POST",
    "pattern": "/updatesubanggotakdeks",
    "handler": "updatesubanggotakdeks"
  },
  {
    "method": "GET",
    "pattern": "/multistructurekdeks/:id",
    "handler": "multi_structure_kdeks"
  },
  {
    "method": "GET",
    "pattern": "/detailmultistructurekdeks",
    "handler": "detail_multi_structure_kdeks"
  },
  {
    "method": "GET",
    "pattern": "/api_dashboard",
    "handler": "data_dashboard"
  },
  {
    "method": "GET",
    "pattern": "/api_dashboard_detail/:id",
    "handler": "detail_data_dashboard"
  },
  {
    "method": "GET",
    "pattern": "/api_dashboard_delete/:id",
    "handler": "data_dashboard_delete"
  },
  {
    "method": "GET",
    "pattern": "/api_opini",
    "handler": "opini"
  },
  {
    "method": "GET",
    "pattern": "/api_opini_detail/:id",
    "handler": "opini_detail"
  },
  {
    "method": "GET",
    "pattern": "/api_web_profile",
    "handler": "web_profile"
  },
  {
    "method": "GET",
    "pattern": "/api_detail_webprofile/:id",
    "handler": "web_profile_detail"
  },
  {
    "method": "GET",
    "pattern": "/api_menu",
    "handler": "menu"
  },
  {
    "method": "GET",
    "pattern": "/api_menu_detail/:id",
    "handler": "menu_detail"
  },
  {
    "method": "GET",
    "pattern": "/api_submenu",
    "handler": "submenu"
  },
  {
    "method": "GET",
    "pattern": "/api_submenu_detail/:id",
    "handler": "submenu_detail"
  },
  {
    "method": "GET",
    "pattern": "/kneks/api",
    "handler": "api_kneks"
  },
  {
    "method": "POST",
    "pattern": "/insertreg",
    "handler": "user_register"
  },
  {
    "method": "POST",
    "pattern": "/do_login",
    "handler": "do_login"
  },
  {
    "method": "POST",
    "pattern": "/act_login",
    "handler": "do_login"
  },
  {
    "method": "GET",
    "pattern": "/logout",
    "handler": "do_logout"
  },
  {
    "method": "GET",
    "pattern": "/analitics",
    "handler": "analitics"
  },
  {
    "method": "GET",
    "pattern": "/slideshow",
    "handler": "slideshows"
  },
  {
    "method": "GET",
    "pattern": "/detailslideshow/:id",
    "handler": "detailslideshow"
  },
  {
    "method": "POST",
    "pattern": "/insertslideshow",
    "handler": "insertslideshow"
  },
  {
    "method": "GET",
    "pattern": "/deleteslideshow/:id",
    "handler": "deleteslideshow"
  },
  {
    "method": "POST",
    "pattern": "/updateslideshow",
    "handler": "updateslideshow"
  },
  {
    "method": "GET",
    "pattern": "/posts",
    "handler": "posts"
  },
  {
    "method": "GET",
    "pattern": "/search_posts",
    "handler": "seacrh_posts"
  },
  {
    "method": "POST",
    "pattern": "/insertnews",
    "handler": "insertnews"
  },
  {
    "method": "POST",
    "pattern": "/updatenews",
    "handler": "updatenews"
  },
  {
    "method": "GET",
    "pattern": "/newsdetail/:id",
    "handler": "newsdetail"
  },
  {
    "method": "GET",
    "pattern": "/deletenews/:id/:foto",
    "handler": "deletenews"
  },
  {
    "method": "POST",
    "pattern": "/insertnewscategory",
    "handler": "insertnewscategory"
  },
  {
    "method": "POST",
    "pattern": "/updatenewscategory",
    "handler": "updatenewscategory"
  },
  {
    "method": "GET",
    "pattern": "/posts/type/:name",
    "handler": "categories"
  },
  {
    "method": "GET",
    "pattern": "/categories",
    "handler": "news_categories"
  },
  {
    "method": "GET",
    "pattern": "/news_category/cat/:id",
    "handler": "news_categories_menu"
  },
  {
    "method": "GET",
    "pattern": "/news/search/:date",
    "handler": "news_categories_date"
  },
  {
    "method": "GET",
    "pattern": "/detailnewscategory/:id",
    "handler": "detailnewscategory"
  },
  {
    "method": "GET",
    "pattern": "/deletenewscategory/:id",
    "handler": "deletenewscategory"
  },
  {
    "method": "GET",
    "pattern": "/photodetail/:id",
    "handler": "photodetail"
  },
  {
    "method": "GET",
    "pattern": "/deletephoto/:id/:foto",
    "handler": "deletephoto"
  },
  {
    "method": "POST",
    "pattern": "/insertphoto",
    "handler": "insertphoto"
  },
  {
    "method": "POST",
    "pattern": "/updatephoto",
    "handler": "updatephoto"
  },
  {
    "method": "POST",
    "pattern": "/insertvideo",
    "handler": "insertvideo"
  },
  {
    "method": "POST",
    "pattern": "/updatevideo",
    "handler": "updatevideos"
  },
  {
    "method": "GET",
    "pattern": "/videodetail/:id",
    "handler": "videodetail"
  },
  {
    "method": "GET",
    "pattern": "/deletevideo/:id",
    "handler": "deletevideo"
  },
  {
    "method": "GET",
    "pattern": "/users",
    "handler": "users"
  },
  {
    "method": "GET",
    "pattern": "/users_detail/:id",
    "handler": "users_detail"
  },
  {
    "method": "GET",
    "pattern": "/users_new",
    "handler": "users_new"
  },
  {
    "method": "GET",
    "pattern": "/users_whitelist",
    "handler": "users_whitelist"
  },
  {
    "method": "GET",
    "pattern": "/ip_address_approved",
    "handler": "ip_address_approve"
  },
  {
    "method": "GET",
    "pattern": "/ip_address_rejected",
    "handler": "ip_address_reject"
  },
  {
    "method": "GET",
    "pattern": "/users_ipaddress",
    "handler": "users_ipaddress"
  },
  {
    "method": "GET",
    "pattern": "/roles",
    "handler": "userroles"
  },
  {
    "method": "GET",
    "pattern": "/approveusers/:id",
    "handler": "approveusers"
  },
  {
    "method": "GET",
    "pattern": "/approveipaddress/:id",
    "handler": "approveipaddress"
  },
  {
    "method": "GET",
    "pattern": "/users_ipaddress",
    "handler": "users_ipaddress"
  },
  {
    "method": "GET",
    "pattern": "/deleteipaddress/:id",
    "handler": "deleteipaddress"
  },
  {
    "method": "GET",
    "pattern": "/deleteapproveip/:id",
    "handler": "deleteapproveip"
  },
  {
    "method": "GET",
    "pattern": "/deleterejectedip/:id",
    "handler": "deleterejectedip"
  },
  {
    "method": "POST",
    "pattern": "/insertusers",
    "handler": "insertusers"
  },
  {
    "method": "POST",
    "pattern": "/updateusers",
    "handler": "updateusers"
  },
  {
    "method": "GET",
    "pattern": "/deleteuser/:id",
    "handler": "deleteuser"
  },
  {
    "method": "GET",
    "pattern": "/updatepassword",
    "handler": "updatepassword"
  },
  {
    "method": "POST",
    "pattern": "/changespassword",
    "handler": "changespassword"
  },
  {
    "method": "GET",
    "pattern": "/structure",
    "handler": "structure"
  },
  {
    "method": "GET",
    "pattern": "/detailstructure/:id",
    "handler": "detailstructure"
  },
  {
    "method": "GET",
    "pattern": "/deletestructure/:id/:foto",
    "handler": "deletestructure"
  },
  {
    "method": "POST",
    "pattern": "/insertstructure",
    "handler": "inserstructure"
  },
  {
    "method": "POST",
    "pattern": "/updatestructure",
    "handler": "updatestructure"
  },
  {
    "method": "GET",
    "pattern": "/anggotas",
    "handler": "anggota"
  },
  {
    "method": "GET",
    "pattern": "/detailanggota/:id",
    "handler": "detailanggota"
  },
  {
    "method": "GET",
    "pattern": "/deleteanggota/:id/:foto",
    "handler": "deleteanggota"
  },
  {
    "method": "POST",
    "pattern": "/insertanggota",
    "handler": "insertanggota"
  },
  {
    "method": "POST",
    "pattern": "/updateanggota",
    "handler": "updateanggota"
  },
  {
    "method": "GET",
    "pattern": "/subanggotas",
    "handler": "subanggota"
  },
  {
    "method": "GET",
    "pattern": "/detailsubanggota/:id",
    "handler": "detailsubanggota"
  },
  {
    "method": "GET",
    "pattern": "/deletesubanggota/:id/:foto",
    "handler": "deletesubanggota"
  },
  {
    "method": "POST",
    "pattern": "/insertsubanggota",
    "handler": "insertsubanggota"
  },
  {
    "method": "POST",
    "pattern": "/updatesubanggota",
    "handler": "updatesubanggota"
  },
  {
    "method": "GET",
    "pattern": "/multistructure",
    "handler": "multi_structure"
  },
  {
    "method": "GET",
    "pattern": "/detailmultistructure",
    "handler": "detail_multi_structure"
  },
  {
    "method": "GET",
    "pattern": "/directorat",
    "handler": "directorat"
  },
  {
    "method": "GET",
    "pattern": "/directorat_fe",
    "handler": "directorats_fe"
  },
  {
    "method": "GET",
    "pattern": "/directorats_fe_news/:id",
    "handler": "directorats_fe_news"
  },
  {
    "method": "GET",
    "pattern": "/directorats_fe_photos/:id",
    "handler": "directorats_fe_photos"
  },
  {
    "method": "GET",
    "pattern": "/directorats_fe_videos/:id",
    "handler": "directorats_fe_videos"
  },
  {
    "method": "GET",
    "pattern": "/directorats_fe_opini/:id",
    "handler": "directorats_fe_opini"
  },
  {
    "method": "GET",
    "pattern": "/directorats_fe_files/:id",
    "handler": "directorats_fe_files"
  },
  {
    "method": "GET",
    "pattern": "/kdeks_fe_news/:id",
    "handler": "kdeks_fe_news"
  },
  {
    "method": "GET",
    "pattern": "/kdeks_fe_photos/:id",
    "handler": "kdeks_fe_photos"
  },
  {
    "method": "GET",
    "pattern": "/kdeks_fe_files/:id",
    "handler": "kdeks_fe_files"
  },
  {
    "method": "GET",
    "pattern": "/kdeks_fe_opini/:id",
    "handler": "kdeks_fe_opini"
  },
  {
    "method": "GET",
    "pattern": "/directorat_path/:id",
    "handler": "directorat_path"
  },
  {
    "method": "POST",
    "pattern": "/insertdirectorats",
    "handler": "insertdirectorats"
  },
  {
    "method": "POST",
    "pattern": "/directorats_update",
    "handler": "update_directorats"
  },
  {
    "method": "GET",
    "pattern": "/directorats_delete/:id/:dir/:banner",
    "handler": "delete_direactorats"
  },
  {
    "method": "GET",
    "pattern": "/directorat_detail/:id",
    "handler": "directorat_details"
  },
  {
    "method": "GET",
    "pattern": "/directorat_devisi",
    "handler": "directorat_devisi"
  },
  {
    "method": "POST",
    "pattern": "/directorats_devisi_add",
    "handler": "directorat_devisi_add"
  },
  {
    "method": "GET",
    "pattern": "/directorats_devisi_detail/:id",
    "handler": "directorat_devisi_detail"
  },
  {
    "method": "GET",
    "pattern": "/division_delete/:id",
    "handler": "directorats_devisi_delete"
  },
  {
    "method": "POST",
    "pattern": "/directorats_devisi_edit",
    "handler": "directorat_devisi_update"
  },
  {
    "method": "GET",
    "pattern": "/hotissue",
    "handler": "hotissue"
  },
  {
    "method": "GET",
    "pattern": "/hotissuedetail/:id",
    "handler": "hotissue_detail"
  },
  {
    "method": "POST",
    "pattern": "/inserthotissue",
    "handler": "inserthotissue"
  },
  {
    "method": "GET",
    "pattern": "/deletehotissue/:id/:foto",
    "handler": "deletehotissue"
  },
  {
    "method": "POST",
    "pattern": "/updatehotissue",
    "handler": "updatehotissue"
  },
  {
    "method": "GET",
    "pattern": "/hotissuecategory",
    "handler": "hotissuecategory"
  },
  {
    "method": "GET",
    "pattern": "/detailhotissuecategory/:id",
    "handler": "detailhotissuecategory"
  },
  {
    "method": "POST",
    "pattern": "/inserthotissuecategory",
    "handler": "inserthotissuecategory"
  },
  {
    "method": "POST",
    "pattern": "/updatehotissuecategory",
    "handler": "updatehotissuecategory"
  },
  {
    "method": "GET",
    "pattern": "/deletehotissuecategory/:id",
    "handler": "deletehotissuecategory"
  },
  {
    "method": "GET",
    "pattern": "/hotissuesubcategory",
    "handler": "hotissuesubcategory"
  },
  {
    "method": "GET",
    "pattern": "/detailhotissuesubcategory/:id",
    "handler": "detailhotissuesubcategory"
  },
  {
    "method": "POST",
    "pattern": "/inserthotissubcategory",
    "handler": "inserthotissubcategory"
  },
  {
    "method": "POST",
    "pattern": "/updatehotissuesubcategory",
    "handler": "updatehotissuesubcategory"
  },
  {
    "method": "GET",
    "pattern": "/deletehotissuesubcategory/:id",
    "handler": "deletehotissuesubcategory"
  },
  {
    "method": "GET",
    "pattern": "/institutions",
    "handler": "institutions"
  },
  {
    "method": "GET",
    "pattern": "/detailinstitutions/:id",
    "handler": "detailinstitutions"
  },
  {
    "method": "GET",
    "pattern": "/deleteinstitutions/:id",
    "handler": "deleteinstitution"
  },
  {
    "method": "POST",
    "pattern": "/updateinstitution",
    "handler": "updateinstitution"
  },
  {
    "method": "POST",
    "pattern": "/insertinstitution",
    "handler": "insertinstitution"
  },
  {
    "method": "GET",
    "pattern": "/sosmed",
    "handler": "sosmed"
  },
  {
    "method": "GET",
    "pattern": "/detailsosmed/:id",
    "handler": "detailsosmed"
  },
  {
    "method": "GET",
    "pattern": "/deletesosmed/:id",
    "handler": "deletesosmed"
  },
  {
    "method": "POST",
    "pattern": "/updatesosmed",
    "handler": "updatesosmed"
  },
  {
    "method": "GET",
    "pattern": "/postsosmed",
    "handler": "postsosmed"
  },
  {
    "method": "GET",
    "pattern": "/postsosmedfe",
    "handler": "postsosmedfe"
  },
  {
    "method": "POST",
    "pattern": "/insertpostsosmed",
    "handler": "insertpostsosmed"
  },
  {
    "method": "GET",
    "pattern": "/postdetailsosmed/:id",
    "handler": "detailpostsosmed"
  },
  {
    "method": "GET",
    "pattern": "/postdeletesosmed/:id",
    "handler": "deletepostsosmed"
  },
  {
    "method": "POST",
    "pattern": "/updatepostsosmed",
    "handler": "updatepostsosmed"
  },
  {
    "method": "GET",
    "pattern": "/scopes",
    "handler": "scopes"
  },
  {
    "method": "GET",
    "pattern": "/detailscopes/:id",
    "handler": "detailscopes"
  },
  {
    "method": "GET",
    "pattern": "/deletescopes/:id",
    "handler": "deletescopes"
  },
  {
    "method": "POST",
    "pattern": "/updatescopes",
    "handler": "updatescopes"
  },
  {
    "method": "GET",
    "pattern": "/maps",
    "handler": "maps"
  },
  {
    "method": "POST",
    "pattern": "/updatemaps",
    "handler": "updatemaps"
  },
  {
    "method": "GET",
    "pattern": "/contacts",
    "handler": "contacts"
  },
  {
    "method": "POST",
    "pattern": "/updatecontacts",
    "handler": "updatecontacts"
  },
  {
    "method": "POST",
    "pattern": "/questbook",
    "handler": "questbook"
  },
  {
    "method": "GET",
    "pattern": "/files",
    "handler": "files"
  },
  {
    "method": "POST",
    "pattern": "/insertfiles",
    "handler": "insertfileupload"
  },
  {
    "method": "POST",
    "pattern": "/updatefileupload",
    "handler": "updatefileupload"
  },
  {
    "method": "GET",
    "pattern": "/deletefilesupload/:id/:file",
    "handler": "deletefileupload"
  },
  {
    "method": "GET",
    "pattern": "/files_category",
    "handler": "files_category"
  },
  {
    "method": "GET",
    "pattern": "/files_category_detail/:id",
    "handler": "files_category_details"
  },
  {
    "method": "POST",
    "pattern": "/updatefilescategory",
    "handler": "updatefilescategory"
  },
  {
    "method": "GET",
    "pattern": "/filesdetails/:id",
    "handler": "filesdetails"
  },
  {
    "method": "POST",
    "pattern": "/insertfilescategory",
    "handler": "insertfilecategorydetails"
  },
  {
    "method": "GET",
    "pattern": "/deletefilecategory/:id",
    "handler": "deletefilecategorydetail"
  },
  {
    "method": "GET",
    "pattern": "/agenda",
    "handler": "agendas"
  },
  {
    "method": "GET",
    "pattern": "/agenda_graph",
    "handler": "agenda_graph"
  },
  {
    "method": "POST",
    "pattern": "/insertagenda",
    "handler": "insertagenda"
  },
  {
    "method": "GET",
    "pattern": "/deleteagenda/:id",
    "handler": "deleteagenda"
  },
  {
    "method": "GET",
    "pattern": "/agendadetails/:id",
    "handler": "agendadetails"
  },
  {
    "method": "POST",
    "pattern": "/updateagenda",
    "handler": "updateagenda"
  },
  {
    "method": "GET",
    "pattern": "/search_agenda",
    "handler": "search_agenda"
  },
  {
    "method": "GET",
    "pattern": "/zona_khas",
    "handler": "khas_zone"
  },
  {
    "method": "GET",
    "pattern": "/zona_peta",
    "handler": "zona_peta"
  },
  {
    "method": "GET",
    "pattern": "/detail_zona_khas/:id",
    "handler": "detail_khas_zone"
  },
  {
    "method": "POST",
    "pattern": "/insertzonakhas",
    "handler": "insertzonakhas"
  },
  {
    "method": "POST",
    "pattern": "/updatezonakhas",
    "handler": "updatezonakhas"
  },
  {
    "method": "GET",
    "pattern": "/deletezonakhas/:id",
    "handler": "deletezonakhas"
  },
  {
    "method": "GET",
    "pattern": "/tagging",
    "handler": "tagging"
  },
  {
    "method": "GET",
    "pattern": "/detailtagging/:id",
    "handler": "detailtagging"
  },
  {
    "method": "POST",
    "pattern": "/inserttagging",
    "handler": "inserttagging"
  },
  {
    "method": "GET",
    "pattern": "/deletetagging/:id",
    "handler": "deletetagging"
  },
  {
    "method": "POST",
    "pattern": "/updatetagging",
    "handler": "updatetagging"
  },
  {
    "method": "GET",
    "pattern": "/provinces",
    "handler": "provinces"
  },
  {
    "method": "GET",
    "pattern": "/provinces_detail/:id",
    "handler": "provinces_detail"
  },
  {
    "method": "GET",
    "pattern": "/login_banners",
    "handler": "login_banners"
  },
  {
    "method": "GET",
    "pattern": "/detail_login_banner/:id",
    "handler": "detail_login_banners"
  },
  {
    "method": "POST",
    "pattern": "/insertloginbanners",
    "handler": "insertloginbanner"
  },
  {
    "method": "POST",
    "pattern": "/updateloginbanners",
    "handler": "updateloginbanners"
  },
  {
    "method": "GET",
    "pattern": "/delete_login_banner/:id/:foto",
    "handler": "delete_login_banner"
  },
  {
    "method": "GET",
    "pattern": "/s_logos",
    "handler": "slogo"
  },
  {
    "method": "POST",
    "pattern": "/insert_slogo",
    "handler": "inserts_slogo"
  },
  {
    "method": "GET",
    "pattern": "/detail_s_logos/:id",
    "handler": "detail_slogo"
  },
  {
    "method": "POST",
    "pattern": "/updateslogo",
    "handler": "updates_slogo"
  },
  {
    "method": "GET",
    "pattern": "/delete_slogo/:id/:foto",
    "handler": "delete_slogos"
  },
  {
    "method": "GET",
    "pattern": "/welcome_pages",
    "handler": "welcome_pages"
  },
  {
    "method": "GET",
    "pattern": "/detail_welcome_pages/:id",
    "handler": "detail_welcome_pages"
  },
  {
    "method": "POST",
    "pattern": "/insert_welcome_pages",
    "handler": "insert_welcome_pages"
  },
  {
    "method": "POST",
    "pattern": "/update_welcome_pages",
    "handler": "update_welcome_pages"
  },
  {
    "method": "GET",
    "pattern": "/delete_welcome_page/:id/:foto",
    "handler": "delete_welcome_page"
  },
  {
    "method": "GET",
    "pattern": "/data_submenu",
    "handler": "data_submenus"
  },
  {
    "method": "POST",
    "pattern": "/insert_submenu",
    "handler": "insert_submenus"
  },
  {
    "method": "POST",
    "pattern": "/update_submenu",
    "handler": "update_submenus"
  },
  {
    "method": "GET",
    "pattern": "/delete_submenu/:id",
    "handler": "delete_submenus"
  },
  {
    "method": "GET",
    "pattern": "/detail_submenu/:id",
    "handler": "detail_submenus"
  },
  {
    "method": "GET",
    "pattern": "/detail_submenus_edit/:id",
    "handler": "detail_submenus_edit"
  },
  {
    "method": "POST",
    "pattern": "/insertapidashboard",
    "handler": "insertapidashboards"
  },
  {
    "method": "POST",
    "pattern": "/emptyapidashboards",
    "handler": "emptyapidashboard"
  },
  {
    "method": "POST",
    "pattern": "/updateapidashboards",
    "handler": "updateapidashboard"
  },
  {
    "method": "GET",
    "pattern": "/data_menu",
    "handler": "data_menus"
  },
  {
    "method": "GET",
    "pattern": "/data_menu_fe",
    "handler": "data_menu_fe"
  },
  {
    "method": "GET",
    "pattern": "/menu_fe",
    "handler": "dropdown_menu"
  },
  {
    "method": "GET",
    "pattern": "/detail_data_menus/:id",
    "handler": "detail_data_menus"
  },
  {
    "method": "GET",
    "pattern": "/delete_data_menu/:id",
    "handler": "deletedatamenus"
  },
  {
    "method": "POST",
    "pattern": "/insert_data_menu",
    "handler": "insertdatamenus"
  },
  {
    "method": "POST",
    "pattern": "/update_data_menu",
    "handler": "updatedatamenus"
  },
  {
    "method": "GET",
    "pattern": "/slider_data",
    "handler": "sliders_data"
  },
  {
    "method": "GET",
    "pattern": "/slider_data_fe",
    "handler": "sliders_data_fe"
  },
  {
    "method": "POST",
    "pattern": "/insertsliderdata",
    "handler": "insertsliderdata"
  },
  {
    "method": "GET",
    "pattern": "/detail_slider_data/:id",
    "handler": "detail_sliders_data"
  },
  {
    "method": "POST",
    "pattern": "/updatesliderdata",
    "handler": "updateslidersdata"
  },
  {
    "method": "GET",
    "pattern": "/delete_slider_data/:id/:photo",
    "handler": "delete_slider_data"
  },
  {
    "method": "GET",
    "pattern": "/sourcesdata",
    "handler": "sourcesdata"
  },
  {
    "method": "GET",
    "pattern": "/sourcesdatadetail/:id",
    "handler": "sourcesdatadetail"
  },
  {
    "method": "GET",
    "pattern": "/deletesourcesdata/:id",
    "handler": "deletesourcesdata"
  },
  {
    "method": "POST",
    "pattern": "/insertsourcesdata",
    "handler": "insertsourcesdata"
  },
  {
    "method": "POST",
    "pattern": "/updatesourcedata",
    "handler": "updatesourcedata"
  },
  {
    "method": "GET",
    "pattern": "/sourcesdatadetaillist/:id",
    "handler": "sourcesdatadetail"
  },
  {
    "method": "POST",
    "pattern": "/insertopini",
    "handler": "insertopini"
  },
  {
    "method": "POST",
    "pattern": "/updateopini",
    "handler": "updateopini"
  },
  {
    "method": "GET",
    "pattern": "/deleteopini/:id/:photo",
    "handler": "deleteopini"
  },
  {
    "method": "POST",
    "pattern": "/updatewebtitle",
    "handler": "updatewebtitle"
  },
  {
    "method": "POST",
    "pattern": "/updateweblogo",
    "handler": "updateweblogo"
  },
  {
    "method": "POST",
    "pattern": "/updatewebheader",
    "handler": "updatewebheader"
  },
  {
    "method": "POST",
    "pattern": "/updatewebcolor",
    "handler": "updatewebcolor"
  },
  {
    "method": "POST",
    "pattern": "/insertmenu",
    "handler": "insertmenu"
  },
  {
    "method": "POST",
    "pattern": "/updatemenu",
    "handler": "updatemenu"
  },
  {
    "method": "POST",
    "pattern": "/insertsubmenu",
    "handler": "insertsubmenu"
  },
  {
    "method": "POST",
    "pattern": "/updatesubmenu",
    "handler": "updatesubmenu"
  },
  {
    "method": "POST",
    "pattern": "/post_puppeteer",
    "handler": "download_image_base64"
  },
  {
    "method": "GET",
    "pattern": "/dashboard_naration/:id",
    "handler": "dashboard_naration"
  },
  {
    "method": "POST",
    "pattern": "/insertprovince",
    "handler": "insertprovinces"
  },
  {
    "method": "POST",
    "pattern": "/updateprovince",
    "handler": "updateprovinces"
  },
  {
    "method": "GET",
    "pattern": "/province_delete/:id",
    "handler": "deleteprovinces"
  },
  {
    "method": "POST",
    "pattern": "/visits",
    "handler": "pengunjung"
  },
  {
    "method": "GET",
    "pattern": "/visitors",
    "handler": "ambil_pengunjung"
  },
  {
    "method": "GET",
    "pattern": "/visitors_year",
    "handler": "pengunjung_tahunan"
  },
  {
    "method": "POST",
    "pattern": "/acts_login",
    "handler": "api_login"
  },
  {
    "method": "GET",
    "pattern": "/acts_logout",
    "handler": "api_logout"
  }
];

export function getLegacyRoutes() {
  return legacyRoutes;
}

export function matchLegacyRoute(method, pathname) {
  const inputSegments = pathname.split("/").filter(Boolean).map(decodeURIComponent);
  for (const route of legacyRoutes) {
    if (route.method !== method) continue;
    const patternSegments = route.pattern.split("/").filter(Boolean);
    if (patternSegments.length !== inputSegments.length) continue;
    const params = {};
    let isMatch = true;
    for (let index = 0; index < patternSegments.length; index += 1) {
      const segment = patternSegments[index];
      if (segment.startsWith(":")) params[segment.slice(1)] = inputSegments[index];
      else if (segment !== inputSegments[index]) { isMatch = false; break; }
    }
    if (isMatch) return { ...route, params };
  }
  return null;
}
