import { newsRepository } from "@/server/repositories/news.repository";

export const newsService = {
  list: (role_id_users) => newsRepository.list(role_id_users),
  search: (keyword) => newsRepository.search(keyword),
  get: (id) => newsRepository.get(id),
  create: (data) => newsRepository.create(data),
  update: (id, data) => newsRepository.update(id, data),
  remove: (id) => newsRepository.remove(id),

  legacyCategory: {
    list: () => newsRepository.listLegacyCategories(),
    detail: (id) => newsRepository.getLegacyCategoryRows(id),
    create: (data) => newsRepository.createLegacyCategory(data),
    update: (data) => newsRepository.updateLegacyCategory(data),
    remove: (id) => newsRepository.deleteLegacyCategory(id),
  },

  legacyFilters: {
    byCategory: (id) => newsRepository.getLegacyNewsByCategory(id),
    byDate: (date) => newsRepository.getLegacyNewsByDate(date),
  },

  legacyPostTypes: {
    list: (name) => newsRepository.getLegacyPostTypeRows(name),
  },
};
