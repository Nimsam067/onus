function ProjectCompletion() {
  const completionPercentage = 72;

  return (
    <div className="project-completion-card">
      <div className="project-completion-header">
        <h2>Project Completion</h2>
      </div>

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