import { useQuery } from "@tanstack/react-query"
import { QUERY_KEYS } from "../constants/queryKeys"
import { getProfile } from "../services/userService";

export const useProfileQuery = (username) => {
    return (
        useQuery({
            queryKey: QUERY_KEYS.profile(username),
            queryFn: async () => await getProfile(username),
            enabled: !!username
        })

    )
}