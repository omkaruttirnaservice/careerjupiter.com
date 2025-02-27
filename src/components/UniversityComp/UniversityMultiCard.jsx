import React from "react";
import { useNavigate } from "react-router-dom";
import UniversityCard from "./UniversityCard";
import TagsSection from "../TagsSection";
import { useSearchContext } from "../../store/SearchContext";

const UniversityMultiCard = () => {
  const navigate = useNavigate();
  const { UniversityData } = useSearchContext();

  console.log("Full UniversityData:", UniversityData);

  // Parse karaycha part fix kela
  let universities = [];
  try {
    if (UniversityData?.data) {
      const parsedData = JSON.parse(UniversityData.data); // JSON.parse safe way
      universities = parsedData?.universities || [];
    }
    console.log("Parsed Universities:", universities);
  } catch (error) {
    console.error("Error parsing UniversityData.data:", error);
  }

  // Tags banvayla dynamic logic
  const tags = ["All", ...new Set(universities.map((uni) => uni.universityName))];

  return (
    <div className="mt-10">
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

          {/* Grid of University Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {universities.length > 0 ? (
              universities.map((uni) => (
                <UniversityCard
                  key={uni._id}
                  university={{
                    id: uni._id,
                    name: uni.universityName || "Unknown University",
                    rank: uni.establishedYear || "N/A",
                    location: `${uni.address?.line1 || "Address not available"}, ${uni.address?.state || "N/A"}`,
                    image: uni.image || "https://via.placeholder.com/300",
                    description: uni.info?.description || "No description available.",
                  }}
                  onClick={() => navigate(`/university/${uni._id}`)}
                />
              ))
            ) : (
              <p className="text-center text-red-500">No data found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniversityMultiCard;
