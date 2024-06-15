import { createContext, useContext, useEffect, useState } from "react";

const ChatContext = createContext();
const ChatProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [selectedChat, setSelectedChat] = useState();
  const [chats, setChats] = useState();
  const [fetchChatAgain, setFetchChatAgain] = useState(true);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);
  }, []);

  const chatValue = {
    user,
    setUser,
    selectedChat,
    setSelectedChat,
    chats,
    setChats,
    fetchChatAgain,
    setFetchChatAgain,
  };
  return (
    <ChatContext.Provider value={chatValue}>{children}</ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
