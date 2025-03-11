import { useNavigate } from 'react-router-dom';
import TagsSection from './TagsSection';
import { useSearchContext } from '../store/SearchContext';
import toast from 'react-hot-toast';
import { useEffect } from 'react';
import { BACKEND_SERVER_IP } from '../Constant/constantData';
import { FaMapMarkerAlt } from 'react-icons/fa';

const MultiCards = () => {
	const navigate = useNavigate();
	let { tags, collegesData, errorMsg, isLoading } = useSearchContext();

	useEffect(() => {
		if (errorMsg) {
			toast.error(errorMsg || 'Server error');
		}
	}, [errorMsg]);

	console.log('inside college data:---------', collegesData);

	return (
		<>
			{/* Tags Section */}
			<TagsSection tags={tags} />

			{/* Loader */}
			{isLoading && (
				<div className="h-48 w-full flex items-center justify-center gap-3">
					<svg
						aria-hidden="true"
						className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
						viewBox="0 0 100 101"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
							fill="currentColor"
						/>
						<path
							d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
							fill="currentFill"
						/>
					</svg>
					<p className="text-gray-600">Searching.......</p>
				</div>
			)}

			{/* No Data Found */}
			{/* {!isLoading && collegesData?.length === 0 && (
         <div className="flex flex-col items-center justify-center">
         <img src="public\no-data-found.png" alt="Not Found" className="w-1/2 max-w-md" />
         </div>
      )} */}

			{/* College Cards */}
			{!isLoading && collegesData.results?.length > 0 && (
				<div className="mt-10 px-4">
					<h2 className="text-3xl font-bold text-center mb-6">
						Explore Top Colleges
					</h2>
					<p className="text-center text-gray-600 mb-10 max-w-xl mx-auto">
						Find the best colleges with outstanding programs and excellent
						learning opportunities.
					</p>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
						{collegesData.results?.map((college, index) => (
							<div
								key={index}
								className="bg-white shadow-lg rounded-lg overflow-hidden hover:scale-105 transition-transform duration-200 cursor-pointer"
								onClick={() => navigate(`/college/${college._id}`)}
							>
								{college.image && (
									<img
										src={`${BACKEND_SERVER_IP}${college.image}`}
										alt={college.collegeName || 'College Image'}
										className="w-full h-48 object-cover"
										loading="lazy"
									/>
								)}
								<div className="p-5">
									<h3 className="text-xl font-semibold">
										{college.collegeName}
									</h3>
									<p className="text-gray-500 text-sm mt-1 flex items-center gap-1">
										<FaMapMarkerAlt className="text-red-500" />{' '}
										{/* Red Location Icon */}
										{college.address?.state}, {college.address?.dist}
									</p>
									<p className="text-gray-600 mt-2 text-sm line-clamp-3">
										{college.info?.description || 'No description available.'}
									</p>

									{/* Tags Section */}
									<div className="flex flex-wrap gap-2 mt-1">
										{college.tags?.map((tag, i) => (
											<span
												key={i}
												className="bg-gray-200 text-gray-700 text-xs font-semibold px-3 py-1 rounded-full"
											>
												{tag}
											</span>
										))}
									</div>

									{/* Category & Accreditation */}
									<div className="flex flex-wrap gap-2 mt-1">
										<span className="bg-blue-100 text-blue-600 text-xs font-semibold px-3 py-1 rounded-full">
											{college.collegeType}
										</span>
										{college.Category && (
											<span className="bg-green-100 text-green-600 text-xs font-semibold px-3 py-1 rounded-full">
												{college.Category}
											</span>
										)}
										{college.accreditation && (
											<span className="bg-purple-100 text-purple-600 text-xs font-semibold px-3 py-1 rounded-full">
												{college.accreditation}
											</span>
										)}
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			)}
		</>
	);
};

export default MultiCards;
