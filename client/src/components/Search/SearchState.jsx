import { createContext, useContext, useState } from "react";

const SearchContext = createContext(null);
const SearchProvider = ({ children }) => {
  const [resultClubs, setResultClubs] = useState([]);

  const searchResponse = (results) => {
    setResultClubs(results);
  };

  return (
    <SearchContext.Provider value={{ resultClubs, searchResponse }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  return useContext(SearchContext);
};

export default SearchProvider;
