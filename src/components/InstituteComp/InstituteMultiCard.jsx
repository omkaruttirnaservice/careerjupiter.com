import { useNavigate } from "react-router-dom";
import InstituteCard from "./InstituteCard";
import LoadingCard from "../loading-skeleton/LoadingCard";
import ClassSearchBar from "./../SearchComp/ClassSearchBar";
import dataNotFound from "../../assets/images/dataNotFound.jpg";
import { useState } from "react";

const InstituteMultiCard = () => {
  const navigate = useNavigate();
  const [query , setQuery] = useState("");
  const [searchClassData, setSearchClassData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  return (
    <>
      <ClassSearchBar
        setQuery={setQuery}
        query={query}
        setSearchClassData={setSearchClassData}
        setIsLoading={setIsLoading}
      />
      <div className="mt-18 px-4">
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
        ) : searchClassData.results?.length > 0 ? (
          <div className="cursor-pointer grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 m-5">
            {
              searchClassData.results?.map((each, index) => (
                <InstituteCard
                  institute={each}
                  key={each.id || each._id || index} // ✅ Ensures a unique key
                  onClick={() => navigate(`/class/${each._id}`)}
                />
              ))}
          </div>
        ) : (
          <div className="flex justify-center items-center flex-col mt-5">
            <img
              src={dataNotFound}
              alt="No image found"
              className="w-40 sm:w-56 md:w-64 lg:w-72 xl:w-80 object-contain"
            />
            <h1 className="text-red-700">No Class Data Found</h1>
          </div>
        )}
      </div>
    </>
  );
};

export default InstituteMultiCard;



// import { useNavigate } from "react-router-dom"
// import InstituteCard from "./InstituteCard"
// import LoadingCard from "../loading-skeleton/LoadingCard"
// import ClassSearchBar from "./../SearchComp/ClassSearchBar"
// import dataNotFound from "../../assets/images/dataNotFound.jpg"
// import { useState, useEffect, useCallback, useRef } from "react"

// const InstituteMultiCard = () => {
//   const navigate = useNavigate()
//   const [query, setQuery] = useState("")
//   const [searchClassData, setSearchClassData] = useState([])
//   const [isLoading, setIsLoading] = useState(true)
//   const [hasNextPage, setHasNextPage] = useState(false)
//   const [currentPage, setCurrentPage] = useState(1)
//   const [isLoadingMore, setIsLoadingMore] = useState(false)

//   // Ref for the loader element
//   const loaderRef = useRef(null)

//   // Function to reset pagination when search changes
//   const resetPagination = useCallback(() => {
//     setCurrentPage(1)
//     setHasNextPage(false)
//     setSearchClassData([])
//   }, [])

//   // Function to load next page
//   const loadNextPage = useCallback(() => {
//     if (!hasNextPage || isLoadingMore) return

//     setIsLoadingMore(true)
//     setCurrentPage((prev) => prev + 1)

//     // Trigger search with next page
//     // This will be handled by the search bar component
//     setTimeout(() => {
//       setIsLoadingMore(false)
//     }, 1000)
//   }, [hasNextPage, isLoadingMore])

//   // Intersection Observer for infinite scroll
//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         const target = entries[0]
//         if (target.isIntersecting && hasNextPage && !isLoading && !isLoadingMore) {
//           loadNextPage()
//         }
//       },
//       {
//         threshold: 0.1,
//         rootMargin: "100px",
//       },
//     )

//     if (loaderRef.current) {
//       observer.observe(loaderRef.current)
//     }

//     return () => {
//       if (loaderRef.current) {
//         observer.unobserve(loaderRef.current)
//       }
//     }
//   }, [hasNextPage, isLoading, isLoadingMore, loadNextPage])

//   return (
//     <>
//       <ClassSearchBar
//         setQuery={setQuery}
//         query={query}
//         setSearchClassData={setSearchClassData}
//         setIsLoading={setIsLoading}
//         setHasNextPage={setHasNextPage}
//         setCurrentPage={setCurrentPage}
//         resetPagination={resetPagination}
//       />
//       <div className="mt-18 px-4">
//         <h2 className="text-3xl font-bold text-center mb-6">Explore Top Class</h2>
//         <p className="text-center text-gray-600 max-w-xl mx-auto">
//           Find the best classes with outstanding programs and excellent learning opportunities.
//         </p>
//       </div>

//       <div className="">
//         {/* Initial Loading */}
//         {isLoading && searchClassData.length === 0 ? (
//           <div className="mt-10 px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {[...Array(6)].map((_, index) => (
//               <LoadingCard key={index} />
//             ))}
//           </div>
//         ) : searchClassData.length > 0 ? (
//           <>
//             <div className="cursor-pointer grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 m-5">
//               {searchClassData.map((each, index) => (
//                 <InstituteCard
//                   institute={each}
//                   key={each.id || each._id || `${each._id}-${index}`}
//                   onClick={() => navigate(`/class/${each._id}`)}
//                 />
//               ))}
//             </div>

//             {/* Loading more indicator */}
//             {hasNextPage && (
//               <div ref={loaderRef} className="mt-10 px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {isLoadingMore && (
//                   <>
//                     {[...Array(3)].map((_, index) => (
//                       <LoadingCard key={`loading-more-${index}`} />
//                     ))}
//                   </>
//                 )}
//               </div>
//             )}

//             {/* End of results indicator */}
//             {!hasNextPage && searchClassData.length > 0 && (
//               <div className="text-center py-8 text-gray-500">
//                 <p>You've reached the end of the results</p>
//               </div>
//             )}
//           </>
//         ) : (
//           <div className="flex justify-center items-center flex-col mt-5">
//             <img
//               src={dataNotFound || "/placeholder.svg"}
//               alt="No image found"
//               className="w-40 sm:w-56 md:w-64 lg:w-72 xl:w-80 object-contain"
//             />
//             <h1 className="text-red-700">No Class Data Found</h1>
//           </div>
//         )}
//       </div>
//     </>
//   )
// }

// export default InstituteMultiCard
