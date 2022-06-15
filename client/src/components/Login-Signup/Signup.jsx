import React, { useState } from "react";
import {
  Grid,
  Box,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Stack,
} from "@mui/material";
import axios from "axios";
import { VisibilityIcon } from "./Login";
import Logo from "./../Logo/Logo";
import { useAuth } from "./../Auth/Auth";
import { useNavigate, useLocation } from "react-router-dom";
import FormHelperText from "@mui/material/FormHelperText";
const Signup = () => {
  const [signupValues, setSignupValues] = useState({
    firstName: "",
    surName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    checkedTerms: false,
  });
  const [showFirstPass, setShowFirstPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const Auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [Errors, setErrors] = useState({
    connfirmPassword: "",
    general: "",
  });
  const redirectPath = location.state?.path || "/";
  const handleChange = (fieldName) => (event) => {
    setSignupValues({ ...signupValues, [fieldName]: event.target.value });
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    let validated = true;
    Object.values(signupValues).forEach((item) => {
      if (item === "" || item === false) {
        validated = false;
      }
    });
    if (validated === false)
      setErrors((e) => ({ ...e, general: "Please fill all fields" }));
    else {
      if (signupValues.password !== signupValues.confirmPassword) {
        setErrors((e) => ({ ...e, confirmPassword: "Passwords do not match" }));
      }
      try {
        const response = await axios.post(
          "http://localhost:8080/sign-up",
          signupValues
        );
        if (response.status === 200) {
          alert("Congratulation, Your Account Created");
          Auth.login(response.data);
          navigate(redirectPath, { replace: true });
        }
      } catch (err) {
        setErrors((e) => ({ ...e, general: err.response.data.error }));
      }
    }
  };

  return (
    <>
      <Grid align="center">
        <Box sx={{ m: "1rem 0 0.5rem" }}>
          <Logo />
        </Box>

        <h2>Sign Up</h2>
      </Grid>
      <form onSubmit={handleSignupSubmit}>
        <Stack direction="row" justifyContent="space-between">
          <TextField
            sx={{ width: "46%" }}
            variant="standard"
            size="small"
            className="signUpTextField"
            label="First name"
            name="firstName"
            value={signupValues.firstName}
            onChange={handleChange("firstName")}
          />
          <TextField
            sx={{ width: "46%" }}
            variant="standard"
            size="small"
            className="signUpTextField"
            label="Surname"
            name="surName"
            value={signupValues.surName}
            onChange={handleChange("surName")}
          />
        </Stack>
        <TextField
          variant="standard"
          size="small"
          className="signUpTextField"
          fullWidth
          label="Email"
          name="email"
          value={signupValues.email}
          onChange={handleChange("email")}
          type="email"
        />
        <TextField
          variant="standard"
          size="small"
          className="signUpTextField"
          fullWidth
          label="Phone Number"
          name="phone"
          value={signupValues.phone}
          onChange={handleChange("phone")}
          type="tel"
        />
        <TextField
          variant="standard"
          size="small"
          className="signUpTextField"
          fullWidth
          label="Password"
          name="password"
          value={signupValues.password}
          onChange={handleChange("password")}
          type={showFirstPass ? "text" : "password"}
          InputProps={{
            endAdornment:
              signupValues.password !== "" ? (
                <VisibilityIcon
                  password={showFirstPass}
                  setPassword={setShowFirstPass}
                />
              ) : (
                " "
              ),
          }}
        />
        <TextField
          variant="standard"
          size="small"
          className="signUpTextField"
          fullWidth
          label="Confirm Password"
          name="confirmPassword"
          value={signupValues.confirmPassword}
          onChange={handleChange("confirmPassword")}
          type={showConfirmPass ? "text" : "password"}
          InputProps={{
            endAdornment:
              signupValues.confirmPassword !== "" ? (
                <VisibilityIcon
                  password={showConfirmPass}
                  setPassword={setShowConfirmPass}
                />
              ) : (
                " "
              ),
          }}
        />
        <FormHelperText error>{Errors.confirmPassword}</FormHelperText>
        <FormControlLabel
          control={
            <Checkbox
              name="checkedTerms"
              checked={signupValues.checkedTerms}
              onChange={(e) =>
                setSignupValues({
                  ...signupValues,
                  checkedTerms: e.target.checked,
                })
              }
            />
          }
          label="I accept the terms and conditions."
        />
        <FormHelperText error>{Errors.general}</FormHelperText>
        <Button type="submit" variant="contained" color="primary">
          Sign up
        </Button>
      </form>
    </>
  );
};

export default Signup;
