import React from "react";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";
import logo from "../../assets/logo.png";
const Logo = () => {
  return (
    <Box
      style={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box>
        <Link to="/">
          <img style={{ width: "45px" }} src={logo} alt="" />
        </Link>
      </Box>
      <span
        style={{
          fontWeight: 600,
          color: "#F0534A",
          fontSize: "12px",
        }}
      >
        90
      </span>
    </Box>
  );
};

export default Logo;
