import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProfile } from "../services/userService";
import ProfileCard from "../components/profileCard";
import { useAuth } from "../hooks/useAuth";
import { usePaginatedFeed } from "../hooks/usePaginatedFeed";
import "./Profile.css";
import { fetchFeedByUserId } from "../services/feedService";
import FeedList from "../components/feed/FeedList";
import InfiniteScrollFooter from "../components/common/InfiniteScrollFooter";

const Profile = () => {
  const { user } = useAuth();
  const { username } = useParams();
  const navigate = useNavigate();

  const [userProfile, setUserProfile] = useState(null);
  const [activeTab, setActiveTab] = useState("tweets");

  const fetchUserTweets = useCallback(
    async (limit, offset) => {
      let profile = userProfile;
      if (!profile || offset === 0) {
        profile = await getProfile(username);
        setUserProfile(profile);
      }

      if (profile?.userId) {
        const userTweetsRes = await fetchFeedByUserId(
          profile.userId,
          limit,
          offset
        );
        return Array.isArray(userTweetsRes.data) ? userTweetsRes.data : [];
      }
      return [];
    },
    [username, userProfile]
  );

  const {
    items: tweets,
    loading,
    loadingMore,
    hasMore,
    lastElementRef,
    loadData,
    addItem,
  } = usePaginatedFeed(fetchUserTweets, 20);

  useEffect(() => {
    if (username) {
      setUserProfile(null);
      loadData(0);
    }
  }, [username]);

  if (loading && !userProfile) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  const isOwnProfile = user?.username === userProfile?.username;

  const handleTweetCreated = (newTweet) => {
    if (isOwnProfile) {
      addItem(newTweet);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-page-header">
        <button className="profile-back-btn" onClick={() => navigate(-1)}>
          ←
        </button>
        <div className="profile-header-title">
          <span className="profile-header-name">
            {userProfile?.displayName || userProfile?.username}
          </span>
          <span className="profile-header-count">{tweets.length} Posts</span>
        </div>
      </div>

      {userProfile && (
        <ProfileCard profile={userProfile} isOwnProfile={isOwnProfile} />
      )}

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

      <FeedList feed={tweets} onTweetCreated={handleTweetCreated} />

      <InfiniteScrollFooter
        hasMore={hasMore}
        loadingMore={loadingMore}
        lastElementRef={lastElementRef}
        endMessage="You've reached the end of posts"
        hasItems={tweets.length > 0}
      />
    </div>
  );
};

export default Profile;
