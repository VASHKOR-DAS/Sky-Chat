import { Badge, Box, Typography } from "@mui/material";
import React from "react";
import { ChatState } from "../../Context/ChatProvider";
import { handleFormatTime } from "../../hooks/Functions";

const GroupNotifyBadge = ({ chat }) => {
  const { notification } = ChatState();

  let filtered = notification.filter((obj) => {
    // isGroupChat
    const filteredIsGroupChat = obj?.chat?.isGroupChat;

    // groupChatIds
    const filteredGroupChatId = obj?.chat?._id;
    const chatGroupId = chat?._id;

    if (filteredIsGroupChat) {
      var groupNotify = filteredGroupChatId === chatGroupId;
      return groupNotify;
    }
    return groupNotify;
  });

  const time = handleFormatTime(chat?.latestMessage?.createdAt);

  return (
    <Box>
      <Typography fontSize={".7rem"}>{time}</Typography>
      <Box textAlign={"end"} pr={".5em"}>
        {filtered?.length > 0 && (
          <Badge badgeContent={filtered.length} color="secondary" />
        )}
      </Box>
    </Box>
  );
};

export default GroupNotifyBadge;
