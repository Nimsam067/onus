import { Outlet } from "react-router-dom";
import Sidebar from "./components/sidebar";

function Layout({ onLogout }) {
  return (
    <div className="app-container">
      <Sidebar onLogout={onLogout} />

      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;