// import { Popover, Transition } from "@headlessui/react";
// import { MenuIcon, XIcon } from "@heroicons/react/outline";
// import { Fragment } from "react";
// import { NavLink } from "react-router-dom";
// import { useSearchContext } from "../store/SearchContext";
// import { navigation } from "../Constant/constantData";

// const Nav = () => {
//   const { setTagName, setQuery, setIsLoading } = useSearchContext();

//   return (
//     <>
//       <div
//         id="navBar"
//         className="p-2 bg-gray-50 fixed top-0 left-0 w-full shadow-md z-50"
//       >
//         <Popover>
//           <div className="max-w-7xl mx-auto px-4 sm:px-6">
//             <nav
//               className="relative flex items-center justify-between sm:h-10 md:justify-center"
//               aria-label="Global"
//             >
//               <div className="hidden md:absolute md:flex md:items-center md:justify-end md:inset-y-0 md:left-0">
//                 <span className="">
//                   <b>CAREER NITI </b>
//                 </span>
//               </div>
//               <div className="flex items-center flex-1 md:absolute md:inset-y-0 md:left-0">
//                 <div className="flex items-center justify-between w-full md:w-auto">
//                   <a href="#">
//                     <span className="sr-only">Workflow</span>
//                     <img
//                       className="h-8 w-auto sm:h-10"
//                       src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
//                       alt=""
//                     />
//                   </a>
//                   <div className="-mr-2 flex items-center md:hidden">
//                     <Popover.Button className="bg-gray-50 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
//                       <span className="sr-only">Open main menu</span>
//                       <MenuIcon className="h-6 w-6" aria-hidden="true" />
//                     </Popover.Button>
//                   </div>
//                 </div>
//               </div>
//               <div className="hidden md:flex md:space-x-10">
//                 {navigation.map((item) => (
//                   <NavLink
//                     key={item.name}
//                     to={item.href}
//                     onClick={() => {
//                       setTagName("All");
//                       setQuery("");
//                       setIsLoading(true);
//                     }}
//                     className={({ isActive }) =>
//                       `font-medium hover:text-gray-900 ${
//                         isActive
//                           ? "text-blue-600 font-semibold"
//                           : "text-gray-500"
//                       }`
//                     }
//                   >
//                     {item.name}
//                   </NavLink>
//                 ))}
//               </div>
//               <div className="hidden gap-2 md:absolute md:flex md:items-center md:justify-end md:inset-y-0 md:right-0">
//                 <span className="inline-flex rounded-md shadow">
//                   <NavLink
//                     to="/login"
//                     className="inline-flex items-center px-4 py-2 border border-transparent hover:bg-green-400  text-base font-medium rounded-md text-white bg-indigo-600"
//                   >
//                     Log in
//                   </NavLink>
//                 </span>
//                 <span className="inline-flex rounded-md shadow">
//                   <NavLink
//                     to="../sign"
//                     className="inline-flex items-center px-4 py-2 border  border-indigo-600 text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50"
//                   >
//                     Sign Up
//                   </NavLink>
//                 </span>
//               </div>
//             </nav>
//           </div>

//           <Transition
//             as={Fragment}
//             enter="duration-150 ease-out"
//             enterFrom="opacity-0 scale-95"
//             enterTo="opacity-100 scale-100"
//             leave="duration-100 ease-in"
//             leaveFrom="opacity-100 scale-100"
//             leaveTo="opacity-0 scale-95"
//           >
//             <Popover.Panel
//               focus
//               className="absolute z-10 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
//             >
//               <div className="rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
//                 <div className="px-5 pt-4 flex items-center justify-between">
//                   <div>
//                     <img
//                       className="h-8 w-auto"
//                       src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
//                       alt=""
//                     />
//                   </div>
//                   <div className="-mr-2">
//                     <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
//                       <span className="sr-only">Close menu</span>
//                       <XIcon className="h-6 w-6" aria-hidden="true" />
//                     </Popover.Button>
//                   </div>
//                 </div>

//                 <div className="px-2 pt-2 pb-3">
//                   {navigation.map((item) => (
//                     <a
//                       key={item.name}
//                       href={item.href}
//                       className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
//                     >
//                       {item.name}
//                     </a>
//                   ))}
//                 </div>
//                 <a
//                   href="#"
//                   className="block w-full px-5 py-3 text-center font-medium text-indigo-600 bg-gray-50 hover:bg-gray-100"
//                 >
//                   Log in
//                 </a>
//               </div>
//             </Popover.Panel>
//           </Transition>
//         </Popover>
//       </div>
//     </>
//   );
// };

// export default Nav;

import { Popover, Transition, Menu } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import { Fragment, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSearchContext } from '../store/SearchContext';
import { navigation } from '../Constant/constantData';
import { useSelector } from 'react-redux';

const Nav = () => {
	const { isLoggedIn, userId } = useSelector((state) => state.auth);
	console.log(isLoggedIn, userId);

	const { setTagName, setQuery, setIsLoading } = useSearchContext();
	const profilePic =
		'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsEJHmI0MlIGvH9CYkbsLEWQ5_ee8Qtl5V-Q&s';

	const handleNavClick = () => {
		setTagName('All');
		setQuery('');
		setIsLoading(true);
	};

	return (
		<div className="p-2 bg-gray-50 fixed top-0 left-0 w-full shadow-md z-50">
			<Popover>
				{({ open }) => (
					<>
						<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
							<nav className="relative flex items-center justify-between h-12">
								{/* <div className="flex items-center">
									<b>CAREER NITI</b>
								</div> */}
								{/* <span className=" font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                    करियर निती
                  </span> */}

								<span className=" font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
									<b>CAREER NITI </b>
								</span>

								<div className="hidden md:flex md:space-x-8">
									{navigation.map((item) => (
										<NavLink
											key={item.name}
											to={item.href}
											onClick={handleNavClick}
											className={({ isActive }) =>
												`font-medium hover:text-gray-900 ${
													isActive
														? 'text-blue-600 font-semibold'
														: 'text-gray-500'
												}`
											}
										>
											{item.name}
										</NavLink>
									))}
								</div>

								<div className="hidden md:flex items-center gap-4">
									{isLoggedIn ? (
										<Menu as="div" className="relative">
											<Menu.Button className="flex items-center text-sm focus:outline-none">
												<img
													src={profilePic}
													alt="Profile"
													className="h-8 w-8 rounded-full"
												/>
											</Menu.Button>
											<Transition
												as={Fragment}
												enter="transition ease-out duration-100"
												enterFrom="transform opacity-0 scale-95"
												enterTo="transform opacity-100 scale-100"
												leave="transition ease-in duration-75"
												leaveFrom="transform opacity-100 scale-100"
												leaveTo="transform opacity-0 scale-95"
											>
												<Menu.Items className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
													<div className="p-2">
														<Menu.Item>
															{({ active }) => (
																<NavLink
																	to="/profile/personal-details"
																	className={`block px-4 py-2 text-sm ${active ? 'bg-gray-100' : ''}`}
																>
																	Profile
																</NavLink>
															)}
														</Menu.Item>
														<Menu.Item>
															{({ active }) => (
																<button
																	className={`block w-full text-left px-4 py-2 text-sm ${active ? 'bg-gray-100' : ''}`}
																>
																	Sign Out
																</button>
															)}
														</Menu.Item>
													</div>
												</Menu.Items>
											</Transition>
										</Menu>
									) : (
										<div className="flex gap-2">
											<NavLink
												to="/signin"
												className="px-4 py-2 border border-indigo-600 rounded-md text-indigo-600 hover:bg-gray-50"
											>
												Log in
											</NavLink>
											<NavLink
												to="/sign"
												className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
											>
												Sign Up
											</NavLink>
										</div>
									)}
								</div>

								<div className="md:hidden">
									<Popover.Button className="bg-gray-50 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none">
										<span className="sr-only">Open menu</span>
										{open ? (
											<XIcon className="h-6 w-6" aria-hidden="true" />
										) : (
											<MenuIcon className="h-6 w-6" aria-hidden="true" />
										)}
									</Popover.Button>
								</div>
							</nav>
						</div>

						<Transition
							as={Fragment}
							enter="duration-150 ease-out"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="duration-100 ease-in"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95"
						>
							<Popover.Panel className="absolute top-16 inset-x-0 p-2 transition transform origin-top-right md:hidden">
								<div className="rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 divide-y-2 divide-gray-50">
									<div className="px-5 pt-5 pb-6">
										<div className="flex flex-col space-y-4">
											{navigation.map((item) => (
												<NavLink
													key={item.name}
													to={item.href}
													onClick={handleNavClick}
													className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
												>
													{item.name}
												</NavLink>
											))}
										</div>
										{isLoggedIn && (
											<div className="mt-4 flex items-center gap-4">
												<img
													src={profilePic}
													alt="Profile"
													className="h-10 w-10 rounded-full"
												/>
												<NavLink
													to="/profile/personal-details"
													className="text-gray-700 hover:text-gray-900"
												>
													Profile
												</NavLink>
											</div>
										)}
									</div>
								</div>
							</Popover.Panel>
						</Transition>
					</>
				)}
			</Popover>
		</div>
	);
};

export default Nav;
