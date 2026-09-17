import { dataMenuRepository } from "@/server/repositories/data-menu.repository";

function validate(data) {
  const required = ["title", "title_en", "long_title", "long_title_en", "link_menu_data", "data_sort"];
  const missing = required.filter((field) => data?.[field] === undefined || data?.[field] === null || String(data[field]).trim() === "");
  if (missing.length) { const error = new Error(`Field wajib belum lengkap: ${missing.join(", ")}`); error.status = 400; throw error; }
  if (!Number.isFinite(Number(data.data_sort))) { const error = new Error("data_sort harus berupa angka."); error.status = 400; throw error; }
}

export const dataMenuService = {
  list: () => dataMenuRepository.list(),
  get: (id) => dataMenuRepository.findById(id),
  create(data) { validate(data); return dataMenuRepository.create(data); },
  update(id, data) { validate(data); return dataMenuRepository.update(id, data); },
  remove: (id) => dataMenuRepository.remove(id),

  legacy: {
    list: () => dataMenuRepository.legacyList(),
    getRows: (id) => dataMenuRepository.legacyFindById(id),
    create: (data) => dataMenuRepository.legacyCreate(data),
    update: (data) => dataMenuRepository.legacyUpdate(data),
    remove: (id) => dataMenuRepository.legacyRemove(id),
  },
};
