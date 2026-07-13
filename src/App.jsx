/* Navigation Helpers */
import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase";

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
import TasksPage from "./pages/TasksPage";


/* Styling Documents */
import "./App.css";
import "./components/tasks_dashboard.css";
import "./components/sidebar.css";
import "./components/project_completion.css";
import "./components/commit_progress.css";
import "./components/deadline_tracker.css";
import "./components/sidebar.css";
import "./components/contribution_chart.css";

/* Layout Helper */
import Layout from "./layout";


function DashboardPage() {
  const [showModal, setShowModal] = useState(false);
  const [taskRefresh, setTaskRefresh] = useState(0);
  const [editingTask, setEditingTask] = useState(null);

  return (
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
  // undefined = still checking, null = logged out, object = logged in
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser ?? null);
    });
    return unsubscribe;
  }, []);

  if (user === undefined) return null;

  return (
    <Routes>
      <Route
        path="/login"
        element={user ? <Navigate to="/dashboard" replace /> : <LoginPage />}
      />
      <Route
        element={
          user
            ? <Layout user={user} onLogout={() => signOut(auth)} />
            : <Navigate to="/login" replace />
        }
      >
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/tasks" element={<TasksPage />} />
      </Route>
      <Route
        path="*"
        element={<Navigate to={user ? "/dashboard" : "/login"} replace />}
      />
    </Routes>
  );
}

export default App;
