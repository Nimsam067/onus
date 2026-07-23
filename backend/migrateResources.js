const pool = require("./db");
const fs = require("fs");
const path = require("path");

async function migrate() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS resources (
        id SERIAL PRIMARY KEY,
        team_id INTEGER REFERENCES teams(id),
        title VARCHAR(255) NOT NULL,
        url TEXT NOT NULL,
        type VARCHAR(20) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);
    console.log("resources table ready");

    const uploadsDir = path.join(__dirname, "uploads");
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir);
    }
    console.log("uploads directory ready");

    console.log("Migration complete");
    process.exit(0);
  } catch (err) {
    console.error("Migration failed:", err);
    process.exit(1);
  }
}

migrate();