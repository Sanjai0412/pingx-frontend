import { useState } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { logoutUser } from "../services/authService";
import { ProfileIcon, LogoutIcon } from "../components/Icons";
import "./MainLayout.css";

const MainLayout = () => {
    const { user, setUser } = useAuth();
    const navigate = useNavigate();
    const [showProfileModal, setShowProfileModal] = useState(false);

    const handleLogout = async () => {
        try {
            await logoutUser();
            setUser(null);
            navigate("/login");
        } catch (err) {
            console.error(err);
        }
    };

    const handleOpenProfileModal = () => {
        setShowProfileModal(true);
    };

    const handleCloseProfileModal = () => {
        setShowProfileModal(false);
    };

    return (
        <div className="app-layout">
            <div className="sidebar-container">
                <Sidebar
                    user={user}
                    onLogout={handleLogout}
                    onOpenProfileModal={handleOpenProfileModal}
                />
            </div>
            <div className="page-container">
                <div className="page-content">
                    <main className="page-main">
                        <Outlet context={{ openProfileModal: handleOpenProfileModal }} />
                    </main>
                </div>
            </div>
            <div className="right-sidebar">
                <div className="right-sidebar-title">Who to follow</div>
                <div className="right-sidebar-placeholder">Suggestions will appear here.</div>
            </div>

            {/* Profile Pop-up Modal */}
            {showProfileModal && user && (
                <div className="profile-modal-overlay" onClick={handleCloseProfileModal}>
                    <div className="profile-modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="profile-modal-user">
                            {user.profileImgUrl ? (
                                <img className="profile-modal-avatar" src={user.profileImgUrl} alt="avatar" />
                            ) : (
                                <div className="profile-modal-avatar">
                                    {user.username ? user.username[0].toUpperCase() : "U"}
                                </div>
                            )}
                            <div className="profile-modal-user-info">
                                <span className="profile-modal-display-name">{user.displayName || user.username}</span>
                                <span className="profile-modal-handle">@{user.username}</span>
                            </div>
                        </div>

                        <div className="profile-modal-actions">
                            <button
                                className="profile-modal-btn"
                                onClick={() => {
                                    handleCloseProfileModal();
                                    navigate(`/profile/${user.username}`);
                                }}
                            >
                                <ProfileIcon className="nav-icon" />
                                <span>View Profile</span>
                            </button>

                            <button
                                className="profile-modal-btn logout-btn"
                                onClick={() => {
                                    handleCloseProfileModal();
                                    handleLogout();
                                }}
                            >
                                <LogoutIcon className="nav-icon" />
                                <span>Logout</span>
                            </button>
                        </div>

                        <button className="profile-modal-cancel" onClick={handleCloseProfileModal}>
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MainLayout;