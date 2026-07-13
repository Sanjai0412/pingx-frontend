
import TweetHeader from "./TweetHeader";
import TweetBody from "./TweetBody";
import TweetActions from "./TweetActions";
import "./feed.css";

const TweetCard = ({ tweet, onTweetCreated }) => {
  const { id, author, content, createdAt, likeCount, likedByCurrentUser, retweetCount, retweetedByCurrentUser } = tweet;

  return (
    <div className="tweet-card">
      <div className="tweet-content-wrapper">
        <TweetHeader author={author} createdAt={createdAt} />
        <TweetBody tweet={tweet} />
        <TweetActions tweet={tweet} onTweetCreated={onTweetCreated} />
      </div>
    </div>
  );
};

export default TweetCard;
