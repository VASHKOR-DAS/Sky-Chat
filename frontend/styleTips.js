import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import { useState } from "react";
import { Avatar } from "@mui/material";

const ProfileInfo = ({ userCredentials, userPicture }) => {
    const [selected, setSelected] = useState(false);

    return (
        <ListItemButton
            selected={selected}
            onClick={() => setSelected((prev) => !prev)}
            sx={{
                "&.Mui-selected": {
                    backgroundColor: "#2e8b57"
                },
                "&.Mui-focusVisible": {
                    backgroundColor: "#2e8b57"
                },
                ":hover": {
                    backgroundColor: "#2e8b57"
                }
            }}
        >
            <Avatar
                alt={userCredentials}
                src={userPicture}
                sx={{ width: 24, height: 24 }}
            />
            <ListItemText primary={userCredentials} sx={{ marginLeft: 3 }} />
        </ListItemButton>
    );
};

export default ProfileInfo;

/*
const UserListItem = ({ handleFunction }) => {
  const { user } = ChatState();
  const hover = {
    ":hover": {
      backgroundColor: "#2e8b57",
      color: "white",
    },
  };
  return (
    <List>
      <ListItemButton
        alignItems="flex-start"
        onClick={handleFunction}
        sx={hover}
      >
        <ListItemAvatar>
          <Avatar alt={user.name} src={user.pic} />
        </ListItemAvatar>
        <ListItemText
          secondaryTypographyProps={{ sx: hover }}
          primary={user.name}
          secondary={user.email}
        />

        <ListItemIcon sx={hover}>
          <CommentIcon />
        </ListItemIcon>
      </ListItemButton>
      <Divider variant="inset" component="li" />
    </List>
  );
};

 */