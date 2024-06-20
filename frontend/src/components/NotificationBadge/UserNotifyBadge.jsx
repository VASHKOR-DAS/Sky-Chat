import { Badge, Box, Typography } from "@mui/material";
import React from "react";
import { ChatState } from "../../Context/ChatProvider";
import { getSenderFull } from "../../config/ChatLogics";
import { handleFormatTime } from "../../hooks/Functions";

const UserNotifyBadge = ({ chat }) => {
  const { user, notification } = ChatState();

  let filtered = notification.filter((obj) => {
    // users Ids (chat)
    const filteredUserId = obj?.sender?._id;
    const chatUserId = getSenderFull(user, chat?.users)?._id;

    // isGroupChat
    const filteredIsGroupChat = obj?.chat?.isGroupChat;

    if (!filteredIsGroupChat) {
      var userNotify = filteredUserId === chatUserId;
      return userNotify;
    }
    return userNotify;
  });

  const time = handleFormatTime(chat?.latestMessage?.createdAt);

  return (
    <Box>
      <Typography fontSize={".7rem"}>{time}</Typography>
      {filtered?.length > 0 && (
        <Box textAlign={"end"} pr={".5em"}>
          <Badge badgeContent={filtered.length} color="secondary" />
        </Box>
      )}
    </Box>
  );
};

export default UserNotifyBadge;
