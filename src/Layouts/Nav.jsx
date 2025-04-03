import { Popover, Transition, Menu } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import { Fragment, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { navigation } from '../Constant/constantData';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';

const Nav = () => {
	const navigate = useNavigate();
	const { isLoggedIn } = useSelector((state) => state.auth);
	const [showConfirm, setShowConfirm] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const profilePic =
		'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsEJHmI0MlIGvH9CYkbsLEWQ5_ee8Qtl5V-Q&s';

	const handleSignOut = () => {
		Swal.fire({
			title: 'Are you sure?',
			text: 'You will be logged out of your account!',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#d33',
			cancelButtonColor: '#3085d6',
			confirmButtonText: 'Yes, Sign Out!',
		}).then((result) => {
			if (result.isConfirmed) {
				navigate('/signout');
			}
		});
	};

	const confirmSignOut = () => {
		setShowConfirm(true);
	};

	const handleScrollToSection = () => {
		const section = document.getElementById('check-eligibility-section');
		if (section) {
			const offset = 100;
			const sectionPosition =
				section.getBoundingClientRect().top + window.scrollY - offset;
			window.scrollTo({ top: sectionPosition, behavior: 'smooth' });
		}
	};

	const handleClick = (e, href) => {
		e.preventDefault();
		const targetElement = document.querySelector(href);
		if (targetElement) {
			const offset = 100;
			const targetPosition =
				targetElement.getBoundingClientRect().top + window.scrollY - offset;
			window.scrollTo({ top: targetPosition, behavior: 'smooth' });

			targetElement.classList.add('highlight');
			setTimeout(() => {
				targetElement.classList.remove('highlight');
			}, 1500);
		}
		setIsMobileMenuOpen(false);
	};

	return (
		<div className="p-2 bg-gray-50 fixed top-0 left-0 w-full shadow-md z-50">
			<Popover>
				{({ open }) => (
					<>
						{/* Navbar */}
						<nav className="flex justify-between items-center h-12 max-w-7xl mx-auto px-4">
							<a
								href="/"
								className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600"
							>
								CAREER JUPITER
							</a>

							{/* Desktop Navigation */}
							<div className="hidden md:flex md:items-center md:space-x-8">
								{navigation.map((item) => (
									<div key={item.name} className="relative group">
										<NavLink
											to={item.to}
											className="text-gray-700 hover:text-blue-600"
										>
											{item.name}
										</NavLink>

										{/* Student Corner Dropdown */}
										{item.name === 'Students Corner' && item.children && (
											<div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md opacity-0 transform scale-95 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100">
												{item.children.map((child) => (
													<NavLink
														key={child.name}
														to={child.to}
														onClick={(e) => handleClick(e, child.href)}
														className="block px-4 py-2 text-black hover:bg-gray-300 transition-all"
													>
														{child.name}
													</NavLink>
												))}
											</div>
										)}
									</div>
								))}

								{/* Check Eligibility Button */}
								<button
									onClick={handleScrollToSection}
									className="bg-pink-600 cursor-pointer text-white font-bold py-2 px-4 rounded-lg"
								>
									Check Eligibility
									<motion.span
										className="ml-2"
										animate={{ x: [0, 10, 0] }}
										transition={{ repeat: Infinity, duration: 1 }}
									>
										➡️
									</motion.span>
								</button>
								{!isLoggedIn &&(
								<button
									 onClick={() => navigate('/Sign-in')}
									className="bg-blue-600 text-white font-bold py-2 px-2 rounded-lg text-md mx-4"
											>
									Sign in	
								</button>
							)}
							</div>

							{/* Desktop Profile Icon */}
							{isLoggedIn && (
								<Menu as="div" className="relative hidden md:block">
									<Menu.Button className="flex items-center cursor-pointer">
										<img
											src={profilePic}
											alt="Profile"
											className="h-8 w-8 rounded-full"
										/>
									</Menu.Button>
									<Transition
										as={Fragment}
										enter="transition ease-out duration-100"
										enterFrom="opacity-0 scale-95"
										enterTo="opacity-100 scale-100"
										leave="transition ease-in duration-75"
										leaveFrom="opacity-100 scale-100"
										leaveTo="opacity-0 scale-95"
									>
										<Menu.Items className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg">
											<Menu.Item>
												<NavLink
													to="/profile/personal-details"
													className="block px-4 py-2 hover:bg-gray-100"
												>
													Profile
												</NavLink>
											</Menu.Item>
											<Menu.Item>
												<button
													onClick={handleSignOut}
													className="block w-full text-left px-4 py-2 text-red-600 cursor-pointer hover:bg-gray-100"
												>
													Sign Out
												</button>
											</Menu.Item>
										</Menu.Items>
									</Transition>
								</Menu>
							)}

							{/* Mobile & Tablet Toggle */}
							<button
								className="md:hidden cursor-pointer ml-4"
								onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
							>
								{isMobileMenuOpen ? (
									<XIcon className="w-8 h-8 text-gray-700" />
								) : (
									<MenuIcon className="w-8 h-8 text-gray-700" />
								)}
							</button>
						</nav>

						{/* Mobile & Tablet Menu */}
						{isMobileMenuOpen && (
							<div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
								<div className="bg-white w-3/4 max-w-sm h-full shadow-lg flex flex-col px-6 py-8 space-y-4 relative">
									{/* Close Button */}
									<button
										onClick={() => setIsMobileMenuOpen(false)}
										className="absolute top-4 right-4 text-gray-800 text-3xl"
									>
										✕
									</button>

									{/* Navigation Items */}
									{navigation.map((item) => (
										<div key={item.name} className="text-lg relative group">
											<NavLink
												to={item.to}
												onClick={() => setIsMobileMenuOpen(false)}
												className="block px-4 py-3 text-xl font-semibold text-gray-900 hover:text-gray-600 transition-all"
											>
												{item.name}
											</NavLink>

											{/* Students Corner Dropdown */}
											{item.name === 'Students Corner' && item.children && (
												<div className="mt-1 ml-4 space-y-2">
													{item.children.map((child) => (
														<a
															key={child.name}
															href={child.href}
															onClick={(e) => handleClick(e, child.href)}
															className="block px-4 py-2 text-lg text-gray-700 hover:text-gray-500 transition-all"
														>
															{child.name}
														</a>
													))}
												</div>
											)}
										</div>
									))}

									 {/* Sign In Button (for non-logged in users) */}
      {!isLoggedIn && (
        <button
          onClick={() => {
            navigate('/Sign-in');
            setIsMobileMenuOpen(false);
          }}
          className="bg-blue-600 text-white font-bold py-2 px-2 rounded-lg text-lg mx-2"
        >
          Sign in
        </button>
      )}

									{/* Profile Section */}
									{isLoggedIn && (
										<div className="mt-6 w-full border-t border-gray-300 pt-4">
											<NavLink
												to="/profile/personal-details"
												className="block px-4 py-3 text-xl font-semibold text-gray-900 hover:text-gray-600 transition-all"
												onClick={() => setIsMobileMenuOpen(false)}
											>
												Profile
											</NavLink>
											<button
												onClick={handleSignOut}
												className="block w-full cursor-pointer text-left px-4 py-3 text-xl font-semibold text-red-600 hover:text-red-500 transition-all"
											>
												Sign Out
											</button>
										</div>
									)}
								</div>
							</div>
						)}
					</>
				)}
			</Popover>
		</div>
	);
};

export default Nav;
