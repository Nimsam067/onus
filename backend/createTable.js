const pool = require("./db");

async function main() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS tasks (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        completed BOOLEAN DEFAULT FALSE,
        due_date DATE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await pool.query(`
      INSERT INTO tasks (title, description, completed)
      VALUES
      ('Finish backend', 'Get the API working', false),
      ('Deploy frontend', 'Host the React app', false)
      ON CONFLICT DO NOTHING;
    `);

    console.log("✅ Table created!");
  } catch (err) {
    console.error(err);
  } finally {
    await pool.end();
  }
}

main();