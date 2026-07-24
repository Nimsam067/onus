import { useNavigate, useLocation } from "react-router-dom";
import { auth } from "../firebase";
import { useState, useEffect } from "react";
import { getMyTeam } from "../api/teams";
import ProfileModal from "./ProfileModal";


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

  const [showProfile, setShowProfile] = useState(false);
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

        <button
          className="profile-circle"
          onClick={() => setShowProfile(!showProfile)}
        >
          {initial}
        </button>

        {showProfile && (
          <ProfileModal
            user={user}
            team={team}
            onLogout={onLogout}
            onClose={() => setShowProfile(false)}
          />
        )}

        <button className="sidebar-button logout-btn" onClick={onLogout}>
          Log out
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
