import NotificationCard from "./NotificationCard";

const NotificationList = ({ notificationList, loading }) => {
  if (loading) {
    return <div className="notifications-loading">Loading Notifications...</div>;
  }

  if (!notificationList || notificationList.length === 0) {
    return (
      <div className="no-notifications">
        <h3>No notifications yet</h3>
        <p>When you get likes, reposts, or replies, they'll show up here.</p>
      </div>
    );
  }

  return (
    <div className="notification-list">
      {notificationList.map((notification, index) => (
        <NotificationCard
          key={notification.id || notification._id || index}
          notification={notification}
        />
      ))}
    </div>
  );
};

export default NotificationList;

