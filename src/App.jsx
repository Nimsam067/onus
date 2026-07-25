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
  const [expandedCard, setExpandedCard] = useState(null);

  useEffect(() => { loadTasks(); }, []);

  useEffect(() => {
    if (!expandedCard) return;
    const onEsc = (e) => { if (e.key === "Escape") setExpandedCard(null); };
    document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, [expandedCard]);

  async function loadTasks() {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      console.error(err);
    }
  }

  const myTasks = tasks.filter(t => t.assignee === user?.displayName);
  const displayTasks = view === "individual" ? myTasks : tasks;

  const expandBtn = (key) => (
    <button
      className="card-expand-btn"
      onClick={() => setExpandedCard(key)}
      title="Expand"
    >
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
      </svg>
    </button>
  );

  return (
    <div>
      <div className="dash-toggle">
        <button
          className={`dash-toggle-btn${view === "team" ? " dash-toggle-active" : ""}`}
          onClick={() => setView("team")}
        >Team</button>
        <button
          className={`dash-toggle-btn${view === "individual" ? " dash-toggle-active" : ""}`}
          onClick={() => setView("individual")}
        >Individual</button>
      </div>

      {view === "individual" ? (
        <div className="dashboard-layout individual-layout">
          <div className="card contribution-card">
            {expandBtn("contribution")}
            <ContributionChart tasks={tasks} highlightName={user?.displayName} />
          </div>
          <div className="card tasks-card">
            {expandBtn("tasks")}
            <TasksDashboard
              tasks={myTasks}
              setTasks={setTasks}
              onAddTask={() => { setEditingTask(null); setShowModal(true); }}
              onEditTask={(task) => { setEditingTask(task); setShowModal(true); }}
            />
          </div>
          <div className="card deadline-card-wrapper">
            {expandBtn("deadline")}
            <DeadlineTracker tasks={myTasks} />
          </div>
        </div>
      ) : (
        <div className="dashboard-layout">
          <div className="card commit-card">
            {expandBtn("commit")}
            <CommitProgress tasks={tasks} />
          </div>
          <div className="card contribution-card">
            {expandBtn("contribution")}
            <ContributionChart tasks={tasks} />
          </div>
          <div className="card tasks-card">
            {expandBtn("tasks")}
            <TasksDashboard
              tasks={tasks}
              setTasks={setTasks}
              onAddTask={() => { setEditingTask(null); setShowModal(true); }}
              onEditTask={(task) => { setEditingTask(task); setShowModal(true); }}
            />
          </div>
          <div className="card completion-card">
            {expandBtn("completion")}
            <ProjectCompletion tasks={tasks} />
          </div>
          <div className="card deadline-card-wrapper">
            {expandBtn("deadline")}
            <DeadlineTracker tasks={tasks} />
          </div>
          <div className="card resources-card">
            {expandBtn("resources")}
            <ResourcesCard />
          </div>
        </div>
      )}

      {showModal && (
        <AddTaskModal
          task={editingTask}
          onClose={() => { setShowModal(false); setEditingTask(null); }}
          onTaskCreated={loadTasks}
        />
      )}

      {expandedCard && (
        <div className="card-overlay" onClick={() => setExpandedCard(null)}>
          <div className="card-expanded" onClick={e => e.stopPropagation()}>
            <button className="card-close-btn" onClick={() => setExpandedCard(null)}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M18 6 6 18M6 6l12 12"/>
              </svg>
            </button>
            {expandedCard === "contribution" && (
              <ContributionChart
                tasks={tasks}
                highlightName={view === "individual" ? user?.displayName : undefined}
              />
            )}
            {expandedCard === "tasks" && (
              <TasksDashboard
                tasks={displayTasks}
                setTasks={setTasks}
                onAddTask={() => { setEditingTask(null); setShowModal(true); setExpandedCard(null); }}
                onEditTask={(task) => { setEditingTask(task); setShowModal(true); setExpandedCard(null); }}
              />
            )}
            {expandedCard === "deadline" && <DeadlineTracker tasks={displayTasks} />}
            {expandedCard === "resources" && <ResourcesCard />}
            {expandedCard === "commit" && <CommitProgress tasks={tasks} />}
            {expandedCard === "completion" && <ProjectCompletion tasks={tasks} />}
          </div>
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
      if (firebaseUser) {
        const isEmailPassword = firebaseUser.providerData[0]?.providerId === "password";
        if (isEmailPassword && !firebaseUser.emailVerified) {
          setUser(null);
          setTeam(undefined);
          return;
        }
        setUser(firebaseUser);
        try {
          const { team } = await getMyTeam();
          setTeam(team);
        } catch {
          setTeam(null);
        }
      } else {
        setUser(null);
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
