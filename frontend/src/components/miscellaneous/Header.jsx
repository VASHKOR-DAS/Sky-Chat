import Logout from "@mui/icons-material/Logout";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/joy/Button";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,
} from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindMenu, bindTrigger } from "material-ui-popup-state";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChatState } from "../../Context/ChatProvider";
import ProfileModel from "./ProfileModel";
import SearchFriendsDrawer from "./SearchFriendsDrawer";

const Header = () => {
  const { user, setUser } = ChatState();

  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("userInfo");
    setUser(null);
    alert("Log out Successful");
    navigate("/");
  };

  // for notification Menu
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleNotificationOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleNotificationClose = () => {
    setAnchorEl(null);
  };
  // for notification Menu

  // for Toggle
  const [toggleProfile, setToggleProfile] = useState({});

  const showProfile = () => {
    const style = { display: "" };
    setToggleProfile(style);
  };

  const hideProfile = () => {
    const style = { display: "none" };
    setToggleProfile(style);
  };
  // for Toggle

  return (
    <>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        p={"1em"}
        margin={"0 0 1em 0"}
        boxShadow={"0 1em 3em -1.5em rgba(150,170,180,0.5)"}
      >
        <SearchFriendsDrawer>
          <Tooltip title="Search User to chat" arrow>
            <Button
              variant="soft"
              startDecorator={<SearchIcon fontSize="small" />}
            >
              <Typography
                p={".2em"}
                sx={{ display: { xs: "none", sm: "none", md: "flex" } }}
              >
                Search user
              </Typography>
            </Button>
          </Tooltip>
        </SearchFriendsDrawer>

        <Typography variant="h5" color={"#054DA7"} fontWeight={"600"}>
          Sky Chat
        </Typography>

        <Box display={"flex"} alignItems={"center"}>
          {/* for notification */}
          <>
            <IconButton
              id="basic-button"
              aria-controls={open ? "avatar-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleNotificationOpen}
              color="primary"
              size="small"
            >
              <NotificationsIcon />
            </IconButton>

            <Menu
              id="avatar-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleNotificationClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleNotificationClose}>
                Notification 1
              </MenuItem>
              <MenuItem onClick={handleNotificationClose}>
                Notification 2
              </MenuItem>
            </Menu>
          </>
          {/* for notification */}

          <>
            <PopupState variant="popover" popupId="demo-popup-menu">
              {(popupState) => (
                <>
                  <Box onClick={showProfile}>
                    <IconButton
                      {...bindTrigger(popupState)}
                      size="small"
                      sx={{ ml: ".5em" }}
                    >
                      <Avatar
                        alt={user.name}
                        src={user.pic}
                        sx={{ width: "2rem", height: "2rem" }}
                      />
                    </IconButton>
                  </Box>

                  <Menu {...bindMenu(popupState)} sx={toggleProfile}>
                    <ProfileModel user={user}>
                      <MenuItem onClick={hideProfile}>
                        <ListItemIcon>
                          <Avatar sx={{ width: "1.5rem", height: "1.5rem" }} />
                        </ListItemIcon>
                        <ListItemText>
                          <Typography>My Profile</Typography>
                        </ListItemText>
                      </MenuItem>
                    </ProfileModel>

                    <Divider variant="middle" />

                    <MenuItem
                      onClick={() => {
                        popupState.close();
                        handleLogOut();
                      }}
                    >
                      <ListItemIcon>
                        <Logout sx={{ fontSize: "1.4rem" }} />
                      </ListItemIcon>
                      <ListItemText>
                        <Typography>Logout</Typography>
                      </ListItemText>
                    </MenuItem>
                  </Menu>
                </>
              )}
            </PopupState>
          </>
        </Box>
      </Box>
    </>
  );
};

export default Header;
