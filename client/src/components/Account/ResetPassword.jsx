import { useState } from "react";
import { FormControl, TextField, Button, Box } from "@mui/material";
import { useAuth } from "../Auth/Auth";
import { VisibilityIcon } from "./../Login-Signup/Login";
const textFieldStyle = {};

const ResetPassword = () => {
  const user = useAuth().user;
  const [newPassValues, setNewPassValues] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [showOldPass, setShowOldPass] = useState(false);
  const handleChange = (fieldName) => (event) => {
    setNewPassValues({ ...newPassValues, [fieldName]: event.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <h2 style={{ margin: "3rem 0 ", color: "#5a5a5a" }}>Reset password</h2>
      <form onSubmit={handleSubmit}>
        <Box sx={{ width: { md: "75%" } }}>
          <FormControl fullWidth className="EditingFormControl">
            <TextField
              variant="filled"
              type={showOldPass ? "text" : "password"}
              size="small"
              sx={textFieldStyle}
              label="Old Password "
              name="oldPassword"
              value={user !== null ? user.password : ""}
              disabled
              InputProps={{
                endAdornment: (
                  <VisibilityIcon
                    password={showOldPass}
                    setPassword={setShowOldPass}
                  />
                ),
              }}
            />
          </FormControl>
          <FormControl fullWidth className="EditingFormControl">
            <TextField
              variant="filled"
              type={showNewPass ? "text" : "password"}
              size="small"
              sx={textFieldStyle}
              label="New Password "
              name="newPassword"
              value={newPassValues.newPassword}
              onChange={handleChange("newPassword")}
              InputProps={{
                endAdornment:
                  newPassValues.newPassword !== "" ? (
                    <VisibilityIcon
                      password={showNewPass}
                      setPassword={setShowNewPass}
                    />
                  ) : (
                    " "
                  ),
              }}
            />
          </FormControl>
          <FormControl fullWidth className="EditingFormControl">
            <TextField
              variant="filled"
              type={showConfirmPass ? "text" : "password"}
              size="small"
              sx={textFieldStyle}
              label="Confirm Password"
              name="confirmPassword"
              value={newPassValues.confirmPassword}
              onChange={handleChange("confirmPassword")}
              InputProps={{
                endAdornment:
                  newPassValues.confirmPassword !== "" ? (
                    <VisibilityIcon
                      password={showConfirmPass}
                      setPassword={setShowConfirmPass}
                    />
                  ) : (
                    " "
                  ),
              }}
            />
          </FormControl>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            mt={5}
          >
            <Button type="submit" variant="contained" size="medium">
              Change Password
            </Button>
          </Box>
        </Box>
      </form>
    </>
  );
};

export default ResetPassword;
