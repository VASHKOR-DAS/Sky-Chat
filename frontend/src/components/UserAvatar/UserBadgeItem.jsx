import { Box } from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";

const UserBadgeItem = ({ user, handleFunction }) => {
  return (
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
      <Box>{user.name}</Box>
      <CloseIcon fontSize=".8rem" sx={{ px: ".2em" }} />
    </Box>
  );
};

export default UserBadgeItem;
