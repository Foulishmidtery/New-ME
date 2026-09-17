import { db } from "@/lib/db";

export const zonaKhasRepository = {
  async listProvincesDesc() {
    return (await db.query("SELECT * FROM province ORDER BY id DESC ")).rows;
  },

  async listByProvince(provinceId) {
    return (await db.query("SELECT * FROM khas_zone WHERE province = $1", [provinceId])).rows;
  },

  async listAll() {
    return (await db.query("SELECT * FROM khas_zone")).rows;
  },

  async findRows(id) {
    return (await db.query("SELECT * FROM khas_zone where id = $1", [id])).rows;
  },

  async create(data) {
    await db.query(
      "insert into khas_zone(khas_zone,city,province,inauguration,tenant,inaugurated,status) values($1,$2,$3,$4,$5,$6,$7)",
      [
        data.khas_zone,
        data.city,
        data.province,
        data.inauguration,
        data.tenant,
        data.inaugurated,
        data.status,
      ],
    );
  },

  async update(data) {
    await db.query(
      "update khas_zone set khas_zone=$1, city=$2, province=$3, inauguration=$4, tenant=$5, inaugurated=$6, status=$7 where id = $8",
      [
        data.khas_zone,
        data.city,
        data.province,
        data.inauguration,
        data.tenant,
        data.inaugurated,
        data.status,
        data.id,
      ],
    );
  },

  async remove(id) {
    await db.query("delete from khas_zone where id = $1", [id]);
  },
};
