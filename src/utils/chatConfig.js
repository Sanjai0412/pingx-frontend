import { io } from "socket.io-client";
import { getAccessToken } from "./axiosConfig";

let socket = null;

const connectChatSocket = () => {
    if (socket?.connected) {
        return socket;
    }

    const token = getAccessToken();

    if (!token) {
        return null;
    }

    return io(import.meta.env.VITE_CHAT_API_URL, {
        auth: {
            token,
        },
    });
};

export default connectChatSocket;