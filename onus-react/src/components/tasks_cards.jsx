function TaskCard({ task }) {
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
          readOnly
        />

        <h3>{task.title}</h3>

      </div>

      <p className="task-description">
        {task.description}
      </p>

      <div className="task-footer">

        <span>
          Created: {task.createdDate}
        </span>

        <span>
          Assigned: {task.assignedTo}
        </span>

      </div>
    </div>
  );
}

export default TaskCard;