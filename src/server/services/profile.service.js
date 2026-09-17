import { profileRepository } from "@/server/repositories/profile.repository";

export const profileService = {
  // Institutions
  listInstitutions: () => profileRepository.listInstitutions(),
  getInstitution: (id) => profileRepository.getInstitution(id),
  createInstitution: (data) => profileRepository.createInstitution(data),
  updateInstitution: (id, data) => profileRepository.updateInstitution(id, data),
  deleteInstitution: (id) => profileRepository.deleteInstitution(id),

  // Social Media
  listSocialMedias: () => profileRepository.listSocialMedias(),
  getSocialMedia: (id) => profileRepository.getSocialMedia(id),
  updateSocialMedia: (id, data) => profileRepository.updateSocialMedia(id, data),
  deleteSocialMedia: (id) => profileRepository.deleteSocialMedia(id),

  // Post Social Media
  listPostSocialMedias: () => profileRepository.listPostSocialMedias(),
  listPostSocialMediasFe: () => profileRepository.listPostSocialMediasFe(),
  getPostSocialMedia: (id) => profileRepository.getPostSocialMedia(id),
  createPostSocialMedia: (data) => profileRepository.createPostSocialMedia(data),
  updatePostSocialMedia: (id, data) => profileRepository.updatePostSocialMedia(id, data),
  deletePostSocialMedia: (id) => profileRepository.deletePostSocialMedia(id),

  // Scopes
  listScopes: () => profileRepository.listScopes(),
  getScope: (id) => profileRepository.getScope(id),
  updateScope: (id, data) => profileRepository.updateScope(id, data),
  deleteScope: (id) => profileRepository.deleteScope(id),

  // Maps
  listMaps: () => profileRepository.listMaps(),
  updateMap: (id, data) => profileRepository.updateMap(id, data),

  // Contacts
  listContacts: () => profileRepository.listContacts(),
  updateContact: (id, data) => profileRepository.updateContact(id, data),

  // Questbook
  createQuestbook: (data) => profileRepository.createQuestbook(data),
};
