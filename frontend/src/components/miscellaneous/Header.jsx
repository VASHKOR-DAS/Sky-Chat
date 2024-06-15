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
import Button from "@mui/joy/Button";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import Logout from "@mui/icons-material/Logout";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import ProfileModel from "./ProfileModel";
import SearchFriendsDrawer from "./SearchFriendsDrawer";

const Header = () => {
   const [user, setUser] = useState([]);

   useEffect(() => {
     const userInfo = JSON.parse(localStorage.getItem("userInfo"));
     if (userInfo) {
       setUser(userInfo);
     }
   }, []);

  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("userInfo");
    alert("Log out Successful");
    setUser(null);
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
        p={2}
        bgcolor="white"
      >
        <SearchFriendsDrawer>
          <Tooltip title="Search User to chat" arrow>
            <Button
              variant="soft"
              startDecorator={<SearchIcon fontSize="small" />}
            >
              <Typography
                variant="body2"
                sx={{ display: { xs: "none", sm: "none", md: "flex" } }}
              >
                Search user
              </Typography>
            </Button>
          </Tooltip>
        </SearchFriendsDrawer>

        <Typography variant="h6" color={"CornflowerBlue"}>
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
              fontSize="medium"
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
                      sx={{ ml: 1 }}
                    >
                      <Avatar
                        alt={user.name}
                        src={user.pic}
                        sx={{ width: 32, height: 32 }}
                      />
                    </IconButton>
                  </Box>

                  <Menu {...bindMenu(popupState)} sx={toggleProfile}>
                    <ProfileModel user={user}>
                      <MenuItem onClick={hideProfile}>
                        <ListItemIcon>
                          <Avatar sx={{ width: 24, height: 24 }} />
                        </ListItemIcon>
                        <ListItemText>My Profile</ListItemText>
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
                        <Logout fontSize="small" />
                      </ListItemIcon>
                      <ListItemText>Logout</ListItemText>
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
