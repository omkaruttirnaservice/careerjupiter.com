import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { FaMapMarkerAlt, FaPhoneAlt, FaCalendarAlt } from 'react-icons/fa'; // Added calendar icon
import { fetchUniversityById } from './Api'; // API call
// import UniversityRanking from './UniversityRanking';
// import OfferedCourse from './OfferedCourse';
import PlacementOpportunities from './PlacementOpportunities';
import EntranceExam from './EntranceExam';
import InquiryForm from './InquiryForm';
import ReviewPage from '../navComp/ReviewPage';
import UniversityCourses from './OfferedCourse';
import { motion } from 'framer-motion';
import Nav from '../../Layouts/Nav';

const UniversityDetail = () => {
	const { id } = useParams();
	const navigate = useNavigate();

	// Fetch university data using react-query
	const { data, isLoading, isError, error } = useQuery({
		queryKey: ['university', id],
		queryFn: () => fetchUniversityById(id),
		staleTime: 5 * 60 * 1000,
	});

	if (isLoading) {
		return (
			<div className="flex items-center justify-center h-screen">
				<p className="text-2xl font-semibold text-gray-600">
					Loading university details...
				</p>
			</div>
		);
	}

	if (isError) {
		return (
			<div className="flex items-center justify-center h-screen">
				<p className="text-2xl font-semibold text-red-600">
					Error: {error.message}
				</p>
			</div>
		);
	}

	const { university: uni, courses } = data;

	return (
		<>
      <Nav />
			<div className="min-h-screen pb-3 mt-1">
				{/* Banner Section */}
				<div className="relative w-full h-80 rounded-lg overflow-hidden">
					{/* Default Gradient Background (Always Present) */}
					<div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 flex flex-col items-center justify-center text-center px-4">
						<h1 className="text-white text-5xl font-bold">
							{uni.universityName || 'Unknown University'}
						</h1>
						<p className="text-white text-3xl  mt-2">{uni.Category || 'N/A'}</p>
					</div>

					{/* University Image (Loads Above Gradient, Hidden if Error) */}
					<img
						src={uni.image}
						alt={uni.universityName}
						className="absolute inset-0 w-full h-full object-cover"
						onError={(e) => {
							e.target.onerror = null; // Prevent infinite loop
							e.target.style.display = 'none'; // Hide broken image
						}}
					/>
				</div>

				{/* Info Section */}
				<motion.div className="container mx-auto mt-6 px-4">
					<motion.div
						className="bg-white shadow-md rounded-lg p-4"
						initial={{ opacity: 0, y: 50 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, ease: 'easeOut' }}
					>
						{/* Location */}
						<motion.div
							className="flex items-center mb-6"
							initial={{ opacity: 0, x: -50 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ delay: 0.2, duration: 0.5 }}
						>
							<FaMapMarkerAlt className="text-green-500 text-3xl mr-2" />
							<h2 className="text-3xl font-bold text-gray-800">Location</h2>
						</motion.div>
						<p className="text-lg text-gray-600 mb-4">
							{`${uni.address.line1}, ${uni.address.line2}, ${uni.address.dist}, ${uni.address.state} - ${uni.address.pincode}`}
						</p>

						{/* Establishment Year */}
						<motion.div
							className="flex items-center mb-6"
							initial={{ opacity: 0, x: 50 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ delay: 0.4, duration: 0.5 }}
						>
							<FaCalendarAlt className="text-blue-600 text-3xl mr-2" />
							<h2 className="text-3xl font-bold text-gray-800">
								Established in
							</h2>
						</motion.div>
						<p className="text-lg text-gray-600 mb-4">
							{uni.establishedYear || 'Not Available'}
						</p>

						{/* About */}
						<motion.div
							className="flex items-center mb-6"
							initial={{ opacity: 0, scale: 0.9 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ delay: 0.6, duration: 0.5 }}
						>
							<h2 className="text-3xl font-bold text-gray-800">About</h2>
						</motion.div>
						<p className="text-lg text-gray-700 leading-relaxed mb-4">
							{uni.info?.description || 'No description provided.'}
						</p>

						{/* Contact Number */}
						<motion.div
							className="flex items-center mb-8"
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.8, duration: 0.5 }}
						>
							<FaPhoneAlt className="text-green-600 text-3xl mr-2" />
							<p className="text-lg text-gray-700">
								{uni.contactDetails?.phoneNumber || '+91-123 123 123 123'}
							</p>
						</motion.div>
					</motion.div>

					{/* Info Section */}
					<div className="container mx-auto mt-6 px-4">
						<motion.div
							className="bg-white shadow-md rounded-lg p-4"
							initial={{ opacity: 0, y: 50 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, ease: 'easeOut' }}
						>
							{/* Location */}
							<motion.div
								className="flex items-center mb-6"
								initial={{ opacity: 0, x: -50 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ delay: 0.2, duration: 0.5 }}
							>
								<FaMapMarkerAlt className="text-green-500 text-3xl mr-2" />
								<h2 className="text-3xl font-bold text-gray-800">Location</h2>
							</motion.div>
							<p className="text-lg text-gray-600 mb-4">
								{`${uni.address.line1}, ${uni.address.line2}, ${uni.address.dist}, ${uni.address.state} - ${uni.address.pincode}`}
							</p>

							{/* Establishment Year */}
							<motion.div
								className="flex items-center mb-6"
								initial={{ opacity: 0, x: 50 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ delay: 0.4, duration: 0.5 }}
							>
								<FaCalendarAlt className="text-blue-600 text-2xl mr-2" />
								<h2 className="text-3xl font-bold text-gray-800">
									Established in
								</h2>
							</motion.div>
							<p className="text-lg text-gray-600 mb-4">
								{uni.establishedYear || 'Not Available'}
							</p>

							{/* About */}
							<motion.div
								className="flex items-center mb-6"
								initial={{ opacity: 0, scale: 0.9 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{ delay: 0.6, duration: 0.5 }}
							>
								<h2 className="text-3xl font-bold text-gray-800">About</h2>
							</motion.div>
							<p className="text-lg text-gray-700 leading-relaxed mb-4">
								{uni.info?.description || 'No description provided.'}
							</p>

							{/* Contact Number */}
							<motion.div
								className="flex items-center mb-8"
								initial={{ opacity: 0, y: 30 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.8, duration: 0.5 }}
							>
								<FaPhoneAlt className="text-green-600 text-xl mr-2" />
								<p className="text-lg text-gray-700">
									{uni.contactDetails?.phoneNumber || '+91-123 123 123 123'}
								</p>
							</motion.div>
						</motion.div>
					</div>
					<UniversityCourses courses={courses} />
					<PlacementOpportunities university={uni} />
					<ReviewPage />
				</motion.div>
			</div>
		</>
	);
};

export default UniversityDetail;
