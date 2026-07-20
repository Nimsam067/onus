const pool = require("./db");

async function migrate() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS teams (
        id SERIAL PRIMARY KEY,
        code VARCHAR(20) UNIQUE NOT NULL,
        name VARCHAR(255),
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);
    console.log("teams table ready");

    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        firebase_uid VARCHAR(128) UNIQUE NOT NULL,
        email VARCHAR(255),
        display_name VARCHAR(255),
        team_id INTEGER REFERENCES teams(id),
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);
    console.log("users table ready");

    await pool.query(`ALTER TABLE tasks ADD COLUMN IF NOT EXISTS team_id INTEGER REFERENCES teams(id)`);
    console.log("tasks.team_id ready");

    await pool.query(`ALTER TABLE deadlines ADD COLUMN IF NOT EXISTS team_id INTEGER REFERENCES teams(id)`);
    console.log("deadlines.team_id ready");

    console.log("Migration complete");
    process.exit(0);
  } catch (err) {
    console.error("Migration failed:", err);
    process.exit(1);
  }
}

migrate();
