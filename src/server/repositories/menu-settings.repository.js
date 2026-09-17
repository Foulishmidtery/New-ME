import { db } from "@/lib/db";

export const menuSettingsRepository = {
  async legacyListMenus() {
    return (await db.query("SELECT * FROM menu")).rows;
  },

  async legacyMenuDetail(id) {
    return (await db.query("SELECT * FROM menu where id = $1", [id])).rows;
  },

  async legacyInsertMenu(data) {
    return db.query(
      "insert into menu(menu_name,menu_link,orders,menu_name_en) values($1,$2,$3,$4)",
      [data.menu_name, data.menu_link, data.orders, data.menu_name_en],
    );
  },

  async legacyUpdateMenu(data) {
    return db.query(
      "update menu set menu_name=$1, menu_link=$2, orders=$3, menu_name_en=$4 where id = $5",
      [data.menu_name, data.menu_link, data.orders, data.menu_name_en, data.id],
    );
  },

  async legacyListSubmenus() {
    return (await db.query("SELECT * FROM menu_sub")).rows;
  },

  async legacySubmenuDetail(id) {
    return (await db.query("SELECT * FROM menu_sub where id = $1", [id])).rows;
  },

  async legacyInsertSubmenu(data) {
    const menu = splitLegacyMenuId(data.menu_id);
    return db.query(
      "insert into menu_sub(menu_id,submenu_name,submenu_link,orders,submenu_name_en,menu_name) values($1,$2,$3,$4,$5,$6)",
      [menu[0], data.submenu_name, data.submenu_link, data.orders, data.submenu_name_en, menu[1]],
    );
  },

  async legacyUpdateSubmenu(data) {
    const menu = splitLegacyMenuId(data.menu_id);
    return db.query(
      "update menu_sub set menu_id = $1, submenu_name=$2, submenu_link=$3, orders=$4, submenu_name_en=$5, menu_name=$6 where id = $7",
      [menu[0], data.submenu_name, data.submenu_link, data.orders, data.submenu_name_en, menu[1], data.id],
    );
  },
};

function splitLegacyMenuId(value) {
  return String(value ?? "").split("-");
}
