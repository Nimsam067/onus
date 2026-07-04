import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/sidebar";

function Layout({ onLogout }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="app-container">
      <div className="top-bar">
        <div className="top-bar-left">
          <button className="hamburger-btn" onClick={() => setIsOpen(!isOpen)}>☰</button>
          <span className="top-bar-title">Name's Dashboard</span>
        </div>
        <span className="top-bar-team">CS1010</span>
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
