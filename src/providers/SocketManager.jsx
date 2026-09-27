import { useEffect } from "react";
import connectChatSocket from "../utils/chatConfig";
import { useAuth } from "../hooks/useAuth";

function SocketManager({ children }) {
    const { user, loading } = useAuth();

    useEffect(() => {
        if (loading || !user) {
            return;
        }

        connectChatSocket();
    }, [user, loading]);

    return children;
}

export default SocketManager;