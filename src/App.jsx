/* Navigation Helpers */
import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase";
import { getMyTeam } from "./api/teams";
import { getTasks } from "./api/tasks";

/* Components */
import DeadlineTracker from "./components/deadline_tracker";
import ProjectCompletion from "./components/project_completion";
import CommitProgress from "./components/commit_progress";
import AddTaskModal from "./components/AddTaskModal";
import TasksDashboard from "./components/tasks_dashboard";
import ContributionChart from "./components/contribution_chart";
import ResourcesCard from "./components/ResourcesCard";

/* Pages */
import LoginPage from "./pages/LoginPage";
import CalendarPage from "./pages/CalendarPage";
import TasksPage from "./pages/TasksPage";
import TeamSetupPage from "./pages/TeamSetupPage";

/* Styling */
import "./App.css";
import "./components/tasks_dashboard.css";
import "./components/sidebar.css";
import "./components/project_completion.css";
import "./components/commit_progress.css";
import "./components/deadline_tracker.css";
import "./components/contribution_chart.css";

/* Layout Helper */
import Layout from "./layout";

function DashboardPage({ user }) {
  const [showModal, setShowModal] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [view, setView] = useState("team");

  useEffect(() => { loadTasks(); }, []);

  async function loadTasks() {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      console.error(err);
    }
  }

  const myTasks = tasks.filter(t => t.assignee === user?.displayName);

  return (
    <div>
      <div className="dash-toggle">
        <button
          className={`dash-toggle-btn${view === "team" ? " dash-toggle-active" : ""}`}
          onClick={() => setView("team")}
        >
          Team
        </button>
        <button
          className={`dash-toggle-btn${view === "individual" ? " dash-toggle-active" : ""}`}
          onClick={() => setView("individual")}
        >
          Individual
        </button>
      </div>

      {view === "individual" ? (
        <div className="dashboard-layout individual-layout">
          <div className="card contribution-card">
            <ContributionChart tasks={tasks} highlightName={user?.displayName} />
          </div>

          <div className="card tasks-card">
            <TasksDashboard
              tasks={myTasks}
              setTasks={setTasks}
              onAddTask={() => { setEditingTask(null); setShowModal(true); }}
              onEditTask={(task) => { setEditingTask(task); setShowModal(true); }}
            />
          </div>

          <div className="card deadline-card-wrapper">
            <DeadlineTracker tasks={myTasks} />
          </div>

          {showModal && (
            <AddTaskModal
              task={editingTask}
              onClose={() => { setShowModal(false); setEditingTask(null); }}
              onTaskCreated={loadTasks}
            />
          )}
        </div>
      ) : (
        <div className="dashboard-layout">
          <div className="card commit-card">
            <CommitProgress tasks={tasks} />
          </div>

          <div className="card contribution-card">
            <ContributionChart tasks={tasks} />
          </div>

          <div className="card tasks-card">
            <TasksDashboard
              tasks={tasks}
              setTasks={setTasks}
              onAddTask={() => { setEditingTask(null); setShowModal(true); }}
              onEditTask={(task) => { setEditingTask(task); setShowModal(true); }}
            />
          </div>

          <div className="card completion-card">
            <ProjectCompletion tasks={tasks} />
          </div>

          <div className="card deadline-card-wrapper">
            <DeadlineTracker tasks={tasks} />
          </div>

          <div className="card resources-card">
            <ResourcesCard />
          </div>

          {showModal && (
            <AddTaskModal
              task={editingTask}
              onClose={() => { setShowModal(false); setEditingTask(null); }}
              onTaskCreated={loadTasks}
            />
          )}
        </div>
      )}
    </div>
  );
}

function App() {
  const [user, setUser] = useState(undefined);
  const [team, setTeam] = useState(undefined);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser ?? null);
      if (firebaseUser) {
        try {
          const { team } = await getMyTeam();
          setTeam(team);
        } catch {
          setTeam(null);
        }
      } else {
        setTeam(undefined);
      }
    });
    return unsubscribe;
  }, []);

  if (user === undefined || (user && team === undefined)) return null;

  if (user && team === null) {
    return (
      <TeamSetupPage onTeamJoined={async () => {
        const { team } = await getMyTeam();
        setTeam(team);
      }} />
    );
  }

  return (
    <Routes>
      <Route
        path="/login"
        element={user ? <Navigate to="/dashboard" replace /> : <LoginPage />}
      />
      <Route
        element={
          user
            ? <Layout user={user} onLogout={() => { signOut(auth); setTeam(undefined); }} />
            : <Navigate to="/login" replace />
        }
      >
        <Route path="/dashboard" element={<DashboardPage user={user} />} />
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
