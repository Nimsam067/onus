import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import TasksDashboard from "./components/tasks_dashboard";
import ContentDashboard from "./components/content_dashboard";
import Sidebar from "./components/sidebar";
import "./App.css";
import DeadlineTracker from "./components/deadline_tracker";
import ProjectCompletion from "./components/project_completion";
import CommitProgress from "./components/commit_progress";
import AddTaskModal from "./components/AddTaskModal";
import LoginPage from "./pages/LoginPage";

function Dashboard({ onLogout }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="app-container">
      <Sidebar onLogout={onLogout} />

      <div className="main-content">
        <div className="dashboard-layout">
          <div className="card commit-card">
            <CommitProgress />
          </div>

          <div className="card contribution-card">
            <ContentDashboard />
          </div>

          <div className="card tasks-card">
            <TasksDashboard onAddTask={() => setShowModal(true)} />
          </div>

          <div className="card completion-card">
            <ProjectCompletion />
          </div>

          <div className="card deadline-card-wrapper">
            <DeadlineTracker />
          </div>
        </div>
      </div>

      {showModal && <AddTaskModal onClose={() => setShowModal(false)} />}
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
        path="*"
        element={<Navigate to={isLoggedIn ? "/dashboard" : "/login"} replace />}
      />
    </Routes>
  );
}

export default App;
