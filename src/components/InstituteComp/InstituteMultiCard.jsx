import { useNavigate } from "react-router-dom";
import InstituteCard from "./InstituteCard";
import TagsSection from "./../TagsSection";
import { useSearchContext } from "../../store/SearchContext";
import { BounceLoader } from "react-spinners";
import LoadingCard from "../loading-skeleton/LoadingCard";
// import Loader from '../Loader';
import ClassSearchBar from "./../SearchComp/ClassSearchBar";
import dataNotFound from "../../assets/images/dataNotFound.jpg";
import { useState } from "react";

const InstituteMultiCard = () => {
  const navigate = useNavigate();
  const [query , setQuery] = useState("");
  const [searchClassData, setSearchClassData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

  let { errorMsg, instituteData } = useSearchContext();

  const tags = ["All", "Diploma", "Engineering"];

  console.log("instituteData ........", searchClassData);
  console.log("loading----", isLoading);
  

  return (
    <>
      <ClassSearchBar
        setQuery={setQuery}
        query={query}
        setSearchClassData={setSearchClassData}
        setIsLoading={setIsLoading}
      />
      <div className="mt-5 px-4">
        <h2 className="text-3xl font-bold text-center mb-6">
          Explore Top Class
        </h2>
        <p className="text-center text-gray-600 max-w-xl mx-auto">
          Find the best classes with outstanding programs and excellent learning
          opportunities.
        </p>
      </div>
      {/* <TagsSection tags={tags} /> */}

      <div className="">
        {/* {isLoading && <Loader />} */}

        {isLoading ? (
          <div className="mt-10 px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <LoadingCard key={index} />
            ))}
          </div>
        ) : null}
        {!isLoading && searchClassData?.length !== 0 && (
          <>
            <div className="cursor-pointer grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 m-5">
              {searchClassData.length !== 0 &&
                searchClassData.results?.map((each, index) => (
                  <InstituteCard
                    institute={each}
                    key={each.id || each._id || index} // ✅ Ensures a unique key
                    onClick={() => navigate(`/class/${each._id}`)}
                  />
                ))}
            </div>
          </>
        )}
        {!isLoading && searchClassData?.length === 0 && (
          <>
            <div className="flex justify-center items-center flex-col mt-5">
              <img
                src={dataNotFound}
                alt="No image found"
                className="w-40 sm:w-56 md:w-64 lg:w-72 xl:w-80 object-contain"
              />
              <h1 className="text-red-700">No Class Data Found</h1>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default InstituteMultiCard;
