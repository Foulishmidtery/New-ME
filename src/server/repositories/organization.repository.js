import { selectHandlers } from "@/server/repositories/legacy-source";

export const organizationRepository = selectHandlers([
  "kdeks", "detailkdeks", "insertkdeks", "updatekdeks", "deletekdeks", "provinces", "provinces_detail",
  "insertprovinces", "updateprovinces", "deleteprovinces", "structure", "detailstructure", "inserstructure",
  "updatestructure", "deletestructure", "anggota", "detailanggota", "insertanggota", "updateanggota",
  "deleteanggota", "subanggota", "detailsubanggota", "insertsubanggota", "updatesubanggota", "deletesubanggota",
  "directorat", "insertdirectorats", "update_directorats", "delete_direactorats", "directorat_details",
  "directorat_devisi", "directorat_devisi_add", "directorat_devisi_update", "directorats_devisi_delete",
]);
