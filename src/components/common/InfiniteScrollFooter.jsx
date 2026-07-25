import React from "react";

const InfiniteScrollFooter = ({
  hasMore,
  loadingMore,
  lastElementRef,
  endMessage = "You've reached the end",
  hasItems = false,
}) => {
  return (
    <>
      <div ref={lastElementRef} style={{ height: "20px" }} />

      {loadingMore && (
        <div className="feed-loading-more">
          <div className="loading-spinner-sm"></div>
        </div>
      )}

      {!hasMore && hasItems && (
        <div className="feed-end-message">{endMessage}</div>
      )}
    </>
  );
};

export default InfiniteScrollFooter;
