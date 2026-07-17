import { useNavigate } from "react-router-dom";
import {
  HeartIcon,
  CommentIcon,
  RetweetIcon,
  QuoteIcon,
  ProfileIcon,
} from "../Icons";
import formatDate from "../../utils/dateFormatter";
import "./notification.css";

const NotificationCard = ({ notification }) => {
  const { actor, type, createdAt, tweet } = notification;
  const navigate = useNavigate();

  const getNotificationConfig = () => {
    switch (type) {
      case "LIKE":
        return {
          icon: <HeartIcon filled={true} className="notification-icon like-icon" size={24} />,
          message: "liked your post",
        };
      case "COMMENT":
        return {
          icon: <CommentIcon className="notification-icon comment-icon" size={24} />,
          message: "replied to your post",
        };
      case "RETWEET":
        return {
          icon: <RetweetIcon className="notification-icon retweet-icon" size={24} />,
          message: "reposted your post",
        };
      case "QUOTE":
        return {
          icon: <QuoteIcon className="notification-icon quote-icon" size={24} />,
          message: "quoted your post",
        };
      case "FOLLOW":
        return {
          icon: <ProfileIcon className="notification-icon follow-icon" size={24} />,
          message: "started following you",
        };
      default:
        return {
          icon: <ProfileIcon className="notification-icon default-icon" size={24} />,
          message: "interacted with you",
        };
    }
  };

  const config = getNotificationConfig();

  const handleCardClick = () => {
    if (type === "FOLLOW") {
      navigate(`/profile/${actor.username}`);
    } else if (tweet && tweet.id) {
      navigate(`/tweets/${tweet.id}`);
    }
  };

  const handleUserClick = (e) => {
    e.stopPropagation();
    navigate(`/profile/${actor.username}`);
  };

  return (
    <div className="notification-card" onClick={handleCardClick}>
      <div className="notification-left">
        {config.icon}
      </div>
      <div className="notification-right">
        <div className="notification-user-row">
          <div onClick={handleUserClick} className="notification-avatar-container">
            {actor.profileImgUrl ? (
              <img
                className="notification-avatar"
                src={actor.profileImgUrl}
                alt={`${actor.username}'s avatar`}
              />
            ) : (
              <div className="notification-avatar-fallback">
                {actor.username ? actor.username[0].toUpperCase() : "U"}
              </div>
            )}
          </div>
        </div>
        <div className="notification-content">
          <span onClick={handleUserClick} className="notification-actor-name">
            {actor.displayName || actor.username}
          </span>
          <span className="notification-message-text"> {config.message}</span>
          <span className="notification-time-dot">·</span>
          <span className="notification-time">{formatDate(createdAt)}</span>
        </div>
        {tweet && tweet.content && (
          <div className="notification-tweet-preview">
            {tweet.content}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationCard;

