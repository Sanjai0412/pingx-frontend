import { useState } from "react";
import { saveUserProfile } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const UserProfileDetails = () => {
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const [error, setError] = useState(""); // Add error state
  const { user: authUser } = useAuth();

  const navigate = useNavigate();

  const handleSaveUser = async () => {
    const user = {
      username: authUser?.username || "",
      displayName: displayName || authUser?.username || "",
      bio: bio,
      profileImgUrl: profileImageUrl, // Maps to profileImgUrl in Java
    };
    try {
      setError("");
      await saveUserProfile(user);
      localStorage.removeItem("needsProfileSetup");
      navigate("/");
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to save profile details.",
      );
    }
  };

  const handleSkip = async () => {
    const defaultUser = {
      username: authUser?.username || "",
      displayName: authUser?.username || "", // Default to username
      bio: "",
      profileImgUrl: "",
    };
    try {
      setError("");
      await saveUserProfile(defaultUser);
      localStorage.removeItem("needsProfileSetup");
      navigate("/");
    } catch (err) {
      console.error("Failed to skip profile setup:", err);
      localStorage.removeItem("needsProfileSetup");
      // Even if sync fails because it already exists, redirect anyway
      navigate("/");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Setup Profile</h2>
        <p className="auth-subtitle">
          Tell us about yourself to complete registration.
        </p>
        <div className="auth-form">
          {error && (
            <div className="auth-errors">
              <div className="auth-error-item">{error}</div>
            </div>
          )}
          <input
            className="auth-input"
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="Display name"
          />
          <input
            className="auth-input"
            type="text"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Bio"
          />
          <input
            className="auth-input"
            type="text"
            value={profileImageUrl}
            onChange={(e) => setProfileImageUrl(e.target.value)}
            placeholder="Profile image URL"
          />
          <button className="auth-button" onClick={handleSaveUser}>
            Save Profile
          </button>
          <button
            className="auth-button-secondary"
            style={{ marginTop: "8px" }}
            onClick={handleSkip}
          >
            Skip for now
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfileDetails;
