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

const data_submenus = async (req, res) => {
    const sql = await executeQuery('SELECT * FROM data_submenu');
    if (sql?.length > 0) {
        res.status(200).json(sql)
    } else {
        res.status(200).json({ "success": false })
    }
}
const detail_submenus = async (req, res) => {
    const id_ss = req.params.id;
    const sql = await executeQuery('SELECT * FROM data_submenu where id_statistic = $1', [id_ss]);
    if (sql?.length > 0) {
        res.status(200).json(sql)
    } else {
        res.status(200).json([])
    }
}

const detail_submenus_edit = async (req, res) => {
    const id_sst = req.params.id;
    const sql = await executeQuery('SELECT * FROM data_submenu where id = $1', [id_sst]);
    if (sql?.length > 0) {
        res.status(200).json(sql)
    } else {
        res.status(200).json([])
    }
}

const insert_submenus = async (req, res) => {
    const ddd = req.body.menu_id.split('-');
    const sql = await executeQuery("INSERT INTO data_submenu (id_statistic,short_name,long_name,short_name_en,long_name_en,statistic_name,link_data,link_image,sub_narations,sub_narations_en)values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)",
        [ddd[0], req.body.short_name, req.body.long_name, req.body.short_name_en, req.body.long_name_en, ddd[1], req.body.link_data, req.body.link_image, req.body.narations_submenu, req.body.narations_submenu_en]);
    if (sql) {
        res.redirect('/submenu_data');
    } else {
        res.redirect('/submenu_data');
    }
}

const update_submenus = async (req, res) => {
    const sql = await executeQuery('UPDATE data_submenu set short_name = $1, short_name_en = $2, long_name = $3, long_name_en = $4, link_data = $5, link_image = $6, sub_narations= $7, sub_narations_en = $8  where id = $9', [req.body.short_name, req.body.short_name_en, req.body.long_name, req.body.long_name_en, req.body.link_data, req.body.link_image, req.body.narations_submenu, req.body.narations_submenu_en, req.body.id]);
    if (sql) {
        res.redirect('/submenu_data');
    } else {
        res.redirect('/submenu_data');
    }
}

const delete_submenus = async (req, res) => {
    const id_meta = req.params.id;
    const sql = await executeQuery('DELETE FROM data_submenu where id = $1', [id_meta]);
    if (sql?.length > 0) {
        res.redirect('/submenu_data');
    } else {
        res.redirect('/submenu_data');
    }
}

const data_dashboard = async (req, res) => {
    const sql = await executeQuery('SELECT * FROM data_dashboard');
    if (sql?.length > 0) {
        res.status(200).json(sql)
    } else {
        res.status(200).json({ "success": false })
    }
}


const detail_data_dashboard = async (req, res) => {
    const id_nar = req.params.id;
    const sql = await executeQuery('SELECT * FROM data_dashboard where id = $1', [id_nar]);
    if (sql?.length > 0) {
        res.status(200).json(sql)
    } else {
        res.status(200).json({ "success": false })
    }
}

const data_dashboard_delete = async (req, res) => {
    const id_meta = req.params.id;
    const sql = await executeQuery('DELETE FROM data_dashboard where id = $1', [id_meta]);
    if (sql?.length > 0) {
        res.redirect('/dashboard');
    } else {
        res.redirect('/dashboard');
    }
}

const insertapidashboards = async (req, res) => {
    const arraydir = req.body.directorat.toString().replace(/[{}]/g, '').split(',');
    const directr = arraydir.map(item => item.replace(/"/g, ''));
    const arraykdeks = req.body.kdeks.toString().replace(/[{}]/g, '').split(',');
    const kdeksdir = arraykdeks.map(item => item.replace(/"/g, ''));
    const arraykdataset = req.body.dataset.toString().replace(/[{}]/g, '').split(',');
    const datasetdir = arraykdataset.map(item => item.replace(/"/g, ''));
    const ddd = req.body.data_type.split('-');
    const sql = await executeQuery('INSERT INTO data_dashboard (api,statistic_id,statistic_name,sub_statistic,short_name,long_name,short_name_en,long_name_en,tagging,directorat,kdeks,publish,dataset) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)', [req.body.api, ddd[0], ddd[1], req.body.sub_statistic, req.body.shorts_name, req.body.long_name, req.body.shorts_name_en, req.body.long_name_en, req.body.taggings, directr, kdeksdir, req.body.publish, datasetdir]);
    if (sql?.length > 0) {
        res.redirect('/dashboard');
    } else {
        res.redirect('/dashboard');
    }
}


const dashboard_naration = async (req, res) => {
    const id_db = req.params.id;
    const sql = await executeQuery('select * from naration where dashboard_id = $1', [id_db]);
    if (sql?.length > 0) {
        res.status(200).json(sql)
    } else {
        res.status(200).json({ "message": false })
    }
}


const emptyapidashboard = async (req, res) => {
    const sql = await executeQuery('UPDATE data_dashboard set naration = $1, month = $2 where id = $3', ['', '', req.body.id]);
    if (sql) {
        res.status(200).json({ "message": true });
    } else {
        res.status(200).json({ "message": false });
    }
}

const updateapidashboard = async (req, res) => {
    const sql = await executeQuery('UPDATE data_dashboard set naration = $1, month = $2 where id = $3', [req.body.naration, req.body.month, req.body.id]);
    if (sql) {
        await executeQuery("INSERT INTO naration(dashboard_id,dashboard_name,description,month)values($1,$2,$3,$4)", [req.body.id, req.body.urls_name, req.body.naration, req.body.month]);
        res.status(200).json({ "message": true });
    } else {
        res.status(200).json({ "message": false });
    }
}

const data_menus = async (req, res) => {
    const sql = await executeQuery('SELECT * FROM data_menu');
    if (sql?.length > 0) {
        res.status(200).json(sql)
    } else {
        res.status(200).json({ "success": false })
    }
}

const data_menu_fe = async (req, res) => {
    const result = await executeQuery("SELECT * FROM data_menu ORDER BY data_sort ASC ");
    let promises = result.map(async (item) => {
        return new Promise(async (resolve, reject) => {
            let r = await executeQuery("SELECT * FROM data_submenu WHERE id_statistic = $1", [item.id]);
            let data_submenux = r;
            let row = {
                "id": item?.id,
                "title": item?.title,
                "title_en": item?.title_en,
                "long_title": item?.long_title,
                "long_title_en": item?.long_title_en,
                "link_menu_data": item?.link_menu_data,
                "data_sort": item?.data_sort,
                "narations_menu": item?.narations_menu,
                "narations_menu_en": item?.narations_menu_en,
                "data_submenu": data_submenux
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


const dropdown_menu = async (req, res) => {
    const result = await executeQuery("SELECT * FROM menu ORDER BY id ASC ");
    let promises = result.map(async (item) => {
        return new Promise(async (resolve, reject) => {
            let r = await executeQuery("SELECT * FROM menu_sub WHERE menu_id = $1 ORDER BY orders ASC", [item.id]);
            let sub_menux = r;
            let row = {
                "id": item?.id,
                "menu_name": item?.menu_name,
                "menu_link": item?.menu_link,
                "menu_orders": item?.orders,
                "menu_name_en": item?.menu_name_en,
                "menu_sub": sub_menux
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

const detail_data_menus = async (req, res) => {
    const id_dm = req.params.id;
    const sql = await executeQuery('SELECT * FROM data_menu where id = $1', [id_dm]);
    if (sql?.length > 0) {
        res.status(200).json(sql)
    } else {
        res.status(200).json({ "success": false })
    }
}

const insertdatamenus = async (req, res) => {
    const sql = await executeQuery("insert into data_menu(title,title_en,long_title,long_title_en,link_menu_data,data_sort,narations_menu,narations_menu_en) values($1,$2,$3,$4,$5,$6,$7,$8)",
        [req.body.title, req.body.title_en, req.body.long_title, req.body.long_title_en, req.body.link_menu_data, req.body.data_sort, req.body.narations_menu, req.body.narations_menu_en]);
    if (sql) {
        res.redirect('/menu_data');
    } else {
        console.log(sql)
        res.redirect('/menu_data');
    }
}

const updatedatamenus = async (req, res) => {
    const sql = await executeQuery('UPDATE data_menu set title = $1, title_en = $2, long_title = $3, long_title_en = $4, link_menu_data = $5, data_sort = $6, narations_menu = $7, narations_menu_en = $8  where id = $9', [req.body.title, req.body.title_en, req.body.long_title, req.body.long_title_en, req.body.link_menu_data, req.body.data_sort, req.body.narations_menu, req.body.narations_menu_en, req.body.id]);
    if (sql) {
        res.redirect('/menu_data');
    } else {
        res.redirect('/menu_data');
    }
}

const deletedatamenus = async (req, res) => {
    const id_stat = req.params.id;
    const sql = await executeQuery('DELETE FROM data_menu where id = $1 ', [id_stat]);
    if (sql) {
        res.redirect('/menu_data');
    } else {
        res.redirect('/menu_data');
    }
}

const sliders_data = async (req, res) => {
    const sql = await executeQuery('SELECT * FROM data_slider');
    if (sql?.length > 0) {
        res.status(200).json(sql)
    } else {
        res.status(200).json({ "success": false })
    }
}

const sliders_data_fe = async (req, res) => {
    const sql = await executeQuery('SELECT * FROM data_slider');
    if (sql?.length > 0) {
        res.status(200).json(sql)
    } else {
        res.status(200).json({ "success": false })
    }
}

const insertsliderdata = async (req, res) => {
    const filesimage = site_url + "/uploads/data/" + req.file.filename;
    const sql = await executeQuery('insert into data_slider(title,title_en,amount,date_created,image,link,publish) values ($1,$2,$3,$4,$5,$6,$7)', [req.body.title, req.body.title_en, req.body.amount, req.body.date_created, filesimage, req.body.link, req.body.publish]);
    if (sql) {
        res.redirect('/sliderdata');
    } else {
        res.redirect('/sliderdata');
    }
}

const detail_sliders_data = async (req, res) => {
    const id_slides = req.params.id;
    const sql = await executeQuery('SELECT * FROM data_slider where id = $1 ', [id_slides]);
    if (sql?.length > 0) {
        res.status(200).json(sql)
    } else {
        res.status(200).json({ "success": false })
    }
}

const updateslidersdata = async (req, res) => {
    if (!req.file || req.file == undefined || req.file == "") {
        const sql = await executeQuery("UPDATE data_slider set  title=$1, title_en=$2, amount=$3, date_created=$4,link=$5,publish=$6 where id = $7",
            [req.body.title, req.body.title_en, req.body.amount, req.body.date_created, req.body.link, req.body.is_published, req.body.id_sliders]);
        if (sql) {
            res.redirect('/sliderdata');
        } else {
            res.redirect('/sliderdata');
        }
    } else {
        const fileuploads = site_url + "/uploads/data/" + req.file.filename;
        const sql = await executeQuery("UPDATE data_slider set  title=$1, title_en=$2, amount=$3, date_created=$4, image = $5, link=$6, publish=$7 where id = $8",
            [req.body.title, req.body.title_en, req.body.amount, req.body.date_created, fileuploads, req.body.link, req.body.is_published, req.body.id_sliders]);
        if (sql) {
            res.redirect('/sliderdata');
        } else {
            res.redirect('/sliderdata');
        }
    }
}

const delete_slider_data = async (req, res) => {
    const id_data_slider = req.params.id;
    const image = req.params.photo;
    if (fs.existsSync(fileslinux + 'data/' + image)) {
        fs.unlink(fileslinux + 'data/' + image, async function (err) {
            if (err) return console.log(err);
            const sql = await executeQuery('DELETE FROM data_slider where id = $1 ', [id_data_slider]);
            if (sql) {
                res.redirect('/sliderdata');
            } else {
                res.redirect('/sliderdata');
                console.log(sql);
            }
        });
        console.log("ada")
    } else {
        const sql = await executeQuery('DELETE FROM data_slider where id = $1 ', [id_data_slider]);
        if (sql?.length > 0) {
            res.redirect('/sliderdata');
        } else {
            res.redirect('/sliderdata');
        }
    }
}

const sourcesdata = async (req, res) => {
    const sql = await executeQuery('SELECT * FROM sourcedata');
    if (sql?.length > 0) {
        res.status(200).json(sql)
    } else {
        res.status(200).json({ "success": false })
    }
}

const api_kneks = async (req, res) => {
    await axios.get('https://dashboard-dev.kneks.go.id/api/aus/indikator-aus', {
        headers: {
            'x-api-key': 'RnwSHSOWkAAXWN3QRO6XZppBiJSLqroCHQuYzj8LoJE992oWfbeCw3Ligxq6HJIJh83T1yo0NHRiYc4L5N1lq6HLq7bqKeek5fydZCfJUu9DEJJPV2ldhdTQQmFALO9t'
        }
    })
        .then((res) => res.data)
        .then((datas) => { res.status(200).json(datas) })
        .catch((err) => console.error(err));
}

const sourcesdatadetail = async (req, res) => {
    const id_source = req.params.id;
    const sql = await executeQuery('SELECT * FROM sourcedata where id = $1 ', [id_source]);
    if (sql?.length > 0) {
        res.status(200).json(sql)
    } else {
        res.status(200).json({ "success": false })
    }
}

const insertsourcesdata = async (req, res) => {
    // const sql = await executeQuery("insert into sourcedata(dataset,source,date_created,dataset_en) values($1,$2,$3,$4) RETURNING id",
    //     [req.body.dataset, req.body.source, '2025-01-01 00:00:00', req.body.dataset_en]);
    // sql[0].id // id terkahir
    const sql = await executeQuery("insert into sourcedata(dataset,source,date_created,dataset_en,description,produsen_data,tanggal_update,api_data) values($1,$2,$3,$4,$5,$6,$7,$8)",
        [req.body.dataset, req.body.source, '2025-01-01 00:00:00', req.body.dataset_en, req.body.descriptions, req.body.produsen_data, req.body.tanggal_update, req.body.api_database]);
    if (sql) {
        res.redirect('/dataset');
    } else {
        console.log(sql)
        res.redirect('/dataset');
    }
}

const updatesourcedata = async (req, res) => {
    const sql = await executeQuery("update sourcedata set dataset=$1,source=$2,date_created=$3,dataset_en=$4,description=$5,produsen_data=$6,tanggal_update=$7,api_data=$8 where id=$9",
        [req.body.dataset, req.body.source, '2025-01-01 00:00:00', req.body.dataset_en, req.body.descriptions, req.body.produsen_data, req.body.tanggal_update, req.body.api_database, req.body.idd]);
    if (sql) {
        res.redirect('/dataset');
    } else {
        console.log(sql)
        res.redirect('/dataset');
    }
}

const deletesourcesdata = async (req, res) => {
    const id_stat = req.params.id;
    const sql = await executeQuery('DELETE FROM sourcedata where id = $1 ', [id_stat]);
    if (sql) {
        // await executeQuery('DELETE FROM sourcedata_detail where id_sourcedata = $1 ', [id_stat]);
        res.redirect('/dataset');
    } else {
        res.redirect('/dataset');
    }
}

//:::::::::::::::::::::::::::::::::::::Start Of OPINI :::::::::::::::::::::::::::::::::::::::::::::::::


const opini = async (req, res) => {
    const sql = await executeQuery("SELECT * FROM opini")
    if (sql?.length > 0) {
        res.status(200).json(sql)
    } else {
        res.status(200).json({ "success": false })
    }
}

const opini_detail = async (req, res) => {
    const id_opini = req.params.id;
    const sql = await executeQuery("SELECT * FROM opini where id = $1 ", [id_opini]);
    if (sql?.length > 0) {
        res.status(200).json(sql)
    } else {
        res.status(200).json({ "success": false })
    }
}

const insertopini = async (req, res) => {
    const fileuploads = site_url + "/uploads/opini/" + req.file.filename;
    const sql = await executeQuery("insert into opini(title,title_en,content,content_en,web_identity,tagging,directorat,is_publish,date_created,users_id,users_name,id_province,images) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)",
        [req.body.title, req.body.title_en, req.body.content, req.body.content_en, req.body.web_identity, req.body.taggings, req.body.directorat, req.body.is_published, req.body.tanggal_opini, req.body.users_id, req.body.users_name, req.body.kdeks, fileuploads]);
    if (sql) {
        res.redirect('/opini');
    } else {
        console.log(sql)
        res.redirect('/opini');
    }
}

const deleteopini = async (req, res) => {
    const id_opini = req.params.id;
    const image = req.params.photo
    if (fs.existsSync(fileslinux + 'opini/' + image)) {
        fs.unlink(fileslinux + 'opini/' + image, async function (err) {
            if (err) return console.log(err);
            const sql = await executeQuery('DELETE FROM  opini where id = $1', [id_opini]);
            if (sql) {
                res.redirect('/opini');
            } else {
                console.log(sql)
                res.redirect('/opini');
            }
        });
        console.log("ada")
    } else {
        const sql = await executeQuery('DELETE FROM  opini where id = $1', [id_opini]);
        if (sql) {
            res.redirect('/opini');
        } else {
            console.log(sql)
            res.redirect('/opini');
        }
    }
}


const updateopini = async (req, res) => {
    if (!req.file || req.file == undefined || req.file == "") {
        const sql = await executeQuery("UPDATE opini SET title=$1,title_en=$2,content=$3,content_en=$4,tagging=$5,directorat=$6,is_publish=$7,date_created=$8,users_id=$9,users_name=$10,id_province=$11 where id = $12",
            [req.body.title, req.body.title_en, req.body.content, req.body.content_en, req.body.taggings, req.body.directorat, req.body.is_published, req.body.tanggal_opini, req.body.users_id, req.body.users_name, req.body.kdeks, req.body.id]);
        if (sql) {
            res.redirect('/opini');
        } else {
            console.log(sql)
            res.redirect('/opini');
        }
    } else {
        const fileuploads = site_url + "/uploads/opini/" + req.file.filename;
        const sql = await executeQuery("UPDATE opini SET title=$1,title_en=$2,content=$3,content_en=$4,tagging=$5,directorat=$6,is_publish=$7,date_created=$8,users_id=$9,users_name=$10,id_province=$11,images=$12 where id = $13",
            [req.body.title, req.body.title_en, req.body.content, req.body.content_en, req.body.taggings, req.body.directorat, req.body.is_published, req.body.tanggal_opini, req.body.users_id, req.body.users_name, req.body.kdeks, fileuploads, req.body.id]);
        if (sql) {
            res.redirect('/opini');
        } else {
            console.log(sql)
            res.redirect('/opini');
        }
    }
}
//::::::::::::::::::::::::::::::::::: END OF CUSTOM DATA NARATION PAGE
// :::::::::::::::::::::::::: Setting Page :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

const web_profile = async (req, res) => {
    const sql = await executeQuery("SELECT * FROM web_profile where id = 1");
    if (sql?.length > 0) {
        res.status(200).json(sql)
    } else {
        res.status(200).json({ "success": false })
    }
}

const web_profile_detail = async (req, res) => {
    const id_web = req.params.id;
    const sql = await executeQuery("SELECT * FROM web_profile where id = $1 ", [id_web]);
    if (sql?.length > 0) {
        res.status(200).json(sql)
    } else {
        res.status(200).json({ "success": false })
    }
}


const updatewebtitle = async (req, res) => {
    const sql = await executeQuery("UPDATE web_profile SET web_title=$1 where id = $2",
        [req.body.web_title, req.body.id]);
    if (sql) {
        res.redirect('/titleweb');
    } else {
        console.log(sql)
        res.redirect('/titleweb');
    }
}

const updateweblogo = async (req, res) => {
    const sql = await executeQuery("UPDATE web_profile SET web_logo=$1 where id = $2",
        [req.body.web_logo, req.body.id]);
    if (sql) {
        res.redirect('/logo');
    } else {
        console.log(sql)
        res.redirect('/logo');
    }
}

const updatewebheader = async (req, res) => {
    const sql = await executeQuery("UPDATE web_profile SET web_header=$1 where id = $2",
        [req.body.web_header, req.body.id]);
    if (sql) {
        res.redirect('/header');
    } else {
        console.log(sql)
        res.redirect('/header');
    }
}

const updatewebcolor = async (req, res) => {
    const sql = await executeQuery("UPDATE web_profile SET web_color=$1 where id = $2",
        [req.body.web_color, req.body.id]);
    if (sql) {
        res.redirect('/color');
    } else {
        console.log(sql)
        res.redirect('/color');
    }
}

const menu = async (req, res) => {
    const sql = await executeQuery('SELECT * FROM menu');
    if (sql?.length > 0) {
        res.status(200).json(sql)
    } else {
        res.status(200).json({ "success": false })
    }
}

const insertmenu = async (req, res) => {
    const sql = await executeQuery("insert into menu(menu_name,menu_link,orders,menu_name_en) values($1,$2,$3,$4)",
        [req.body.menu_name, req.body.menu_link, req.body.orders, req.body.menu_name_en]);
    if (sql) {
        res.redirect('/menu');
    } else {
        console.log(sql)
        res.redirect('/menu');
    }
}

const updatemenu = async (req, res) => {
    const sql = await executeQuery("update menu set menu_name=$1, menu_link=$2, orders=$3, menu_name_en=$4 where id = $5",
        [req.body.menu_name, req.body.menu_link, req.body.orders, req.body.menu_name_en, req.body.id]);
    if (sql) {
        res.redirect('/menu');
    } else {
        console.log(sql)
        res.redirect('/menu');
    }
}

const menu_detail = async (req, res) => {
    const id_menu = req.params.id;
    const sql = await executeQuery('SELECT * FROM menu where id = $1 ', [id_menu]);
    if (sql?.length > 0) {
        res.status(200).json(sql)
    } else {
        res.status(200).json({ "success": false })
    }
}

const submenu = async (req, res) => {
    const sql = await executeQuery('SELECT * FROM menu_sub');
    if (sql?.length > 0) {
        res.status(200).json(sql)
    } else {
        res.status(200).json({ "success": false })
    }
}

const insertsubmenu = async (req, res) => {
    const mn_id = req.body.menu_id.split('-');
    const sql = await executeQuery("insert into menu_sub(menu_id,submenu_name,submenu_link,orders,submenu_name_en,menu_name) values($1,$2,$3,$4,$5,$6)",
        [mn_id[0], req.body.submenu_name, req.body.submenu_link, req.body.orders, req.body.submenu_name_en, mn_id[1]]);
    if (sql) {
        res.redirect('/submenu');
    } else {
        console.log(sql)
        res.redirect('/submenu');
    }
}

const updatesubmenu = async (req, res) => {
    const mn_id = req.body.menu_id.split('-');
    const sql = await executeQuery("update menu_sub set menu_id = $1, submenu_name=$2, submenu_link=$3, orders=$4, submenu_name_en=$5, menu_name=$6 where id = $7",
        [mn_id[0], req.body.submenu_name, req.body.submenu_link, req.body.orders, req.body.submenu_name_en, mn_id[1], req.body.id]);
    if (sql) {
        res.redirect('/submenu');
    } else {
        console.log(sql)
        res.redirect('/submenu');
    }
}

const submenu_detail = async (req, res) => {
    const id_menu = req.params.id;
    const sql = await executeQuery('SELECT * FROM menu_sub where id = $1 ', [id_menu]);
    if (sql?.length > 0) {
        res.status(200).json(sql)
    } else {
        res.status(200).json({ "success": false })
    }
}

//:::::::::::::::::::::::::::::::::::: Puppeteer :::::::::::::::::::::::::::::::::::::::::::::::::::

const download_image_base64 = async (req, res) => {
    const urls = req.body.domain;

    if (!urls || typeof urls !== 'string') {
        return res.status(400).json({ error: "Domain URL tidak valid atau kosong." });
    }

    let browser;
    try {
        browser = await puppeteer.launch({
            executablePath: '/root/.cache/puppeteer/chrome/linux-137.0.7151.55/chrome-linux64/chrome',
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });

        const page = await browser.newPage();
        // await page.setViewport({ width: 1280, height: 768 });

        // Coba akses halaman
        await page.goto(urls);

        const screenshot = await page.screenshot({ fullPage: true, encoding: 'base64' });
        res.status(200).json({ ss: `data:image/png;base64,${screenshot}` });
    } catch (err) {
        console.error("Puppeteer error:", err.message);
        res.status(500).json({ error: "Gagal mengambil screenshot." });
    } finally {
        if (browser) await browser.close();
    }
}

// const pengunjung = (req, res) => {
//     let count = 0;
//     if (fs.existsSync("visits.json")) {
//         count = JSON.parse(fs.readFileSync("visits.json", "utf8")).count;
//     }
//     count += 1;
//     fs.writeFileSync("visits.json", JSON.stringify({ count }));
//     res.json({ totalVisits: count });
// }

const pengunjung = async (req, res) => {
    try {
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth() + 1;
        const query = `INSERT INTO visitor_stats (year, month, visitor_count)VALUES ($1, $2, 1) ON CONFLICT (year, month) DO UPDATE SET visitor_count = visitor_stats.visitor_count + 1`;
        await executeQuery(query, [year, month]);
        res.json({ status: "ok" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err });
    }
};

const pengunjung_tahunan = async (req, res) => {
    try {
        const query = `
            SELECT year, SUM(visitor_count) AS total_visitor
            FROM visitor_stats
            GROUP BY year
            ORDER BY year ASC;
        `;
        const result = await executeQuery(query);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const ambil_pengunjung = async (req, res) => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;

    const query = "SELECT * FROM visitor_stats WHERE year = $1 AND month = $2";
    const [rows] = await executeQuery(query, [year, month]);
    res.status(200).json(rows)
}

//:::::::::::::::::::::::::::::: Start Of Tax Bea Masuk :::::::::::::::::::::::::::::::::::::::::::::::::::::

const tax_bea_masuk = async (req, res) => {
  try {
    const query = `
      SELECT t.id, t.kode_kategori, m.nama_kategori, t.kode_kbli,
        t.bidang_usaha, t.jenis_barang, t.jenis_pembebasan,
        t.cakupan_barang, t.syarat, t.bea_masuk, t.pdri,
        t.keterangan, t.compliance, t.regulasi, t.insentif, t.row_num
      FROM tax_bea_masuk t
      LEFT JOIN master_kategori m ON t.kode_kategori = m.kode
      ORDER BY t.row_num ASC
    `;
    const sql = await executeQuery(query);
    res.status(200).json(sql?.length ? sql : []);
  } catch (error) {
    console.error("Error fetching tax_bea_masuk:", error);
    res.status(500).json({ success: false, message: "Terjadi kesalahan server" });
  }
};

module.exports = {
  data_submenus,
  detail_submenus,
  detail_submenus_edit,
  insert_submenus,
  update_submenus,
  delete_submenus,
  data_dashboard,
  detail_data_dashboard,
  data_dashboard_delete,
  insertapidashboards,
  dashboard_naration,
  emptyapidashboard,
  updateapidashboard,
  data_menus,
  data_menu_fe,
  dropdown_menu,
  detail_data_menus,
  insertdatamenus,
  updatedatamenus,
  deletedatamenus,
  sliders_data,
  sliders_data_fe,
  insertsliderdata,
  detail_sliders_data,
  updateslidersdata,
  delete_slider_data,
  sourcesdata,
  api_kneks,
  sourcesdatadetail,
  insertsourcesdata,
  updatesourcedata,
  deletesourcesdata,
  opini,
  opini_detail,
  insertopini,
  deleteopini,
  updateopini,
  web_profile,
  web_profile_detail,
  updatewebtitle,
  updateweblogo,
  updatewebheader,
  updatewebcolor,
  menu,
  insertmenu,
  updatemenu,
  menu_detail,
  submenu,
  insertsubmenu,
  updatesubmenu,
  submenu_detail,
  download_image_base64,
  pengunjung,
  pengunjung_tahunan,
  ambil_pengunjung,
  tax_bea_masuk,
};
