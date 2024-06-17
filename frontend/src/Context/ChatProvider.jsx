import { createContext, useContext, useEffect, useState } from "react";

const ChatContext = createContext();
const ChatProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [selectedChat, setSelectedChat] = useState();
  const [chats, setChats] = useState();
  const [fetchChatAgain, setFetchChatAgain] = useState(false); //when leave a group refresh ui
  const [newMessage, setNewMessage] = useState();
  const [messages, setMessages] = useState([]);

  // for notification
  const [notification, setNotification] = useState([]);

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
    newMessage,
    setNewMessage,
    messages,
    setMessages,
    notification,
    setNotification,
  };
  return (
    <ChatContext.Provider value={chatValue}>{children}</ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
