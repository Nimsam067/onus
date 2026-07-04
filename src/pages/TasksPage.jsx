import { useState, useEffect } from "react";
import { getTasks } from "../api/tasks";
import "./TasksPage.css";

const STATUSES = ["not_started", "in_progress", "done"];
const STATUS_LABELS = {
  not_started: "Not Started",
  in_progress: "In Progress",
  done: "Done",
};
const STATUS_COLORS = {
  not_started: "status-not-started",
  in_progress: "status-in-progress",
  done: "status-done",
};

function TaskCard({ task }) {
  return (
    <div className="kanban-card">
      <div className="kanban-card-title">{task.title}</div>
      {task.description && (
        <div className="kanban-card-desc">{task.description}</div>
      )}
      <div className="kanban-card-footer">
        <span className={`status-badge ${STATUS_COLORS[task.status] || "status-not-started"}`}>
          {STATUS_LABELS[task.status] || "Not Started"}
        </span>
        {task.assignee && (
          <span className="assignee-badge">{task.assignee}</span>
        )}
        {task.due_date && (
          <span className="due-date-label">Due {task.due_date.slice(0, 10)}</span>
        )}
      </div>
    </div>
  );
}

function KanbanColumn({ title, tasks, colorClass }) {
  return (
    <div className="kanban-column">
      <div className={`kanban-column-header ${colorClass}`}>
        <span className="kanban-column-title">{title}</span>
        <span className="kanban-column-count">{tasks.length}</span>
      </div>
      <div className="kanban-cards">
        {tasks.length === 0 ? (
          <p className="kanban-empty">No tasks</p>
        ) : (
          tasks.map((task) => <TaskCard key={task.id} task={task} />)
        )}
      </div>
    </div>
  );
}

function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("state");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTasks()
      .then(setTasks)
      .finally(() => setLoading(false));
  }, []);

  const byStateColumns = STATUSES.map((s) => ({
    key: s,
    title: STATUS_LABELS[s],
    colorClass: STATUS_COLORS[s],
    tasks: tasks.filter((t) => (t.status || "not_started") === s),
  }));

  const assignees = [...new Set(tasks.map((t) => t.assignee || "Unassigned"))];
  const byNameColumns = assignees.map((name) => ({
    key: name,
    title: name,
    colorClass: "status-name",
    tasks: tasks.filter((t) => (t.assignee || "Unassigned") === name),
  }));

  const columns = filter === "state" ? byStateColumns : byNameColumns;

  return (
    <div className="tasks-page">
      <div className="tasks-page-header">
        <h2 className="tasks-page-title">Tasks</h2>
        <div className="filter-toggle">
          <button
            className={`filter-btn ${filter === "state" ? "filter-btn-active" : ""}`}
            onClick={() => setFilter("state")}
          >
            By State
          </button>
          <button
            className={`filter-btn ${filter === "name" ? "filter-btn-active" : ""}`}
            onClick={() => setFilter("name")}
          >
            By Name
          </button>
        </div>
      </div>

      {loading ? (
        <p className="tasks-loading">Loading tasks...</p>
      ) : (
        <div className="kanban-board">
          {columns.map((col) => (
            <KanbanColumn
              key={col.key}
              title={col.title}
              tasks={col.tasks}
              colorClass={col.colorClass}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default TasksPage;
