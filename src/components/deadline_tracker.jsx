import { useEffect, useState } from "react";
import { getTasks } from "../api/tasks";

function DeadlineTracker({ refresh }) {
  const [deadlines, setDeadlines] = useState([]);

  useEffect(() => {
    getTasks().then((tasks) => {
      const withDates = tasks
        .filter((t) => t.due_date)
        .sort((a, b) => new Date(a.due_date) - new Date(b.due_date));
      setDeadlines(withDates);
    });
  }, [refresh]);

  function formatDate(isoDate) {
    return new Date(isoDate).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  return (
    <div className="deadline-card">
      <h2 className="card-title">Deadline Tracker</h2>
      <div className="deadline-list">
        {deadlines.length === 0 ? (
          <p style={{ color: "#9ca3af", fontSize: "0.85rem" }}>No deadlines yet</p>
        ) : (
          deadlines.map((task) => (
            <div className="deadline-row" key={task.id}>
              <div className="deadline-left">
                <span className="small-calendar-icon">📅</span>
                <p>{task.title}</p>
              </div>
              <p className="deadline-date">{formatDate(task.due_date)}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default DeadlineTracker;
