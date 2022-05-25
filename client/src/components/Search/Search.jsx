import React from "react";
import {
  Box,
  Grid,
  TextField,
  Autocomplete,
  Button,
  Stack,
} from "@mui/material";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Search.scss";

function Search() {
  const locations = ["Assiut", "Cairo", "Alex"];
  const [date, setDate] = React.useState(new Date());
  const [location, setLocation] = React.useState(locations[0]);
  const navigate = useNavigate();

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    // await axios.post("http://localhost:8080/search", { date, location });
    console.log({ date, location });
    navigate("/search");
  };

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
            <form onSubmit={handleSearchSubmit}>
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
                  value={location}
                  onChange={(event, newValue) => {
                    setLocation(newValue);
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
                  value={date}
                  onChange={(newValue) => {
                    setDate(newValue);
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
                <Button type="submit" variant="contained" className="searchBtn">
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
