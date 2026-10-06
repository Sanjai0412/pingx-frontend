import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

import TweetForm from "../components/tweet/TweetForm";
import FeedList from "../components/feed/FeedList";

import { useFeedQuery } from "../hooks/useFeedQuery";
import { useInView } from "react-intersection-observer";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "../constants/queryKeys";
import { FeedFooter } from "../components/FeedFooter";

const Home = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { ref, inView } = useInView();
  const queryClient = useQueryClient();

  // Update Announcement
  const UPDATE_KEY = "comment-actions-announced";
  const [showUpdate, setShowUpdate] = useState(false);

  useEffect(() => {
    const alreadyShown = localStorage.getItem(UPDATE_KEY);

    if (!alreadyShown) {
      setShowUpdate(true);
    }
  }, []);
  const handleClose = () => {
    localStorage.setItem(UPDATE_KEY, "true");
    setShowUpdate(false);
  };


  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    error,
    fetchNextPage
  } = useFeedQuery();
  const feed = data?.pages.flatMap((page) => page) ?? [];

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage])

  useEffect(() => {
    if (authLoading || !user) return;

    const needsSetup = localStorage.getItem("needsProfileSetup");
    if (needsSetup === "true") {
      navigate("/user-details");
      return;
    }

  }, [authLoading, user, navigate]);

  const handleTweetCreated = (newTweet) => {
    queryClient.invalidateQueries({
      queryKey: QUERY_KEYS.feed
    })

  };

  if (authLoading || (isLoading && feed.length === 0)) {
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
            <span className="brand-logo"><img src="/pingx_logo.svg" alt="P" /></span>
            <span className="brand-name"><img src="/pingx.svg" alt="PingX" /></span>
          </div>
          <h2>Home</h2>
        </div>

        {/* Update Announcement */}
        {showUpdate && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 9999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(0, 0, 0, 0.55)",
              padding: "20px",
            }}
          >
            <div
              style={{
                width: "100%",
                maxWidth: "600px",
                backgroundColor: "#000",
                color: "#e7e9ea",
                borderRadius: "16px",
                padding: "32px",
                boxShadow: "0 8px 30px rgba(0, 0, 0, 0.5)",
                border: "1px solid #2f3336",
              }}
            >
              <h1
                style={{
                  margin: "0 0 28px",
                  fontSize: "24px",
                  fontWeight: "800",
                  letterSpacing: "-0.3px",
                }}
              >
                What's new?
              </h1>

              <h2
                style={{
                  margin: "0 0 8px",
                  fontSize: "20px",
                  fontWeight: "700",
                }}
              >
                Comment actions are unlocked
              </h2>

              <p
                style={{
                  margin: "0 0 28px",
                  color: "#71767b",
                  fontSize: "15px",
                  lineHeight: "1.5",
                }}
              >
                You can now like, reply, and interact with comments.
              </p>

              <button
                onClick={handleClose}
                style={{
                  width: "100%",
                  padding: "12px 20px",
                  border: "none",
                  borderRadius: "9999px",
                  backgroundColor: "#eff3f4",
                  color: "#0f1419",
                  fontSize: "15px",
                  fontWeight: "700",
                  cursor: "pointer",
                }}
              >
                Got it
              </button>
            </div>
          </div>
        )}


        <TweetForm onTweetCreated={handleTweetCreated} />

        {error && <div className="feed-error-banner">{error}</div>}

        <FeedList feed={feed} onTweetCreated={handleTweetCreated} />

        <FeedFooter ref={ref} isFetchingNextPage={isFetchingNextPage} />
      </main >
    </div >
  );
};

export default Home;
