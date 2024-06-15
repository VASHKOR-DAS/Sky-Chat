import React from "react";
import { useState } from "react";
import {
  Drawer,
  Box,
  TextField,
  List,
  ListItem,
  CircularProgress,
  LinearProgress,
} from "@mui/material";
import Button from "@mui/joy/Button";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/joy/IconButton";
import { ChatState } from "../../Context/ChatProvider";
import axios from "axios";
import ChatLoading from "../ChatLoading";
import UserListItem from "../UserAvatar/UserListItem";
import { serverURL } from "../../hooks/serverURL";

const SearchFriendsDrawer = ({ children }) => {
  const { user, setSelectedChat, chats, setChats } = ChatState();
  const [open, setOpen] = useState(false);
  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  // for search users by query
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

  // for search users by query
  const handleSearch = async () => {
    if (!search) {
      alert("Please Enter something for search");
      return;
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(
        `${serverURL}/api/user?search=${search}`,
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
      // if (old conversion is not asign, create a new conversion by accessChat() /[setSelectedChat])
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
            <Box display={"flex"} gap={1}>
              <TextField
                size="small"
                label="Search users"
                placeholder="Search by name or email"
                variant="outlined"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <IconButton variant="soft" onClick={handleSearch}>
                <SearchIcon />
              </IconButton>
            </Box>
          </ListItem>

          {loading ? (
            <ChatLoading></ChatLoading>
          ) : (
            searchResult?.map((user) => (
              <UserListItem
                key={user._id}
                handleFunction={() => accessChat(user._id)}
              />
            ))
          )}
        </List>
        {loadingChat && (
          <LinearProgress sx={{mx: 1}} />
        )}
      </Drawer>
    </>
  );
};

export default SearchFriendsDrawer;
