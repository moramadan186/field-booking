import React from "react";
import Header from "../Header/Header";
import { Box } from '@mui/material';
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
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus at cupiditate, laborum harum nesciunt est? Itaque explicabo enim, nihil maiores ex, assumenda est temporibus, tempora accusamus autem architecto commodi beatae!
      </Box>
    </Box>
  );
};

export default Home;
