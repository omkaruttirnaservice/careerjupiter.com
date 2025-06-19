
import { useNavigate, useLocation } from "react-router-dom"
import InstituteCard from "./InstituteCard"
import LoadingCard from "../loading-skeleton/LoadingCard"
import ClassSearchBar from "./../SearchComp/ClassSearchBar"
import dataNotFound from "../../assets/images/dataNotFound.jpg"
import { useState, useEffect } from "react"
import InfiniteScroll from "react-infinite-scroll-component"
import { GetSearchClass } from "../SearchComp/Api"
import { useSearchParams } from "react-router-dom"

const InstituteMultiCard = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [params] = useSearchParams()
  const roadmapIdFromURL = params.get("roadmap")

  const [query, setQuery] = useState("")
  const [searchClassData, setSearchClassData] = useState({
    results: [],
    pagination: {
      currentPage: 1,
      totalResults: 0,
      hasNextPage: false,
    },
  })
  const [isLoading, setIsLoading] = useState(true)
  const [hasNextPage, setHasNextPage] = useState(false)
  const [fetchNextPage, setFetchNextPage] = useState(() => () => {})
  const [isFetchingNextPage, setIsFetchingNextPage] = useState(false)
  const [page, setPage] = useState(1)

  const [searchParams, setSearchParams] = useState({
    searchKey: "",
    category: "",
    type: "class",
    dist: "",
    roadmap: roadmapIdFromURL || "",
  })

  const [isRoadmapMode, setIsRoadmapMode] = useState(!!roadmapIdFromURL)
  const [showOtherClasses, setShowOtherClasses] = useState(false)

  
  useEffect(() => {
    if (roadmapIdFromURL && !showOtherClasses) {
      setIsRoadmapMode(true)
      const roadmapParams = {
        searchKey: "",
        category: "", 
        type: "class",
        dist: "",
roadmap: roadmapIdFromURL,       }

      setSearchParams(roadmapParams)
      fetchClassData(roadmapParams, 1)
    } else if (!roadmapIdFromURL) {
      // No roadmap in URL, load all classes
      setIsRoadmapMode(false)
      const defaultParams = {
        searchKey: "",
        category: "",
        type: "class",
        dist: "",
        roadmap: "",
      }
      setSearchParams(defaultParams)
      fetchClassData(defaultParams, 1)
    }
  }, [roadmapIdFromURL, showOtherClasses])

  const fetchClassData = async (params, pageNum = 1) => {
    try {
      setIsLoading(true)

      const apiParams = {
        searchKey: params.searchKey || "",
        category: params.category || "",
        type: params.type || "class",
        dist: params.dist || "",
        roadmap: params.roadmap || "", 
        page: pageNum,
        limit: 50,
      }

      // console.log("API Params being sent:", apiParams) // Debug log

      const response = await GetSearchClass(apiParams)

      // console.log("API Response:", response) // Debug log

      // Handle the response structure
      const responseData = response.data || response
      const filteredResults = responseData.results || responseData || []

      const filteredResponse = {
        results: filteredResults,
        pagination: {
          currentPage: responseData.currentPage || pageNum,
          totalResults: responseData.totalResults || filteredResults.length,
          hasNextPage: responseData.hasNextPage || false,
        },
      }

      if (pageNum === 1) {
        setSearchClassData(filteredResponse)
        setPage(filteredResponse.pagination?.currentPage || 1)
      } else {
        setSearchClassData((prevData) => ({
          ...filteredResponse,
          results: [...prevData.results, ...filteredResults],
        }))
        setPage(pageNum)
      }

      setHasNextPage(filteredResponse.pagination?.hasNextPage || false)
      setIsLoading(false)
    } catch (error) {
      console.error("Failed to fetch class data:", error)
      setIsLoading(false)
      setSearchClassData({ results: [], pagination: {} })
    }
  }

  const fetchMoreData = async () => {
    if (!hasNextPage) {
      return
    }

    const nextPage = page + 1
    await fetchClassData(searchParams, nextPage)
  }

  // Handle search parameters update from search bar
   const handleSearchParamsUpdate = (params) => {
    // ✅ If in roadmap mode and not showing other classes, preserve roadmap
    const updatedParams = {
      ...params,
      roadmap: isRoadmapMode && !showOtherClasses ? roadmapIdFromURL : params.roadmap || "",
    }

    console.log("Updated search params:", updatedParams) // Debug log

    setSearchParams(updatedParams)
    fetchClassData(updatedParams, 1)
  }

  // Handle new search data from search bar
  const handleNewSearchData = (data) => {
    setSearchClassData(data)
    setHasNextPage(data.pagination?.hasNextPage || false)
    setPage(data.pagination?.currentPage || 1)
  }

  // Show other classes (remove roadmap filter)
  const handleShowOtherClasses = () => {
    setShowOtherClasses(true)
    setIsRoadmapMode(false)

    // Load all classes without roadmap filter
    const allClassesParams = {
      searchKey: "",
      category: "",
      type: "class",
      dist: "",
      roadmap: "",
    }

    setSearchParams(allClassesParams)
    fetchClassData(allClassesParams, 1)
  }

  // Check if no results for roadmap
  const isNoResultsForRoadmap =
    isRoadmapMode && !showOtherClasses && searchClassData.results?.length === 0 && !isLoading

  return (
    <>
      <ClassSearchBar
        setQuery={setQuery}
        query={query}
        setSearchClassData={handleNewSearchData}
        setIsLoading={setIsLoading}
        setHasNextPage={setHasNextPage}
        setFetchNextPage={setFetchNextPage}
        setIsFetchingNextPage={setIsFetchingNextPage}
        onSearchParamsUpdate={handleSearchParamsUpdate}
        hideRoadmapFilter={isRoadmapMode && !showOtherClasses}
        currentRoadmapId={roadmapIdFromURL}
      />

      <div className="mt-18 px-4">
        <h2 className="text-3xl font-bold text-center mb-6">
          {isRoadmapMode && !showOtherClasses ? "Classes for Selected Roadmap" : "Explore Top Classes"}
        </h2>
        <p className="text-center text-gray-600 max-w-xl mx-auto">
          {isRoadmapMode && !showOtherClasses
            ? "Classes that offer programs related to your selected roadmap..."
            : "Find the best classes with outstanding programs and excellent learning opportunities."}
        </p>
      </div>

      <div className="">
        {isLoading ? (
          <div className="mt-10 px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <LoadingCard key={index} />
            ))}
          </div>
        ) : searchClassData?.results?.length === 0 ? (
          <div className="flex justify-center items-center flex-col mt-10 space-y-4">
            <img
              src={dataNotFound || "/placeholder.svg"}
              alt="No classes found"
              className="w-40 sm:w-56 md:w-64 lg:w-72 xl:w-80 object-contain"
            />
            <h1 className="text-red-700 text-xl font-semibold">
              {isRoadmapMode && !showOtherClasses ? "No Classes Available for This Roadmap" : "No Class Data Found"}
            </h1>
            <p className="text-gray-600 text-center max-w-md">
              {isRoadmapMode && !showOtherClasses
                ? "We couldn't find any classes that match your selected roadmap. Try exploring other available classes."
                : "No classes match your current search criteria. Try adjusting your filters or search terms."}
            </p>
            <button
              onClick={handleShowOtherClasses}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              Search Other Classes
            </button>
          </div>
        ) : (
          <>
            {isRoadmapMode && !showOtherClasses && (
              <div className="flex justify-center mb-6">
                <button
                  onClick={handleShowOtherClasses}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                >
                  Show Other Classes
                </button>
              </div>
            )}

            <InfiniteScroll
              dataLength={searchClassData.results.length}
              next={fetchMoreData}
              hasMore={hasNextPage}
              loader={<LoadingCard />}
              endMessage={
                <div className="text-center py-8">
                  <p className="text-gray-500 text-lg">🎉 You've seen all the classes!</p>
                </div>
              }
            >
              <div className="cursor-pointer grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 m-5">
                {searchClassData.results.map((each, index) => (
                  <InstituteCard
                    institute={each}
                    key={each?.id || each?._id || `institute-${index}`}
                    onClick={() => navigate(`/class/${each._id}`)}
                  />
                ))}
              </div>
            </InfiniteScroll>
          </>
        )}
      </div>
    </>
  )
}

export default InstituteMultiCard
