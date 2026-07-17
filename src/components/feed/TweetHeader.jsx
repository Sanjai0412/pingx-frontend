import { useNavigate } from "react-router-dom";
import formatDate from "../../utils/dateFormatter";

const TweetHeader = ({ author, createdAt, compact }) => {
  const navigate = useNavigate();
  return (
    <div className="tweet-header">
      {author.profileImgUrl ? (
        <img
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/profile/${author.username}`);
          }}
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
        <span
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/profile/${author.username}`);
          }}
          className={compact ? "tweet-author-small" : "tweet-author"}
        >
          {author.displayName || author.username}
        </span>
        <span
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/profile/${author.username}`);
          }}
          className={compact ? "tweet-username-small" : "tweet-username"}
        >
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
