import TweetCard from "../feed/TweetCard";
import "./tweet.css";

const TweetList = ({ tweets, loading, onTweetCreated }) => {
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
      {tweets.map((tweet) => {
        return (
          <TweetCard
            key={tweet.id}
            tweet={tweet}
            onTweetCreated={onTweetCreated}
          />
        );
      })}
    </div>
  );
};

export default TweetList;
