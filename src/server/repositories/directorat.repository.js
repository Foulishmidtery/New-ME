import { db } from "@/lib/db";

export const directoratRepository = {
  // Directorats
  async getDirectorats(role_id, directorat_id) {
    if (role_id == 1 || role_id == 2) {
      return (await db.query("SELECT * FROM directorats")).rows;
    } else {
      return (await db.query("SELECT * FROM directorats WHERE id = $1", [directorat_id])).rows;
    }
  },
  async getDirectoratsFe() {
    return (await db.query("SELECT * FROM directorats ORDER BY id ASC")).rows;
  },
  async createDirectorat(data) {
    return (await db.query(
      "INSERT INTO directorats(title,title_en,description,description_en,images,directiorat_banner) VALUES($1,$2,$3,$4,$5,$6) RETURNING *",
      [data.title, data.title_en, data.description, data.description_en, data.images, data.directiorat_banner]
    )).rows[0];
  },
  async updateDirectorat(id, data) {
    const fields = [data.title, data.title_en, data.description, data.description_en];
    if (data.images && data.directiorat_banner) {
      return (await db.query(
        "UPDATE directorats SET title=$1,title_en=$2,description=$3,description_en=$4,images=$5,directiorat_banner=$6 WHERE id=$7 RETURNING *",
        [...fields, data.images, data.directiorat_banner, id]
      )).rows[0];
    } else if (data.images) {
      return (await db.query(
        "UPDATE directorats SET title=$1,title_en=$2,description=$3,description_en=$4,images=$5 WHERE id=$6 RETURNING *",
        [...fields, data.images, id]
      )).rows[0];
    } else if (data.directiorat_banner) {
      return (await db.query(
        "UPDATE directorats SET title=$1,title_en=$2,description=$3,description_en=$4,directiorat_banner=$5 WHERE id=$6 RETURNING *",
        [...fields, data.directiorat_banner, id]
      )).rows[0];
    } else {
      return (await db.query(
        "UPDATE directorats SET title=$1,title_en=$2,description=$3,description_en=$4 WHERE id=$5 RETURNING *",
        [...fields, id]
      )).rows[0];
    }
  },
  async deleteDirectorat(id) {
    return (await db.query("DELETE FROM directorats WHERE id=$1 RETURNING id", [id])).rows[0];
  },
  async getDirectoratDetails(id) {
    const directorats = (await db.query("SELECT * FROM directorats WHERE id = $1", [id])).rows;
    const result = [];
    for (const item of directorats) {
      const devisi = (await db.query("SELECT * FROM devisi WHERE directorats_id = $1", [item.id])).rows;
      result.push({
        id: item.id,
        title: item.title,
        title_en: item.title_en,
        description: item.description,
        description_en: item.description_en,
        web_identity: item.web_identity,
        images: item.images,
        directiorat_banner: item.directiorat_banner,
        id_province: item.id_province,
        province_name: item.province_name,
        detail: devisi
      });
    }
    return result;
  },

  // Devisi (Division)
  async getDevisi() {
    return (await db.query("SELECT * FROM devisi")).rows;
  },
  async getDevisiById(id) {
    return (await db.query("SELECT * FROM devisi WHERE id = $1", [id])).rows;
  },
  async createDevisi(data) {
    return (await db.query(
      "INSERT INTO devisi(title,title_en,description,description_en,directorats_id,directorats_name) VALUES($1,$2,$3,$4,$5,$6) RETURNING *",
      [data.title, data.title_en, data.description, data.description_en, data.directorats_id, data.directorats_name]
    )).rows[0];
  },
  async updateDevisi(id, data) {
    return (await db.query(
      "UPDATE devisi SET title=$1, description=$2, directorats_id=$3, directorats_name=$4, title_en=$5, description_en=$6 WHERE id=$7 RETURNING *",
      [data.title, data.description, data.directorats_id, data.directorats_name, data.title_en, data.description_en, id]
    )).rows[0];
  },
  async deleteDevisi(id) {
    return (await db.query("DELETE FROM devisi WHERE id=$1 RETURNING id", [id])).rows[0];
  },

  // Directorats FE resources (news, photos, videos, opini, files)
  async getDirectoratsFeNews(id) {
    return (await db.query(`SELECT * FROM news WHERE directorat LIKE '%${id}%' ORDER BY news_datetime DESC`)).rows;
  },
  async getDirectoratsFePhotos(id) {
    return (await db.query(`SELECT * FROM news_photos WHERE directorat LIKE '%${id}%' ORDER BY id DESC`)).rows;
  },
  async getDirectoratsFeVideos(id) {
    return (await db.query(`SELECT * FROM news_videos WHERE directorat LIKE '%${id}%' ORDER BY id DESC`)).rows;
  },
  async getDirectoratsFeOpini(id) {
    return (await db.query(`SELECT * FROM opini WHERE directorat LIKE '%${id}%' ORDER BY id DESC`)).rows;
  },
  async getDirectoratsFeFiles(id) {
    return (await db.query(`SELECT * FROM files WHERE directorat LIKE '%${id}%' ORDER BY id DESC`)).rows;
  },

  // KDEKS FE resources (news, photos, opini, files)
  async getKdeksFeNews(id) {
    return (await db.query(`SELECT * FROM news WHERE id_province LIKE '%${id}%' ORDER BY id ASC`)).rows;
  },
  async getKdeksFePhotos(id) {
    return (await db.query(`SELECT * FROM news_photos WHERE id_province LIKE '%${id}%' ORDER BY id ASC`)).rows;
  },
  async getKdeksFeOpini(id) {
    return (await db.query(`SELECT * FROM opini WHERE id_province LIKE '%${id}%' ORDER BY id ASC`)).rows;
  },
  async getKdeksFeFiles(id) {
    return (await db.query(`SELECT * FROM files WHERE id_province LIKE '%${id}%' ORDER BY id ASC`)).rows;
  },

  async getDirectoratPath(id) {
    return (await db.query("SELECT * FROM hot_issues WHERE hot_issue_category = $1", [id])).rows;
  }
};
