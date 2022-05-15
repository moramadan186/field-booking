import { useState } from "react";
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
import axios from "axios";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Logo from "./../Logo/Logo";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./../Auth/Auth";
import club1 from "../../assets/club1.jpeg";
import club2 from "../../assets/club2.jpeg";

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
  const navigate = useNavigate();
  const Auth = useAuth();
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8080/sign-in", {
      userNameOrEmail: userNameOrEmail,
      password: password,
    });

    /* 
    - after checking that user have an account in backend ,
    - backend send all user info like that
    {
    firstName: "Mohamed",
    surName: "Ramadan",
    email: "mr01028760097@gmail.com",
    phone: "01028760097",
    password: "12345",
    profileIMG:"link",
    cartItems:[{fieldName:"",fieldImage:"", date:"", time:"", price:""},{}]

    }
    to router link: 8080/user-info
    - forntend  redirect it to home page with putting received backend data on the profile 
    - setShowAccountmenu = true
    - setShowLoggingBtns(false)
    */

    const successUser = {
      firstName: "Mohamed",
      surName: "Ramadan",
      email: "mr01028760097@gmail.com",
      phone: "01028760097",
      password: "12345",
      profileIMG: "link",
      cartItems: [
        {
          id: 1,
          checked: false,
          fieldName: "club 1",
          fieldImage: club1,
          date: "15/5/2022",
          time: "07:00",
          price: 100,
        },
        {
          id: 2,
          checked: true,
          fieldName: "club 2",
          fieldImage: club2,
          date: "15/5/2022",
          time: "09:00",
          price: 120,
        },
      ],
    };
    Auth.login(successUser);
    navigate("/");
    setShowLoggingBtns(false);
    setShowAccountMenu(true);

    /*
    - if backend not found user
    - backend send to router link: 8080/user-info --> not found
    - frontend will show form error message
    */
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
