import { useFollow } from "../hooks/useFollow";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { logoutUser } from "../services/authService";

const ProfileCard = ({ profile, isOwnProfile }) => {
  const {
    username,
    displayName,
    profileImgUrl,
    bio,
    followingCount,
    followersCount,
  } = profile;
  const { following, toggleFollow, loading } = useFollow(profile.userId);
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleLogout = async () => {
    try {
      await logoutUser();
      setUser(null);
      navigate("/login");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <div className="profile-details-wrapper">
      {/* Banner element */}
      <div className="profile-banner"></div>

      {/* Profile Header Details block */}
      <div className="profile-header">
        <div className="profile-meta-top">
          <div className="profile-avatar-wrapper">
            {profileImgUrl ? (
              <img
                className="profile-avatar-img"
                src={profileImgUrl}
                alt="Profile"
              />
            ) : (
              <div className="profile-avatar-fallback">
                {username ? username[0].toUpperCase() : "U"}
              </div>
            )}
          </div>

          {isOwnProfile ? (
            <div className="profile-action-buttons">
              <button
                onClick={() => navigate("/settings/profile")}
                className="profile-edit-btn"
              >
                Edit profile
              </button>
              <button
                onClick={handleLogout}
                className="profile-logout-btn"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              className={`profile-follow-btn ${following ? "following" : ""}`}
              onClick={toggleFollow}
              disabled={loading}
            >
              {loading ? "Loading..." : following ? "Following" : "Follow"}
            </button>
          )}
        </div>

        <div className="profile-info">
          <h2 className="profile-display-name">{displayName || username}</h2>
          <span className="profile-username">@{username}</span>

          {bio && <p className="profile-bio">{bio}</p>}

          <div className="profile-stats-row">
            <span className="profile-stat-item">
              <strong className="profile-stat-count">
                {followingCount || 0}
              </strong>{" "}
              Following
            </span>
            <span className="profile-stat-item">
              <strong className="profile-stat-count">
                {followersCount || 0}
              </strong>{" "}
              Followers
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
