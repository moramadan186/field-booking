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
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "./../Auth/Auth";
import joi from "joi-browser";
import FormHelperText from "@mui/material/FormHelperText";

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

const Login = ({ handleClick }) => {
  const [userNameOrEmail, setUserNameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ userNameOrEmail: "", password: "" });
  const [serverErrors, setServerErrors] = useState("");
  const [checkRemember, setCheckRemember] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const Auth = useAuth();
  const location = useLocation();
  const redirectPath = location.state?.path || "/";

  const handlePasswordChange = (event) => {
    validate(event.target.name, event.target.value);
    setPassword(event.target.value);
  };

  const handleUserNameOrEmailChange = (event) => {
    validate(event.target.name, event.target.value);
    setUserNameOrEmail(event.target.value);
  };

  const validate = (fieldName, fieldValue) => {
    const resErr = {};
    let res = joi.validate(
      { [fieldName]: fieldValue },
      { [fieldName]: joi.string().required() },
      {
        abortEarly: false,
      }
    );
    if (res.error == null) {
      delete errors[fieldName];
      return null;
    }
    for (const error of res.error.details) {
      resErr[error.path] = error.message;
    }
    setErrors((e) => ({ ...e, ...resErr }));
    return resErr;
  };
  const bulrEffect = (e) => {
    let errs = errors;
    errs[e.currentTarget.name] = "";
    setErrors({ ...errs });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    validate("password", password);
    validate("userNameOrEmail", userNameOrEmail);
    if (Object.keys(errors).length === 0) {
      try {
        const response = await axios.post("http://localhost:8080/sign-in", {
          userNameOrEmail,
          password,
        });
        if (response.status === 200) {
          Auth.login(response.data);
          navigate(redirectPath, { replace: true });
        }
      } catch (err) {
        setServerErrors(err.response.data.error);
      }
    } else return;
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
    // const successUser = {
    //   userId: "1234566787654",
    //   firstName: "Mohamed",
    //   surName: "Ramadan",
    //   email: "mr01028760097@gmail.com",
    //   phone: "01028760097",
    //   password: "12345",
    //   profileIMG: "link",
    //   cartItems: [
    //     {
    //       bookedid: 1,
    //       userid: 1,
    //       adminid: 1,
    //       status: false,
    //       fieldname: "club 1",
    //       fieldimage: club1,
    //       date: "15/5/2022",
    //       booked_time_start: "07:00",
    //       price: 100,
    //     },
    //     {
    //       bookedid: 2,
    //       userid: 2,
    //       adminid: 2,
    //       status: true,
    //       fieldname: "club 2",
    //       fieldimage: club2,
    //       date: "15/5/2022",
    //       booked_time_start: "09:00",
    //       price: 120,
    //     },
    //     {
    //       bookedid: 3,
    //       userid: 3,
    //       adminid: 3,
    //       status: true,
    //       fieldname: "club 3",
    //       fieldimage: club1,
    //       date: "27/5/2022",
    //       booked_time_start: "04:00",
    //       price: 90,
    //     },
    //     {
    //       bookedid: 4,
    //       userid: 4,
    //       adminid: 4,
    //       status: true,
    //       fieldname: "club 4",
    //       fieldimage: club2,
    //       date: "27/5/2022",
    //       booked_time_start: "04:00",
    //       price: 90,
    //     },
    //   ],
    // };
    // Auth.login(successUser);
    // navigate(redirectPath, { replace: true });
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
          onChange={handleUserNameOrEmailChange}
          error={errors.userNameOrEmail ? true : false}
          helperText={errors.userNameOrEmail}
          onBlur={bulrEffect}
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
          onChange={handlePasswordChange}
          error={errors.password && errors.password !== "" ? true : false}
          helperText={errors.password}
          onBlur={bulrEffect}
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
        <FormHelperText error>{serverErrors}</FormHelperText>
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
