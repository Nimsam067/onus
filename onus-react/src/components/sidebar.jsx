function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-top">
        <button className="sidebar-button">Home</button>
        <button className="sidebar-button">Tasks</button>
        <button className="sidebar-button">Calendar</button>
        <button className="sidebar-button">Settings</button>
      </div>

      <div className="profile-circle"></div>
    </div>
  );
}

export default Sidebar;