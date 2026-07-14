import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { createComment } from "../../services/tweetService";
import "./comment.css";

const CommentForm = ({ tweetId, onCommentCreated }) => {
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
      const newComment = await createComment(tweetId, content);
      onCommentCreated(newComment.data); // Pass the newly created comment to parent component
      setContent(""); // Clear input
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to post comment. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };
  const charCount = content.length;
  const isOverLimit = charCount > maxChars;

  return (
    <div className="comment-form-container">
      <div className="comment-form-avatar-col">
        {user?.profileImgUrl ? (
          <img
            className="comment-form-avatar"
            src={user.profileImgUrl}
            alt="Avatar"
          />
        ) : (
          <div className="comment-form-avatar-fallback">
            {user?.username ? user.username[0].toUpperCase() : "U"}
          </div>
        )}
      </div>
      <form className="comment-form-content" onSubmit={handleSubmit}>
        <textarea
          className="comment-textarea"
          placeholder="Post your reply"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={isSubmitting}
          rows={3}
        />
        {error && <div className="comment-form-error">{error}</div>}
        <div className="comment-form-footer">
          <span className={`char-counter ${isOverLimit ? "over-limit" : ""}`}>
            {maxChars - charCount}
          </span>
          <button
            type="submit"
            className="comment-submit-btn"
            disabled={isSubmitting || !content.trim() || isOverLimit}
          >
            {isSubmitting ? "Posting..." : "Post"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommentForm;
