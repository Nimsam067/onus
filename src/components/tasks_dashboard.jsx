import { useEffect, useState } from "react";
import TaskCard from "./tasks_cards";
import "../App.css";
import {
  getTasks,
  deleteTask,
  updateTask,
} from "../api/tasks";

function TasksDashboard({
  onAddTask,
  refresh,
  onEditTask,
}) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
  setLoading(true);

  getTasks()
    .then(setTasks)
    .catch((err) => setError(err.message))
    .finally(() => setLoading(false));
  }, [refresh]);

  async function handleDelete(id) {
    try {
      await deleteTask(id);

      const updatedTasks = await getTasks();
      setTasks(updatedTasks);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleToggleComplete(task) {
  try {
    await updateTask(task.id, {
      title: task.title,
      description: task.description,
      dueDate: task.due_date,
      completed: !task.completed,
    });

    const updatedTasks = await getTasks();
    setTasks(updatedTasks);
  } catch (err) {
    console.error(err);
  }
  }

  async function handleStatusChange(task, newStatus) {
  try {
    await updateTask(task.id, {
      title: task.title,
      description: task.description,
      dueDate: task.due_date,
      status: newStatus,
      assignee: task.assignee,
      completed: newStatus === "done",
    });

    const updatedTasks = await getTasks();
    console.log(tasks);
    setTasks(updatedTasks);
  } catch (err) {
    console.error(err);
  }
  }

  function handleEdit(task) {
    onEditTask(task);
  }

  if (loading) return <div className="tasks-dashboard"><p>Loading tasks...</p></div>;
  if (error) return <div className="tasks-dashboard"><p>Error: {error}</p></div>;

  return (
    <div className="tasks-dashboard">
      <div className="tasks-header">
        <h2 className="card-title">Tasks Dashboard</h2>
        <button className="add-task-btn" onClick={onAddTask}>
          + New Task
        </button>
      </div>

      <div className="tasks-grid">
        {tasks.length === 0 ? (
          <p>No tasks available</p>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onStatusChange={handleStatusChange}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default TasksDashboard;
