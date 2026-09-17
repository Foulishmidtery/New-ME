import { menuSettingsRepository } from "@/server/repositories/menu-settings.repository";

export const menuSettingsService = {
  legacyListMenus: () => menuSettingsRepository.legacyListMenus(),
  legacyMenuDetail: (id) => menuSettingsRepository.legacyMenuDetail(id),
  legacyInsertMenu: (data) => menuSettingsRepository.legacyInsertMenu(data),
  legacyUpdateMenu: (data) => menuSettingsRepository.legacyUpdateMenu(data),
  legacyListSubmenus: () => menuSettingsRepository.legacyListSubmenus(),
  legacySubmenuDetail: (id) => menuSettingsRepository.legacySubmenuDetail(id),
  legacyInsertSubmenu: (data) => menuSettingsRepository.legacyInsertSubmenu(data),
  legacyUpdateSubmenu: (data) => menuSettingsRepository.legacyUpdateSubmenu(data),
};
