import { useState } from "react";
import { likeTweet, unLikeTweet } from "../services/tweetService";
import { CommentIcon, RetweetIcon, HeartIcon } from "./Icons";

const TweetCard = ({ tweet }) => {
  const { id, displayName, username, content, createdAt, likeCount, likedByCurrentUser, profileImgUrl } = tweet;

  const [liked, setLiked] = useState(likedByCurrentUser || false);
  const [likes, setLikes] = useState(likeCount || 0);
  // Format timestamp nicely
  const formatDate = (dateString) => {
    if (!dateString) return "";
    // Strip Java ZonedDateTime suffix like "[UTC]" to make it standard ISO
    const cleanString = typeof dateString === "string" ? dateString.replace(/\[.*\]$/, "") : dateString;
    const date = new Date(cleanString);
    if (isNaN(date.getTime())) return "Invalid Date";
    return date.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleLike = async () => {
    try {
      const response = liked ? await unLikeTweet(id) : await likeTweet(id);
      if (response.success) {
        setLiked(!liked);
        setLikes(liked ? likes - 1 : likes + 1);
      }
    } catch (err) {
      console.error("Failed to toggle like: ", err);
    }
  };

  return (
    <div className="tweet-card">
      {profileImgUrl ? (
        <img className="tweet-avatar" src={profileImgUrl} alt="Avatar" />
      ) : (
        <div className="tweet-avatar-fallback-small">
          {username ? username[0].toUpperCase() : "U"}
        </div>
      )}
      <div className="tweet-content-wrapper">
        <div className="tweet-header">
          <span className="tweet-author">{displayName || username}</span>
          <span className="tweet-username">@{username}</span>
          <span className="tweet-divider">·</span>
          <span className="tweet-time">{formatDate(createdAt)}</span>
        </div>
        <p className="tweet-body">{content}</p>
        <div className="tweet-actions">
          {/* Static icons for minimalist look */}
          <button className="tweet-action-btn comment-btn">
            <CommentIcon size={16} />
            <span>0</span>
          </button>
          <button className="tweet-action-btn retweet-btn">
            <RetweetIcon size={16} />
            <span>0</span>
          </button>
          <button className={`tweet-action-btn like-btn ${liked ? "liked" : ""}`} onClick={handleLike}>
            <HeartIcon size={16} filled={liked} />
            <span>{likes}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TweetCard;
