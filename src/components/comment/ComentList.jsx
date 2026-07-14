import CommentCard from "../feed/CommentCard";

const CommentList = ({ comments, loading, onCommentCreated }) => {
  if (loading) {
    return <div className="comment-list-loading">Loading comments...</div>;
  }
  if (!comments || comments.length === 0) {
    return (
      <div className="comment-list-status empty-state">
        <span className="empty-icon">📭</span>
        <p>No comments yet. Be the first one to share something!</p>
      </div>
    );
  }
  return (
    <div className="comment-list">
      {comments.map((comment) => {
        return (
          <CommentCard
            key={comment.id}
            comment={comment}
            onCommentCreated={onCommentCreated}
          />
        );
      })}
    </div>
  );
};

export default CommentList;
