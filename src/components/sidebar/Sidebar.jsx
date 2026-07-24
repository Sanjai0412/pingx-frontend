import { useState } from "react";
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
  const [showProfileModal, setShowProfileModal] = useState(false);

  const handleProfileClick = () => {
    if (window.innerWidth <= 680) {
      setShowProfileModal(true);
    } else if (user?.username) {
      navigate(`/profile/${user.username}`);
    }
  };

  const handleCloseModal = () => {
    setShowProfileModal(false);
  };

  return (
    <>
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
            className={`nav-item nav-profile-item ${
              location.pathname.startsWith("/profile") ? "active" : ""
            }`}
            onClick={handleProfileClick}
          >
            {user && user.profileImgUrl ? (
              <img
                className="nav-user-avatar"
                src={user.profileImgUrl}
                alt="Profile"
              />
            ) : user ? (
              <div className="nav-user-avatar-fallback">
                {user.username ? user.username[0].toUpperCase() : "U"}
              </div>
            ) : (
              <ProfileIcon className="nav-icon" />
            )}
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

      {/* Mobile Profile Options Popup Modal */}
      {showProfileModal && user && (
        <div className="profile-modal-overlay" onClick={handleCloseModal}>
          <div
            className="profile-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="profile-modal-user">
              {user.profileImgUrl ? (
                <img
                  className="profile-modal-avatar"
                  src={user.profileImgUrl}
                  alt="avatar"
                />
              ) : (
                <div className="profile-modal-avatar">
                  {user.username ? user.username[0].toUpperCase() : "U"}
                </div>
              )}
              <div className="profile-modal-user-info">
                <span className="profile-modal-display-name">
                  {user.displayName || user.username}
                </span>
                <span className="profile-modal-handle">@{user.username}</span>
              </div>
            </div>

            <div className="profile-modal-actions">
              <button
                className="profile-modal-btn"
                onClick={() => {
                  handleCloseModal();
                  navigate(`/profile/${user.username}`);
                }}
              >
                <ProfileIcon className="nav-icon" />
                <span>View Profile</span>
              </button>

              <button
                className="profile-modal-btn logout-btn"
                onClick={() => {
                  handleCloseModal();
                  onLogout();
                }}
              >
                <LogoutIcon className="nav-icon" />
                <span>Logout</span>
              </button>
            </div>

            <button
              className="profile-modal-cancel"
              onClick={handleCloseModal}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
