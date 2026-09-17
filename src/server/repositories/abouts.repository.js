import { db } from "@/lib/db";

export const aboutsRepository = {
  async getEsAbouts() {
    return (await db.query("SELECT * FROM abouts WHERE web_identity = 'ekonomi_syariah'")).rows;
  },
  async getKneksAbouts() {
    return (await db.query("SELECT * FROM abouts WHERE web_identity = 'kneks'")).rows;
  },
  async getKdeksAboutsList() {
    return (await db.query("SELECT * FROM abouts WHERE web_identity = 'kdeks'")).rows;
  },
  async getKdeksAbouts() {
    return (await db.query("SELECT * FROM abouts WHERE web_identity = 'kdeks' AND tag = 'about'")).rows;
  },
  async getKdeksHistory() {
    return (await db.query("SELECT * FROM abouts WHERE web_identity = 'kdeks' AND tag = 'history'")).rows;
  },
  async getKdeksProvinceProfile(idProvince) {
    return (
      await db.query(
        "SELECT * FROM kdeks where id_province = $1 AND web_identity = 'kdeks'",
        [idProvince],
      )
    ).rows[0] ?? null;
  },
  async getAboutById(id) {
    return (await db.query("SELECT * FROM abouts WHERE id = $1", [id])).rows;
  },
  async updateAbout(id, data) {
    const fields = [
      data.about, data.about_en, data.history, data.history_en,
      data.about_content, data.about_content_en, data.history_content, data.history_content_en,
      data.legal_foundation, data.legal_foundation_en, data.legal_foundation_content, data.legal_foundation_content_en,
      data.logo_philosophy, data.logo_philosophy_en, data.logo_philosophy_content, data.logo_philosophy_content_en,
      data.kneks_task, data.kneks_task_en, data.kneks_task_content, data.kneks_task_content_en,
      data.function, data.function_en, data.function_content, data.function_content_en
    ];
    
    if (data.images) {
      const q = "UPDATE abouts SET about=$1, about_en=$2, history=$3, history_en=$4, about_content=$5, about_content_en=$6, history_content=$7, history_content_en=$8, legal_foundation=$9, legal_foundation_en=$10, legal_foundation_content=$11, legal_foundation_content_en=$12, logo_philosophy=$13, logo_philosophy_en=$14, logo_philosophy_content=$15, logo_philosophy_content_en=$16, kneks_task=$17, kneks_task_en=$18, kneks_task_content=$19, kneks_task_content_en=$20, function=$21, function_en=$22, function_content=$23, function_content_en=$24, images=$25 WHERE id=$26 RETURNING *";
      return (await db.query(q, [...fields, data.images, id])).rows[0];
    } else {
      const q = "UPDATE abouts SET about=$1, about_en=$2, history=$3, history_en=$4, about_content=$5, about_content_en=$6, history_content=$7, history_content_en=$8, legal_foundation=$9, legal_foundation_en=$10, legal_foundation_content=$11, legal_foundation_content_en=$12, logo_philosophy=$13, logo_philosophy_en=$14, logo_philosophy_content=$15, logo_philosophy_content_en=$16, kneks_task=$17, kneks_task_en=$18, kneks_task_content=$19, kneks_task_content_en=$20, function=$21, function_en=$22, function_content=$23, function_content_en=$24 WHERE id=$25 RETURNING *";
      return (await db.query(q, [...fields, id])).rows[0];
    }
  },
  async deleteAbout(id) {
    return (await db.query("DELETE FROM abouts WHERE id = $1 RETURNING id", [id])).rows[0];
  },
  async deleteKdeksAbouts() {
    return (await db.query("DELETE FROM abouts WHERE web_identity = 'kdeks'")).rowCount;
  },
  async getMapsKdeks() {
    const q = `
        SELECT 
            k.id AS id_kdeks, 
            k.id_province, 
            p.province_name, 
            p.code AS bps_code, 
            k.images,
            CASE 
                WHEN k.images IS NOT NULL AND k.images != '' THEN true 
                ELSE false 
            END AS has_image
        FROM 
            kdeks k
        JOIN 
            province p ON k.id_province = p.id
    `;
    return (await db.query(q)).rows;
  }
};
