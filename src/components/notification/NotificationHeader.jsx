import { useNavigate } from "react-router-dom";
import formatDate from "../../utils/dateFormatter";

import "./notification.css";

const NotificationHeader = ({ actor, createdAt }) => {
  const navigate = useNavigate();
  return (
    <div
      className="notification-header"
      onClick={(e) => {
        e.stopPropagation();
        navigate(`/profile/${actor.username}`);
      }}
    >
      {actor.profileImgUrl ? (
        <img
          className="notification-actor-avatar"
          src={actor.profileImgUrl}
          alt="Avatar"
        />
      ) : (
        <div className="notification-actor-avatar-fallback">
          {actor.username ? actor.username[0].toUpperCase() : "U"}
        </div>
      )}

      <div className="notification-actor-info">
        <span className="notification-actor-name">
          {actor.displayName || actor.username}
        </span>
        <span className="notification-actor-username">@{actor.username}</span>
        <span className="notification-actor-divider">·</span>
        <span className="notification-time">{formatDate(createdAt)}</span>
      </div>
    </div>
  );
};

export default NotificationHeader;
