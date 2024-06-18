import { Badge } from "@mui/material";
import React from "react";
import { ChatState } from "../../Context/ChatProvider";
import { getSenderFull } from "../../config/ChatLogics";

const UserNotifyBadge = ({ chat }) => {
  const { user, notification } = ChatState();

  let filtered = notification.filter((obj) => {
    // users Ids (chat)
    const filteredUserId = obj?.sender?._id;
    const chatUserId = getSenderFull(user, chat?.users)?._id;

    // isGroupChat
    const filteredIsGroupChat = obj?.chat?.isGroupChat;

    if (!filteredIsGroupChat) {
      return filteredUserId === chatUserId;
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

export default UserNotifyBadge;
