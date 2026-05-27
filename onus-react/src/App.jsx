import TaskDashboard from "./components/tasks_dashboard";
import ContentDashboard from "./components/content_dashboard";
import "./App.css";
import DeadlineTracker from "./components/deadline_tracker";
import ProjectCompletion from "./components/project_completion";


function App() {
  return (
    /*
    <div>
      <TaskDashboard />
      <ContentDashboard />
    </div>*/

    <div className="app-container">
      <div className="dashboard-grid">
        <div className="card">
          <TaskDashboard />
        </div>

        <div className="card">
          <ContentDashboard />
        </div>

        <div className="card">
          <DeadlineTracker />
        </div>

        <div className="card">
          <ProjectCompletion />
        </div>
      </div>
    </div>
  );
}

export default App;