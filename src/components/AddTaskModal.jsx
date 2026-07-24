import { useState, useEffect } from "react";
import "./AddTaskModal.css";
import { createTask, updateTask } from "../api/tasks";
import { getTeamMembers } from "../api/teams";

const STATUS_OPTIONS = [
  { value: "not_started", label: "Not Started" },
  { value: "in_progress", label: "In Progress" },
  { value: "done",        label: "Done" },
];

function AddTaskModal({ task, onClose, onTaskCreated }) {
  const [title,       setTitle]       = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [dueDate,     setDueDate]     = useState(task?.due_date?.slice(0, 10) || "");
  const [assignee,    setAssignee]    = useState(task?.assignee || "");
  const [status,      setStatus]      = useState(task?.status || "not_started");
  const [effort, setEffort] = useState(task?.effort || 3);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    getTeamMembers().then(setMembers).catch(() => {});
  }, []);

function formatName(name) {
  return name
    .trim()
    .toLowerCase()
    .split(" ")
    .filter(word => word.length > 0)
    .map(word =>
      word.charAt(0).toUpperCase() +
      word.slice(1)
    )
    .join(" ");
}

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (task) {
        await updateTask(task.id, {
          title,
          description,
          dueDate,
          completed: task.completed,
          status,
          assignee,
          effort,
        });
      } else {
        await createTask({ title, description, dueDate, status, assignee, effort });
      }
      onTaskCreated();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to save task.");
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{task ? "Edit Task" : "Add New Task"}</h2>
          <p>Fill in the details for this task.</p>
        </div>

        <form className="task-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title *</label>
            <input
              type="text"
              placeholder="Enter task title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              rows="3"
              placeholder="Describe this task..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Due Date</label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Status</label>
              <select value={status} onChange={(e) => setStatus(e.target.value)}>
                {STATUS_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>In Charge</label>
            <select value={assignee} onChange={(e) => setAssignee(e.target.value)}>
              <option value="">Unassigned</option>
              {members.map((m) => (
                <option key={m.id} value={m.display_name}>
                  {m.display_name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
          <label>Task Effort: {effort}</label>

          <div className="effort-stars">
            {"★".repeat(effort)}
            {"☆".repeat(5 - effort)}
          </div>

          <input
            type="range"
            min="1"
            max="5"
            step="1"
            value={effort}
            onChange={(e) => setEffort(Number(e.target.value))}
            className="effort-slider"
          />

          <div className="effort-labels">
          <span>Easy</span>
          <span>Major</span>
          </div>
        </div>

          <div className="button-row">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="create-btn" disabled={!title.trim()}>
              {task ? "Save Changes" : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTaskModal;
