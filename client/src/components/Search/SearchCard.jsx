import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
// import cardImg from "./../../assets/club1.jpeg";
const cardContedStyle = {
  width: "100%",
  minHeight: "45%",
  position: "absolute",
  bottom: "0",
  color: "#fff",
  background: "linear-gradient(0deg, #000000bb 40%, rgba(255,255,255,0) 100%)",
};
const instantBookStyle = {
  borderRadius: "0",
  width: "100%",
  margin: "0",
  padding: "10px 0",
  backgroundColor: "#24DC89",
  color: "white",
  "&:hover": {
    backgroundColor: "#038548",
  },
};
const SearchCard = ({ name, price, location,clubImg }) => {
  return (
    <Card sx={{ width: 250, margin: "0 0.5rem 2rem",border:"1px solid #6e6e6e7e",borderRadius:"0px" }}>
      <CardActionArea sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          // src="https://source.unsplash.com/random"
          src={clubImg}
          // image={clubImg}
          alt="club image"
          sx={{ height: "270px" }}
        />
        <CardContent sx={cardContedStyle}>
          <Typography variant="h6" sx={{ fontWeight: "600", mb: 0.5 }}>
            {name}
          </Typography>
          <Typography variant="body2" sx={{ color: "#dedede", mb: 0.2 }}>
            price: {price} <small>L.E</small>
          </Typography>
          <Typography variant="body2" sx={{ color: "#dedede" }}>
            location: {location}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{ padding: "0" }}>
        <Button sx={instantBookStyle}>Book</Button>
      </CardActions>
    </Card>
  );
};

export default SearchCard;
