import { useRef, useCallback } from "react";

export const useInfiniteScroll = ({ hasMore, loading, onLoadMore }) => {
  const observerRef = useRef(null);

  const lastElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          onLoadMore();
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [loading, hasMore, onLoadMore]
  );

  return { lastElementRef };
};
