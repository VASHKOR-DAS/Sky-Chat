import { Box } from "@mui/material";
import React from "react";
import { ChatState } from "../Context/ChatProvider";
import SingleChat from "./SingleChat";

const ChatBox = () => {
  const { selectedChat } = ChatState();
  return (
    <Box
      sx={{
        display: {
          xs: selectedChat ? "flex" : "none",
          sm: selectedChat ? "flex" : "none",
          md: "flex",
        },
        alignItems: "center",
        flexDirection: "column",
        backgroundColor: "white",
        width: { xs: "100%", sm: "100%", md: "68%" },
      }}
    >
      <SingleChat />
    </Box>
  );
};

export default ChatBox;
