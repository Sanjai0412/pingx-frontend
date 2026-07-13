import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProfile } from "../services/userService";
import ProfileCard from "../components/profileCard";
import TweetList from "../components/tweet/TweetList";
import { useAuth } from "../hooks/useAuth";
import { fetchUserTweets } from "../services/tweetService";
import "./Profile.css";

const Profile = () => {
    const { user } = useAuth();
    const { username } = useParams();
    const navigate = useNavigate();

    const [userProfile, setUserProfile] = useState(null);
    const [tweets, setTweets] = useState([]);
    const [activeTab, setActiveTab] = useState("tweets");

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const profile = await getProfile(username);
                const userTweets = await fetchUserTweets(profile.userId);

                setUserProfile(profile);
                setTweets(userTweets.data);
            } catch (error) {
                console.error("Failed to fetch profile:", error);
            }
        };

        if (username) {
            fetchUserProfile();
        }

    }, [username]);

    if (!userProfile) {
        return <div className="profile-loading">Loading profile...</div>;
    }
    const isOwnProfile = user.username === userProfile?.username;

    const handleTweetCreated = (newTweet) => {
        if (isOwnProfile) {
            setTweets((prevTweets) => [newTweet, ...prevTweets]);
        }
    };

    return (
        <div className="profile-container">
            <div className="profile-page-header">
                <button className="profile-back-btn" onClick={() => navigate(-1)}>
                    ←
                </button>
                <div className="profile-header-title">
                    <span className="profile-header-name">{userProfile.displayName || userProfile.username}</span>
                    <span className="profile-header-count">{tweets.length} Posts</span>
                </div>
            </div>

            <ProfileCard profile={userProfile} isOwnProfile={isOwnProfile} />

            <div className="profile-tabs">
                <div
                    className={`profile-tab ${activeTab === "tweets" ? "active" : ""}`}
                    onClick={() => setActiveTab("tweets")}
                >
                    Posts
                    {activeTab === "tweets" && <div className="profile-tab-indicator" />}
                </div>
                <div
                    className={`profile-tab ${activeTab === "replies" ? "active" : ""}`}
                    onClick={() => setActiveTab("replies")}
                >
                    Replies
                    {activeTab === "replies" && <div className="profile-tab-indicator" />}
                </div>
                <div
                    className={`profile-tab ${activeTab === "likes" ? "active" : ""}`}
                    onClick={() => setActiveTab("likes")}
                >
                    Likes
                    {activeTab === "likes" && <div className="profile-tab-indicator" />}
                </div>
            </div>

            <TweetList tweets={tweets} loading={false} onTweetCreated={handleTweetCreated} />
        </div>
    );
};

export default Profile;