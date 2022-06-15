import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Stack from "@mui/material/Stack";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import axios from "axios";
import Typography from "@mui/material/Typography";
import { useAuth } from "../Auth/Auth";
const weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const fetchedClub = {
  clubName: "old traford stadium",
  clubId: 1,
  clubImages: [
    "https://hireapitch.com/PitchImages/cf4531f9-a3db-43bb-9e16-8dffffa6ae5d.jpg",
    "https://hireapitch.com/PitchImages/b15fcd09-41f5-41cc-a4be-c2cdaf2049e9.jpeg",
    "https://hireapitch.com/PitchImages/b15fcd09-41f5-41cc-a4be-c2cdaf2049e9.jpeg",
    "https://images.afootballreport.com/afr/blog/football-pitch.jpg",
    "https://hireapitch.com/PitchImages/b15fcd09-41f5-41cc-a4be-c2cdaf2049e9.jpeg",
  ],
  clubLocation: "London",
  clubDescription:
    "lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
  clubTimeWorkFrom: "9:00 AM",
  clubTimeWorkTo: "3:00 AM",
  clubPrice: 100,
  aside: "5 Aside",
  surface: "Grass",
  times: {
    "09:00 AM": "available",
    "10:00 AM": "busy",
    "11:00 AM": "available",
    "12:00 PM": "available",
    "01:00 PM": "available",
    "02:00 PM": "busy",
    "03:00 PM": "available",
    "04:00 PM": "available",
    "05:00 PM": "busy",
    "06:00 PM": "available",
    "07:00 PM": "available",
    "08:00 PM": "busy",
    "09:00 PM": "available",
    "10:00 PM": "busy",
    "11:00 PM": "available",
    "12:00 AM": "available",
    "01:00 AM": "available",
    "02:00 AM": "busy",
    "03:00 AM": "available",
  },
};

const label = { inputProps: { "aria-label": "Checkbox demo" } };
const EmptyIcon = () => {
  return (
    <Button
      sx={{
        width: "200px",
        height: "50px",
        backgroundColor: "#f5f5f5",
        border: "1px solid #a4a4a4",
        transition: "background 0.3s ease-in-out",
      }}
    />
  );
};
const FilledIcon = () => {
  return (
    <Button
      sx={{
        width: "200px",
        height: "50px",

        backgroundColor: "#24DC89",
        border: "1px solid #a4a4a4",
      }}
    />
  );
};
const TimeItem = ({ date, time, status, handlecheckedTimes }) => {
  return (
    <Box sx={{ flexBasis: "50%" }}>
      <FormControlLabel
        sx={{
          transition: "background 4s linear",
          "& .MuiFormControlLabel-label": {
            width: "100px",
          },
          "& .Mui-checked .MuiFormControlLabel-label": { color: "#24DC89" },
        }}
        value={time}
        control={
          <Checkbox
            name={time}
            value={date}
            onChange={handlecheckedTimes}
            {...label}
            disabled={status === "busy" ? true : false}
            icon={<EmptyIcon />}
            checkedIcon={<FilledIcon />}
            TouchRippleProps={{
              center: false,
              style: {
                margin: "8px 0px 0px 10px",
                width: "91%",
                height: "75%",
                overflow: "hidden",
                borderRadius: "0",
                color: "#24DC89",
              },
            }}
            sx={{
              "& .MuiSvgIcon-root": {},
              "& .Mui-checked": {},
              "& .MuiButton-root": {
                transition: "all 4s ease-in-out",
              },
              "&.Mui-disabled .MuiButton-root": {
                backgroundColor: "#ffffff",
                border: "1px solid #d8d8d8",
              },
            }}
          />
        }
        label={time}
        labelPlacement="start"
      />
    </Box>
  );
};
const ClubImages = ({ clubImgs }) => {
  return (
    <ImageList
      sx={{ width: "100%", borderRadius: "20px" }}
      variant="quilted"
      cols={4}
      rows={4}
      rowHeight={130}
    >
      {clubImgs.map((item, index) => (
        <ImageListItem
          key={`IMG-${index}`}
          cols={item.cols || 1}
          rows={item.rows || 1}
        >
          <img src={item.img} alt={item.title} loading="lazy" />
        </ImageListItem>
      ))}
    </ImageList>
  );
};

const SeletedItem = ({ item }) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "50px",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        background: "#24DC89",
        py: 2,
        px: 5,
        mb: 2,
        borderRadius: "20px",
      }}
    >
      <Box sx={{ color: "#fff", fontWeight: 400 }}>{item.date}</Box>
      <Box
        sx={{
          bgcolor: "#fff",
          padding: "3px 15px",
          borderRadius: "10px",
          whiteSpace: "nowrap",
        }}
      >
        {item.time}
      </Box>
    </Box>
  );
};
const ClubProfile = () => {
  const [club, setClub] = useState(fetchedClub);
  const [dateChanged, setDateChanged] = useState(new Date());
  const formatedDate = dateChanged.toLocaleDateString();
  const [checkedItems, setCheckedItems] = useState([]);
  const { clubId } = useParams();
  const navigate = useNavigate();
  const user = useAuth().user;
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`http://localhost:8080/club/${clubId}`);
      if (response.status === 200) {
        console.log(response.data);
        setClub(response.data);
      }
    };
    fetchData();
  }, []);

  const clubImgsLen = club.clubImages.length > 4 ? 4 : club.clubImages.length;
  let clubImgs = [];
  for (let i = 0; i < clubImgsLen; i++) {
    clubImgs[i] = {
      img: club.clubImages[i],
      title: club.clubName,
      rows: 2,
      cols: "auto",
    };
  }
  clubImgs[0].cols = 2;
  clubImgs[1].cols = 2;
  clubImgs[2].cols = 3;
  clubImgs[3].cols = 1;

  const handleDateChange = async (newValue) => {
    setDateChanged(newValue);
    // send get request to server to get the time slots
    const response = await axios.get(
      `http://localhost:8080/club/${clubId}/${newValue.toLocaleDateString()}`
    );
    if (response.status === 200) {
      console.log(response);
      setClub({ ...club, times: response.data });
    }
  };

  const handlecheckedTimes = (event) => {
    const found = checkedItems.some((el) => el.time === event.target.name);
    if (event.target.checked) {
      if (!found) {
        setCheckedItems([
          ...checkedItems,
          {
            date: event.target.value,
            time: event.target.name,
            price: 100,
          },
        ]);
      }
    } else
      setCheckedItems(
        checkedItems.filter((el) => el.time !== event.target.name)
      );
  };

  const handleAddCartItems = async (event) => {
    event.preventDefault();
    const response = await axios.post(`http://localhost:8080/addClub`, {
      userId: user.userId,
      clubId,
      ...checkedItems,
    });
    if (response.status === 200) {
      navigate("/acount/cart");
    }
  };

  return (
    <Box
      sx={{
        p: "80px 30px",
        display: "flex",
        justifyContent: { xs: "center", sm: "flex-start" },
        flexWrap: { xs: "wrap", sm: "nowrap" },
      }}
    >
      <Box sx={{ flexBasis: { xs: "100%", sm: "75%" } }}>
        <ClubImages clubImgs={clubImgs} />
        <Stack
          direction="row"
          justifyContent="space-around"
          pt={2}
          fontSize={18}
          fontWeight={400}
          color="#0d0d0dc5"
        >
          <Box>{club.clubName}</Box>
          <Box>{club.aside}</Box>
          <Box>{club.surface}</Box>
        </Stack>
        <Box
          sx={{
            margin: "50px 15px",
            p: 2,
            border: "1px solid #c5c5c5",
            display: "flex",
            alignItems: "center",
            lineHeight: "1.7",
          }}
        >
          <Box sx={{ mr: 2, fontSize: "30px" }}>
            <DescriptionRoundedIcon
              sx={{ fontSize: "40px", color: "#7a7a7a" }}
            />
          </Box>
          {club.clubDescription}
        </Box>
        <Box>
          <Box
            className="daySelection"
            sx={{
              mb: 7,
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <Box>
              <DatePicker
                label="select another DAY"
                disablePast
                views={["day"]}
                value={dateChanged}
                onChange={(newValue) => {
                  handleDateChange(newValue);
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
            </Box>
            <Box>{weekday[dateChanged.getDay()]}</Box>
          </Box>
          <Box className="timeSelection" sx={{ textAlign: "center" }}>
            <Box
              sx={{
                mb: 3,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "20px",
              }}
            >
              <AccessTimeIcon
                sx={{ mr: 3, fontSize: "25px", color: "#7a7a7a" }}
              />
              Choose Time
            </Box>
            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
              {Object.keys(club.times).map((item, i) => (
                <TimeItem
                  date={formatedDate}
                  time={item}
                  status={club.times[item]}
                  key={item}
                  handlecheckedTimes={handlecheckedTimes}
                />
              ))}
            </Box>
          </Box>
        </Box>
      </Box>

      <Box
        className="selectedItems"
        sx={{
          position: { xs: "static", sm: "fixed" },
          right: 0,
          width: { xs: "100%", sm: "25%" },
          height: "100%",
          padding: "25px",
          flexBasis: { xs: "100%", sm: "25%" },
          backgroundColor: "#f4f4f4",
          borderLeft: "1px solid #c5c5c5",
          overflow: "auto",
        }}
      >
        <Typography variant="h5" sx={{ mb: 5 }}>
          Selected Times
        </Typography>
        <Typography variant="h6" gutterBottom>
          Subtotal: ${checkedItems.length * 90}
        </Typography>
        <Box textAlign="center">
          <Button
            variant="contained"
            sx={{ color: "#fff", mb: 3, mt: 2 }}
            onClick={handleAddCartItems}
          >
            Add to cart
          </Button>
        </Box>
        <Box>
          {checkedItems.map((item, i) => (
            <SeletedItem item={item} key={i} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default ClubProfile;
