import React from "react";
import Header from "../Header/Header";
import { Box } from "@mui/material";
import Popular from "./Popular";
import "./Home.scss";
import { PageContainer } from "./../../App";
const Home = (props) => {
  const { handleTabsChange } = props;
  return (
    <Box className="pageLayout">
      <Header handleTabsChange={handleTabsChange} />
      <Box className="popularClubs">
        <PageContainer>
          <Popular />
        </PageContainer>
      </Box>
    </Box>
  );
};

export default Home;
