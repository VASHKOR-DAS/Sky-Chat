import { Diversity3, Groups, People, Person } from "@mui/icons-material";
import { Avatar, Box, Typography } from "@mui/material";
import { cyan } from "@mui/material/colors";
import React from "react";

const MyChatsUserList = ({ chat, selectedChat, user }) => {
  // console.log(chat);
  const defaultUserPic =
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg";

  return (
    <>
      {!chat?.isGroupChat ? (
        <>
          {chat?.users[0]?._id === user?._id ? (
            <Box display={"flex"}>
              {chat.users[1]?.pic === defaultUserPic ? (
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
                <Avatar src={chat?.users[1]?.pic} />
              )}

              <Box ml={".5em"}>
                <Typography fontSize={".85rem"} fontWeight={"bold"}>
                  {chat?.users[1]?.name}
                </Typography>
                <Typography fontSize={".8rem"}>
                  {chat?.latestMessage?.sender?._id === user._id ? (
                    <>You: {chat?.latestMessage?.content}</>
                  ) : (
                    <>{chat?.latestMessage?.content}</>
                  )}
                </Typography>
              </Box>
            </Box>
          ) : (
            <Box display={"flex"}>
              {chat.users[0]?.pic === defaultUserPic ? (
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
                <Avatar src={chat?.users[1]?.pic} />
              )}
              <Box ml={".5em"}>
                <Typography fontSize={".85rem"} fontWeight={"bold"}>
                  {chat?.users[0]?.name}
                </Typography>
                <Typography fontSize={".8rem"}>
                  {chat?.latestMessage?.sender?._id === user._id ? (
                    <>You: {chat?.latestMessage?.content}</>
                  ) : (
                    <>{chat?.latestMessage?.content}</>
                  )}
                </Typography>
              </Box>
            </Box>
          )}
        </>
      ) : (
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
              {chat?.latestMessage?.sender?._id === user._id ? (
                <>You: {chat?.latestMessage?.content}</>
              ) : (
                <>{chat?.latestMessage?.content}</>
              )}
            </Typography>
          </Box>
        </Box>
      )}
    </>
  );
};

export default MyChatsUserList;
