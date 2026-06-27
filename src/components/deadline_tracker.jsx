import { useEffect, useState } from "react";
import { getDeadlines } from "../api/deadlines";

function DeadlineTracker() {
  const [deadlines, setDeadlines] = useState([]);

  useEffect(() => {
    getDeadlines().then(setDeadlines);
  }, []);

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
        {deadlines.map((deadline) => (
          <div className="deadline-row" key={deadline.id}>
            <div className="deadline-left">
              <span className="small-calendar-icon">📅</span>
              <p>{deadline.title}</p>
            </div>
            <p className="deadline-date">{formatDate(deadline.date)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DeadlineTracker;
