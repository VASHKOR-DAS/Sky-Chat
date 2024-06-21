import { Badge, Box, Typography } from "@mui/material";
import React from "react";
import { ChatState } from "../../Context/ChatProvider";
import { handleFormatTime, handleMatchGroupMsg } from "../../hooks/Functions";

const GroupNotifyBadge = ({ chat }) => {
  const { notification } = ChatState();

  const selectTime = chat?.latestMessage?.createdAt;
  const time = handleFormatTime(selectTime);

  return (
    <Box>
      {selectTime && <Typography fontSize={".7rem"}>{time}</Typography>}
      {handleMatchGroupMsg(notification, chat)?.length > 0 && (
        <Box textAlign={"end"} pr={".5em"}>
          <Badge
            badgeContent={handleMatchGroupMsg(notification, chat)?.length}
            color="secondary"
          />
        </Box>
      )}
    </Box>
  );
};

export default GroupNotifyBadge;
