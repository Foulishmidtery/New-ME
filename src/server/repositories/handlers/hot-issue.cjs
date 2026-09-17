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

const hotissuecategory = async (req, res) => {
    const sql = await executeQuery('SELECT * FROM  hot_categories');
    if (sql?.length > 0) {
        res.status(200).json(sql)
    } else {
        res.status(200).json({ "success": false })
    }
}

const detailhotissuecategory = async (req, res) => {
    const ppp = req.params.id;
    const sql = await executeQuery('SELECT * FROM  hot_categories where id = $1 ', [ppp]);
    if (sql?.length > 0) {
        res.status(200).json(sql)
    } else {
        res.status(200).json({ "success": false })
    }
}

const inserthotissuecategory = async (req, res) => {
    const sql = await executeQuery("insert into hot_categories(title,title_en)values($1,$2)",
        [req.body.title, req.body.title_en]);

    if (sql) {
        res.redirect('/hic');
    } else {
        console.log(sql)
        res.redirect('/hic');
    }
}

const updatehotissuecategory = async (req, res) => {
    const sql = await executeQuery("update hot_categories set title=$1,title_en=$2 where id = $3",
        [req.body.title, req.body.title_en, req.body.id]);

    if (sql) {
        res.redirect('/hic');
    } else {
        console.log(sql)
        res.redirect('/hic');
    }
}

const deletehotissuecategory = async (req, res) => {
    const idcat = req.params.id;
    const sql = await executeQuery('DELETE FROM  hot_categories where id=$1', [idcat]);
    if (sql) {
        res.redirect('/hic');
    } else {
        console.log(sql)
        res.redirect('/hic');
    }
}

//::::::::::::::::::::::::::::::End Of Sub Category :::::::::::::::::::::::::::::::::::::::::::::::::::::

const hotissuesubcategory = async (req, res) => {
    const sql = await executeQuery('SELECT * FROM  hot_subcategories');
    if (sql?.length > 0) {
        res.status(200).json(sql)
    } else {
        res.status(200).json({ "success": false })
    }
}

const detailhotissuesubcategory = async (req, res) => {
    const id_sub = req.params.id;
    const sql = await executeQuery('SELECT * FROM  hot_subcategories where id = $1 ', [id_sub]);
    if (sql?.length > 0) {
        res.status(200).json(sql)
    } else {
        res.status(200).json({ "success": false })
    }
}

const inserthotissubcategory = async (req, res) => {
    const hcid = req.body.hot_category_id.split('-');
    const sql = await executeQuery("insert into hot_subcategories(title,title_en,hot_category_id,hot_category_name) values($1,$2,$3,$4)",
        [req.body.title, req.body.title_en, hcid[0], hcid[1]])
    if (sql) {
        res.redirect('/hisc');
    } else {
        console.log(sql);
        res.redirect('/hisc');
    }
}

const updatehotissuesubcategory = async (req, res) => {
    const hcid = req.body.hot_category_id.split('-');
    const sql = await executeQuery("update hot_subcategories set title=$1,title_en=$2,hot_category_id=$3,hot_category_name=$4 where id = $5",
        [req.body.title, req.body.title_en, hcid[0], hcid[1], req.body.id]);

    if (sql) {
        res.redirect('/hisc');
    } else {
        console.log(sql)
        res.redirect('/hisc');
    }
}

const deletehotissuesubcategory = async (req, res) => {
    const idsubcat = req.params.id;
    const sql = await executeQuery('DELETE FROM  hot_subcategories where id=$1', [idsubcat]);
    if (sql) {
        res.redirect('/hisc');
    } else {
        console.log(sql)
        res.redirect('/hisc');
    }
}

//:::::::::::::::::::::::::::::::::::::::::::::::::: Hot Issuee :::::::::::::::::::::::::::::::::::::::::::

const hotissue = async (req, res) => {
    const sql = await executeQuery('SELECT * FROM  hot_issues');
    if (sql?.length > 0) {
        res.status(200).json(sql)
    } else {
        res.status(200).json({ "success": false })
    }
}

const hotissue_detail = async (req, res) => {
    const id_h = req.params.id;
    const sql = await executeQuery('SELECT * FROM  hot_issues where id=$1', [id_h]);
    if (sql?.length > 0) {
        res.status(200).json(sql)
    } else {
        res.status(200).json({ "success": false })
    }
}
const inserthotissue = async (req, res) => {
    const issue_datetime = req.body.issue_datetime.replace("T", " ");
    const fileupload = site_url + "/uploads/hot_issue/" + req.file.filename;
    const rrr = req.body.sub_category_id.split('-');
    const sql = await executeQuery("insert into hot_issues(title,title_en,excerpt,excerpt_en,content,content_en,image,is_publish,hot_issue_datetime,hot_subcategory_id,tag,directorat,id_province,hot_subcategory_name) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)",
        [req.body.title, req.body.title_en, req.body.excerpt, req.body.excerpt_en, req.body.content, req.body.content_en, fileupload, req.body.is_publish, issue_datetime, rrr[0], req.body.taggings, req.body.directorat, req.body.kdeks, rrr[1]]);
    if (sql) {
        res.redirect('/hi');
    } else {
        console.log(sql);
        res.redirect('/hi');
    }
}

const updatehotissue = async (req, res) => {
    const issue_datetime = req.body.issue_datetime.replace("T", " ");
    const rrr = req.body.sub_category_id.split('-');
    if (!req.file || req.file == undefined || req.file == "") {
        const sql = await executeQuery("update hot_issues set title=$1,title_en=$2,excerpt=$3,excerpt_en=$4,content=$5,content_en=$6,is_publish=$7,hot_issue_datetime=$8,hot_subcategory_id=$9,tag=$10,directorat=$11,id_province=$12,hot_subcategory_name=$13 where id = $14",
            [req.body.title, req.body.title_en, req.body.excerpt, req.body.excerpt_en, req.body.content, req.body.content_en, req.body.is_publish, issue_datetime, rrr[0], req.body.taggings, req.body.directorat, req.body.kdeks, rrr[1], req.body.id]);
        if (sql) {
            res.redirect('/hi');
        } else {
            res.redirect('/hi');
        }
    } else {
        const fileupload = site_url + "/uploads/hot_issue/" + req.file.filename;
        const sql = await executeQuery("update hot_issues set title=$1,title_en=$2,excerpt=$3,excerpt_en=$4,content=$5,content_en=$6, image=$7, is_publish=$8,hot_issue_datetime=$9,hot_subcategory_id=$10,tag=$11,directorat=$12,id_province=$13,hot_subcategory_name=$14 where id = $15",
            [req.body.title, req.body.title_en, req.body.excerpt, req.body.excerpt_en, req.body.content, req.body.content_en, fileupload, req.body.is_publish, issue_datetime, rrr[0], req.body.taggings, req.body.directorat, req.body.kdeks, rrr[1], req.body.id]);
        if (sql) {
            res.redirect('/hi');
        } else {
            res.redirect('/hi');
        }
    }
}

const deletehotissue = async (req, res) => {
    const id_issue = req.params.id;
    const foto_issue = req.params.foto;
    if (fs.existsSync(fileslinux + 'hot_issue/' + foto_issue)) {
        fs.unlink(fileslinux + 'hot_issue/' + foto_issue, async function (err) {
            if (err) return console.log(err);
            const sql = await executeQuery('DELETE FROM hot_issues where id = $1 ', [id_issue]);
            if (sql) {
                res.redirect('/hi');
            } else {
                console.log(sql);
                res.redirect('/hi');
            }
        });
    } else {
        const sql = await executeQuery('DELETE FROM hot_issues where id = $1 ', [id_issue]);
        if (sql) {
            res.redirect('/hi');
        } else {
            console.log(sql);
            res.redirect('/hi');
        }
    }
}
//::::::::::::::::::::::::::::::End Of Hot Issue :::::::::::::::::::::::::::::::::::::::::::::::::::::
//::::::::::::::::::::::::::::::End Of ISSUE :::::::::::::::::::::::::::::::::::::::::::::::::::::
//::::::::::::::::::::::::::::::Start Of institutions :::::::::::::::::::::::::::::::::::::::::::::::::::::

module.exports = {
  hotissuecategory,
  detailhotissuecategory,
  inserthotissuecategory,
  updatehotissuecategory,
  deletehotissuecategory,
  hotissuesubcategory,
  detailhotissuesubcategory,
  inserthotissubcategory,
  updatehotissuesubcategory,
  deletehotissuesubcategory,
  hotissue,
  hotissue_detail,
  inserthotissue,
  updatehotissue,
  deletehotissue,
};
