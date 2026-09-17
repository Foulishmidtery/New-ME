import { selectHandlers } from "@/server/repositories/legacy-source";

export const contentRepository = selectHandlers([
  "hotissue", "hotissue_detail", "inserthotissue", "updatehotissue", "deletehotissue", "hotissuecategory",
  "inserthotissuecategory", "updatehotissuecategory", "deletehotissuecategory", "hotissuesubcategory",
  "inserthotissubcategory", "updatehotissuesubcategory", "deletehotissuesubcategory", "agendas", "agenda_graph",
  "agendadetails", "insertagenda", "updateagenda", "deleteagenda", "search_agenda", "files", "filesdetails",
  "insertfileupload", "updatefileupload", "deletefileupload", "files_category", "files_category_details",
  "insertfilecategorydetails", "updatefilescategory", "deletefilecategorydetail", "sliders_data", "insertsliderdata",
  "updateslidersdata", "detail_sliders_data", "delete_slider_data", "data_dashboard", "insertapidashboards",
  "updateapidashboard", "data_menus", "insertdatamenus", "updatedatamenus", "detail_data_menus", "deletedatamenus",
]);
