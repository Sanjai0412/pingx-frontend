import { apiClient } from "../utils/axiosConfig"

export const searchUser = async (query) => {
    if (query.length < 2) {
        return;
    }
    const response = await apiClient.get(`/users/search?q=${query}`);
    return response.data;
}

export const getProfile = async (username) => {
    const response = await apiClient.get(`/users/${username}`);
    return response.data.data;
}

export const followUser = async (userId) => {
    const response = await apiClient.post(`/users/${userId}/follow`);
    return response.data;
}
export const unfollowUser = async (userId) => {
    const response = await apiClient.delete(`/users/${userId}/unfollow`);
    return response.data;
}
export const isFollowing = async (userId) => {
    const response = await apiClient.get(`/users/${userId}/is-following`);
    return response.data.data;
}