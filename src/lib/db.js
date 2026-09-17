import { Pool } from "pg";

/**
 * Shared PostgreSQL pool for Next.js route handlers and server components.
 * The pool is cached in development so hot reload does not create connections
 * repeatedly.
 */
const globalForDb = globalThis;

export const db =
  globalForDb.cmsDb ??
  new Pool({
    host: process.env.DB_HOST || "127.0.0.1",
    port: Number(process.env.DB_PORT) || 5432,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  });

if (process.env.NODE_ENV !== "production") {
  globalForDb.cmsDb = db;
}
