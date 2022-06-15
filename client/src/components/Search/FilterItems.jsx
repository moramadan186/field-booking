import { useState } from "react";
import { Box, Button, TextField, Paper } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

const FilterItems = ({ availableCulbs, showAvailable }) => {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  return (
    <Box className="filterItemsContainer">
      {showAvailable ? (
        <Paper
          elevation={2}
          sx={{
            width: "100%",
            p: 1,
            mb: 2,
            background: "#002d57",
            color: "#ffffff",
          }}
        >
          <h3 style={{ fontWeight: 400 }}>{availableCulbs} Available</h3>
        </Paper>
      ) : (
        ""
      )}
      <Paper elevation={3} sx={{ width: "100%" }}>
          <h3
            style={{
              marginBottom: "16px",
              background: "#002d57",
              color: "#ffffff",
              padding: "10px",
              fontWeight: 400,
            }}
          >
            Search Filter
          </h3>
          <Box sx={{ px: 2 }}>
            <Box className="filterDay" mb={2}>
              <h4>Choose a Day</h4>
              {/* <input type="date" name="filterDate" id="filterDate" /> */}
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
                    variant="filled"
                    size="small"
                  />
                )}
              />
            </Box>
            <Box className="filterTime">
              <h4>Choose a Time</h4>
              {/* <input type="time" name="filterTime" id="filterTime" /> */}
              <TimePicker
                variant="contained"
                value={time}
                onChange={(newValue) => {
                  setTime(newValue);
                }}
                renderInput={(params) => (
                  <TextField {...params} variant="filled" size="small" />
                )}
              />
            </Box>
            <Box textAlign="center" mt={2}>
              <Button
                sx={{
                  width: "70%",
                  backgroundColor: "#24DC89",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "#038548",
                  },
                  mb: 2,
                }}
              >
                Search
              </Button>
            </Box>
          </Box>
      </Paper>
    </Box>
  );
};

export default FilterItems;
