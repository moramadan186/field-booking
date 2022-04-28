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
  const locations = ["Assiut", "Cairo", "Alex"];
  const [dateValue, setDateValue] = React.useState(new Date());
  const [searchValue, setSearchValue] = React.useState(locations[0]);
  
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Grid
        container
        justifyContent="center"
        className="SearchCont"
        alignItems="center"
      >
        <Box className="searchWrapper">
          <h1>Book a sports facility near you</h1>
          <Box>
            <form action="">
              {/* <FormControl> */}
              <Stack direction="row" className="searchGroup">
                <Autocomplete
                  className="searchField"
                  openOnFocus={false}
                  freeSolo
                  forcePopupIcon={false}
                  disablePortal
                  id="searchField"
                  options={locations}
                  sx={{ width: 300 }}
                  value={searchValue}
                  onChange={(event, newValue) => {
                    setSearchValue(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      name="searchField"
                      placeholder="Search for your field "
                    />
                  )}
                />
                <DatePicker
                  disablePast
                  views={["day"]}
                  value={dateValue}
                  onChange={(newValue) => {
                    setDateValue(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      name="datePicker"
                      helperText={null}
                      className="datePicker"
                    />
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
