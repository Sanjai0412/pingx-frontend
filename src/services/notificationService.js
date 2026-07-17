import { apiClient } from "../utils/axiosConfig";

export const getNotificationsByUserId = async () => {
  const response = await apiClient.get(`/notifications/`);
  return response.data;
};

export const markAllAsRead = async () => {
  const response = await apiClient.post("/notifications/read");
  return response.data;
};

export const getUnreadNotificationsCount = async () => {
  const response = await apiClient.get("/notifications/unread-count");
  return response.data;
};
