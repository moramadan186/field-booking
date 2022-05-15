import React from "react";
import Header from "../Header/Header";
import { Box } from "@mui/material";
import Popular from "./Popular";
import "./Home.scss";
import { PageContainer } from "./../../App";
const Home = (props) => {
  const {
    setNavHeight,
    navHeight,
    handleTabsChange,
    loggingValue,
    showLoggingBtns,
    showAccountMenu,
    setShowLoggingBtns,
    setShowAccountMenu,
  } = props;
  return (
    <Box className="pageLayout">
      <Header
        setNavHeight={setNavHeight}
        navHeight={navHeight}
        handleTabsChange={handleTabsChange}
        loggingValue={loggingValue}
        showLoggingBtns={showLoggingBtns}
        showAccountMenu={showAccountMenu}
        setShowLoggingBtns={setShowLoggingBtns}
        setShowAccountMenu={setShowAccountMenu}
      />
      <Box className="popularClubs">
        <PageContainer>
          <Popular />
        </PageContainer>
      </Box>
    </Box>
  );
};

export default Home;
