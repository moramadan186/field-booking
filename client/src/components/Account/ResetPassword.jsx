import React, { useState } from "react";
import { FormControl, TextField, Button, Box } from "@mui/material";
const textFieldStyle = {};

const ResetPassword = () => {
  const [newPassValues, setNewPassValues] = useState({
    newPassword: "",
    confirmPassword: "",
  });
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
              type="password"
              size="small"
              sx={textFieldStyle}
              label="New Password "
              name="newPassword"
              value={newPassValues.newPassword}
              onChange={handleChange("newPassword")}
            />
          </FormControl>
          <FormControl fullWidth className="EditingFormControl">
            <TextField
              variant="filled"
              type="password"
              size="small"
              sx={textFieldStyle}
              label="Confirm Password"
              name="confirmPassword"
              value={newPassValues.confirmPassword}
              onChange={handleChange("confirmPassword")}
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
