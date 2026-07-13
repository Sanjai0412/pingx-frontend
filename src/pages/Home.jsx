import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { fetchTweets } from "../services/tweetService";
import { useNavigate } from "react-router-dom";
import TweetForm from "../components/tweet/TweetForm";
import TweetList from "../components/tweet/TweetList";

const Home = () => {
  const { user, loading: authLoading, setUser } = useAuth();
  const [tweets, setTweets] = useState([]);
  const [feedLoading, setFeedLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (authLoading || !user) return;

    const needsSetup = localStorage.getItem("needsProfileSetup");
    if (needsSetup === "true") {
      navigate("/user-details");
      return;
    }

    const loadData = async () => {
      try {
        const data = await fetchTweets();
        console.log(data);
        setTweets(Array.isArray(data.data) ? data.data : []);
      } catch (err) {
        console.error("Error fetching tweets:", err);
        setError("Could not load feed. Please try again later.");
      } finally {
        setFeedLoading(false);
      }
    };

    loadData();
  }, [authLoading, user, navigate]);

  const handleTweetCreated = (newTweet) => {
    setTweets((prevTweets) => [newTweet, ...prevTweets]);
  };

  if (authLoading) {
    return (
      <div className="auth-container">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <>
      <div className="feed-container">
        <main className="feed-main">
          <div className="home-header">
            <h2>Home</h2>
          </div>
          <TweetForm onTweetCreated={handleTweetCreated} />
          {error && <div className="feed-error-banner">{error}</div>}
          <TweetList tweets={tweets} loading={feedLoading} onTweetCreated={handleTweetCreated} />
        </main>
      </div>
    </>
  );
};

export default Home;
