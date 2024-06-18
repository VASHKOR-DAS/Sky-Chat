import CloseIcon from "@mui/icons-material/Close";
import { Box } from "@mui/material";
import React from "react";
import { ChatState } from "../../Context/ChatProvider";

const UserBadgeItem = ({ groupUser, handleFunction }) => {
  const { user } = ChatState();
  return (
    <>
      {user._id !== groupUser._id && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            pl: ".5em",
            py: ".2em",
            m: ".2em",
            borderRadius: ".5rem",
            fontSize: ".9rem",
            cursor: "pointer",
            backgroundColor: "purple",
            color: "white",
          }}
          onClick={handleFunction}
        >
          <Box>{user._id !== groupUser._id && groupUser.name}</Box>
          <CloseIcon fontSize=".8rem" sx={{ px: ".2em" }} />
        </Box>
      )}
    </>
  );
};

export default UserBadgeItem;
