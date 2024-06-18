import { Box } from "@mui/material";
import React from "react";
import { ChatState } from "../Context/ChatProvider";
import SingleChat from "./SingleChat";
import Header from "./miscellaneous/Header";

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
        // alignItems: "center",
        flexDirection: "column",
        backgroundColor: "white",
        width: { xs: "100%", sm: "100%", md: "68%" },
      }}
      mt={".5em"}
      boxShadow={"rgba(0, 0, 0, 0.4) 80px 30px 90px"}
    >
      <Box
        boxShadow={"0 7px 30px -10px rgba(150,170,180,0.5)"}
        px={".7em"}
        mb={".5em"}
        display={{ md: "none" }}
      >
        <Header />
      </Box>
      <SingleChat />
    </Box>
  );
};

export default ChatBox;
