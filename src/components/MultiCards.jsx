import { useNavigate } from "react-router-dom";
import TagsSection from "./TagsSection";
import { useSearchContext } from "../store/SearchContext";
import { BACKEND_SERVER_IP } from "../Constant/constantData";
import Lotify from "./TestComp/Lotify";
import LoadingCard from "./loading-skeleton/LoadingCard";
import CollegeSearchBar from "./SearchComp/CollegeSearchBar";

const MultiCards = () => {
  const navigate = useNavigate();
  let { tags, collegesData,isLoading } = useSearchContext();

  return (
    <>
    <div className="mt-20 px-4">
          <h2 className="text-3xl font-bold text-center mb-6">
            Explore Top Colleges
          </h2>
          <p className="text-center text-gray-600 max-w-xl mx-auto">
            Find the best colleges with outstanding programs and excellent
            learning opportunities.
          </p>
    </div>
      <CollegeSearchBar/>
      <TagsSection tags={tags} />

      {isLoading ? (
        <div className="mt-10 px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <LoadingCard key={index} />
          ))}
        </div>
      ) : collegesData.results?.length > 0 ? (
        <div className="mt-10 px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {collegesData.results.map((college, index) => (
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
                      e.target.onerror = null;
                      e.target.style.display = "none";
                      e.target.parentNode.style.background =
                        "linear-gradient(to right, #667eea, #764ba2)";
                    }}
                  />
                  {!college.image && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <h3 className="text-white text-xl font-bold text-center px-4">
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
                    <p className="w-8 h-8">
                      <Lotify icon="\Lottiefiles\Animation - 1742988929198 (1).json" />
                    </p>
                    {college.address?.state}, {college.address?.dist}
                  </p>
                  <p className="text-gray-600 mt-2 text-sm line-clamp-3">
                    {college.info?.description || "No description available."}
                  </p>
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
      ) : null}
    </>
  );
};

export default MultiCards;
