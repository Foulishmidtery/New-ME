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

const slideshows = async (req, res) => {
    const sql = await executeQuery('SELECT * FROM  slideshow');
    if (sql?.length > 0) {
        res.status(200).json(sql)
    } else {
        res.status(200).json({ "success": false })
    }
}

const detailslideshow = async (req, res) => {
    const id_slideshow = req.params.id;
    const sql = await executeQuery('SELECT *  FROM  slideshow where id=$1', [id_slideshow]);
    if (sql?.length > 0) {
        res.status(200).json(sql)
    } else {
        res.status(200).json({ "success": false })
    }
}

const deleteslideshow = async (req, res) => {
    const id_slideshows = req.params.id;
    const sql = await executeQuery('DELETE FROM  slideshow where id = $1 ', [id_slideshows]);
    if (sql) {
        res.redirect('/b');
    } else {
        console.log(sql);
        res.redirect('/b');
    }
}

const insertslideshow = async (req, res) => {
    if (req.file) {
        const filesimage = site_url + "/uploads/slideshow/" + req.file.filename;
        const sql = await executeQuery('INSERT INTO slideshow (title,title_en,image, date_created,status, content,content_en)values($1,$2,$3,$4,$5,$6,$7) ', [req.body.title, req.body.title_en, filesimage, req.body.tanggal, req.body.status, req.body.content, req.body.content_en]);
        if (sql) {
            res.redirect('/b');
        } else {
            res.redirect('/b');
        }
    } else {
        res.redirect('/b');
    }
}

const updateslideshow = async (req, res) => {
    const id_slidshowss = req.body.id;
    if (req.file) {
        const filesimage = site_url + "/uploads/slideshow/" + req.file.filename;
        const sql = await executeQuery('UPDATE slideshow set title=$1, title_en=$2, image=$3,content = $4 ,content_en = $5 , status=$6  where  id = $7 ', [req.body.title, req.body.title_en, filesimage, req.body.content, req.body.content_en, req.body.status, id_slidshowss]);
        if (sql) {
            res.redirect('/b');
        } else {
            res.redirect('/b');
        }
    } else {
        const sql = await executeQuery('UPDATE slideshow set title=$1, title_en=$2, date_created=$3, status=$4  where  id = $5 ', [req.body.title, req.body.title_en, req.body.tanggal, req.body.status, id_slidshowss]);
        if (sql) {
            res.redirect('/b');
        } else {
            console.log(sql);
            res.redirect('/b');
        }
    }
}
//:::::::::::::::::::::::::::::::::::::::::::: End Of SlideShow :::::::::::::::::::::::::::::::::::::::::::::::::::::
//:::::::::::::::::::::::::::::::::::::::::::: Login Banner ::::::::::::::::::::::::::::::::::::::::::::::::
const login_banners = async (req, res) => {
    const sql = await executeQuery("SELECT * FROM banner where flag = 'login'");
    const array = [];
    sql.forEach((element, index) => {
        const rrr = {
            "id": element?.id,
            "name": element?.name,
            "path": element?.path,
            "date_created": element?.date_created,
            "status": element?.status,
            "imgs": element?.path?.split('/')[5],
        }
        array.push(rrr);
    })

    if (array?.length > 0) {
        res.status(200).json(array)
    } else {
        res.status(200).json({ "success": false })
    }
}

const detail_login_banners = async (req, res) => {
    const id_login = req.params.id;
    const sql = await executeQuery('SELECT * FROM banner where id = $1 ', [id_login]);
    if (sql?.length > 0) {
        res.status(200).json(sql)
    } else {
        res.status(200).json({ "success": false })
    }
}

const insertloginbanner = async (req, res) => {
    const filesimage = site_url + "/uploads/banner/" + req.file.filename;
    const sql = await executeQuery('insert into banner(name,path,flag,date_created,status) values ($1,$2,$3,$4,$5)', [req.body.names, filesimage, req.body.flag, req.body.tanggal, req.body.status]);
    if (sql) {
        res.redirect('/login_banner');
    } else {
        res.redirect('/login_banner');
    }
}

const updateloginbanners = async (req, res) => {
    if (!req.file || req.file == undefined || req.file == "") {
        const sql = await executeQuery("UPDATE banner set  name=$1, date_created=$2, status=$3 where id = $4",
            [req.body.names, req.body.tanggal, req.body.status, req.body.id_login_banner]);
        if (sql) {
            res.redirect('/login_banner');
        } else {
            res.redirect('/login_banner');
        }
    } else {
        const fileuploads = site_url + "/uploads/banner/" + req.file.filename;
        const sql = await executeQuery("UPDATE banner set  name=$1, path=$2, date_created=$3, status=$4 where id = $5",
            [req.body.names, fileuploads, req.body.tanggal, req.body.status, req.body.id_login_banner]);
        if (sql) {
            res.redirect('/login_banner');
        } else {
            res.redirect('/login_banner');
        }
    }
}

const delete_login_banner = async (req, res) => {
    const id_login = req.params.id;
    const image = req.params.foto;
    if (fs.existsSync(fileslinux + 'banner/' + image)) {
        fs.unlink(fileslinux + 'banner/' + image, async function (err) {
            if (err) return console.log(err);
            const sql = await executeQuery('DELETE FROM banner where id = $1 ', [id_login]);
            if (sql) {
                res.redirect('/login_banner');
            } else {
                res.redirect('/login_banner');
                console.log(sql);
            }
        });
        console.log("ada")
    } else {
        const sql = await executeQuery('DELETE FROM banner where id = $1 ', [id_login]);
        if (sql?.length > 0) {
            res.redirect('/login_banner');
        } else {
            res.redirect('/login_banner');
        }
    }
}

//::::::::::::::::::::::::::::::::::::::::::::::::::: End Login Banner :::::::::::::::::::::::::::::::::::::::::::
//::::::::::::::::::::::::::::::::::::::::::::::::::: Start Struktur Logo Banner :::::::::::::::::::::::::::::::::::::::::::
const slogo = async (req, res) => {
    const sql = await executeQuery("SELECT * FROM banner where flag = 's_logo'");
    const array = [];
    sql.forEach((element, index) => {
        const rrr = {
            "id": element?.id,
            "name": element?.name,
            "path": element?.path,
            "date_created": element?.date_created,
            "status": element?.status,
            "imgs": element?.path?.split('/')[5],
        }
        array.push(rrr);
    })

    if (array?.length > 0) {
        res.status(200).json(array)
    } else {
        res.status(200).json({ "success": false })
    }
}

const detail_slogo = async (req, res) => {
    const id_slogo = req.params.id;
    const sql = await executeQuery('SELECT * FROM banner where id = $1 ', [id_slogo]);
    if (sql?.length > 0) {
        res.status(200).json(sql)
    } else {
        res.status(200).json({ "success": false })
    }
}

const inserts_slogo = async (req, res) => {
    const filesimage = site_url + "/uploads/banner/" + req.file.filename;
    const sql = await executeQuery('insert into banner(name,path,flag,date_created,status) values ($1,$2,$3,$4,$5)', [req.body.names, filesimage, req.body.flag, req.body.tanggal, req.body.status]);
    if (sql?.length > 0) {
        res.redirect('/s_logo');
    } else {
        res.redirect('/s_logo');
    }
}

const updates_slogo = async (req, res) => {
    if (!req.file || req.file == undefined || req.file == "") {
        const sql = await executeQuery("UPDATE banner set  name=$1, date_created=$2, status=$3 where id = $4",
            [req.body.names, req.body.tanggal, req.body.status, req.body.id_s_logo_banner]);
        if (sql) {
            res.redirect('/s_logo');
        } else {
            res.redirect('/s_logo');
        }
    } else {
        const fileuploads = site_url + "/uploads/banner/" + req.file.filename;
        const sql = await executeQuery("UPDATE banner set  name=$1, path=$2, date_created=$3, status=$4 where id = $5",
            [req.body.names, fileuploads, req.body.tanggal, req.body.status, req.body.id_s_logo_banner]);
        if (sql) {
            res.redirect('/s_logo');
        } else {
            res.redirect('/s_logo');
        }
    }
}

const delete_slogos = async (req, res) => {
    const id_logo = req.params.id;
    const image = req.params.foto;
    if (fs.existsSync(fileslinux + 'banner/' + image)) {
        fs.unlink(fileslinux + 'banner/' + image, async function (err) {
            if (err) return console.log(err);
            const sql = await executeQuery('DELETE FROM banner where id = $1 ', [id_logo]);
            if (sql) {
                res.redirect('/s_logo');
            } else {
                res.redirect('/s_logo');
                console.log(sql);
            }
        });
        console.log("ada")
    } else {
        const sql = await executeQuery('DELETE FROM banner where id = $1 ', [id_logo]);
        if (sql?.length > 0) {
            res.redirect('/s_logo');
        } else {
            res.redirect('/s_logo');
        }
    }
}
//::::::::::::::::::::::::::::::::::::::::::::::::::: End Of Struktur Logo :::::::::::::::::::::::::::::::::::::::
//::::::::::::::::::::::::::::::::::::::::::::::::::: Start Of Welcome Banner ::::::::::::::::::::::::::::::::::::::
const welcome_pages = async (req, res) => {
    const sql = await executeQuery("SELECT * FROM banner where flag = 'welcome'");
    const array = [];
    sql.forEach((element, index) => {
        const rrr = {
            "id": element?.id,
            "name": element?.name,
            "path": element?.path,
            "date_created": element?.date_created,
            "status": element?.status,
            "imgs": element?.path?.split('/')[5],
        }
        array.push(rrr);
    })

    if (array?.length > 0) {
        res.status(200).json(array)
    } else {
        res.status(200).json({ "success": false })
    }
}

const insert_welcome_pages = async (req, res) => {
    const filesimage = site_url + "/uploads/banner/" + req.file.filename;
    const sql = await executeQuery('insert into banner(name,path,flag,date_created,status) values ($1,$2,$3,$4,$5)', [req.body.names, filesimage, req.body.flag, req.body.tanggal, req.body.status]);
    if (sql) {
        res.redirect('/welcomebanner');
    } else {
        res.redirect('/welcomebanner');
    }
}
const detail_welcome_pages = async (req, res) => {
    const id_welc = req.params.id;
    const sql = await executeQuery('SELECT * FROM banner where id = $1 ', [id_welc]);
    if (sql?.length > 0) {
        res.status(200).json(sql)
    } else {
        res.status(200).json({ "success": false })
    }
}

const update_welcome_pages = async (req, res) => {
    if (!req.file || req.file == undefined || req.file == "") {
        const sql = await executeQuery("UPDATE banner set  name=$1, date_created=$2, status=$3 where id = $4",
            [req.body.names, req.body.tanggal, req.body.status, req.body.id_welcome]);
        if (sql) {
            res.redirect('/welcomebanner');
        } else {
            res.redirect('/welcomebanner');
        }
    } else {
        const fileuploads = site_url + "/uploads/banner/" + req.file.filename;
        const sql = await executeQuery("UPDATE banner set  name=$1, path=$2, date_created=$3, status=$4 where id = $5",
            [req.body.names, fileuploads, req.body.tanggal, req.body.status, req.body.id_welcome]);
        if (sql) {
            res.redirect('/welcomebanner');
        } else {
            res.redirect('/welcomebanner');
        }
    }
}

const delete_welcome_page = async (req, res) => {
    const id_welc = req.params.id;
    const image = req.params.foto;
    if (fs.existsSync(fileslinux + 'banner/' + image)) {
        fs.unlink(fileslinux + 'banner/' + image, async function (err) {
            if (err) return console.log(err);
            const sql = await executeQuery('DELETE FROM banner where id = $1 ', [id_welc]);
            if (sql) {
                res.redirect('/welcomebanner');
            } else {
                res.redirect('/welcomebanner');
                console.log(sql);
            }
        });
        console.log("ada")
    } else {
        const sql = await executeQuery('DELETE FROM banner where id = $1 ', [id_welc]);
        if (sql?.length > 0) {
            res.redirect('/welcomebanner');
        } else {
            res.redirect('/welcomebanner');
        }
    }
}
//:::::::::::::::::::::::::::::: End Of Welcome Banner  :::::::::::::::::::::::::::::::::::::::::::::::::::::::

module.exports = {
  slideshows,
  detailslideshow,
  deleteslideshow,
  insertslideshow,
  updateslideshow,
  login_banners,
  detail_login_banners,
  insertloginbanner,
  updateloginbanners,
  delete_login_banner,
  slogo,
  detail_slogo,
  inserts_slogo,
  updates_slogo,
  delete_slogos,
  welcome_pages,
  insert_welcome_pages,
  detail_welcome_pages,
  update_welcome_pages,
  delete_welcome_page,
};
