import { directoratRepository } from "@/server/repositories/directorat.repository";

export const directoratService = {
  getDirectorats: (role_id, directorat_id) => directoratRepository.getDirectorats(role_id, directorat_id),
  getDirectoratsFe: () => directoratRepository.getDirectoratsFe(),
  createDirectorat: (data) => directoratRepository.createDirectorat(data),
  updateDirectorat: (id, data) => directoratRepository.updateDirectorat(id, data),
  deleteDirectorat: (id) => directoratRepository.deleteDirectorat(id),
  getDirectoratDetails: (id) => directoratRepository.getDirectoratDetails(id),
  
  getDevisi: () => directoratRepository.getDevisi(),
  getDevisiById: (id) => directoratRepository.getDevisiById(id),
  createDevisi: (data) => directoratRepository.createDevisi(data),
  updateDevisi: (id, data) => directoratRepository.updateDevisi(id, data),
  deleteDevisi: (id) => directoratRepository.deleteDevisi(id),

  legacyDivision: {
    list: () => directoratRepository.getLegacyDevisi(),
    detail: (id) => directoratRepository.getLegacyDevisiDetail(id),
    create: (data) => directoratRepository.createLegacyDevisi(data),
    update: (data) => directoratRepository.updateLegacyDevisi(data),
    remove: (id) => directoratRepository.deleteLegacyDevisi(id),
  },

  getDirectoratsFeNews: (id) => directoratRepository.getDirectoratsFeNews(id),
  getDirectoratsFePhotos: (id) => directoratRepository.getDirectoratsFePhotos(id),
  getDirectoratsFeVideos: (id) => directoratRepository.getDirectoratsFeVideos(id),
  getDirectoratsFeOpini: (id) => directoratRepository.getDirectoratsFeOpini(id),
  getDirectoratsFeFiles: (id) => directoratRepository.getDirectoratsFeFiles(id),

  getKdeksFeNews: (id) => directoratRepository.getKdeksFeNews(id),
  getKdeksFePhotos: (id) => directoratRepository.getKdeksFePhotos(id),
  getKdeksFeOpini: (id) => directoratRepository.getKdeksFeOpini(id),
  getKdeksFeFiles: (id) => directoratRepository.getKdeksFeFiles(id),

  getDirectoratPath: (id) => directoratRepository.getDirectoratPath(id)
};
