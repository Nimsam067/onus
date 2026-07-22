const pool = require("./db");

async function main() {
  try {
    await pool.query(`
      ALTER TABLE tasks
      ADD COLUMN completed_at TIMESTAMP;
    `);

    console.log("✅ completed_at column added.");
  } catch (err) {
    console.error(err);
  } finally {
    await pool.end();
  }
}

main();