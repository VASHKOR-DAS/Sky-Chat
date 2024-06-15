import { Avatar, Box, Tooltip } from "@mui/material";
import React from "react";
import { ChatState } from "../../Context/ChatProvider";

const MessageRender = ({ message, index }) => {
  const { user, messages } = ChatState();

  let isLast;
  let isOwnMessage = false;
  if (index < messages.length - 1) {
    if (message.sender._id !== messages[index + 1].sender._id) {
      isLast = true;
    } else {
      isLast = false;
    }
  } else {
    isLast = true;
  }

  if (message.sender._id === user._id) {
    isOwnMessage = true;
  }

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "end",
        flexDirection: `${isOwnMessage ? "row-reverse" : "row"}`,
        alignSelf: `${isOwnMessage ? "end" : "start"}`,
        padding: "0 1em",
      }}
    >
      {isLast && !isOwnMessage ? (
        <Tooltip title={message.sender.name} arrow>
          <Avatar
            sx={{
              mr: ".5em",
              cursor: "pointer",
              width: "2rem",
              height: "2rem",
            }}
            alt={message.sender.name}
            src={message.sender.pic}
          ></Avatar>
        </Tooltip>
      ) : (
        <Box
          sx={{
            mr: `${!isOwnMessage ? "2.63em" : 0}`,
          }}
        ></Box>
      )}

      <span
        style={{
          background: `${
            message.sender._id === user._id
              ? "linear-gradient(to right, #7142e9, #b435f5"
              : "#e9eff5"
          }`,
          color: `${isOwnMessage && "#FFFF"}`,
          boxSizing: "content-box",
          fontSize: ".9rem",
          padding: ".5em 1em",
          borderRadius: "1rem",
          maxWidth: "75%",
          wordWrap: "break-word",
          marginTop: ".2em",

          borderBottomLeftRadius: `${isLast && !isOwnMessage ? "" : "1em"}`,
          borderBottomRightRadius: `${isLast && isOwnMessage ? "" : "1em"}`,
        }}
      >
        {message.content}
      </span>
    </Box>
  );
};

export default MessageRender;
