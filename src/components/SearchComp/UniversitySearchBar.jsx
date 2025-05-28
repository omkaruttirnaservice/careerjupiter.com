

import { useQuery } from "@tanstack/react-query";
import { IoSearchOutline } from "react-icons/io5";
import { getUniversityCategory, getUniversityDist, GetSearchUniversity } from "./Api";
import { useEffect, useState } from "react";
import { capitalize } from "../../utils/constansts";

const UniversitySearchBar = ({
  setQuery,
  query,
  setSearchUniversityData,
  setIsLoading,
}) => {
  const [universityCategoryValue, setUniversityCategoryValue] = useState("");
  const [universityDistValue, setUniversityDistValue] = useState("");
  const [universitySearchParams, setUniversitySearchParams] = useState({
    searchKey: "",
    category: "",
    type: "university",
    dist: "",
  });

  const { data: UniversityCategory } = useQuery({
    queryKey: ["university-category"],
    queryFn: getUniversityCategory,
    refetchOnWindowFocus: false,
  });

  const { data: UniversityDist } = useQuery({
    queryKey: ["university-district"],
    queryFn: getUniversityDist,
    refetchOnWindowFocus: false,
  });

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["universities", universitySearchParams],
    queryFn: () => GetSearchUniversity(universitySearchParams),
    enabled: universitySearchParams?.type ? true : false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: false,
  });

  console.log(universitySearchParams , 'query fin ')



  useEffect(() => {
    handleUniversitySearch();
  }, []);

  useEffect(() => {
    if (data?.data) {
      setSearchUniversityData(data.data);
      setIsLoading(false);
    }
  }, [data]);

  useEffect(() => {
    setIsLoading(isPending);
  }, [isPending]);

  useEffect(() => {
    if (isError) {
      setSearchUniversityData([]);
    }
  }, [isError]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      handleUniversitySearch();
    }, 1500);
    return () => {
      clearTimeout(timeout);
    };
  }, [universitySearchParams, query]);

  const handleUniversitySearch = () => {
    setUniversitySearchParams((prev) => {
      const newParams = {
        searchKey: query || "",
        category: universityCategoryValue,
        type: "university",
        dist: universityDistValue,
      };
      return newParams;
    });
  };

  

  const handleInputChange = (e) => {
  const inputValue = e.target.value;
  setQuery(inputValue);
  setIsLoading(true);
  
  // Clear previous timeout
  if (searchTimeout) clearTimeout(searchTimeout);
  
  // Set new timeout
  setSearchTimeout(setTimeout(() => {
    handleUniversitySearch();
  }, 500));
};

useEffect(() => {
  if (data) {
    setSearchUniversityData(data); // <- Wrong structure
    setIsLoading(false);
  }
}, [data]);

  return (
    <>
      <div className="w-full sticky top-16 z-20 bg-white">
        <div className="w-full max-w-6xl mx-auto px-4 py-3">
          {/* Desktop Layout */}
          <div className="hidden md:flex w-full bg-white border border-gray-200 rounded-full shadow-sm overflow-hidden">
            <input
              type="text"
              className="px-6 py-3 w-full text-gray-700 placeholder-gray-400 focus:outline-none"
              placeholder="Search University"
              value={query}
              onChange={handleInputChange}
            />

            <select
              className="px-4 py-3 text-gray-700 border-l border-gray-200 bg-white cursor-pointer focus:outline-none"
              onChange={(e) => setUniversityDistValue(e.target.value)}
            >
              <option value="">District</option>
              {UniversityDist?.data.map((district) => (
                <option key={district} value={district}>
                  {capitalize(district)}
                </option>
              ))}
            </select>

            <select
              className="px-4 py-3 text-gray-700 border-l cursor-pointer border-gray-200 bg-white focus:outline-none"
              onChange={(e) => setUniversityCategoryValue(e.target.value)}
            >
              <option value="">Category</option>
              {UniversityCategory?.data?.map((cate) => (
                <option key={cate} value={cate}>
                  {capitalize(cate)}
                </option>
              ))}
            </select>

            <button className="bg-gradient-to-r from-purple-500 to-blue-500 px-6 py-3 text-white flex items-center justify-center hover:from-purple-600 hover:to-blue-600 transition-colors duration-200">
              <IoSearchOutline className="text-2xl" />
            </button>
          </div>

          {/* Mobile Layout */}
          <div className="flex flex-col space-y-3 md:hidden w-full mt-4">
            <input
              type="text"
              className="px-4 py-3 w-full border bg-white border-gray-300 rounded-lg focus:outline-none text-gray-700 placeholder-gray-400"
              placeholder="Search University"
              value={query}
              onChange={handleInputChange}
            />

            <select
              className="px-4 py-3 w-full border border-gray-300 rounded-lg text-gray-700 bg-white focus:outline-none"
              onChange={(e) => setUniversityDistValue(e.target.value)}
            >
              <option value="">District</option>
              {UniversityDist?.data.map((district) => (
                <option key={district} value={district}>
                  {capitalize(district)}
                </option>
              ))}
            </select>

            <select
              className="px-4 py-3 w-full border border-gray-300 rounded-lg text-gray-700 bg-white focus:outline-none"
              onChange={(e) => setUniversityCategoryValue(e.target.value)}
            >
              <option value="">Category</option>
              {UniversityCategory?.data?.map((cate) => (
                <option key={cate} value={cate}>
                  {capitalize(cate)}
                </option>
              ))}
            </select>

            <button className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white flex items-center justify-center hover:from-purple-600 hover:to-blue-600 transition-colors duration-200">
              <IoSearchOutline className="text-2xl" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UniversitySearchBar;