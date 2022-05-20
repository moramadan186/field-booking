import React from "react";
import { Box } from "@mui/material";
import Navbar from "../Navbar/Navbar";
import Search from "../Search/Search";
import "./Header.scss";

const Header = ({ handleTabsChange }) => {
  return (
    <Box className="headerCont">
      <Navbar handleTabsChange={handleTabsChange} />
      <Search />
    </Box>
  );
};

export default Header;
