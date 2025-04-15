import { useQuery } from "@tanstack/react-query";
import { IoSearchOutline } from "react-icons/io5";
import { getClassCategory, getClassDist, GetSearchClass } from "./Api";
import { useEffect, useState } from "react";
import { capitalize } from "../../utils/constansts";

const ClassSearchBar = ({
  setQuery,
  query,
  setSearchClassData,
  setIsLoading,
}) => {
  const [classCategoryValue, setClassCategoryValue] = useState("");
  const [classDistValue, setClassDistValue] = useState("");
  const [classSearchParams, setClassSearchParams] = useState({
    searchKey: "",
    category: "",
    type: "class",
    dist: "",
  });

  const { data: ClassCategory } = useQuery({
    queryKey: ["class-category"],
    queryFn: getClassCategory,
    refetchOnWindowFocus: false,
  });

  const { data: ClassDist } = useQuery({
    queryKey: ["class-district"],
    queryFn: getClassDist,
    refetchOnWindowFocus: false,
  });

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["classes", classSearchParams],
    queryFn: () => GetSearchClass(classSearchParams),
    enabled: classSearchParams?.type ? true : false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: false,
  });

  useEffect(() => {
    handleClassSearch();
  }, []);

  useEffect(() => {
    if (data?.data) {
      setSearchClassData(data.data);
      setIsLoading(false);
    }
  }, [data]);

  useEffect(() => {
    setIsLoading(isPending);
  }, [isPending]);

    useEffect(() => {
      if (isError) {
        setSearchClassData([]);
      }
    }, [isError]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      handleClassSearch();
    }, 1500);
    return () => {
      clearTimeout(timeout);
    };
  }, [classSearchParams, query]);

  const handleClassSearch = () => {
    setClassSearchParams((prev) => {
      const newParams = {
        searchKey: query,
        category: classCategoryValue,
        type: "class",
        dist: classDistValue,
      };
      return newParams;
    });
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setQuery(inputValue);
    setIsLoading(true);
  };

  return (
    <>
      <div className="w-full sticky top-16 z-20 bg-white">
        <div className="w-full max-w-6xl mx-auto px-4 py-3">
          {/* Desktop Layout */}
          <div className="hidden md:flex w-full bg-white border border-gray-200 rounded-full shadow-sm overflow-hidden">
            <input
              type="text"
              className="px-6 py-3 w-full text-gray-700 placeholder-gray-400 focus:outline-none"
              placeholder="Search Class"
              value={query}
              onChange={handleInputChange}
            />

            <select
              className="px-4 py-3 text-gray-700 border-l border-gray-200 bg-white cursor-pointer focus:outline-none"
              onChange={(e) => setClassDistValue(e.target.value)}
            >
              <option value="">District</option>
              {ClassDist?.data.map((district) => (
                <option key={district} value={district}>
                  {capitalize(district)}
                </option>
              ))}
            </select>

            <select
              className="px-4 py-3 text-gray-700 border-l cursor-pointer border-gray-200 bg-white focus:outline-none"
              onChange={(e) => setClassCategoryValue(e.target.value)}
            >
              <option value="">Category</option>
              {ClassCategory?.categories?.map((cate) => (
                <option key={cate.category} value={cate.category}>
                  {capitalize(cate.category)}
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
              placeholder="Search Class"
              value={query}
              onChange={handleInputChange}
            />

            <select
              className="px-4 py-3 w-full border border-gray-300 rounded-lg text-gray-700 bg-white focus:outline-none"
              onChange={(e) => setClassDistValue(e.target.value)}
            >
              <option value="">District</option>
              {ClassDist?.data.map((district) => (
                <option key={district} value={district}>
                  {capitalize(district)}
                </option>
              ))}
            </select>

            <select
              className="px-4 py-3 w-full border border-gray-300 rounded-lg text-gray-700 bg-white focus:outline-none"
              onChange={(e) => setClassCategoryValue(e.target.value)}
            >
              <option value="">Category</option>
              {ClassCategory?.categories?.map((cate) => (
                <option key={cate.category} value={cate.category}>
                  {capitalize(cate.category)}
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

export default ClassSearchBar;