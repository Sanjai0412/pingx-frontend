import { apiClient } from "../utils/axiosConfig";

export const fetchFeed = async (limit, offset) => {
  const response = await apiClient.get(`/feed/`, {
    params: {
      limit,
      offset,
    },
  });
  return response.data;
};
