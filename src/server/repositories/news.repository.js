import { db } from "@/lib/db";

export const newsRepository = {
  async list(role_id_users) {
    if (role_id_users == '6') {
      const result = await db.query("SELECT * FROM news WHERE web_identity = 'kdeks' ORDER BY news_datetime DESC");
      return Promise.all(result.rows.map(async (item) => {
        const r = await db.query("SELECT * FROM news_categories WHERE id = $1", [item.category_id]);
        return {
          id: item?.id,
          title: item?.title,
          title_en: item?.title_en,
          news_datetime: item?.news_datetime,
          content: item?.content,
          content_en: item?.content_en,
          excerpt: item?.excerpt,
          excerpt_en: item?.excerpt_en,
          is_publish: item?.is_publish,
          image: item?.image,
          img: item?.image?.split('/')[5],
          category_id: item?.category_id,
          tagging: item?.tag,
          directorat: item?.directorat,
          id_province: item?.id_province,
          users_name: item?.users_name,
          detail: r.rows[0]
        };
      }));
    } else {
      const result = await db.query("SELECT * FROM news WHERE web_identity = 'kneks' ORDER BY news_datetime DESC");
      return Promise.all(result.rows.map(async (item) => {
        const parse = '[{"value":"kneks"},{"value":"kdeks"},{"value":"syariah"},{"value":"indonesia"}]';
        const jsonArray = JSON.parse(parse);
        const hasil = jsonArray.map(elems => elems.value).join(',');
        const r = await db.query("SELECT * FROM news_categories WHERE id = $1", [item.category_id]);
        return {
          id: item?.id,
          title: item?.title,
          title_en: item?.title_en,
          news_datetime: item?.news_datetime,
          content: item?.content,
          content_en: item?.content_en,
          excerpt: item?.excerpt,
          excerpt_en: item?.excerpt_en,
          is_publish: item?.is_publish,
          image: item?.image,
          img: item?.image?.split('/')[5],
          category_id: item?.category_id,
          tagging: item?.tag,
          tags: hasil,
          directorat: item?.directorat,
          id_province: item?.id_province,
          users_name: item?.users_name,
          detail: r.rows[0]
        };
      }));
    }
  },
  
  async search(keyword) {
    const result = await db.query("SELECT * FROM news WHERE title ILIKE $1 OR title_en ILIKE $1 ORDER BY id ASC LIMIT 5", [`%${keyword}%`]);
    const photos = await db.query("SELECT * FROM news_photos WHERE title ILIKE $1 OR title_en ILIKE $1 ORDER BY id ASC LIMIT 5", [`%${keyword}%`]);
    const videos = await db.query("SELECT * FROM news_videos WHERE title ILIKE $1 OR title_en ILIKE $1 ORDER BY id ASC LIMIT 5", [`%${keyword}%`]);
    
    const newsRows = await Promise.all(result.rows.map(async (item) => {
        const parse = '[{"value":"kneks"},{"value":"kdeks"},{"value":"syariah"},{"value":"indonesia"}]';
        const jsonArray = JSON.parse(parse);
        const hasil = jsonArray.map(elems => elems.value).join(',');
        const r = await db.query("SELECT * FROM news_categories WHERE id = $1", [item.category_id]);
        return {
            id: item?.id,
            title: item?.title,
            title_en: item?.title_en,
            news_datetime: item?.news_datetime,
            content: item?.content,
            content_en: item?.content_en,
            excerpt: item?.excerpt,
            excerpt_en: item?.excerpt_en,
            is_publish: item?.is_publish,
            image: item?.image,
            category_id: item?.category_id,
            tag: hasil,
            tagging: item?.tag,
            directorat: item?.directorat,
            id_province: item?.id_province,
            users_name: item?.users_name,
            detail: r.rows[0]
        };
    }));
    
    return {
        news: newsRows,
        photos: photos.rows,
        videos: videos.rows
    };
  },

  async get(id) {
    const sql = await db.query('SELECT * FROM news WHERE id=$1', [id]);
    if (sql.rows.length > 0) {
        const item = sql.rows[0];
        return {
            id: item?.id,
            title: item?.title,
            title_en: item?.title_en,
            news_datetime: item?.news_datetime,
            content: item?.content,
            content_en: item?.content_en,
            excerpt: item?.excerpt,
            excerpt_en: item?.excerpt_en,
            is_publish: item?.is_publish,
            image: item?.image,
            img: item?.image?.split('/')[5],
            category_id: item?.category_id,
            tagging: item?.tag,
            directorat: item?.directorat,
            id_province: item?.id_province,
            users_name: item?.users_name
        };
    }
    return null;
  },

  async create(data) {
    const result = await db.query(
      `INSERT INTO news(title,title_en,excerpt,excerpt_en,content,content_en,image,is_publish,news_datetime,category_id,web_identity,tag,directorat,users_id,id_province,users_name) 
       VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16) RETURNING *`,
       [data.title, data.title_en, data.excerpt, data.excerpt_en, data.content, data.content_en, data.image, data.is_publish, data.news_datetime, data.category_id, data.web_identity, data.tagging, data.directorat_id, data.users_id, data.kdeks, data.users_name]
    );
    return result.rows[0];
  },

  async update(id, data) {
    if (!data.image) {
      const result = await db.query(
        `UPDATE news SET title=$1,title_en=$2,excerpt=$3,excerpt_en=$4,content=$5,content_en=$6,is_publish=$7,news_datetime=$8,category_id=$9,tag=$10,directorat=$11,id_province=$12,users_name=$13 WHERE id = $14 RETURNING *`,
        [data.title, data.title_en, data.excerpt, data.excerpt_en, data.content, data.content_en, data.is_publish, data.news_datetime, data.category_id, data.tagging, data.directorat_id, data.kdeks, data.users_name, id]
      );
      return result.rows[0] ?? null;
    } else {
      const result = await db.query(
        `UPDATE news SET title=$1,title_en=$2,excerpt=$3,excerpt_en=$4,content=$5,content_en=$6,image=$7,is_publish=$8,news_datetime=$9,category_id=$10,tag=$11,directorat=$12,id_province=$13,users_name=$14 WHERE id = $15 RETURNING *`,
        [data.title, data.title_en, data.excerpt, data.excerpt_en, data.content, data.content_en, data.image, data.is_publish, data.news_datetime, data.category_id, data.tagging, data.directorat_id, data.kdeks, data.users_name, id]
      );
      return result.rows[0] ?? null;
    }
  },

  async remove(id) {
    return (await db.query("DELETE FROM news WHERE id = $1 RETURNING id", [id])).rows[0] ?? null;
  },

  // Legacy News Category compatibility
  async listLegacyCategories() {
    return (await db.query('SELECT * FROM news_categories')).rows;
  },

  async getLegacyCategoryRows(id) {
    return (await db.query('SELECT * FROM news_categories where id = $1 ', [id])).rows;
  },

  async createLegacyCategory(data) {
    await db.query(
      "insert into news_categories(title,title_en,description,description_en) values($1,$2,$3,$4)",
      [data.title, data.title_en, data.description, data.description_en],
    );
  },

  async updateLegacyCategory(data) {
    await db.query(
      "update news_categories set title=$1,title_en=$2,description=$3,description_en=$4 where id = $5",
      [data.title, data.title_en, data.description, data.description_en, data.id],
    );
  },

  async deleteLegacyCategory(id) {
    await db.query('DELETE FROM news_categories where id = $1 ', [id]);
  },

  // Legacy public News read/filter compatibility
  async getLegacyNewsByCategory(id) {
    return (
      await db.query(
        'SELECT * FROM  news where category_id=$1 ORDER BY news_datetime DESC',
        [id],
      )
    ).rows;
  },

  async getLegacyNewsByDate(date) {
    return (
      await db.query('SELECT * FROM  news where news_datetime LIKE $1', [
        '%' + date + '%',
      ])
    ).rows;
  }
};
