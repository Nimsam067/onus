const express = require("express");
const pool = require("../db");
const router = express.Router();
const authenticate = require("../middleware/auth");

router.get("/", authenticate, async (req, res) => {
  try {
    const teamId = req.user.team_id;
    if (!teamId) return res.json([]);
    const result = await pool.query(
      "SELECT * FROM tasks WHERE team_id = $1 ORDER BY id ASC",
      [teamId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

router.get("/:id", authenticate, async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM tasks WHERE id = $1 AND team_id = $2",
      [req.params.id, req.user.team_id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: "Task not found" });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch task" });
  }
});

router.post("/", authenticate, async (req, res) => {
  const { title, description, dueDate, status, assignee, effort } = req.body;
  const isCompleted = status === "done";
  const completedAt = isCompleted ? new Date() : null;

  const teamId = req.user.team_id;
  if (!teamId) return res.status(400).json({ error: "You must be in a team to create tasks" });
  try {
    const result = await pool.query(
      "INSERT INTO tasks (title, description, completed, due_date, status, assignee, completed_at, team_id, effort ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *",
      [title, description, isCompleted, dueDate || null, status || "not_started", assignee || null, completedAt, teamId, effort || 3]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create task" });
  }
});

router.put("/:id", authenticate, async (req, res) => {
  const { title, description, dueDate, status, assignee, effort } = req.body;
  const isCompleted = status === "done";


  try {
    const { rows } = await pool.query(
      "SELECT completed_at FROM tasks WHERE id = $1",
      [req.params.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Task not found" });
    }

    let completedAt = rows[0].completed_at;

    if (isCompleted && !completedAt) {
      completedAt = new Date();
    }

    if (!isCompleted) {
      completedAt = null;
    }

    const result = await pool.query(
      "UPDATE tasks SET title=$1, description=$2, completed=$3, due_date=$4, status=$5, assignee=$6, completed_at=$7, effort=$8 WHERE id=$9 AND team_id=$10 RETURNING *",
      [
      title,
      description,
      isCompleted,
      dueDate || null,
      status,
      assignee || null,
      completedAt,
      effort || 3,
      req.params.id,
      req.user.team_id
    ]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: "Task not found" });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update task" });
  }
});

router.delete("/:id", authenticate, async (req, res) => {
  try {
    const result = await pool.query(
      "DELETE FROM tasks WHERE id=$1 AND team_id=$2 RETURNING *",
      [req.params.id, req.user.team_id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: "Task not found" });
    res.json({ message: "Task deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete task" });
  }
});

module.exports = router;
