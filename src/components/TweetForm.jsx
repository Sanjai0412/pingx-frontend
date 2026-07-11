import { useState } from "react";
import { createTweet } from "../services/tweetService";
import { useAuth } from "../hooks/useAuth";

const TweetForm = ({ onTweetCreated }) => {
  const { user } = useAuth();
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const maxChars = 280;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim() || content.length > maxChars) return;

    setIsSubmitting(true);
    setError("");

    try {
      const newTweet = await createTweet(content);
      onTweetCreated(newTweet.data); // Pass the newly created tweet to parent component
      setContent(""); // Clear input
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to post tweet. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const charCount = content.length;
  const isOverLimit = charCount > maxChars;

  return (
    <div className="tweet-form-container">
      <div className="tweet-form-avatar-col">
        {user?.profileImgUrl ? (
          <img className="tweet-form-avatar" src={user.profileImgUrl} alt="Avatar" />
        ) : (
          <div className="tweet-form-avatar-fallback">
            {user?.username ? user.username[0].toUpperCase() : "U"}
          </div>
        )}
      </div>
      <form className="tweet-form-content" onSubmit={handleSubmit}>
        <textarea
          className="tweet-textarea"
          placeholder="What's happening?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={isSubmitting}
          rows={3}
        />
        {error && <div className="tweet-form-error">{error}</div>}
        <div className="tweet-form-footer">
          <span className={`char-counter ${isOverLimit ? "over-limit" : ""}`}>
            {maxChars - charCount}
          </span>
          <button
            type="submit"
            className="tweet-submit-btn"
            disabled={isSubmitting || !content.trim() || isOverLimit}
          >
            {isSubmitting ? "Posting..." : "Post"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TweetForm;
