import { useEffect, useState } from "react";
import CommentForm from "../components/comment/CommentForm";
import { useAuth } from "../hooks/useAuth";
import { fetchCommentsByTweetId, fetchTweet } from "../services/tweetService";
import CommentList from "../components/comment/ComentList";
import { useParams } from "react-router-dom";
import TweetCard from "../components/feed/TweetCard";

const TweetDetail = () => {
  const { user, loading: authLoading } = useAuth();
  const [tweet, setTweet] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentsLoading, setCommentsLoading] = useState(true);
  const [error, setError] = useState("");

  const { tweetId } = useParams();
  useEffect(() => {
    if (authLoading || !user) return;
    const loadData = async () => {
      try {
        const tweet = await fetchTweet(tweetId);
        setTweet(tweet.data);
        const data = await fetchCommentsByTweetId(tweetId);
        console.log("Fetched comments: ", data.data);
        setComments(Array.isArray(data.data) ? data.data : []);
      } catch (err) {
        console.error("Error fetchig comments: ", err);
        setError("Could not load comments. Please try again later.");
      } finally {
        setCommentsLoading(false);
      }
    };
    loadData();
  }, [authLoading, user, tweetId]);
  const handleCommentCreated = (newComment) => {
    setComments((prevComments) => [newComment, ...prevComments]);
  };
  return (
    <div>
      <div className="back-btn">{"<-"}</div>
      <div className="tweet-holder">{tweet && <TweetCard tweet={tweet} />}</div>
      <CommentForm tweetId={tweetId} onCommentCreated={handleCommentCreated} />
      {error && <div className="comment-error-banner">{error}</div>}
      <CommentList
        comments={comments}
        loading={commentsLoading}
        onCommentCreated={handleCommentCreated}
      />
    </div>
  );
};

export default TweetDetail;
