import { apiClient } from "../utils/axiosConfig";

export const fetchFeed = async (limit, pageParam) => {
  const response = await apiClient.get(`/feed/`, {
    params: {
      limit,
      offset: pageParam,
    },
  });
  return response.data;
};

export const fetchFeedByUserId = async (userId, limit, pageParam) => {
  const response = await apiClient.get(`/feed/user/${userId}`, {
    params: {
      limit,
      offset: pageParam,
    },
  });
  return response.data;
};
