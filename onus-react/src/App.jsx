import TaskDashboard from "./components/tasks_dashboard";
import ContentDashboard from "./components/content_dashboard";
import Sidebar from "./components/sidebar";
import "./App.css";
import DeadlineTracker from "./components/deadline_tracker";
import ProjectCompletion from "./components/project_completion";



function App() {
  return (
    // The main container for all the app's contents
    <div className="app-container">

      {/* The sidebar component on the left */}
      <Sidebar />

      {/* The main content area on the right */}
      <div className="main-content">

        {/* The dashboard grid that holds all major components */}
        <div className="dashboard-grid">
          <div className="card">
            <ContentDashboard />
          </div>
          
          <div className="card">
            <TaskDashboard />
          </div>

           <div className="card">
            <DeadlineTracker />
          </div>

          <div className="card">
            <ProjectCompletion />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;