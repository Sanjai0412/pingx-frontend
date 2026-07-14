import { CommentIcon, HeartIcon, RetweetIcon } from "../Icons";

const CommentActions = ({ comment, onCommentCreated }) => {
  return (
    <div className="comment-actions">
      <button className="comment-action-btn comment-btn">
        <CommentIcon />
      </button>

      <button className="comment-action-btn retweet-btn">
        <RetweetIcon />
      </button>

      <button className="comment-action-btn like-btn">
        <HeartIcon />
      </button>
    </div>
  );
};

export default CommentActions;
