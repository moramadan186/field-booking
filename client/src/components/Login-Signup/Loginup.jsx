import * as React from "react";
import PropTypes from "prop-types";
import { Tabs, Tab, Paper, Box } from "@mui/material";
import Login from "./Login";
import Signup from "./Signup";
import Navbar from "../Navbar/Navbar";
import "./logging.scss";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Box>{children}</Box>
        </Box>
      )}
    </div>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Loginup({
  loggingValue,
  handleTabsChange,
}) {
  return (
    <>
      {/* <Navbar
        handleTabsChange={handleTabsChange}
      /> */}
      <Paper className="loggingCont" elevation={0}>
        <Paper className="tabsWraper" elevation={10}>
          <Tabs
            value={loggingValue}
            onChange={handleTabsChange}
            aria-label="basic tabs example"
            variant="fullWidth"
          >
            <Tab label="signin" {...a11yProps(0)} />
            <Tab label="signup" {...a11yProps(1)} />
          </Tabs>
          <TabPanel value={loggingValue} index={0}>
            <Login
              handleClick={handleTabsChange}
            />
          </TabPanel>
          <TabPanel value={loggingValue} index={1}>
            <Signup />
          </TabPanel>
        </Paper>
      </Paper>
    </>
  );
}
