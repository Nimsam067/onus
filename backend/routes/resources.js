const express = require("express");
const pool = require("../db");
const router = express.Router();
const authenticate = require("../middleware/auth");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, "../uploads");
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e6)}`;
    cb(null, `${unique}-${file.originalname}`);
  },
});

const upload = multer({ storage, limits: { fileSize: 20 * 1024 * 1024 } });

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

// POST upload a file
router.post("/upload", authenticate, upload.single("file"), async (req, res) => {
  const teamId = req.user.team_id;
  if (!teamId) return res.status(400).json({ error: "No team" });
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });

  const { title } = req.body;
  const apiUrl = process.env.API_URL || `http://localhost:${process.env.PORT || 5001}`;
  const fileUrl = `${apiUrl}/uploads/${req.file.filename}`;

  try {
    const result = await pool.query(
      "INSERT INTO resources (team_id, title, url, type) VALUES ($1, $2, $3, 'file') RETURNING *",
      [teamId, title || req.file.originalname, fileUrl]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save file" });
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

    // Delete file from disk if it was an upload
    if (result.rows[0].type === "file") {
      const filename = result.rows[0].url.split("/uploads/")[1];
      if (filename) {
        const filePath = path.join(__dirname, "../uploads", filename);
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      }
    }

    res.json({ message: "Deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete resource" });
  }
});

module.exports = router;