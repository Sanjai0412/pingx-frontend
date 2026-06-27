import React from "react";
import TweetCard from "./TweetCard";

const TweetList = ({ tweets, loading }) => {
  if (loading) {
    return <div className="tweet-list-status">Loading feed...</div>;
  }

  if (!tweets || tweets.length === 0) {
    return (
      <div className="tweet-list-status empty-state">
        <span className="empty-icon">📭</span>
        <p>No pings yet. Be the first to share something!</p>
      </div>
    );
  }

  return (
    <div className="tweet-list">
      {tweets.map((tweet) => (
        <TweetCard key={tweet.id} tweet={tweet} />
      ))}
    </div>
  );
};

export default TweetList;
