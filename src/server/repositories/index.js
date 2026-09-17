import { legacyHandlers } from "@/server/repositories/legacy-source";
import { contentRepository } from "@/server/repositories/content.repository";
import { newsRepository } from "@/server/repositories/news.repository";
import { organizationRepository } from "@/server/repositories/organization.repository";
import { profileRepository } from "@/server/repositories/profile.repository";
import { userRepository } from "@/server/repositories/user.repository";

const repositories = {
  ...newsRepository,
  ...organizationRepository,
  ...contentRepository,
  ...profileRepository,
  ...userRepository,
};

/** Keeps every existing endpoint callable during modular migration. */
export function getRepositoryHandler(name) {
  return repositories[name] || legacyHandlers[name];
}
