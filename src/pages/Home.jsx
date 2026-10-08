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
import Announcement from "../components/announcement/Announcement";

const Home = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { ref, inView } = useInView();
  const queryClient = useQueryClient();

  // Update Announcement
  const UPDATE_KEY = "comment-actions-announced";

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
        <Announcement UPDATE_KEY={UPDATE_KEY} />


        <TweetForm onTweetCreated={handleTweetCreated} />

        {error && <div className="feed-error-banner">{error}</div>}

        <FeedList feed={feed} onTweetCreated={handleTweetCreated} />

        <FeedFooter ref={ref} isFetchingNextPage={isFetchingNextPage} />
      </main >
    </div >
  );
};

export default Home;
