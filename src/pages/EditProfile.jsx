import { useState } from "react";
import { useNavigate } from "react-router-dom";
import imageCompression from "browser-image-compression";

import { useAuth } from "../hooks/useAuth";
import { updateProfile, uploadImage } from "../services/authService";

const EditProfile = () => {
  const { user: authUser, setUser } = useAuth();
  const navigate = useNavigate();

  const [displayName, setDisplayName] = useState(authUser?.displayName || "");
  const [bio, setBio] = useState(authUser?.bio || "");
  const [profileImage, setProfileImage] = useState(null);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

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
      let profileImgUrl = authUser?.profileImgUrl || "";

      if (profileImage) {
        profileImgUrl = await uploadImage(profileImage);
      }

      const updatedUser = {
        username: authUser.username,
        displayName,
        bio,
        profileImgUrl,
      };

      await updateProfile(updatedUser);

      setUser({
        ...authUser,
        ...updatedUser,
      });

      navigate(`/profile/${authUser.username}`);
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
        err.message ||
        "Failed to update profile.",
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <button className="profile-back-btn" onClick={() => navigate(-1)}>
          ←
        </button>
        <h2>Edit Profile</h2>

        <p className="auth-subtitle">Update your profile information.</p>

        <div className="auth-form">
          {error && (
            <div className="auth-errors">
              <div className="auth-error-item">{error}</div>
            </div>
          )}

          <img
            src={
              profileImage
                ? URL.createObjectURL(profileImage)
                : authUser?.profileImgUrl ||
                "https://placehold.co/120x120?text=User"
            }
            alt="Profile Preview"
            className="profile-preview"
          />

          <input
            className="auth-input"
            type="file"
            accept="image/*"
            onChange={handleProfileImage}
          />

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

          <button
            className="auth-button"
            onClick={handleSaveUser}
            disabled={saving}
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
