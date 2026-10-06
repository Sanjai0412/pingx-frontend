import { CommentIcon, HeartIcon, RetweetIcon } from "../Icons";

const CommentActions = ({ comment, onCommentCreated }) => {

  return (
    <div className="comment-actions">
      <button className="tweet-action-btn comment-btn">
        <CommentIcon size={16} />
      </button>

      <button >
        <RetweetIcon />
      </button>

      <button

      >
        <HeartIcon size={16} />
        <span>{ }</span>
      </button>
    </div>
  );
};

export default CommentActions;
