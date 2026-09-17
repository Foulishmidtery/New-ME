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

const users = async (req, res) => {
    const sql = await executeQuery("SELECT * FROM users where approve = 'Y'");
    if (sql?.length > 0) {
        // const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        // console.log(ip);
        // const salt = await bcrypt.genSalt(10); 
        // const hashedPassword = await bcrypt.hash('kneks2024', salt);
        // await executeQuery("UPDATE users SET password = $1 ", [hashedPassword]);
        res.status(200).json(sql)
    } else {
        res.status(200).json({ "success": false })
    }
}

const users_detail = async (req, res) => {
    const sql = await executeQuery('SELECT * FROM users where id = $1', [req.params.id]);
    if (sql?.length > 0) {
        res.status(200).json(sql)
    } else {
        res.status(200).json({ "success": false })
    }
}

const users_new = async (req, res) => {
    const sql = await executeQuery("SELECT * FROM users WHERE created_at >= NOW() - INTERVAL '1 month'  AND approve = 'Y' ORDER BY created_at DESC");
    if (sql?.length > 0) {
        res.status(200).json(sql)
    } else {
        res.status(200).json({ "success": false })
    }
};

const ip_address_reject = async (req, res) => {
    const sql = await executeQuery("SELECT * FROM users WHERE approve = 'N' ORDER BY created_at DESC");
    if (sql?.length > 0) {
        res.status(200).json(sql)
    } else {
        res.status(200).json([])
    }
};

const ip_address_approve = async (req, res) => {
    const sql = await executeQuery("SELECT * FROM users WHERE approve = 'Y' ORDER BY created_at DESC");
    if (sql?.length > 0) {
        res.status(200).json(sql)
    } else {
        res.status(200).json([])
    }
};

const users_whitelist = async (req, res) => {
    const sql = await executeQuery("SELECT * FROM users WHERE approve = 'N' ORDER BY created_at DESC");
    if (sql?.length > 0) {
        res.status(200).json(sql)
    } else {
        res.status(200).json({ "success": false })
    }
};

const users_ipaddress = async (req, res) => {
    const sql = await executeQuery("SELECT * FROM ip_address");
    if (sql?.length > 0) {
        // await executeQuery("DELETE FROM ip_address WHERE approve = 'N'");
        res.status(200).json(sql)
    } else {
        res.status(200).json({ "success": false })
    }
};

const approveusers = async (req, res) => {

    const today = new Date();
    const month = (today.getMonth() + 1);
    const mmm = month.length < 2 ? "0" + month : month;
    const date = today.getFullYear() + '-' + mmm + '-' + today.getDate();
    const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    const time_datetime = date + ' ' + time;

    const id_params_user = req.params.id;
    const sql = await executeQuery("UPDATE users SET approve=$1, approve_by=$2, approve_date=$3 WHERE id=$4 ", ['Y', req.cookies.name, time_datetime, id_params_user]);
    if (sql) {
        res.redirect('/whitelist');
    } else {
        res.redirect('/whitelist')
    }
}

const approveipaddress = async (req, res) => {
    const today = new Date();
    const month = (today.getMonth() + 1);
    const mmm = month.length < 2 ? "0" + month : month;
    const date = today.getFullYear() + '-' + mmm + '-' + today.getDate();
    const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    const time_datetime = date + ' ' + time;

    const id_params_user = req.params.id;
    const sql = await executeQuery("UPDATE ip_address SET approve=$1, approve_by=$2, approve_date=$3 WHERE id=$4 ", ['Y', req.cookies.name, time_datetime, id_params_user]);
    if (sql) {
        res.redirect('/ip_address');
    } else {
        res.redirect('/ip_address')
    }
}

const deleteipaddress = async (req, res) => {
    const id_params_user = req.params.id;
    const sql = await executeQuery("DELETE from ip_address WHERE id = $1 ", [id_params_user]);
    if (sql) {
        res.redirect('/ip_address');
    } else {
        res.redirect('/ip_address')
    }
}

const deleteapproveip = async (req, res) => {
    const id_params_user = req.params.id;
    const sql = await executeQuery("DELETE from users WHERE id = $1 ", [id_params_user]);
    if (sql) {
        res.redirect('/ip_address_approve');
    } else {
        res.redirect('/ip_address_approve')
    }
}

const deleterejectedip = async (req, res) => {
    const id_params_user = req.params.id;
    const sql = await executeQuery("DELETE from ip_address WHERE id = $1 ", [id_params_user]);
    if (sql) {
        res.redirect('/ip_address_rejects');
    } else {
        res.redirect('/ip_address_rejects')
    }
}

const userroles = async (req, res) => {
    const sql = await executeQuery('SELECT * FROM  roles');
    if (sql?.length > 0) {
        res.status(200).json(sql)
    } else {
        res.status(200).json({ "success": false })
    }
}

const insertusers = async (req, res) => {
    const today = new Date();
    const month = (today.getMonth() + 1);
    const mmm = month.length < 2 ? "0" + month : month;
    const date = today.getFullYear() + '-' + mmm + '-' + today.getDate();
    const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    const time_datetime = date + ' ' + time;
    // const pw = md5(req.body.password);
    const salts = await bcrypt.genSalt(10);
    const pw = await bcrypt.hash(req.body.password, salts);
    const sql = await executeQuery("insert into users(name,email,password,role_id,created_at,updated_at,approve, ip_address, directorat_id, id_province) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)",
        [req.body.name.replace(/\s/g, ''), req.body.email, pw, req.body.role_id, time_datetime, time_datetime, 'Y', '0.0.0.0', req.body.directorat_id, req.body.id_province]);
    if (sql) {
        res.redirect('/u');
    } else {
        console.log(sql)
    }
}

const updatepassword = async (req, res) => {
    const id_users = req.cookies.id;
    const sql = await executeQuery('SELECT * FROM users where id = $1 ', [id_users])
    if (sql.length > 0) {
        res.status(200).json(sql)
    } else {
        res.status(200).json({ "success": false })
    }
}

const changespassword = async (req, res) => {
    const sql = await executeQuery('SELECT * FROM users where id = $1 ', [req.body.id_user]);
    const match = await bcrypt.compare(req.body.old_password, sql[0]?.password);
    if (match) {
        if (req.body.new_password == req.body.verify_password) {
            const salts = await bcrypt.genSalt(10);
            const pw = await bcrypt.hash(req.body.new_password, salts);
            await executeQuery("UPDATE users SET name=$1 , password=$2 WHERE id=$3 ", [req.body.names, pw, req.body.id_user]);
            // console.log('success');
            res.redirect('/logout');
        } else {
            res.redirect('/changespassword');
            console.log('new password and password confirm not match !');
        }
    } else {
        res.redirect('/changespassword');
        console.log('password not match in database!');
    }
}

const deleteuser = async (req, res) => {
    const id_users = req.params.id;
    const sql = await executeQuery('DELETE FROM users where id = $1 ', [id_users]);
    if (sql) {
        res.redirect('/u');
    } else {
        console.log(sql);
        res.redirect('/u');
    }
}

const updateusers = async (req, res) => {
    const id_user = req.body.id;
    if (req.body.passwords == "" || req.body.passwords == null) {
        await executeQuery("UPDATE users SET name=$1 , email=$2 ,  role_id = $3 , ip_address = $4 , directorat_id = $5, id_province=$6 WHERE id=$7 ", [req.body.names.replace(/\s/g, ''), req.body.emails, req.body.roles_id, '0.0.0.0', req.body.directorat_id, req.body.id_province, id_user]);
        res.redirect('/u');
    } else {
        const salts = await bcrypt.genSalt(10);
        const pw = await bcrypt.hash(req.body.passwords, salts);
        await executeQuery("UPDATE users SET name=$1 , email=$2 , password = $3 , role_id = $4, ip_address = $5, directorat_id = $6, id_province = $7 WHERE id=$8 ", [req.body.names.replace(/\s/g, ''), req.body.emails, pw, req.body.roles_id, '0.0.0.0', req.body.directorat_id, req.body.id_province, id_user]);
        res.redirect('/u');
    }
}
//::::::::::::::::::::::::::::::End Of Users:::::::::::::::::::::::::::::::::::::::::::::::::::::

//:::::::::::::::::::::::::::::: Zona Khas  :::::::::::::::::::::::::::::::::::::::::::::::::::::::


module.exports = {
  users,
  users_detail,
  users_new,
  ip_address_reject,
  ip_address_approve,
  users_whitelist,
  users_ipaddress,
  approveusers,
  approveipaddress,
  deleteipaddress,
  deleteapproveip,
  deleterejectedip,
  userroles,
  insertusers,
  updatepassword,
  changespassword,
  deleteuser,
  updateusers,
};
