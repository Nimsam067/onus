import "./ProfileModal.css";

function ProfileModal({ user, team, onClose, onLogout }) {
  return (
    <div className="profile-modal">
      <div className="profile-header">
        <div className="profile-avatar">
          {user?.displayName?.charAt(0).toUpperCase()}
        </div>

        <div>
          <h3>{user?.displayName}</h3>
          <p>{user?.email}</p>
        </div>
      </div>

      <hr />

      <div className="profile-section">
        <h4>Current Team</h4>
        <button className="profile-team-btn">
          {team?.name || "No Team"}
        </button>
      </div>

      <hr />

      <button
        className="sidebar-button logout-btn"
        onClick={onLogout}
      >
        Log Out
      </button>
    </div>
  );
}

export default ProfileModal;