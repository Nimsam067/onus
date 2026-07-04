import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const NAV_ITEMS = [
  { label: "Home",     icon: "⌂", path: "/dashboard" },
  { label: "Tasks",    icon: "✓", path: "/dashboard" },
  { label: "Calendar", icon: "▦", path: "/calendar" },
  { label: "Settings", icon: "⚙", path: "/settings" },
];

function Sidebar({ onLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className={`sidebar ${isOpen ? "sidebar-open" : ""}`}>
      <div className="sidebar-top">
        <button className="sidebar-button hamburger-btn" onClick={() => setIsOpen(!isOpen)}>
          <span className="nav-icon">☰</span>
          <span className="nav-label">Menu</span>
        </button>

        {NAV_ITEMS.map((item) => (
          <button
            key={item.label}
            className={`sidebar-button ${location.pathname === item.path ? "sidebar-button-active" : ""}`}
            onClick={() => navigate(item.path)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
      </div>

      <div className="sidebar-bottom">
        <button className="profile-circle"></button>
        <button className="sidebar-button logout-btn" onClick={onLogout}>
          <span className="nav-icon">→</span>
          <span className="nav-label">Log out</span>
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
