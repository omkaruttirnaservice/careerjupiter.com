import React, { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";

const SearchComponent = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    onSearch(query);
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
      </div>
    </div>
  );
};

export default SearchComponent;