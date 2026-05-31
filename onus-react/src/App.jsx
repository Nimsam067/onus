import TaskDashboard from "./components/tasks_dashboard";
import ContentDashboard from "./components/content_dashboard";
import Sidebar from "./components/sidebar";
import "./App.css";
import DeadlineTracker from "./components/deadline_tracker";
import ProjectCompletion from "./components/project_completion";
import CommitProgress from "./components/commit_progress";



function App() {
  return (
    // The main container for all the app's contents
    <div className="app-container">

      {/* The sidebar component on the left */}
      <Sidebar />

      {/* The main content area on the right */}
      <div className="main-content">

        {/* The dashboard grid that holds all major components */}
        <div className="dashboard-layout">

          {/* The left column of the dashboard */}
              <div className="card commit-card">
                <CommitProgress />
              </div>

              <div className="card contribution-card">
                <ContentDashboard />
              </div>


          {/* The right column of the dashboard */}
            <div className="card tasks-card">
              <TaskDashboard />
            </div>

            <div className="card completion-card">
             <ProjectCompletion />
            </div>

            <div className="card deadline-card-wrapper">
              <DeadlineTracker />
            </div>


        </div>
      </div>
    </div>
  );
}

export default App;