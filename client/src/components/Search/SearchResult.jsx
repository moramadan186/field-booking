import React, { useState, useEffect, useRef } from "react";
import SearchCard from "./SearchCard";
import { Box, Button } from "@mui/material";
import { PageContainer } from "./../../App";
import SearchFilterDrawer from "./SearchFilterDrawer";
import FilterItems from "./FilterItems";
import "./Search.scss";
const FilteredClubs = [
  { id: 1, name: "Old Trafold Stadium", price: 100, location: "Manshciter" },
  { id: 2, name: "Camp no Stadium", price: 120, location: "Barcelona" },
  { id: 3, name: "SanTiago Bernabio", price: 110, location: "Madriad" },
  { id: 4, name: "San Sero", price: 100, location: "Milan" },
  { id: 5, name: "Anfiled Stadium", price: 100, location: "Liverpool" },
  { id: 6, name: "San Sero", price: 100, location: "Milan" },
  { id: 7, name: "Stanford Bridage", price: 100, location: "London" },
  { id: 8, name: "San Sero", price: 100, location: "Milan" },
  { id: 9, name: "El Salam Stadium", price: 100, location: "Cairo" },
  { id: 10, name: "Borg El Arab", price: 100, location: "Alexanderia" },
  { id: 11, name: "San Sero", price: 100, location: "Milan" },
  { id: 12, name: "Borg El Arab", price: 100, location: "Alexanderia" },
  { id: 13, name: "Stanford Bridage", price: 100, location: "London" },
  { id: 14, name: "San Sero", price: 100, location: "Milan" },
  { id: 15, name: "El Etihad Stadium ", price: 120, location: "Manshciter" },
  { id: 16, name: "Borg El Arab", price: 100, location: "Alexanderia" },
  { id: 17, name: "Stanford Bridage", price: 100, location: "London" },
];
const clubsPerPage = 6;
let arrayForHoldingClubs = [];
const SearchResult = () => {
  const [clubsToShow, setClubsToShow] = useState([]);
  const ref = useRef(clubsPerPage);
  const loopWithSlice = (start, end) => {
    const slicedClubs = FilteredClubs.slice(start, end);
    arrayForHoldingClubs = arrayForHoldingClubs.concat(slicedClubs);
    setClubsToShow(arrayForHoldingClubs);
  };
  useEffect(() => {
    loopWithSlice(0, clubsPerPage);
  }, []);
  const handleShowMoreClubs = () => {
    loopWithSlice(ref.current, ref.current + clubsPerPage);
    ref.current += clubsPerPage;
  };

  return (
    <PageContainer>
      <Box className="searchFilterMob">
        <SearchFilterDrawer availableCulbs={32} />
      </Box>
      <Box className="searchResultContainer">
        <div className="searchFilterCont">
          <FilterItems showAvailable={true} availableCulbs={32} />
        </div>
        <div className="CardsLoadMore">
          <div className="SearchCardsCont">
            {clubsToShow.map(({ id, name, price, location }) => (
              <SearchCard
                name={name}
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
    </PageContainer>
  );
};

export default SearchResult;
