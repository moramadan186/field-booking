import React from "react";
import { Box } from "@mui/material";
import Navbar from "../Navbar/Navbar";
import Search from "../Search/Search";
import "./Header.scss";

const Header = ({
  setNavHeight,
  handleTabsChange,
  navHeight,
  loggingValue,
}) => {
  return (
    <Box className="headerCont">
      <Navbar
        setNavHeight={setNavHeight}
        handleTabsChange={handleTabsChange}
        showLoggingBtns={true}
      />
      <Search />
      {/* <Loginup navHeight={navHeight} handleTabsChange={handleTabsChange} loggingValue={loggingValue}/> */}
    </Box>
  );
};

export default Header;
