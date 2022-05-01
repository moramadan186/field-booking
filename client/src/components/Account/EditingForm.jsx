import React, { useState } from "react";
import { FormControl, TextField, Stack, Button, Box } from "@mui/material";
const textFieldStyle = {
  flexGrow: "1",
  margin: "0 0 3px 0 ",
  "& .MuiInput-input": { paddingBottom: "1px" },
};

const EditingForm = () => {
  const [editingsValues, setEditingsValues] = useState({
    firstName: "Mohamed",
    lastName: "Ramadan",
    email: "mr01028760097@gmail.com",
    phone: "01028760097",
  });
  const handleChange = (fieldName) => (event) => {
    setEditingsValues({ ...editingsValues, [fieldName]: event.target.value });
  };
  const handleEditingSubmit = (e) => {
    e.preventDefault();
  };
  console.log(editingsValues);
  return (
    <>
      <h2 style={{ margin: "3rem 0 ", color: "#5a5a5a" }}>Settings</h2>
      <form onSubmit={handleEditingSubmit}>
        <FormControl fullWidth className="EditingFormControl">
          <Stack className="formControlStack">
            <label htmlFor="firstName" className="EditingFormLabel">
              First Name
            </label>
            <TextField
              variant="standard"
              sx={textFieldStyle}
              size="small"
              name="firstName"
              value={editingsValues.firstName}
              onChange={handleChange("firstName")}
            />
          </Stack>
        </FormControl>
        <FormControl fullWidth className="EditingFormControl">
          <Stack className="formControlStack">
            <label htmlFor="lastName" className="EditingFormLabel">
              Last Name
            </label>
            <TextField
              variant="standard"
              sx={textFieldStyle}
              size="small"
              name="lastName"
              value={editingsValues.lastName}
              onChange={handleChange("lastName")}
            />
          </Stack>
        </FormControl>
        <FormControl fullWidth className="EditingFormControl">
          <Stack className="formControlStack">
            <label htmlFor="email" className="EditingFormLabel">
              Email
            </label>
            <TextField
              variant="standard"
              sx={textFieldStyle}
              size="small"
              name="email"
              value={editingsValues.email}
              onChange={handleChange("email")}
              type="email"
            />
          </Stack>
        </FormControl>
        <FormControl fullWidth className="EditingFormControl">
          <Stack className="formControlStack">
            <label htmlFor="email" className="EditingFormLabel">
              Phone
            </label>
            <TextField
              variant="standard"
              sx={textFieldStyle}
              size="small"
              name="phone"
              value={editingsValues.phone}
              onChange={handleChange("phone")}
              type="tel"
            />
          </Stack>
        </FormControl>
        <Box display="flex" justifyContent="center" alignItems="center" mt={5}>
          <Button type="submit" variant="contained" size="medium">
            Save Changes
          </Button>
        </Box>
      </form>
    </>
  );
};

export default EditingForm;
