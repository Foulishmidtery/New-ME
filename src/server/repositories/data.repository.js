import { db } from "@/lib/db";

export const dataRepository = {
  // Menu
  async listMenus() {
    return (await db.query("SELECT * FROM menu")).rows;
  },
  async getMenu(id) {
    return (await db.query("SELECT * FROM menu WHERE id=$1", [id])).rows[0] ?? null;
  },
  async createMenu(data) {
    const result = await db.query(
      "INSERT INTO menu(menu_name, menu_link, orders, menu_name_en) VALUES($1, $2, $3, $4) RETURNING *",
      [data.menu_name, data.menu_link, data.orders, data.menu_name_en]
    );
    return result.rows[0];
  },
  async updateMenu(id, data) {
    const result = await db.query(
      "UPDATE menu SET menu_name=$1, menu_link=$2, orders=$3, menu_name_en=$4 WHERE id=$5 RETURNING *",
      [data.menu_name, data.menu_link, data.orders, data.menu_name_en, id]
    );
    return result.rows[0];
  },
  
  // Submenu
  async listSubmenus() {
    return (await db.query("SELECT * FROM menu_sub")).rows;
  },
  async getSubmenu(id) {
    return (await db.query("SELECT * FROM menu_sub WHERE id=$1", [id])).rows[0] ?? null;
  },
  async getSubmenusByMenu(menuId) {
    return (await db.query("SELECT * FROM menu_sub WHERE menu_id=$1 ORDER BY orders ASC", [menuId])).rows;
  },
  async createSubmenu(data) {
    const mn_id = data.menu_id.split('-');
    const result = await db.query(
      "INSERT INTO menu_sub(menu_id, submenu_name, submenu_link, orders, submenu_name_en, menu_name) VALUES($1, $2, $3, $4, $5, $6) RETURNING *",
      [mn_id[0], data.submenu_name, data.submenu_link, data.orders, data.submenu_name_en, mn_id[1]]
    );
    return result.rows[0];
  },
  async updateSubmenu(id, data) {
    const mn_id = data.menu_id.split('-');
    const result = await db.query(
      "UPDATE menu_sub SET menu_id=$1, submenu_name=$2, submenu_link=$3, orders=$4, submenu_name_en=$5, menu_name=$6 WHERE id=$7 RETURNING *",
      [mn_id[0], data.submenu_name, data.submenu_link, data.orders, data.submenu_name_en, mn_id[1], id]
    );
    return result.rows[0];
  },

  // Dashboard
  async listDashboards() {
    return (await db.query("SELECT * FROM data_dashboard")).rows;
  },
  async getDashboard(id) {
    return (await db.query("SELECT * FROM data_dashboard WHERE id=$1", [id])).rows[0] ?? null;
  },
  async createDashboard(data) {
    const arraydir = data.directorat.toString().replace(/[{}]/g, '').split(',');
    const directr = arraydir.map(item => item.replace(/"/g, ''));
    const arraykdeks = data.kdeks.toString().replace(/[{}]/g, '').split(',');
    const kdeksdir = arraykdeks.map(item => item.replace(/"/g, ''));
    const arraykdataset = data.dataset.toString().replace(/[{}]/g, '').split(',');
    const datasetdir = arraykdataset.map(item => item.replace(/"/g, ''));
    const ddd = data.data_type.split('-');
    
    const result = await db.query(
      "INSERT INTO data_dashboard (api, statistic_id, statistic_name, sub_statistic, short_name, long_name, short_name_en, long_name_en, tagging, directorat, kdeks, publish, dataset) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *",
      [data.api, ddd[0], ddd[1], data.sub_statistic, data.shorts_name, data.long_name, data.shorts_name_en, data.long_name_en, data.taggings, directr, kdeksdir, data.publish, datasetdir]
    );
    return result.rows[0];
  },
  async deleteDashboard(id) {
    return (await db.query("DELETE FROM data_dashboard WHERE id=$1 RETURNING id", [id])).rows[0] ?? null;
  },
  async emptyApiDashboard(id) {
    const result = await db.query("UPDATE data_dashboard SET naration=$1, month=$2 WHERE id=$3 RETURNING *", ['', '', id]);
    return result.rows[0];
  },
  async updateApiDashboard(id, data) {
    const result = await db.query("UPDATE data_dashboard SET naration=$1, month=$2 WHERE id=$3 RETURNING *", [data.naration, data.month, id]);
    if (result.rowCount > 0) {
      await db.query("INSERT INTO naration(dashboard_id, dashboard_name, description, month) VALUES($1, $2, $3, $4)", [id, data.urls_name, data.naration, data.month]);
    }
    return result.rows[0];
  },
  async getDashboardNaration(dashboardId) {
    return (await db.query("SELECT * FROM naration WHERE dashboard_id=$1", [dashboardId])).rows;
  },

  // Slider Data
  async listSliderData() {
    return (await db.query("SELECT * FROM data_slider")).rows;
  },
  async getSliderData(id) {
    return (await db.query("SELECT * FROM data_slider WHERE id=$1", [id])).rows[0] ?? null;
  },
  async createSliderData(data) {
    const result = await db.query(
      "INSERT INTO data_slider(title, title_en, amount, date_created, image, link, publish) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [data.title, data.title_en, data.amount, data.date_created, data.image, data.link, data.publish]
    );
    return result.rows[0];
  },
  async updateSliderData(id, data) {
    if (data.image) {
      const result = await db.query(
        "UPDATE data_slider SET title=$1, title_en=$2, amount=$3, date_created=$4, image=$5, link=$6, publish=$7 WHERE id=$8 RETURNING *",
        [data.title, data.title_en, data.amount, data.date_created, data.image, data.link, data.is_published, id]
      );
      return result.rows[0];
    } else {
      const result = await db.query(
        "UPDATE data_slider SET title=$1, title_en=$2, amount=$3, date_created=$4, link=$5, publish=$6 WHERE id=$7 RETURNING *",
        [data.title, data.title_en, data.amount, data.date_created, data.link, data.is_published, id]
      );
      return result.rows[0];
    }
  },
  async deleteSliderData(id) {
    return (await db.query("DELETE FROM data_slider WHERE id=$1 RETURNING id", [id])).rows[0] ?? null;
  }
};
