import { useInfiniteQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../constants/queryKeys";
import { fetchFeed } from "../services/feedService";

const fetchFeedByPage = async ({ pageParam }) => {
    const response = await fetchFeed(10, pageParam);
    return Array.isArray(response.data) ? response.data : [];
}
export const useFeedQuery = (limit = 10) => {

    return useInfiniteQuery({
        queryKey: QUERY_KEYS.feed,
        queryFn: fetchFeedByPage,
        initialPageParam: 0,
        staleTime: 60000,
        getNextPageParam: (lastPage, allPages) => {
            return (!lastPage || lastPage.length < limit) ? undefined : allPages.length * limit;
        }
    })
}