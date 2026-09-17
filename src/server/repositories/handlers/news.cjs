// const md5 = require('md5');
const { executeQuery } = require('../../legacy-db/postgres');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const puppeteer = require('puppeteer');
const he = require('he');
const bcrypt = require('bcrypt');
const { exitCode } = require('process');


// let fileswindows = 'D:/kneksbe/webdevkneks/public/uploads/';
let fileslinux = (process.env.PUBLIC_UPLOADS_DIR || path.join(process.cwd(), 'public', 'uploads')) + path.sep;
let filepengunjung = '/var/www/html/webdevkneks/db/';
// let site_url = "https://cms-demo.kneks.go.id";
// let site_url = "https://cms-dev.kneks.go.id";
let site_url = "https://cms.kneks.go.id";
// const decodeHex = (encodedStr) => Buffer.from(encodedStr, 'hex').toString('utf8');
// const encodeHex = (str) => Buffer.from(str).toString('hex');
//::::::::::::::::::::::::::::::Start Of LOGIN LOGOUT :::::::::::::::::::::::::::::::::::::::::::::::::::::

const posts = async (req, res) => {
    const role_id_users = req.cookies.roles_id;
    if (role_id_users == '6') {
        const result = await executeQuery("SELECT * FROM news where web_identity = 'kdeks' ORDER BY news_datetime DESC");
        let promises = result.map(async (item) => {
            return new Promise(async (resolve, reject) => {
                let r = await executeQuery("SELECT * FROM news_categories WHERE id = $1", [item.category_id]);
                let detail = r[0];
                let row = {
                    "id": item?.id,
                    "title": item?.title,
                    "title_en": item?.title_en,
                    "news_datetime": item?.news_datetime,
                    "content": item?.content,
                    "content_en": item?.content_en,
                    "excerpt": item?.excerpt,
                    "excerpt_en": item?.excerpt_en,
                    "is_publish": item?.is_publish,
                    "image": item?.image,
                    "img": item?.image?.split('/')[5],
                    "category_id": item?.category_id,
                    "tagging": item?.tag,
                    "directorat": item?.directorat,
                    "id_province": item?.id_province,
                    "users_name": item?.users_name,
                    "detail": detail
                };
                resolve(row);
            });
        });
        Promise.all(promises)
            .then((rows) => {
                res.status(200).json(rows);
            })
            .catch((error) => {
                res.status(500).json({ error: error.message });
            });

    } else {
        const result = await executeQuery("SELECT * FROM news  where web_identity = 'kneks'  ORDER BY news_datetime DESC");
        let promises = result.map(async (item) => {
            return new Promise(async (resolve, reject) => {
                const parse = '[{"value":"kneks"},{"value":"kdeks"},{"value":"syariah"},{"value":"indonesia"}]';
                const jsonArray = JSON.parse(parse);
                const hasil = jsonArray.map(elems => elems.value).join(',');
                let r = await executeQuery("SELECT * FROM news_categories WHERE id = $1", [item.category_id]);
                let detail = r[0];
                let row = {
                    "id": item?.id,
                    "title": item?.title,
                    "title_en": item?.title_en,
                    "news_datetime": item?.news_datetime,
                    "content": item?.content,
                    "content_en": item?.content_en,
                    "excerpt": item?.excerpt,
                    "excerpt_en": item?.excerpt_en,
                    "is_publish": item?.is_publish,
                    "image": item?.image,
                    "img": item?.image?.split('/')[5],
                    "category_id": item?.category_id,
                    "tagging": item?.tag,
                    "tags": hasil,
                    "directorat": item?.directorat,
                    "id_province": item?.id_province,
                    "users_name": item?.users_name,
                    "detail": detail
                };
                resolve(row);
            });
        });
        Promise.all(promises)
            .then((rows) => {
                res.status(200).json(rows);
            })
            .catch((error) => {
                res.status(500).json({ error: error.message });
            });
    }
}

const seacrh_posts = async (req, res) => {
    const result = await executeQuery("SELECT * FROM news where title LIKE '%" + req.query.cari + "%' or title_en LIKE '%" + req.query.cari + "%' ORDER BY id ASC limit 5 ");
    const photos = await executeQuery("SELECT * FROM news_photos where title LIKE '%" + req.query.cari + "%' or title_en LIKE '%" + req.query.cari + "%' ORDER BY id ASC limit 5");
    const videos = await executeQuery("SELECT * FROM news_videos where title LIKE '%" + req.query.cari + "%' or title_en LIKE '%" + req.query.cari + "%' ORDER BY id ASC limit 5 ");
    let promises = result.map(async (item) => {
        return new Promise(async (resolve, reject) => {
            const parse = '[{"value":"kneks"},{"value":"kdeks"},{"value":"syariah"},{"value":"indonesia"}]';
            const jsonArray = JSON.parse(parse);
            const hasil = jsonArray.map(elems => elems.value).join(',');
            let r = await executeQuery("SELECT * FROM news_categories WHERE id = $1", [item.category_id]);
            let detail = r[0];
            let row = {
                "id": item?.id,
                "title": item?.title,
                "title_en": item?.title_en,
                "news_datetime": item?.news_datetime,
                "content": item?.content,
                "content_en": item?.content_en,
                "excerpt": item?.excerpt,
                "excerpt_en": item?.excerpt_en,
                "is_publish": item?.is_publish,
                "image": item?.image,
                "category_id": item?.category_id,
                "tag": hasil,
                "tagging": item?.tag,
                "directorat": item?.directorat,
                "id_province": item?.id_province,
                "users_name": item?.users_name,
                "detail": detail
            };
            resolve(row);
        });
    });
    Promise.all(promises)
        .then((rows) => {
            res.status(200).json({
                "news": rows,
                "photos": photos,
                "videos": videos,
            });
        })
        .catch((error) => {
            res.status(500).json({ error: error.message });
        });
}

const newsdetail = async (req, res) => {
    const id_n = req.params.id;
    const sql = await executeQuery('SELECT * FROM  news where id=$1', [id_n]);
    if (sql?.length > 0) {
        // const jsonArray = JSON.parse(sql[0]?.tag);
        // const result = jsonArray.map(item => item.value).join(',');
        let row = {
            "id": sql[0]?.id,
            "title": sql[0]?.title,
            "title_en": sql[0]?.title_en,
            "news_datetime": sql[0]?.news_datetime,
            "content": sql[0]?.content,
            "content_en": sql[0]?.content_en,
            "excerpt": sql[0]?.excerpt,
            "excerpt_en": sql[0]?.excerpt_en,
            "is_publish": sql[0]?.is_publish,
            "image": sql[0]?.image,
            "img": sql[0]?.image?.split('/')[5],
            "category_id": sql[0]?.category_id,
            "tagging": sql[0]?.tag,
            "directorat": sql[0]?.directorat,
            "id_province": sql[0]?.id_province,
            "users_name": sql[0]?.users_name
        };
        res.status(200).json([row])
    } else {
        res.status(200).json([])
    }
}

const news_kdeks = async (req, res) => {

    const result = await executeQuery("SELECT * FROM news where web_identity = 'kdeks' ORDER BY id ASC ");
    let promises = result.map(async (item) => {
        return new Promise(async (resolve, reject) => {
            let r = await executeQuery("SELECT * FROM news_categories WHERE id = $1 AND  web_identity = 'kdeks' ", [item.category_id]);
            let detail = r[0];
            let row = {
                "id": item?.id,
                "title": item?.title,
                "title_en": item?.title_en,
                "news_datetime": item?.news_datetime,
                "content": item?.content,
                "content_en": item?.content_en,
                "excerpt": item?.excerpt,
                "excerpt_en": item?.excerpt_en,
                "is_publish": item?.is_publish,
                "image": item?.image,
                "users_name": item?.users_name,
                "img": item?.image?.split('/')[5],
                "category_id": item?.category_id,
                "detail": detail
            };
            resolve(row);
        });
    });
    Promise.all(promises)
        .then((rows) => {
            res.status(200).json(rows);
        })
        .catch((error) => {
            res.status(500).json({ error: error.message });
        });

}

const news_details_kdeks = async (req, res) => {
    const id_news = req.params.id;
    const sql = await executeQuery("SELECT * FROM news where id = $1 AND web_identity = 'kdeks' ", [id_news]);
    if (sql?.length > 0) {
        res.status(200).json(sql)
    } else {
        res.status(200).json({ "success": false })
    }
}

const news_categories_kdeks = async (req, res) => {
    const sql = await executeQuery("SELECT * FROM news_categories where web_identity = 'kdeks'");
    if (sql?.length > 0) {
        res.status(200).json(sql)
    } else {
        res.status(200).json({ "success": false })
    }
}

const news_detailnewscategory_kdeks = async (req, res) => {
    const id_cat = req.params.id;
    const sql = await executeQuery("SELECT * FROM news_categories where id = $1 AND web_identity = 'kdeks'", [id_cat]);
    if (sql?.length > 0) {
        res.status(200).json(sql)
    } else {
        res.status(200).json({ "success": false })
    }
}

const news_categories_menu = async (req, res) => {
    const id_cnm = req.params.id;
    const sql = await executeQuery('SELECT * FROM  news where category_id=$1 ORDER BY news_datetime DESC', [id_cnm]);
    if (sql?.length > 0) {
        res.status(200).json(sql)
    } else {
        res.status(200).json([])
    }
}

const pagingnews = async (req, res) => {

    var numPerPage = 10;
    var skip = (req.query.page - 1) * numPerPage;

    const rows = await executeQuery('SELECT * FROM news LIMIT $1, $2', [skip, numPerPage])
    if (rows?.length > 0) {
        res.status(200).json(rows)
    } else {
        res.status(200).json({ "success": false })
    }

    // const rows = await executeQuery('SELECT count(*) as numRows FROM news');
    // var numRows = rows[0].numRows;
    // var numPages = Math.ceil(numRows / numPerPage);

}

const insertnews = async (req, res) => {
    const news_datetime = req.body.news_datetime.replace("T", " ");
    const fileuploads = req.files ? req.files.map(f => site_url + "/uploads/news/" + f.filename).join(',') : "";
    const id_user = req.cookies.id;
    const users_name = req.cookies.name;
    const wei = (req.cookies.roles_id == '6') ? 'kdeks' : 'kneks';
    const sql = await executeQuery("insert into news(title,title_en,excerpt,excerpt_en,content,content_en,image,is_publish,news_datetime,category_id,web_identity,tag,directorat,users_id,id_province,users_name) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16)",
        [req.body.title, req.body.title_en, req.body.excerpt, req.body.excerpt_en, req.body.content, req.body.content_en, fileuploads, req.body.is_publish, news_datetime, req.body.category_id, wei, req.body.taggings, req.body.directorat_id, id_user, req.body.kdeks, users_name]);

    if (sql) {
        res.redirect('/n');
    } else {
        console.log(sql);
        res.redirect('/n');
    }
}

const updatenews = async (req, res) => {
    const users_name = req.cookies.name;
    const news_datetime = req.body.news_datetime.replace("T", " ");

    if (!req.files || req.files.length === 0) {
        const sql = await executeQuery("UPDATE news set title=$1,title_en=$2,excerpt=$3,excerpt_en=$4,content=$5,content_en=$6,is_publish=$7,news_datetime=$8,category_id=$9,tag=$10,directorat=$11,id_province=$12,users_name=$13 where id = $14",
            [req.body.title, req.body.title_en, req.body.excerpt, req.body.excerpt_en, req.body.content, req.body.content_en, req.body.is_publish, news_datetime, req.body.news_category_id, req.body.taggings, req.body.directorat_id, req.body.kdeks, users_name, req.body.id]);

        if (sql) { res.redirect('/n'); } else { console.log(sql); res.redirect('/n'); }
    } else {
        const fileuploads = req.files.map(f => site_url + "/uploads/news/" + f.filename).join(',');

        const sql = await executeQuery("UPDATE news set title=$1,title_en=$2,excerpt=$3,excerpt_en=$4,content=$5,content_en=$6,image=$7,is_publish=$8,news_datetime=$9,category_id=$10, tag=$11,directorat=$12,id_province=$13,users_name=$14 where id = $15",
            [req.body.title, req.body.title_en, req.body.excerpt, req.body.excerpt_en, req.body.content, req.body.content_en, fileuploads, req.body.is_publish, news_datetime, req.body.news_category_id, req.body.taggings, req.body.directorat_id, req.body.kdeks, users_name, req.body.id]);

        if (sql) { res.redirect('/n'); } else { console.log(sql); res.redirect('/n'); }
    }
}

const deletenews = async (req, res) => {
    const id_news = req.params.id;
    const foto_news = req.params.foto;
    if (fs.existsSync(fileslinux + 'news/' + foto_news)) {
        fs.unlink(fileslinux + 'news/' + foto_news, async function (err) {
            if (err) return console.log(err);
            const sql = await executeQuery('DELETE FROM news where id = $1 ', [id_news]);
            if (sql) {
                res.redirect('/n');
            } else {
                console.log(sql);
                res.redirect('/n');
            }
        });
        console.log("ada")
    } else {
        const sql = await executeQuery('DELETE FROM news where id = $1 ', [id_news]);
        if (sql) {
            res.redirect('/n');
        } else {
            console.log(sql);
            res.redirect('/n');
        }
    }
}

const news_categories_date = async (req, res) => {
    const date_search = req.params.date;
    const sql = await executeQuery('SELECT * FROM  news where news_datetime LIKE $1', ['%' + date_search + '%']);
    if (sql?.length > 0) {
        res.status(200).json(sql)
    } else {
        res.status(200).json({ "success": false })
    }
}

const news_categories = async (req, res) => {
    const sql = await executeQuery('SELECT * FROM news_categories');
    if (sql?.length > 0) {
        res.status(200).json(sql)
    } else {
        res.status(200).json({ "success": false })
    }
}

const detailnewscategory = async (req, res) => {
    const id_cat = req.params.id;
    const sql = await executeQuery('SELECT * FROM news_categories where id = $1 ', [id_cat]);
    if (sql?.length > 0) {
        res.status(200).json(sql)
    } else {
        res.status(200).json({ "success": false })
    }
}

const insertnewscategory = async (req, res) => {
    const sql = await executeQuery("insert into news_categories(title,title_en,description,description_en) values($1,$2,$3,$4)",
        [req.body.title, req.body.title_en, req.body.description, req.body.description_en]);
    if (sql) {
        res.redirect('/nc');
    } else {
        console.log(sql)
        res.redirect('/nc');
    }
}

const updatenewscategory = async (req, res) => {
    const sql = await executeQuery("update news_categories set title=$1,title_en=$2,description=$3,description_en=$4 where id = $5",
        [req.body.title, req.body.title_en, req.body.description, req.body.description_en, req.body.id]);
    if (sql) {
        res.redirect('/nc');
    } else {
        console.log(sql)
        res.redirect('/nc');
    }
}

const deletenewscategory = async (req, res) => {
    const id_news_cat = req.params.id;
    const sql = await executeQuery('DELETE FROM news_categories where id = $1 ', [id_news_cat]);
    if (sql) {
        res.redirect('/nc');
    } else {
        console.log(sql);
        res.redirect('/nc');
    }

}

//::::::::::::::::::::::::::::::End Of News:::::::::::::::::::::::::::::::::::::::::::::::::::::
//::::::::::::::::::::::::::::::Start Of Photos:::::::::::::::::::::::::::::::::::::::::::::::::::::
const categories = async (req, res) => {
    const names = req.params.name;
    const sql = await executeQuery('SELECT * FROM news_' + names)
    if (sql?.length > 0) {
        if (names == 'photos') {
            const array = [];
            sql?.forEach((items, index) => {
                const bbb = {
                    "id": items?.id,
                    "title": items?.title,
                    "photo": items?.photo,
                    "content": items?.content,
                    "photos_datetime": items?.photos_datetime,
                    "title_en": items?.title_en,
                    "content_en": items?.content_en,
                    "ph": items?.photo?.split('/')[5],
                    "web_identity": items?.web_identity,
                    "tag": items?.tag,
                    "directorat": items?.directorat,
                    "id_province": items?.id_province,
                    "is_publish": items?.is_publish,
                    "users_name": items?.users_name,
                };
                array.push(bbb);
            })
            res.status(200).json(array)
        } else {
            const array = [];
            sql?.forEach((items, index) => {
                const bbb = {
                    "id": items?.id,
                    "title": items?.title,
                    "video": items?.video,
                    "duration": items?.duration,
                    "content": items?.content,
                    "videos_datetime": items?.videos_datetime,
                    "title_en": items?.title_en,
                    "content_en": items?.content_en,
                    "videos_datetime": items?.videos_datetime,
                    "web_identity": items?.web_identity,
                    "tag": items?.tag,
                    "directorat": items?.directorat,
                    "id_province": items?.id_province,
                    "is_publish": items?.is_publish,
                    "users_name": items?.users_name,
                };
                array.push(bbb);
            })
            res.status(200).json(array)
        }

    } else {
        res.status(200).json({ "success": false })
    }
}

const insertphoto = async (req, res) => {
    const photos_datetime = req.body.photo_datetime.replace("T", " ");
    const photoupload = site_url + "/uploads/photo/" + req.file.filename;
    const sql = await executeQuery("insert into news_photos(title,title_en,content,content_en,photo,photos_datetime,tag,directorat,id_province,is_publish,users_id,users_name) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)",
        [req.body.title, req.body.title_en, req.body.content, req.body.content_en, photoupload, photos_datetime, req.body.taggings, req.body.directorat, req.body.kdeks, req.body.is_published, req.body.users_id, req.body.users_name])
    if (sql) {
        res.redirect('/ph');
    } else {
        console.log(sql)
        res.redirect('/ph');
    }
}

const photodetail = async (req, res) => {
    const id_ph = req.params.id;
    const sql = await executeQuery('SELECT * FROM  news_photos where id=$1', [id_ph]);
    if (sql?.length > 0) {
        res.status(200).json(sql)
    } else {
        res.status(200).json({ "success": false })
    }
}

const deletephoto = async (req, res) => {
    const id_photo = req.params.id;
    const foto_photo = req.params.foto;
    if (fs.existsSync(fileslinux + 'photo/' + foto_photo)) {
        fs.unlink(fileslinux + 'photo/' + foto_photo, async function (err) {
            if (err) return console.log(err);
            const sql = await executeQuery('DELETE FROM news_photos where id = $1 ', [id_photo]);
            if (sql) {
                res.redirect('/ph');
            } else {
                res.redirect('/ph');
                console.log(sql);
            }
        });
        console.log("ada")
    } else {
        const sql = await executeQuery('DELETE FROM news_photos where id = $1 ', [id_photo]);
        if (sql) {
            res.redirect('/ph');
        } else {
            res.redirect('/ph');
            console.log(sql);
        }
    }
}

const updatephoto = async (req, res) => {
    const photos_datetime = req.body.photo_datetime.replace("T", " ");
    if (!req.file || req.file == undefined || req.file == "") {
        const sql = await executeQuery("UPDATE news_photos set  title=$1,title_en=$2,content=$3,content_en=$4,photos_datetime=$5,tag=$6,directorat=$7,id_province=$8,is_publish=$9,users_id=$10,users_name=$11 where id = $12",
            [req.body.title, req.body.title_en, req.body.content, req.body.content_en, photos_datetime, req.body.taggings, req.body.directorat, req.body.kdeks, req.body.is_published, req.body.users_id, req.body.users_name, req.body.id]);
        if (sql) {
            res.redirect('/ph');
        } else {
            console.log(sql);
            res.redirect('/ph');
        }
    } else {
        const fileuploads = site_url + "/uploads/photo/" + req.file.filename;
        const sql = await executeQuery("UPDATE news_photos set  title=$1,title_en=$2,content=$3,content_en=$4,photo=$5, photos_datetime=$6,tag=$7,directorat=$8,id_province=$9,is_publish=$10,users_id=$11,users_name=$12 where id = $13",
            [req.body.title, req.body.title_en, req.body.content, req.body.content_en, fileuploads, photos_datetime, req.body.taggings, req.body.directorat, req.body.kdeks, req.body.is_published, req.body.users_id, req.body.users_name, req.body.id]);
        if (sql) {
            res.redirect('/ph');
        } else {
            console.log(sql);
            res.redirect('/ph');
        }
    }
}
//::::::::::::::::::::::::::::::End Of Photos :::::::::::::::::::::::::::::::::::::::::::::::::::::
//::::::::::::::::::::::::::::::Start Of Videos:::::::::::::::::::::::::::::::::::::::::::::::::::::
const insertvideo = async (req, res) => {
    const videos_datetime = req.body.video_datetime.replace("T", " ");
    const sql = await executeQuery("insert into news_videos(title,title_en,content,content_en,video,duration,videos_datetime,tag,directorat,id_province,is_publish,users_id,users_name) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)",
        [req.body.title, req.body.title_en, req.body.content, req.body.content_en, req.body.video, req.body.duration, videos_datetime, req.body.taggings, req.body.directorat, req.body.kdeks, req.body.is_published, req.body.users_id, req.body.users_name]);
    if (sql) {
        res.redirect('/v');
    } else {
        console.log(sql)
        res.redirect('/v');
    }
}

const videodetail = async (req, res) => {
    const id_vid = req.params.id;
    const sql = await executeQuery('SELECT * FROM  news_videos where id=$1', [id_vid]);
    if (sql?.length > 0) {
        res.status(200).json(sql)
    } else {
        res.status(200).json({ "success": false })
    }
}

const deletevideo = async (req, res) => {
    const id_video = req.params.id;
    const sql = await executeQuery('DELETE FROM  news_videos where id=$1', [id_video]);
    if (sql) {
        res.redirect('/v');
    } else {
        console.log(sql)
        res.redirect('/v');
    }
}

const updatevideos = async (req, res) => {
    // const videos_datetime = req.body.video_datetime.replace("T", " ");
    const videos_datetime = req.body.video_datetime.replace("T", " ");
    const sql = await executeQuery("update news_videos set title=$1,title_en=$2,content=$3,content_en=$4,video=$5,duration=$6,videos_datetime=$7,tag=$8,directorat=$9,id_province=$10,is_publish=$11,users_id=$12,users_name=$13 where id = $14",
        [req.body.title, req.body.title_en, req.body.content, req.body.content_en, req.body.video, req.body.duration, videos_datetime, req.body.taggings, req.body.directorat, req.body.kdeks, req.body.is_published, req.body.users_id, req.body.users_name, req.body.id]);
    if (sql) {
        res.redirect('/v');
    } else {
        console.log(sql)
        res.redirect('/v');
    }
}

//::::::::::::::::::::::::::::::End Of Videos:::::::::::::::::::::::::::::::::::::::::::::::::::::
//::::::::::::::::::::::::::::::Start Of Users:::::::::::::::::::::::::::::::::::::::::::::::::::::

module.exports = {
  posts,
  seacrh_posts,
  newsdetail,
  news_kdeks,
  news_details_kdeks,
  news_categories_kdeks,
  news_detailnewscategory_kdeks,
  news_categories_menu,
  pagingnews,
  insertnews,
  updatenews,
  deletenews,
  news_categories_date,
  news_categories,
  detailnewscategory,
  insertnewscategory,
  updatenewscategory,
  deletenewscategory,
  categories,
  insertphoto,
  photodetail,
  deletephoto,
  updatephoto,
  insertvideo,
  videodetail,
  deletevideo,
  updatevideos,
};
