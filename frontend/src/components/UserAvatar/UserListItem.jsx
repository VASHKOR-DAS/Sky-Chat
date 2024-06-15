import React, { useState } from "react";
import { ChatState } from "../../Context/ChatProvider";
import {
  Avatar,
  Divider,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";
import { blue } from "@mui/material/colors";

const UserListItem = ({ handleFunction }) => {
  const { user } = ChatState();

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
    <List>
      <ListItemButton
        alignItems="flex-start"
        onClick={handleFunction}
        sx={[hover.hoverBg, hover.hoverText, hover.bg]}
      >
        <ListItemAvatar>
          <Avatar alt={user.name} src={user.pic} />
        </ListItemAvatar>
        <ListItemText
          secondaryTypographyProps={{ sx: hover.hoverText }}
          primary={user.name}
          secondary={user.email}
        />
        <ListItemIcon sx={hover.hoverText}>
          <CommentIcon />
        </ListItemIcon>
      </ListItemButton>
      <Divider variant="inset" component="li" />
    </List>
  );
};

export default UserListItem;
