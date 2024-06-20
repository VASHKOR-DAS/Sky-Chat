import { Groups, Person } from "@mui/icons-material";
import Logout from "@mui/icons-material/Logout";
import {
  Avatar,
  Badge,
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  MenuList,
  Tooltip,
  Typography,
} from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindMenu, bindTrigger } from "material-ui-popup-state";
import React, { useState } from "react";
import { GrMail } from "react-icons/gr";
import { IoCall, IoSearch } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { ChatState } from "../../Context/ChatProvider";
import { getSenderFull } from "../../config/ChatLogics";
import { handleMatchGroupMsg, handleMatchUserMsg } from "../../hooks/Functions";
import { defaultUserPic } from "../../hooks/GlobalVariable";
import ProfileModel from "./ProfileModel";
import SearchFriendsDrawer from "./SearchFriendsDrawer";

const Header = () => {
  const { user, setUser, notification, setNotification, setSelectedChat } =
    ChatState();

  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("userInfo");
    setUser(null);
    // alert("Log out Successful");
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

  const uniqueSender = notification.filter(
    (obj, index) =>
      notification.findIndex((item) => item.chat._id === obj.chat._id) === index
  );

  return (
    <>
      {/* <ToastContainer position="top-center" autoClose={3000} /> */}
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        p={".65em .5em"}
        boxShadow={"0 1em 3em -1.5em rgba(150,170,180,0.5)"}
      >
        <SearchFriendsDrawer>
          <IconButton style={{ color: "#b435f5" }}>
            <IoSearch />
          </IconButton>
        </SearchFriendsDrawer>

        <Tooltip title="Coming soon" placement="bottom" arrow>
          <IconButton style={{ color: "lightgray" }}>
            <IoCall />
          </IconButton>
        </Tooltip>

        {/* for notification */}
        <>
          <IconButton
            id="basic-button"
            aria-controls={open ? "avatar-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleNotificationOpen}
            style={{ color: "#adb3bb" }}
          >
            <Badge badgeContent={notification.length} color="secondary">
              {/* #f34c69 */}
              <GrMail />
            </Badge>
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
            <MenuList onClick={handleNotificationClose} sx={{ p: 0 }}>
              {!notification.length && (
                <Typography
                  sx={{ fontSize: ".9rem", p: "0 1em", cursor: "pointer" }}
                >
                  No New Message
                </Typography>
              )}

              {/* show notification */}
              {uniqueSender.map((notify) => (
                <MenuItem
                  sx={{
                    mb: ".2em",
                    boxShadow: "0 7px 10px -5px rgba(150,170,180,0.5)",

                    "&: last-child": {
                      mb: 0,
                      boxShadow: "none",
                    },
                  }}
                  key={notify?._id}
                  onClick={() => {
                    // when click a notify its go to chat
                    setSelectedChat(notify?.chat);

                    // when click a notify remove it from array
                    setNotification(
                      notification.filter(
                        (n) => n?.chat?._id !== notify?.chat?._id
                      )
                    );
                  }}
                >
                  {notify?.chat?.isGroupChat ? (
                    <Box
                      width={"100%"}
                      display={"flex"}
                      gap={"2em"}
                      justifyContent={"space-between"}
                      alignItems={"center"}
                      pr={".5em"}
                    >
                      <Box display={"flex"} alignItems={"center"} gap={".5em"}>
                        <Avatar
                          style={{
                            background:
                              "linear-gradient(to right, #7142e9, #b435f5",
                          }}
                          sx={{ width: 30, height: 30 }}
                        >
                          <Groups color="white" fontSize="small" />
                        </Avatar>
                        <Typography fontSize={".9rem"}>
                          {notify?.chat?.chatName}
                        </Typography>
                      </Box>

                      <Box>
                        <Badge
                          badgeContent={
                            handleMatchGroupMsg(notification, notify?.chat)
                              .length
                          }
                          color="secondary"
                        />
                      </Box>
                    </Box>
                  ) : (
                    <Box
                      width={"100%"}
                      display={"flex"}
                      gap={"2em"}
                      justifyContent={"space-between"}
                      alignItems={"center"}
                      pr={".5em"}
                    >
                      <Box display={"flex"} alignItems={"center"} gap={".5em"}>
                        {getSenderFull(user, notify?.chat?.users)?.pic ===
                        defaultUserPic ? (
                          <Avatar
                            style={{
                              background:
                                "linear-gradient(to right, #7142e9, #b435f5",
                            }}
                            sx={{ width: 30, height: 30 }}
                          >
                            <Person color="white" fontSize="small" />
                          </Avatar>
                        ) : (
                          <Avatar
                            sx={{ width: 30, height: 30 }}
                            src={getSenderFull(user, notify?.chat?.users)?.pic}
                          />
                        )}
                        <Typography fontSize={".9rem"}>
                          {getSenderFull(user, notify?.chat?.users)?.name}
                        </Typography>
                      </Box>
                      <Box>
                        <Badge
                          badgeContent={
                            handleMatchUserMsg(user, notification, notify?.chat)
                              .length
                          }
                          color="secondary"
                        />
                      </Box>
                    </Box>
                  )}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        </>
        {/* for notification */}

        <>
          <PopupState variant="popover" popupId="demo-popup-menu">
            {(popupState) => (
              <>
                <Box onClick={showProfile}>
                  <IconButton {...bindTrigger(popupState)} size="small">
                    {user?.pic === defaultUserPic ? (
                      <Avatar
                        style={{
                          background:
                            "linear-gradient(to right, #7142e9, #b435f5)",
                          width: "1.8rem",
                          height: "1.8rem",
                        }}
                      >
                        <Person color="white" fontSize="small" />
                      </Avatar>
                    ) : (
                      <Avatar
                        alt={user?.name}
                        src={user?.pic}
                        sx={{ width: "2rem", height: "2rem" }}
                      />
                    )}
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
    </>
  );
};

export default Header;
