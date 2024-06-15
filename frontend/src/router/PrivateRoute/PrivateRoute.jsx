import React, { useState } from "react";
import { ChatState } from "../../Context/ChatProvider";
import Home from "../../pages/Home/Home/Home";

const PrivateRoute = ({ children }) => {
  const { user } = ChatState();

  return user ? children : <Home />;
};

export default PrivateRoute;
