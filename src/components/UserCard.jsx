import { useState, useEffect } from "react";
import { followUser, unfollowUser, isFollowing } from "../services/userService";
import { useNavigate } from "react-router-dom";
import { useFollow } from "../hooks/useFollow";


const UserCard = ({ user }) => {
    const navigate = useNavigate();
    const { following, toggleFollow, loading } = useFollow(user.userId);

    const handleViewProfile = () => {
        navigate(`/profile/${user.username}`);
    }

    return <div key={user._id} className="user-item" onClick={handleViewProfile} >
        <div className="user-profile-summary"  >
            <img className="user-avatar-small" src={user.profileImgUrl} alt={(user.displayName || user.username).charAt(0).toUpperCase()}>
            </img>
            <div className="user-meta">
                <span className="user-name-text">{user.displayName || user.username}</span>
                <span className="user-handle-text">@{user.username}</span>
            </div>
        </div>
        <button className="user-follow-btn" onClick={(e) => {
            e.stopPropagation();
            toggleFollow();
        }} disabled={loading}>
            {loading ? "Loading..." : !following ? "Follow" : "Unfollow"}
        </button>
    </div>
}

export default UserCard;