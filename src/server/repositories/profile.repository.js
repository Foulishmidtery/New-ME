import { db } from "@/lib/db";

export const profileRepository = {
  // Institutions
  async listInstitutions() {
    return (await db.query("SELECT * FROM institutions ORDER BY id ASC")).rows;
  },
  async getInstitution(id) {
    return (await db.query("SELECT * FROM institutions WHERE id=$1", [id])).rows[0] ?? null;
  },
  async createInstitution(data) {
    const result = await db.query(
      "INSERT INTO institutions(tag, name, logo, link) VALUES($1, $2, $3, $4) RETURNING *",
      [data.tag, data.name, data.logo, data.link]
    );
    return result.rows[0];
  },
  async updateInstitution(id, data) {
    if (data.logo) {
      const result = await db.query(
        "UPDATE institutions SET tag=$1, name=$2, logo=$3, link=$4 WHERE id=$5 RETURNING *",
        [data.tag, data.name, data.logo, data.link, id]
      );
      return result.rows[0];
    } else {
      const result = await db.query(
        "UPDATE institutions SET tag=$1, name=$2, link=$3 WHERE id=$4 RETURNING *",
        [data.tag, data.name, data.link, id]
      );
      return result.rows[0];
    }
  },
  async deleteInstitution(id) {
    return (await db.query("DELETE FROM institutions WHERE id=$1 RETURNING id", [id])).rows[0] ?? null;
  },

  // Social Media
  async listSocialMedias() {
    return (await db.query("SELECT * FROM social_medias")).rows;
  },
  async getSocialMedia(id) {
    return (await db.query("SELECT * FROM social_medias WHERE id=$1", [id])).rows[0] ?? null;
  },
  async updateSocialMedia(id, data) {
    const result = await db.query(
      "UPDATE social_medias SET name=$1, logo=$2, link=$3 WHERE id=$4 RETURNING *",
      [data.name, data.logo, data.link, id]
    );
    return result.rows[0];
  },
  async deleteSocialMedia(id) {
    return (await db.query("DELETE FROM social_medias WHERE id=$1 RETURNING id", [id])).rows[0] ?? null;
  },

  // Post Social Media
  async listPostSocialMedias() {
    return (await db.query("SELECT * FROM post_social_medias ORDER BY id DESC")).rows;
  },
  async listPostSocialMediasFe() {
    return (await db.query("SELECT * FROM post_social_medias WHERE id_sosmed=$1 AND flag=$2 ORDER BY id ASC", ['1', 'kneks'])).rows;
  },
  async getPostSocialMedia(id) {
    return (await db.query("SELECT * FROM post_social_medias WHERE id=$1", [id])).rows[0] ?? null;
  },
  async createPostSocialMedia(data) {
    const result = await db.query(
      "INSERT INTO post_social_medias(link_post, id_sosmed) VALUES($1, $2) RETURNING *",
      [data.link_post, data.id_sosmed]
    );
    return result.rows[0];
  },
  async updatePostSocialMedia(id, data) {
    const result = await db.query(
      "UPDATE post_social_medias SET link_post=$1, id_sosmed=$2 WHERE id=$3 RETURNING *",
      [data.link_post, data.id_sosmed, id]
    );
    return result.rows[0];
  },
  async deletePostSocialMedia(id) {
    return (await db.query("DELETE FROM post_social_medias WHERE id=$1 RETURNING id", [id])).rows[0] ?? null;
  },

  // Scopes
  async listScopes() {
    return (await db.query("SELECT * FROM scopes")).rows;
  },
  async getScope(id) {
    return (await db.query("SELECT * FROM scopes WHERE id=$1", [id])).rows[0] ?? null;
  },
  async updateScope(id, data) {
    if (data.images) {
      const result = await db.query(
        "UPDATE scopes SET title=$1, icon=$2, title_en=$3, description=$4, description_en=$5, image=$6 WHERE id=$7 RETURNING *",
        [data.title, data.images, data.title_en, data.description, data.description_en, data.images, id]
      );
      return result.rows[0];
    } else {
      const result = await db.query(
        "UPDATE scopes SET title=$1, title_en=$2, description=$3, description_en=$4 WHERE id=$5 RETURNING *",
        [data.title, data.title_en, data.description, data.description_en, id]
      );
      return result.rows[0];
    }
  },
  async legacyUpdateScope(data) {
    await db.query(
      "UPDATE scopes set title=$1, icon=$2, title_en=$3, description=$4, description_en=$5, image=$6 where id = $7",
      [data?.title, data?.images, data?.title_en, data?.description, data?.description_en, data?.images, data?.id],
    );
  },
  async deleteScope(id) {
    return (await db.query("DELETE FROM scopes WHERE id=$1 RETURNING id", [id])).rows[0] ?? null;
  },

  // Maps
  async listMaps() {
    return (await db.query("SELECT * FROM map")).rows;
  },
  async updateMap(id, data) {
    const result = await db.query(
      "UPDATE map SET embed=$1 WHERE id=$2 RETURNING *",
      [data.embed, id]
    );
    return result.rows[0];
  },

  // Contacts
  async listContacts() {
    return (await db.query("SELECT * FROM contacts")).rows;
  },
  async updateContact(id, data) {
    const result = await db.query(
      "UPDATE contacts SET address_building=$1, address=$2, phone_number=$3, fax_number=$4, email=$5 WHERE id=$6 RETURNING *",
      [data.address_building, data.address, data.phone_number, data.fax_number, data.email, id]
    );
    return result.rows[0];
  },

  // Questbook
  async createQuestbook(data) {
    const result = await db.query(
      "INSERT INTO questbook(name, email, phone_number, subjek, pesan) VALUES($1, $2, $3, $4, $5) RETURNING *",
      [data.name, data.email, data.phone_number, data.subjek, data.pesan]
    );
    return result.rows[0];
  }
};
