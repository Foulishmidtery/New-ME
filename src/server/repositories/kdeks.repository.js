import { db } from "@/lib/db";

export const kdeksRepository = {
  // KDEKS
  async listAll() {
    return (await db.query("SELECT * FROM kdeks")).rows;
  },
  async listByProvince(idProvince) {
    return (await db.query("SELECT * FROM kdeks WHERE id_province = $1", [idProvince])).rows;
  },
  async get(id) {
    return (await db.query("SELECT * FROM kdeks WHERE id = $1", [id])).rows[0] ?? null;
  },
  async create(data) {
    const result = await db.query(`
      INSERT INTO kdeks (
        title, images, id_province, province_name, structure, sk, 
        twitter, facebook, linkedin, instagram, youtube, 
        address, phone_number, fax, email, historys, abouts, maps, officials
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19) RETURNING *
    `, [
      data.title, data.images, data.id_province, data.province_name, data.structure, data.sk,
      data.twitter, data.facebook, data.linkedin, data.instagram, data.youtube,
      data.address, data.phone_number, data.fax, data.email, data.historys, data.abouts, data.maps, data.officials
    ]);
    return result.rows[0];
  },
  async update(id, data) {
    const result = await db.query(`
      UPDATE kdeks SET 
        title=$1, images=$2, id_province=$3, province_name=$4, structure=$5, sk=$6, 
        twitter=$7, facebook=$8, linkedin=$9, instagram=$10, youtube=$11, 
        address=$12, phone_number=$13, fax=$14, email=$15, maps=$16, 
        abouts=$17, historys=$18, officials=$19 
      WHERE id=$20 RETURNING *
    `, [
      data.title, data.images, data.id_province, data.province_name, data.structure, data.sk,
      data.twitter, data.facebook, data.linkedin, data.instagram, data.youtube,
      data.address, data.phone_number, data.fax, data.email, data.maps,
      data.abouts, data.historys, data.officials, id
    ]);
    return result.rows[0];
  },
  async remove(id) {
    return (await db.query("DELETE FROM kdeks WHERE id=$1 RETURNING id", [id])).rows[0] ?? null;
  },

  // Pejabat KDEKS
  async listPejabat() {
    return (await db.query("SELECT * FROM pejabat_kdeks ORDER BY id ASC")).rows;
  },
  async listPejabatByProvince(idProvince) {
    return (await db.query("SELECT * FROM pejabat_kdeks WHERE id_province = $1 ORDER BY id ASC", [idProvince])).rows;
  },
  async getPejabat(id) {
    return (await db.query("SELECT * FROM pejabat_kdeks WHERE id=$1", [id])).rows[0] ?? null;
  },
  async createPejabat(data) {
    const result = await db.query(`
      INSERT INTO pejabat_kdeks(name, position, position_en, photo, description, description_en, is_publish, organization, directorat, head, id_province, name_province) 
      VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING *
    `, [data.name, data.position, data.position_en, data.photo, data.description, data.description_en, data.is_published, data.organization ?? "", data.directorat ?? "", data.head ?? "", data.id_province, data.name_province]);
    return result.rows[0];
  },
  async updatePejabat(id, data) {
    const result = await db.query(`
      UPDATE pejabat_kdeks SET name=$1, position=$2, position_en=$3, photo=$4, description=$5, description_en=$6, is_publish=$7, organization=$8, directorat=$9, head=$10, x=$11, facebook=$12, linkedin=$13, instagram=$14, id_province=$15, name_province=$16 WHERE id=$17 RETURNING *
    `, [data.name, data.position, data.position_en, data.photo, data.description, data.description_en, data.is_published, data.organization ?? "", data.directorat ?? "", data.head ?? "", data.x ?? "-", data.facebook ?? "-", data.linkedin ?? "-", data.instagram ?? "-", data.id_province ?? "0", data.name_province ?? "0", id]);
    return result.rows[0];
  },
  async removePejabat(id) {
    return (await db.query("DELETE FROM pejabat_kdeks WHERE id=$1 RETURNING id", [id])).rows[0] ?? null;
  },

  // Anggota KDEKS
  async listAnggota() {
    return (await db.query("SELECT * FROM anggota_kdeks ORDER BY id ASC")).rows;
  },
  async getAnggota(id) {
    return (await db.query("SELECT * FROM anggota_kdeks WHERE id=$1", [id])).rows[0] ?? null;
  },
  async createAnggota(data) {
    const result = await db.query(`
      INSERT INTO anggota_kdeks(name, position, position_en, photo, description, description_en, is_publish, organization, directorat, head, id_pejabat) 
      VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *
    `, [data.name, data.position, data.position_en, data.photo, data.description, data.description_en, data.is_published, data.organization ?? "", data.directorat ?? "", data.head ?? "", data.id_pejabat]);
    return result.rows[0];
  },
  async updateAnggota(id, data) {
    const result = await db.query(`
      UPDATE anggota_kdeks SET name=$1, position=$2, position_en=$3, photo=$4, description=$5, description_en=$6, is_publish=$7, organization=$8, directorat=$9, head=$10, id_pejabat=$11, x=$12, facebook=$13, linkedin=$14, instagram=$15 WHERE id=$16 RETURNING *
    `, [data.name, data.position, data.position_en, data.photo, data.description, data.description_en, data.is_published, data.organization ?? "", data.directorat ?? "", data.head ?? "", data.id_pejabat, data.x ?? "-", data.facebook ?? "-", data.linkedin ?? "-", data.instagram ?? "-", id]);
    return result.rows[0];
  },
  async removeAnggota(id) {
    return (await db.query("DELETE FROM anggota_kdeks WHERE id=$1 RETURNING id", [id])).rows[0] ?? null;
  },

  // Sub Anggota KDEKS
  async listSubAnggota() {
    return (await db.query("SELECT * FROM sub_anggota_kdeks ORDER BY id ASC")).rows;
  },
  async getSubAnggota(id) {
    return (await db.query("SELECT * FROM sub_anggota_kdeks WHERE id=$1", [id])).rows[0] ?? null;
  },
  async createSubAnggota(data) {
    const result = await db.query(`
      INSERT INTO sub_anggota_kdeks(name, position, position_en, photo, description, description_en, is_publish, organization, directorat, head, id_anggota) 
      VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *
    `, [data.name, data.position, data.position_en, data.photo, data.description, data.description_en, data.is_published, data.organization ?? "", data.directorat ?? "", data.head ?? "", data.id_anggota]);
    return result.rows[0];
  },
  async updateSubAnggota(id, data) {
    const result = await db.query(`
      UPDATE sub_anggota_kdeks SET name=$1, position=$2, position_en=$3, photo=$4, description=$5, description_en=$6, is_publish=$7, organization=$8, directorat=$9, head=$10, id_anggota=$11, x=$12, facebook=$13, linkedin=$14, instagram=$15 WHERE id=$16 RETURNING *
    `, [data.name, data.position, data.position_en, data.photo, data.description, data.description_en, data.is_published, data.organization ?? "", data.directorat ?? "", data.head ?? "", data.id_anggota, data.x ?? "-", data.facebook ?? "-", data.linkedin ?? "-", data.instagram ?? "-", id]);
    return result.rows[0];
  },
  async removeSubAnggota(id) {
    return (await db.query("DELETE FROM sub_anggota_kdeks WHERE id=$1 RETURNING id", [id])).rows[0] ?? null;
  }
};
