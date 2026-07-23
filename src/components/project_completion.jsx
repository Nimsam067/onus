import { useMemo } from "react";

function ProjectCompletion({ tasks }) {
  const completionPercentage = useMemo(() => {
    const totalWeight = tasks.reduce(
      (sum, task) => sum + (task.effort || 3),
      0
    );

    const completedWeight = tasks
      .filter(task => task.status === "done")
      .reduce(
        (sum, task) => sum + (task.effort || 3),
        0
      );

    const completionPercentage =
      totalWeight === 0
        ? 0
        : Math.round(
          (completedWeight / totalWeight) * 100
        );
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