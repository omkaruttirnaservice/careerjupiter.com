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
	console.log(pathname, '--pathname');

	const [searchParams, setSearchParams] = useState({
		searchKey: '',
		category: '',
		type: '',
	});

	const getPathType = () => {
		const pathParts = pathname.split('/');
		return pathParts.length > 2 ? pathParts[1] : pathname.slice(1);
	};

	const { data, isPending, isError, error } = useQuery({
		queryKey: ['colleges', searchParams],
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
		<div className="w-full flex flex-col md:flex-row items-center justify-between mt-8 md:mt-16 bg-green-200 p-4">
			{/* Search Bar */}
			<div className="w-full md:max-w-lg lg:max-w-xl xl:max-w-3xl">
				<div className="flex border-2 border-gray-400 rounded-full overflow-hidden w-full mx-auto md:ml-8">
					<input
						type="text"
						className="px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-600"
						placeholder="Search..."
						value={query}
						onChange={handleInputChange}
					/>
					<button className="px-5 py-3 bg-blue-500 text-white hover:bg-blue-600 hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500">
						<IoSearchOutline className="text-xl" />
					</button>
				</div>
				<div className="pt-2 pb-2 sm:pt-4 sm:pb-4 md:pt-6 md:pb-6">
					<main className="mx-auto max-w-7xl px-4">
						<div className="text-center">
							<div className="flex flex-row justify-center gap-2 sm:gap-4 md:gap-5 text-lg sm:text-3xl md:text-4xl font-bold">
								<h1 className="text-gray-900 font-extrabold text-base sm:text-xl md:text-3xl">
									FIND YOUR
								</h1>
								<span className="font-extrabold text-transparent bg-clip-text animated-gradient text-base sm:text-xl md:text-3xl">
									<Typewriter
										options={{
											strings: ['Best College', 'Best School', 'Best Class'],
											autoStart: true,
											loop: true,
										}}
									/>
								</span>
							</div>
							<p className="mt-1 sm:mt-2 max-w-xs sm:max-w-md md:max-w-3xl mx-auto text-sm sm:text-lg md:text-xl font-bold text-blue-600">
								"EMPOWER YOUR FUTURE, UNLOCK YOUR POTENTIAL, AND BUILD THE
								CAREER OF YOUR DREAMS! ✨"
							</p>
						</div>
					</main>
				</div>
			</div>

			{/* Card on the right */}
			<div className="flex items-center justify-center p-4 mt-4 md:mt-0">
				{/* Card */}
				<div className="bg-gradient-to-tr from-green-500/80 to-green-600 p-4 rounded-xl w-full md:w-96 max-w-sm">
					{/* Header */}
					<div className="flex items-center mb-3 space-x-3">
						<FaBrain className="text-4xl text-white" />
						<h2 className="text-3xl font-bold text-white">𝓘𝓠 𝓣𝓮𝓼𝓽</h2>
					</div>
					<p className="text-gray-100 font-bold mb-6 leading-relaxed">
						Test your intelligence and problem-solving skills with this quick IQ
						test.
					</p>

					{/* Time and Button */}
					<div className="flex items-center justify-between">
						{/* Animated Button */}
						{/* <NavLink
							to="profile/test"
							className="text-white hover:text-green-800 flex flex-row gap-2 ml-auto"
						>
							<button className="bg-blue-500 shadow-lg w-full cursor-pointer text-white px-6 py-3 rounded-md text-md font-medium flex items-center space-x-2 transition-all duration-300 ease-in-out group">
								<span>Give Test</span>
								<IoArrowForwardOutline className="text-xl transition-transform duration-300 ease-in-out group-hover:translate-x-2" />
							</button>
						</NavLink> */}

						<NavLink
							to="profile/test"
							className="text-white flex-row gap-2 ml-auto animate-pulse hover:animate-none border-white border hover:border-green-700
							hover:bg-green-700 shadow-lg w-full cursor-pointer px-6 py-3 rounded-md text-md font-medium flex items-center text-xl space-x-2 transition-all duration-300 ease-in-out group justify-center"
						>
							<span>Give Test</span>
							<IoArrowForwardOutline className="text-xl transition-transform duration-300 ease-in-out group-hover:translate-x-2" />
						</NavLink>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SearchComponent;
