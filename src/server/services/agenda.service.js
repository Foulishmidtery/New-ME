import { agendaRepository } from "@/server/repositories/agenda.repository";

function assertRequired(data) {
  const required = ["title", "title_en", "agenda_datetime", "organizer"];
  const missing = required.filter((field) => !String(data?.[field] ?? "").trim());
  if (missing.length) {
    const error = new Error(`Field wajib belum lengkap: ${missing.join(", ")}`);
    error.status = 400;
    throw error;
  }
}

function legacyTimestamp(now = new Date()) {
  const month = now.getMonth() + 1;
  const date = `${now.getFullYear()}-${month}-${now.getDate()}`;
  const time = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
  return `${date} ${time}`;
}

export const agendaService = {
  list: () => agendaRepository.list(),
  get: (id) => agendaRepository.get(id),
  search: (keyword) => agendaRepository.search(keyword),
  create(data) { assertRequired(data); return agendaRepository.create(data); },
  update(id, data) { assertRequired(data); return agendaRepository.update(id, data); },
  remove: (id) => agendaRepository.remove(id),

  legacy: {
    list: () => agendaRepository.legacyList(),
    getRows: (id) => agendaRepository.legacyGetRows(id),
    search: (keyword) => agendaRepository.legacySearch(keyword),
    graph: () => agendaRepository.legacyGraph(),
    create: (data, now) => agendaRepository.legacyCreate(data, legacyTimestamp(now)),
    update: (data, now) => agendaRepository.legacyUpdate(data, legacyTimestamp(now)),
    remove: (id) => agendaRepository.legacyRemove(id),
    timestamp: legacyTimestamp,
  },
};
