import { useState } from "react";
import { likeTweet, unLikeTweet } from "../services/tweetService";
const TweetCard = ({ tweet }) => {
  const { id, userId, username, content, createdAt, likeCount, likedByCurrentUser } = tweet;

  const [liked, setLiked] = useState(likedByCurrentUser || false);
  const [likes, setLikes] = useState(likeCount || 0);
  // Format timestamp nicely
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
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
      <div className="tweet-avatar">
        {/* Placeholder avatar using user ID initial */}
        {String(userId).charAt(0).toUpperCase()}
      </div>
      <div className="tweet-content-wrapper">
        <div className="tweet-header">
          <span className="tweet-author">User #{username}</span>
          <span className="tweet-username">@user_{username}</span>
          <span className="tweet-divider">·</span>
          <span className="tweet-time">{formatDate(createdAt)}</span>
        </div>
        <p className="tweet-body">{content}</p>
        <div className="tweet-actions">
          {/* Static icons for minimalist look */}
          <button className="tweet-action-btn">💬 0</button>
          <button className="tweet-action-btn">🔁 0</button>
          <button className={`tweet-action-btn ${liked ? "liked" : ""}`} onClick={handleLike}>
            {liked ? "❤️" : "🤍"} {likes}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TweetCard;
