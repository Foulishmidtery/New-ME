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

const structure = async (req, res) => {
    const sql = await executeQuery("SELECT * FROM  pejabat order by id ASC");
    if (sql?.length > 0) {
        const array = [];
        sql?.forEach((items, index) => {
            const bbb = {
                "id": items?.id,
                "name": items?.name,
                "position": items?.position,
                "position_en": items?.position_en,
                "photo": items?.photo,
                "pht": items?.photo?.split('/')[5],
                "description": items?.description,
                "description_en": items?.description_en,
                "is_publish": items?.is_publish,
                "level": items?.level
            };
            array.push(bbb);
        })
        res.status(200).json(array)
    } else {
        res.status(200).json({ "success": false })
    }

}
// he.encode(req.body.description)
const inserstructure = async (req, res) => {
    const fileuploads = site_url + "/uploads/structure/" + req.file.filename;
    const sql = await executeQuery("insert into pejabat(name,position,position_en,photo,description,description_en,is_publish, organization, directorat, head) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)",
        [req.body.name, req.body.position, req.body.position_en, fileuploads, req.body.description, req.body.description_en, req.body.is_published, req.body.organization ?? "", req.body.directorat ?? "", req.body.head ?? ""]);
    if (sql) {
        res.redirect('/s');
    } else {
        console.log(sql);
        res.redirect('/s');
    }
}

const deletestructure = async (req, res) => {
    const id_pejabat = req.params.id;
    const foto_pejabat = req.params.foto;

    if (fs.existsSync(fileslinux + 'structure/' + foto_pejabat)) {
        fs.unlink(fileslinux + 'structure/' + foto_pejabat, async function (err) {
            if (err) return console.log(err);
            const sql = await executeQuery("DELETE FROM  pejabat where id=$1", [id_pejabat]);
            if (sql) {
                res.redirect('/s');
            } else {
                console.log(sql)
                res.redirect('/s');
            }
        });
    } else {
        const sql = await executeQuery("DELETE FROM  pejabat where id=$1", [id_pejabat]);
        if (sql) {
            res.redirect('/s');
        } else {
            console.log(sql);
        }
    }

}

const detailstructure = async (req, res) => {
    const id_abouts = req.params.id;
    const sql = await executeQuery('SELECT *  FROM  pejabat where id=$1', [id_abouts]);
    if (sql?.length > 0) {
        res.status(200).json(sql)
    } else {
        res.status(200).json({ "success": false })
    }
}

const updatestructure = async (req, res) => {
    if (!req.file || req.file == "" || req.file == undefined) {
        const sql = await executeQuery("update pejabat set name=$1,position=$2,position_en=$3,description=$4,description_en=$5,is_publish=$6,organization=$7,directorat=$8,head=$9,x=$10,facebook=$11,linkedin=$12,instagram=$13 where id = $14",
            [req.body.name, req.body.position, req.body.position_en, req.body.description, req.body.description_en, req.body.is_published, req.body.organization ?? "", req.body.directorat ?? "", req.body.head ?? "", req.body.x ?? "-", req.body.facebook ?? "-", req.body.linkedin ?? "-", req.body.instagram ?? "-", req.body.id]);
        if (sql) {
            res.redirect('/s');
        } else {
            res.redirect('/s');
        }
    } else {
        const fileuploads = site_url + "/uploads/structure/" + req.file.filename;
        const sql = await executeQuery("update pejabat set name=$1,position=$2,position_en=$3,photo=$4,description=$5, description_en=$6,is_publish=$7,organization=$8,directorat=$9,head=$10,x=$11,facebook=$12,linkedin=$13,instagram=$14  where id=$15",
            [req.body.name, req.body.position, req.body.position_en, fileuploads, req.body.description, req.body.description_en, req.body.is_published, req.body.organization ?? "", req.body.directorat ?? "", req.body.head ?? "", req.body.x ?? "-", req.body.facebook ?? "-", req.body.linkedin ?? "-", req.body.instagram ?? "-", req.body.id]);
        if (sql) {
            res.redirect('/s');
        } else {
            res.redirect('/s');
        }
    }
}

//::::::::::::::::::::::::::::::::: Start Anggota ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

const anggota = async (req, res) => {
    const sql = await executeQuery("SELECT * FROM  anggota order by id ASC");
    if (sql?.length > 0) {
        const array = [];
        sql?.forEach((items, index) => {
            const bbb = {
                "id": items?.id,
                "name": items?.name,
                "position": items?.position,
                "position_en": items?.position_en,
                "photo": items?.photo,
                "pht": items?.photo?.split('/')[5],
                "description": items?.description,
                "description_en": items?.description_en,
                "is_publish": items?.is_publish,
                "level": items?.level
            };
            array.push(bbb);
        })
        res.status(200).json(array)
    } else {
        res.status(200).json({ "success": false })
    }

}
// he.encode(req.body.description)
const insertanggota = async (req, res) => {
    const fileuploads = site_url + "/uploads/structure/" + req.file.filename;
    const sql = await executeQuery("insert into anggota(name,position,position_en,photo,description,description_en,is_publish, organization, directorat, head, id_pejabat) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)",
        [req.body.name, req.body.position, req.body.position_en, fileuploads, req.body.description, req.body.description_en, req.body.is_published, req.body.organization ?? "", req.body.directorat ?? "", req.body.head ?? "", req.body.id_pejabat]);
    if (sql) {
        res.redirect('/anggota');
    } else {
        console.log(sql);
        res.redirect('/anggota');
    }
}

const deleteanggota = async (req, res) => {
    const id_pejabat = req.params.id;
    const foto_pejabat = req.params.foto;

    if (fs.existsSync(fileslinux + 'structure/' + foto_pejabat)) {
        fs.unlink(fileslinux + 'structure/' + foto_pejabat, async function (err) {
            if (err) return console.log(err);
            const sql = await executeQuery("DELETE FROM  anggota where id=$1", [id_pejabat]);
            if (sql) {
                res.redirect('/anggota');
            } else {
                console.log(sql)
                res.redirect('/anggota');
            }
        });
    } else {
        const sql = await executeQuery("DELETE FROM  anggota where id=$1", [id_pejabat]);
        if (sql) {
            res.redirect('/anggota');
        } else {
            console.log(sql);
        }
    }

}

const detailanggota = async (req, res) => {
    const id_abouts = req.params.id;
    const sql = await executeQuery('SELECT *  FROM  anggota where id=$1', [id_abouts]);
    if (sql?.length > 0) {
        res.status(200).json(sql)
    } else {
        res.status(200).json({ "success": false })
    }
}

const updateanggota = async (req, res) => {
    if (!req.file || req.file == "" || req.file == undefined) {
        const sql = await executeQuery("update anggota set name=$1,position=$2,position_en=$3,description=$4,description_en=$5,is_publish=$6,organization=$7,directorat=$8,head=$9,id_pejabat=$10,x=$11,facebook=$12,linkedin=$13,instagram=$14 where id = $15",
            [req.body.name, req.body.position, req.body.position_en, req.body.description, req.body.description_en, req.body.is_published, req.body.organization ?? "", req.body.directorat ?? "", req.body.head ?? "", req.body.id_pejabat, req.body.x ?? "-", req.body.facebook ?? "-", req.body.linkedin ?? "-", req.body.instagram ?? "-", req.body.id]);
        if (sql) {
            res.redirect('/anggota');
        } else {
            res.redirect('/anggota');
        }
    } else {
        const fileuploads = site_url + "/uploads/structure/" + req.file.filename;
        const sql = await executeQuery("update anggota set name=$1,position=$2,position_en=$3,photo=$4,description=$5, description_en=$6,is_publish=$7,organization=$8,directorat=$9,head=$10,id_pejabat=$11,x=$12,facebook=$13,linkedin=$14,instagram=$15  where id=$16",
            [req.body.name, req.body.position, req.body.position_en, fileuploads, req.body.description, req.body.description_en, req.body.is_published, req.body.organization ?? "", req.body.directorat ?? "", req.body.head ?? "", req.body.id_pejabat, req.body.x ?? "-", req.body.facebook ?? "-", req.body.linkedin ?? "-", req.body.instagram ?? "-", req.body.id]);
        if (sql) {
            res.redirect('/anggota');
        } else {
            res.redirect('/anggota');
        }
    }
}

//::::::::::::::::::::::::::::::::: Start Sub Anggota ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

const subanggota = async (req, res) => {
    const sql = await executeQuery("SELECT * FROM  sub_anggota order by id ASC");
    if (sql?.length > 0) {
        const array = [];
        sql?.forEach((items, index) => {
            const bbb = {
                "id": items?.id,
                "name": items?.name,
                "position": items?.position,
                "position_en": items?.position_en,
                "photo": items?.photo,
                "pht": items?.photo?.split('/')[5],
                "description": items?.description,
                "description_en": items?.description_en,
                "is_publish": items?.is_publish,
                "level": items?.level
            };
            array.push(bbb);
        })
        res.status(200).json(array)
    } else {
        res.status(200).json({ "success": false })
    }

}
// he.encode(req.body.description)
const insertsubanggota = async (req, res) => {
    const fileuploads = site_url + "/uploads/structure/" + req.file.filename;
    const sql = await executeQuery("insert into sub_anggota(name,position,position_en,photo,description,description_en,is_publish, organization, directorat, head, id_anggota) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)",
        [req.body.name, req.body.position, req.body.position_en, fileuploads, req.body.description, req.body.description_en, req.body.is_published, req.body.organization ?? "", req.body.directorat ?? "", req.body.head ?? "", req.body.id_anggota]);
    if (sql) {
        res.redirect('/sub_anggota');
    } else {
        console.log(sql);
        res.redirect('/sub_anggota');
    }
}

const deletesubanggota = async (req, res) => {
    const id_pejabat = req.params.id;
    const foto_pejabat = req.params.foto;

    if (fs.existsSync(fileslinux + 'structure/' + foto_pejabat)) {
        fs.unlink(fileslinux + 'structure/' + foto_pejabat, async function (err) {
            if (err) return console.log(err);
            const sql = await executeQuery("DELETE FROM  sub_anggota where id=$1", [id_pejabat]);
            if (sql) {
                res.redirect('/sub_anggota');
            } else {
                console.log(sql)
                res.redirect('/sub_anggota');
            }
        });
    } else {
        const sql = await executeQuery("DELETE FROM  sub_anggota where id=$1", [id_pejabat]);
        if (sql) {
            res.redirect('/sub_anggota');
        } else {
            console.log(sql);
        }
    }

}

const detailsubanggota = async (req, res) => {
    const id_abouts = req.params.id;
    const sql = await executeQuery('SELECT *  FROM  sub_anggota where id=$1', [id_abouts]);
    if (sql?.length > 0) {
        res.status(200).json(sql)
    } else {
        res.status(200).json({ "success": false })
    }
}

const updatesubanggota = async (req, res) => {
    if (!req.file || req.file == "" || req.file == undefined) {
        const sql = await executeQuery("update sub_anggota set name=$1,position=$2,position_en=$3,description=$4,description_en=$5,is_publish=$6,organization=$7,directorat=$8,head=$9,id_anggota=$10,x=$11,facebook=$12,linkedin=$13,instagram=$14 where id = $15",
            [req.body.name, req.body.position, req.body.position_en, req.body.description, req.body.description_en, req.body.is_published, req.body.organization ?? "", req.body.directorat ?? "", req.body.head ?? "", req.body.id_anggota, req.body.x ?? "-", req.body.facebook ?? "-", req.body.linkedin ?? "-", req.body.instagram ?? "-", req.body.id]);
        if (sql) {
            res.redirect('/sub_anggota');
        } else {
            res.redirect('/sub_anggota');
        }
    } else {
        const fileuploads = site_url + "/uploads/structure/" + req.file.filename;
        const sql = await executeQuery("update sub_anggota set name=$1,position=$2,position_en=$3,photo=$4,description=$5, description_en=$6,is_publish=$7,organization=$8,directorat=$9,head=$10,id_anggota=$11,x=$12,facebook=$13,linkedin=$14,instagram=$15  where id=$16",
            [req.body.name, req.body.position, req.body.position_en, fileuploads, req.body.description, req.body.description_en, req.body.is_published, req.body.organization ?? "", req.body.directorat ?? "", req.body.head ?? "", req.body.id_anggota, req.body.x ?? "-", req.body.facebook ?? "-", req.body.linkedin ?? "-", req.body.instagram ?? "-", req.body.id]);
        if (sql) {
            res.redirect('/sub_anggota');
        } else {
            res.redirect('/sub_anggota');
        }
    }
}

const multi_structure = async (req, res) => {
    try {
        const og = await executeQuery("SELECT * FROM pejabat where id = 1 or id = 7 ORDER BY id ASC");
        const ag = await executeQuery("SELECT * FROM anggota order by id ASC");
        const sag = await executeQuery("SELECT * FROM sub_anggota");

        const result = og.map(ogs => ({
            id: ogs.id,
            name: ogs.name,
            position: ogs.position,
            photo: ogs.photo,
            web_identity: ogs.web_identity,
            description: ogs.description,
            is_publish: ogs.is_publish,
            position_en: ogs.position_en,
            description_en: ogs.description_en,
            organization: ogs.organization,
            directorat: ogs.directorat,
            head: ogs.head,
            ag: ag
                .filter(ags => ags.id_pejabat === ogs.id)
                .map(ags => ({
                    id: ags.id,
                    name: ags.name,
                    position: ags.position,
                    photo: ags.photo,
                    web_identity: ags.web_identity,
                    description: ags.description,
                    is_publish: ags.is_publish,
                    position_en: ags.position_en,
                    description_en: ags.description_en,
                    organization: ags.organization,
                    directorat: ags.directorat,
                    head: ags.head,
                    sag: sag.filter(t => t.id_anggota === ags.id)
                }))
        }));

        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Terjadi kesalahan server" });
    }
}


const detail_multi_structure = async (req, res) => {
    const sql = await executeQuery("SELECT * FROM  " + req.query.tbl + " where id = $1", [req.query.keyid]);
    if (sql?.length > 0) {
        res.status(200).json(sql)
    } else {
        res.status(200).json({ "success": false })
    }
}

//::::::::::::::::::::::::::::::End Of Structure :::::::::::::::::::::::::::::::::::::::::::::::::::::
//::::::::::::::::::::::::::::::Start Of DIREKTORAT :::::::::::::::::::::::::::::::::::::::::::::::::::::

module.exports = {
  structure,
  inserstructure,
  deletestructure,
  detailstructure,
  updatestructure,
  anggota,
  insertanggota,
  deleteanggota,
  detailanggota,
  updateanggota,
  subanggota,
  insertsubanggota,
  deletesubanggota,
  detailsubanggota,
  updatesubanggota,
  multi_structure,
  detail_multi_structure,
};
