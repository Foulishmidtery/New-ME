import { aboutsRepository } from "@/server/repositories/abouts.repository";

export const aboutsService = {
  getEsAbouts: () => aboutsRepository.getEsAbouts(),
  getKneksAbouts: () => aboutsRepository.getKneksAbouts(),
  getKdeksAboutsList: () => aboutsRepository.getKdeksAboutsList(),
  getKdeksAbouts: () => aboutsRepository.getKdeksAbouts(),
  getKdeksHistory: () => aboutsRepository.getKdeksHistory(),
  getAboutById: (id) => aboutsRepository.getAboutById(id),
  updateAbout: (id, data) => aboutsRepository.updateAbout(id, data),
  deleteAbout: (id) => aboutsRepository.deleteAbout(id),
  deleteKdeksAbouts: () => aboutsRepository.deleteKdeksAbouts(),
  getMapsKdeks: async () => {
    const results = await aboutsRepository.getMapsKdeks();
    return { success: true, data: results };
  }
};
