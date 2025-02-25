import React, { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import SearchSuggestions from "./SearchSuggestions";
import { useSearchContext } from "../../store/SearchContext";
import { useLocation } from "react-router-dom";
import { navigation } from "../../Constant/constantData";
import { useQuery } from "@tanstack/react-query";
import { searchCollege } from "./Api";

const SearchComponent = () => {
  const { tagName, query, setQuery, setCollegesData, setIsLoading } =
    useSearchContext();
  const { pathname } = useLocation();

  const [searchParams, setSearchParams] = useState({
    searchKey: "",
    category: "",
    type: "",
  });

  const [debouncedQuery, setDebouncedQuery] = useState("");

  // Debounce effect: Set debouncedQuery after delay
  // useEffect(() => {
  //   const handler = setTimeout(() => {
  //     setDebouncedQuery(query);
  //   }, 500); // Adjust delay time (500ms)

  //   return () => {
  //     clearTimeout(handler);
  //   };
  // }, [query]);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["colleges", searchParams],
    queryFn: () => searchCollege(searchParams),
    // enabled: !!debouncedQuery, // Only run when searchKey is not empty
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: false,
  });

  useEffect(() => {
    // call query here
    handleSearch();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      refetch();
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, [searchParams]);

  useEffect(() => {
    if (data?.data) {
      setCollegesData(data.data);
      setIsLoading(isLoading);
    }
  }, [data, setCollegesData, setIsLoading]);

  console.log("api-search-response------", data);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    handleSearch();
  };

  const handleSearch = () => {
    const _pathName = pathname.slice(1);

    setSearchParams({
      searchKey: query,
      category: tagName,
      type: _pathName,
    });
    console.log(_pathName);
    // setTimeout(() => {
    // setSearchParams({
    //   searchKey: query,
    //   category: tagName,
    //   type: _pathName,
    // });
    // console.log(searchParams);
    // refetch();
    // console.log(tagName);
    // }, 500);

    // switch (pathname) {
    //   case navigation[1].href:
    //     console.log("Api/college", { tagName }, { query }, { pathname });
    //     setSearchParams({
    //       searchKey: query,
    //       category: tagName,
    //       type: pathname.slice(1),
    //     });
    //     break;
    //   case navigation[2].href:
    //     console.log("Api/institute", { tagName }, { query }, { pathname });
    //     setSearchParams({
    //       searchKey: query,
    //       category: tagName,
    //       type: pathname.slice(1),
    //     });
    //     break;
    //   case navigation[3].href:
    //     console.log("Api/university", { tagName }, { query }, { pathname });
    //     setSearchParams({
    //       searchKey: query,
    //       category: tagName,
    //       type: pathname.slice(1),
    //     });
    //     break;
    // }
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
