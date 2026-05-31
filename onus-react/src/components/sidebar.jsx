function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-top">
        <button className="sidebar-button">Home</button>
        <button className="sidebar-button">Tasks</button>
        <button className="sidebar-button">Calendar</button>
        <button className="sidebar-button">Settings</button>
      </div>

      <button className="profile-circle"></button>
    </div>
  );
}

export default Sidebar;