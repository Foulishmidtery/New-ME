import { db } from "@/lib/db";

export const webProfileRepository = {
  async legacyList() {
    return (await db.query("SELECT * FROM web_profile where id = 1")).rows;
  },

  async legacyDetail(id) {
    return (await db.query("SELECT * FROM web_profile where id = $1", [id])).rows;
  },
};
