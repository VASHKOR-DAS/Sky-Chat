import CommentIcon from "@mui/icons-material/Comment";
import {
  Avatar,
  Box,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { blue } from "@mui/material/colors";
import React from "react";

const UserListItem = ({ handleFunction, user }) => {
  const hover = {
    hoverText: {
      color: "white",
    },
    bg: {
      backgroundColor: blue[700],
    },
    hoverBg: {
      ":hover": {
        backgroundColor: blue[900],
      },
    },
  };

  return (
    <Box
      display={"flex"}
      alignItems="center"
      onClick={handleFunction}
      sx={[
        hover.hoverBg,
        hover.hoverText,
        hover.bg,
        {
          px: ".5em",
          borderRadius: ".3rem",
          cursor: "pointer",
          width: "100%",
        },
      ]}
    >
      <ListItemAvatar>
        <Avatar alt={user?.name} src={user?.pic} />
      </ListItemAvatar>

      <ListItemText
        secondaryTypographyProps={{
          sx: hover.hoverText,
        }}
        primary={user?.name}
        secondary={
          user?.email?.length > 11
            ? user?.email.slice(0, 11) + "..."
            : user?.email
        }
      />

      <ListItemIcon sx={hover.hoverText}>
        <CommentIcon />
      </ListItemIcon>
    </Box>
  );
};

export default UserListItem;
