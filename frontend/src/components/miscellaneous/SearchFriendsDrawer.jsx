import Button from "@mui/joy/Button";
import {
  Box,
  Drawer,
  LinearProgress,
  List,
  ListItem,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { ChatState } from "../../Context/ChatProvider";
import { serverURL } from "../../hooks/serverURL";
import ChatLoading from "../ChatLoading";
import UserListItem from "../UserAvatar/UserListItem";

const SearchFriendsDrawer = ({ children }) => {
  const { user, setSelectedChat, chats, setChats } = ChatState();
  const [open, setOpen] = useState(false);
  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  // for search users by query
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

  // for search users by query
  const handleSearch = async (query) => {
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

      setSearchResult(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      alert("Failed to load the search results");
    }
  };
  // for search users by query

  // Create or Access One to One Chat (Access chat)
  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);

      const config = {
        headers: {
          "Content-type": "application/json", //for passing JSON data to backend
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post(
        `${serverURL}/api/chat`,
        { userId },
        config
      );

      // if chats is not already (old conversation) in it, update current chat state(MyChats> chats useState)
      // if (old conversion is not assign, create a new conversion by accessChat() /[setSelectedChat])
      if (!chats.find((c) => c._id === data._id)) {
        setChats([data, ...chats]);
      }
      setSelectedChat(data);
      setLoadingChat(false);
      handleDrawerClose();
    } catch (error) {
      setLoadingChat(false);
      alert("Error fetching the chat", error.message);
    }
  };
  // Create or Access One to One Chat (Create a New chat)

  return (
    <>
      {children ? (
        <span onClick={handleDrawerOpen}>{children}</span>
      ) : (
        <Button variant="contained" onClick={handleDrawerOpen}>
          {open ? "Close Drawer" : "Open Drawer"}
        </Button>
      )}

      <Drawer anchor="left" open={open} onClose={handleDrawerClose}>
        <List>
          <ListItem>
            <Box pt={".6em"} width={"100%"}>
              <TextField
                size="small"
                label="Search users"
                placeholder="Search by name or email"
                variant="outlined"
                onChange={(query) => handleSearch(query.target.value)}
                fullWidth
              />
            </Box>
          </ListItem>

          {searchResult?.length <= 0 && !loading && (
            <Box textAlign={"center"}>No user found</Box>
          )}
          {loading ? (
            <ChatLoading />
          ) : (
            searchResult?.map((user) => (
              <ListItem sx={{ py: 0.4 }}>
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              </ListItem>
            ))
          )}
        </List>
        {loadingChat && <LinearProgress sx={{ mx: 1 }} />}
      </Drawer>
    </>
  );
};

export default SearchFriendsDrawer;
