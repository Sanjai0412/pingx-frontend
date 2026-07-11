import { useEffect, useState } from "react"
import { followUser, isFollowing, unfollowUser } from "../services/userService";

export const useFollow = (userId) => {
    const [following, setFollowing] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!userId) return;

        const fetchFollowStatus = async () => {
            try {
                const status = await isFollowing(userId);
                setFollowing(status);
            } catch (err) {
                console.error(err);
                setFollowing(false);
            } finally {
                setLoading(false);
            }
        }
        fetchFollowStatus();
    }, [userId]);

    const toggleFollow = async () => {
        try {
            if (following) {
                await unfollowUser(userId);
                setFollowing(false);
            } else {
                await followUser(userId);
                setFollowing(true);
            }
        } catch (err) {
            console.error(err);
        }
    }
    return {
        following,
        loading,
        toggleFollow
    }
}