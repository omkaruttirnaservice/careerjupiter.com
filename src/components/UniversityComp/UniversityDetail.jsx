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
		<div className="min-h-screen pb-10 mt-5">
			{/* Banner Section */}
			<div className="relative">
				<img
					src={uni.image || 'https://via.placeholder.com/800'}
					alt={uni.universityName || 'University'}
					className="w-full h-80 object-cover rounded-lg"
				/>
				<div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center">
					<h1 className="text-5xl font-bold text-white">
						{uni.universityName || 'Unknown University'}
					</h1>
					<p className="text-lg text-white mt-2">
						Category: {uni.Category || 'N/A'}
					</p>
				</div>
			</div>

			{/* Info Section */}
			<div className="container mx-auto mt-8 px-4">
				<div className="bg-white shadow-md rounded-lg p-6">
					{/* Location */}
					<div className="flex items-center mb-6">
						<FaMapMarkerAlt className="text-red-500 text-3xl mr-2" />
						<h2 className="text-3xl font-bold text-gray-800">Location</h2>
					</div>
					<p className="text-lg text-gray-600 mb-4">
						{`${uni.address.line1}, ${uni.address.line2}, ${uni.address.dist}, ${uni.address.state} - ${uni.address.pincode}`}
					</p>

					{/* Establishment Year */}
					<div className="flex items-center mb-6">
						<FaCalendarAlt className="text-blue-600 text-2xl mr-2" />
						<h2 className="text-3xl font-bold text-gray-800">Established in</h2>
					</div>
					<p className="text-lg text-gray-600 mb-4">
						{uni.establishedYear || 'Not Available'}
					</p>

					{/* About */}
					<div className="flex items-center mb-6">
						<h2 className="text-3xl font-bold text-gray-800">About</h2>
					</div>
					<p className="text-lg text-gray-700 leading-relaxed mb-4">
						{uni.info?.description || 'No description provided.'}
					</p>

					{/* Contact Number */}
					<div className="flex items-center mb-8">
						<FaPhoneAlt className="text-green-600 text-xl mr-2" />
						<p className="text-lg text-gray-700">
							{uni.contactDetails?.phoneNumber || '+91-123 123 123 123'}
						</p>
					</div>

					{/* Ranking & Courses */}
					{/* <UniversityRanking university={uni} /> */}
					<UniversityCourses courses={courses} />
					<PlacementOpportunities university={uni} />
					<ReviewPage />

					{/* Entrance Exam and Inquiry Form side by side */}
					{/* <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
						<div className="bg-gray-100 p-4 rounded-lg">
							<EntranceExam university={uni} />
						</div>
						<div className="bg-gray-100 p-4 rounded-lg">
							<InquiryForm university={uni} />
						</div>
					</div> */}

					<button
						onClick={() => navigate('/')}
						className=" cursor-pointer mt-6 px-6 py-2 bg-blue-600 text-white text-lg font-medium rounded-lg hover:bg-blue-700 transition duration-300"
					>
						Back to Home
					</button>
				</div>
			</div>
		</div>
	);
};

export default UniversityDetail;
