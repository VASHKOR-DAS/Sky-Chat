import { Add } from "@mui/icons-material";
import { Box, Stack, Tooltip, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import { serverURL } from "../hooks/serverURL";
import ChatLoading from "./ChatLoading";
import MyChatsUserList from "./MyChatsUserList";
import GroupChatModal from "./miscellaneous/GroupChatModal";

const MyChats = () => {
  // for GroupChatModal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  const {
    user,
    selectedChat,
    setSelectedChat,
    chats,
    setChats,
    fetchChatAgain,
  } = ChatState();

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`${serverURL}/api/chat`, config);

      setChats(data);
    } catch (error) {
      alert("Failed to load the chat");
    }
  };

  //When leave a group chat (fetchChatAgain) this func call again
  useEffect(() => {
    fetchChats();
    // eslint-disable-next-line
  }, [fetchChatAgain]);

  return (
    //My Chat Header
    <Box
      sx={{
        display: {
          xs: selectedChat ? "none" : "flex",
          sm: selectedChat ? "none" : "flex",
          md: "flex",
        },
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#f8fafc",
        width: { xs: "100%", md: "32%" },
      }}
    >
      <Box
        sx={{ backgroundColor: "white" }}
        position={"relative"} // for centering icon
        alignItems={"center"}
        display={"flex"}
        width={"100%"}
        justifyContent={"space-between"}
        padding={".85em 1em"}
        margin={"0 0 1em 0"}
        boxShadow={"0 7px 30px -10px rgba(150,170,180,0.5)"}
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: "bolder", color: grey[800] }}
        >
          My Chats
        </Typography>

        <GroupChatModal open={open} setOpen={setOpen} handleOpen={handleOpen} />
        <Tooltip title="Create Group" placement="top" arrow>
          <Add
            fontSize="small"
            onClick={handleOpen}
            sx={{
              "&:hover": {
                transform: "scale(1.2)",
                transition: "all .2s",
              },
              cursor: "pointer",
            }}
            style={{
              background: "linear-gradient(to right, #7142e9, #b435f5",
              borderRadius: "50%",
              color: "white",
              padding: ".1em",
              boxSizing: "content-box",
            }}
          />
        </Tooltip>
      </Box>

      <Box
        sx={{
          mt: "2em",
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          borderRadius: ".1rem",
          overflowY: "hidden",
        }}
      >
        {chats ? (
          <Stack sx={{ overflowY: "scroll" }}>
            {chats.map((chat) => (
              <Box
                key={chat._id}
                onClick={() => setSelectedChat(chat)}
                color={selectedChat === chat ? "white" : grey[800]}
                borderRadius={".5rem"}
                p={".5rem"}
                m={"0.2em 1em"}
                boxShadow={"0 7px 10px -5px rgba(150,170,180,0.5)"}
                sx={{
                  cursor: "pointer",
                  "&:hover": {
                    transform: "scale(1.05)",
                    transition: "all .2s",
                    boxShadow: "rgba(0, 0, 0, 0.4) 0px 30px 50px",
                  },
                }}
                style={{
                  background: `${
                    selectedChat === chat
                      ? "linear-gradient(to right, #7142e9, #b435f5"
                      : "white"
                  }`,
                }}
              >
                <MyChatsUserList
                  chat={chat}
                  selectedChat={selectedChat}
                  user={user}
                />

                {/* <Typography>
                  {!chat.isGroupChat
                    ? getSender(user, chat.users)
                    : chat.chatName}
                </Typography> */}
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
};

export default MyChats;
