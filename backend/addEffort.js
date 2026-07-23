const pool = require("./db");

async function main() {
  try {
    await pool.query(`
      ALTER TABLE tasks
      ADD COLUMN IF NOT EXISTS effort INTEGER DEFAULT 3;
    `);

    console.log("✅ effort column added.");
  } catch (err) {
    console.error(err);
  } finally {
    await pool.end();
  }
}

main();