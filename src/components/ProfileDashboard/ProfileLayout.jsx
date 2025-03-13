import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { LuLogOut, LuNotebookPen } from 'react-icons/lu';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { FaUserLarge } from 'react-icons/fa6';

function ProfileLayout() {
	const location = useLocation();

	const navigation = [
		{
			name: 'My Profile',
			href: '/profile/personal-details',
			icon: FaUserLarge,
		},
		{
			name: 'Test',
			href: '/profile/test',
			icon: LuNotebookPen,
		},
		{
			name: 'Signout',
			href: '/signout',
			icon: LuLogOut,
		},
	];
s
	const [sidebarOpen, setSidebarOpen] = useState(false);

	return (
		<>
			{/* Mobile Sidebar */}
			{sidebarOpen && (
				<div className="fixed inset-0 bg-opacity-0 z-40 flex md:hidden">
					<div className="bg-blue-600 w-64 p-5 relative border-r border-gray-300 text-white">
						<button
							className="absolute top-2 right-2 text-white"
							onClick={() => setSidebarOpen(false)}
						>
							<FaTimes className="w-6 h-6" />
						</button>
						<nav className="mt-5">
							{navigation.map((item) => (
								<NavLink
									key={item.name}
									to={item.href}
									className={({ isActive }) =>
										`flex items-center p-2 rounded-md ${
											isActive ? 'bg-blue-500' : 'hover:bg-blue-500'
										}`
									}
									onClick={() => setSidebarOpen(false)}
								>
									<item.icon className="mr-3 w-6 h-6" />
									{item.name}
								</NavLink>
							))}
						</nav>
					</div>
				</div>
			)}

			{/* Desktop Sidebar */}
			<div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 bg-blue-600 border-r border-gray-300 p-5 text-white">
				<nav className="space-y-1">
					{navigation.map((item) => (
						<NavLink
							key={item.name}
							to={item.href}
							className={({ isActive }) =>
								`flex items-center p-2 rounded-md ${
									isActive ? 'bg-blue-300' : 'hover:bg-blue-300'
								}`
							}
						>
							<item.icon className="mr-3 w-6 h-6" />
							{item.name}
						</NavLink>
					))}
				</nav>
			</div>

			{/* Main Content */}
			<div className="md:pl-64">
				<button className="md:hidden p-2" onClick={() => setSidebarOpen(true)}>
					<FaBars className="w-6 h-6 text-gray-600" />
				</button>
				<div className="h-auto border-0.5">
					<Outlet />
				</div>
			</div>
		</>
	);
}

export default ProfileLayout;
