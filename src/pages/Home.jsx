import { useEffect, useCallback } from "react";
import { useAuth } from "../hooks/useAuth";
import { usePaginatedFeed } from "../hooks/usePaginatedFeed";
import { useNavigate } from "react-router-dom";

import TweetForm from "../components/tweet/TweetForm";
import FeedList from "../components/feed/FeedList";
import InfiniteScrollFooter from "../components/common/InfiniteScrollFooter";

import { fetchFeed } from "../services/feedService";

const Home = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const fetchHomeFeed = useCallback(async (limit, offset) => {
    const response = await fetchFeed(limit, offset);
    return Array.isArray(response.data) ? response.data : [];
  }, []);

  const {
    items: feed,
    loading: feedLoading,
    loadingMore,
    hasMore,
    error,
    lastElementRef,
    loadData,
    addItem,
  } = usePaginatedFeed(fetchHomeFeed, 20);

  useEffect(() => {
    if (authLoading || !user) return;

    const needsSetup = localStorage.getItem("needsProfileSetup");
    if (needsSetup === "true") {
      navigate("/user-details");
      return;
    }

    loadData(0);
  }, [authLoading, user, navigate, loadData]);

  const handleTweetCreated = (newTweet) => {
    const feedItem = {
      type: "TWEET",
      activityAt: newTweet.createdAt,
      performedBy: newTweet.author,
      tweet: newTweet,
    };

    addItem(feedItem);
  };

  if (authLoading || (feedLoading && feed.length === 0)) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
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

        <InfiniteScrollFooter
          hasMore={hasMore}
          loadingMore={loadingMore}
          lastElementRef={lastElementRef}
          endMessage="You've reached the end of the feed"
          hasItems={feed.length > 0}
        />
      </main>
    </div>
  );
};

export default Home;
