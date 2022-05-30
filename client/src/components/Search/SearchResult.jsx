import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import SearchCard from "./SearchCard";
import { Box, Button, Typography } from "@mui/material";
import { PageContainer } from "./../../App";
import SearchFilterDrawer from "./SearchFilterDrawer";
import FilterItems from "./FilterItems";
import "./Search.scss";
const suggestedClubs = [
  {
    id: 2,
    name: "Camp no Stadium",
    price: 120,
    location: "Barcelona",
    clubImg:
      "https://hireapitch.com/PitchImages/cf4531f9-a3db-43bb-9e16-8dffffa6ae5d.jpg",
  },
  {
    id: 6,
    name: "San Sero",
    price: 100,
    location: "Milan",
    clubImg:
      "https://res-1.cloudinary.com/gll/image/upload/c_fit,f_auto,h_657,w_657/v1574856354/production/0000/0/00/IMG_4622.jpg",
  },
  {
    id: 1,
    name: "Old Trafold Stadium",
    price: 100,
    location: "Manshciter",
    clubImg: "https://images.afootballreport.com/afr/blog/football-pitch.jpg",
  },
  {
    id: 7,
    name: "Stanford Bridage",
    price: 100,
    location: "London",
    clubImg:
      "https://hireapitch.com/PitchImages/b15fcd09-41f5-41cc-a4be-c2cdaf2049e9.jpeg",
  },
  {
    id: 3,
    name: "SanTiago Bernabio",
    price: 110,
    location: "Madriad",
    clubImg:
      "https://hireapitch.com/PitchImages/e09def0d-7a55-4904-94e0-e8e62a799ab0.jpg",
  },
  {
    id: 8,
    name: "San Sero",
    price: 100,
    location: "Milan",
    clubImg:
      "https://hireapitch.com/PitchImages/72509ca4-a324-44a5-9316-6b02e066bc42.jpg",
  },
  {
    id: 9,
    name: "El Salam Stadium",
    price: 100,
    location: "Cairo",
    clubImg:
      "https://i.ebayimg.com/00/s/NzY4WDEwMjQ=/z/zOoAAOSwuCpii2yc/$_1.JPG",
  },
  {
    id: 4,
    name: "San Sero",
    price: 100,
    location: "Milan",
    clubImg:
      "https://hireapitch.com/PitchImages/a180cce3-af7d-4a6b-8c39-ee425cf242c4.jpg",
  },
  {
    id: 10,
    name: "Borg El Arab",
    price: 100,
    location: "Alexanderia",
    clubImg:
      "https://assets.change.org/photos/7/kk/ue/xaKKuESiFfcrCsH-800x450-noPad.jpg",
  },
  {
    id: 11,
    name: "San Sero",
    price: 100,
    location: "Milan",
    clubImg:
      "https://5.imimg.com/data5/UF/VO/WA/SELLER-2751211/fifa-certified-artificial-football-grass-500x500.jpg",
  },
  {
    id: 12,
    name: "Borg El Arab",
    price: 100,
    location: "Alexanderia",
    clubImg:
      "https://www.thebluebook.com/inc/img/qp/1635183/sprinturf-llc-headquarters-lowry-sports-complex-park.jpg",
  },
  {
    id: 15,
    name: "El Etihad Stadium ",
    price: 120,
    location: "Manshciter",
    clubImg: "https://pbs.twimg.com/media/EQcFZ5gWkAAZJvT.jpg",
  },
  {
    id: 16,
    name: "Borg El Arab",
    price: 100,
    location: "Alexanderia",
    clubImg: "https://pbs.twimg.com/media/D7B_UNDXsAA1YFT.jpg",
  },
  {
    id: 17,
    name: "Stanford Bridage",
    price: 100,
    location: "London",
    clubImg: "https://pbs.twimg.com/media/FOcWV-fXIAA-fBb.jpg",
  },
  {
    id: 13,
    name: "Stanford Bridage",
    price: 100,
    location: "London",
    clubImg:
      "https://pstsport.com/wp-content/uploads/2017/02/Dragons-Den-Killorglin-Artificial-Grass-Pitch-1.jpg",
  },
  {
    id: 5,
    name: "Anfiled Stadium",
    price: 100,
    location: "Liverpool",
    clubImg:
      "https://trentparkfootball.co.uk/wp-content/uploads/2019/05/Ariel-view.png",
  },
  {
    id: 14,
    name: "San Sero",
    price: 100,
    location: "Milan",
    clubImg:
      "https://pstsport.com/wp-content/uploads/2017/02/Stella-Maris-FC-2.jpg",
  },
];
const clubsPerPage = 6;
let arrayForHoldingClubs = [];
const SearchResult = () => {
  const location = useLocation();
  const [resultClubs, setResultClubs] = useState(location.state.clubs);
  const [clubsToShow, setClubsToShow] = useState([]);
  const ref = useRef(clubsPerPage);
  const loopWithSlice = (start, end) => {
    const slicedClubs = resultClubs.slice(start, end);
    arrayForHoldingClubs = arrayForHoldingClubs.concat(slicedClubs);
    setClubsToShow(arrayForHoldingClubs);
  };
  useEffect(() => {
    arrayForHoldingClubs = [];
    loopWithSlice(0, clubsPerPage);
  }, []);
  const handleShowMoreClubs = () => {
    loopWithSlice(ref.current, ref.current + clubsPerPage);
    ref.current += clubsPerPage;
  };

  return (
    <PageContainer>
      {clubsToShow.length > 0 ? (
        <>
          <Box className="searchFilterMob">
            <SearchFilterDrawer availableCulbs={32} />
          </Box>
          <Box className="searchResultContainer">
            <div className="searchFilterCont">
              <FilterItems showAvailable={true} availableCulbs={32} />
            </div>
            <div className="CardsLoadMore">
              <div className="SearchCardsCont">
                {clubsToShow.map(({ id, name, price, location, clubImg }) => (
                  <SearchCard
                    name={name}
                    clubImg={clubImg}
                    price={price}
                    location={location}
                    key={id}
                  />
                ))}
              </div>
              <div className="loadMore">
                <Button className="loadMoreBtn" onClick={handleShowMoreClubs}>
                  Load More
                </Button>
              </div>
            </div>
          </Box>
        </>
      ) : (
        <Box className="noClubsAndSuggested searchResultContainer">
          <Box className="noClubs">
            <h2>No Clubs Found</h2>
          </Box>
          <hr />
          <Box className="suggestedClubs">
            <h3>Suggested Clubs</h3>
            <p>here you can find our most popular clubs </p>
            <Box className="suggestedClubsCont SearchCardsCont">
              {suggestedClubs.map(({ id, name, price, location, clubImg }) => (
                <SearchCard
                  name={name}
                  clubImg={clubImg}
                  price={price}
                  location={location}
                  key={id}
                />
              ))}
            </Box>
          </Box>
        </Box>
      )}
    </PageContainer>
  );
};
export default SearchResult;
