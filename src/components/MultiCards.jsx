import { useNavigate } from "react-router-dom";
import TagsSection from "./TagsSection";
import { useSearchContext } from "../store/SearchContext";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { BACKEND_SERVER_IP } from "../Constant/constantData";
import { FaMapMarkerAlt } from "react-icons/fa";
import { BounceLoader } from "react-spinners";

const MultiCards = () => {
  const navigate = useNavigate();
  let { tags, collegesData, errorMsg, isLoading } = useSearchContext();

  useEffect(() => {
    if (errorMsg) {
      toast.error(errorMsg || "Please try again later !");
    }
  }, [errorMsg]);

  // console.log('inside college data:---------', collegesData);

  return (
    <>
      {/* Tags Section */}
      <TagsSection tags={tags} />

      {isLoading ? (
        <div className="flex flex-col items-center justify-center h-64">
          {/* <div className="w-16 h-16 border-8 border-t-blue-500 border-b-blue-500 border-r-transparent border-l-transparent rounded-full animate-spin"></div> */}
          <BounceLoader color="#36d7b7" />
          <p className="mt-4 text-lg font-medium text-gray-600">Loading...</p>
        </div>
      ) : null}

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
                <div className="relative w-full h-48 overflow-hidden rounded-t-lg">
                  <img
                    src={
                      college.image
                        ? `${BACKEND_SERVER_IP}${college.image}`
                        : ""
                    }
                    alt={college.collegeName || "College Image"}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    onError={(e) => {
                      e.target.onerror = null; // Prevent infinite loop
                      e.target.style.display = "none"; // Hide broken image

                      // Set gradient background dynamically
                      e.target.parentNode.style.background =
                        "linear-gradient(to right, #667eea, #764ba2)";
                    }}
                  />

                  {/* Overlay for text if image fails */}
                  {!college.image && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <h3 className="text-white text-3xl font-bold text-center px-4">
                        {college.collegeName || "Unknown College"}
                      </h3>
                    </div>
                  )}
                </div>

                <div className="p-5">
                  <h3 className="text-xl font-semibold">
                    {college.collegeName}
                  </h3>
                  <p className="text-gray-500 text-sm mt-1 flex items-center gap-1">
                    <FaMapMarkerAlt className="text-red-500" />{" "}
                    {/* Red Location Icon */}
                    {college.address?.state}, {college.address?.dist}
                  </p>
                  <p className="text-gray-600 mt-2 text-sm line-clamp-3">
                    {college.info?.description || "No description available."}
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
