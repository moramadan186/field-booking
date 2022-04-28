import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./App.scss";
import { StyledEngineProvider } from "@mui/material/styles";
import Loginup from "./components/Login-Signup/Loginup";
import Header from "./components/Header/Header";

const theme = createTheme({
  palette: {
    primary: {
      main: "#24DC89",
    },
  },
});

function App() {
  const [navHeight, setNavHeight] = useState();
  const [loggingValue, setLoggingValue] = React.useState(0);

  const handleTabsChange = (event, newValue) => {
    setLoggingValue(newValue);
  };

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CSSReset />
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <Header
                  setNavHeight={setNavHeight}
                  navHeight={navHeight}
                  handleTabsChange={handleTabsChange}
                  loggingValue={loggingValue}
                />
              }
            />
            <Route
              path="/logging"
              element={
                <Loginup
                  navHeight={navHeight}
                  setNavHeight={setNavHeight}
                  handleTabsChange={handleTabsChange}
                  loggingValue={loggingValue}
                />
              }
            />
          </Routes>
        </Router>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
//Styled Component
const CSSReset = createGlobalStyle`
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: inherit;
}
html, body {
  min-height: 100vh;
}
html {
  /* font-size: 62.5%; 1rem = 10px */
  box-sizing: border-box;
  /* min-height: 100%; */

}
body {
  /* font-size: 1.4rem; */
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  font-weight: 300;
  /* min-height: 100vh; */
  /* padding-top: 60px; */

}
`;
export const PageContainer = styled.div`
  max-width: 1140px;
  margin: 0 auto;
  margin-top: ${({ mt }) => mt || 0}px;
  padding-top: ${({ pt }) => pt || 0};
  transition: max-width 0.2s ease-in-out;
  @media (max-width: 576px) {
    max-width: 90%;
  }
  @media (min-width: 576px) {
    max-width: 540px;
  }
  @media (min-width: 768px) {
    max-width: 720px;
  }
  @media (min-width: 992px) {
    max-width: 960px;
  }
  @media (min-width: 1200px) {
    max-width: 1140px;
  }
`;
export default App;