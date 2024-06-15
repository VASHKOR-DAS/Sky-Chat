import React, { useEffect } from "react";
import "./Home.css";
import Tabs from "../Tabs/Tabs/Tabs";
import { Box, Container, Typography } from "@mui/material";
import bg from "../../../assets/images/bg.jpg";

import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@mui/material/styles";
import { ChatState } from "../../../Context/ChatProvider";
import { useNavigate } from "react-router-dom";

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

  let theme = createTheme();
  theme = responsiveFontSizes(theme);

  return (
    <Box
      sx={{
        backgroundImage: `url(${bg})`,
        height: "100vh",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <ThemeProvider theme={theme}>
        <Container maxWidth={"md"} sx={{ py: 4 }}>
          <Box bgcolor="white" sx={{ borderRadius: 1, py: 2 }}>
            <Typography variant="h4" color={"black"} textAlign="center">
              Sky Chat
            </Typography>
          </Box>

          <Box sx={{ pt: 2 }}>
            <Tabs></Tabs>
          </Box>
        </Container>
      </ThemeProvider>
    </Box>
  );
};

export default Home;
