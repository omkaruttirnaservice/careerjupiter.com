import { useNavigate } from "react-router-dom";
import InstituteCard from "./InstituteCard";
import TagsSection from "./../TagsSection";
import { useSearchContext } from "../../store/SearchContext";
import { BounceLoader } from "react-spinners";
import LoadingCard from "../loading-skeleton/LoadingCard";
// import Loader from '../Loader';

const InstituteMultiCard = () => {
  const navigate = useNavigate();

  let { errorMsg, isLoading, instituteData } = useSearchContext();

  const tags = ["All", "Diploma", "Engineering"];

  console.log("instituteData ........", instituteData);
  // console.log('error in class search : ========', errorMsg.message);

  return (
    <>
      <TagsSection tags={tags} />

      <div className="">
        {/* {isLoading && <Loader />} */}

        {isLoading ? (
          <div className="mt-10 px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <LoadingCard key={index} />
            ))}
          </div>
        ) : null}
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
