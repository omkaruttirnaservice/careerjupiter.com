
import { useNavigate, useLocation } from "react-router-dom"
import { BACKEND_SERVER_IP } from "../Constant/constantData"
import LoadingCard from "./loading-skeleton/LoadingCard"
import CollegeSearchBar from "./SearchComp/CollegeSearchBar"
import { useState, useEffect } from "react"
import dataNotFound from "../assets/images/dataNotFound.jpg"
import { FaLocationDot } from "react-icons/fa6"
import InfiniteScroll from "react-infinite-scroll-component"
import { GetSearchCollege } from "./SearchComp/Api"
import { useSearchParams } from "react-router-dom"
import Cookies from "js-cookie";
// import { logUserActivityAPI } from "./Api"; // or wherever it's defined
import OtpLoginPopup from "./eligibility/OtpLoginPopup"; // adjust path accordingly
import { FaWhatsapp } from "react-icons/fa"
import { logUserActivityAPI } from "./api"


const MultiCards = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [params] = useSearchParams()
  const roadmapIdFromURL = params.get("roadmap")

  const [searchCollegeData, setSearchCollegeData] = useState({
    results: [],
    pagination: {
      currentPage: 1,
      perPage: 50,
      totalResults: 0,
      totalPages: 0,
    },
  })

  const [isLoading, setIsLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [searchParams, setSearchParams] = useState({
    searchKey: "",
    category: "",
    type: "college",
    dist: "",
    roadmap: roadmapIdFromURL || "",
  })

  const [isRoadmapMode, setIsRoadmapMode] = useState(!!roadmapIdFromURL)
  const [showOtherColleges, setShowOtherColleges] = useState(false)
  const [showOtpPopup, setShowOtpPopup] = useState(false);
const [selectedCollegeId, setSelectedCollegeId] = useState("");


  // Initial load when roadmap is in URL
  useEffect(() => {
    if (roadmapIdFromURL && !showOtherColleges) {
      setIsRoadmapMode(true)
      const roadmapParams = {
        searchKey: "",
        category: "", // Only tech colleges for roadmap
        type: "college",
        dist: "",
        roadmap: roadmapIdFromURL,
      }

      setSearchParams(roadmapParams)
      fetchCollegeData(roadmapParams, 1)
    } else if (!roadmapIdFromURL) {
      // No roadmap in URL, load all colleges
      setIsRoadmapMode(false)
      const defaultParams = {
        searchKey: "",
        category: "",
        type: "college",
        dist: "",
        roadmap: "",
      }
      setSearchParams(defaultParams)
      fetchCollegeData(defaultParams, 1)
    }
  }, [roadmapIdFromURL, showOtherColleges])

  const fetchCollegeData = async (params, pageNum = 1) => {
    try {
      setIsLoading(true)
      const response = await GetSearchCollege({ ...params, page: pageNum })
      
      // console.log("API Response:", response) // Debug log

      // Correct destructuring - response.data contains the actual data
      const responseData = response.data || response
      
      // Filter out hidden colleges only if we want to hide them
      // For now, let's show all colleges to debug the issue
      const filteredResults = responseData.results || []
      
      const filteredResponse = {
        results: filteredResults,
        pagination: responseData.pagination || {
          currentPage: 1,
          perPage: 50,
          totalResults: filteredResults.length,
          totalPages: 1
        }
      }

      if (pageNum === 1) {
        setSearchCollegeData(filteredResponse)
        setPage(filteredResponse.pagination?.currentPage || 1)
      } else {
        setSearchCollegeData((prevData) => ({
          ...filteredResponse,
          results: [...prevData.results, ...filteredResults],
        }))
        setPage(pageNum)
      }

      setHasMore(filteredResponse.pagination?.currentPage < filteredResponse.pagination?.totalPages)
      setIsLoading(false)
    } catch (error) {
      // console.error("Failed to fetch college data:", error)
      setIsLoading(false)
      setSearchCollegeData({ results: [], pagination: {} })
    }
  }

  const handleCollegeClick = async (college) => {
  const token = Cookies.get("token");
  const userId = Cookies.get("userId");

  if (token && userId) {
    try {
      await logUserActivityAPI({ userId, collegeId: college.collegeId, token });
      // navigate(`/college/${college._id}`, {
      //   state: { status: false, searchData: college },
      // });

      navigate(`/college/${college._id}`, {
  state: { status: true, searchData: college },
});

    } catch (error) {
      console.error("User activity API error:", error);
    }
  } else {
    setSelectedCollegeId(college._id);
    setShowOtpPopup(true);
  }
};


  const fetchMoreData = async () => {
    if (page >= searchCollegeData.pagination?.totalPages) {
      setHasMore(false)
      return
    }

    const nextPage = page + 1
    await fetchCollegeData(searchParams, nextPage)
  }

  // Handle search parameters update from search bar
  const handleSearchParamsUpdate = (params) => {
    // If in roadmap mode and not showing other colleges, preserve roadmap
    const updatedParams = {
      ...params,
      roadmap: isRoadmapMode && !showOtherColleges ? roadmapIdFromURL : "",
    }

    setSearchParams(updatedParams)
    fetchCollegeData(updatedParams, 1)
  }

  // Handle new search data from search bar
  const handleNewSearchData = (data) => {
    setSearchCollegeData(data)
    setHasMore(data.pagination?.currentPage < data.pagination?.totalPages)
    setPage(data.pagination?.currentPage || 1)
  }

  // Show other colleges (remove roadmap filter)
  const handleShowOtherColleges = () => {
    setShowOtherColleges(true)
    setIsRoadmapMode(false)
    
    // Load all colleges without roadmap filter
    const allCollegesParams = {
      searchKey: "",
      category: "",
      type: "college",
      dist: "",
      roadmap: "",
    }
    
    setSearchParams(allCollegesParams)
    fetchCollegeData(allCollegesParams, 1)
  }

  // Check if no results for roadmap
  const isNoResultsForRoadmap =
    isRoadmapMode && !showOtherColleges && searchCollegeData.results?.length === 0 && !isLoading

  return (
    <>
      <CollegeSearchBar
        setSearchCollegeData={handleNewSearchData}
        setIsLoading={setIsLoading}
        onSearchParamsUpdate={handleSearchParamsUpdate}
        hideRoadmapFilter={isRoadmapMode && !showOtherColleges}
        currentRoadmapId={roadmapIdFromURL}
      />

      <div className="mt-20 px-4">
        <h2 className="text-3xl font-bold text-center mb-6">
          {isRoadmapMode && !showOtherColleges ? "Colleges for Selected Roadmap" : "Explore Top Colleges"}
        </h2>
        <p className="text-center text-gray-600 max-w-xl mx-auto">
          {isRoadmapMode && !showOtherColleges
            ? "Tech colleges that offer programs related to your selected roadmap."
            : "Find the best colleges with outstanding programs and excellent learning opportunities."}
        </p>
      </div>

      {isLoading ? (
        <div className="mt-10 px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <LoadingCard key={index} />
          ))}
        </div>
      ) : searchCollegeData.results?.length === 0 ? (
        <div className="flex justify-center items-center flex-col mt-10 space-y-4">
          <img
            src={dataNotFound || "/placeholder.svg"}
            alt="No colleges found"
            className="w-40 sm:w-56 md:w-64 lg:w-72 xl:w-80 object-contain"
          />
          <h1 className="text-red-700 text-xl font-semibold">
            {isRoadmapMode && !showOtherColleges ? "No Colleges Available for This Roadmap" : "No College Data Found"}
          </h1>
          <p className="text-gray-600 text-center max-w-md">
            {isRoadmapMode && !showOtherColleges
              ? "We couldn't find any colleges that match your selected roadmap. Try exploring other available colleges."
              : "No colleges match your current search criteria. Try adjusting your filters or search terms."}
          </p>
          <button
            onClick={handleShowOtherColleges}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
          >
            Search Other Colleges
          </button>
        </div>

//         <div className="flex justify-center items-center flex-col mt-10 space-y-4">
//   <img
//     src={dataNotFound || "/placeholder.svg"}
//     alt="No colleges found"
//     className="w-40 sm:w-56 md:w-64 lg:w-72 xl:w-80 object-contain"
//   />
//   <h1 className="text-red-700 text-xl font-semibold text-center">
//     {isRoadmapMode && !showOtherColleges
//       ? "No Colleges Available for This Roadmap"
//       : "No College Data Found"}
//   </h1>
//   <p className="text-gray-600 text-center max-w-md">
//     {isRoadmapMode && !showOtherColleges
//       ? "We couldn't find any colleges that match your selected roadmap. Try exploring other available colleges."
//       : "No colleges match your current search criteria. Try adjusting your filters or search terms."}
//   </p>

//   <button
//     onClick={handleShowOtherColleges}
//     className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
//   >
//     Search Other Colleges
//   </button>

//   {/* ✅ WhatsApp Info Section */}
//   <div className="bg-gradient-to-br from-green-50 to-white p-6 rounded-xl border border-green-100 shadow-sm text-center mt-6 w-full max-w-xl">
//     <p className="text-gray-700 text-base mb-3 leading-relaxed">
//       ❌ <span className="font-semibold">No colleges found</span> matching your criteria.
//       <br />
//       📲 <span className="font-medium">For latest updates and guidance,</span> join our
//       official WhatsApp group!
//     </p>

//     <div className="mt-4 flex justify-center">
//       <a
//         href="https://whatsapp.com/channel/0029VbADrN54IBh95nFJiR3e"
//         target="_blank"
//         rel="noopener noreferrer"
//         className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-5 py-2.5 rounded-full shadow-md transition-all"
//       >
//         <FaWhatsapp size={20} />
//         Join WhatsApp
//       </a>
//     </div>
//   </div>
// </div>

      ) : (
        <div className="mt-10 px-4">
          {isRoadmapMode && !showOtherColleges && (
            <div className="flex justify-center mb-6">
              <button
                onClick={handleShowOtherColleges}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
              >
                Show Other Colleges
              </button>
            </div>
          )}

          <InfiniteScroll
            dataLength={searchCollegeData.results.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={
              <div className="flex justify-center my-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                  {[...Array(3)].map((_, index) => (
                    <LoadingCard key={`scroll-loading-${index}`} />
                  ))}
                </div>
              </div>
            }
            endMessage={<p className="text-center my-8 text-gray-500">You've seen all available colleges</p>}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchCollegeData.results.map((college, index) => (
                <div
                  key={`${college._id}-${index}`}
                  className="bg-white shadow-lg rounded-lg overflow-hidden hover:scale-105 transition-transform duration-200 cursor-pointer"
                  // onClick={() => navigate(`/college/${college._id}`)}
                  // onClick={() => navigate(`/college/${college._id}`, { state: { status: true } })}
                  onClick={() => handleCollegeClick(college)}

                >
                  <div className="relative w-full h-48 overflow-hidden rounded-t-lg">
                    <img
                      src={college.image ? `${BACKEND_SERVER_IP}${college.image}` : ""}
                      alt={college.collegeName || "College Image"}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      onError={(e) => {
                        e.target.onerror = null
                        e.target.style.display = "none"
                        e.target.parentNode.style.background = "linear-gradient(to right, #667eea, #764ba2)"
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
                    <h3 className="text-xl font-semibold">{college.collegeName}</h3>
                    <p className="text-gray-500 text-sm mt-1 flex items-center gap-1">
                      <span className="w-10 h-10 flex items-center justify-start text-red-500">
                        <FaLocationDot className="w-5 h-5" />
                      </span>
                      {college?.address?.[0]?.state}
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
                      {college.category && (
                        <span className="bg-green-100 text-green-600 text-xs font-semibold px-3 py-1 rounded-full">
                          {college.category}
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
          </InfiniteScroll>
        </div>
      )}
{showOtpPopup && (
  <OtpLoginPopup onClose={() => setShowOtpPopup(false)} collegeId={selectedCollegeId} />
)}


    </>
  )
}

export default MultiCards
