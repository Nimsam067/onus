import { useState } from "react";
import "./AddTaskModal.css"; 
import { createTask } from "../api/tasks";

function AddTaskModal({ onClose, onTaskCreated }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  async function handleSubmit(e) {
  e.preventDefault();

  try {
    await createTask({
      title,
      description,
      dueDate,
    });

    onTaskCreated();
    onClose();
  } catch (err) {
    console.error(err);
    alert("Failed to create task.");
  }
  } 

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2>Add New Task</h2>
          <p>Create a new task for your project.</p>
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
              rows="5"
              placeholder="Describe this task..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Due Date</label>

            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>

          <div className="button-row">
            <button
              type="button"
              className="cancel-btn"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="create-btn"
              disabled={!title.trim()}
            >
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTaskModal;