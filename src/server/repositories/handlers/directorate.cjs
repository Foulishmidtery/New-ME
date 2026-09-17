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

const directorat = async (req, res) => {
    // const sql = await executeQuery('SELECT * FROM `hot_issues` LEFT JOIN `hot_subcategories`on hot_issues.hot_subcategory_id = hot_subcategories.id LEFT JOIN hot_categories on hot_subcategories.hot_category_id = hot_categories.id GROUP BY hot_categories.id');
    const role_id_users = req.cookies.roles_id;
    const directorat_id = req.cookies.directorat_id;
    if (role_id_users == 1 || role_id_users == 2) {
        const sql = await executeQuery('SELECT * FROM directorats');
        if (sql?.length > 0) {
            res.status(200).json(sql)
        } else {
            res.status(200).json([])
        }
    } else {
        const sql = await executeQuery("SELECT * FROM directorats where id = $1", [directorat_id]);
        if (sql?.length > 0) {
            res.status(200).json(sql)
        } else {
            res.status(200).json([])
        }
    }
}

const directorats_fe = async (req, res) => {
    const sql = await executeQuery("SELECT * FROM directorats order by id ASC");
    if (sql?.length > 0) {
        res.status(200).json(sql)
    } else {
        res.status(200).json([])
    }
}

const directorats_fe_news = async (req, res) => {
    const id_dirs = req.params.id;
    const sql = await executeQuery("SELECT * FROM news where directorat LIKE '%" + id_dirs + "%' ORDER by news_datetime DESC");
    if (sql?.length > 0) {
        res.status(200).json(sql)
    } else {
        res.status(200).json([])
    }
}

const directorats_fe_photos = async (req, res) => {
    const id_dirs = req.params.id;
    const sql = await executeQuery("SELECT * FROM news_photos where directorat LIKE '%" + id_dirs + "%' order by id DESC");
    if (sql?.length > 0) {
        res.status(200).json(sql)
    } else {
        res.status(200).json([])
    }
}

const directorats_fe_videos = async (req, res) => {
    const id_dirs = req.params.id;
    const sql = await executeQuery("SELECT * FROM news_videos where directorat LIKE '%" + id_dirs + "%' order by id DESC");
    if (sql?.length > 0) {
        res.status(200).json(sql)
    } else {
        res.status(200).json([])
    }
}

const directorats_fe_opini = async (req, res) => {
    const id_dirs = req.params.id;
    const sql = await executeQuery("SELECT * FROM opini where directorat LIKE '%" + id_dirs + "%' order by id DESC");
    if (sql?.length > 0) {
        res.status(200).json(sql)
    } else {
        res.status(200).json([])
    }
}

const directorats_fe_files = async (req, res) => {
    const id_dirs = req.params.id;
    const sql = await executeQuery("SELECT * FROM files where directorat LIKE '%" + id_dirs + "%' order by id DESC");
    if (sql?.length > 0) {
        res.status(200).json(sql)
    } else {
        res.status(200).json([])
    }
}

const kdeks_fe_news = async (req, res) => {
    const id_kdk = req.params.id;
    const sql = await executeQuery("SELECT * FROM news where id_province LIKE '%" + id_kdk + "%' order by id ASC");
    if (sql?.length > 0) {
        res.status(200).json(sql)
    } else {
        res.status(200).json([])
    }
}

const kdeks_fe_photos = async (req, res) => {
    const id_kdk = req.params.id;
    const sql = await executeQuery("SELECT * FROM news_photos where id_province LIKE '%" + id_kdk + "%' order by id ASC");
    if (sql?.length > 0) {
        res.status(200).json(sql)
    } else {
        res.status(200).json([])
    }
}

const kdeks_fe_opini = async (req, res) => {
    const id_kdk = req.params.id;
    const sql = await executeQuery("SELECT * FROM opini where id_province LIKE '%" + id_kdk + "%' order by id ASC");
    if (sql?.length > 0) {
        res.status(200).json(sql)
    } else {
        res.status(200).json([])
    }
}

const kdeks_fe_files = async (req, res) => {
    const id_kdk = req.params.id;
    const sql = await executeQuery("SELECT * FROM files where id_province LIKE '%" + id_kdk + "%' order by id ASC");
    if (sql?.length > 0) {
        res.status(200).json(sql)
    } else {
        res.status(200).json([])
    }
}

const directorat_details = async (req, res) => {
    const pppd = req.params.id;
    const result = await executeQuery('SELECT * FROM  directorats where id = $1 ', [pppd]);
    let promises = result.map(async (item) => {
        return new Promise(async (resolve, reject) => {
            let r = await executeQuery("SELECT * FROM devisi WHERE directorats_id = $1", [item.id]);
            let detail = r;
            let row = {
                "id": item.id,
                "title": item.title,
                "title_en": item.title_en,
                "description": item.description,
                "description_en": item.description_en,
                "web_identity": item.web_identity,
                "images": item.images,
                "directiorat_banner": item.directiorat_banner,
                "id_province": item.id_province,
                "province_name": item.province_name,
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

const directorat_devisi = async (req, res) => {
    const sql = await executeQuery('SELECT * FROM devisi');
    if (sql?.length > 0) {
        res.status(200).json(sql)
    } else {
        res.status(200).json([])
    }
}

const directorat_devisi_add = async (req, res) => {
    const bbb = req.body.directorats_id.split('-');
    const sql = await executeQuery("insert into devisi(title,title_en,description,description_en,directorats_id,directorats_name)values($1,$2,$3,$4,$5,$6)",
        [req.body.title, req.body.title_en, req.body.description, req.body.description_en, bbb[0], bbb[1]]);
    if (sql) {
        res.redirect('/devision');
    } else {
        res.redirect('/devision');
    }
}

const directorats_devisi_delete = async (req, res) => {
    const iddev = req.params.id;
    const sql = await executeQuery('DELETE FROM  devisi where id=$1', [iddev]);
    if (sql) {
        res.redirect('/devision');
    } else {
        res.redirect('/devision');
    }
}

const directorat_devisi_detail = async (req, res) => {
    const iddev = req.params.id;
    const sql = await executeQuery('SELECT *  FROM  devisi where id = $1', [iddev]);
    if (sql) {
        res.status(200).json(sql)
    } else {
        res.status(200).json([])
    }
}

const directorat_devisi_update = async (req, res) => {
    const bbb = req.body.directorats_id.split('-');
    const sql = await executeQuery("update devisi set title = $1, description = $2, directorats_id = $3 , directorats_name = $4, title_en = $5, description_en = $6 where id = $7",
        [req.body.title, req.body.description, bbb[0], bbb[1], req.body.title_en, req.body.description_en, req.body.id]);
    if (sql) {
        res.redirect('/devision');
    } else {
        res.redirect('/devision');
    }
}

const insertdirectorats = async (req, res) => {
    // const a = req.body.daerah.split('-');
    // const sql = await executeQuery('INSERT INTO directorats(title,title_en,description,description_en,id_province,province_name)values($1,$2,$3,$4,$5,$6)', [req.body.title, req.body.title_en, req.body.description, req.body.description_en, a[0], a[1]]);
    const fileupload1 = site_url + "/uploads/directorat/images/" + req.files['images'][0].filename;
    const fileupload2 = site_url + "/uploads/directorat/images/" + req.files['banners'][0].filename;
    const sql = await executeQuery('INSERT INTO directorats(title,title_en,description,description_en,images,directiorat_banner)values($1,$2,$3,$4,$5,$6)', [req.body.title, req.body.title_en, req.body.description, req.body.description_en, fileupload1, fileupload2]);
    if (sql?.length > 0) {
        res.redirect('/directorats');
    } else {
        res.redirect('/directorats');
    }
}


const directorat_path = async (req, res) => {
    const id_hot_cat = req.params.id;
    const sql = await executeQuery('SELECT * FROM hot_issues where hot_issue_category = $1 ', [id_hot_cat]);
    if (sql?.length > 0) {
        res.status(200).json(sql)
    } else {
        res.status(200).json({ "success": false })
    }
}

const update_directorats = async (req, res) => {
    // const a = req.body.daerah.split('-');
    // const sql = await executeQuery("update directorats set title=$1,title_en=$2,description=$3,description_en=$4,id_province=$5,province_name=$6 where id = $7",
    //     [req.body.title, req.body.title_en, req.body.description, req.body.description_en, a[0], a[1], req.body.id]);

    if (!req.files.images && !req.files.banners) {
        const sql = await executeQuery("update directorats set title=$1,title_en=$2,description=$3,description_en=$4 where id = $5",
            [req.body.title, req.body.title_en, req.body.description, req.body.description_en, req.body.id]);

        if (sql) {
            res.redirect('/directorats');
        } else {
            console.log(sql)
            res.redirect('/directorats');
        }
    } else {
        if (req.files.images) {
            const fileupload1 = site_url + "/uploads/directorat/images/" + req.files['images'][0].filename;
            const sql = await executeQuery("update directorats set title=$1,title_en=$2,description=$3,description_en=$4,images=$5 where id = $6",
                [req.body.title, req.body.title_en, req.body.description, req.body.description_en, fileupload1, req.body.id]);

            if (sql) {
                res.redirect('/directorats');
            } else {
                console.log(sql)
                res.redirect('/directorats');
            }
        }

        if (req.files.banners) {
            const fileupload2 = site_url + "/uploads/directorat/images/" + req.files['banners'][0].filename;
            const sql = await executeQuery("update directorats set title=$1,title_en=$2,description=$3,description_en=$4,directiorat_banner=$5 where id = $6",
                [req.body.title, req.body.title_en, req.body.description, req.body.description_en, fileupload2, req.body.id]);

            if (sql) {
                res.redirect('/directorats');
            } else {
                console.log(sql)
                res.redirect('/directorats');
            }
        }

        if (req.files.images && req.files.banners) {
            const fileupload1 = site_url + "/uploads/directorat/images/" + req.files['images'][0].filename;
            const fileupload2 = site_url + "/uploads/directorat/images/" + req.files['banners'][0].filename;
            const sql = await executeQuery("update directorats set title=$1,title_en=$2,description=$3,description_en=$4,images=$5,directiorat_banner=$6 where id = $7",
                [req.body.title, req.body.title_en, req.body.description, req.body.description_en, fileupload1, fileupload2, req.body.id]);

            if (sql) {
                res.redirect('/directorats');
            } else {
                console.log(sql)
                res.redirect('/directorats');
            }
        }
    }
}

const delete_direactorats = async (req, res) => {
    const idparam1 = req.params.id;
    const idparam2 = req.params.dir;
    const idparam3 = req.params.banner;
    if (fs.existsSync(fileslinux + 'directorat/images/' + idparam2) && fs.existsSync(fileslinux + 'directorat/images/' + idparam3)) {
        fs.unlink(fileslinux + 'directorat/images/' + idparam2, async function (err) {
            if (err) return console.log(err);
            fs.unlink(fileslinux + 'directorat/images/' + idparam3, async function (err) {
                if (err) return console.log(err);
                const sql = await executeQuery('DELETE FROM  directorats where id=$1', [idparam1]);
                if (sql) {
                    res.redirect('/directorats');
                } else {
                    console.log(sql)
                    res.redirect('/directorats');
                }
            });
        });
    } else {
        const sql = await executeQuery('DELETE FROM  directorats where id=$1', [idparam1]);
        if (sql) {
            res.redirect('/directorats');
        } else {
            console.log(sql)
            res.redirect('/directorats');
        }
    }
}

//:::::::::::::::::::::::::::::::::::::::::::: End Of Direktirat :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//::::::::::::::::::::::::::::::End Of Sub Category :::::::::::::::::::::::::::::::::::::::::::::::::::::

module.exports = {
  directorat,
  directorats_fe,
  directorats_fe_news,
  directorats_fe_photos,
  directorats_fe_videos,
  directorats_fe_opini,
  directorats_fe_files,
  kdeks_fe_news,
  kdeks_fe_photos,
  kdeks_fe_opini,
  kdeks_fe_files,
  directorat_details,
  directorat_devisi,
  directorat_devisi_add,
  directorats_devisi_delete,
  directorat_devisi_detail,
  directorat_devisi_update,
  insertdirectorats,
  directorat_path,
  update_directorats,
  delete_direactorats,
};
