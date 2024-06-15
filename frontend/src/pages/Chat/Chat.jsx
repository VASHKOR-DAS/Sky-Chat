import { Box } from "@mui/material";
import ChatBox from "../../components/ChatBox";
import MyChats from "../../components/MyChats";
import Header from "../../components/miscellaneous/Header";

const Chat = () => {
  return (
    <>
      <Box>
        <Header />

        <Box display={"flex"} justifyContent={"space-between"} height={"90vh"}>
          <MyChats />
          <ChatBox />
        </Box>
      </Box>
    </>
  );
};

export default Chat;
