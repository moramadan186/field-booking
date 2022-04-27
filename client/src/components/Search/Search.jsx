import React from "react";
import {
  Box,
  FormControl,
  Grid,
  TextField,
  Autocomplete,
  ButtonGroup,
  Button,
  Stack,
  Divider,
} from "@mui/material";


import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import "./Search.scss";
function Search() {
  const [value, setValue] = React.useState(new Date());
  const locations = ["Assiut", "Cairo", "Alex"];
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Grid container justifyContent="center" className="SearchCont" >
        <Box className="searchWrapper">
          <h1>Book a sports facility near you</h1>
          <Box>
            <form action="">
              {/* <FormControl> */}
              <Stack
                direction="row"
                className="searchGroup"
              >
                <Autocomplete
                  // popupIcon=''
                  openOnFocus={false}
                  freeSolo
                  forcePopupIcon={false}
                  noOptionsText="none"
                  disablePortal
                  id="combo-box-demo"
                  options={locations}
                  sx={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Search for your field "
                    />
                  )}
                />
                <DatePicker
                  
                  disablePast
                  views={["day"]}
                  value={value}
                  onChange={(newValue) => {
                    setValue(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField {...params} helperText={null} className="datePicker"/>
                  )}
                />
                <Button variant="contained" className="searchBtn">
                  Search
                </Button>
              </Stack>
              {/* </FormControl> */}
            </form>
          </Box>
        </Box>
      </Grid>
    </LocalizationProvider>
  );
}

export default Search;
