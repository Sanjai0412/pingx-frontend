import QuotedTweetCard from "./QuotedTweetCard";

const TweetBody = ({ tweet, compact }) => {
    return <>
        <p className={compact ? "tweet-body-small" : "tweet-body"}>
            {tweet.content}
        </p>

        {tweet.quotedTweet && (
            <QuotedTweetCard tweet={tweet.quotedTweet} />
        )}
    </>
}

export default TweetBody;