'use client';

import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { IoArrowForwardOutline, IoSearchOutline } from 'react-icons/io5';
import { NavLink, useLocation } from 'react-router-dom';
import { useSearchContext } from '../../store/SearchContext';
import { searchCollege } from './Api';
import { FaBrain } from 'react-icons/fa';
import Typewriter from 'typewriter-effect';

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
			const type = getPathType();
			const newParams = {
				searchKey: query,
				category: tagName,
				type,
			};
			return newParams;
		});
	};

	return (
		<div className="w-full flex flex-col items-center justify-center bg-blue-200 p-6 md:mt-16 mt-[60px]">
  {/* Search Bar */}
  <div className="w-full max-w-3xl">
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
  </div>

  {/* Text Section */}
  <div className="text-center mt-6">
    <div className="flex flex-row justify-center gap-3 text-2xl md:text-4xl font-bold">
      <h1 className="text-gray-900 font-extrabold">FIND YOUR</h1>
      <span className="font-extrabold text-transparent bg-clip-text animated-gradient">
        <Typewriter
          options={{
            strings: ['Best College', 'Best School', 'Best Class'],
            autoStart: true,
            loop: true,
          }}
        />
      </span>
    </div>
    <p className="mt-3 max-w-2xl mx-auto text-lg md:text-xl font-bold text-blue-600">
      "EMPOWER YOUR FUTURE, UNLOCK YOUR POTENTIAL, AND BUILD THE CAREER OF YOUR DREAMS! ✨"
    </p>
  </div>
</div>

	);
};

export default SearchComponent;
