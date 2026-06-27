import { apiClient } from "../utils/axiosConfig";

export const fetchTweets = async () => {
    const response = await apiClient.get("/tweets");
    return response.data; // list of tweets
}

export const createTweet = async (content) => {
    const response = await apiClient.post("/tweets", {
        content,
    })
    return response.data;
}

export const likeTweet = async (tweetId) => {
    const response = await apiClient.post(`/tweets/${tweetId}/like`)

    return response.data;
}

export const unLikeTweet = async (tweetId) => {
    const response = await apiClient.delete(`/tweets/${tweetId}/like`)

    return response.data;
}