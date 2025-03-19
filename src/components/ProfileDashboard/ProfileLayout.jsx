
import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { LuLogOut, LuNotebookPen } from 'react-icons/lu';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { FaUserLarge } from 'react-icons/fa6';
import { AiOutlineHome } from 'react-icons/ai';
import Swal from 'sweetalert2'; // Import SweetAlert2

function ProfileLayout() {
	const navigate = useNavigate();
	const [sidebarOpen, setSidebarOpen] = useState(false);

	// Function to show the SweetAlert confirmation before signout
	const handleSignOut = () => {
		Swal.fire({
			title: 'Are you sure?',
			text: 'You will be logged out!',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, Sign Out!',
		}).then((result) => {
			if (result.isConfirmed) {
				navigate('/signout'); // Redirect to signout page
			}
		});
	};

	// Navigation Menu Items
	const navigation = [
		{ name: 'Home', href: '/', icon: AiOutlineHome },
		{ name: 'My Profile', href: '/profile/personal-details', icon: FaUserLarge },
		{ name: 'Test', href: '/profile/test', icon: LuNotebookPen },
	];

	return (
		<>
			{/* Mobile Sidebar (Drawer) */}
			{sidebarOpen && (
				<div className="fixed inset-0 bg-black/50 backdrop-blur-sm  z-50 md:hidden">
					<div className="bg-blue-600 w-64 h-full p-5 relative text-white">
						<button
							className="absolute top-2 right-2 text-white"
							onClick={() => setSidebarOpen(false)}
						>
							<FaTimes className="w-6 h-6" />
						</button>
						<nav className="mt-5 space-y-2">
							{navigation.map((item) => (
								<NavLink
									key={item.name}
									to={item.href}
									className={({ isActive }) =>
										`flex items-center p-3 rounded-md ${
											isActive ? 'bg-blue-500' : 'hover:bg-blue-500'
										}`
									}
									onClick={() => setSidebarOpen(false)}
								>
									<item.icon className="mr-3 w-6 h-6" />
									{item.name}
								</NavLink>
							))}
							{/* Signout Button */}
							<button
								onClick={handleSignOut}
								className="flex items-center p-3 rounded-md w-full text-left hover:bg-red-500"
							>
								<LuLogOut className="mr-3 w-6 h-6" />
								Signout
							</button>
						</nav>
					</div>
				</div>
			)}

			{/* Desktop Sidebar */}
			<div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 bg-blue-600 p-5 text-white">
				<nav className="space-y-2">
					{navigation.map((item) => (
						<NavLink
							key={item.name}
							to={item.href}
							className={({ isActive }) =>
								`flex items-center p-3 rounded-md ${
									isActive ? 'bg-blue-300' : 'hover:bg-blue-300'
								}`
							}
						>
							<item.icon className="mr-3 w-6 h-6" />
							{item.name}
						</NavLink>
					))}
					{/* Signout Button */}
					<button
						onClick={handleSignOut}
						className="flex items-center p-3  rounded-md w-full text-left hover:bg-blue-300"
					>
						<LuLogOut className="mr-3 w-6 h-6" />
						Signout
					</button>
				</nav>
			</div>

			{/* Main Content */}
			<div className="md:pl-64">
				{/* Menu Button for Mobile View */}
				<button className="md:hidden p-3" onClick={() => setSidebarOpen(true)}>
					<FaBars className="w-6 h-6 text-gray-600" />
				</button>
				{/* Page Content */}
				<div className="h-auto p-5">
					<Outlet />
				</div>
			</div>
		</>
	);
}

export default ProfileLayout;
