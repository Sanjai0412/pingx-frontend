import { useState, useCallback } from "react";
import { useInfiniteScroll } from "./useInfiniteScroll";

export const usePaginatedFeed = (fetchFn, LIMIT = 20) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState("");

  const loadData = useCallback(
    async (currentOffset = 0) => {
      try {
        if (currentOffset === 0) {
          setLoading(true);
          setHasMore(true);
        } else {
          setLoadingMore(true);
        }

        const newItems = await fetchFn(LIMIT, currentOffset);

        if (currentOffset === 0) {
          setItems(newItems);
        } else {
          setItems((prev) => {
            const existingIds = new Set(
              prev.map((item) => item.tweet?.id || item.id)
            );
            const uniqueNew = newItems.filter(
              (item) => !existingIds.has(item.tweet?.id || item.id)
            );
            return [...prev, ...uniqueNew];
          });
        }

        if (newItems.length < LIMIT) {
          setHasMore(false);
        }

        setOffset(currentOffset + newItems.length);
      } catch (err) {
        console.error("Error loading paginated feed:", err);
        setError(
          err.response?.data?.message || err.message || "Failed to load data."
        );
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [fetchFn, LIMIT]
  );

  const handleLoadMore = useCallback(() => {
    loadData(offset);
  }, [loadData, offset]);

  const { lastElementRef } = useInfiniteScroll({
    hasMore,
    loading: loading || loadingMore,
    onLoadMore: handleLoadMore,
  });

  const addItem = useCallback((newItem) => {
    setItems((prev) => [newItem, ...prev]);
  }, []);

  const resetAndReload = useCallback(() => {
    setOffset(0);
    setHasMore(true);
    loadData(0);
  }, [loadData]);

  return {
    items,
    setItems,
    loading,
    loadingMore,
    hasMore,
    error,
    lastElementRef,
    loadData,
    addItem,
    resetAndReload,
  };
};
