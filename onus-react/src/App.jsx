import TaskDashboard from "./components/tasks_dashboard";
import ContentDashboard from "./components/content_dashboard";
import "./App.css";


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
      </div>
    </div>
  );
}

export default App;