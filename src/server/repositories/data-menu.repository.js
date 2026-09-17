import { db } from "@/lib/db";

const columns = `id, title, title_en, long_title, long_title_en, link_menu_data, data_sort, narations_menu, narations_menu_en`;
const valuesFrom = (data) => [data.title, data.title_en, data.long_title, data.long_title_en, data.link_menu_data, Number(data.data_sort), data.narations_menu || "", data.narations_menu_en || ""];
const legacyValuesFrom = (data) => [data?.title, data?.title_en, data?.long_title, data?.long_title_en, data?.link_menu_data, data?.data_sort, data?.narations_menu, data?.narations_menu_en];

export const dataMenuRepository = {
  async list() { return (await db.query(`SELECT ${columns} FROM data_menu ORDER BY data_sort ASC, id ASC`)).rows; },
  async findById(id) { return (await db.query(`SELECT ${columns} FROM data_menu WHERE id = $1`, [id])).rows[0] ?? null; },
  async create(data) {
    return (await db.query(`INSERT INTO data_menu (title,title_en,long_title,long_title_en,link_menu_data,data_sort,narations_menu,narations_menu_en) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING ${columns}`, valuesFrom(data))).rows[0];
  },
  async update(id, data) {
    return (await db.query(`UPDATE data_menu SET title=$1,title_en=$2,long_title=$3,long_title_en=$4,link_menu_data=$5,data_sort=$6,narations_menu=$7,narations_menu_en=$8 WHERE id=$9 RETURNING ${columns}`, [...valuesFrom(data), id])).rows[0] ?? null;
  },
  async remove(id) { return (await db.query("DELETE FROM data_menu WHERE id = $1 RETURNING id", [id])).rows[0] ?? null; },

  // Compatibility methods intentionally preserve the observable SQL semantics of Old-BE.
  // Do not add ordering, coercion, defaults, RETURNING clauses, or validation here.
  async legacyList() {
    return (await db.query("SELECT * FROM data_menu")).rows;
  },
  async legacyFindById(id) {
    return (await db.query("SELECT * FROM data_menu where id = $1", [id])).rows;
  },
  async legacyCreate(data) {
    await db.query(
      "insert into data_menu(title,title_en,long_title,long_title_en,link_menu_data,data_sort,narations_menu,narations_menu_en) values($1,$2,$3,$4,$5,$6,$7,$8)",
      legacyValuesFrom(data),
    );
  },
  async legacyUpdate(data) {
    await db.query(
      "UPDATE data_menu set title = $1, title_en = $2, long_title = $3, long_title_en = $4, link_menu_data = $5, data_sort = $6, narations_menu = $7, narations_menu_en = $8  where id = $9",
      [...legacyValuesFrom(data), data?.id],
    );
  },
  async legacyRemove(id) {
    await db.query("DELETE FROM data_menu where id = $1 ", [id]);
  },
};
