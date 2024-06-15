import React from "react";
import ScrollableFeed from "react-scrollable-feed";
import { ChatState } from "../Context/ChatProvider";
import MessageRender from "./MessageRender/MessageRender";

const ScrollableChat = () => {
  const { messages } = ChatState();

  return (
    <ScrollableFeed>
      {messages.map((message, index) => (
        <MessageRender key={index} message={message} index={index} />
      ))}
    </ScrollableFeed>
  );
};

export default ScrollableChat;
