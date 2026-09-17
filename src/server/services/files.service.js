import { filesRepository } from "@/server/repositories/files.repository";

export const filesService = {
  // Files
  listFiles: (roleId) => {
    return filesRepository.listFiles(roleId).then(rows => {
      return rows.map(items => ({
        id: items?.id,
        title: items?.title,
        title_en: items?.title_en,
        date: items?.date,
        file: items?.file,
        content: items?.content,
        content_en: items?.content_en,
        is_publish: items?.is_publish,
        report_category_id: items?.report_category_id,
        report_category_name: items?.report_category_name,
        fl: items?.file?.split('/')[5],
        wtiter: items?.writer,
        synopsis: items?.synopsis,
        isbn: items?.isbn,
        number_of_pages: items?.number_of_pages,
        width: items?.width,
        height: items?.height,
        tagging: items?.tagging,
        directorat: items?.directorat,
        id_province: items?.id_province,
        users_name: items?.users_name
      }));
    });
  },
  getFile: (id) => filesRepository.getFile(id),
  createFile: (data) => filesRepository.createFile(data),
  updateFile: (id, data) => filesRepository.updateFile(id, data),
  removeFile: (id) => filesRepository.removeFile(id),

  // File Categories
  listCategories: () => filesRepository.listCategories(),
  getCategory: (id) => filesRepository.getCategory(id),
  createCategory: (data) => filesRepository.createCategory(data),
  updateCategory: (id, data) => filesRepository.updateCategory(id, data),
  removeCategory: (id) => filesRepository.removeCategory(id),
};
