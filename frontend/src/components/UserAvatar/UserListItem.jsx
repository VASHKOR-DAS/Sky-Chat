import React from "react";
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

const UserListItem = ({ handleFunction }) => {
  const { user } = ChatState();
  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <ListItemButton
        alignItems="flex-start"
        onClick={handleFunction}
      >
        <ListItemAvatar>
          <Avatar alt={user.name} src={user.pic} />
        </ListItemAvatar>
        <ListItemText primary={user.name} secondary={user.email} />
        <ListItemIcon edge="end">
          <CommentIcon />
        </ListItemIcon>
      </ListItemButton>
      <Divider variant="inset" component="li" />
    </List>
  );
};

export default UserListItem;
