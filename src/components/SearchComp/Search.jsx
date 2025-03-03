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
    setErrorMsg,
  } = useSearchContext();
  const { pathname } = useLocation();

  const [searchParams, setSearchParams] = useState({
    searchKey: "",
    category: "",
    type: "",
  });

  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ["colleges", searchParams],
    queryFn: () => searchCollege(searchParams),
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
      //
      setCollegesData(data.data);
      setIsLoading(false);
    }
  }, [data]);

  useEffect(()=>{
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
        break;
      case navigation[3].href:
        console.log("Api/university", { tagName }, { query }, { pathname });
        setSearchParams({
          searchKey: query,
          category: tagName,
          type: pathname.slice(1),
        });
        console.log("Api/university data", );
        setUniversityData(data?.data);
        setIsLoading(false);
        break;
    }

  },[data]);

  useEffect(() => {
    setIsLoading(isPending);
  }, [isPending]);

  useEffect(() => {
    if (isError) {
      setCollegesData([]);
    }
  }, [isError]);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setQuery(inputValue);
  };

  const handleSearch = () => {
    setSearchParams((prev) => {
      const newParams = {
        searchKey: query,
        category: tagName,
        type: pathname.slice(1),
      };
      return newParams;
    });
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
          />
          <button className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500">
            <IoSearchOutline />
          </button>
        </div>
        {/* <SearchSuggestions
          suggestions={data?.data?.map((college) => college.collegeName) || []}
          query={query}
        /> */}
      </div>
    </div>
  );
};

export default SearchComponent;
