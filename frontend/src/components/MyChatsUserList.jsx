import { Diversity3, Groups, People, Person } from "@mui/icons-material";
import { Avatar, Box, Typography } from "@mui/material";
import { cyan } from "@mui/material/colors";
import React from "react";
import { ChatState } from "../Context/ChatProvider";
import { getSenderFull } from "../config/ChatLogics";
import { defaultUserPic } from "../hooks/GlobalVariable";

import GroupNotifyBadge from "./NotificationBadge/GroupNotifyBadge";
import UserNotifyBadge from "./NotificationBadge/UserNotifyBadge";

const MyChatsUserList = ({ chat }) => {
  // console.log(chat);
  const { user, selectedChat } = ChatState();

  const isOwnMessage = chat?.latestMessage?.sender?._id === user._id;
  let latestMessageRender = chat?.latestMessage?.content;
  let latestMessageSlice = latestMessageRender?.slice(0, 15) + " ...";

  if (latestMessageRender?.length > 15) {
    latestMessageRender = latestMessageSlice;
  }

  return (
    <>
      {!chat?.isGroupChat ? (
        <>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Box display={"flex"}>
              <>
                {getSenderFull(user, chat?.users)?.pic === defaultUserPic ? (
                  <Avatar
                    style={{
                      background: `${
                        selectedChat === chat
                          ? cyan["500"]
                          : "linear-gradient(to right, #7142e9, #b435f5"
                      }`,
                    }}
                  >
                    {selectedChat === chat ? (
                      <People color="white" />
                    ) : (
                      <Person color="white" />
                    )}
                  </Avatar>
                ) : (
                  <Avatar src={getSenderFull(user, chat?.users)?.pic} />
                )}

                <Box ml={".5em"}>
                  <Typography fontSize={".85rem"} fontWeight={"bold"}>
                    {getSenderFull(user, chat?.users)?.name}
                  </Typography>
                  <Typography fontSize={".8rem"}>
                    {isOwnMessage ? (
                      <>You: {latestMessageRender}</>
                    ) : (
                      <>{latestMessageRender}</>
                    )}
                  </Typography>
                </Box>
              </>
              {/* for notification */}
            </Box>
            <Box pr={".5em"}>
              <UserNotifyBadge chat={chat} />
            </Box>
          </Box>
        </>
      ) : (
        // Group chat
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <>
            <Box display={"flex"}>
              <Avatar
                style={{
                  background: `${
                    selectedChat === chat
                      ? cyan["500"]
                      : "linear-gradient(to right, #7142e9, #b435f5"
                  }`,
                }}
              >
                {selectedChat === chat ? (
                  <Diversity3 color="white" />
                ) : (
                  <Groups color="white" />
                )}
              </Avatar>
              <Box ml={".5em"}>
                <Typography fontSize={".85rem"} fontWeight={"bold"}>
                  {chat?.chatName}
                </Typography>
                <Typography fontSize={".8rem"}>
                  {isOwnMessage ? (
                    <>You: {latestMessageRender}</>
                  ) : (
                    <>{latestMessageRender}</>
                  )}
                </Typography>
              </Box>
            </Box>
          </>
          {/* for notification */}
          <Box pr={".5em"}>
            <GroupNotifyBadge chat={chat} />
          </Box>
        </Box>
      )}
    </>
  );
};

export default MyChatsUserList;
