import { useNavigate, useLocation } from "react-router-dom";
import { auth } from "../firebase";

const NAV_ITEMS = [
  { label: "Home", path: "/dashboard" },
  { label: "Tasks", path: "/tasks" },
  { label: "Calendar", path: "/calendar" },
];

function Sidebar({ isOpen, onLogout, onClose }) {
  const navigate = useNavigate();
  const location = useLocation();
  const user = auth.currentUser;
  const initial =
    user?.displayName?.charAt(0).toUpperCase() || "?";

  function handleNav(path) {
    navigate(path);
    onClose();
  }

  return (
    <div className={`sidebar ${isOpen ? "sidebar-open" : ""}`}>
      <div className="sidebar-top">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.label}
            className={`sidebar-button ${location.pathname === item.path ? "sidebar-button-active" : ""}`}
            onClick={() => handleNav(item.path)}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="sidebar-bottom">

        <button className="profile-circle">
          {initial}
        </button>

        <button className="sidebar-button logout-btn" onClick={onLogout}>
          Log out
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
