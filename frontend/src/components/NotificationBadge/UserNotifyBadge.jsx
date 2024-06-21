import { Badge, Box, Typography } from "@mui/material";
import React from "react";
import { ChatState } from "../../Context/ChatProvider";
import { handleFormatTime, handleMatchUserMsg } from "../../hooks/Functions";

const UserNotifyBadge = ({ chat }) => {
  const { user, notification } = ChatState();

  const selectTime = chat?.latestMessage?.createdAt;
  const time = handleFormatTime(selectTime);

  return (
    <Box>
      {selectTime && <Typography fontSize={".7rem"}>{time}</Typography>}
      {handleMatchUserMsg(user, notification, chat)?.length > 0 && (
        <Box textAlign={"end"} pr={".5em"}>
          <Badge
            badgeContent={handleMatchUserMsg(user, notification, chat)?.length}
            color="secondary"
          />
        </Box>
      )}
    </Box>
  );
};

export default UserNotifyBadge;
