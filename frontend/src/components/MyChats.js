import React, { useEffect } from 'react';
import { ChatState } from '../Context/ChatProvider';
import axios from "axios";
import { serverURL } from '../hooks/serverURL';
import { Box, Stack, Typography } from '@mui/material';
import GroupChatModal from './miscellaneous/GroupChatModal';
import Button from "@mui/joy/Button";
import { Add } from '@mui/icons-material';
import ChatLoading from './ChatLoading';
import { getSender } from '../config/ChatLogics';

const MyChats = () => {
  const { user, selectedChat, setSelectedChat, chats, setChats } = ChatState();

  const fetchChats = async () => {

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`${serverURL}/api/chat`,
        config);

      setChats(data);
    } catch (error) {
      alert('Failed to load the chat');
    }
  };

  //call fetchChats func inside useEffect
  useEffect(() => {
    fetchChats();
  }, []);


  return (

    //My Chat Header
    <Box
      sx={{
        display: { xs: selectedChat ? 'none' : 'flex', sm: selectedChat ? 'none' : 'flex', md: 'flex' },
        flexDirection: "column",
        alignItems: "center",
        p: 3,
        backgroundColor: "white",
        width: { xs: "100%", md: "31%" },
        borderRadius: ".6rem",
        borderWidth: "0.1rem",
      }}
    >
      <Box
        sx={{
          display: "flex",
          pb: 3,
          px: 3,
          fontSize: "1.6rem",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        My Chats
        <GroupChatModal>
          <Button
            variant="soft"
            endDecorator={<Add fontSize="small" />}
          >
            Create Group
          </Button>
        </GroupChatModal>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          p: 3,
          backgroundColor: "#F8F8F8",
          width: "100%",
          height: "100%",
          borderRadius: ".1rem",
          overflowY: "hidden"
        }}
      >
        {
          chats ?
            <Stack gap={1} sx={{ overflowY: "scroll" }}>
              {
                chats.map((chat) => (
                  <Box
                    key={chat._id}
                    onClick={() => setSelectedChat(chat)}
                    backgroundColor={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                    color={selectedChat === chat ? "white" : "black"}
                    borderRadius={".5rem"}
                    px={3}
                    py={2}
                    sx={{ cursor: "pointer" }}
                  >
                    <Typography>
                      {!chat.isGroupChat
                        ? getSender(user, chat.users)
                        : chat.chatName}
                    </Typography>
                  </Box>
                ))}
            </Stack>
            : <ChatLoading />
        }
      </Box>



    </Box >
  );
};

export default MyChats;