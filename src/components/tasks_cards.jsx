import { useState } from "react";

const STATUS_LABELS = {
  not_started: "Not Started",
  in_progress: "In Progress",
  done: "Done",
};

function TaskCard({ task, onEdit, onDelete, onStatusChange, }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const statusKey = task.status || "not_started";

  return (
    <div className="task-card">
      <div className="task-header">
        <h3>{task.title}</h3>
        <button
          className="task-menu-btn"
          onClick={(e) => { e.stopPropagation(); setMenuOpen(!menuOpen); }}
        >
          ⋮
        </button>
        {menuOpen && (
          <div className="task-menu">
            <button
              className="edit-btn"
              onClick={(e) => { e.stopPropagation(); onEdit(task); setMenuOpen(false); }}
            >
              Edit
            </button>
            <button
              className="delete-btn"
              onClick={(e) => { e.stopPropagation(); onDelete(task.id); setMenuOpen(false); }}
            >
              Delete
            </button>
          </div>
        )}
      </div>

      {task.description && (
        <p className="task-description">{task.description}</p>
      )}

      <div className="task-footer">

        <div className="task-footer-top">
          <select
            className={`task-status-select task-status-${statusKey}`}
            value={statusKey}
            onChange={(e) => onStatusChange(task, e.target.value)}
          >
            <option value="not_started">Not Started</option>
            <option value="in_progress">In Progress</option>
            <option value="done">Done</option>
          </select>
          {task.assignee && (
            <span className="task-assignee">{task.assignee}</span>
          )}
        </div>

        <div className="task-footer-bottom">
          {task.status === "done" && task.completed_at ? (
            <span className="task-due-date">
              Completed{" "}
              {new Date(task.completed_at).toLocaleDateString(
                "en-GB",
                {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                }
              )}
            </span>
          ) : (
            task.due_date && (
              <span className="task-due-date">
                Due{" "}
                {new Date(task.due_date).toLocaleDateString(
                  "en-GB",
                  {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  }
                )}
              </span>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default TaskCard;
