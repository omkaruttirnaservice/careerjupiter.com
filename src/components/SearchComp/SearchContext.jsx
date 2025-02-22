import { createContext, useContext, useState } from "react";

const SearchContext = createContext();

export const useSearchContext = () => {
  return useContext(SearchContext);
};

const SearchContextProvider = ({ children }) => {
  const tags = ["All", "Diploma", "Engineering", "Pharmacy", "HSC"];

  const [tagName, setTagName] = useState("All");

  const [query, setQuery] = useState("");

  let value = {
    tags,
    tagName,
    setTagName,
    query,
    setQuery,
  };

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};

export default SearchContextProvider;
