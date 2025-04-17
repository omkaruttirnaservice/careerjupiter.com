import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { IoArrowForwardOutline, IoSearchOutline } from 'react-icons/io5';
import { NavLink, useLocation } from 'react-router-dom';
import { useSearchContext } from '../../store/SearchContext';
import { getCollegeCategory, getCollegeDist, searchCollege } from './Api';
import { FaBrain } from 'react-icons/fa';
import SloganHomePage from '../SloganHomePage';

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

	const districts = ["Nashik", "Pune", "Nagar"];

  // typeWritter effect code

 const dynamicWords = ["college name...", "district...", "category..."];
 const [currentWordIndex, setCurrentWordIndex] = useState(0);
 const [displayText, setDisplayText] = useState("");
 const [isDeleting, setIsDeleting] = useState(false);
 const [typingSpeed, setTypingSpeed] = useState(150);

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

     // Word is fully typed
     if (!isDeleting && displayText === currentWord) {
       setTimeout(() => setIsDeleting(true), 1000);
     }

     // Word is fully deleted
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

	const { pathname } = useLocation();
	// console.log(pathname, '--pathname');

	const [searchParams, setSearchParams] = useState({
		searchKey: '',
		category: '',
		type: null,
	});

	const getPathType = () => {
		const pathParts = pathname.split('/');
		return pathParts.length > 2 ? pathParts[1] : pathname.slice(1);
	};

	const { data, isPending, isError, error } = useQuery({
		queryKey: ['colleges', searchParams],
		queryFn: () => searchCollege(searchParams),
		// enabled: false,
		enabled: searchParams?.type ? true : false,
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
			case '/college':
				setSearchParams({
					searchKey: query,
					category: tagName,
					type: getPathType(),
				});
				break;
			case '/class':
				setSearchParams({
					searchKey: query,
					category: tagName,
					type: getPathType(),
				});
				setInstitutesData(data?.data);
				break;

			case '/university':
				console.log('Api/university', { tagName }, { query }, { pathname });
				setSearchParams({
					searchKey: query,
					category: tagName,
					type: getPathType(),
				});
				console.log('Api/university data');
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
			const val = getPathType();
			if (val !== "service-provider") {
				let type = val;
      		
			const newParams = {
				searchKey: query,
				category: tagName,
				type,
			};
			return newParams;
		}
		});
	};

	return (
    <>
      {/* Search Bar */}
      {/* <div className="w-full max-w-3xl">
    <div className="flex border-2 border-gray-400 bg-white rounded-full overflow-hidden w-full mx-auto">
      <input
        type="text"
        className="px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-600"
        placeholder="Search..."
        value={query}
        onChange={handleInputChange}
      />
      <button className="rounded-r-full px-6 py-3 bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
        <IoSearchOutline className="text-2xl" />
      </button>
    </div>
  </div> */}

      <div className="w-full max-w-5xl mt-20 items-center justify-center bg-blue-200 p-6 md:mt-16 ">
        <div className="w-full flex border-2 border-gray-400 bg-white rounded-full overflow-hidden sm:w-180 mx-auto">
          <input
            type="text"
            className="px-4 py-3 w-full focus:outline-none"
            placeholder={`Search By ${displayText}`}
            value={query}
            onChange={handleInputChange}
          />

          <select className="px-4 py-3 border-l border-gray-300 cursor-pointer">
            <option value="">District</option>
            {collegeDist?.data.map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </select>

          <select className="px-4 py-3 border-l border-gray-300 cursor-pointer">
            <option value="">Category</option>
            {collegeCategory?.categories?.map((cate) => (
              <option key={cate.category} value={cate.category}>
                {cate.category}
              </option>
            ))}
          </select>

          <button className="rounded-r-full px-6 py-3 bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <IoSearchOutline className="text-2xl" />
          </button>
        </div>
      </div>

      {/* Text Section */}
    </>
  );
};

export default SearchComponent;
