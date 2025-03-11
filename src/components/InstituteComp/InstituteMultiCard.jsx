import { useNavigate } from 'react-router-dom';
import InstituteCard from './InstituteCard';
import TagsSection from './../TagsSection';
import { useSearchContext } from '../../store/SearchContext';
// import Loader from '../Loader';

const InstituteMultiCard = () => {
	const navigate = useNavigate();

	let { errorMsg, isLoading, instituteData } = useSearchContext();

	const tags = ['All', 'Diploma', 'Engineering'];

	console.log('instituteData ........', instituteData);
	console.log('error in class search : ========', errorMsg.message);

	return (
		<>
			<TagsSection tags={tags} />

			<div className="">
				{/* {isLoading && <Loader />} */}

				{!isLoading && instituteData?.length === 0 && (
					 <div className="flex flex-col items-center justify-center">
					 <img src="public\no-data-found.png" alt="Not Found" className="w-1/2 max-w-md" />
				   </div>
				)}
				{!isLoading && instituteData?.length !== 0 && (
					<div className="cursor-pointer grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 gap-5 m-5">
						{instituteData.length !== 0 &&
							instituteData.results?.map((each) => (
								<InstituteCard
									institute={each}
									key={each.id}
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
