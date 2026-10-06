export const QUERY_KEYS = {
    feed: ["feed"],
    profile: (username) => ["profile", username],
    userTweets: (userId) => ["userTweets", userId],
    comments: (tweetId) => ["comments", tweetId]
}