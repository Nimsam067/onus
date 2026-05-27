import TaskDashboard from "./components/tasks_dashboard";
import ContentDashboard from "./components/content_dashboard";
import Sidebar from "./components/sidebar";
import "./App.css";


function App() {
  return (
    <div className="app-container">

      <Sidebar />

      <div className="main-content">
        <div className="dashboard-grid">
          <div className="card">
            <TaskDashboard />
          </div>

          <div className="card">
            <ContentDashboard />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;