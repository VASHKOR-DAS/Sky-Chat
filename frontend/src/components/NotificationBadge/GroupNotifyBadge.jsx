import { Badge } from "@mui/material";
import React from "react";
import { ChatState } from "../../Context/ChatProvider";

const GroupNotifyBadge = ({ chat }) => {
  const { notification } = ChatState();

  let filtered = notification.filter((obj) => {
    // isGroupChat
    const filteredIsGroupChat = obj?.chat?.isGroupChat;

    // groupChatIds
    const filteredGroupChatId = obj?.chat?._id;
    const chatGroupId = chat?._id;

    if (filteredIsGroupChat) {
      return filteredGroupChatId === chatGroupId;
    }
  });

  return (
    <>
      {filtered?.length > 0 && (
        <Badge badgeContent={filtered.length} color="secondary" />
      )}
    </>
  );
};

export default GroupNotifyBadge;