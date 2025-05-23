import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UniversityCard from "./UniversityCard";
import TagsSection from "../TagsSection";
import { useSearchContext } from "../../store/SearchContext";
import toast from "react-hot-toast";
import { BounceLoader } from "react-spinners";
import LoadingCard from "../loading-skeleton/LoadingCard";
import UniversitySearchBar from "../SearchComp/UniversitySearchBar";
import dataNotFound from '../../assets/images/dataNotFound.jpg'
// import Loader from '../Loader';

const UniversityMultiCard = () => {
  const navigate = useNavigate();

  let { UniversityData, errorMsg, isLoading } = useSearchContext();

  useEffect(() => {
    toast.error(errorMsg || "Please try again later !");
  }, [errorMsg]);

  const tags = ["All", "Private", "Government"];

  return (
    <div className="mt-10">
      <UniversitySearchBar />
      <TagsSection tags={tags} />
      <div className="bg-gray-30 py-10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6 text-center">
            Welcome to Education
          </h2>
          <p className="text-center text-gray-600 mb-10 max-w-xl mx-auto">
            Discover the world's top universities with outstanding programs,
            cutting-edge research, and vibrant campus communities.
          </p>

          {isLoading ? (
            <div className="mt-10 px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, index) => (
                <LoadingCard key={index} />
              ))}
            </div>
          ) : null}

          {!isLoading && UniversityData?.results?.length !== 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {UniversityData.results?.map((uni) => (
                <UniversityCard
                  key={uni._id}
                  university={{
                    id: uni._id,
                    name: uni.universityName || "Unknown University",
                    rank: uni.establishedYear || "N/A",
                    category: uni.Category,
                    location: `${uni.address?.line1 || "Address not available"}, ${uni.address?.state || "N/A"}`,
                    image: uni.image || "https://via.placeholder.com/300",
                    description:
                      uni.info?.description || "No description available.",
                  }}
                  onClick={() => navigate(`/university/${uni._id}`)}
                />
              ))}
            </div>
          )}
          {!isLoading && UniversityData?.results?.length !== 0 && (
            <>
              <div className="flex justify-center items-center flex-col mt-5">
                <img
                  src={dataNotFound}
                  alt="No image found"
                  className="w-40 sm:w-56 md:w-64 lg:w-72 xl:w-80 object-contain"
                />
                <h1 className="text-red-700">No University Data Found</h1>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UniversityMultiCard;
