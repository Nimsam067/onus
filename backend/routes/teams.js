const express = require("express");
const pool = require("../db");
const router = express.Router();
const authenticate = require("../middleware/auth");

function generateCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

// Get current user's team
router.get("/me", authenticate, async (req, res) => {
  try {
    if (!req.user.team_id) return res.json({ team: null });
    const result = await pool.query("SELECT * FROM teams WHERE id = $1", [req.user.team_id]);
    res.json({ team: result.rows[0] || null });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get team" });
  }
});

// Members of the current user's team
router.get("/members", authenticate, async (req, res) => {
  try {
    if (!req.user.team_id) {
      return res.json([]);
    }

    const result = await pool.query(
      `
      SELECT
        id,
        display_name,
        email
      FROM users
      WHERE team_id = $1
      ORDER BY display_name
      `,
      [req.user.team_id]
    );

    res.json(result.rows);

  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Failed to fetch members"
    });
  }
});

// Create a new team
router.post("/create", authenticate, async (req, res) => {
  const { name } = req.body;
  try {
    const code = generateCode();
    const teamResult = await pool.query(
      "INSERT INTO teams (code, name) VALUES ($1, $2) RETURNING *",
      [code, name || "My Team"]
    );
    const team = teamResult.rows[0];
    await pool.query("UPDATE users SET team_id = $1 WHERE id = $2", [team.id, req.user.id]);
    res.json({ team });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create team" });
  }
});

// Join a team by code
router.post("/join", authenticate, async (req, res) => {
  const { code } = req.body;
  try {
    const result = await pool.query("SELECT * FROM teams WHERE code = $1", [code.toUpperCase()]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Team not found. Check the code and try again." });
    }
    const team = result.rows[0];
    await pool.query("UPDATE users SET team_id = $1 WHERE id = $2", [team.id, req.user.id]);
    res.json({ team });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to join team" });
  }
});

router.post("/leave", authenticate, async (req, res) => {
  try {
    await pool.query(
      `
      UPDATE users
      SET team_id = NULL
      WHERE id = $1
      `,
      [req.user.id]
    );

    res.json({
      success: true
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Failed to leave team"
    });
  }
});

module.exports = router;
