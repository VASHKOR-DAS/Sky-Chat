import React from "react";
import { Outlet } from "react-router-dom";
import "./Main.css";

const Main = () => {
  return (
    <div>
      <Outlet></Outlet>
    </div>
  );
};

export default Main;
