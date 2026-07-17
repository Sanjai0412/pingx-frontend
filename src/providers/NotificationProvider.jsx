import { useEffect, useState } from "react";
import { getUnreadNotificationsCount } from "../services/notificationService";
import { NotificationContext } from "../context/NotificationContext";

const NotificationProvider = ({ children }) => {
  const [notificationsCount, setNotificationsCount] = useState(0);

  useEffect(() => {
    const initCount = async () => {
      try {
        const data = await getUnreadNotificationsCount();
        setNotificationsCount(data.data);
      } catch (err) {
        console.error("Failed to fetch notifications count: ", err);
      }
    };
    initCount();
  }, []);
  return (
    <NotificationContext.Provider
      value={{ notificationsCount, setNotificationsCount }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
