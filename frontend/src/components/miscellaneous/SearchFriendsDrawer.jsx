import React from "react";
import { useState } from "react";
import {
  Drawer,
  Box,
  TextField,
  List,
  ListItem,
  ListItemButton,
} from "@mui/material";
import Button from "@mui/joy/Button";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/joy/IconButton";
import { ChatState } from "../../Context/ChatProvider";
import axios from "axios";
import ChatLoading from "../ChatLoading";
import UserListItem from "../UserAvatar/UserListItem";
import { serverURL } from "../../serverURL";

const SearchFriendsDrawer = ({ children }) => {
  const { user } = ChatState();
  const [open, setOpen] = useState(false);
  const handleDrawerOpen = () => setOpen(true);
  // const handleDrawerClose = () => setOpen(false);

  // for searching users
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

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

      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      alert("Failed to load the search results");
      setLoading(false);
    }
  };

  const accessChat = (userId) => {};
  // for searching users

  return (
    <>
      {children ? (
        <span onClick={handleDrawerOpen}>{children}</span>
      ) : (
        <Button variant="contained" onClick={handleDrawerOpen}>
          {open ? "Close Drawer" : "Open Drawer"}
        </Button>
      )}

      <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
        <List>
          <ListItem>
            <Box display={"flex"} justifyContent={"space-between"} gap={1}>
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
      </Drawer>
    </>
  );
};

export default SearchFriendsDrawer;
