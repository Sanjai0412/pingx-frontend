import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProfileCard from "../components/profileCard";
import { useAuth } from "../hooks/useAuth";
import "./Profile.css";
import { useProfileQuery } from "../hooks/useProfileQuery";
import { useUserTweetsQuery } from "../hooks/useUserTweetsQuery";
import { useInView } from "react-intersection-observer";
import { FeedFooter } from "../components/FeedFooter";
import FeedList from "../components/feed/FeedList";

const Profile = () => {
  const { user } = useAuth();
  const { username } = useParams();
  const navigate = useNavigate();
  const { ref, inView } = useInView();
  const [activeTab, setActiveTab] = useState("tweets");

  const {
    data: userProfile,
    isLoading: isProfileLoading,
  } = useProfileQuery(username)

  const {
    data: tweetsData,
    isLoading: isTweetsLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage
  } = useUserTweetsQuery(userProfile?.userId);

  const tweets = tweetsData?.pages.flatMap((page) => page) ?? [];

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage])

  if (isProfileLoading && !userProfile) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  const isOwnProfile = user?.username === userProfile?.username;

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
      <FeedList feed={tweets} />

      <FeedFooter ref={ref} isFetchingNextPage={isFetchingNextPage}></FeedFooter>
    </div>
  );
};

export default Profile;
