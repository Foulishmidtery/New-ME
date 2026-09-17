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

const agendas = async (req, res) => {
    const sql = await executeQuery('SELECT * FROM  agendas order by agenda_datetime desc');
    if (sql?.length > 0) {
        res.status(200).json(sql)
    } else {
        res.status(200).json({ "success": false })
    }
}


const agenda_graph = async (req, res) => {
    const result = await executeQuery("SELECT * FROM db_event ORDER BY id DESC ");
    let promises = result.map(async (item) => {
        return new Promise(async (resolve, reject) => {
            let wil = await executeQuery("SELECT count(province) as wilayah FROM agendas WHERE organizer LIKE '%" + item?.name + "%'");
            let particip = await executeQuery("SELECT count(participants) as participants FROM agendas WHERE organizer LIKE '%" + item?.name + "%'");
            let kegt = await executeQuery("SELECT count(organizer) as kegiatan FROM agendas WHERE organizer LIKE '%" + item?.name + "%'");
            let detail1 = wil[0];
            let detail2 = particip[0];
            let detail3 = kegt[0];
            let row = {
                "key": item?.name,
                "data": {
                    "totalKegiatan": detail1?.wilayah,
                    "totalPeserta": detail2?.participants,
                    "totalWilayah": detail3?.kegiatan
                }
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

const search_agenda = async (req, res) => {
    const sql = await executeQuery("SELECT * FROM  agendas where organizer LIKE '%" + req.query.cari + "%'");
    if (sql?.length > 0) {
        res.status(200).json(sql)
    } else {
        res.status(200).json({ "success": false })
    }
}

const agendadetails = async (req, res) => {
    const id_agenda = req.params.id;
    const sql = await executeQuery('SELECT * FROM  agendas where id = $1 ', [id_agenda]);
    if (sql?.length > 0) {
        res.status(200).json(sql)
    } else {
        res.status(200).json({ "success": false })
    }
}

const insertagenda = async (req, res) => {
    const today = new Date();
    const month = (today.getMonth() + 1);
    const mmm = month.length < 2 ? "0" + month : month;
    const date = today.getFullYear() + '-' + mmm + '-' + today.getDate();
    const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    const time_datetime = date + ' ' + time;
    const agenda_datetime = req.body.agenda_datetime.replace("T", " ");
    const sql = await executeQuery("insert into agendas(title,title_en,url, agenda_datetime ,place,organizer, link, project , description, agenda_endtime, manager, contributor, indicator, impact, opening, participants, area, loc,priority_participants,kbli, age, gender, province, created_at, updated_at) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25)",
        [req.body.title, req.body.title_en, req.body.url, agenda_datetime, req.body.place, req.body.organizer, req.body.link, req.body.project, req.body.description, req.body.agenda_endtime, req.body.manager, req.body.contributor, req.body.indicator, req.body.impact, req.body.opening, req.body.participants, req.body.area, req.body.loc, req.body.priority_participants, req.body.kbli, req.body.age, req.body.gender, req.body.province, time_datetime, time_datetime]);
    if (sql) {
        res.redirect('/a');
    } else {
        console.log(sql)
        res.redirect('/a');
    }
}

const deleteagenda = async (req, res) => {
    const id_agenda = req.params.id;
    const sql = await executeQuery('DELETE FROM agendas where id = $1 ', [id_agenda]);
    if (sql) {
        res.redirect('/a');
    } else {
        console.log(sql);
        res.redirect('/a');
    }
}

const updateagenda = async (req, res) => {

    const today = new Date();
    const month = (today.getMonth() + 1);
    const mmm = month.length < 2 ? "0" + month : month;
    const date = today.getFullYear() + '-' + mmm + '-' + today.getDate();
    const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    const agendadatetime = date + ' ' + time;

    const sql = await executeQuery("update agendas set title=$1, title_en=$2, url=$3, agenda_datetime=$4, place=$5, organizer=$6, link=$7, project=$8 , description=$9, agenda_endtime=$10, manager=$11, contributor=$12, indicator=$13, impact=$14, opening=$15, participants=$16, area=$17, loc=$18,priority_participants=$19,kbli=$20, age=$21, gender=$22, province=$23, created_at=$24, updated_at=$25 where id = $26",
        [req.body.title, req.body.title_en, req.body.url, req.body.agenda_datetime, req.body.place, req.body.organizer, req.body.link, req.body.project, req.body.description, req.body.agenda_endtime, req.body.manager, req.body.contributor, req.body.indicator, req.body.impact, req.body.opening, req.body.participants, req.body.area, req.body.loc, req.body.priority_participants, req.body.kbli, req.body.age, req.body.gender, req.body.province, agendadatetime, agendadatetime, req.body.id]);
    if (sql) {
        res.redirect('/a');
    } else {
        console.log(sql);
        res.redirect('/a');
    }
}

//::::::::::::::::::::::::::::::End Of Agenda :::::::::::::::::::::::::::::::::::::::::::::::::::::
//::::::::::::::::::::::::::::::Start Of FILES :::::::::::::::::::::::::::::::::::::::::::::::::::::
const files = async (req, res) => {
    const role_id_users = req.cookies.roles_id;
    if (role_id_users == '6') {
        const sql = await executeQuery("SELECT * FROM  files where web_identity = 'kdeks'");
        if (sql?.length > 0) {
            const array = [];
            sql?.forEach((items, index) => {
                const bbb = {
                    "id": items?.id,
                    "title": items?.title,
                    "title_en": items?.title_en,
                    "date": items?.date,
                    "file": items?.file,
                    "content": items?.content,
                    "content_en": items?.content_en,
                    "is_publish": items?.is_publish,
                    "report_category_id": items?.report_category_id,
                    "report_category_name": items?.report_category_name,
                    "fl": items?.file?.split('/')[5],
                    "wtiter": items?.writer,
                    "synopsis": items?.synopsis,
                    "isbn": items?.isbn,
                    "number_of_pages": items?.number_of_pages,
                    "width": items?.width,
                    "height": items?.height,
                    "tagging": items?.tagging,
                    "directorat": items?.directorat,
                    "id_province": items?.id_province,
                    "users_name": items?.users_name
                };
                array.push(bbb);
            })
            res.status(200).json(array)
        } else {
            res.status(200).json({ "success": false })
        }
    } else {
        const sql = await executeQuery("SELECT * FROM  files where web_identity = 'kneks'");
        if (sql?.length > 0) {
            const array = [];
            sql?.forEach((items, index) => {
                const bbb = {
                    "id": items?.id,
                    "title": items?.title,
                    "title_en": items?.title_en,
                    "date": items?.date,
                    "file": items?.file,
                    "content": items?.content,
                    "content_en": items?.content_en,
                    "is_publish": items?.is_publish,
                    "report_category_id": items?.report_category_id,
                    "report_category_name": items?.report_category_name,
                    "fl": items?.file?.split('/')[5],
                    "wtiter": items?.writer,
                    "synopsis": items?.synopsis,
                    "isbn": items?.isbn,
                    "number_of_pages": items?.number_of_pages,
                    "width": items?.width,
                    "height": items?.height,
                    "tagging": items?.tagging,
                    "directorat": items?.directorat,
                    "id_province": items?.id_province,
                    "users_name": items?.users_name
                };
                array.push(bbb);
            })
            res.status(200).json(array)
        } else {
            res.status(200).json({ "success": false })
        }
    }
}

const filesdetails = async (req, res) => {
    const id_files = req.params.id;
    const sql = await executeQuery('SELECT * FROM  files where id = $1 ', [id_files]);
    if (sql?.length > 0) {
        res.status(200).json(sql)
    } else {
        res.status(200).json({ "success": false })
    }
}

const insertfileupload = async (req, res) => {
    const file_date = req.body.date;
    const fileuploads = site_url + "/uploads/filesupload/" + req.file.filename;
    const bbb = req.body.file_category_id.split('-');
    const sql = await executeQuery("insert into files(title,title_en,content,content_en,file,is_publish,date,report_category_id,report_category_name,writer,publisher,synopsis,isbn,number_of_pages,width,height,tagging,directorat,id_province,users_id,users_name,passcode,downloadable) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23)",
        [req.body.title, req.body.title_en, req.body.content, req.body.content_en, fileuploads, req.body.is_publish, file_date, bbb[0], bbb[1], req.body.writer, req.body.publisher, req.body.synopsis, req.body.isbn, req.body.number_of_pages, req.body.width, req.body.height, req.body.taggings, req.body.directorat, req.body.kdeks, req.body.users_id, req.body.users_name, req.body.passcode, req.body.downloadable]);
    if (sql) {
        res.redirect('/f');
    } else {
        console.log(sql);
        res.redirect('/f');
    }
}

const updatefileupload = async (req, res) => {
    const file_date = req.body.date;
    const bbb = req.body.file_category_id.split('-');
    if (!req.file || req.file == undefined || req.file == "") {
        const sql = await executeQuery("update files set title=$1,title_en=$2,content=$3,content_en=$4,is_publish=$5,date=$6,report_category_id=$7,report_category_name=$8,writer=$9,publisher=$10,synopsis=$11,isbn=$12,number_of_pages=$13,width=$14,height=$15,tagging=$16,directorat=$17,id_province=$18,users_id=$19,users_name=$20,passcode=$21, downloadable=$22 where id = $23",
            [req.body.title, req.body.title_en, req.body.content, req.body.content_en, req.body.is_publish, file_date, bbb[0], bbb[1], req.body.writer, req.body.publisher, req.body.synopsis, req.body.isbn, req.body.number_of_pages, req.body.width, req.body.height, req.body.taggings, req.body.directorat, req.body.kdeks, req.body.users_id, req.body.users_name, req.body.passcode, req.body.downloadable, req.body.id]);
        if (sql) {
            res.redirect('/f');
        } else {
            res.redirect('/f');
        }
    } else {
        const fileuploads = site_url + "/uploads/filesupload/" + req.file.filename;
        const sql = await executeQuery("update files set title=$1,title_en=$2,content=$3,content_en=$4, file=$5, is_publish=$6,date=$7,report_category_id=$8,report_category_name=$9,writer=$10,publisher=$11,synopsis=$12,isbn=$13,number_of_pages=$14,width=$15,height=$16,tagging=$17,directorat=$18,id_province=$19,users_id=$20,users_name=$21,passcode=$22, downloadable=$23 where id = $24",
            [req.body.title, req.body.title_en, req.body.content, req.body.content_en, fileuploads, req.body.is_publish, file_date, bbb[0], bbb[1], req.body.writer, req.body.publisher, req.body.synopsis, req.body.isbn, req.body.number_of_pages, req.body.width, req.body.height, req.body.taggings, req.body.directorat, req.body.kdeks, req.body.users_id, req.body.users_name, req.body.passcode, req.body.downloadable, req.body.id]);
        if (sql) {
            res.redirect('/f');
        } else {
            res.redirect('/f');
        }
    }
}

const deletefileupload = async (req, res) => {
    const id_files = req.params.id;
    const file_upload = req.params.file;
    if (fs.existsSync(fileslinux + 'filesupload/' + file_upload)) {
        fs.unlink(fileslinux + 'filesupload/' + file_upload, async function (err) {
            if (err) return console.log(err);
            const sql = await executeQuery('DELETE FROM files where id = $1 ', [id_files]);
            if (sql) {
                res.redirect('/f');
            } else {
                console.log(sql);
                res.redirect('/f');
            }
        });
    } else {
        const sql = await executeQuery('DELETE FROM files where id = $1 ', [id_files]);
        if (sql) {
            res.redirect('/f');
        } else {
            res.redirect('/f');
        }
    }

}

const files_category = async (req, res) => {
    const sql = await executeQuery('SELECT * FROM  files_categories order by id asc');
    if (sql?.length > 0) {
        res.status(200).json(sql)
    } else {
        res.status(200).json({ "success": false })
    }
}

const files_category_details = async (req, res) => {
    const id_files_category = req.params.id;
    const sql = await executeQuery('SELECT * FROM  files_categories where id = $1 ', [id_files_category]);
    if (sql?.length > 0) {
        res.status(200).json(sql)
    } else {
        res.status(200).json({ "success": false })
    }
}

const insertfilecategorydetails = async (req, res) => {
    const sql = await executeQuery("insert into files_categories(title,title_en) values($1,$2)",
        [req.body.title, req.body.title_en]);
    if (sql) {
        res.redirect('/fc');
    } else {
        console.log(sql)
        res.redirect('/fc');
    }
}

const deletefilecategorydetail = async (req, res) => {
    const id_files_category = req.params.id;
    const sql = await executeQuery('DELETE FROM files_categories where id = $1 ', [id_files_category]);
    if (sql) {
        res.redirect('/fc');
    } else {
        console.log(sql);
        res.redirect('/fc');
    }
}

const updatefilescategory = async (req, res) => {
    const id_files_category = req.body.id;
    const sql = await executeQuery('UPDATE files_categories set title=$1, title_en=$2 where id = $3 ', [req.body.title, req.body.title_en, id_files_category]);
    if (sql) {
        res.redirect('/fc');
    } else {
        console.log(sql);
        res.redirect('/fc');
    }
}

//::::::::::::::::::::::::::::::End Of Files :::::::::::::::::::::::::::::::::::::::::::::::::::::
//::::::::::::::::::::::::::::::Start Of News:::::::::::::::::::::::::::::::::::::::::::::::::::::

module.exports = {
  agendas,
  agenda_graph,
  search_agenda,
  agendadetails,
  insertagenda,
  deleteagenda,
  updateagenda,
  files,
  filesdetails,
  insertfileupload,
  updatefileupload,
  deletefileupload,
  files_category,
  files_category_details,
  insertfilecategorydetails,
  deletefilecategorydetail,
  updatefilescategory,
};
