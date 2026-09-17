import { db } from "@/lib/db";

export const authRepository = {
  async getUserByEmail(email) {
    return (await db.query("SELECT * FROM users WHERE email = $1 AND approve = 'Y'", [email])).rows[0] ?? null;
  },
  async createUser(data) {
    return (await db.query(
      "INSERT INTO users(name, email, password, directorat_id, id_province) VALUES($1, $2, $3, $4, $5) RETURNING *",
      [data.username, data.email, data.password, data.direktorat, data.kdeks]
    )).rows[0];
  },
  async getUserAnalytics(userId) {
    const news = (await db.query("SELECT id FROM news WHERE users_id = $1", [userId])).rowCount;
    const videos = (await db.query("SELECT id FROM news_videos WHERE users_id = $1", [userId])).rowCount;
    const photos = (await db.query("SELECT id FROM news_photos WHERE users_id = $1", [userId])).rowCount;
    const files = (await db.query("SELECT id FROM files WHERE users_id = $1", [userId])).rowCount;
    
    return {
      news: news,
      videos: videos,
      photos: photos,
      files: files
    };
  }
};
