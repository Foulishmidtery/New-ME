import { dataRepository } from "@/server/repositories/data.repository";

export const dataService = {
  // Menu
  listMenus: () => dataRepository.listMenus(),
  getMenu: (id) => dataRepository.getMenu(id),
  createMenu: (data) => dataRepository.createMenu(data),
  updateMenu: (id, data) => dataRepository.updateMenu(id, data),

  // Submenu
  listSubmenus: () => dataRepository.listSubmenus(),
  getSubmenu: (id) => dataRepository.getSubmenu(id),
  createSubmenu: (data) => dataRepository.createSubmenu(data),
  updateSubmenu: (id, data) => dataRepository.updateSubmenu(id, data),

  dropdownMenu: async () => {
    const menus = await dataRepository.listMenus();
    return Promise.all(menus.map(async (item) => {
      const subMenus = await dataRepository.getSubmenusByMenu(item.id);
      return {
        id: item?.id,
        menu_name: item?.menu_name,
        menu_link: item?.menu_link,
        menu_orders: item?.orders,
        menu_name_en: item?.menu_name_en,
        menu_sub: subMenus
      };
    }));
  },

  // Dashboard
  listDashboards: () => dataRepository.listDashboards(),
  getDashboard: (id) => dataRepository.getDashboard(id),
  createDashboard: (data) => dataRepository.createDashboard(data),
  deleteDashboard: (id) => dataRepository.deleteDashboard(id),
  emptyApiDashboard: (id) => dataRepository.emptyApiDashboard(id),
  updateApiDashboard: (id, data) => dataRepository.updateApiDashboard(id, data),
  getDashboardNaration: (dashboardId) => dataRepository.getDashboardNaration(dashboardId),

  // Slider Data
  listSliderData: () => dataRepository.listSliderData(),
  getSliderData: (id) => dataRepository.getSliderData(id),
  createSliderData: (data) => dataRepository.createSliderData(data),
  updateSliderData: (id, data) => dataRepository.updateSliderData(id, data),
  deleteSliderData: (id) => dataRepository.deleteSliderData(id)
};
