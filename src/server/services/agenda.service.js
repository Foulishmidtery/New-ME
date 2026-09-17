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

export const agendaService = {
  list: () => agendaRepository.list(),
  get: (id) => agendaRepository.get(id),
  search: (keyword) => agendaRepository.search(keyword),
  create(data) { assertRequired(data); return agendaRepository.create(data); },
  update(id, data) { assertRequired(data); return agendaRepository.update(id, data); },
  remove: (id) => agendaRepository.remove(id),
};
