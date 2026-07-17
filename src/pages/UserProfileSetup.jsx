import { useEffect, useState } from "react";
import imageCompression from "browser-image-compression";
import { useNavigate } from "react-router-dom";

import { saveUserProfile, uploadImage } from "../services/authService";
import { useAuth } from "../hooks/useAuth";

const UserProfileDetails = () => {
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const { user: authUser, setUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("needsProfileSetup")) {
      navigate("/");
    }
  });

  const handleProfileImage = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image.");
      return;
    }

    try {
      setError("");

      const compressedFile = await imageCompression(file, {
        maxSizeMB: 0.2,
        maxWidthOrHeight: 400,
        useWebWorker: true,
        initialQuality: 0.8,
      });

      setProfileImage(compressedFile);
    } catch (err) {
      console.error(err);
      setError("Failed to process image.");
    }
  };

  const handleSaveUser = async () => {
    if (saving) return;

    setSaving(true);
    setError("");

    try {
      let profileImgUrl = "";

      if (profileImage) {
        profileImgUrl = await uploadImage(profileImage);
      }

      const user = {
        username: authUser?.username || "",
        displayName: displayName || authUser?.username || "",
        bio,
        profileImgUrl,
      };

      await saveUserProfile(user);

      setUser({ ...authUser, ...user });

      localStorage.removeItem("needsProfileSetup");
      navigate("/");
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to save profile details.",
      );
    } finally {
      setSaving(false);
    }
  };

  const handleSkip = async () => {
    try {
      const defaultUser = {
        username: authUser?.username || "",
        displayName: authUser?.username || "",
        bio: "",
        profileImgUrl: "",
      };

      await saveUserProfile(defaultUser);

      setUser({ ...authUser, ...defaultUser });

      localStorage.removeItem("needsProfileSetup");

      navigate("/");
    } catch (err) {
      console.error(err);

      localStorage.removeItem("needsProfileSetup");

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
            placeholder="Display name"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />

          <input
            className="auth-input"
            type="text"
            placeholder="Bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />

          <input
            className="auth-input"
            type="file"
            accept="image/*"
            onChange={handleProfileImage}
          />

          {profileImage && (
            <img
              src={URL.createObjectURL(profileImage)}
              alt="Profile Preview"
              className="profile-preview"
            />
          )}

          <button
            className="auth-button"
            onClick={handleSaveUser}
            disabled={saving}
          >
            {saving ? "Saving..." : "Save"}
          </button>

          <button
            className="auth-button-secondary"
            style={{ marginTop: "8px" }}
            onClick={handleSkip}
            disabled={saving}
          >
            Skip for now
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfileDetails;
