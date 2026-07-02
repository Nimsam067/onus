import { useState } from "react";

function TaskCard({
  task,
  onEdit,
  onDelete,
  onToggleComplete,
}) { 

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div
      className={`task-card ${
        task.completed ? "completed-task" : ""
      }`}
    >
      <div className="task-header">
  <input
    type="checkbox"
    checked={task.completed}
    onChange={() => onToggleComplete(task)}
  />

  <h3>{task.title}</h3>

  <button
    className="task-menu-btn"
    onClick={(e) => {
      e.stopPropagation();
      setMenuOpen(!menuOpen);
    }}
  >
    ⋮
  </button>

  {menuOpen && (
    <div className="task-menu">
      <button
        className="edit-btn"
        onClick={(e) => {
          e.stopPropagation();
          onEdit(task);
          setMenuOpen(false);
        }}
      >
        Edit
      </button>

      <button
        className="delete-btn"
        onClick={(e) => {
          e.stopPropagation();
          onDelete(task.id);
          setMenuOpen(false);
        }}
      >
        Delete
      </button>
    </div>
      )}
    </div>

      <p className="task-description">
        {task.description}
      </p>

      <div className="task-footer">

        <span>
          Due: {new Date(task.due_date).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </span>

      </div>
    </div>
  );
}

export default TaskCard;