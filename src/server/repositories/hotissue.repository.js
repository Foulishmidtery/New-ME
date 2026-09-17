import { db } from "@/lib/db";

export const hotissueRepository = {
  // Categories
  async listCategories() {
    return (await db.query("SELECT * FROM hot_categories")).rows;
  },
  async getCategory(id) {
    return (await db.query("SELECT * FROM hot_categories WHERE id = $1", [id])).rows[0] ?? null;
  },
  async createCategory(data) {
    const result = await db.query(
      "INSERT INTO hot_categories(title, title_en) VALUES($1, $2) RETURNING *",
      [data.title, data.title_en]
    );
    return result.rows[0];
  },
  async updateCategory(id, data) {
    const result = await db.query(
      "UPDATE hot_categories SET title=$1, title_en=$2 WHERE id = $3 RETURNING *",
      [data.title, data.title_en, id]
    );
    return result.rows[0] ?? null;
  },
  async removeCategory(id) {
    return (await db.query("DELETE FROM hot_categories WHERE id=$1 RETURNING id", [id])).rows[0] ?? null;
  },

  // Sub Categories
  async listSubcategories() {
    return (await db.query("SELECT * FROM hot_subcategories")).rows;
  },
  async getSubcategory(id) {
    return (await db.query("SELECT * FROM hot_subcategories WHERE id = $1", [id])).rows[0] ?? null;
  },
  async createSubcategory(data) {
    const hcid = data.hot_category_id.split('-');
    const result = await db.query(
      "INSERT INTO hot_subcategories(title, title_en, hot_category_id, hot_category_name) VALUES($1, $2, $3, $4) RETURNING *",
      [data.title, data.title_en, hcid[0], hcid[1]]
    );
    return result.rows[0];
  },
  async updateSubcategory(id, data) {
    const hcid = data.hot_category_id.split('-');
    const result = await db.query(
      "UPDATE hot_subcategories SET title=$1, title_en=$2, hot_category_id=$3, hot_category_name=$4 WHERE id = $5 RETURNING *",
      [data.title, data.title_en, hcid[0], hcid[1], id]
    );
    return result.rows[0] ?? null;
  },
  async removeSubcategory(id) {
    return (await db.query("DELETE FROM hot_subcategories WHERE id=$1 RETURNING id", [id])).rows[0] ?? null;
  },

  // Hot Issues
  async listIssues() {
    return (await db.query("SELECT * FROM hot_issues")).rows;
  },
  async getIssue(id) {
    return (await db.query("SELECT * FROM hot_issues WHERE id=$1", [id])).rows[0] ?? null;
  },
  async createIssue(data) {
    const rrr = data.sub_category_id.split('-');
    const result = await db.query(
      "INSERT INTO hot_issues(title, title_en, excerpt, excerpt_en, content, content_en, image, is_publish, hot_issue_datetime, hot_subcategory_id, tag, directorat, id_province, hot_subcategory_name) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *",
      [data.title, data.title_en, data.excerpt, data.excerpt_en, data.content, data.content_en, data.image, data.is_publish, data.issue_datetime, rrr[0], data.taggings, data.directorat, data.kdeks, rrr[1]]
    );
    return result.rows[0];
  },
  async updateIssue(id, data) {
    const rrr = data.sub_category_id.split('-');
    if (!data.image) {
      const result = await db.query(
        "UPDATE hot_issues SET title=$1, title_en=$2, excerpt=$3, excerpt_en=$4, content=$5, content_en=$6, is_publish=$7, hot_issue_datetime=$8, hot_subcategory_id=$9, tag=$10, directorat=$11, id_province=$12, hot_subcategory_name=$13 WHERE id = $14 RETURNING *",
        [data.title, data.title_en, data.excerpt, data.excerpt_en, data.content, data.content_en, data.is_publish, data.issue_datetime, rrr[0], data.taggings, data.directorat, data.kdeks, rrr[1], id]
      );
      return result.rows[0] ?? null;
    } else {
      const result = await db.query(
        "UPDATE hot_issues SET title=$1, title_en=$2, excerpt=$3, excerpt_en=$4, content=$5, content_en=$6, image=$7, is_publish=$8, hot_issue_datetime=$9, hot_subcategory_id=$10, tag=$11, directorat=$12, id_province=$13, hot_subcategory_name=$14 WHERE id = $15 RETURNING *",
        [data.title, data.title_en, data.excerpt, data.excerpt_en, data.content, data.content_en, data.image, data.is_publish, data.issue_datetime, rrr[0], data.taggings, data.directorat, data.kdeks, rrr[1], id]
      );
      return result.rows[0] ?? null;
    }
  },
  async removeIssue(id) {
    return (await db.query("DELETE FROM hot_issues WHERE id=$1 RETURNING id", [id])).rows[0] ?? null;
  }
};
