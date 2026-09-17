const R1 = Object.freeze([1]);
const R12 = Object.freeze([1, 2]);
const R124 = Object.freeze([1, 2, 4]);
const R1234 = Object.freeze([1, 2, 3, 4]);
const R1246 = Object.freeze([1, 2, 4, 6]);
const R12346 = Object.freeze([1, 2, 3, 4, 6]);
const R123467 = Object.freeze([1, 2, 3, 4, 6, 7]);

function policy(legacyRoute, allowedRoles) {
  return Object.freeze({
    cookie: "roles_id",
    allowedRoles,
    legacyRoute,
    unauthorized: Object.freeze({ status: 302, location: "/" }),
  });
}

/**
 * CMS page authorization copied from Old-BE app.js.
 * Keys intentionally match legacy view paths without the .html suffix, which
 * are also the pageKey values used by MigratedLegacyPage in New-ME.
 *
 * Do not broaden these policies without changing the Old-BE compatibility
 * contract explicitly. Missing/invalid roles_id is denied by the same policy.
 */
export const legacyPageRolePolicies = Object.freeze({
  // Banners
  "banners/welcome/update": policy("/welcomebanner", R12),
  "banners/welcome/add": policy("/welcomebanner_add", R12),
  "banners/welcome/edit": policy("/edit_welcome_page/:id", R12),
  "banners/login_banner/list": policy("/login_banner", R12),
  "banners/login_banner/add": policy("/login_banner_add", R12),
  "banners/login_banner/edit": policy("/login_banner_edit/:id", R12),
  "banners/banner/list": policy("/b", R12),
  "banners/banner/add": policy("/b_add", R12),
  "banners/banner/edit": policy("/b_edit/:id", R12),

  // Directorate / division
  "directorat/list": policy("/directorats", R1234),
  "directorat/add": policy("/directorats_add", R12),
  "directorat/edit": policy("/directorats_edit/:id", R12),
  "directorat/detail": policy("/directorats_detail/:id", R12),
  "divisi/devisi": policy("/devision", R1234),
  "divisi/add": policy("/devision_add", R12),
  "divisi/edit": policy("/devision_edit/:id", R1234),

  // KNEKS organization structure
  "struktur/pejabat/list": policy("/s", R1234),
  "struktur/pejabat/add": policy("/s_add", R1234),
  "struktur/pejabat/edit": policy("/s_edit/:id", R1234),
  "struktur/struktur/s_logo": policy("/s_logo", R12),
  "struktur/struktur/add_s_logo": policy("/s_logo_add", R12),
  "struktur/struktur/edit_s_logo": policy("/s_logo_edit/:id", R12),
  "struktur/anggota/list": policy("/anggota", R1234),
  "struktur/anggota/add": policy("/anggota_add", R1234),
  "struktur/anggota/edit": policy("/anggota_edit/:id", R1234),
  "struktur/sub_anggota/list": policy("/sub_anggota", R1234),
  "struktur/sub_anggota/add": policy("/sub_anggota_add", R1234),
  "struktur/sub_anggota/edit": policy("/sub_anggota_edit/:id", R1234),

  // News / opinion / hot issue / media
  "news_management/news/list": policy("/n", R12346),
  "news_management/news/add": policy("/n_add", R12346),
  "news_management/news/edit": policy("/n_edit/:id", R12346),
  "news_management/news_category/list": policy("/nc", R12),
  "news_management/news_category/add": policy("/nc_add", R12),
  "news_management/news_category/edit": policy("/nc_edit/:id", R12),
  "opini/opini": policy("/opini", R123467),
  "opini/opini_add": policy("/opini_add", R123467),
  "opini/opini_edit": policy("/opini_edit/:id", R123467),
  "hot_issue_management/hot_issue/list": policy("/hi", R124),
  "hot_issue_management/hot_issue/add": policy("/hi_add", R124),
  "hot_issue_management/hot_issue/edit": policy("/hi_edit/:id", R124),
  "hot_issue_management/hot_issue_category/list": policy("/hic", R12),
  "hot_issue_management/hot_issue_category/edit": policy("/hic_edit/:id", R12),
  "hot_issue_management/hot_issue_category/add": policy("/hic_add", R12),
  "hot_issue_management/hot_issue_sub_category/list": policy("/hisc", R12),
  "hot_issue_management/hot_issue_sub_category/add": policy("/hisc_add", R12),
  "hot_issue_management/hot_issue_sub_category/edit": policy("/hisc_edit/:id", R12),
  "photos/list": policy("/ph", R12346),
  "photos/add": policy("/ph_add", R12346),
  "photos/edit": policy("/ph_edit/:id", R12346),
  "videos/list": policy("/v", R12346),
  "videos/add": policy("/v_add", R12346),
  "videos/edit": policy("/v_edit/:id", R12346),

  // Agenda / files
  "agenda/list": policy("/a", R12346),
  "agenda/add": policy("/a_add", R12346),
  "agenda/edit": policy("/a_edit/:id", R12346),
  "one_data_center/files/list": policy("/f", R12346),
  "one_data_center/files/edit": policy("/f_edit/:id", R12346),
  "one_data_center/files/add": policy("/f_add", R12346),
  "one_data_center/files_category/list": policy("/fc", R12),
  "one_data_center/files_category/add": policy("/fc_add", R12),
  "one_data_center/files_category/edit": policy("/fc_edit/:id", R12),

  // Data management
  "data/menu/list": policy("/menu_data", R12),
  "data/menu/add": policy("/menudata_add", R12),
  "data/menu/edit": policy("/menudata_edit/:id", R12),
  "data/slider/data": policy("/sliderdata", R1),
  "data/slider/add_data": policy("/sliderdata_add", R1),
  "data/slider/edit": policy("/sliderdata_edit/:id", R1),
  "data/dataset/list": policy("/dataset", R1),
  "data/dataset/add": policy("/dataset_add", R1),
  "data/dataset/view": policy("/dataset_detail/:id", R1),
  "data/dashboard/naration": policy("/narations/:id/:name", R12346),
  "data/dashboard/list": policy("/dashboard", R12346),
  "data/dashboard/add": policy("/dashboard_add", R1),
  "data/submenu/list": policy("/submenu_data", R1),
  "data/submenu/add": policy("/submenudata_add", R1),
  "data/submenu/edit": policy("/submenudata_edit/:id", R1),

  // KDEKS
  "kdeks/kdeks/kdeks_form": policy("/kdeks_form/:id", R1246),
  "kdeks/kdeks/kdeks": policy("/kdeks", R1246),
  "kdeks/kdeks/kdeks_edit": policy("/kdeks_edit/:id", R1246),
  "kdeks/master/master": policy("/master", R1246),
  "kdeks/master/master_add": policy("/master_add", R1246),
  "kdeks/master/master_edit": policy("/master_edit/:id", R1246),
  "kdeks/province/list": policy("/province", R1),
  "kdeks/province/add": policy("/province_add", R1),
  "kdeks/province/edit": policy("/province_edit/:id", R1),
  "kdeks/pejabat/list": policy("/s_kdeks", R12),
  "kdeks/pejabat/add": policy("/s_kdeks_add", R12),
  "kdeks/pejabat/edit": policy("/s_kdeks_edit/:id", R12),
  "kdeks/anggota/list": policy("/anggota_kdeks", R1234),
  "kdeks/anggota/add": policy("/anggota_kdeks_add", R1234),
  "kdeks/anggota/edit": policy("/anggota_kdeks_edit/:id", R1234),
  "kdeks/sub_anggota/list": policy("/sub_anggota_kdeks", R1234),
  "kdeks/sub_anggota/add": policy("/sub_anggota_kdeks_add", R1234),
  "kdeks/sub_anggota/edit": policy("/sub_anggota_kdeks_edit/:id", R1234),

  // Zona KHAS / tagging
  "zona_khas/list": policy("/zk", R124),
  "zona_khas/add": policy("/zk_add", R124),
  "zona_khas/edit": policy("/zk_edit/:id", R124),
  "tagging/list": policy("/tg", R124),
  "tagging/add": policy("/tg_add", R1),
  "tagging/edit": policy("/tg_edit/:id", R1),

  // Users
  "user_management/users/list": policy("/u", R1),
  "user_management/users/add": policy("/u_add", R1),
  "user_management/users/edit": policy("/u_edit/:id", R1),
  "user_management/change_password/list": policy("/cp", R12),
  "user_management/new_user/list": policy("/new_user", R12),
  "user_management/whitelist/list": policy("/whitelist", R12),
  "user_management/whitelist/ipaddress": policy("/ip_address", R12),
  "user_management/approve/list": policy("/ip_address_approve", R12),
  "user_management/rejected/list": policy("/ip_address_rejects", R12),

  // Profile
  "profile/tentang_kami/tentang_kami_form": policy("/tk_form/:id", R1),
  "profile/tentang_kami/tentang_kami": policy("/tk", R1),
  "profile/tentang_kami/tentang_kami_edit": policy("/tk_edit/:id", R1),
  "profile/ekonomi_syariah/ekonomi_syariah_form": policy("/es_form/:id", R1),
  "profile/ekonomi_syariah/ekonomi_syariah": policy("/es", R1),
  "profile/ekonomi_syariah/edit": policy("/es_edit/:id", R1),
  "profile/institution/list": policy("/i", R1),
  "profile/institution/add": policy("/i_add", R1),
  "profile/institution/edit": policy("/i_edit/:id", R1),
  "profile/social_media/list": policy("/sm", R1),
  "profile/social_media/edit": policy("/sm_edit/:id", R1),
  "profile/post_sosmed/list": policy("/psm", R1),
  "profile/post_sosmed/add": policy("/psm_add", R1),
  "profile/post_sosmed/edit": policy("/psm_edit/:id", R1),
  "profile/contacts/list": policy("/c", R1),
  "profile/contacts/edit": policy("/c_edit/:id", R1),
  "profile/maps/list": policy("/m", R1),
  "profile/maps/edit": policy("/m_edit/:id", R1),
  "profile/scope/list": policy("/scp", R1),
  "profile/scope/edit": policy("/scp_edit/:id", R1),

  // Settings
  "pengaturan/identitas_web/title": policy("/titleweb", R1),
  "pengaturan/identitas_web/edit_title": policy("/web_title_edit/:id", R1),
  "pengaturan/identitas_web/logo": policy("/logo", R1),
  "pengaturan/identitas_web/edit_logo": policy("/web_logo_edit/:id", R1),
  "pengaturan/identitas_web/header": policy("/header", R1),
  "pengaturan/identitas_web/edit_header": policy("/web_header_edit/:id", R1),
  "pengaturan/identitas_web/color": policy("/color", R1),
  "pengaturan/identitas_web/edit_color": policy("/web_color_edit/:id", R1),
  "pengaturan/menu/list": policy("/menu", R1),
  "pengaturan/menu/add": policy("/menu_add", R1),
  "pengaturan/menu/edit": policy("/menu_edit/:id", R1),
  "pengaturan/sub_menu/list": policy("/submenu", R1),
  "pengaturan/sub_menu/add": policy("/submenu_add", R1),
  "pengaturan/sub_menu/edit": policy("/submenu_edit/:id", R1),
});
