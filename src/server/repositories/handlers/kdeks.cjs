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

const kdeks = async (req, res) => {
    //rifqi
    const role_id_users = req.cookies.roles_id;
    const roles_prov = req.cookies.id_province;
    if (role_id_users == 1 || role_id_users == 2) {
        const sql = await executeQuery("SELECT * FROM kdeks");
        if (sql?.length > 0) {
            res.status(200).json(sql)
        } else {
            res.status(200).json({ "success": false })
        }
    } else {
        const sql = await executeQuery("SELECT * FROM kdeks where id_province = $1", [roles_prov]);
        if (sql?.length > 0) {
            res.status(200).json(sql)
        } else {
            res.status(200).json({ "success": false })
        }
    }
}

const detailkdeks = async (req, res) => {
    const id_kdeks = req.params.id;
    const sql = await executeQuery('SELECT *  FROM  kdeks where id = $1', [id_kdeks]);
    if (sql?.length > 0) {
        res.status(200).json(sql)
    } else {
        res.status(200).json({ "success": false })
    }
}

// const insertkdeks = async (req, res) => {
//     const ggg = req.body.id_province.split('-');

//     if (!req.files || (!req.files.photo && !req.files.sk && !req.files.structure)) {
//         const sql = `INSERT INTO kdeks (title, id_province, province_name, twitter, facebook, linkedin, instagram, youtube, address, phone_number, fax, email, historys, abouts, maps) 
//                      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)`;

//         const values = [req.body.title, ggg[0], ggg[1], req.body.twitter, req.body.facebook, req.body.linkedin, req.body.instagram, req.body.youtube, req.body.address, req.body.phone_number, req.body.fax, req.body.email, req.body.historys, req.body.abouts, req.body.maps];

//         const result = await executeQuery(sql, values);
//         res.redirect('/master');

//     } else {
//         const fileuploads = req.files['photo'] ? site_url + "/uploads/kdeks/" + req.files['photo'][0].filename : null;
//         const skuploads = req.files['sk'] ? site_url + "/uploads/kdeks/" + req.files['sk'][0].filename : null;
//         const str = req.files['structure'] ? site_url + "/uploads/kdeks/" + req.files['structure'][0].filename : null;

//         const sql = `INSERT INTO kdeks (title, images, id_province, province_name, structure, sk, twitter, facebook, linkedin, instagram, youtube, address, phone_number, fax, email, historys, abouts, maps) 
//                      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)`;

//         const values = [req.body.title, fileuploads, ggg[0], ggg[1], str, skuploads, req.body.twitter, req.body.facebook, req.body.linkedin, req.body.instagram, req.body.youtube, req.body.address, req.body.phone_number, req.body.fax, req.body.email, req.body.historys, req.body.abouts, req.body.maps];

//         const result = await executeQuery(sql, values);
//         res.redirect('/master');
//     }
// }

const insertkdeks = async (req, res) => {
    const ggg = req.body.id_province.split('-');

    const fileuploads = req.files['photo'] ? site_url + "/uploads/kdeks/" + req.files['photo'][0].filename : null;
    const skuploads = req.files['sk'] ? site_url + "/uploads/kdeks/" + req.files['sk'][0].filename : null;
    const str = req.files['structure'] ? site_url + "/uploads/kdeks/" + req.files['structure'][0].filename : null;
    const sql = `INSERT INTO kdeks (
        title, images, id_province, province_name, structure, sk, 
        twitter, facebook, linkedin, instagram, youtube, 
        address, phone_number, fax, email, historys, abouts, maps, officials
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)`;

    const values = [
        req.body.title, fileuploads, ggg[0], ggg[1], str, skuploads,
        req.body.twitter, req.body.facebook, req.body.linkedin, req.body.instagram, req.body.youtube,
        req.body.address, req.body.phone_number, req.body.fax, req.body.email,
        req.body.historys, req.body.abouts, req.body.maps, req.body.officials
    ];

    try {
        await executeQuery(sql, values);
        res.redirect('/master');
    } catch (error) {
        console.error("Gagal Insert KDEKS:", error);
        res.redirect('/master');
    }
}

// const updatekdeks = async (req, res) => {
//     const ggg = req.body.id_province.split('-');
//     if (!req.files.photo || !req.files.sk || !req.files.structure) {
//         const sql = await executeQuery("UPDATE kdeks set title=$1,id_province=$2,province_name=$3,twitter=$4,facebook=$5,linkedin=$6,instagram=$7,youtube=$8,address=$9,phone_number=$10,fax=$11,email=$12,maps=$13,abouts=$14,historys=$15 where id =$16  ", [req.body.title, ggg[0], ggg[1], req.body.twitter, req.body.facebook, req.body.linkedin, req.body.instagram, req.body.youtube, req.body.address, req.body.phone_number, req.body.fax, req.body.email, req.body.maps, req.body.abouts, req.body.historys, req.body.id]);
//         if (sql) {
//             res.redirect('/master');
//         } else {
//             res.redirect('/master');
//         }
//     } else {
//         if (req.files.photo) {
//             const fileuploads = site_url + "/uploads/kdeks/" + req.files['photo'][0].filename;
//             const sql = await executeQuery("UPDATE kdeks set title=$1,images=$2,id_province=$3,province_name=$4,twitter=$5,facebook=$6,linkedin=$7,instagram=$8,youtube=$9,address=$10,phone_number=$11,fax=$12,email=$13,maps=$14,abouts=$15,historys=$16 where id =$17  ", [req.body.title, fileuploads, ggg[0], ggg[1], req.body.twitter, req.body.facebook, req.body.linkedin, req.body.instagram, req.body.youtube, req.body.address, req.body.phone_number, req.body.fax, req.body.email, req.body.maps, req.body.abouts, req.body.historys, req.body.id]);
//             if (sql) {
//                 res.redirect('/master');
//             } else {
//                 res.redirect('/master');
//             }
//         }
//         if (req.files.sk) {
//             const skuploads = site_url + "/uploads/kdeks/" + req.files['sk'][0].filename;
//             const sql = await executeQuery("UPDATE kdeks set title=$1,sk=$2,id_province=$3,province_name=$4,twitter=$5,facebook=$6,linkedin=$7,instagram=$8,youtube=$9,address=$10,phone_number=$11,fax=$12,email=$13,maps=$14,abouts=$15,historys=$16 where id =$17  ", [req.body.title, skuploads, ggg[0], ggg[1], req.body.twitter, req.body.facebook, req.body.linkedin, req.body.instagram, req.body.youtube, req.body.address, req.body.phone_number, req.body.fax, req.body.email, req.body.maps, req.body.abouts, req.body.historys, req.body.id]);
//             if (sql) {
//                 res.redirect('/master');
//             } else {
//                 res.redirect('/master');
//             }
//         }
//         if (req.files.structure) {
//             const str = site_url + "/uploads/kdeks/" + req.files['structure'][0].filename;
//             const sql = await executeQuery("UPDATE kdeks set title=$1,structure=$2,id_province=$3,province_name=$4,twitter=$5,facebook=$6,linkedin=$7,instagram=$8,youtube=$9,address=$10,phone_number=$11,fax=$12,email=$13,maps=$14,abouts=$15,historys=$16 where id =$17  ", [req.body.title, str, ggg[0], ggg[1], req.body.twitter, req.body.facebook, req.body.linkedin, req.body.instagram, req.body.youtube, req.body.address, req.body.phone_number, req.body.fax, req.body.email, req.body.maps, req.body.abouts, req.body.historys, req.body.id]);
//             if (sql) {
//                 res.redirect('/master');
//             } else {
//                 res.redirect('/master');
//             }
//         }
//         if (req.files.photo && req.files.sk && req.files.structure) {
//             const fileuploads = site_url + "/uploads/kdeks/" + req.files['photo'][0].filename;
//             const skuploads = site_url + "/uploads/kdeks/" + req.files['sk'][0].filename;
//             const str = site_url + "/uploads/kdeks/" + req.files['structure'][0].filename;
//             const sql = await executeQuery("UPDATE kdeks set title=$1,images=$2,id_province=$3,province_name=$4,structure=$5,sk=$6,twitter=$7,facebook=$8,linkedin=$9,instagram=$10,youtube=$11,address=$12,phone_number=$13,fax=$14,email=$15,maps=$16,abouts=$17,historys=$18 where id =$19  ", [req.body.title, fileuploads, ggg[0], ggg[1], str, skuploads, req.body.twitter, req.body.facebook, req.body.linkedin, req.body.instagram, req.body.youtube, req.body.address, req.body.phone_number, req.body.fax, req.body.email, req.body.maps, req.body.abouts, req.body.historys, req.body.id]);
//             if (sql) {
//                 res.redirect('/master');
//             } else {
//                 res.redirect('/master');
//             }
//         }
//     }
// }

const updatekdeks = async (req, res) => {
    try {
        const ggg = req.body.id_province.split('-');
        const id_kdeks = req.body.id;
        const dataLama = await executeQuery("SELECT images, sk, structure FROM kdeks WHERE id = $1", [id_kdeks]);

        const fileuploads = req.files['photo'] ? site_url + "/uploads/kdeks/" + req.files['photo'][0].filename : dataLama[0].images;
        const skuploads = req.files['sk'] ? site_url + "/uploads/kdeks/" + req.files['sk'][0].filename : dataLama[0].sk;
        const struploads = req.files['structure'] ? site_url + "/uploads/kdeks/" + req.files['structure'][0].filename : dataLama[0].structure;
        const sql = `UPDATE kdeks SET 
            title=$1, images=$2, id_province=$3, province_name=$4, structure=$5, sk=$6, 
            twitter=$7, facebook=$8, linkedin=$9, instagram=$10, youtube=$11, 
            address=$12, phone_number=$13, fax=$14, email=$15, maps=$16, 
            abouts=$17, historys=$18, officials=$19 
            WHERE id=$20`;

        const values = [
            req.body.title, fileuploads, ggg[0], ggg[1], struploads, skuploads,
            req.body.twitter, req.body.facebook, req.body.linkedin, req.body.instagram, req.body.youtube,
            req.body.address, req.body.phone_number, req.body.fax, req.body.email, req.body.maps,
            req.body.abouts, req.body.historys, req.body.officials, id_kdeks
        ];

        await executeQuery(sql, values);
        res.redirect('/master');
    } catch (error) {
        console.error("Gagal Update KDEKS:", error);
        res.redirect('/master');
    }
}

const deletekdeks = async (req, res) => {
    const id_kdeks = req.params.id;
    const foto_kdeks = req.params.foto;

    if (fs.existsSync(fileslinux + 'kdeks/provinsi/' + foto_kdeks)) {
        fs.unlink(fileslinux + 'kdeks/provinsi/' + foto_kdeks, async function (err) {
            if (err) return console.log(err);
            const sql = await executeQuery("DELETE FROM  kdeks where id=$1", [id_kdeks]);
            if (sql) {
                res.redirect('/master');
            } else {
                res.redirect('/master');
            }
        });
    } else {
        const sql = await executeQuery("DELETE FROM  kdeks where id=$1", [id_kdeks]);
        if (sql) {
            res.redirect('/master');
        } else {
            res.redirect('/master');
        }
    }

}

// const about_province_kdeks = async (req, res) => {
//     const id_province = req.params.id;
//     const arr = [];
//     const sql = await executeQuery("SELECT *  FROM  kdeks where id_province = $1 AND web_identity = 'kdeks'", [id_province]);
//     if (sql?.length > 0) {
//         console.log(sql)
//         const rows = {
//             "id": sql[0]?.id,
//             "title": sql[0]?.title,
//             "title_en": sql[0]?.title_en,
//             "abouts": sql[0]?.abouts,
//             "abouts_en": sql[0]?.abouts_en,
//             "historys": sql[0]?.historys,
//             "historys_en": sql[0]?.historys_en,
//             "web_identity": sql[0]?.web_identity,
//             "id_province": sql[0]?.id_province,
//             "images": sql[0]?.images,
//             "province_name": sql[0]?.province_name,
//             "structure": sql[0]?.structure,
//             "sk": sql[0]?.sk,
//             "twitter": sql[0]?.twitter,
//             "facebook": sql[0]?.facebook,
//             "linkedin": sql[0]?.linkedin,
//             "instagram": sql[0]?.instagram,
//             "youtube": sql[0]?.youtube,
//             "address": sql[0]?.address,
//             "phone_number": sql[0]?.phone_number,
//             "fax": sql[0]?.fax,
//             "email": sql[0]?.email,
//             "maps": sql[0]?.maps
//         }
//         arr.push(rows);
//         res.status(200).json(arr)
//     } else {
//         res.status(200).json([])
//     }
// }

const about_province_kdeks = async (req, res) => {
    const id_province = req.params.id;
    const arr = [];
    const sql = await executeQuery("SELECT *  FROM  kdeks where id_province = $1 AND web_identity = 'kdeks'", [id_province]);
    if (sql?.length > 0) {
        console.log(sql)
        const rows = {
            "id": sql[0]?.id,
            "title": sql[0]?.title,
            "title_en": sql[0]?.title_en,
            "abouts": sql[0]?.abouts,
            "abouts_en": sql[0]?.abouts_en,
            "historys": sql[0]?.historys,
            "historys_en": sql[0]?.historys_en,
            "web_identity": sql[0]?.web_identity,
            "id_province": sql[0]?.id_province,
            "images": sql[0]?.images,
            "province_name": sql[0]?.province_name,
            "structure": sql[0]?.structure,
            "sk": sql[0]?.sk,
            "twitter": sql[0]?.twitter,
            "facebook": sql[0]?.facebook,
            "linkedin": sql[0]?.linkedin,
            "instagram": sql[0]?.instagram,
            "youtube": sql[0]?.youtube,
            "address": sql[0]?.address,
            "phone_number": sql[0]?.phone_number,
            "fax": sql[0]?.fax,
            "email": sql[0]?.email,
            "maps": sql[0]?.maps,
            "officials": sql[0]?.officials
        }
        arr.push(rows);
        res.status(200).json(arr)
    } else {
        res.status(200).json([])
    }
}

const history_province_kdeks = async (req, res) => {
    const id_province = req.params.id;
    const arr = [];
    const sql = await executeQuery("SELECT *  FROM  kdeks where id_province = $1 AND web_identity = 'kdeks' ", [id_province]);
    if (sql?.length > 0) {
        const rows = {
            "id": sql[0]?.id,
            "title": sql[0]?.title,
            "title_en": sql[0]?.title_en,
            "abouts": sql[0]?.abouts,
            "abouts_en": sql[0]?.abouts_en,
            "historys": sql[0]?.historys,
            "historys_en": sql[0]?.historys_en,
            "web_identity": sql[0]?.web_identity,
            "id_province": sql[0]?.id_province,
            "images": sql[0]?.images,
        }
        arr.push(rows);
        res.status(200).json(arr)
    } else {
        res.status(200).json([])
    }
}

// :::::::::::::::::::::::::::::::::::::::: Star Of Pejabat Anggota dan Sub Anggota KDEKS :::::::::::::::::::::::::::::::::::::

//::::::::::::::::::::::::::::::Start Of Structure :::::::::::::::::::::::::::::::::::::::::::::::::::::
const structurekdeks = async (req, res) => {
    const sql = await executeQuery("SELECT * FROM  pejabat_kdeks order by id ASC");
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
                "level": items?.level,
                "id_prov": items?.id_province,
                "name_prov": items?.name_province
            };
            array.push(bbb);
        })
        res.status(200).json(array)
    } else {
        res.status(200).json({ "success": false, "data": [] })
    }

}
// he.encode(req.body.description)
const inserstructurekdeks = async (req, res) => {
    const splitprov = req.body.id_provincet.split('-');
    const fileuploads = site_url + "/uploads/structure_kdeks/" + req.file.filename;
    const sql = await executeQuery("insert into pejabat_kdeks(name,position,position_en,photo,description,description_en,is_publish, organization, directorat, head, id_province, name_province) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)",
        [req.body.name, req.body.position, req.body.position_en, fileuploads, req.body.description, req.body.description_en, req.body.is_published, req.body.organization ?? "", req.body.directorat ?? "", req.body.head ?? "", splitprov[0], splitprov[1]]);
    if (sql) {
        res.redirect('/s_kdeks');
    } else {
        console.log(sql);
        res.redirect('/s_kdeks');
    }
}

const deletestructurekdeks = async (req, res) => {
    const id_pejabat = req.params.id;
    const foto_pejabat = req.params.foto;

    if (fs.existsSync(fileslinux + 'structure_kdeks/' + foto_pejabat)) {
        fs.unlink(fileslinux + 'structure_kdeks/' + foto_pejabat, async function (err) {
            if (err) return console.log(err);
            const sql = await executeQuery("DELETE FROM  pejabat_kdeks where id=$1", [id_pejabat]);
            if (sql) {
                res.redirect('/s_kdeks');
            } else {
                console.log(sql)
                res.redirect('/s_kdeks');
            }
        });
    } else {
        const sql = await executeQuery("DELETE FROM  pejabat_kdeks where id=$1", [id_pejabat]);
        if (sql) {
            res.redirect('/s_kdeks');
        } else {
            console.log(sql);
        }
    }

}

const detailstructurekdeks = async (req, res) => {
    const id_kd = req.params.id;
    const sql = await executeQuery('SELECT *  FROM  pejabat_kdeks where id=$1', [id_kd]);
    if (sql?.length > 0) {
        res.status(200).json(sql)
    } else {
        res.status(200).json({ "success": false })
    }
}

const updatestructurekdeks = async (req, res) => {
    const splitprov = req.body.id_province.split('-');
    if (!req.file || req.file == "" || req.file == undefined) {
        const sql = await executeQuery("update pejabat_kdeks set name=$1,position=$2,position_en=$3,description=$4,description_en=$5,is_publish=$6,organization=$7,directorat=$8,head=$9,x=$10,facebook=$11,linkedin=$12,instagram=$13,id_province=$14,name_province=$15 where id = $16",
            [req.body.name, req.body.position, req.body.position_en, req.body.description, req.body.description_en, req.body.is_published, req.body.organization ?? "", req.body.directorat ?? "", req.body.head ?? "", req.body.x ?? "-", req.body.facebook ?? "-", req.body.linkedin ?? "-", req.body.instagram ?? "-", splitprov[0] ?? "0", splitprov[1] ?? "0", req.body.id]);
        if (sql) {
            res.redirect('/s_kdeks');
        } else {
            res.redirect('/s_kdeks');
        }
    } else {
        const fileuploads = site_url + "/uploads/structure_kdeks/" + req.file.filename;
        const sql = await executeQuery("update pejabat_kdeks set name=$1,position=$2,position_en=$3,photo=$4,description=$5, description_en=$6,is_publish=$7,organization=$8,directorat=$9,head=$10,x=$11,facebook=$12,linkedin=$13,instagram=$14,id_province=$15, name_province=$16  where id=$17",
            [req.body.name, req.body.position, req.body.position_en, fileuploads, req.body.description, req.body.description_en, req.body.is_published, req.body.organization ?? "", req.body.directorat ?? "", req.body.head ?? "", req.body.x ?? "-", req.body.facebook ?? "-", req.body.linkedin ?? "-", req.body.instagram ?? "-", splitprov[0] ?? "0", splitprov[1] ?? "0", req.body.id]);
        if (sql) {
            res.redirect('/s_kdeks');
        } else {
            res.redirect('/s_kdeks');
        }
    }
}

//::::::::::::::::::::::::::::::::: Start Anggota ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

const anggotakdeks = async (req, res) => {
    const sql = await executeQuery("SELECT * FROM  anggota_kdeks order by id ASC");
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
const insertanggotakdeks = async (req, res) => {
    const fileuploads = site_url + "/uploads/structure_kdeks/" + req.file.filename;
    const sql = await executeQuery("insert into anggota_kdeks(name,position,position_en,photo,description,description_en,is_publish, organization, directorat, head, id_pejabat) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)",
        [req.body.name, req.body.position, req.body.position_en, fileuploads, req.body.description, req.body.description_en, req.body.is_published, req.body.organization ?? "", req.body.directorat ?? "", req.body.head ?? "", req.body.id_pejabat]);
    if (sql) {
        res.redirect('/anggota_kdeks');
    } else {
        console.log(sql);
        res.redirect('/anggota_kdeks');
    }
}

const deleteanggotakdeks = async (req, res) => {
    const id_pejabat = req.params.id;
    const foto_pejabat = req.params.foto;

    if (fs.existsSync(fileslinux + 'structure_kdeks/' + foto_pejabat)) {
        fs.unlink(fileslinux + 'structure_kdeks/' + foto_pejabat, async function (err) {
            if (err) return console.log(err);
            const sql = await executeQuery("DELETE FROM  anggota_kdeks where id=$1", [id_pejabat]);
            if (sql) {
                res.redirect('/anggota_kdeks');
            } else {
                console.log(sql)
                res.redirect('/anggota_kdeks');
            }
        });
    } else {
        const sql = await executeQuery("DELETE FROM  anggota_kdeks where id=$1", [id_pejabat]);
        if (sql) {
            res.redirect('/anggota_kdeks');
        } else {
            console.log(sql);
        }
    }

}

const detailanggotakdeks = async (req, res) => {
    const id_abouts = req.params.id;
    const sql = await executeQuery('SELECT *  FROM  anggota_kdeks where id=$1', [id_abouts]);
    if (sql?.length > 0) {
        res.status(200).json(sql)
    } else {
        res.status(200).json({ "success": false })
    }
}

const updateanggotakdeks = async (req, res) => {
    if (!req.file || req.file == "" || req.file == undefined) {
        const sql = await executeQuery("update anggota_kdeks set name=$1,position=$2,position_en=$3,description=$4,description_en=$5,is_publish=$6,organization=$7,directorat=$8,head=$9,id_pejabat=$10,x=$11,facebook=$12,linkedin=$13,instagram=$14 where id = $15",
            [req.body.name, req.body.position, req.body.position_en, req.body.description, req.body.description_en, req.body.is_published, req.body.organization ?? "", req.body.directorat ?? "", req.body.head ?? "", req.body.id_pejabat, req.body.x ?? "-", req.body.facebook ?? "-", req.body.linkedin ?? "-", req.body.instagram ?? "-", req.body.id]);
        if (sql) {
            res.redirect('/anggota_kdeks');
        } else {
            res.redirect('/anggota_kdeks');
        }
    } else {
        const fileuploads = site_url + "/uploads/structure_kdeks/" + req.file.filename;
        const sql = await executeQuery("update anggota_kdeks set name=$1,position=$2,position_en=$3,photo=$4,description=$5, description_en=$6,is_publish=$7,organization=$8,directorat=$9,head=$10,id_pejabat=$11,x=$12,facebook=$13,linkedin=$14,instagram=$15  where id=$16",
            [req.body.name, req.body.position, req.body.position_en, fileuploads, req.body.description, req.body.description_en, req.body.is_published, req.body.organization ?? "", req.body.directorat ?? "", req.body.head ?? "", req.body.id_pejabat, req.body.x ?? "-", req.body.facebook ?? "-", req.body.linkedin ?? "-", req.body.instagram ?? "-", req.body.id]);
        if (sql) {
            res.redirect('/anggota_kdeks');
        } else {
            res.redirect('/anggota_kdeks');
        }
    }
}

//::::::::::::::::::::::::::::::::: Start Sub Anggota ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

const subanggotakdeks = async (req, res) => {
    const sql = await executeQuery("SELECT * FROM  sub_anggota_kdeks order by id ASC");
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
const insertsubanggotakdeks = async (req, res) => {
    const fileuploads = site_url + "/uploads/structure_kdeks/" + req.file.filename;
    const sql = await executeQuery("insert into sub_anggota_kdeks(name,position,position_en,photo,description,description_en,is_publish, organization, directorat, head, id_anggota) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)",
        [req.body.name, req.body.position, req.body.position_en, fileuploads, req.body.description, req.body.description_en, req.body.is_published, req.body.organization ?? "", req.body.directorat ?? "", req.body.head ?? "", req.body.id_anggota]);
    if (sql) {
        res.redirect('/sub_anggota_kdeks');
    } else {
        console.log(sql);
        res.redirect('/sub_anggota_kdeks');
    }
}

const deletesubanggotakdeks = async (req, res) => {
    const id_pejabat = req.params.id;
    const foto_pejabat = req.params.foto;

    if (fs.existsSync(fileslinux + 'structure_kdeks/' + foto_pejabat)) {
        fs.unlink(fileslinux + 'structure_kdeks/' + foto_pejabat, async function (err) {
            if (err) return console.log(err);
            const sql = await executeQuery("DELETE FROM  sub_anggota_kdeks where id=$1", [id_pejabat]);
            if (sql) {
                res.redirect('/sub_anggota');
            } else {
                console.log(sql)
                res.redirect('/sub_anggota');
            }
        });
    } else {
        const sql = await executeQuery("DELETE FROM  sub_anggota_kdeks where id=$1", [id_pejabat]);
        if (sql) {
            res.redirect('/sub_anggota_kdeks');
        } else {
            console.log(sql);
        }
    }

}

const detailsubanggotakdeks = async (req, res) => {
    const id_sb = req.params.id;
    const sql = await executeQuery('SELECT *  FROM  sub_anggota_kdeks where id=$1', [id_sb]);
    if (sql?.length > 0) {
        res.status(200).json(sql)
    } else {
        res.status(200).json({ "success": false })
    }
}

const updatesubanggotakdeks = async (req, res) => {
    if (!req.file || req.file == "" || req.file == undefined) {
        const sql = await executeQuery("update sub_anggota_kdeks set name=$1,position=$2,position_en=$3,description=$4,description_en=$5,is_publish=$6,organization=$7,directorat=$8,head=$9,id_anggota=$10,x=$11,facebook=$12,linkedin=$13,instagram=$14 where id = $15",
            [req.body.name, req.body.position, req.body.position_en, req.body.description, req.body.description_en, req.body.is_published, req.body.organization ?? "", req.body.directorat ?? "", req.body.head ?? "", req.body.id_anggota, req.body.x ?? "-", req.body.facebook ?? "-", req.body.linkedin ?? "-", req.body.instagram ?? "-", req.body.id]);
        if (sql) {
            res.redirect('/sub_anggota_kdeks');
        } else {
            res.redirect('/sub_anggota_kdeks');
        }
    } else {
        const fileuploads = site_url + "/uploads/structure_kdeks/" + req.file.filename;
        const sql = await executeQuery("update sub_anggota_kdeks set name=$1,position=$2,position_en=$3,photo=$4,description=$5, description_en=$6,is_publish=$7,organization=$8,directorat=$9,head=$10,id_anggota=$11,x=$12,facebook=$13,linkedin=$14,instagram=$15  where id=$16",
            [req.body.name, req.body.position, req.body.position_en, fileuploads, req.body.description, req.body.description_en, req.body.is_published, req.body.organization ?? "", req.body.directorat ?? "", req.body.head ?? "", req.body.id_anggota, req.body.x ?? "-", req.body.facebook ?? "-", req.body.linkedin ?? "-", req.body.instagram ?? "-", req.body.id]);
        if (sql) {
            res.redirect('/sub_anggota_kdeks');
        } else {
            res.redirect('/sub_anggota_kdeks');
        }
    }
}

const multi_structure_kdeks = async (req, res) => {
    try {
        const og = await executeQuery("SELECT * FROM pejabat_kdeks where id_province = $1 ORDER BY id ASC", [req.params.id]);
        const ag = await executeQuery("SELECT * FROM anggota_kdeks order by id ASC");
        const sag = await executeQuery("SELECT * FROM sub_anggota_kdeks");

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


const detail_multi_structure_kdeks = async (req, res) => {
    const sql = await executeQuery("SELECT * FROM  " + req.query.tbl + " where id = $1", [req.query.keyid]);
    if (sql?.length > 0) {
        res.status(200).json(sql)
    } else {
        res.status(200).json({ "success": false })
    }
}


//::::::::::::::::::::::::::::::End Of Kdeks :::::::::::::::::::::::::::::::::::::::::::::::::::::
//::::::::::::::::::::::::::::::Start Of Structure :::::::::::::::::::::::::::::::::::::::::::::::::::::

module.exports = {
  kdeks,
  detailkdeks,
  insertkdeks,
  updatekdeks,
  deletekdeks,
  about_province_kdeks,
  history_province_kdeks,
  structurekdeks,
  inserstructurekdeks,
  deletestructurekdeks,
  detailstructurekdeks,
  updatestructurekdeks,
  anggotakdeks,
  insertanggotakdeks,
  deleteanggotakdeks,
  detailanggotakdeks,
  updateanggotakdeks,
  subanggotakdeks,
  insertsubanggotakdeks,
  deletesubanggotakdeks,
  detailsubanggotakdeks,
  updatesubanggotakdeks,
  multi_structure_kdeks,
  detail_multi_structure_kdeks,
};
