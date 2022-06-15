import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

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
        backgroundColor: "#00e485",
        border: "1px solid #a4a4a4",
        transition: "background 1s ease-in-out",
      }}
    />
  );
};
const TimeItem = ({ time, status }) => {
  return (
    <FormControlLabel
      value="start"
      control={
        <Checkbox
          {...label}
          icon={<EmptyIcon />}
          checkedIcon={<FilledIcon />}
          TouchRippleProps={{
            style: {
              marginTop: "8px",
              height: "75%",
              overflow: "hidden",
              borderRadius: "0",
            },
          }}
          sx={{
            "& .MuiSvgIcon-root": {},
            "& .Mui-checked": {},
            "&.Mui-disabled .MuiButton-root": {
              backgroundColor: "#ffffff",
            },
          }}
        />
      }
      label="Start"
      labelPlacement="start"
    />
  );
};
const ClubImages = ({ clubImgs }) => {
  return (
    <ImageList
      sx={{ width: "100%", height: 500, borderRadius: "20px" }}
      variant="quilted"
      cols={4}
      rows={4}
      rowHeight={121}
    >
      {clubImgs.map((item) => (
        <ImageListItem
          key={item.img}
          cols={item.cols || 1}
          rows={item.rows || 1}
        >
          <img src={item.img} alt={item.title} loading="lazy" />
        </ImageListItem>
      ))}
    </ImageList>
  );
};

const ClubProfile = () => {
  let { clubId } = useParams();
  useEffect(() => {
    console.log(clubId);
  }, []);

  const route = "/search/:clubId";
  const [club, setClub] = useState({
    clubName: "old traford stadium",
    clubImages: [
      "https://hireapitch.com/PitchImages/cf4531f9-a3db-43bb-9e16-8dffffa6ae5d.jpg",
      "https://hireapitch.com/PitchImages/b15fcd09-41f5-41cc-a4be-c2cdaf2049e9.jpeg",
      "https://hireapitch.com/PitchImages/b15fcd09-41f5-41cc-a4be-c2cdaf2049e9.jpeg",
      "https://images.afootballreport.com/afr/blog/football-pitch.jpg",
      "https://hireapitch.com/PitchImages/b15fcd09-41f5-41cc-a4be-c2cdaf2049e9.jpeg",
    ],
    clubLocation: "London",
    clubDescription:
      "lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
    clubTimeWorkFrom: "9:00 AM",
    clubTimeWorkTo: "3:00 AM",
    clubPrice: 100,
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
  });
  let clubImgs = [];
  for (let i = 0; i < 4; i++) {
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
  console.log(clubImgs);
  return (
    <Box sx={{ pt: "80px" }}>
      <ClubImages clubImgs={clubImgs} />
    </Box>
  );
};

export default ClubProfile;
