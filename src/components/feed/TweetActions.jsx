import { useState } from "react";
import {
  likeTweet,
  unLikeTweet,
  quoteRetweet,
  retweetTweet,
  unRetweetTweet,
} from "../../services/tweetService";
import { CommentIcon, RetweetIcon, HeartIcon } from "../Icons";
import RetweetPopup from "../tweet/RetweetPopup";

const TweetActions = ({ tweet, onTweetCreated }) => {
  const {
    id,
    likeCount,
    likedByCurrentUser,
    retweetCount,
    replyCount,
    retweetedByCurrentUser,
  } = tweet;
  const [liked, setLiked] = useState(likedByCurrentUser || false);
  const [likes, setLikes] = useState(likeCount || 0);
  const [retweeted, setRetweeted] = useState(retweetedByCurrentUser || false);
  const [retweets, setRetweets] = useState(retweetCount || 0);
  const [showRetweetMenu, setShowRetweetMenu] = useState(false);

  const handleLike = async () => {
    try {
      const response = liked ? await unLikeTweet(id) : await likeTweet(id);
      if (response.success) {
        setLiked(!liked);
        setLikes(liked ? likes - 1 : likes + 1);
      }
    } catch (err) {
      console.error("Failed to toggle like: ", err);
    }
  };

  const handleRetweet = async () => {
    try {
      const response = retweeted
        ? await unRetweetTweet(id)
        : await retweetTweet(id);
      if (response.success) {
        setRetweeted(!retweeted);
        setRetweets(retweeted ? retweets - 1 : retweets + 1);
      }
    } catch (err) {
      console.error("Failed to toggle retweet: ", err);
    }
  };
  const handleQuoteRetweet = async (content) => {
    try {
      const response = await quoteRetweet(id, content);
      if (response.success) {
        if (onTweetCreated && response.data) {
          const quoteTweet = response.data;
          onTweetCreated(quoteTweet);
        }
        setRetweeted(!retweeted);
        setRetweets(retweeted ? retweets - 1 : retweets + 1);
      }
    } catch (err) {
      console.error("Failed to toggle retweet: ", err);
    }
  };
  return (
    <div className="tweet-actions">
      <button className="tweet-action-btn comment-btn">
        <CommentIcon size={16} />
        <span>{replyCount}</span>
      </button>
      {showRetweetMenu && (
        <RetweetPopup
          setShowRepostMenu={setShowRetweetMenu}
          handleRepost={handleRetweet}
          handleQuoteRepost={handleQuoteRetweet}
          retweeted={retweeted}
        />
      )}
      <button
        className={`tweet-action-btn retweet-btn ${retweeted ? "retweeted" : ""}`}
        onClick={(e) => {
          e.stopPropagation();
          setShowRetweetMenu(true);
        }}
      >
        <RetweetIcon size={16} filled={retweeted} />
        <span>{retweets}</span>
      </button>
      <button
        className={`tweet-action-btn like-btn ${liked ? "liked" : ""}`}
        onClick={(e) => {
          e.stopPropagation();
          handleLike();
        }}
      >
        <HeartIcon size={16} filled={liked} />
        <span>{likes}</span>
      </button>
    </div>
  );
};

export default TweetActions;
