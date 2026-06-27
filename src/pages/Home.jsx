import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { logoutUser } from "../services/authService";
import { fetchTweets } from "../services/tweetService";
import { useNavigate } from "react-router-dom";
import TweetForm from "../components/TweetForm";
import TweetList from "../components/TweetList";

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

  const handleLogout = async () => {
    try {
      await logoutUser();
      setUser(null);
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

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
    <div className="feed-container">
      <header className="feed-header">
        <div className="feed-brand">
          <h2>PingX</h2>
        </div>
        <div className="feed-user-menu">
          <span className="feed-user-welcome">
            Hi, <strong>{user?.username}</strong>
          </span>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      <main className="feed-main">
        <TweetForm onTweetCreated={handleTweetCreated} />
        {error && <div className="feed-error-banner">{error}</div>}
        <TweetList tweets={tweets} loading={feedLoading} />
      </main>
    </div>
  );
};

export default Home;
