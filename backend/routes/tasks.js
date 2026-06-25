const express = require("express");
const pool = require("../db");
const router = express.Router();

// GET all tasks
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM tasks ORDER BY id ASC");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

// GET task by ID
router.get("/:id", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM tasks WHERE id = $1", [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch task" });
  }
});

// POST create a new task
router.post("/", async (req, res) => {
  const { title, description, completed, dueDate } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO tasks (title, description, completed, due_date) VALUES ($1, $2, $3, $4) RETURNING *",
      [title, description, completed || false, dueDate]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create task" });
  }
});

// PUT update a task
router.put("/:id", async (req, res) => {
  const { title, description, completed, dueDate } = req.body;
  try {
    const result = await pool.query(
      "UPDATE tasks SET title = $1, description = $2, completed = $3, due_date = $4 WHERE id = $5 RETURNING *",
      [title, description, completed, dueDate, req.params.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update task" });
  }
});

// DELETE a task
router.delete("/:id", async (req, res) => {
  try {
    const result = await pool.query("DELETE FROM tasks WHERE id = $1 RETURNING *", [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json({ message: "Task deleted", task: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete task" });
  }
});

module.exports = router;
