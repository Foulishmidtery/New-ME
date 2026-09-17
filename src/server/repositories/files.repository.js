import { db } from "@/lib/db";

export const filesRepository = {
  // Files
  async listFiles(roleId) {
    if (roleId == '6') {
        return (await db.query("SELECT * FROM files WHERE web_identity = 'kdeks'")).rows;
    } else {
        return (await db.query("SELECT * FROM files WHERE web_identity = 'kneks'")).rows;
    }
  },
  async getFile(id) {
    return (await db.query("SELECT * FROM files WHERE id = $1", [id])).rows[0] ?? null;
  },
  async createFile(data) {
    const bbb = data.file_category_id.split('-');
    const result = await db.query(
      "INSERT INTO files(title, title_en, content, content_en, file, is_publish, date, report_category_id, report_category_name, writer, publisher, synopsis, isbn, number_of_pages, width, height, tagging, directorat, id_province, users_id, users_name, passcode, downloadable) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23) RETURNING *",
      [data.title, data.title_en, data.content, data.content_en, data.file, data.is_publish, data.date, bbb[0], bbb[1], data.writer, data.publisher, data.synopsis, data.isbn, data.number_of_pages, data.width, data.height, data.taggings, data.directorat, data.kdeks, data.users_id, data.users_name, data.passcode, data.downloadable]
    );
    return result.rows[0];
  },
  async updateFile(id, data) {
    const bbb = data.file_category_id.split('-');
    if (!data.file) {
      const result = await db.query(
        "UPDATE files SET title=$1, title_en=$2, content=$3, content_en=$4, is_publish=$5, date=$6, report_category_id=$7, report_category_name=$8, writer=$9, publisher=$10, synopsis=$11, isbn=$12, number_of_pages=$13, width=$14, height=$15, tagging=$16, directorat=$17, id_province=$18, users_id=$19, users_name=$20, passcode=$21, downloadable=$22 WHERE id = $23 RETURNING *",
        [data.title, data.title_en, data.content, data.content_en, data.is_publish, data.date, bbb[0], bbb[1], data.writer, data.publisher, data.synopsis, data.isbn, data.number_of_pages, data.width, data.height, data.taggings, data.directorat, data.kdeks, data.users_id, data.users_name, data.passcode, data.downloadable, id]
      );
      return result.rows[0];
    } else {
      const result = await db.query(
        "UPDATE files SET title=$1, title_en=$2, content=$3, content_en=$4, file=$5, is_publish=$6, date=$7, report_category_id=$8, report_category_name=$9, writer=$10, publisher=$11, synopsis=$12, isbn=$13, number_of_pages=$14, width=$15, height=$16, tagging=$17, directorat=$18, id_province=$19, users_id=$20, users_name=$21, passcode=$22, downloadable=$23 WHERE id = $24 RETURNING *",
        [data.title, data.title_en, data.content, data.content_en, data.file, data.is_publish, data.date, bbb[0], bbb[1], data.writer, data.publisher, data.synopsis, data.isbn, data.number_of_pages, data.width, data.height, data.taggings, data.directorat, data.kdeks, data.users_id, data.users_name, data.passcode, data.downloadable, id]
      );
      return result.rows[0];
    }
  },
  async removeFile(id) {
    return (await db.query("DELETE FROM files WHERE id = $1 RETURNING id", [id])).rows[0] ?? null;
  },

  // File Categories
  async listCategories() {
    return (await db.query("SELECT * FROM files_categories ORDER BY id ASC")).rows;
  },
  async getCategory(id) {
    return (await db.query("SELECT * FROM files_categories WHERE id = $1", [id])).rows[0] ?? null;
  },
  async createCategory(data) {
    const result = await db.query(
      "INSERT INTO files_categories(title, title_en) VALUES($1, $2) RETURNING *",
      [data.title, data.title_en]
    );
    return result.rows[0];
  },
  async updateCategory(id, data) {
    const result = await db.query(
      "UPDATE files_categories SET title=$1, title_en=$2 WHERE id = $3 RETURNING *",
      [data.title, data.title_en, id]
    );
    return result.rows[0];
  },
  async removeCategory(id) {
    return (await db.query("DELETE FROM files_categories WHERE id = $1 RETURNING id", [id])).rows[0] ?? null;
  }
};
