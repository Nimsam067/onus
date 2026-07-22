import { useEffect, useRef, useState } from "react";
import { getTasks } from "../api/tasks";

function CommitProgress() {
    const [commits, setCommits] = useState([]);

    const timelineRef = useRef(null);

    useEffect(() => {
    if (timelineRef.current) {
    timelineRef.current.scrollLeft =
      timelineRef.current.scrollWidth;
      }
      }, [commits]);

    useEffect(() => {
    async function loadTasks() {
    try {
      const tasks = await getTasks();

      const timeline = [...tasks].sort(
        (a, b) => new Date(a.created_at) - new Date(b.created_at)
      );

      setCommits(timeline);
    } catch (err) {
      console.error(err);
    }
  }

  loadTasks();
  }, []);

    return (
    <div className="commit-progress">

      <h2 className="card-title">
        Activity Timeline
      </h2>

      <div
        className="timeline-container"
        ref={timelineRef}
      >

        {commits.map((commit, index) => (
          <div
            key={commit.id}
            className="timeline-item"
          >
            <div
              className={
                index === commits.length - 1
                  ? "timeline-circle latest-circle"
                  : "timeline-circle"
              }
            />

            <div className="timeline-info">
              <p>{commit.title}</p>
              <span>{commit.assignee || "Unassigned"}</span>
              <span>
                {new Date(commit.created_at).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
              })}
</span>
            </div>
          </div>
        ))}

      </div>

    </div>
  );
}

export default CommitProgress;