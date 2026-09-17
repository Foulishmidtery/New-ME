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

const khas_zone = async (req, res) => {
    const result = await executeQuery("SELECT * FROM province ORDER BY id DESC ");
    let promises = result.map(async (item) => {
        return new Promise(async (resolve, reject) => {
            let zone = await executeQuery("SELECT * FROM khas_zone WHERE province = $1", [item?.id]);
            const aar = [];
            zone.forEach((elem) => {
                const ppp = {
                    "id": elem?.id,
                    "khas_zone": elem?.khas_zone,
                    "city": elem?.city,
                    "province": elem?.province,
                    "province_names": item?.province_name,
                    "inauguration": elem?.inauguration,
                    "tenant": elem?.tenant,
                    "inaugurated": elem?.inaugurated,
                    "status": elem?.status
                    // finished_date sudah dihilangkan
                }
                aar.push(ppp);
            })

            let detail = aar;
            let row = {
                "id": item?.id,
                "province_name": item?.province_name,
                "zonakhas": detail,
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

const zona_peta = async (req, res) => {
    const sql = await executeQuery('SELECT * FROM khas_zone');
    if (sql?.length > 0) {
        res.status(200).json(sql)
    } else {
        res.status(200).json({ "success": false })
    }
}

const provinces = async (req, res) => {
    const sql = await executeQuery('SELECT * FROM province');
    if (sql?.length > 0) {
        res.status(200).json(sql)
    } else {
        res.status(200).json({ "success": false })
    }
}

const provinces_detail = async (req, res) => {
    const id_p = req.params.id;
    const sql = await executeQuery('SELECT * FROM province where id = $1 ', [id_p]);
    if (sql?.length > 0) {
        res.status(200).json(sql)
    } else {
        res.status(200).json({ "success": false })
    }
}

const insertprovinces = async (req, res) => {
    const sql = await executeQuery('INSERT INTO province(province_name,code)values($1,$2)', [req.body.provinces, req.body.code]);
    if (sql?.length > 0) {
        res.redirect('/province');
    } else {
        res.redirect('/province');
    }
}

const updateprovinces = async (req, res) => {
    const sql = await executeQuery('UPDATE province set province_name=$1,code=$2 where id = $3', [req.body.province_name, req.body.code, req.body.id]);
    if (sql?.length > 0) {
        res.redirect('/province');
    } else {
        res.redirect('/province');
    }
}

const deleteprovinces = async (req, res) => {
    const idp = req.params.id;
    const sql = await executeQuery("delete from province where id = $1",
        [idp]);
    if (sql) {
        res.redirect('/province');
    } else {
        console.log(sql)
        res.redirect('/province');
    }
}

const detail_khas_zone = async (req, res) => {
    const id_khas_zone = req.params.id;
    const sql = await executeQuery('SELECT * FROM khas_zone where id = $1', [id_khas_zone]);
    if (sql?.length > 0) {
        res.status(200).json(sql)
    } else {
        res.status(200).json({ "success": false })
    }
}

const insertzonakhas = async (req, res) => {
    const status_zona = req.body.status;

    // Logika pengiriman NULL untuk tipe data DATE di PostgreSQL
    let inauguration_val = null;
    let inaugurated_val = null;

    if (status_zona === 'diresmikan') {
        // Gunakan nilai dari form, jika kosong ('') jadikan null
        inauguration_val = req.body.inauguration ? req.body.inauguration : null;
        inaugurated_val = req.body.inaugurated ? req.body.inaugurated : null;
    }

    const sql = await executeQuery("insert into khas_zone(khas_zone,city,province,inauguration,tenant,inaugurated,status) values($1,$2,$3,$4,$5,$6,$7)",
        [req.body.khas_zone, req.body.city, req.body.province, inauguration_val, req.body.tenant, inaugurated_val, status_zona]);

    if (sql) {
        res.redirect('/zk');
    } else {
        console.log(sql)
        res.redirect('/zk');
    }
}

const updatezonakhas = async (req, res) => {
    const status_zona = req.body.status;

    // Logika pengiriman NULL untuk tipe data DATE di PostgreSQL
    let inauguration_val = null;
    let inaugurated_val = null;

    if (status_zona === 'diresmikan') {
        inauguration_val = req.body.inauguration ? req.body.inauguration : null;
        inaugurated_val = req.body.inaugurated ? req.body.inaugurated : null;
    }

    const sql = await executeQuery("update khas_zone set khas_zone=$1, city=$2, province=$3, inauguration=$4, tenant=$5, inaugurated=$6, status=$7 where id = $8",
        [req.body.khas_zone, req.body.city, req.body.province, inauguration_val, req.body.tenant, inaugurated_val, status_zona, req.body.id]);

    if (sql) {
        res.redirect('/zk');
    } else {
        console.log(sql)
        res.redirect('/zk');
    }
}

const deletezonakhas = async (req, res) => {
    const id_zona_khas = req.params.id;
    const sql = await executeQuery("delete from khas_zone where id = $1",
        [id_zona_khas]);
    if (sql) {
        res.redirect('/zk');
    } else {
        console.log(sql)
        res.redirect('/zk');
    }
}

const tagging = async (req, res) => {
    const sql = await executeQuery("SELECT * FROM tagging");
    if (sql?.length > 0) {
        res.status(200).json(sql)
    } else {
        res.status(200).json({ "success": false })
    }
}

const detailtagging = async (req, res) => {
    const id_tagging = req.params.id;
    const sql = await executeQuery("SELECT * FROM tagging where id = $1 ", [id_tagging]);
    if (sql?.length > 0) {
        res.status(200).json(sql)
    } else {
        res.status(200).json({ "success": false })
    }
}


const inserttagging = async (req, res) => {
    const sql = await executeQuery("insert into tagging(tagging) values($1)",
        [req.body.tagging]);
    if (sql) {
        res.redirect('/tg');
    } else {
        console.log(sql)
        res.redirect('/tg');
    }
}

const updatetagging = async (req, res) => {
    const sql = await executeQuery("update tagging set tagging=$1 where id = $2",
        [req.body.tagging, req.body.id]);
    if (sql) {
        res.redirect('/tg');
    } else {
        console.log(sql)
        res.redirect('/tg');
    }
}

const deletetagging = async (req, res) => {
    const id_tagging = req.params.id;
    const sql = await executeQuery("delete from tagging where id = $1",
        [id_tagging]);
    if (sql) {
        res.redirect('/tg');
    } else {
        console.log(sql)
        res.redirect('/tg');
    }
}


//::::::::::::::::::::::::::::::::::::::::::::::: Start Of Slideshow :::::::::::::::::::::::::::::::::::::::::::::::::::::

module.exports = {
  khas_zone,
  zona_peta,
  provinces,
  provinces_detail,
  insertprovinces,
  updateprovinces,
  deleteprovinces,
  detail_khas_zone,
  insertzonakhas,
  updatezonakhas,
  deletezonakhas,
  tagging,
  detailtagging,
  inserttagging,
  updatetagging,
  deletetagging,
};
