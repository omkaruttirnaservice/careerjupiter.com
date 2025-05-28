import { useState, useEffect } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "../../utils/constansts";

// API कॉल्स
const getUniversityCategory = async () => {
  const response = await axios.get(`${BASE_URL}/api/university/search/Allcat`);
  return response.data;
};

const getUniversityDist = async () => {
  const response = await axios.get(`${BASE_URL}/api/university/search/Dist`);
  return response.data;
};

// सर्च API
const searchUniversity = async (params = {}) => {
  const response = await axios.get(`${BASE_URL}/api/search/university`, {
    params: {
      ...params,
      type: "university",
    },
  });
  return response.data?.results || [];
};

const UniversitySearchBar = ({ onSearchResults, setIsLoading }) => {
  const [searchKey, setSearchKey] = useState("");
  const [universityDistValue, setUniversityDistValue] = useState("");
  const [universityCategoryValue, setUniversityCategoryValue] = useState("");

  const { data: categoryData } = useQuery({
    queryKey: ["university-category"],
    queryFn: getUniversityCategory,
    refetchOnWindowFocus: false,
  });

  const { data: districtData } = useQuery({
    queryKey: ["university-district"],
    queryFn: getUniversityDist,
    refetchOnWindowFocus: false,
  });

  // सर्च फंक्शन
  const performSearch = async () => {
    setIsLoading(true);

    const params = {
      searchKey: searchKey.trim(),
      district: universityDistValue,
      category: universityCategoryValue,
    };

    try {
      const results = await searchUniversity(params);
      onSearchResults(results);
    } catch (err) {
      console.error("Search failed", err);
    } finally {
      setIsLoading(false);
    }
  };

  // सर्च लोड होण्यावर
  useEffect(() => {
    performSearch();
  }, [searchKey, universityDistValue, universityCategoryValue]);

  return (
    <div className="w-full max-w-5xl mt-18 justify-center p-6 mx-auto">
      <div className="hidden md:flex w-full border-2 border-gray-400 bg-white rounded-full overflow-hidden mx-auto">
        <input
          type="text"
          className="px-4 py-3 w-full focus:outline-none"
          placeholder="Search University"
          value={searchKey}
          onChange={(e) => setSearchKey(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && performSearch()}
        />

        <select
          className="px-4 py-3 border-l border-gray-300 cursor-pointer"
          value={universityDistValue}
          onChange={(e) => setUniversityDistValue(e.target.value)}
        >
          <option value="">All Districts</option>
          {districtData?.data?.map((district) => (
            <option key={district} value={district}>
              {district}
            </option>
          ))}
        </select>

        <select
          className="px-4 py-3 border-l border-gray-300 cursor-pointer"
          value={universityCategoryValue}
          onChange={(e) => setUniversityCategoryValue(e.target.value)}
        >
          <option value="">All Categories</option>
          {categoryData?.data?.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <button
          className="rounded-r-full px-6 py-3 bg-blue-500 text-white hover:bg-blue-600 focus:outline-none"
          onClick={performSearch}
        >
          <IoSearchOutline className="text-2xl" />
        </button>
      </div>
    </div>
  );
};

export default UniversitySearchBar;
