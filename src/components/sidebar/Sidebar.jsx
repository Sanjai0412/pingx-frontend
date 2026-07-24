import { useNavigate, useLocation } from "react-router-dom";
import {
  HomeIcon,
  SearchIcon,
  ProfileIcon,
  LogoutIcon,
  NotificationsIcon,
} from "../Icons";
import "./Sidebar.css";
import { useNotification } from "../../hooks/useNotification";

const Sidebar = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const { notificationsCount } = useNotification();
  const location = useLocation();

  return (
    <aside className="app-sidebar">
      <div className="sidebar-brand" onClick={() => navigate("/")}>
        <span className="brand-logo">P</span>
        <span className="brand-name">PingX</span>
      </div>

      <nav className="sidebar-nav">
        <div
          className={`nav-item ${location.pathname === "/" ? "active" : ""}`}
          onClick={() => navigate("/")}
        >
          <HomeIcon className="nav-icon" />
          <span className="nav-label">Home</span>
        </div>
        <div
          className={`nav-item ${location.pathname === "/search" ? "active" : ""}`}
          onClick={() => navigate("/search")}
        >
          <SearchIcon className="nav-icon" />
          <span className="nav-label">Search</span>
        </div>
        <div
          className={`nav-item ${location.pathname === "/notifications" ? "active" : ""}`}
          onClick={() => navigate("/notifications")}
        >
          <NotificationsIcon className="nav-icon" />
          <span className="nav-label">Notifications</span>
          {notificationsCount > 0 && (
            <span className="notification-count">{notificationsCount}</span>
          )}
        </div>
        <div
          className={`nav-item ${location.pathname.startsWith("/profile") ? "active" : ""}`}
          onClick={() => user?.username && navigate(`/profile/${user.username}`)}
        >
          <ProfileIcon className="nav-icon" />
          <span className="nav-label">Profile</span>
        </div>
      </nav>

      {user && (
        <div className="sidebar-user">
          <div className="user-info">
            {user.profileImgUrl ? (
              <img
                className="user-avatar"
                src={user.profileImgUrl}
                alt="profile"
              />
            ) : (
              <div className="user-avatar">
                {user.username ? user.username[0].toUpperCase() : "U"}
              </div>
            )}
            <div className="user-details">
              <span className="user-display-name">
                {user.displayName || user.username}
              </span>
              <span className="user-handle">@{user.username}</span>
            </div>
          </div>
          <button
            className="sidebar-logout-btn"
            onClick={onLogout}
            title="Logout"
          >
            <LogoutIcon />
          </button>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
