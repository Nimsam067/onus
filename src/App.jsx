/* Navigation Helpers */
import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

/* Components */
import DeadlineTracker from "./components/deadline_tracker";
import ProjectCompletion from "./components/project_completion";
import CommitProgress from "./components/commit_progress";
import AddTaskModal from "./components/AddTaskModal";
import TasksDashboard from "./components/tasks_dashboard";
import ContributionChart from "./components/contribution_chart";
import Sidebar from "./components/sidebar";

/* Pages */
import LoginPage from "./pages/LoginPage";
import CalendarPage from "./pages/CalendarPage";


/* Styling Documents */
import "./App.css";
import "./components/tasks_dashboard.css";
import "./components/sidebar.css";
import "./components/project_completion.css";
import "./components/commit_progress.css";
import "./components/deadline_tracker.css";
import "./components/sidebar.css";
import "./components/contribution_chart.css";


function Dashboard({ onLogout }) {
  const [showModal, setShowModal] = useState(false);
  const [taskRefresh, setTaskRefresh] = useState(0);
  const [editingTask, setEditingTask] = useState(null);

  return (
    <div className="app-container">
      <Sidebar onLogout={onLogout} />

      <div className="main-content">
        <div className="dashboard-layout">
          <div className="card commit-card">
            <CommitProgress />
          </div>

          <div className="card contribution-card">
            <ContributionChart />
          </div>

          <div className="card tasks-card">
            <TasksDashboard
              refresh={taskRefresh}
              onAddTask={() => {
                setEditingTask(null);
                setShowModal(true);
          }}
              onEditTask={(task) => {
              setEditingTask(task);
              setShowModal(true);
          }}
/>
          </div>

          <div className="card completion-card">
            <ProjectCompletion refresh={taskRefresh}
            />
          </div>

          <div className="card deadline-card-wrapper">
            <DeadlineTracker />
          </div>
        </div>
      </div>

      {showModal && (
        <AddTaskModal
          task={editingTask}
          onClose={() => {
            setShowModal(false);
            setEditingTask(null);
          }}
          onTaskCreated={() => setTaskRefresh((r) => r + 1)}
        />
      )}
    </div>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => localStorage.getItem("onus_auth") === "true"
  );

  function handleLogin() {
    localStorage.setItem("onus_auth", "true");
    setIsLoggedIn(true);
  }

  function handleLogout() {
    localStorage.removeItem("onus_auth");
    setIsLoggedIn(false);
  }

  return (
    <Routes>
      <Route
        path="/login"
        element={
          isLoggedIn ? <Navigate to="/dashboard" replace /> : <LoginPage onLogin={handleLogin} />
        }
      />
      <Route
        path="/dashboard"
        element={
          isLoggedIn ? <Dashboard onLogout={handleLogout} /> : <Navigate to="/login" replace />
        }
      />
      <Route
        path="/calendar"
        element={
          isLoggedIn ? <CalendarPage /> : <Navigate to="/login" replace />
        }
      />
      <Route
        path="*"
        element={<Navigate to={isLoggedIn ? "/dashboard" : "/login"} replace />}
      />
    </Routes>
  );
}

export default App;
