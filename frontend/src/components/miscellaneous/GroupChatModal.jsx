import { Button, Stack, TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import axios from "axios";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { ChatState } from "../../Context/ChatProvider";
import { serverURL } from "../../hooks/serverURL";
import UserBadgeItem from "../UserAvatar/UserBadgeItem";
import UserListItem from "../UserAvatar/UserListItem";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const GroupChatModal = ({ open, setOpen, handleOpen }) => {
  // const [open, setOpen] = useState(false);
  // const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setSelectedUsers([]);
    setSearchResult();
  };

  // for projects
  const [groupChatName, setGroupChatName] = useState();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchResult, setSearchResult] = useState();
  const [loading, setLoading] = useState(false);

  const { user, chats, setChats } = ChatState();

  const handleSearch = async (query) => {
    console.log("query", query);

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(
        `${serverURL}/api/user?search=${query}`,
        config
      );

      // console.log("data", data);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      setLoading(false);
      toast.error("Failed to load the search results");
    }
  };

  const handleSubmit = async () => {
    if (!groupChatName || !selectedUsers) {
      toast.error("Please fill all the fields");
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post(
        `${serverURL}/api/chat/group`,
        {
          name: groupChatName,
          users: JSON.stringify(selectedUsers.map((u) => u._id)),
        },
        config
      );

      setChats([data, ...chats]);
      handleClose();
      toast.success("New Group Chat Created");
    } catch (error) {
      toast.error("Failed to Create the Chat!");
    }
  };

  const handleDelete = (delUser) => {
    setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
  };

  const handleGroup = (userToAdd) => {
    if (selectedUsers.includes(userToAdd)) {
      return toast.error("User already added");
    } else {
      setSelectedUsers([...selectedUsers, userToAdd]);
    }
  };

  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} />
      {/* <span onClick={handleOpen}>{children}</span> */}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleSubmit}>
            <Stack spacing={"1em"} alignItems="center">
              <Typography id="modal-modal-title" variant="h6" component="h1">
                Create Group
              </Typography>
              <TextField
                fullWidth
                id="outlined-basic"
                label="Group Name"
                variant="outlined"
                size="small"
                onChange={(e) => setGroupChatName(e.target.value)}
              />
              <TextField
                fullWidth
                id="outlined-basic"
                label="Add Users"
                placeholder="eg: John, Nil, Lota"
                variant="outlined"
                size="small"
                onChange={(query) => handleSearch(query.target.value)}
              />

              <Box sx={{ display: "flex", width: "100%", flexWrap: "wrap" }}>
                {selectedUsers.map((u) => (
                  <UserBadgeItem
                    key={u._id}
                    groupUser={u}
                    handleFunction={() => handleDelete(u)}
                  />
                ))}
              </Box>
              {/* selected users */}

              <Box
                overflow={"scroll"}
                maxHeight={
                  searchResult && !loading && searchResult?.length > 0 && "10em"
                }
                width={"100%"}
              >
                {searchResult?.length <= 0 && !loading && (
                  <Box textAlign={"center"}>No user found</Box>
                )}
                {loading ? (
                  <Box textAlign={"center"}>Loading...</Box>
                ) : (
                  searchResult?.map((user) => (
                    <Box sx={{ pb: 0.5 }}>
                      <UserListItem
                        key={user._id}
                        user={user}
                        handleFunction={() => handleGroup(user)}
                      />
                    </Box>
                  ))
                )}
              </Box>

              {/* to click on this handleGroup func it's added the mapping user on selectedUsers array */}

              <Box
                display={"flex"}
                justifyContent={"space-between"}
                width={"100%"}
                gap={"1em"}
              >
                <Button
                  variant="contained"
                  fullWidth
                  color="error"
                  onClick={handleClose}
                >
                  Cancel
                </Button>

                <Button variant="contained" fullWidth type="submit">
                  Create Chat
                </Button>
              </Box>
            </Stack>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default GroupChatModal;
