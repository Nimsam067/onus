import { useEffect, useState } from "react";
import TaskCard from "./tasks_cards";
import { getTasks } from "../api/tasks";
import "../App.css";

function TasksDashboard({ onAddTask }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getTasks()
      .then(setTasks)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

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
            <TaskCard key={task.id} task={task} />
          ))
        )}
      </div>
    </div>
  );
}

export default TasksDashboard;
