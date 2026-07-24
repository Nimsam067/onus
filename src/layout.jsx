import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/sidebar";
import { getMyTeam } from "../api/teams";

function Layout({ user, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  const firstName = user?.displayName?.split(" ")[0] ?? "My";
  const [team, setTeam] = useState(null);

  useEffect(() => {
    async function loadTeam() {
      try {
        const { team } = await getMyTeam();
        setTeam(team);
      } catch (err) {
        console.error(err);
      }
    }

    loadTeam();
  }, []);

  return (
    <div className="app-container">
      <div className="top-bar">
        <div className="top-bar-left">
          <button className="hamburger-btn" onClick={() => setIsOpen(!isOpen)}>☰</button>
          <span className="top-bar-title">{firstName}'s Dashboard</span>
        </div>
        <span className="top-bar-team">
          {team?.name || "No Team"}
        </span>
      </div>

      {isOpen && <div className="sidebar-overlay" onClick={() => setIsOpen(false)} />}

      <Sidebar isOpen={isOpen} onLogout={onLogout} onClose={() => setIsOpen(false)} />

      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
