import { Diversity3, Groups, People, Person } from "@mui/icons-material";
import { Avatar, Box, Typography } from "@mui/material";
import { cyan } from "@mui/material/colors";
import React from "react";
import { defaultUserPic } from "../hooks/GlobalVariable";

const MyChatsUserList = ({ chat, selectedChat, user }) => {
  // console.log(chat);
  let getUser;

  const loggedUser = 0;
  const otherUser = 1;

  if (chat?.users[0]?._id === user?._id) {
    getUser = otherUser;
  } else {
    getUser = loggedUser;
  }

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
          <Box display={"flex"}>
            {chat.users[getUser]?.pic === defaultUserPic ? (
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
              <Avatar src={chat?.users[getUser]?.pic} />
            )}

            <Box ml={".5em"}>
              <Typography fontSize={".85rem"} fontWeight={"bold"}>
                {chat?.users[getUser]?.name}
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
      ) : (
        // Group chat
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
      )}
    </>
  );
};

export default MyChatsUserList;
