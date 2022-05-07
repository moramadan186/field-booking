import React, { useState } from "react";
import {
  Grid,
  TextField,
  Button,
  Typography,
  Link,
  FormControlLabel,
  InputAdornment,
  Checkbox,
  IconButton,
  Box,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Logo from "./../Logo/Logo";
import { Navigate,useNavigate } from "react-router-dom";

export const VisibilityIcon = ({ password, setPassword }) => {
  return (
    <InputAdornment position="end">
      <IconButton
        aria-label="toggle password visibility"
        onClick={() => setPassword(!password)}
        onMouseDown={(e) => e.preventDefault()}
      >
        {password ? <Visibility /> : <VisibilityOff />}
      </IconButton>
    </InputAdornment>
  );
};

const Login = ({ handleClick, setShowLoggingBtns, setShowAccountMenu }) => {
  const [userNameOrEmail, setUserNameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkRemember, setCheckRemember] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  // const [toHome, setToHome] = React.useState(false);
  const navigate= useNavigate();
  const handleLoginSubmit = (e) => {
    e.preventDefault();

    //after checking that user have an account, redirect it to home page and setShowAccountmenu = true
    // setToHome(true);
    navigate('/');
    setShowLoggingBtns(false);
    setShowAccountMenu(true);
  };
  // if (toHome === true) return <Navigate to="/" />;

  return (
    <>
      <Grid align="center">
        <Box sx={{ m: "1rem 0 0.5rem" }}>
          <Logo />
        </Box>
        <h2>Sign In</h2>
      </Grid>
      <form onSubmit={handleLoginSubmit}>
        <TextField
          size="small"
          className="loginTextField"
          variant="standard"
          label="Username or Email *"
          fullWidth
          name="userNameOrEmail"
          value={userNameOrEmail}
          onChange={(e) => setUserNameOrEmail(e.target.value)}
        />
        <TextField
          size="small"
          className="loginTextField"
          variant="standard"
          label="Password *"
          fullWidth
          type={showPassword ? "text" : "password"}
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment:
              password !== "" ? (
                <VisibilityIcon
                  password={showPassword}
                  setPassword={setShowPassword}
                />
              ) : (
                " "
              ),
          }}
        />
        <FormControlLabel
          control={
            <Checkbox
              name="checkRemember"
              checked={checkRemember}
              onChange={(e) => setCheckRemember(e.target.checked)}
            />
          }
          label="Remember me"
        />
        <Button
          type="submit"
          variant="contained"
          className="loginBtn"
          fullWidth
        >
          Sign in
        </Button>
        <Typography>
          <Link href="#">Forgot password ?</Link>
        </Typography>
        <Typography>
          {" "}
          Do you have an account ?
          <Link href="#" onClick={() => handleClick("event", 1)}>
            Sign Up
          </Link>
        </Typography>
      </form>
    </>
  );
};

export default Login;
