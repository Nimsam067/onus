const { Pool } = require("pg");
require("dotenv").config();

const useSSL = process.env.DB_SSL === "true";

const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "onus",
  database: process.env.DB_NAME || "onus_db",
  ...(useSSL
    ? {
        ssl: {
          rejectUnauthorized: false,
        },
      }
    : {}),
});

pool.on("error", (err) => {
  console.error("Unexpected error on idle client", err);
});

module.exports = pool;
