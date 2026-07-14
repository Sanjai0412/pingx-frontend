import { apiClient } from "../utils/axiosConfig";

export const fetchTweets = async () => {
  const response = await apiClient.get("/tweets");
  return response.data; // list of tweets
};

export const fetchUserTweets = async (userId) => {
  const response = await apiClient.get(`users/${userId}/tweets`);
  return response.data;
};

export const createTweet = async (content) => {
  const response = await apiClient.post("/tweets", {
    content,
  });
  return response.data;
};

export const fetchTweet = async (tweetId) => {
  const response = await apiClient.get(`/tweets/${tweetId}`);
  return response.data;
};

export const likeTweet = async (tweetId) => {
  const response = await apiClient.post(`/tweets/${tweetId}/like`);

  return response.data;
};

export const unLikeTweet = async (tweetId) => {
  const response = await apiClient.delete(`/tweets/${tweetId}/like`);

  return response.data;
};

export const retweetTweet = async (tweetId) => {
  const response = await apiClient.post(`/tweets/${tweetId}/retweet`);
  return response.data;
};

export const unRetweetTweet = async (tweetId) => {
  const response = await apiClient.delete(`/tweets/${tweetId}/retweet`);
  return response.data;
};

export const quoteRetweet = async (tweetId, content) => {
  const response = await apiClient.post("/tweets/", {
    content: content,
    quoteTweetId: tweetId,
  });
  return response.data;
};

export const createComment = async (tweetId, content) => {
  const response = await apiClient.post(`/tweets/${tweetId}/comment`, {
    content,
  });
  return response.data;
};

export const fetchCommentsByTweetId = async (tweetId) => {
  const response = await apiClient.get(`/tweets/${tweetId}/comment`);
  return response.data;
};
export const replyComment = async (commentId, content) => {};
