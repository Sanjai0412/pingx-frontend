import formatDate from "../../utils/dateFormatter";

const TweetHeader = ({ author, createdAt, compact }) => {
  return (
    <div className="tweet-header">
      {author.profileImgUrl ? (
        <img
          className={compact ? "tweet-avatar-small" : "tweet-avatar"}
          src={author.profileImgUrl}
          alt="Avatar"
        />
      ) : (
        <div
          className={
            compact ? "tweet-avatar-fallback-small" : "tweet-avatar-fallback"
          }
        >
          {author.username ? author.username[0].toUpperCase() : "U"}
        </div>
      )}
      <div className={"tweet-header-info"}>
        <span className={compact ? "tweet-author-small" : "tweet-author"}>
          {author.displayName || author.username}
        </span>
        <span className={compact ? "tweet-username-small" : "tweet-username"}>
          @{author.username}
        </span>
      </div>
      <div className={"tweet-header-time"}>
        <span className={compact ? "tweet-divider-small" : "tweet-divider"}>
          ·
        </span>
        <span className={compact ? "tweet-time-small" : "tweet-time"}>
          {formatDate(createdAt)}
        </span>
      </div>
    </div>
  );
};

export default TweetHeader;
