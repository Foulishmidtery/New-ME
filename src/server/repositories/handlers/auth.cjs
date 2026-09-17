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

const do_login = async (req, res) => {
    const email = req?.body?.email;
    // const password = md5(req?.body?.password);
    const password = req?.body?.password;
    // const password_md5 = md5(req?.body?.password);
    const ip = req.body.ip_address;
    if (email == 'admin@kneks.go.id' || email == 'admin2@kneks.go.id' || email == 'bssn1@kneks.go.id' || email == 'bssn2@kneks.go.id' || email == 'bssn3@kneks.go.id') {
        const sql = await executeQuery("SELECT * FROM users where  email = $1 AND approve = 'Y'", [email]);
        if (sql?.length > 0) {
            const match = await bcrypt.compare(password, sql[0]?.password);
            if (match) {
                u_id = sql[0]?.id;
                const isLogin = true;
                res.cookie("islogin", isLogin);
                res.cookie("id", sql[0]?.id);
                res.cookie("name", sql[0]?.name);
                res.cookie("roles_id", sql[0]?.role_id);
                res.cookie("id_province", sql[0]?.id_province);
                res.cookie("directorat_id", sql[0]?.directorat_id);
                // res.redirect("/dashboard");
                res.status(200).json({ "success": "true" })
            } else {
                res.status(200).json({ "success": "false" })
            }
        } else {
            // res.redirect("/");
            res.status(200).json({ "success": "false" })
        }
    } else if (email == 'superadmin@kneks.go.id') {
        res.status(200).json({ "success": "super" })
    } else {
        // const query = await executeQuery("SELECT * FROM ip_address where  ip = $1 AND ip_address.approve = $2", [ip, 'Y']);
        // if (query.length > 0) {
        const sql = await executeQuery("SELECT * FROM users where  email = $1  AND users.approve = 'Y'", [email]);
        if (sql?.length > 0) {
            const match2 = await bcrypt.compare(password, sql[0]?.password);
            if (match2) {
                u_id = sql[0]?.id;
                const isLogin = true;
                res.cookie("islogin", isLogin);
                res.cookie("id", sql[0]?.id);
                res.cookie("name", sql[0]?.name);
                res.cookie("roles_id", sql[0]?.role_id);
                res.cookie("id_province", sql[0]?.id_province);
                res.cookie("directorat_id", sql[0]?.directorat_id);
                // res.redirect("/dashboard");
                res.status(200).json({ "success": "true" })
            } else {
                res.status(200).json({ "success": "false" })
            }

        } else {
            // res.redirect("/");
            res.status(200).json({ "success": "false" })
        }
        // } else {
        //     const insert = await executeQuery("INSERT INTO ip_address(ip,email) VALUES ($1,$2)", [ip, email]);
        //     if (insert) {
        //         res.status(200).json({ "success": "pending" })
        //     } else {
        //         res.status(200).json({ "success": "eror" })
        //     }
        // }
    }
}

const user_register = async (req, res) => {
    // const passwords = md5(req?.body?.password);
    const salts = await bcrypt.genSalt(10);
    const passwords = await bcrypt.hash(req.body.password, salts);
    const sql = await executeQuery("insert into users(name,email,password,directorat_id,id_province) values($1,$2,$3,$4,$5)",
        [req.body.username.replace(/\s/g, ''), req.body.email, passwords, req.body.direktorat, req.body.kdeks]);
    if (sql) {
        // res.redirect('/');
        res.status(200).json({ "success": true });
    } else {
        res.status(200).json({ "success": false });
    }
}

const do_logout = (req, res) => {
    res.clearCookie("islogin");
    res.clearCookie("name");
    res.clearCookie("id");
    res.clearCookie("roles_id");
    res.clearCookie("id_province");
    res.clearCookie("directorat_id");
    res.redirect("/");
}


const api_login = async (req, res) => {
    const email = req?.body?.email;
    const uri = req.body.url;
    // const password = md5(req?.body?.password);
    // password = $2
    const sql = await executeQuery("SELECT * FROM users where email = $1 AND users.approve = 'Y' ", [email])
    if (sql?.length > 0) {
        const isLogin = true;
        res.cookie("islogin", isLogin, {
            expires: new Date(Date.now() + 86400000 * 24),
            domain: '.kneks.go.id',
            secure: true,
            httpOnly: false,
            sameSite: 'None',
            overwrite: true,
        });
        res.cookie("id", sql[0]?.id, {
            expires: new Date(Date.now() + 86400000 * 24),
            domain: '.kneks.go.id',
            secure: true,
            httpOnly: false,
            sameSite: 'None',
            overwrite: true,
        });
        res.cookie("name", sql[0]?.name, {
            expires: new Date(Date.now() + 86400000 * 24),
            domain: '.kneks.go.id',
            secure: true,
            httpOnly: false,
            sameSite: 'None',
            overwrite: true,
        });
        res.cookie("roles_id", sql[0]?.role_id, {
            expires: new Date(Date.now() + 86400000 * 24),
            domain: '.kneks.go.id',
            secure: true,
            httpOnly: false,
            sameSite: 'None',
            overwrite: true,
        });
        res.cookie("id_province", sql[0]?.id_province, {
            expires: new Date(Date.now() + 86400000 * 24),
            domain: '.kneks.go.id',
            secure: true,
            httpOnly: false,
            sameSite: 'None',
            overwrite: true,
        });
        res.cookie("directorat_id", sql[0]?.directorat_id, {
            expires: new Date(Date.now() + 86400000 * 24),
            domain: '.kneks.go.id',
            secure: true,
            httpOnly: false,
            sameSite: 'None',
            overwrite: true,
        });
        // res.redirect(uri + '/dashboard');
        res.status(200).json({ "success": true, "callback": uri + '/dashboard' });
    } else {
        res.status(200).json({ "success": false, "callback": uri + '/dashboard' })
    }

}

const api_logout = (req, res) => {

    const uri_local = "http://localhost:3005";
    const uri_dev = "https://sso-dev.kneks.go.id";

    res.clearCookie("islogin", { domain: ".kneks.go.id" });
    res.clearCookie("name", { domain: ".kneks.go.id" });
    res.clearCookie("id", { domain: ".kneks.go.id" });
    res.clearCookie("roles_id", { domain: ".kneks.go.id" });
    res.clearCookie("id_province", { domain: ".kneks.go.id" });
    res.clearCookie("directorat_id", { domain: ".kneks.go.id" });
    res.redirect(uri_dev + '/login');
}

const analitics = async (req, res) => {
    const id_users = req.cookies.id;

    const news_mounts = await executeQuery('SELECT * FROM news where users_id = $1', [id_users]);
    const jumlah1 = news_mounts.length;
    const videos_mounts = await executeQuery('SELECT * FROM news_videos where users_id = $1', [id_users]);
    const jumlah2 = videos_mounts.length;
    const photos_mounts = await executeQuery('SELECT * FROM news_photos where users_id = $1', [id_users]);
    const jumlah3 = photos_mounts.length;
    const files_mounts = await executeQuery('SELECT * FROM files where users_id = $1', [id_users]);
    const jumlah4 = files_mounts.length;

    const mounted = {
        "news": jumlah1,
        "videos": jumlah2,
        "photos": jumlah3,
        "files": jumlah4,
    }

    res.status(200).json(mounted)
}

//::::::::::::::::::::::::::::::End Of Login :::::::::::::::::::::::::::::::::::::::::::::::::::::
//:::::::::::::::::::::::::::::: Ekonomi Syraiah ::::::::::::::::::::::::::::::::::::::::::::::::

module.exports = {
  do_login,
  user_register,
  do_logout,
  api_login,
  api_logout,
  analitics,
};
