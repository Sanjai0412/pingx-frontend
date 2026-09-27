import chatSocket from "../utils/chatConfig";

const getConnection = () => {
    return chatSocket.on("greeting", (message) => {
        console.log(message);
    });
}

export const openConversation = (receiverId) => {
    
}