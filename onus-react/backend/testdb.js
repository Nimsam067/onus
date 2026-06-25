const pool = require("./db");

async function test() {
  try {
    const res = await pool.query("SELECT NOW()");
    console.log("Connected!");
    console.log(res.rows[0]);
  } catch (err) {
    console.error(err);
  } finally {
    await pool.end();
  }
}

test();