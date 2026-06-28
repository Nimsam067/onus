import { useEffect, useState } from "react";
import { getTasks } from "../api/tasks";

function ProjectCompletion({ refresh }) {
  // Backend integration will be added later
  const [completionPercentage, setCompletionPercentage] = useState(0);

  useEffect(() => {
  async function loadCompletion() {
    try {
      const tasks = await getTasks();

      const totalTasks = tasks.length;

      const completedTasks = tasks.filter(
        (task) => task.completed
      ).length;

      const percentage =
        totalTasks === 0
          ? 0
          : Math.round(
              (completedTasks / totalTasks) * 100
            );

      setCompletionPercentage(percentage);
    } catch (err) {
      console.error(err);
    }
  }

  loadCompletion();
  }, [refresh]);

  return (
    <div className="project-completion-card">
        <h2 className="card-title">Project Completion</h2>
      <div className="progress-section">
        <div className="progress-bar-background">
          <div
            className="progress-bar-fill"
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>

        <p className="progress-percentage">{completionPercentage}%</p>
      </div>
    </div>
  );
}

export default ProjectCompletion;