import { db } from "@/lib/db";

export const extraRepository = {
  // Provinces
  async listProvinces() {
    return (await db.query("SELECT * FROM province")).rows;
  },
  async getProvince(id) {
    return (await db.query("SELECT * FROM province WHERE id=$1", [id])).rows[0] ?? null;
  },
  async createProvince(data) {
    const result = await db.query(
      "INSERT INTO province(province_name, code) VALUES($1, $2) RETURNING *",
      [data.provinces, data.code]
    );
    return result.rows[0];
  },
  async updateProvince(id, data) {
    const result = await db.query(
      "UPDATE province SET province_name=$1, code=$2 WHERE id=$3 RETURNING *",
      [data.province_name, data.code, id]
    );
    return result.rows[0];
  },
  async deleteProvince(id) {
    return (await db.query("DELETE FROM province WHERE id=$1 RETURNING id", [id])).rows[0] ?? null;
  },

  // Zona Khas
  async listZonaKhas() {
    return (await db.query("SELECT * FROM khas_zone")).rows;
  },
  async getZonaKhas(id) {
    return (await db.query("SELECT * FROM khas_zone WHERE id=$1", [id])).rows[0] ?? null;
  },
  async createZonaKhas(data) {
    let inauguration_val = null;
    let inaugurated_val = null;

    if (data.status === 'diresmikan') {
      inauguration_val = data.inauguration ? data.inauguration : null;
      inaugurated_val = data.inaugurated ? data.inaugurated : null;
    }

    const result = await db.query(
      "INSERT INTO khas_zone(khas_zone, city, province, inauguration, tenant, inaugurated, status) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [data.khas_zone, data.city, data.province, inauguration_val, data.tenant, inaugurated_val, data.status]
    );
    return result.rows[0];
  },
  async updateZonaKhas(id, data) {
    let inauguration_val = null;
    let inaugurated_val = null;

    if (data.status === 'diresmikan') {
      inauguration_val = data.inauguration ? data.inauguration : null;
      inaugurated_val = data.inaugurated ? data.inaugurated : null;
    }

    const result = await db.query(
      "UPDATE khas_zone SET khas_zone=$1, city=$2, province=$3, inauguration=$4, tenant=$5, inaugurated=$6, status=$7 WHERE id=$8 RETURNING *",
      [data.khas_zone, data.city, data.province, inauguration_val, data.tenant, inaugurated_val, data.status, id]
    );
    return result.rows[0];
  },
  async deleteZonaKhas(id) {
    return (await db.query("DELETE FROM khas_zone WHERE id=$1 RETURNING id", [id])).rows[0] ?? null;
  },

  // Tagging
  async listTaggings() {
    return (await db.query("SELECT * FROM tagging")).rows;
  },
  async getTagging(id) {
    return (await db.query("SELECT * FROM tagging WHERE id=$1", [id])).rows[0] ?? null;
  },
  async createTagging(data) {
    const result = await db.query(
      "INSERT INTO tagging(tagging) VALUES($1) RETURNING *",
      [data.tagging]
    );
    return result.rows[0];
  },
  async updateTagging(id, data) {
    const result = await db.query(
      "UPDATE tagging SET tagging=$1 WHERE id=$2 RETURNING *",
      [data.tagging, id]
    );
    return result.rows[0];
  },
  async deleteTagging(id) {
    return (await db.query("DELETE FROM tagging WHERE id=$1 RETURNING id", [id])).rows[0] ?? null;
  },

  // Opini
  async listOpini() {
    return (await db.query("SELECT * FROM opini")).rows;
  },
  async getOpini(id) {
    return (await db.query("SELECT * FROM opini WHERE id=$1", [id])).rows[0] ?? null;
  },
  async createOpini(data) {
    const result = await db.query(
      "INSERT INTO opini(title, title_en, content, content_en, web_identity, tagging, directorat, is_publish, date_created, users_id, users_name, id_province, images) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *",
      [data.title, data.title_en, data.content, data.content_en, data.web_identity, data.taggings, data.directorat, data.is_published, data.tanggal_opini, data.users_id, data.users_name, data.kdeks, data.images]
    );
    return result.rows[0];
  },
  async updateOpini(id, data) {
    if (data.images) {
      const result = await db.query(
        "UPDATE opini SET title=$1, title_en=$2, content=$3, content_en=$4, tagging=$5, directorat=$6, is_publish=$7, date_created=$8, users_id=$9, users_name=$10, id_province=$11, images=$12 WHERE id=$13 RETURNING *",
        [data.title, data.title_en, data.content, data.content_en, data.taggings, data.directorat, data.is_published, data.tanggal_opini, data.users_id, data.users_name, data.kdeks, data.images, id]
      );
      return result.rows[0];
    } else {
      const result = await db.query(
        "UPDATE opini SET title=$1, title_en=$2, content=$3, content_en=$4, tagging=$5, directorat=$6, is_publish=$7, date_created=$8, users_id=$9, users_name=$10, id_province=$11 WHERE id=$12 RETURNING *",
        [data.title, data.title_en, data.content, data.content_en, data.taggings, data.directorat, data.is_published, data.tanggal_opini, data.users_id, data.users_name, data.kdeks, id]
      );
      return result.rows[0];
    }
  },
  async deleteOpini(id) {
    return (await db.query("DELETE FROM opini WHERE id=$1 RETURNING id", [id])).rows[0] ?? null;
  },

  // Foto (dari news)
  async listPhotos(roleId) {
    if (roleId == '6') {
      return (await db.query("SELECT * FROM photo WHERE web_identity = 'kdeks' ORDER BY id DESC")).rows;
    } else {
      return (await db.query("SELECT * FROM photo WHERE web_identity = 'kneks' ORDER BY id DESC")).rows;
    }
  },
  async getPhoto(id) {
    return (await db.query("SELECT * FROM photo WHERE id=$1", [id])).rows[0] ?? null;
  },
  async createPhoto(data) {
    const result = await db.query(
      "INSERT INTO photo (title, title_en, content, content_en, file, date_created, tagging, directorat, id_province, is_publish, users_id, users_name) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING *",
      [data.title, data.title_en, data.content, data.content_en, data.file, data.tanggal_photo, data.taggings, data.directorat, data.kdeks, data.is_published, data.users_id, data.users_name]
    );
    return result.rows[0];
  },
  async updatePhoto(id, data) {
    if (data.file) {
      const result = await db.query(
        "UPDATE photo SET title=$1, title_en=$2, content=$3, content_en=$4, file=$5, date_created=$6, tagging=$7, directorat=$8, id_province=$9, is_publish=$10, users_id=$11, users_name=$12 WHERE id=$13 RETURNING *",
        [data.title, data.title_en, data.content, data.content_en, data.file, data.tanggal_photo, data.taggings, data.directorat, data.kdeks, data.is_published, data.users_id, data.users_name, id]
      );
      return result.rows[0];
    } else {
      const result = await db.query(
        "UPDATE photo SET title=$1, title_en=$2, content=$3, content_en=$4, date_created=$5, tagging=$6, directorat=$7, id_province=$8, is_publish=$9, users_id=$10, users_name=$11 WHERE id=$12 RETURNING *",
        [data.title, data.title_en, data.content, data.content_en, data.tanggal_photo, data.taggings, data.directorat, data.kdeks, data.is_published, data.users_id, data.users_name, id]
      );
      return result.rows[0];
    }
  },
  async deletePhoto(id) {
    return (await db.query("DELETE FROM photo WHERE id=$1 RETURNING id", [id])).rows[0] ?? null;
  },

  // Video (dari news)
  async listVideos(roleId) {
    if (roleId == '6') {
      return (await db.query("SELECT * FROM video WHERE web_identity = 'kdeks' ORDER BY id DESC")).rows;
    } else {
      return (await db.query("SELECT * FROM video WHERE web_identity = 'kneks' ORDER BY id DESC")).rows;
    }
  },
  async getVideo(id) {
    return (await db.query("SELECT * FROM video WHERE id=$1", [id])).rows[0] ?? null;
  },
  async createVideo(data) {
    const result = await db.query(
      "INSERT INTO video (title, title_en, content, content_en, file, duration, date_created, tagging, directorat, id_province, is_publish, users_id, users_name) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) RETURNING *",
      [data.title, data.title_en, data.content, data.content_en, data.video, data.duration, data.tanggal_video, data.taggings, data.directorat, data.kdeks, data.is_published, data.users_id, data.users_name]
    );
    return result.rows[0];
  },
  async updateVideo(id, data) {
    const result = await db.query(
      "UPDATE video SET title=$1, title_en=$2, content=$3, content_en=$4, file=$5, duration=$6, date_created=$7, tagging=$8, directorat=$9, id_province=$10, is_publish=$11, users_id=$12, users_name=$13 WHERE id=$14 RETURNING *",
      [data.title, data.title_en, data.content, data.content_en, data.video, data.duration, data.tanggal_video, data.taggings, data.directorat, data.kdeks, data.is_published, data.users_id, data.users_name, id]
    );
    return result.rows[0];
  },
  async deleteVideo(id) {
    return (await db.query("DELETE FROM video WHERE id=$1 RETURNING id", [id])).rows[0] ?? null;
  }
};
