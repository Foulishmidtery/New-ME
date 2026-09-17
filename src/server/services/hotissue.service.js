import { hotissueRepository } from "@/server/repositories/hotissue.repository";

export const hotissueService = {
  // Categories
  listCategories: () => hotissueRepository.listCategories(),
  getCategory: (id) => hotissueRepository.getCategory(id),
  createCategory: (data) => hotissueRepository.createCategory(data),
  updateCategory: (id, data) => hotissueRepository.updateCategory(id, data),
  removeCategory: (id) => hotissueRepository.removeCategory(id),

  // Sub Categories
  listSubcategories: () => hotissueRepository.listSubcategories(),
  getSubcategory: (id) => hotissueRepository.getSubcategory(id),
  createSubcategory: (data) => hotissueRepository.createSubcategory(data),
  updateSubcategory: (id, data) => hotissueRepository.updateSubcategory(id, data),
  removeSubcategory: (id) => hotissueRepository.removeSubcategory(id),
  legacySubcategory: {
    list: () => hotissueRepository.listSubcategories(),
    get: (id) => hotissueRepository.getSubcategory(id),
    create: (data) => hotissueRepository.legacyCreateSubcategory(data),
    update: (data) => hotissueRepository.legacyUpdateSubcategory(data),
    remove: (id) => hotissueRepository.legacyRemoveSubcategory(id),
  },

  // Hot Issues
  listIssues: () => hotissueRepository.listIssues(),
  getIssue: (id) => hotissueRepository.getIssue(id),
  createIssue: (data) => {
      data.issue_datetime = data.issue_datetime?.replace("T", " ");
      return hotissueRepository.createIssue(data);
  },
  updateIssue: (id, data) => {
      data.issue_datetime = data.issue_datetime?.replace("T", " ");
      return hotissueRepository.updateIssue(id, data);
  },
  removeIssue: (id) => hotissueRepository.removeIssue(id),
};
