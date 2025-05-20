import { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { getCollegeCategory, getCollegeDist, GetSearchCollege } from "./Api";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { capitalize } from "../../utils/constansts";

const CollegeSearchBar = ({ setSearchCollegeData, setIsLoading }) => {

  const dynamicWords = ["college name...", "district...", "category..."];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);
  const [collegeCategoryValue, setCollegeCategoryValue] = useState("");
  const [collegeDistValue, setCollegeDistValue] = useState("");
  const [collegeQuery, setCollegeQuery] = useState("");

  useEffect(() => {
    const currentWord = dynamicWords[currentWordIndex];

    const type = () => {
      if (isDeleting) {
        setDisplayText((prev) => prev.slice(0, -1));
        setTypingSpeed(100);
      } else {
        setDisplayText((prev) => currentWord.slice(0, prev.length + 1));
        setTypingSpeed(150);
      }

      if (!isDeleting && displayText === currentWord) {
        setTimeout(() => setIsDeleting(true), 1000);
      }

      if (isDeleting && displayText === "") {
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % dynamicWords.length);
      }
    };

    const timer = setTimeout(type, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting]);

  const { data: collegeCategory } = useQuery({
    queryKey: ["college-category"],
    queryFn: getCollegeCategory,
    refetchOnWindowFocus: false,
  });
  

  const { data: collegeDist } = useQuery({
    queryKey: ["college-district"],
    queryFn: getCollegeDist,
    refetchOnWindowFocus: false,
  });

  const [collegeSearchParams, setCollegeSearchParams] = useState({
    searchKey: "",
    category: "",
    type: null,
    dist: "",
  });

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["colleges", collegeSearchParams],
    queryFn: () => GetSearchCollege(collegeSearchParams),
    enabled: collegeSearchParams?.type ? true : false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: false,
  });

  useEffect(() => {
    handleCollegeSearch();
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      handleCollegeSearch();
    }, 1500);
    return () => {
      clearTimeout(timeout);
    };
  }, [collegeSearchParams, collegeQuery]);

  useEffect(() => {
    if (data?.data) {
      setSearchCollegeData(data.data);
      setIsLoading(false);
    }
  }, [data]);

  useEffect(() => {
    setIsLoading(isPending);
  }, [isPending]);

  useEffect(() => {
    if (isError) {
      setSearchCollegeData([]);
    }
  }, [isError]);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setIsLoading(true);
    setCollegeQuery(inputValue);
  };

  const handleCollegeSearch = () => {
    setCollegeSearchParams((prev) => {
      const newParams = {
        searchKey: collegeQuery,
        category: collegeCategoryValue,
        type: "college",
        dist: collegeDistValue,
      };
      return newParams;
    });
  };

  return (
    <>
      <div className="w-full sticky top-16 z-20 bg-white">
        <div className="w-full max-w-6xl mx-auto px-4 py-3">
          {/* Desktop Layout */}
          <div className="hidden md:flex w-full bg-white border border-gray-300 rounded-full shadow-sm overflow-hidden">
            <input
              type="text"
              className="px-6 py-3 w-full text-gray-700 placeholder-gray-400 focus:outline-none"
              placeholder={`Search By ${displayText}`}
              value={collegeQuery}
              onChange={handleInputChange}
            />

            <select
              className="px-4 py-3 text-gray-700 border-l border-gray-200 bg-white focus:outline-none cursor-pointer"
              onChange={(e) => setCollegeDistValue(e.target.value)}
            >
              <option value="">District</option>
              {collegeDist?.data.map((district) => (
                <option key={district} value={district}>
                  {capitalize(district)}
                </option>
              ))}
            </select>

            <select
              className="px-4 py-3 text-gray-700 border-l border-gray-200 bg-white focus:outline-none cursor-pointer"
              onChange={(e) => setCollegeCategoryValue(e.target.value)}
            >
              <option value="">Category</option>
              {collegeCategory?.data?.map((category) => (
                <option key={category} value={category}>
                  {capitalize(category)}
                </option>
              ))}
            </select>

            <button className="bg-gradient-to-r from-purple-500 to-blue-500 px-6 py-3 text-white flex items-center justify-center hover:from-purple-600 hover:to-blue-600 transition-colors duration-200 rounded-r-full">
              <IoSearchOutline className="text-2xl" />
            </button>
          </div>

          {/* Mobile Layout */}
          <div className="flex flex-col space-y-3 md:hidden w-full mt-4">
            <input
              type="text"
              className="px-4 py-3 w-full border border-gray-300 rounded-lg bg-white text-gray-700 placeholder-gray-400 focus:outline-none"
              placeholder={`Search By ${displayText}`}
              value={collegeQuery}
              onChange={handleInputChange}
            />

            <select
              className="px-4 py-3 w-full border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none cursor-pointer"
              onChange={(e) => setCollegeDistValue(e.target.value)}
            >
              <option value="">District</option>
              {collegeDist?.data.map((district) => (
                <option key={district} value={district}>
                  {capitalize(district)}
                </option>
              ))}
            </select>

            <select
              className="px-4 py-3 w-full border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none cursor-pointer"
              onChange={(e) => setCollegeCategoryValue(e.target.value)}
            >
              <option value="">Category</option>
              {collegeCategory?.categories?.map((cate) => (
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

export default CollegeSearchBar;
