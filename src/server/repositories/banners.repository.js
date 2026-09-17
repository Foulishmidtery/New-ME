import { db } from "@/lib/db";

export const bannersRepository = {
  // Slideshow
  async listSlideshows() {
    return (await db.query("SELECT * FROM slideshow")).rows;
  },
  async getSlideshow(id) {
    return (await db.query("SELECT * FROM slideshow WHERE id=$1", [id])).rows[0] ?? null;
  },
  async createSlideshow(data) {
    const result = await db.query(
      "INSERT INTO slideshow (title, title_en, image, date_created, status, content, content_en) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [data.title, data.title_en, data.image, data.tanggal, data.status, data.content, data.content_en]
    );
    return result.rows[0];
  },
  async updateSlideshow(id, data) {
    if (data.image) {
      const result = await db.query(
        "UPDATE slideshow SET title=$1, title_en=$2, image=$3, content=$4, content_en=$5, status=$6 WHERE id=$7 RETURNING *",
        [data.title, data.title_en, data.image, data.content, data.content_en, data.status, id]
      );
      return result.rows[0];
    } else {
      const result = await db.query(
        "UPDATE slideshow SET title=$1, title_en=$2, date_created=$3, status=$4 WHERE id=$5 RETURNING *",
        [data.title, data.title_en, data.tanggal, data.status, id]
      );
      return result.rows[0];
    }
  },
  async deleteSlideshow(id) {
    return (await db.query("DELETE FROM slideshow WHERE id=$1 RETURNING id", [id])).rows[0] ?? null;
  },

  // Login Banners
  async listLoginBanners() {
    return (await db.query("SELECT * FROM banner WHERE flag='login'")).rows;
  },
  async getLoginBanner(id) {
    return (await db.query("SELECT * FROM banner WHERE id=$1", [id])).rows[0] ?? null;
  },
  async createLoginBanner(data) {
    const result = await db.query(
      "INSERT INTO banner(name, path, flag, date_created, status) VALUES($1, $2, $3, $4, $5) RETURNING *",
      [data.names, data.path, data.flag, data.tanggal, data.status]
    );
    return result.rows[0];
  },
  async updateLoginBanner(id, data) {
    if (data.path) {
      const result = await db.query(
        "UPDATE banner SET name=$1, path=$2, date_created=$3, status=$4 WHERE id=$5 RETURNING *",
        [data.names, data.path, data.tanggal, data.status, id]
      );
      return result.rows[0];
    } else {
      const result = await db.query(
        "UPDATE banner SET name=$1, date_created=$2, status=$3 WHERE id=$4 RETURNING *",
        [data.names, data.tanggal, data.status, id]
      );
      return result.rows[0];
    }
  },
  async deleteLoginBanner(id) {
    return (await db.query("DELETE FROM banner WHERE id=$1 RETURNING id", [id])).rows[0] ?? null;
  },

  // Struktur Logo
  async listSLogo() {
    return (await db.query("SELECT * FROM banner WHERE flag='s_logo'")).rows;
  },
  async getSLogo(id) {
    return (await db.query("SELECT * FROM banner WHERE id=$1", [id])).rows[0] ?? null;
  },
  async createSLogo(data) {
    const result = await db.query(
      "INSERT INTO banner(name, path, flag, date_created, status) VALUES($1, $2, $3, $4, $5) RETURNING *",
      [data.names, data.path, data.flag, data.tanggal, data.status]
    );
    return result.rows[0];
  },
  async updateSLogo(id, data) {
    if (data.path) {
      const result = await db.query(
        "UPDATE banner SET name=$1, path=$2, date_created=$3, status=$4 WHERE id=$5 RETURNING *",
        [data.names, data.path, data.tanggal, data.status, id]
      );
      return result.rows[0];
    } else {
      const result = await db.query(
        "UPDATE banner SET name=$1, date_created=$2, status=$3 WHERE id=$4 RETURNING *",
        [data.names, data.tanggal, data.status, id]
      );
      return result.rows[0];
    }
  },
  async deleteSLogo(id) {
    return (await db.query("DELETE FROM banner WHERE id=$1 RETURNING id", [id])).rows[0] ?? null;
  },

  // Welcome Pages
  async listWelcomePages() {
    return (await db.query("SELECT * FROM banner WHERE flag='welcome'")).rows;
  },
  async getWelcomePage(id) {
    return (await db.query("SELECT * FROM banner WHERE id=$1", [id])).rows[0] ?? null;
  },
  async createWelcomePage(data) {
    const result = await db.query(
      "INSERT INTO banner(name, path, flag, date_created, status) VALUES($1, $2, $3, $4, $5) RETURNING *",
      [data.names, data.path, data.flag, data.tanggal, data.status]
    );
    return result.rows[0];
  },
  async updateWelcomePage(id, data) {
    if (data.path) {
      const result = await db.query(
        "UPDATE banner SET name=$1, path=$2, date_created=$3, status=$4 WHERE id=$5 RETURNING *",
        [data.names, data.path, data.tanggal, data.status, id]
      );
      return result.rows[0];
    } else {
      const result = await db.query(
        "UPDATE banner SET name=$1, date_created=$2, status=$3 WHERE id=$4 RETURNING *",
        [data.names, data.tanggal, data.status, id]
      );
      return result.rows[0];
    }
  },
  async deleteWelcomePage(id) {
    return (await db.query("DELETE FROM banner WHERE id=$1 RETURNING id", [id])).rows[0] ?? null;
  }
};
