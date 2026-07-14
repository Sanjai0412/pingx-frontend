import TweetCard from "./TweetCard";

const FeedItem = ({ item, onTweetCreated }) => {
  const { type, performedBy, tweet } = item;

  return (
    <>
      {type === "RETWEET" && (
        <div className="repost-banner">
          ↻ {performedBy.displayName} reposted
        </div>
      )}

      <TweetCard tweet={tweet} onTweetCreated={onTweetCreated} />
    </>
  );
};

export default FeedItem;
