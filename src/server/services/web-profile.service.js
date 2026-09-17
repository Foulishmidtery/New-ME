import { webProfileRepository } from "@/server/repositories/web-profile.repository";

export const webProfileService = {
  legacyList: () => webProfileRepository.legacyList(),
  legacyDetail: (id) => webProfileRepository.legacyDetail(id),
  legacyUpdateTitle: (data) => webProfileRepository.legacyUpdateTitle(data),
  legacyUpdateLogo: (data) => webProfileRepository.legacyUpdateLogo(data),
  legacyUpdateHeader: (data) => webProfileRepository.legacyUpdateHeader(data),
  legacyUpdateColor: (data) => webProfileRepository.legacyUpdateColor(data),
};
