


import { useNavigate } from "react-router-dom";
import UniversityCard from "./UniversityCard";
import LoadingCard from "../loading-skeleton/LoadingCard";
import UniversitySearchBar from "../SearchComp/UniversitySearchBar";
import dataNotFound from "../../assets/images/dataNotFound.jpg";
import { useState } from "react";

const UniversityMultiCard = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [searchUniversityData, setSearchUniversityData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  return (
    <>
      <UniversitySearchBar
        setQuery={setQuery}
        query={query}
        setSearchUniversityData={setSearchUniversityData}
        setIsLoading={setIsLoading}
      />
      
      <div className="mt-18 px-4">
        <h2 className="text-3xl font-bold text-center mb-6">
          Explore Top Universities
        </h2>
        <p className="text-center text-gray-600 max-w-xl mx-auto">
          Find the best universities with outstanding programs and excellent learning
          opportunities.
        </p>
      </div>

        <div className="">
        {isLoading ? (
          <div className="mt-10 px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <LoadingCard key={index} />
            ))}
          </div>
        ) : searchUniversityData?.results?.length > 0 ? (
          <div className="cursor-pointer grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 m-5">
            {searchUniversityData.results.map((university, index) => (
              <UniversityCard
                university={university}
                key={university.id || university._id || index}
                onClick={() => navigate(`/university/${university._id}`)}
              />
            ))}
            
          </div>
        ) : (
          <div className="flex justify-center items-center flex-col mt-5">
            <img
              src={dataNotFound}
              alt="No universities found"
              className="w-40 sm:w-56 md:w-64 lg:w-72 xl:w-80 object-contain"
            />
            <h1 className="text-red-700">No University Data Found</h1>
          </div>
        )}
      </div>
    </>
  );
};

export default UniversityMultiCard;