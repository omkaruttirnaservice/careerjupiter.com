


// import { useNavigate } from "react-router-dom";
// import UniversityCard from "./UniversityCard";
// import LoadingCard from "../loading-skeleton/LoadingCard";
// import UniversitySearchBar from "../SearchComp/UniversitySearchBar";
// import dataNotFound from "../../assets/images/dataNotFound.jpg";
// import { useState } from "react";

// const UniversityMultiCard = () => {
//   const navigate = useNavigate();
//   const [query, setQuery] = useState("");
//   const [searchUniversityData, setSearchUniversityData] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
  
//   return (
//     <>
//       <UniversitySearchBar
//         setQuery={setQuery}
//         query={query}
//         setSearchUniversityData={setSearchUniversityData}
//         setIsLoading={setIsLoading}
//       />
      
//       <div className="mt-18 px-4">
//         <h2 className="text-3xl font-bold text-center mb-6">
//           Explore Top Universities
//         </h2>
//         <p className="text-center text-gray-600 max-w-xl mx-auto">
//           Find the best universities with outstanding programs and excellent learning
//           opportunities.
//         </p>
//       </div>

//         <div className="">
//         {isLoading ? (
//           <div className="mt-10 px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {[...Array(6)].map((_, index) => (
//               <LoadingCard key={index} />
//             ))}
//           </div>
//         ) : searchUniversityData?.results?.length > 0 ? (
//           <div className="cursor-pointer grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 m-5">
//             {searchUniversityData.results.map((university, index) => (
//               <UniversityCard
//                 university={university}
//                 key={university.id || university._id || index}
//                 onClick={() => navigate(`/university/${university._id}`)}
//               />
//             ))}
            
//           </div>
//         ) : (
//           <div className="flex justify-center items-center flex-col mt-5">
//             <img
//               src={dataNotFound}
//               alt="No universities found"
//               className="w-40 sm:w-56 md:w-64 lg:w-72 xl:w-80 object-contain"
//             />
//             <h1 className="text-red-700">No University Data Found</h1>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default UniversityMultiCard;


import { useNavigate } from "react-router-dom"
import UniversityCard from "./UniversityCard"
import LoadingCard from "../loading-skeleton/LoadingCard"
import UniversitySearchBar from "../SearchComp/UniversitySearchBar"
import dataNotFound from "../../assets/images/dataNotFound.jpg"
import { useState, useRef } from "react"
import InfiniteScroll from "react-infinite-scroll-component"

const UniversityMultiCard = () => {
  const navigate = useNavigate()
  const [query, setQuery] = useState("")
  const [searchUniversityData, setSearchUniversityData] = useState({ results: [], pagination: null })
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [newItemsCount, setNewItemsCount] = useState(0)
  const lastLoadedRef = useRef(null)

  const fetchMoreData = async () => {
    if (isLoadingMore || !hasMore) return

    setIsLoadingMore(true)

    try {
      // Import your API function
      const { GetSearchUniversity } = await import("../SearchComp/Api")
      const nextPage = currentPage + 1

      // Get current search params from the search bar
      const response = await GetSearchUniversity({
        searchKey: query || "",
        category: "",
        type: "university",
        dist: "",
        page: nextPage,
        limit: 50,
      })

      console.log("Fetched more data:", response)

      // Ensure loading indicator shows for at least 1.5 seconds
      await new Promise((resolve) => setTimeout(resolve, 1500))

      if (response && response.results && response.results.length > 0) {
        const newItemsCount = response.results.length
        setNewItemsCount(newItemsCount)

        setSearchUniversityData((prev) => ({
          results: [...prev.results, ...response.results],
          pagination: response.pagination,
        }))
        setCurrentPage(nextPage)

        // Check if we have more pages
        if (nextPage >= response.pagination.totalPages) {
          setHasMore(false)
        }

        // Scroll to the first new item after a short delay
        setTimeout(() => {
          if (lastLoadedRef.current) {
            lastLoadedRef.current.scrollIntoView({ behavior: "smooth", block: "center" })
          }

          // Reset new items count after 3 seconds
          setTimeout(() => {
            setNewItemsCount(0)
          }, 3000)
        }, 100)
      } else {
        setHasMore(false)
      }
    } catch (error) {
      console.error("Error fetching more data:", error)
      setHasMore(false)
    } finally {
      setIsLoadingMore(false)
    }
  }

  // Enhanced loading component for infinite scroll
  // const InfiniteScrollLoader = () => (
  //   <div className="flex flex-col items-center justify-center py-6 bg-gray-50 rounded-lg shadow-sm my-4 w-full">
  //     <div className="flex space-x-3">
  //       <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
  //       <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
  //       <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
  //     </div>
  //     <span className="mt-3 text-base font-medium text-gray-700">Loading more universities...</span>
  //     <span className="text-sm text-gray-500 mt-1">Please wait</span>
  //   </div>
  

  return (
    <>
      <UniversitySearchBar
        setQuery={setQuery}
        query={query}
        setSearchUniversityData={setSearchUniversityData}
        setIsLoading={setIsLoading}
      />

      <div className="mt-18 px-4">
        <h2 className="text-3xl font-bold text-center mb-6">Explore Top Universities</h2>
        <p className="text-center text-gray-600 max-w-xl mx-auto">
          Find the best universities with outstanding programs and excellent learning opportunities.
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
          <InfiniteScroll
            dataLength={searchUniversityData.results.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<LoadingCard />}
            endMessage={
              <div className="text-center py-8">
                <p className="text-gray-500 text-lg">🎉 You have seen all universities!</p>
              </div>
            }
            refreshFunction={() => {
              setCurrentPage(1)
              setHasMore(true)
              setSearchUniversityData({ results: [], pagination: null })
              setIsLoading(true)
            }}
            pullDownToRefresh={true}
            pullDownToRefreshThreshold={50}
            pullDownToRefreshContent={<h3 style={{ textAlign: "center" }}>&#8595; Pull down to refresh</h3>}
            releaseToRefreshContent={<h3 style={{ textAlign: "center" }}>&#8593; Release to refresh</h3>}
          >
            <div className="cursor-pointer grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 m-5">
              {searchUniversityData.results.map((university, index) => {
                // Calculate if this is a newly loaded item
                const isNewItem = searchUniversityData.results.length - index <= newItemsCount
                const isLastNewItem = searchUniversityData.results.length - index === newItemsCount

                return (
                  <div
                    key={university.id || university._id || index}
                    ref={isLastNewItem ? lastLoadedRef : null}
                    className={`transition-all duration-500 ${isNewItem ? "animate-pulse-once" : ""}`}
                  >
                    <UniversityCard
                      university={university}
                      onClick={() => navigate(`/university/${university._id}`)}
                      isNewItem={isNewItem}
                    />
                  </div>
                )
              })}
            </div>

            {isLoadingMore && (
              <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg z-50 flex items-center">
                <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                Loading new universities...
              </div>
            )}
          </InfiniteScroll>
        ) : (
          <div className="flex justify-center items-center flex-col mt-5">
            <img
              src={dataNotFound || "/placeholder.svg"}
              alt="No universities found"
              className="w-40 sm:w-56 md:w-64 lg:w-72 xl:w-80 object-contain"
            />
            <h1 className="text-red-700">No University Data Found</h1>
          </div>
        )}
      </div>
    </>
  )
}

export default UniversityMultiCard
