import TweetBody from "./TweetBody";
import TweetHeader from "./TweetHeader";

const QuotedTweetCard = ({ tweet }) => {
    return <div className="quoted-tweet-card">
        <TweetHeader author={tweet.author} createdAt={tweet.createdAt} />
        <TweetBody compact={true} tweet={tweet} />
    </div>
}

export default QuotedTweetCard;