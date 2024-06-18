import { Person } from "@mui/icons-material";
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
import { defaultUserPic } from "../../hooks/GlobalVariable";

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
        {user?.pic === defaultUserPic ? (
          <Avatar
            style={{
              // background: "linear-gradient(to right, #7142e9, #b435f5)",
              backgroundColor: blue[800],
              width: "2.5rem",
              height: "2.5rem",
            }}
          >
            <Person color="white" sx={{ fontSize: "1.8rem" }} />
          </Avatar>
        ) : (
          <Avatar alt={user?.name} src={user?.pic} />
        )}
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
