import { useInfiniteQuery } from "@tanstack/react-query"
import { QUERY_KEYS } from "../constants/queryKeys"
import { fetchFeedByUserId } from "../services/feedService"

export const useUserTweetsQuery = (userId, limit = 10) => {
    return useInfiniteQuery({
        queryKey: QUERY_KEYS.userTweets(userId),
        queryFn: async ({ pageParam }) => {
            const res = await fetchFeedByUserId(userId, limit, pageParam)
            return Array.isArray(res.data) ? res.data : [];
        },
        enabled: !!userId,
        initialPageParam: 0,
        staleTime: 60000,
        getNextPageParam: (lastPage, allPages) => {
            return (!lastPage || lastPage.length < limit) ? undefined : allPages.length * limit;
        }
    })
}