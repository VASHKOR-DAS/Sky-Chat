import { ArrowBack, AttachFile } from "@mui/icons-material";
import { FaPaperPlane } from "react-icons/fa";
import "./SingleChat.css";

import {
  Box,
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import { getSender, getSenderFull } from "../config/ChatLogics";
import { serverURL } from "../hooks/serverURL";
import ScrollableChat from "./ScrollableChat";
import ProfileModel from "./miscellaneous/ProfileModel";
import UpdateGroupChatModel from "./miscellaneous/UpdateGroupChatModel";

const SingleChat = () => {
  const {
    user,
    selectedChat,
    setSelectedChat,
    newMessage,
    setNewMessage,
    messages,
    setMessages,
  } = ChatState();

  // const defaultUserPic =
  //   "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg";

  // const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  // allMessages
  const fetchMessages = async (event) => {
    if (!selectedChat) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      setLoading(true);

      const { data } = await axios.get(
        `${serverURL}/api/message/${selectedChat._id}`,
        config
      );

      // console.log(messages);
      setMessages(data);
      setLoading(false);
    } catch (error) {
      console.log("Failed to load the Message");
    }
  };

  useEffect(() => {
    fetchMessages();

    // eslint-disable-next-line
  }, [selectedChat]); // when send a message call selectedChat

  const sendMessage = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      const config = {
        headers: {
          "Content-type": "application/json", //for passing JSON data to backend
          Authorization: `Bearer ${user.token}`,
        },
      };

      setNewMessage("");

      const { data } = await axios.post(
        `${serverURL}/api/message`,
        {
          content: newMessage,
          chatId: selectedChat._id,
        },
        config
      );

      setLoading(false);
      setMessages([...messages, data]); //data append in message (State)
    } catch (error) {}
  };

  const typingHandler = (event) => {
    event.preventDefault();
    setNewMessage(event.target.value);

    // Typing Indicator Logic
  };

  return (
    <>
      {selectedChat ? (
        <>
          <Box
            width={"100%"}
            display={"flex"}
            justifyContent={{ xs: "space-between", sm: "space-between" }}
            alignItems={"center"}
            fontSize={"1.3rem"}
            color={"#054DA7"}
            fontWeight={"600"}
            padding={"0.5em 1em"}
            margin={"0 0 1em 0"}
            boxShadow={"0 7px 30px -10px rgba(150,170,180,0.5)"}
          >
            <IconButton
              sx={{ display: { xs: "flex", sm: "flex", md: "none" } }}
              onClick={() => setSelectedChat("")}
            >
              <ArrowBack sx={{ color: "#054DA7" }} />
            </IconButton>

            {!selectedChat.isGroupChat ? (
              <>
                {/* <Box display={"flex"}>
                  {(selectedChat?.users[0]?.pic ||
                    selectedChat?.users[1]?.pic === defaultUserPic) && (
                    <Avatar
                      style={{
                        background:
                          "linear-gradient(to right, #7142e9, #b435f5",
                      }}
                    >
                      <Person color="white" />
                    </Avatar>
                  )} */}
                <Typography
                  // ml={".5em"}
                  variant="h6"
                  sx={{ fontWeight: "bolder", color: grey[800] }}
                >
                  {getSender(user, selectedChat.users)}
                </Typography>
                {/* </Box> */}
                <ProfileModel user={getSenderFull(user, selectedChat.users)} />
              </>
            ) : (
              <>
                <Box>
                  <Typography
                    // ml={".5em"}
                    variant="h6"
                    sx={{ fontWeight: "bolder", color: grey[800] }}
                  >
                    {selectedChat.chatName.toUpperCase()}
                  </Typography>
                </Box>
                <UpdateGroupChatModel fetchMessages={fetchMessages} />
              </>
            )}
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              backgroundColor: "white",
              width: "100%",
              height: "100%",
              overflowY: "hidden",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                overflowY: "scroll",
                scrollbarWidth: "none",
              }}
            >
              <ScrollableChat />
            </Box>

            <Box
              component="form"
              sx={{
                boxShadow: "0 7px 30px 0px rgba(150,170,180,0.5)",
                mt: "1em",
                padding: ".8em 1em 1em 1em",

                // this is Chat typing TextBox to be always bottom style
              }}
              onSubmit={sendMessage}
            >
              <TextField
                InputProps={{
                  style: {
                    borderRadius: "50px",
                    fontSize: ".9rem",
                  },
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconButton>
                        <AttachFile
                          style={{
                            transform: "rotate(45deg) scaleY(-1)",
                          }}
                          fontSize="small"
                        />
                      </IconButton>
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        type="submit"
                        style={{
                          background:
                            "linear-gradient(to right, #7142e9, #b435f5",
                          borderRadius: "50%",
                          position: "absolute",
                          right: 0,
                          outline: 0,
                          zIndex: 1,
                        }}
                      >
                        {loading ? (
                          <CircularProgress
                            sx={{ color: "white" }}
                            size={"1em"}
                          />
                        ) : (
                          <FaPaperPlane
                            color="white"
                            style={{ padding: "2px" }}
                          />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      // borderColor: "",
                      borderWidth: 0,
                      backgroundColor: "rgba(150,170,180,0.2)",
                      borderRadius: "50px",
                    },

                    "&:hover fieldset": {
                      borderColor: "#b435f5",
                      borderWidth: 2,
                      backgroundColor: "initial",
                    },

                    "&.Mui-focused fieldset": {
                      borderWidth: 0,
                      backgroundColor: "initial",
                    },
                  },
                }}
                placeholder="Type a message here..."
                size="small"
                multiline
                maxRows={4}
                required
                value={newMessage || ""}
                onChange={typingHandler}
              />
              {/* <IconButton type="submit">
                <Send color="primary" sx={{ fontSize: "1.7rem" }} />
              </IconButton> */}
            </Box>
          </Box>
        </>
      ) : (
        <Box className="gesture"></Box>
      )}
    </>
  );
};

export default SingleChat;
