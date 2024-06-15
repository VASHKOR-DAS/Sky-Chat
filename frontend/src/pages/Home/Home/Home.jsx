import { Box, Container, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChatState } from "../../../Context/ChatProvider";
import Tabs from "../Tabs/Tabs/Tabs";
import "./Home.css";

const Home = () => {
  const { user } = ChatState();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/chats");
    } else {
      navigate("/");
    }
  }, [navigate, user]);

  return (
    <div className="Home">
      <Container maxWidth={"md"} sx={{ py: "2em" }}>
        <Box bgcolor="white" sx={{ borderRadius: 1, py: "1em" }}>
          <Typography variant="h5" color={"cornflowerblue"} textAlign="center">
            Sky Chat
          </Typography>
        </Box>

        <Box pt={"1em"}>
          <Tabs />
        </Box>
      </Container>
    </div>
  );
};

export default Home;
