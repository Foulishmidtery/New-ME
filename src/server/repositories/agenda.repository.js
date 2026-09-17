import { db } from "@/lib/db";

const fields = [
  "title", "title_en", "url", "agenda_datetime", "place", "organizer", "link", "project",
  "description", "agenda_endtime", "manager", "contributor", "indicator", "impact", "opening",
  "participants", "area", "loc", "priority_participants", "kbli", "age", "gender", "province",
];

function values(data) {
  return fields.map((field) => field === "agenda_datetime" ? String(data[field] || "").replace("T", " ") : data[field] ?? null);
}

export const agendaRepository = {
  async list() { return (await db.query("SELECT * FROM agendas ORDER BY agenda_datetime DESC")).rows; },
  async get(id) { return (await db.query("SELECT * FROM agendas WHERE id = $1", [id])).rows[0] ?? null; },
  async search(keyword) {
    return (await db.query("SELECT * FROM agendas WHERE organizer ILIKE $1", [`%${keyword || ""}%`])).rows;
  },
  async create(data) {
    const now = new Date();
    const result = await db.query(
      `INSERT INTO agendas (${fields.join(", ")}, created_at, updated_at)
       VALUES (${fields.map((_, index) => `$${index + 1}`).join(", ")}, $24, $25) RETURNING *`,
      [...values(data), now, now],
    );
    return result.rows[0];
  },
  async update(id, data) {
    const now = new Date();
    const set = fields.map((field, index) => `${field} = $${index + 1}`).join(", ");
    const result = await db.query(
      `UPDATE agendas SET ${set}, updated_at = $24 WHERE id = $25 RETURNING *`,
      [...values(data), now, id],
    );
    return result.rows[0] ?? null;
  },
  async remove(id) { return (await db.query("DELETE FROM agendas WHERE id = $1 RETURNING id", [id])).rows[0] ?? null; },
};
