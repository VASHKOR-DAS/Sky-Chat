import { Box } from "@mui/material";
import ChatBox from "../../components/ChatBox";
import Header from "../../components/miscellaneous/Header";
import MyChats from "../../components/MyChats";
import bg from "../../assets/images/bg.jpg";

const Chat = () => {
  return (
    <>
      <Box
        sx={{
          backgroundImage: `url(${bg})`,
          height: "100vh",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Header />

        <Box display={"flex"} justifyContent={"space-between"} padding={"1rem"}>
          <MyChats />
          <ChatBox />
        </Box>
      </Box>
    </>
  );
};

export default Chat;
