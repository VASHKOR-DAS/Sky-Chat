import { Person } from "@mui/icons-material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Avatar, Button, IconButton, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { defaultUserPic } from "../../hooks/GlobalVariable";

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

const ProfileModel = ({ user, children }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      {children ? (
        <span onClick={handleOpen}>{children}</span>
      ) : (
        <IconButton onClick={handleOpen}>
          <VisibilityIcon />
        </IconButton>
      )}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack spacing={"1em"} alignItems="center">
            {user?.pic === defaultUserPic ? (
              <Avatar
                style={{
                  background: "linear-gradient(to right, #7142e9, #b435f5)",
                  width: "4rem",
                  height: "4rem",
                }}
              >
                <Person color="white" fontSize="large" />
              </Avatar>
            ) : (
              <Avatar
                alt={user.name}
                src={user.pic}
                sx={{ width: "4rem", height: "4rem" }}
              ></Avatar>
            )}

            <Typography id="modal-modal-title" variant="h6" component="h2">
              Name: {user.name}
            </Typography>
            <Typography id="modal-modal-description">
              Email: {user.email}
            </Typography>
            <Button
              variant="contained"
              fullWidth
              color="error"
              onClick={handleClose}
            >
              Close
            </Button>
          </Stack>
        </Box>
      </Modal>
    </>
  );
};

export default ProfileModel;
