const pgsql = require('pg');
const pool = new pgsql.Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST || '127.0.0.1',
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT) || 5432,
})
pool.on('error', (err) => console.error('PostgreSQL pool error:', err.message));
const executeQuery = async (query, arrayParams = []) => {
    const result = await pool.query(query, arrayParams);
    return result.rows;
};
module.exports = { executeQuery };
