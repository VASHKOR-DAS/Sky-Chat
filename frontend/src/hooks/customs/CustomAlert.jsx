import { Alert, AlertTitle } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import React from "react";
import { ChatState } from "../../Context/ChatProvider";
import { handleOpenAlert } from "../Functions";

const CustomAlert = ({ severity, text, titleText, children }) => {
  const { openAlert, setOpenAlert } = ChatState();

  // const handleOpenAlert = (setOpenAlert) => {
  //   setOpenAlert(true);
  // };
  handleOpenAlert(setOpenAlert);

  const handleCloseAlert = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };

  let title = <AlertTitle>{titleText}</AlertTitle>;

  if (titleText === undefined) {
    title = "";
  }
  return (
    <>
      {children && <span onClick={handleOpenAlert}>{children}</span>}

      <Snackbar
        anchorOrigin={{
          horizontal: "center",
          vertical: "top",
        }}
        open={openAlert}
        autoHideDuration={3000}
        onClose={handleCloseAlert}
        sx={{ width: "100%" }}
      >
        <Alert onClose={handleCloseAlert} variant="filled" severity={severity}>
          {title}
          {text}
        </Alert>
      </Snackbar>
    </>
  );
};

export default CustomAlert;
