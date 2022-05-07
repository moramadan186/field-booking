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
  showLoggingBtns,
  showAccountMenu,
  setShowLoggingBtns,
  setShowAccountMenu,
}) => {
  return (
    <Box className="headerCont">
      <Navbar
        setNavHeight={setNavHeight}
        handleTabsChange={handleTabsChange}
        showLoggingBtns={showLoggingBtns}
        showAccountMenu={showAccountMenu}
        setShowAccountMenu={setShowAccountMenu}
        setShowLoggingBtns={setShowLoggingBtns}
      />
      <Search />
    </Box>
  );
};

export default Header;
