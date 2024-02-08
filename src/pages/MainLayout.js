import React from "react";
import ResponsiveAppBar from "./ResponsiveAppBar";

import { Outlet } from "react-router-dom";
import TopBar from "./TopBar";
function MainLayout() {
  return (
    <>
      <TopBar />
      <div>
        <Outlet />
      </div>
    </>
  );
}

export default MainLayout;
