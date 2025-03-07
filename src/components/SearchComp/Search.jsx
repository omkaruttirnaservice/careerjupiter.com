import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { useLocation } from "react-router-dom";
import { useSearchContext } from "../../store/SearchContext";
import { searchCollege } from "./Api";
import { navigation } from "../../Constant/constantData";

const SearchComponent = () => {
  const {
    tagName,
    query,
    setQuery,
    setCollegesData,
    setIsLoading,
    setUniversityData,
    setInstitutesData,
    setErrorMsg,
  } = useSearchContext();
  
  const { pathname } = useLocation();

  const [searchParams, setSearchParams] = useState({
    searchKey: "",
    category: "",
    type: "",
  });

  const getPathType = () => {
    const pathParts = pathname.split("/");
    return pathParts.length > 2 ? pathParts[1] : pathname.slice(1);
  };

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["colleges", searchParams],
    queryFn: () => searchCollege(searchParams),
    // enabled: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: false,
  });

  useEffect(() => {
    handleSearch();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      handleSearch();
    }, 1500);
    return () => {
      clearTimeout(timeout);
    };
  }, [searchParams, query]);

  useEffect(() => {
    if (data?.data) {
      setCollegesData(data.data);
      setIsLoading(false);
    }
  }, [data]);

  useEffect(() => {
    switch (pathname) {
      case navigation[1].href:
        setSearchParams({
          searchKey: query,
          category: tagName,
          type: pathname.slice(1),
        });
        break;
      case navigation[2].href:
        setSearchParams({
          searchKey: query,
          category: tagName,
          type: pathname.slice(1),
        });
        setInstitutesData(data?.data);
        break;

      case navigation[3].href:
        console.log("Api/university", { tagName }, { query }, { pathname });
        setSearchParams({
          searchKey: query,
          category: tagName,
          type: pathname.slice(1),
        });
        console.log("Api/university data");
        setUniversityData(data?.data);
        break;
    }
  }, [data]);

  useEffect(() => {
    setIsLoading(isPending);
  }, [isPending]);

  useEffect(() => {
    if (isError) {
      setErrorMsg(error);
      setCollegesData([]);
      setInstitutesData([]);
      setUniversityData([]);
    }
  }, [isError]);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setQuery(inputValue);
    setIsLoading(true);
  };

  const handleSearch = () => {
    setSearchParams((prev) => {
      const type = getPathType();
      const newParams = {
        searchKey: query,
        category: tagName,
        type
      };
      return newParams;
    });
  };

  return (
    <div className="w-full bg-gray-50 flex items-center justify-center ">
  <div className="mt-25 mb-8 w-full max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl mx-3 ">
    <div className="flex border-2 border-gray-200 rounded-full overflow-hidden w-full ">
      <input
        type="text"
        className="px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Search..."
        value={query}
        onChange={handleInputChange}
      />
      <button className="px-5 py-3 bg-blue-500 text-white hover:bg-blue-600 hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500">
        <IoSearchOutline className="text-xl" />
      </button>
    </div>
  </div>
</div>

  

  );
};

export default SearchComponent;
