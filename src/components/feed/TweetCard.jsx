import TweetHeader from "./TweetHeader";
import TweetBody from "./TweetBody";
import TweetActions from "./TweetActions";
import "./feed.css";
import { useNavigate } from "react-router-dom";

const TweetCard = ({ tweet, onTweetCreated }) => {
  const {
    id,
    author,
    content,
    createdAt,
    likeCount,
    likedByCurrentUser,
    retweetCount,
    retweetedByCurrentUser,
  } = tweet;
  const navigate = useNavigate();
  return (
    <div className="tweet-card" onClick={() => navigate(`/tweets/${id}`)}>
      <div className="tweet-content-wrapper">
        <TweetHeader author={author} createdAt={createdAt} />
        <TweetBody tweet={tweet} />
        <TweetActions tweet={tweet} onTweetCreated={onTweetCreated} />
      </div>
    </div>
  );
};

export default TweetCard;
