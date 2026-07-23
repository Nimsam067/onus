const express = require("express");
const pool = require("../db");
const router = express.Router();
const authenticate = require("../middleware/auth");

// GET all resources for team
router.get("/", authenticate, async (req, res) => {
  try {
    if (!req.user.team_id) return res.json([]);
    const result = await pool.query(
      "SELECT * FROM resources WHERE team_id = $1 ORDER BY created_at DESC",
      [req.user.team_id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch resources" });
  }
});

// POST add a link
router.post("/link", authenticate, async (req, res) => {
  const { title, url } = req.body;
  const teamId = req.user.team_id;
  if (!teamId) return res.status(400).json({ error: "No team" });
  try {
    const result = await pool.query(
      "INSERT INTO resources (team_id, title, url, type) VALUES ($1, $2, $3, 'link') RETURNING *",
      [teamId, title, url]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add link" });
  }
});

// POST save a file URL (file uploaded directly to Firebase Storage by the client)
router.post("/upload", authenticate, async (req, res) => {
  const teamId = req.user.team_id;
  if (!teamId) return res.status(400).json({ error: "No team" });

  const { title, url } = req.body;
  if (!url) return res.status(400).json({ error: "No file URL" });

  try {
    const result = await pool.query(
      "INSERT INTO resources (team_id, title, url, type) VALUES ($1, $2, $3, 'file') RETURNING *",
      [teamId, title, url]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save file resource" });
  }
});

// DELETE a resource
router.delete("/:id", authenticate, async (req, res) => {
  try {
    const result = await pool.query(
      "DELETE FROM resources WHERE id = $1 AND team_id = $2 RETURNING *",
      [req.params.id, req.user.team_id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: "Not found" });
    res.json({ message: "Deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete resource" });
  }
});

module.exports = router;