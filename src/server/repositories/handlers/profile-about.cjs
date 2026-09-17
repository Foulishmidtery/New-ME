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

const es_abouts = async (req, res) => {
    const sql = await executeQuery("SELECT * FROM abouts where web_identity = 'ekonomi_syariah'");
    if (sql?.length > 0) {
        res.status(200).json(sql)
    } else {
        res.status(200).json({ "success": false })
    }
}

const es_detailabouts = async (req, res) => {
    const id_abouts = req.params.id;
    const sql = await executeQuery('SELECT *  FROM  abouts where id = $1', [id_abouts]);
    if (sql?.length > 0) {
        res.status(200).json(sql)
    } else {
        res.status(200).json({ "success": false })
    }
}

const es_updateabouts = async (req, res) => {
    if (!req.file) {
        const sql = await executeQuery('UPDATE abouts set about = $1,about_en = $2,history=$3 , history_en = $4 , about_content = $5, about_content_en = $6 , history_content = $7, history_content_en = $8 , legal_foundation = $9 , legal_foundation_en = $10, legal_foundation_content = $11 , legal_foundation_content_en = $12, logo_philosophy = $13 , logo_philosophy_en = $14 , logo_philosophy_content = $15, logo_philosophy_content_en = $16 , kneks_task = $17, kneks_task_en = $18 , kneks_task_content = $19 , kneks_task_content_en = $20, function = $21 , function_en = $22, function_content = $23 , function_content_en = $24 where id = $25', [req.body.about, req.body.about_en, req.body.history, req.body.history_en, req.body.about_content, req.body.about_content_en, req.body.history_content, req.body.history_content_en, req.body.legal_foundation, req.body.legal_foundation_en, req.body.legal_foundation_content, req.body.legal_foundation_content_en, req.body.logo_philosophy, req.body.logo_philosophy_en, req.body.logo_philosophy_content, req.body.logo_philosophy_content_en, req.body.kneks_task, req.body.kneks_task_en, req.body.kneks_task_content, req.body.kneks_task_content_en, req.body.function, req.body.function_en, req.body.function_content, req.body.function_content_en, req.body.id]);
        if (sql) {
            res.redirect('/es');
        } else {
            console.log(sql)
            res.redirect('/es');
        }
    } else {
        const fileuploads = site_url + "/uploads/profile/" + req.file.filename;
        const sql = await executeQuery('UPDATE abouts set about = $1,about_en = $2,history=$3 , history_en = $4 , about_content = $5, about_content_en = $6 , history_content = $7, history_content_en = $8 , legal_foundation = $9 , legal_foundation_en = $10, legal_foundation_content = $11 , legal_foundation_content_en = $12, logo_philosophy = $13 , logo_philosophy_en = $14 , logo_philosophy_content = $15, logo_philosophy_content_en = $16 , kneks_task = $17, kneks_task_en = $18 , kneks_task_content = $19 , kneks_task_content_en = $20, function = $21 , function_en = $22, function_content = $23 , function_content_en = $24, images=$25 where id = $26', [req.body.about, req.body.about_en, req.body.history, req.body.history_en, req.body.about_content, req.body.about_content_en, req.body.history_content, req.body.history_content_en, req.body.legal_foundation, req.body.legal_foundation_en, req.body.legal_foundation_content, req.body.legal_foundation_content_en, req.body.logo_philosophy, req.body.logo_philosophy_en, req.body.logo_philosophy_content, req.body.logo_philosophy_content_en, req.body.kneks_task, req.body.kneks_task_en, req.body.kneks_task_content, req.body.kneks_task_content_en, req.body.function, req.body.function_en, req.body.function_content, req.body.function_content_en, fileuploads, req.body.id]);
        if (sql) {
            res.redirect('/es');
        } else {
            console.log(sql)
            res.redirect('/es');
        }
    }
}
//:::::::::::::::::::::::::::::::::: End Of Ekonomi Syariah ::::::::::::::::::::::::::::::::::::::::::
//::::::::::::::::::::::::::::::Start Of Abouts :::::::::::::::::::::::::::::::::::::::::::::::::::::
const abouts = async (req, res) => {
    const sql = await executeQuery("SELECT * FROM abouts where web_identity = 'kneks'");
    if (sql?.length > 0) {
        res.status(200).json(sql)
    } else {
        res.status(200).json({ "success": false })
    }
}


const detailabout = async (req, res) => {
    const id_abouts = req.params.id;
    const sql = await executeQuery('SELECT *  FROM  abouts where id = $1', [id_abouts]);
    if (sql?.length > 0) {
        res.status(200).json(sql)
    } else {
        res.status(200).json({ "success": false })
    }
}

const updateabouts = async (req, res) => {
    if (!req.file) {
        const sql = await executeQuery('UPDATE abouts set about = $1,about_en = $2,history=$3 , history_en = $4 , about_content = $5, about_content_en = $6 , history_content = $7, history_content_en = $8 , legal_foundation = $9 , legal_foundation_en = $10, legal_foundation_content = $11 , legal_foundation_content_en = $12, logo_philosophy = $13 , logo_philosophy_en = $14 , logo_philosophy_content = $15, logo_philosophy_content_en = $16 , kneks_task = $17, kneks_task_en = $18 , kneks_task_content = $19 , kneks_task_content_en = $20, function = $21 , function_en = $22, function_content = $23 , function_content_en = $24 where id = $25', [req.body.about, req.body.about_en, req.body.history, req.body.history_en, req.body.about_content, req.body.about_content_en, req.body.history_content, req.body.history_content_en, req.body.legal_foundation, req.body.legal_foundation_en, req.body.legal_foundation_content, req.body.legal_foundation_content_en, req.body.logo_philosophy, req.body.logo_philosophy_en, req.body.logo_philosophy_content, req.body.logo_philosophy_content_en, req.body.kneks_task, req.body.kneks_task_en, req.body.kneks_task_content, req.body.kneks_task_content_en, req.body.function, req.body.function_en, req.body.function_content, req.body.function_content_en, req.body.id]);
        if (sql) {
            res.redirect('/es');
        } else {
            console.log(sql)
            res.redirect('/es');
        }
    } else {
        const fileuploads = site_url + "/uploads/profile/" + req.file.filename;
        const sql = await executeQuery('UPDATE abouts set about = $1,about_en = $2,history=$3 , history_en = $4 , about_content = $5, about_content_en = $6 , history_content = $7, history_content_en = $8 , legal_foundation = $9 , legal_foundation_en = $10, legal_foundation_content = $11 , legal_foundation_content_en = $12, logo_philosophy = $13 , logo_philosophy_en = $14 , logo_philosophy_content = $15, logo_philosophy_content_en = $16 , kneks_task = $17, kneks_task_en = $18 , kneks_task_content = $19 , kneks_task_content_en = $20, function = $21 , function_en = $22, function_content = $23 , function_content_en = $24, images=$25 where id = $26', [req.body.about, req.body.about_en, req.body.history, req.body.history_en, req.body.about_content, req.body.about_content_en, req.body.history_content, req.body.history_content_en, req.body.legal_foundation, req.body.legal_foundation_en, req.body.legal_foundation_content, req.body.legal_foundation_content_en, req.body.logo_philosophy, req.body.logo_philosophy_en, req.body.logo_philosophy_content, req.body.logo_philosophy_content_en, req.body.kneks_task, req.body.kneks_task_en, req.body.kneks_task_content, req.body.kneks_task_content_en, req.body.function, req.body.function_en, req.body.function_content, req.body.function_content_en, fileuploads, req.body.id]);
        if (sql) {
            res.redirect('/es');
        } else {
            console.log(sql)
            res.redirect('/es');
        }
    }
}

const deleteabout = async (req, res) => {
    const id_abouts = req.params.id;
    const sql = await executeQuery("DELETE FROM  abouts where web_identity = 'kdeks'");
    if (sql) {
        res.redirect('/tk');
    } else {
        res.redirect('/tk');
    }
}

//::::::::::::::::::::::::::::::::::::::::::::::::::: KDEKS ABOUTS :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
const abouts_kdeks_list = async (req, res) => {
    const sql = await executeQuery("SELECT * FROM abouts where web_identity = 'kdeks'");
    res.status(200).json(sql)
}

const abouts_kdeks = async (req, res) => {
    const sql = await executeQuery("SELECT * FROM abouts where web_identity = 'kdeks' and tag = 'about'");
    res.status(200).json(sql)
}

const history_kdeks = async (req, res) => {
    const sql = await executeQuery("SELECT * FROM abouts where web_identity = 'kdeks' and tag = 'history'");
    res.status(200).json(sql)
}

const updateaboutskdeks = async (req, res) => {
    const sql = await executeQuery('UPDATE abouts set about = $1,about_en = $2,history=$3 , history_en = $4 , about_content = $5, about_content_en = $6 , history_content = $7, history_content_en = $8 , legal_foundation = $9 , legal_foundation_en = $10, legal_foundation_content = $11 , legal_foundation_content_en = $12, logo_philosophy = $13 , logo_philosophy_en = $14 , logo_philosophy_content = $15, logo_philosophy_content_en = $16 , kneks_task = $17, kneks_task_en = $18 , kneks_task_content = $19 , kneks_task_content_en = $20, function = $21 , function_en = $22, function_content = $23 , function_content_en = $24 where id = $25', [req.body.about, req.body.about_en, req.body.history, req.body.history_en, req.body.about_content, req.body.about_content_en, req.body.history_content, req.body.history_content_en, req.body.legal_foundation, req.body.legal_foundation_en, req.body.legal_foundation_content, req.body.legal_foundation_content_en, req.body.logo_philosophy, req.body.logo_philosophy_en, req.body.logo_philosophy_content, req.body.logo_philosophy_content_en, req.body.kneks_task, req.body.kneks_task_en, req.body.kneks_task_content, req.body.kneks_task_content_en, req.body.function, req.body.function_en, req.body.function_content, req.body.function_content_en, req.body.id]);
    if (sql) {
        res.redirect('/kdeks');
    } else {
        console.log(sql)
        res.redirect('/kdeks');
    }
}

const deleteaboutkdeks = async (req, res) => {
    const sql = await executeQuery('DELETE FROM abouts where id = $1', [req.params.id]);
    if (sql) {
        res.redirect('/kdeks');
    } else {
        console.log(sql)
        res.redirect('/kdeks');
    }
}
//::::::::::::::::::::::::::::::End Of Abouts :::::::::::::::::::::::::::::::::::::::::::::::::::::
//::::::::::::::::::::::::::::::::::::::::::::::::::: Start KDEKS:::::::::::::::::::::::::::::::::::::::::::::::

const maps_kdeks = async (req, res) => {
    try {
        // Query JOIN tabel kdeks dan province
        const query = `
            SELECT 
                k.id AS id_kdeks, 
                k.id_province, 
                p.province_name, 
                p.code AS bps_code, 
                k.images,
                CASE 
                    WHEN k.images IS NOT NULL AND k.images != '' THEN true 
                    ELSE false 
                END AS has_image
            FROM 
                kdeks k
            JOIN 
                province p ON k.id_province = p.id
        `;

        // Gunakan executeQuery sama seperti fungsi lainnya
        const results = await executeQuery(query);

        // Return response JSON
        res.status(200).json({
            success: true,
            data: results // executeQuery biasanya langsung me-return array datanya
        });

    } catch (error) {
        console.error("Error fetching maps_kdeks:", error);
        res.status(500).json({ success: false, message: "Terjadi kesalahan server" });
    }
}



module.exports = {
  es_abouts,
  es_detailabouts,
  es_updateabouts,
  abouts,
  detailabout,
  updateabouts,
  deleteabout,
  abouts_kdeks_list,
  abouts_kdeks,
  history_kdeks,
  updateaboutskdeks,
  deleteaboutkdeks,
  maps_kdeks,
};
