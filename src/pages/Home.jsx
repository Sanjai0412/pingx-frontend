import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

import TweetForm from "../components/tweet/TweetForm";
import FeedList from "../components/feed/FeedList";

import { fetchFeed } from "../services/feedService";

const Home = () => {
  const { user, loading: authLoading } = useAuth();

  const [feed, setFeed] = useState([]);
  const [feedLoading, setFeedLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (authLoading || !user) return;

    const loadFeed = async () => {
      try {
        setFeedLoading(true);

        const response = await fetchFeed(20, 0);

        setFeed(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        console.error("Error fetching feed:", err);
        setError("Could not load feed. Please try again later.");
      } finally {
        setFeedLoading(false);
      }
    };

    const needsSetup = localStorage.getItem("needsProfileSetup");
    if (needsSetup === "true") {
      navigate("/user-details");
      return;
    }

    loadFeed();
  }, [authLoading, user, navigate]);

  const handleTweetCreated = (newTweet) => {
    const feedItem = {
      type: "TWEET",
      activityAt: newTweet.createdAt,
      performedBy: newTweet.author,
      tweet: newTweet,
    };

    setFeed((prev) => [feedItem, ...prev]);
    console.log(feed);
  };

  if (authLoading || feedLoading) {
    return (
      <div className="auth-container">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className="feed-container">
      <main className="feed-main">
        <div className="home-header">
          <div className="mobile-brand-logo" onClick={() => navigate("/")}>
            <span className="brand-logo">P</span>
            <span className="brand-name">PingX</span>
          </div>
          <h2>Home</h2>
        </div>

        <TweetForm onTweetCreated={handleTweetCreated} />

        {error && <div className="feed-error-banner">{error}</div>}

        <FeedList feed={feed} onTweetCreated={handleTweetCreated} />
      </main>
    </div>
  );
};

export default Home;
