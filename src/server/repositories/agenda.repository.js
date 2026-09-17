import { db } from "@/lib/db";

const fields = [
  "title", "title_en", "url", "agenda_datetime", "place", "organizer", "link", "project",
  "description", "agenda_endtime", "manager", "contributor", "indicator", "impact", "opening",
  "participants", "area", "loc", "priority_participants", "kbli", "age", "gender", "province",
];

function values(data) {
  return fields.map((field) => field === "agenda_datetime" ? String(data[field] || "").replace("T", " ") : data[field] ?? null);
}

function legacyValues(data, { normalizeAgendaDatetime = false } = {}) {
  return fields.map((field) => {
    if (field === "agenda_datetime" && normalizeAgendaDatetime) return data[field].replace("T", " ");
    return data?.[field];
  });
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

  async legacyList() {
    return (await db.query("SELECT * FROM agendas order by agenda_datetime desc")).rows;
  },
  async legacyGetRows(id) {
    return (await db.query("SELECT * FROM agendas where id = $1 ", [id])).rows;
  },
  async legacySearch(keyword) {
    const search = `%${String(keyword || "").slice(0, 200)}%`;
    return (await db.query("SELECT * FROM agendas where organizer LIKE $1", [search])).rows;
  },
  async legacyCreate(data, timestamp) {
    await db.query(
      `insert into agendas(${fields.join(",")}, created_at, updated_at) values(${fields.map((_, index) => `$${index + 1}`).join(",")},$24,$25)`,
      [...legacyValues(data, { normalizeAgendaDatetime: true }), timestamp, timestamp],
    );
  },
  async legacyUpdate(data, timestamp) {
    const set = fields.map((field, index) => `${field}=$${index + 1}`).join(", ");
    await db.query(
      `update agendas set ${set}, created_at=$24, updated_at=$25 where id = $26`,
      [...legacyValues(data), timestamp, timestamp, data?.id],
    );
  },
  async legacyRemove(id) {
    await db.query("DELETE FROM agendas where id = $1 ", [id]);
  },
  async legacyGraph() {
    const events = (await db.query("SELECT * FROM db_event ORDER BY id DESC ")).rows;
    return Promise.all(events.map(async (item) => {
      const search = `%${item?.name}%`;
      const wilayah = (await db.query("SELECT count(province) as wilayah FROM agendas WHERE organizer LIKE $1", [search])).rows[0];
      const participants = (await db.query("SELECT count(participants) as participants FROM agendas WHERE organizer LIKE $1", [search])).rows[0];
      const kegiatan = (await db.query("SELECT count(organizer) as kegiatan FROM agendas WHERE organizer LIKE $1", [search])).rows[0];
      return {
        key: item?.name,
        data: {
          totalKegiatan: wilayah?.wilayah,
          totalPeserta: participants?.participants,
          totalWilayah: kegiatan?.kegiatan,
        },
      };
    }));
  },
};
