import { dataMenuService } from "@/server/services/data-menu.service";
export const listDataMenus = dataMenuService.list;
export const getDataMenu = dataMenuService.get;
export const createDataMenu = dataMenuService.create;
export const updateDataMenu = dataMenuService.update;
export const deleteDataMenu = dataMenuService.remove;
