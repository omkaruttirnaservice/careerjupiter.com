import { useNavigate } from 'react-router-dom';
import InstituteCard from './InstituteCard';
import TagsSection from './../TagsSection';
import { useSearchContext } from '../../store/SearchContext';
import { BounceLoader } from 'react-spinners';
// import Loader from '../Loader';

const InstituteMultiCard = () => {
	const navigate = useNavigate();

	let { errorMsg, isLoading, instituteData } = useSearchContext();

	const tags = ['All', 'Diploma', 'Engineering'];

	console.log('instituteData ........', instituteData);
	// console.log('error in class search : ========', errorMsg.message);

	return (
		<>
			<TagsSection tags={tags} />

			<div className="">
				{/* {isLoading && <Loader />} */}

				{
				isLoading ? (
					<div className="flex flex-col items-center justify-center h-64">
						{/* <div className="w-16 h-16 border-8 border-t-blue-500 border-b-blue-500 border-r-transparent border-l-transparent rounded-full animate-spin"></div> */}
						<BounceLoader color='#36d7b7' />
						<p className="mt-4 text-lg font-medium text-gray-600">Loading...</p>
					</div>
				) : null
			}
				{!isLoading && instituteData?.length !== 0 && (
					<div className="cursor-pointer grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 m-5">
					{instituteData.length !== 0 &&
					  instituteData.results?.map((each, index) => (
						<InstituteCard
						  institute={each}
						  key={each.id || each._id || index} // ✅ Ensures a unique key
						  onClick={() => navigate(`/class/${each._id}`)}
						/>
					  ))}
				  </div>
				  
				)}
			</div>
		</>
	);
};

export default InstituteMultiCard;
