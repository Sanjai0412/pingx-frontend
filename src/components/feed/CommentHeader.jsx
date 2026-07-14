import formatDate from "../../utils/dateFormatter";

const CommentHeader = ({ author, createdAt, compact }) => {
  return (
    <div className="comment-header">
      {author.profileImgUrl ? (
        <img
          className={compact ? "comment-avatar-small" : "comment-avatar"}
          src={author.profileImgUrl}
          alt="Avatar"
        />
      ) : (
        <div
          className={
            compact
              ? "comment-avatar-fallback-small"
              : "comment-avatar-fallback"
          }
        >
          {author.username ? author.username[0].toUpperCase() : "U"}
        </div>
      )}
      <div className={"comment-header-info"}>
        <span className={compact ? "comment-author-small" : "comment-author"}>
          {author.displayName || author.username}
        </span>
        <span
          className={compact ? "comment-username-small" : "comment-username"}
        >
          @{author.username}
        </span>
      </div>
      <div className="comment-header-time">
        <span className={compact ? "comment-divider-small" : "comment-divider"}>
          ·
        </span>
        <span className={compact ? "comment-time-small" : "comment-time"}>
          {formatDate(createdAt)}
        </span>
      </div>
    </div>
  );
};

export default CommentHeader;
