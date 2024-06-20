import { Avatar, Box, Tooltip } from "@mui/material";
import React from "react";
import { ChatState } from "../../Context/ChatProvider";
import { handleFormatDate, handleFormatTime } from "../../hooks/Functions";

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

  const time = handleFormatTime(message?.createdAt);
  const date = handleFormatDate(message?.createdAt);
  const timeAndDate = `${time} at ${date}`;

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

      <Tooltip title={timeAndDate} placement={isOwnMessage ? "left" : "right"}>
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
      </Tooltip>
    </Box>
  );
};

export default MessageRender;
