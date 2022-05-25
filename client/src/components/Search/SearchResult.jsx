import React from "react";
import SearchCard from "./SearchCard";
import { Box } from "@mui/material";
import { PageContainer } from "./../../App";
import SearchFilterDrawer from "./SearchFilterDrawer";
import FilterItems from "./FilterItems";
import "./Search.scss";
const FilteredClubs = [
  { id: 1, name: "Old Trafold Stadium", price: 100, location: "Manshciter" },
  { id: 2, name: "Camp no Stadium", price: 120, location: "Barcelona" },
  { id: 3, name: "SanTiago Bernabio", price: 110, location: "Madriad" },
  { id: 4, name: "Anfiled Stadium", price: 100, location: "Liverpool" },
  { id: 5, name: "San Sero", price: 100, location: "Milan" },
  { id: 6, name: "El Salam Stadium", price: 100, location: "Cairo" },
  { id: 7, name: "Borg El Arab", price: 100, location: "Alexanderia" },
  { id: 8, name: "El Etihad Stadium ", price: 120, location: "Manshciter" },
  { id: 9, name: "Stanford Bridage", price: 100, location: "London" },
];
const SearchResult = () => {
  return (
    <PageContainer>
      <Box className="searchFilterMob">
        <SearchFilterDrawer availableCulbs={32} />
      </Box>
      <Box className="searchResultContainer">
        <div className="searchFilterCont">
          <FilterItems showAvailable={true} availableCulbs={32} />
        </div>
        <div className="SearchCardsCont">
          {FilteredClubs.map(({ id, name, price, location }) => (
            <SearchCard
              name={name}
              price={price}
              location={location}
              key={id}
            />
          ))}
        </div>
      </Box>
    </PageContainer>
  );
};

export default SearchResult;
