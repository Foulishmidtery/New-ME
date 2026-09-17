import { db } from "@/lib/db";

export const structureRepository = {
  // Pejabat
  async listPejabat() {
    return (await db.query("SELECT * FROM pejabat ORDER BY id ASC")).rows;
  },
  async getPejabat(id) {
    return (await db.query("SELECT * FROM pejabat WHERE id=$1", [id])).rows[0] ?? null;
  },
  async createPejabat(data) {
    const result = await db.query(
      "INSERT INTO pejabat(name,position,position_en,photo,description,description_en,is_publish, organization, directorat, head) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *",
      [data.name, data.position, data.position_en, data.photo, data.description, data.description_en, data.is_published, data.organization ?? "", data.directorat ?? "", data.head ?? ""]
    );
    return result.rows[0];
  },
  async updatePejabat(id, data) {
    if (data.photo) {
      const result = await db.query(
        "UPDATE pejabat SET name=$1,position=$2,position_en=$3,photo=$4,description=$5,description_en=$6,is_publish=$7,organization=$8,directorat=$9,head=$10,x=$11,facebook=$12,linkedin=$13,instagram=$14 WHERE id=$15 RETURNING *",
        [data.name, data.position, data.position_en, data.photo, data.description, data.description_en, data.is_published, data.organization ?? "", data.directorat ?? "", data.head ?? "", data.x ?? "-", data.facebook ?? "-", data.linkedin ?? "-", data.instagram ?? "-", id]
      );
      return result.rows[0];
    } else {
      const result = await db.query(
        "UPDATE pejabat SET name=$1,position=$2,position_en=$3,description=$4,description_en=$5,is_publish=$6,organization=$7,directorat=$8,head=$9,x=$10,facebook=$11,linkedin=$12,instagram=$13 WHERE id=$14 RETURNING *",
        [data.name, data.position, data.position_en, data.description, data.description_en, data.is_published, data.organization ?? "", data.directorat ?? "", data.head ?? "", data.x ?? "-", data.facebook ?? "-", data.linkedin ?? "-", data.instagram ?? "-", id]
      );
      return result.rows[0];
    }
  },
  async deletePejabat(id) {
    return (await db.query("DELETE FROM pejabat WHERE id=$1 RETURNING id", [id])).rows[0] ?? null;
  },

  // Anggota
  async listAnggota() {
    return (await db.query("SELECT * FROM anggota ORDER BY id ASC")).rows;
  },
  async getAnggota(id) {
    return (await db.query("SELECT * FROM anggota WHERE id=$1", [id])).rows[0] ?? null;
  },
  async createAnggota(data) {
    const result = await db.query(
      "INSERT INTO anggota(name,position,position_en,photo,description,description_en,is_publish, organization, directorat, head, id_pejabat) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *",
      [data.name, data.position, data.position_en, data.photo, data.description, data.description_en, data.is_published, data.organization ?? "", data.directorat ?? "", data.head ?? "", data.id_pejabat]
    );
    return result.rows[0];
  },
  async updateAnggota(id, data) {
    if (data.photo) {
      const result = await db.query(
        "UPDATE anggota SET name=$1,position=$2,position_en=$3,photo=$4,description=$5,description_en=$6,is_publish=$7,organization=$8,directorat=$9,head=$10,id_pejabat=$11,x=$12,facebook=$13,linkedin=$14,instagram=$15 WHERE id=$16 RETURNING *",
        [data.name, data.position, data.position_en, data.photo, data.description, data.description_en, data.is_published, data.organization ?? "", data.directorat ?? "", data.head ?? "", data.id_pejabat, data.x ?? "-", data.facebook ?? "-", data.linkedin ?? "-", data.instagram ?? "-", id]
      );
      return result.rows[0];
    } else {
      const result = await db.query(
        "UPDATE anggota SET name=$1,position=$2,position_en=$3,description=$4,description_en=$5,is_publish=$6,organization=$7,directorat=$8,head=$9,id_pejabat=$10,x=$11,facebook=$12,linkedin=$13,instagram=$14 WHERE id=$15 RETURNING *",
        [data.name, data.position, data.position_en, data.description, data.description_en, data.is_published, data.organization ?? "", data.directorat ?? "", data.head ?? "", data.id_pejabat, data.x ?? "-", data.facebook ?? "-", data.linkedin ?? "-", data.instagram ?? "-", id]
      );
      return result.rows[0];
    }
  },
  async deleteAnggota(id) {
    return (await db.query("DELETE FROM anggota WHERE id=$1 RETURNING id", [id])).rows[0] ?? null;
  },

  // Sub Anggota
  async listSubAnggota() {
    return (await db.query("SELECT * FROM sub_anggota ORDER BY id ASC")).rows;
  },
  async getSubAnggota(id) {
    return (await db.query("SELECT * FROM sub_anggota WHERE id=$1", [id])).rows[0] ?? null;
  },
  async createSubAnggota(data) {
    const result = await db.query(
      "INSERT INTO sub_anggota(name,position,position_en,photo,description,description_en,is_publish, organization, directorat, head, id_anggota) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *",
      [data.name, data.position, data.position_en, data.photo, data.description, data.description_en, data.is_published, data.organization ?? "", data.directorat ?? "", data.head ?? "", data.id_anggota]
    );
    return result.rows[0];
  },
  async updateSubAnggota(id, data) {
    if (data.photo) {
      const result = await db.query(
        "UPDATE sub_anggota SET name=$1,position=$2,position_en=$3,photo=$4,description=$5,description_en=$6,is_publish=$7,organization=$8,directorat=$9,head=$10,id_anggota=$11,x=$12,facebook=$13,linkedin=$14,instagram=$15 WHERE id=$16 RETURNING *",
        [data.name, data.position, data.position_en, data.photo, data.description, data.description_en, data.is_published, data.organization ?? "", data.directorat ?? "", data.head ?? "", data.id_anggota, data.x ?? "-", data.facebook ?? "-", data.linkedin ?? "-", data.instagram ?? "-", id]
      );
      return result.rows[0];
    } else {
      const result = await db.query(
        "UPDATE sub_anggota SET name=$1,position=$2,position_en=$3,description=$4,description_en=$5,is_publish=$6,organization=$7,directorat=$8,head=$9,id_anggota=$10,x=$11,facebook=$12,linkedin=$13,instagram=$14 WHERE id=$15 RETURNING *",
        [data.name, data.position, data.position_en, data.description, data.description_en, data.is_published, data.organization ?? "", data.directorat ?? "", data.head ?? "", data.id_anggota, data.x ?? "-", data.facebook ?? "-", data.linkedin ?? "-", data.instagram ?? "-", id]
      );
      return result.rows[0];
    }
  },
  async deleteSubAnggota(id) {
    return (await db.query("DELETE FROM sub_anggota WHERE id=$1 RETURNING id", [id])).rows[0] ?? null;
  },

  async getMultiStructure() {
    const og = (await db.query("SELECT * FROM pejabat WHERE id = 1 OR id = 7 ORDER BY id ASC")).rows;
    const ag = (await db.query("SELECT * FROM anggota ORDER BY id ASC")).rows;
    const sag = (await db.query("SELECT * FROM sub_anggota")).rows;
    return { og, ag, sag };
  }
};
