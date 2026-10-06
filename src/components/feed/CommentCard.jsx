import CommentHeader from "./CommentHeader";
import CommentBody from "./CommentBody";
import CommentActions from "./CommentActions";
import { useNavigate } from "react-router-dom";

const CommentCard = ({ comment, onCommentCreated }) => {
  const {
    id,
    author,
    content,
    createdAt,
    likeCount,
    likedByCurrentUser,
    retweetCount,
    retweetedByCurrentUser,
  } = comment;
  const navigate = useNavigate();
  return (
    <div className="comment-card" onClick={() => navigate(`/tweets/${id}`)}>
      <div className="comment-content-wrapper">
        <CommentHeader author={author} createdAt={createdAt} />
        <CommentBody comment={comment} />
        <CommentActions comment={comment} onCommentCreated={onCommentCreated} />
      </div>
    </div>
  );
};

export default CommentCard;
