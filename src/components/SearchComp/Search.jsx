import React, { useContext, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import SearchSuggestions from "./SearchSuggestions";
import { useSearchContext } from "./SearchContext";
import { useLocation } from "react-router-dom";
import { navigation } from "../../Constant/constantData";

const SearchComponent = () => {
  const { tagName, query, setQuery } = useSearchContext();
  const { pathname } = useLocation();

  const suggestions = ["first", "second", "Third"];

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    switch (pathname) {
      case navigation[1].href:
        console.log("Api/college", { tagName }, { query }, { pathname });
        break;
      case navigation[2].href:
        console.log("Api/institute", { tagName }, { query }, { pathname });
        break;
      case navigation[3].href:
        console.log("Api/university", { tagName }, { query }, { pathname });
        break;
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="w-full bg-gray-50 flex items-center justify-center">
      <div className=" mt-25">
        <div className="flex border-2 border-gray-200 rounded-lg overflow-hidden">
          <input
            type="text"
            className="px-1 py-1 w-40 md:px-3 md:py-2 sm:w-60 md:w-120 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search..."
            value={query}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />
          <button
            className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleSearch}
            onClick={handleSearch}
          >
            <IoSearchOutline />
          </button>
        </div>
        <SearchSuggestions suggestions={suggestions} query={query} />
      </div>
    </div>
  );
};

export default SearchComponent;
