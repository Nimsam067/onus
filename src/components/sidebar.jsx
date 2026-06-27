import { useNavigate, useLocation } from "react-router-dom";

const NAV_ITEMS = [
  { label: "Home", path: "/dashboard" },
  { label: "Tasks", path: "/dashboard" },
  { label: "Calendar", path: "/calendar" },
  { label: "Settings", path: "/settings" },
];

function Sidebar({ onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="sidebar">
      <div className="sidebar-top">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.label}
            className={`sidebar-button ${location.pathname === item.path ? "sidebar-button-active" : ""}`}
            onClick={() => navigate(item.path)}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="sidebar-bottom">
        <button className="profile-circle"></button>
        <button className="sidebar-button logout-btn" onClick={onLogout}>
          Log out
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
