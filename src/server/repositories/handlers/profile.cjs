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

const institutions = async (req, res) => {
    const sql = await executeQuery('SELECT * FROM  institutions order by id ASC');
    if (sql?.length > 0) {
        res.status(200).json(sql)
    } else {
        res.status(200).json({ "success": false })
    }
}

const detailinstitutions = async (req, res) => {
    const id_inst = req.params.id;
    const sql = await executeQuery('SELECT *  FROM  institutions where id=$1', [id_inst]);
    if (sql?.length > 0) {
        res.status(200).json(sql)
    } else {
        res.status(200).json({ "success": false })
    }
}

const deleteinstitution = async (req, res) => {
    const id_inst = req.params.id;
    const sql = await executeQuery('DELETE FROM  institutions where id = $1 ', [id_inst]);
    if (sql) {
        res.redirect('/i');
    } else {
        console.log(sql);
        res.redirect('/i');
    }
}

const updateinstitution = async (req, res) => {
    if (req.file) {
        const fileuploads = site_url + "/uploads/institusi/" + req.file.filename;
        const sql = await executeQuery('UPDATE institutions set tag=$1, name=$2, logo=$3, link=$4 where id = $5 ', [req.body.tag, req.body.name, fileuploads, req.body.link, req.body.id]);
        if (sql) {
            res.redirect('/i');
        } else {
            console.log(sql);
            res.redirect('/i');
        }
    } else {
        const sql = await executeQuery('UPDATE institutions set tag=$1, name=$2, link=$3 where id = $5 ', [req.body.tag, req.body.name, req.body.link, req.body.id]);
        if (sql) {
            res.redirect('/i');
        } else {
            console.log(sql);
            res.redirect('/i');
        }
    }
}

const insertinstitution = async (req, res) => {
    if (!req.file) {
        const sql = await executeQuery('INSERT into institutions(tag,name,link)values($1,$2,$3)', [req.body.tag, req.body.name, req.body.link]);
        if (sql) {
            res.redirect('/i');
        } else {
            console.log(sql);
            res.redirect('/i');
        }
    } else {
        const fileuploads = site_url + "/uploads/institusi/" + req.file.filename;
        const sql = await executeQuery('INSERT into institutions(tag,name,logo,link)values($1,$2,$3,$4)', [req.body.tag, req.body.name, fileuploads, req.body.link]);
        if (sql) {
            res.redirect('/i');
        } else {
            console.log(sql);
            res.redirect('/i');
        }
    }
}

//::::::::::::::::::::::::::::::End Of institutions :::::::::::::::::::::::::::::::::::::::::::::::::::::
//::::::::::::::::::::::::::::::Start Of Sosmed :::::::::::::::::::::::::::::::::::::::::::::::::::::
const sosmed = async (req, res) => {
    const sql = await executeQuery('SELECT * FROM  social_medias');
    if (sql?.length > 0) {
        res.status(200).json(sql)
    } else {
        res.status(200).json({ "success": false })
    }

}

const detailsosmed = async (req, res) => {
    const id_sosmed = req.params.id;
    const sql = await executeQuery('SELECT *  FROM  social_medias where id=$1', [id_sosmed]);
    if (sql?.length > 0) {
        res.status(200).json(sql)
    } else {
        res.status(200).json({ "success": false })
    }
}

const deletesosmed = async (req, res) => {
    const id_sosmed = req.params.id;
    const sql = await executeQuery('DELETE FROM  social_medias where id = $1 ', [id_sosmed]);
    if (sql) {
        res.redirect('/sm');
    } else {
        console.log(sql);
        res.redirect('/sm');
    }
}

const updatesosmed = async (req, res) => {
    const id_sosmed = req.body.id;
    const sql = await executeQuery('UPDATE social_medias set name=$1 , logo=$2, link=$3 where id = $4 ', [req.body.name, req.body.logo, req.body.link, id_sosmed]);
    if (sql) {
        res.redirect('/sm');
    } else {
        console.log(sql);
        res.redirect('/sm');
    }
}
//::::::::::::::::::::::::::::::End Of Sosmed :::::::::::::::::::::::::::::::::::::::::::::::::::::
//::::::::::::::::::::::::::::::Start Of Post Sosmed :::::::::::::::::::::::::::::::::::::::::::::::::::::
const postsosmed = async (req, res) => {
    const sql = await executeQuery('SELECT * FROM  post_social_medias order by id desc');
    if (sql?.length > 0) {
        res.status(200).json(sql)
    } else {
        res.status(200).json({ "success": false })
    }

}

const postsosmedfe = async (req, res) => {
    const sql = await executeQuery('SELECT * FROM  post_social_medias where id_sosmed = $1 AND flag = $2 order by id asc', ['1', 'kneks']);
    if (sql?.length > 0) {
        res.status(200).json(sql)
    } else {
        res.status(200).json({ "success": false })
    }

}

const insertpostsosmed = async (req, res) => {
    const sql = await executeQuery('INSERT into post_social_medias(link_post,id_sosmed)values($1,$2)', [req.body.link_post, req.body.id_sosmed]);
    if (sql) {
        res.redirect('/psm');
    } else {
        res.redirect('/psm');
    }
}

const detailpostsosmed = async (req, res) => {
    const id_sosmed = req.params.id;
    const sql = await executeQuery('SELECT *  FROM  post_social_medias where id=$1', [id_sosmed]);
    if (sql?.length > 0) {
        res.status(200).json(sql)
    } else {
        res.status(200).json({ "success": false })
    }
}

const deletepostsosmed = async (req, res) => {
    const id_sosmed = req.params.id;
    const sql = await executeQuery('DELETE FROM  post_social_medias where id = $1 ', [id_sosmed]);
    if (sql) {
        res.redirect('/psm');
    } else {
        console.log(sql);
        res.redirect('/psm');
    }
}

const updatepostsosmed = async (req, res) => {
    const id_sosmed = req.body.id;
    const sql = await executeQuery('UPDATE post_social_medias set link_post=$1,id_sosmed=$2 where id = $3 ', [req.body.link_post, req.body.id_sosmed, id_sosmed]);
    if (sql) {
        res.redirect('/psm');
    } else {
        console.log(sql);
        res.redirect('/psm');
    }
}
//::::::::::::::::::::::::::::::: End Post SOsmed :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//::::::::::::::::::::::::::::::Start Of Scope :::::::::::::::::::::::::::::::::::::::::::::::::::::
const scopes = async (req, res) => {
    const sql = await executeQuery('SELECT * FROM  scopes');
    if (sql?.length > 0) {
        res.status(200).json(sql)
    } else {
        res.status(200).json({ "success": false })
    }
}

const detailscopes = async (req, res) => {
    const id_scopes = req.params.id;
    const sql = await executeQuery('SELECT *  FROM  scopes where id=$1', [id_scopes]);
    if (sql?.length > 0) {
        res.status(200).json(sql)
    } else {
        res.status(200).json({ "success": false })
    }
}

const deletescopes = async (req, res) => {
    const id_scopes = req.params.id;
    const sql = await executeQuery('DELETE FROM  scopes where id = $1 ', [id_scopes]);
    if (sql) {
        res.redirect('/scp');
    } else {
        console.log(sql);
        res.redirect('/scp');
    }
}

const updatescopes = async (req, res) => {
    const id_scopes = req.body.id;

    if (req.body.images != "" || req.body.images != undefined || !req.body.images) {
        const sql = await executeQuery('UPDATE scopes set title=$1, icon=$2, title_en=$3, description=$4, description_en=$5, image=$6 where  id = $7 ', [req.body.title, req.body.images, req.body.title_en, req.body.description, req.body.description_en, req.body.images, id_scopes]);
        if (sql) {
            res.redirect('/scp');
        } else {
            console.log(sql);
            res.redirect('/scp');
        }
    } else {
        const sql = await executeQuery('UPDATE scopes set title=$1, title_en=$2, description=$3, description_en=$4 where  id = $5 ', [req.body.title, req.body.title_en, req.body.description, req.body.description_en, id_scopes]);
        if (sql) {
            res.redirect('/scp');
        } else {
            console.log(sql);
            res.redirect('/scp');
        }
    }
}
//::::::::::::::::::::::::::::::End Of Scope :::::::::::::::::::::::::::::::::::::::::::::::::::::
//::::::::::::::::::::::::::::::Start Of Maps :::::::::::::::::::::::::::::::::::::::::::::::::::::
const maps = async (req, res) => {
    const sql = await executeQuery('SELECT * FROM  map')
    if (sql?.length > 0) {
        res.status(200).json(sql)
    } else {
        res.status(200).json({ "success": false })
    }

}

const updatemaps = async (req, res) => {
    const sql = await executeQuery('UPDATE map set embed=$1 where id=$2', [req.body.embed, req.body.id]);
    if (sql) {
        res.redirect('/m_edit/' + req.body.id);
    } else {
        console.log(sql);
        res.redirect('/mm_edit/' + req.body.id);
    }
}
//::::::::::::::::::::::::::::::End Of Maps :::::::::::::::::::::::::::::::::::::::::::::::::::::
//::::::::::::::::::::::::::::::Start Of Contacts :::::::::::::::::::::::::::::::::::::::::::::::::::::
const contacts = async (req, res) => {
    const sql = await executeQuery('SELECT * FROM  contacts');
    if (sql?.length > 0) {
        res.status(200).json(sql)
    } else {
        res.status(200).json({ "success": false })
    }

}

const updatecontacts = async (req, res) => {
    const sql = await executeQuery('UPDATE contacts set address_building=$1, address=$2, phone_number=$3, fax_number=$4, email=$5 where id=$6', [req.body.address_building, req.body.address, req.body.phone_number, req.body.fax_number, req.body.email, req.body.id]);
    if (sql) {
        res.redirect('/c_edit/' + req.body.id);
    } else {
        console.log(sql);
        res.redirect('/c_edit/' + req.body.id);
    }
}

const questbook = async (req, res) => {
    const sql = await executeQuery('INSERT into questbook (name,email,phone_number,subjek,pesan) values($1,$2,$3,$4,$5)', [req.body.name, req.body.email, req.body.phone_number, req.body.subjek, req.body.pesan]);
    if (sql) {
        res.status(200).json({ "success": true })
    } else {
        res.status(200).json({ "success": false })
    }
}

//::::::::::::::::::::::::::::::End Of Contacts :::::::::::::::::::::::::::::::::::::::::::::::::::::
//::::::::::::::::::::::::::::::Start Of Agenda :::::::::::::::::::::::::::::::::::::::::::::::::::::

module.exports = {
  institutions,
  detailinstitutions,
  deleteinstitution,
  updateinstitution,
  insertinstitution,
  sosmed,
  detailsosmed,
  deletesosmed,
  updatesosmed,
  postsosmed,
  postsosmedfe,
  insertpostsosmed,
  detailpostsosmed,
  deletepostsosmed,
  updatepostsosmed,
  scopes,
  detailscopes,
  deletescopes,
  updatescopes,
  maps,
  updatemaps,
  contacts,
  updatecontacts,
  questbook,
};
