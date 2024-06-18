import VisibilityIcon from "@mui/icons-material/Visibility";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import { Button, IconButton, Stack, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import axios from "axios";
import React, { useState } from "react";
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
  px: 4,
  py: 2,
};

const UpdateGroupChatModel = ({ fetchMessages }) => {
  const {
    user,
    selectedChat,
    setSelectedChat,
    fetchChatAgain,
    setFetchChatAgain,
  } = ChatState();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setSearchResult();
  };

  // for projects
  const [groupChatName, setGroupChatName] = useState();
  const [searchResult, setSearchResult] = useState();
  const [loading, setLoading] = useState(false);
  const [renameLoading, setRenameLoading] = useState();

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

      console.log("data", data);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      setLoading(false);
      alert("Failed to load the search results");
    }
  };

  // Group rename
  const handleRename = async () => {
    if (!groupChatName) {
      return;
    }

    try {
      setRenameLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.put(
        `${serverURL}/api/chat/rename`,
        {
          chatId: selectedChat._id,
          chatName: groupChatName,
        },
        config
      );

      setSelectedChat(data);
      setFetchChatAgain(!fetchChatAgain);
      fetchMessages(); // so that all the messages get refresh
      setRenameLoading(false);
    } catch (error) {
      alert(error.message);
      setRenameLoading(false);
    }
  };

  const handleAddUser = async (user1) => {
    if (selectedChat.users.find((u) => u._id === user1._id)) {
      alert("User Already in group!");
      return;
    }

    if (selectedChat.groupAdmin._id !== user._id) {
      alert("Only admins can add member!");
      return;
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.put(
        `${serverURL}/api/chat/groupadd`,
        {
          chatId: selectedChat._id,
          userId: user1._id,
        },
        config
      );

      setSelectedChat(data);
      setFetchChatAgain(!fetchChatAgain);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      alert(error.message);
    }
  };

  //   remove member from the group
  const handleRemove = async (user1) => {
    if (selectedChat.groupAdmin._id !== user._id && user1._id !== user._id) {
      alert("Only admins can remove member!");
      return;
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.put(
        `${serverURL}/api/chat/groupremove`,
        {
          chatId: selectedChat._id,
          userId: user1._id,
        },
        config
      );

      // if the group remove, user who has logged in he has remove himself or he has left the group
      // this group for the left user is no more to see
      user1._id === user._id ? setSelectedChat() : setSelectedChat(data);
      setFetchChatAgain(!fetchChatAgain);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      alert(error.message);
    }
    setGroupChatName("");
  };

  return (
    <div>
      <IconButton onClick={handleOpen}>
        <VisibilityIcon />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack spacing={"1em"} alignItems="center">
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {selectedChat.chatName}
            </Typography>

            <Box sx={{ display: "flex", width: "100%", flexWrap: "wrap" }}>
              {selectedChat.users.map((u) => (
                <UserBadgeItem
                  key={user._id}
                  groupUser={u}
                  handleFunction={() => handleRemove(u)}
                />
              ))}
            </Box>

            <Box display={"flex"} gap={".5em"}>
              <TextField
                fullWidth
                id="outlined-basic"
                label="Group Name"
                variant="outlined"
                size="small"
                value={groupChatName}
                onChange={(e) => setGroupChatName(e.target.value)}
              />
              <LoadingButton
                color="info"
                // type="submit"
                loading={renameLoading}
                // loadingPosition="start"
                // startIcon={<RiUserAddFill />}
                onClick={handleRename}
                variant="contained"
              >
                <span>Update</span>
              </LoadingButton>
            </Box>
            <TextField
              fullWidth
              id="outlined-basic"
              label="Add User"
              variant="outlined"
              size="small"
              onChange={(query) => handleSearch(query.target.value)}
            />

            {/* userList */}
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
                      handleFunction={() => handleAddUser(user)}
                    />
                  </Box>
                ))
              )}
            </Box>

            <Button
              variant="outlined"
              onClick={() => handleRemove(user)}
              color="error"
            >
              <Typography textTransform={"capitalize"}>Leave Group</Typography>
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
};

export default UpdateGroupChatModel;
