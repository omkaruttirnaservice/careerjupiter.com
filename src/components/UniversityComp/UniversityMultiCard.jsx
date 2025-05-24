import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import UniversityCard from "./UniversityCard";
import { fetchUniversities } from "./Api";
import LoadingCard from "../loading-skeleton/LoadingCard";
import dataNotFound from "../../assets/images/dataNotFound.jpg";
import UniversitySearchBar from "../SearchComp/UniversitySearchBar";

const UniversityMultiCard = () => {
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [searchTriggered, setSearchTriggered] = useState(false);

  const {
    data: allUniversities,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["universities"],
    queryFn: fetchUniversities,
    refetchOnWindowFocus: false,
  });

  if (isError) {
    toast.error(error?.message || "Failed to load universities.");
  }

  const handleSearchResults = (results) => {
    setSearchResults(results);
    setSearchTriggered(true);
  };

  const transformUniversityData = (universities) => {
    return Array.isArray(universities)
      ? universities.map((uni) => ({
          name: uni.universityName || uni.name || "Unknown University",
          category: uni.Category || uni.category || "N/A",
          rank: uni.establishedYear || uni.rank || "N/A",
          image: uni.image || "https://via.placeholder.com/300",
          description:
            uni?.info?.description || uni.description || "No description available.",
          location:
            uni?.address?.line1 && uni?.address?.state
              ? `${uni.address.line1}, ${uni.address.state}`
              : uni.district || "Location not available",
          id: uni._id || uni.id || uni.name,
        }))
      : [];
  };

  const displayedData = searchTriggered
    ? transformUniversityData(searchResults)
    : transformUniversityData(allUniversities);

  return (
    <div className="mt-10">
      <UniversitySearchBar
        onSearchResults={handleSearchResults}
        setIsLoading={setIsSearchLoading}
      />

      <div className="bg-gray-30 py-10">
        <div className="container mx-auto px-4">
          {(isLoading || isSearchLoading) && (
            <div className="mt-10 px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, index) => (
                <LoadingCard key={index} />
              ))}
            </div>
          )}

          {!isLoading && !isSearchLoading && displayedData.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {displayedData.map((uni) => (
                <UniversityCard
                  key={uni.id}
                  university={uni}
                  onClick={() => navigate(`/university/${uni.id}`)}
                />
              ))}
            </div>
          )}

          {!isLoading && !isSearchLoading && displayedData.length === 0 && (
            <div className="flex justify-center items-center flex-col mt-5">
              <img
                src={dataNotFound || "/placeholder.svg"}
                alt="No data found"
                className="w-40 sm:w-56 md:w-64 lg:w-72 xl:w-80 object-contain"
              />
              <h1 className="text-red-700">No University Data Found</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UniversityMultiCard;