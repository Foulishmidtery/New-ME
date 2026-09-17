import { db } from "@/lib/db";

export const webProfileRepository = {
  async legacyList() {
    return (await db.query("SELECT * FROM web_profile where id = 1")).rows;
  },

  async legacyDetail(id) {
    return (await db.query("SELECT * FROM web_profile where id = $1", [id])).rows;
  },

  async legacyUpdateTitle(data) {
    return db.query(
      "UPDATE web_profile SET web_title=$1 where id = $2",
      [data.web_title, data.id],
    );
  },

  async legacyUpdateLogo(data) {
    return db.query(
      "UPDATE web_profile SET web_logo=$1 where id = $2",
      [data.web_logo, data.id],
    );
  },

  async legacyUpdateHeader(data) {
    return db.query(
      "UPDATE web_profile SET web_header=$1 where id = $2",
      [data.web_header, data.id],
    );
  },

  async legacyUpdateColor(data) {
    return db.query(
      "UPDATE web_profile SET web_color=$1 where id = $2",
      [data.web_color, data.id],
    );
  },
};
