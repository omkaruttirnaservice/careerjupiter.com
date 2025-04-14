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
    // enabled: false,
    enabled: classSearchParams?.type ? true : false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: false,
  });
  

    useEffect(() => {
      setIsLoading(isPending);
    }, [isPending]);

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
      <div className="w-full max-w-5xl sticky top-20 z-50 items-center mt-18 justify-center p-6 mx-auto">
        {/* For desktop: Original horizontal layout */}
        <div className="hidden md:flex w-full border-2 border-gray-400 bg-white rounded-full overflow-hidden sm:w-180 mx-auto">
          <input
            type="text"
            className="px-4 py-3 w-full focus:outline-none"
            placeholder={`Search Class`}
            value={query}
            onChange={handleInputChange}
          />

          <select
            className="px-4 py-3 border-l border-gray-300 cursor-pointer"
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
            className="px-4 py-3 border-l border-gray-300 cursor-pointer"
            onChange={(e) => setClassCategoryValue(e.target.value)}
          >
            <option value="">Category</option>
            {ClassCategory?.categories?.map((cate) => (
              <option key={cate.category} value={cate.category}>
                {capitalize(cate.category)}
              </option>
            ))}
          </select>

          <button className="rounded-r-full px-6 py-3 bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <IoSearchOutline className="text-2xl" />
          </button>
        </div>

        {/* For mobile/tablet: Stacked layout */}
        <div className="flex flex-col space-y-3 md:hidden w-full mx-auto">
          <div className="w-full bg-white rounded-lg border-2 border-gray-400">
            <input
              type="text"
              className="px-4 py-3 w-full focus:outline-none rounded-lg"
              placeholder={`Search Class`}
              // value={query}
              onChange={handleInputChange}
            />
          </div>

          <div className="w-full bg-white rounded-lg border-2 border-gray-400">
            <select className="px-4 py-3 w-full focus:outline-none rounded-lg cursor-pointer">
              <option value="">District</option>
              {ClassDist?.data.map((district) => (
                <option key={district} value={district}>
                  {capitalize(district)}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full bg-white rounded-lg border-2 border-gray-400">
            <select className="px-4 py-3 w-full focus:outline-none rounded-lg cursor-pointer">
              <option value="">Category</option>
              {ClassCategory?.categories?.map((cate) => (
                <option key={cate.category} value={cate.category}>
                  {capitalize(cate.category)}
                </option>
              ))}
            </select>
          </div>

          <button className="w-full rounded-lg px-6 py-3 bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <IoSearchOutline className="text-2xl mx-auto" />
          </button>
        </div>
      </div>
    </>
  );
};

export default ClassSearchBar;