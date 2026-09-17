import { rolesReferenceRepository } from "@/server/repositories/roles-reference.repository";

export const rolesReferenceService = {
  list: () => rolesReferenceRepository.list(),
};
