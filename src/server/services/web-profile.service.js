import { webProfileRepository } from "@/server/repositories/web-profile.repository";

export const webProfileService = {
  legacyList: () => webProfileRepository.legacyList(),
  legacyDetail: (id) => webProfileRepository.legacyDetail(id),
};
