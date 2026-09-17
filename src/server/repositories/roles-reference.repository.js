import { db } from "@/lib/db";

export const rolesReferenceRepository = {
  async list() {
    return (await db.query("SELECT * FROM roles")).rows;
  },
};
