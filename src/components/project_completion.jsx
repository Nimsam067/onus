import { useMemo } from "react";

function ProjectCompletion({ tasks }) {
  const completionPercentage = useMemo(() => {
    const totalTasks = tasks.length;

    const completedTasks = tasks.filter(
      (task) => task.completed
    ).length;

    return totalTasks === 0
      ? 0
      : Math.round((completedTasks / totalTasks) * 100);
  }, [tasks]);

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