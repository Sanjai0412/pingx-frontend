import { useAuth } from "../hooks/useAuth";
import { useEffect, useState } from "react";
import {
  getNotificationsByUserId,
  markAllAsRead,
} from "../services/notificationService";
import NotificationList from "../components/notification/NotificationList";
import { useNotification } from "../hooks/useNotification";

const Notifications = () => {
  const { loading: authLoading } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const { setNotificationsCount } = useNotification();
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await getNotificationsByUserId();
        setNotifications(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        console.error("Failed to fetch notifications: ", err);
        setLoading(false);
      } finally {
        markAllAsRead();
        setNotificationsCount(0);
        setLoading(false);
      }
    };
    fetchNotifications();
  }, [setNotificationsCount]);

  if (authLoading || loading) {
    return (
      <div className="notifications-loading">Loading notifications...</div>
    );
  }
  return (
    <div className="notifications-container">
      <div className="notifications-header">
        <h2>Notifications</h2>
      </div>
      <NotificationList notificationList={notifications} loading={loading} />
    </div>
  );
};

export default Notifications;

