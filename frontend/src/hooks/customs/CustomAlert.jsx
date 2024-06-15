import React, { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import { Alert, AlertTitle } from "@mui/material";

const CustomAlert = ({ severity, text, titleText, children }) => {
  const [openAlert, setOpenAlert] = useState(true);

  const handleOpenAlert = () => {
    setOpenAlert(true);
  };

  const handleCloseAlert = (event, reason) => {
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
        autoHideDuration={2000}
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
