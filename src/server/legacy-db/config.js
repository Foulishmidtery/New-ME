const util = require('util');
const mysql = require('mysql2');

const pool = mysql.createPool({
    connectionLimit: Number(process.env.LEGACY_MYSQL_POOL_LIMIT || 10),
    host: process.env.LEGACY_MYSQL_HOST || '127.0.0.1',
    port: Number(process.env.LEGACY_MYSQL_PORT || 3306),
    user: process.env.LEGACY_MYSQL_USER,
    password: process.env.LEGACY_MYSQL_PASSWORD,
    database: process.env.LEGACY_MYSQL_DATABASE,
});

pool.on('connection', () => {});
pool.query = util.promisify(pool.query);

const executeQuery = (query, arraParms) => new Promise((resolve, reject) => {
    pool.query(query, arraParms, (err, data) => {
        if (err) return reject(err);
        resolve(data);
    });
});

module.exports = { executeQuery };
