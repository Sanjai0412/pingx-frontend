import FeedItem from "./FeedItem";

const FeedList = ({ feed, onTweetCreated }) => {
  return (
    <div className="feed-list">
      {feed.map((item) => (
        <FeedItem
          key={`${item.type}-${item.activityAt}-${item.tweet.id}`}
          item={item}
          onTweetCreated={onTweetCreated}
        />
      ))}
    </div>
  );
};

export default FeedList;
