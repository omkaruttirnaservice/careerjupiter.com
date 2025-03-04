import { createContext, useContext, useState } from "react";

const SearchContext = createContext();

export const useSearchContext = () => {
  return useContext(SearchContext);
};

const SearchContextProvider = ({ children }) => {
  const tags = ["All", "Diploma", "Engineering", "Pharmacy", "HSC"];

  const [tagName, setTagName] = useState("All");
  const [query, setQuery] = useState("");
  const [collegesData, setCollegesData] = useState([]);
  const [UniversityData, setUniversityData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [instituteData,setInstitutesData] = useState([]) 

  let value = {
    tags,
    tagName,
    setTagName,
    query,
    setQuery,
    collegesData,
    setCollegesData,
    isLoading,
    setIsLoading,
    errorMsg,
    setErrorMsg,
    UniversityData,
    setUniversityData,
    instituteData,
    setInstitutesData, 
  };

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};

export default SearchContextProvider;
