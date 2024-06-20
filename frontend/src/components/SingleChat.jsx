import { ArrowBack, AttachFile } from "@mui/icons-material";
import { FaPaperPlane } from "react-icons/fa";
// import typingLottie from "../assets/animation/typingLottie.json";
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
// import Lottie from "react-lottie";
import "@dotlottie/player-component";
import io from "socket.io-client";
import { ChatState } from "../Context/ChatProvider";
import { getSender, getSenderFull } from "../config/ChatLogics";
import { serverURL } from "../hooks/serverURL";
import ScrollableChat from "./ScrollableChat";
import ProfileModel from "./miscellaneous/ProfileModel";
import UpdateGroupChatModel from "./miscellaneous/UpdateGroupChatModel";

const ENDPOINT = `${serverURL}`;
var socket, selectedChatCompare;

// for lottie
// const defaultOptions = {
//   loop: true,
//   autoplay: true,
//   animationData: animationData,
//   rendererSettings: {
//     preserveAspectRatio: "xMidYMid slice",
//   },
// };

const SingleChat = () => {
  const {
    user,
    selectedChat,
    setSelectedChat,
    newMessage,
    setNewMessage,
    messages,
    setMessages,
    notification,
    setNotification,
    fetchChatAgain,
    setFetchChatAgain,
  } = ChatState();

  const [loading, setLoading] = useState(false);

  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

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

      // socket create a particular room by clicked a user
      socket.emit("join chat", selectedChat._id);
    } catch (error) {
      console.log("Failed to load the Message");
    }
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user); // (user get from contextApi) pass the loggedUser obj to backend
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
  }, []);

  useEffect(() => {
    fetchMessages();

    selectedChatCompare = selectedChat;
    // eslint-disable-next-line
  }, [selectedChat]); // when send a message call selectedChat

  // console.log(notification, "--------");

  useEffect(() => {
    socket.on("message received", (newMessageReceived) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageReceived.chat._id
      ) {
        // give notification
        if (!notification.includes(newMessageReceived)) {
          setNotification([newMessageReceived, ...notification]);

          // update list of our chat, latest msg update accordingly
          setFetchChatAgain(!fetchChatAgain);
        }
      } else {
        setMessages([...messages, newMessageReceived]);
      }
    });
  });

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
      socket.emit("new message", data);
      setMessages([...messages, data]); //data append in message (State)
    } catch (error) {}
  };

  const typingHandler = (event) => {
    event.preventDefault();
    setNewMessage(event.target.value);

    // Typing Indicator Logic
    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;

    // typing indicator when show or hide
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;

      // when 2 condition are true
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
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
              <ArrowBack />
            </IconButton>

            {!selectedChat.isGroupChat ? (
              <>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bolder", color: grey[800] }}
                >
                  {getSender(user, selectedChat.users)}
                </Typography>
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
                paddingBottom: !isTyping && "1em",
              }}
            >
              <ScrollableChat />
            </Box>

            {/* for typing animation */}
            <Box>
              {isTyping && (
                // <Lottie
                //     options={defaultOptions}
                //     style={{
                //       background: "#e9eff5",
                //       margin: ".2em 0 1em 3.63em",
                //       padding: ".1em",
                //       borderRadius: "1em 1em 1em 0",
                //       boxSizing: "content-box",
                //     }}
                //     width={"4.5rem"}
                //     height={"2rem"}
                //   />

                <dotlottie-player
                  autoplay
                  loop
                  mode="normal"
                  src="https://assets7.lottiefiles.com/private_files/lf30_ibig1tjo.json"
                  style={{
                    background: "#e9eff5",
                    margin: ".2em 0 1em 3.63em",
                    borderRadius: "1em 1em 1em 0",
                    boxSizing: "content-box",
                    width: "4.5rem",
                    height: "2rem",
                  }}
                ></dotlottie-player>
              )}
            </Box>

            <Box
              sx={{
                boxShadow: "0 7px 30px 0px rgba(150,170,180,0.5)",
                padding: ".8em 1em 1em 1em",
              }}
            >
              <Box component="form" onSubmit={sendMessage}>
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
              </Box>
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
