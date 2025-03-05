import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { BASE_URL } from '../../utils/constansts';
import { BACKEND_SERVER_IP } from '../../Constant/constantData';
import ImageGallery from './ImageGallery';
import FacultyDetails from './FacultyDetails';

// Fetch class details and courses
const fetchInstitute = async (id) => {
	const response = await fetch(`${BASE_URL}/api/class/${id}`);
	if (!response.ok) {
		throw new Error('Failed to fetch class details');
	}
	const result = await response.json();
	if (!(result.success && result.data)) {
		throw new Error(result.errMsg || 'Failed to fetch class details');
	}
	const parsedData = JSON.parse(result.data);

	// Fetch courses
	const courseResponse = await fetch(
		`http://192.168.1.5:5000/api/class/course/${id}`
	);
	if (!courseResponse.ok) {
		throw new Error('Failed to fetch courses');
	}
	const courseResult = await courseResponse.json();
	const parsedCourses = courseResult.success
		? JSON.parse(courseResult.data).courses[0]?.courses || []
		: [];

	return { ...parsedData, courses: parsedCourses };
};

const fetchCourses = async (id) => {
	const response = await fetch(`${BASE_URL}/api/class/course/${id}`);
	if (!response.ok) {
		throw new Error('Failed to fetch courses');
	}
	const result = await response.json();

	console.log('Raw API Response:', result); // Debugging

	return result.success && result.data ? JSON.parse(result.data) : []; // Ensure it's an array
};

const SingleInstitute = () => {
	const { id } = useParams();

	const {
		data: institute,
		error,
		isLoading,
	} = useQuery({
		queryKey: ['institute', id],
		queryFn: () => fetchInstitute(id),
	});
	console.log('institute data :', institute);

	const {
		data: courses,
		error: coursesError,
		isLoading: coursesLoading,
	} = useQuery({
		queryKey: ['courses', id],
		queryFn: () => fetchCourses(id),
	});

	console.log('Courses Data:', courses); // Debugging

	// if (isLoading || coursesLoading) {
	//   return <p className="text-center text-gray-600 mt-8">Loading class details...</p>;
	// }

	if (error) {
		return (
			<p className="text-center text-red-600 mt-8">Error: {error.message}</p>
		);
	}

	// if (coursesError) {
	//   return <p className="text-center text-red-600 mt-8">Error loading courses: {coursesError.message}</p>;
	// }

	if (!institute) {
		return (
			<p className="text-center text-gray-600 mt-8">No class details found.</p>
		);
	}

	return (
		<>
			{/* Class Header */}
			<div className="flex items-center justify-center bg-gray-100 relative">
				<div className="w-full relative">
					<div
						className="w-full h-[70vh] bg-cover bg-center relative"
						style={{
							backgroundImage: `url(${BACKEND_SERVER_IP}${institute.class.image})`,
						}}
					>
						{console.log(institute?.class?.image)}
						<div className="flex justify-center">
							<h1 className="mt-20 text-white text-4xl font-bold">
								{institute.class.className || 'Class Name'}
							</h1>
						</div>
					</div>
					<div className="absolute w-[95%] sm:w-[90%] md:w-[80%] lg:w-[70%] left-1/2 -translate-x-1/2 bottom-[-50px] bg-white shadow-lg rounded-xl p-4 md:p-6 flex flex-col space-y-4 animate-fadeIn">
						{/* Title */}
						<h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 text-center">
							{institute.class.className}
						</h2>

						{/* Info Grid */}
						<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 text-gray-700">
							<div className="p-3 bg-gray-100 rounded-lg flex items-center space-x-2 text-sm sm:text-base">
								📍 <span className="font-semibold">Location:</span>
								<span>
									{institute.class.address?.line1 || 'N/A'},{' '}
									{institute.class.address?.dist || 'N/A'}
								</span>
							</div>
							<div className="p-3 bg-gray-100 rounded-lg flex items-center space-x-2 text-sm sm:text-base">
								🎓 <span className="font-semibold">Mode of Teaching:</span>
								<span>{institute.class.modeOfTeaching || 'N/A'}</span>
							</div>
							<div className="p-3 bg-gray-100 rounded-lg flex items-center space-x-2 text-sm sm:text-base">
								🗣️ <span className="font-semibold">Teaching Medium:</span>
								<span>
									{institute.class.teachingMedium?.join(', ') || 'N/A'}
								</span>
							</div>
							<div className="col-span-1 sm:col-span-2 p-3 bg-gray-100 rounded-lg flex items-center space-x-2 text-sm sm:text-base">
								📚 <span className="font-semibold">Courses Offered:</span>
								<span>
									{institute.class.subjectsOrCourses?.join(', ') || 'N/A'}
								</span>
							</div>
						</div>

						{/* Owner Info */}
						<div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center text-gray-700 space-y-2 sm:space-y-0">
							<p className="text-sm sm:text-base">
								<span className="font-semibold">Owner / Institute:</span>{' '}
								{institute.class.ownerOrInstituteName || 'N/A'}
							</p>
							<p className="text-sm sm:text-base">
								📞 <span className="font-semibold">Contact:</span>{' '}
								{institute.class.contactDetails || 'N/A'}
							</p>
							<p className="text-sm sm:text-base">
								<span className="font-semibold">franchise or Independent:</span>{' '}
								{institute.class.franchiseOrIndependent || 'N/A'}
							</p>
							<a
								href={institute.class.websiteURL || '#'}
								target="_blank"
								rel="noopener noreferrer"
								className="text-blue-500 underline text-sm sm:text-base"
							>
								Visit Website
							</a>
						</div>
						<div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center text-gray-700 space-y-2 sm:space-y-0">
							<p className="text-sm sm:text-base">
								<span className="font-semibold">Established Year:</span>{' '}
								{institute.class.yearEstablished || 'N/A'}
							</p>
						</div>
					</div>
				</div>
			</div>

			{/* Courses Section */}
			<section className="mt-20 p-10 bg-gradient-to-br  rounded-lg shadow-2xl">
				<h2 className="text-5xl font-extrabold text-center text-black mb-10 tracking-wide">
					🚀 Discover Our Trending Courses
				</h2>

				{courses && courses.length > 0 ? (
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
						{courses.map((course) => (
							<div
								key={course._id}
								className="bg-gradient-to-r from-indigo-500 to-blue-500 rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300 hover:shadow-2xl"
							>
								{/* Header */}
								<div className="p-6 text-white">
									<h3 className="text-3xl font-bold">{course.courseName}</h3>
									<p className="text-lg opacity-80 mt-2">{course.courseType}</p>
								</div>

								{/* Details */}
								<div className="p-6 bg-white text-gray-800 space-y-4">
									<p className="flex items-center gap-2">
										📅 <strong>Duration:</strong> {course.duration}
									</p>
									<p className="flex items-center gap-2">
										💸 <strong>Fee:</strong> ₹{course.feeStructure?.amount} (
										{course.feeStructure?.type})
									</p>
									<p className="flex items-center gap-2">
										🎁 <strong>Scholarship:</strong>{' '}
										{course.scholarshipOrDiscounts || 'N/A'}
									</p>
									<p className="flex items-center gap-2">
										📚 <strong>Study Material:</strong>{' '}
										{course.studyMaterialProvided ? 'Yes' : 'No'}
									</p>
								</div>

								{/* CTA */}
								<div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 text-center">
									{/* <button className="w-full bg-white text-blue-600 font-bold py-3 rounded-lg hover:bg-blue-500 hover:text-white transition-all duration-300">
              Enroll Now 🚀
            </button> */}
								</div>
							</div>
						))}
					</div>
				) : (
					<p className="text-center text-white text-lg mt-10">
						No courses available at the moment. Stay tuned! 📚
					</p>
				)}
			</section>

			{/* <CourseMultiCard /> */}
		</>
	);
};

export default SingleInstitute;
