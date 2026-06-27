const express = require("express");
const pool = require("../db");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM deadlines ORDER BY date ASC");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch deadlines" });
  }
});

router.post("/", async (req, res) => {
  const { title, date } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO deadlines (title, date) VALUES ($1, $2) RETURNING *",
      [title, date]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create deadline" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const result = await pool.query("DELETE FROM deadlines WHERE id = $1 RETURNING *", [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Deadline not found" });
    }
    res.json({ message: "Deadline deleted", deadline: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete deadline" });
  }
});

module.exports = router;
