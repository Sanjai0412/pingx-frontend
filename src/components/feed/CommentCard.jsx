import CommentHeader from "./CommentHeader";
import CommentBody from "./CommentBody";
import CommentActions from "./CommentActions";

const CommentCard = ({ comment, onCommentCreated }) => {
  const { author, createdAt } = comment;
  return (
    <div className="comment-card">
      <div className="comment-content-wrapper">
        <CommentHeader author={author} createdAt={createdAt} />
        <CommentBody comment={comment} />
        <CommentActions comment={comment} onCommentCreated={onCommentCreated} />
      </div>
    </div>
  );
};

export default CommentCard;
