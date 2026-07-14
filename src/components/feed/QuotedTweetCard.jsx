import { useNavigate } from "react-router-dom";
import TweetBody from "./TweetBody";
import TweetHeader from "./TweetHeader";

const QuotedTweetCard = ({ tweet }) => {
  const navigate = useNavigate();
  return (
    <div
      className="quoted-tweet-card"
      onClick={(e) => {
        e.stopPropagation();
        navigate(`/tweets/${tweet.id}`);
      }}
    >
      <TweetHeader author={tweet.author} createdAt={tweet.createdAt} />
      <TweetBody compact={true} tweet={tweet} />
    </div>
  );
};

export default QuotedTweetCard;
