import { useEffect, useState } from "react";
import TaskCard from "./tasks_cards";
import "../App.css";


function TasksDashboard({ onAddTask }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";


  useEffect(() => {
    fetch(`${API_URL}/api/tasks`)
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching tasks:", err);
        setError(err.message);
        setLoading(false);
      });
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
            <TaskCard
              key={task.id}
              task={task}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default TasksDashboard;