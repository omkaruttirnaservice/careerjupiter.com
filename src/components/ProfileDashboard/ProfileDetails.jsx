import { useDispatch, useSelector } from 'react-redux';
import { getUser } from './Api';
import { useQuery } from '@tanstack/react-query';
import {
	FaUserCircle,
	FaEnvelope,
	FaPhone,
	FaBirthdayCake,
	FaGraduationCap,
	FaMapMarkerAlt,
} from 'react-icons/fa';
import { useEffect } from 'react';
import { setCurrentEducation } from '../../store-redux/educationSlice';

const ProfileDetails = () => {
	const dispatch = useDispatch();
	const { userId } = useSelector((state) => state.auth);

	const { data, isPending, isError, error } = useQuery({
		queryKey: ['userData', userId],
		queryFn: () => getUser(userId),
	});

	useEffect(() => {
		console.log(data, '--data');
		if (data?.data?.info?.current_education) {
			dispatch(setCurrentEducation(data.data.info.current_education));
		}
	}, [data, dispatch]);

	if (isPending)
		return (
			<div className="flex justify-center items-center h-64">
				<div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-indigo-500"></div>
			</div>
		);

	if (isError)
		return (
			<div className="text-center py-6">
				<p className="text-red-500 bg-red-50 px-4 py-2 rounded-xl border border-red-100">
					Error: {error.message}
				</p>
			</div>
		);

	const user = data?.data;

	return (
		<div className="max-w-6xl mx-auto p-4 md:p-6 bg-gradient-to-br from-indigo-50 to-purple-50 min-h-screen">
			{/* Mobile Header (shown only on small screens) */}
			<div className="md:hidden w-full flex flex-col items-center text-center space-y-4 mb-6">
				<div className="bg-gradient-to-br from-indigo-400 to-purple-400 p-1 rounded-full">
					<img
						src={user?.profile_image || 'https://via.placeholder.com/150'}
						alt="Profile"
						className="w-24 h-24 rounded-full object-cover border-4 border-white"
					/>
				</div>
				<h2 className="text-2xl font-bold text-gray-900 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
					{user?.f_name} {user?.m_name} {user?.l_name}
				</h2>
				<div className="flex flex-col space-y-2">
					<div className="flex items-center justify-center gap-2 text-gray-700">
						<FaEnvelope className="text-indigo-600 w-4 h-4" />
						<span className="text-sm font-medium break-all">
							{user?.email_id}
						</span>
					</div>
					<div className="flex items-center justify-center gap-2 text-gray-700">
						<FaPhone className="text-indigo-600 w-4 h-4" />
						<span className="text-sm font-medium">{user?.mobile_no}</span>
					</div>
				</div>
			</div>

			{/* Main Content */}
			<div className="flex flex-col md:flex-row gap-8 w-full">
				{/* Left Column - Details */}
				<div className="w-full md:w-2/3 space-y-8">
					{/* Personal Information Card */}
					<div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
						<h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
							Personal Information
						</h3>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div className="flex items-center gap-4">
								<div className="p-3 bg-purple-50 rounded-xl">
									<FaBirthdayCake className="text-purple-600 w-6 h-6"/>
								</div>
								<div>
									<p className="text-sm text-gray-500">Date of Birth</p>
									<p className="font-semibold text-gray-800">{user?.dob || "N/A"}</p>
								</div>
							</div>
							<div className="flex items-center gap-4">
								<div className="p-3 bg-indigo-50 rounded-xl">
									<FaUserCircle className="text-indigo-600 w-6 h-6" />
								</div>
								<div>
									<p className="text-sm text-gray-500">Age</p>
									<p className="font-semibold text-gray-800">{user?.age || "N/A"}</p>
								</div>
							</div>
							<div className="flex items-center gap-4">
								<div className="p-3 bg-blue-50 rounded-xl">
									<FaGraduationCap className="text-blue-600 w-6 h-6" />
								</div>
								<div>
									<p className="text-sm text-gray-500">Current Education</p>
									<p className="font-semibold text-gray-800">
										{user?.info?.current_education || "N/A"}
									</p>
								</div>
							</div>
						</div>
					</div>

					{/* Address Card */}
					<div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
						<h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
							Address Details
						</h3>
						<div className="flex items-start gap-4">
							<div className="p-3 bg-green-50 rounded-xl mt-1">
								<FaMapMarkerAlt className="text-green-600 w-6 h-6" />
							</div>
							<div className="break-words">
								<p className="font-medium text-gray-800">
									{user?.address?.line1 || "N/A"} {user?.address?.line2}
								</p>
								<p className="text-gray-600 mt-2">
									{user?.address?.dist || "N/A"}, {user?.address?.state}
								</p>
								<p className="text-gray-600">PIN: {user?.address?.pincode || "N/A"}</p>
							</div>
						</div>
					</div>
				</div>

				{/* Right Column - Profile Card (shown only on medium+ screens) */}
				<div className="hidden md:block w-full md:w-1/3">
					<div className="bg-white rounded-2xl h-full p-6 shadow-lg border border-gray-100 sticky top-6">
						<div className="flex flex-col  items-center text-center space-y-4">
							<div className="bg-gradient-to-br from-indigo-400 to-purple-400 p-1.5 rounded-full">
								<img
									src=//user?.profile_image ||
									"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsEJHmI0MlIGvH9CYkbsLEWQ5_ee8Qtl5V-Q&s"
									alt="Profile"
									className="w-32 h-32 rounded-full object-cover border-4 border-white"
								/>
							</div>
							<h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
								{user?.f_name || "N/A"} {user?.m_name} {user?.l_name}
							</h2>
							<div className="w-full space-y-3">
								<div className="flex items-center gap-2 text-gray-700">
									<FaEnvelope className="text-indigo-600 w-5 h-5 flex-shrink-0" />
									<span className="text-sm font-medium break-all">
										{user?.email_id}
									</span>
								</div>
								<div className="flex items-center gap-2 text-gray-700">
									<FaPhone className="text-indigo-600 w-5 h-5 flex-shrink-0" />
									<span className="text-sm font-medium">{user?.mobile_no}</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProfileDetails;
