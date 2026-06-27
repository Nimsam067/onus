function Sidebar({ onLogout }) {
  return (
    <div className="sidebar">
      <div className="sidebar-top">
        <button className="sidebar-button">Home</button>
        <button className="sidebar-button">Tasks</button>
        <button className="sidebar-button">Calendar</button>
        <button className="sidebar-button">Settings</button>
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
