// // import { useNavigate } from "react-router-dom";
// // import InstituteCard from "./InstituteCard";
// // import LoadingCard from "../loading-skeleton/LoadingCard";
// // import ClassSearchBar from "./../SearchComp/ClassSearchBar";
// // import dataNotFound from "../../assets/images/dataNotFound.jpg";
// // import { useState } from "react";

// // const InstituteMultiCard = () => {
// //   const navigate = useNavigate();
// //   const [query , setQuery] = useState("");
// //   const [searchClassData, setSearchClassData] = useState([]);
// //   const [isLoading, setIsLoading] = useState(true);

// //   return (
// //     <>
// //       <ClassSearchBar
// //         setQuery={setQuery}
// //         query={query}
// //         setSearchClassData={setSearchClassData}
// //         setIsLoading={setIsLoading}
// //       />
// //       <div className="mt-18 px-4">
// //         <h2 className="text-3xl font-bold text-center mb-6">
// //           Explore Top Class
// //         </h2>
// //         <p className="text-center text-gray-600 max-w-xl mx-auto">
// //           Find the best classes with outstanding programs and excellent learning
// //           opportunities.
// //         </p>
// //       </div>
// //       {/* <TagsSection tags={tags} /> */}

// //       <div className="">
// //         {/* {isLoading && <Loader />} */}

// //         {isLoading ? (
// //           <div className="mt-10 px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
// //             {[...Array(6)].map((_, index) => (
// //               <LoadingCard key={index} />
// //             ))}
// //           </div>
// //         ) : searchClassData.results?.length > 0 ? (
// //           <div className="cursor-pointer grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 m-5">
// //             {
// //               searchClassData.results?.map((each, index) => (
// //                 <InstituteCard
// //                   institute={each}
// //                   key={each.id || each._id || index} // ✅ Ensures a unique key
// //                   onClick={() => navigate(`/class/${each._id}`)}
// //                 />
// //               ))}
// //           </div>
// //         ) : (
// //           <div className="flex justify-center items-center flex-col mt-5">
// //             <img
// //               src={dataNotFound}
// //               alt="No image found"
// //               className="w-40 sm:w-56 md:w-64 lg:w-72 xl:w-80 object-contain"
// //             />
// //             <h1 className="text-red-700">No Class Data Found</h1>
// //           </div>
// //         )}
// //       </div>
// //     </>
// //   );
// // };

// // export default InstituteMultiCard;

// "use client"

// import { useNavigate } from "react-router-dom"
// import InstituteCard from "./InstituteCard"
// import LoadingCard from "../loading-skeleton/LoadingCard"
// import ClassSearchBar from "./../SearchComp/ClassSearchBar"
// import dataNotFound from "../../assets/images/dataNotFound.jpg"
// import { useState } from "react"
// import InfiniteScroll from "react-infinite-scroll-component"

// const InstituteMultiCard = () => {
//   const navigate = useNavigate()
//   const [query, setQuery] = useState("")
//   const [searchClassData, setSearchClassData] = useState({ results: [] })
//   const [isLoading, setIsLoading] = useState(true)
//   const [hasNextPage, setHasNextPage] = useState(false)
//   const [fetchNextPage, setFetchNextPage] = useState(() => () => {})
//   const [isFetchingNextPage, setIsFetchingNextPage] = useState(false)

//   return (
//     <>
//       <ClassSearchBar
//         setQuery={setQuery}
//         query={query}
//         setSearchClassData={setSearchClassData}
//         setIsLoading={setIsLoading}
//         setHasNextPage={setHasNextPage}
//         setFetchNextPage={setFetchNextPage}
//         setIsFetchingNextPage={setIsFetchingNextPage}
//       />
//       <div className="mt-18 px-4">
//         <h2 className="text-3xl font-bold text-center mb-6">Explore Top Class</h2>
//         <p className="text-center text-gray-600 max-w-xl mx-auto">
//           Find the best classes with outstanding programs and excellent learning opportunities.
//         </p>
//       </div>

//       <div className="">
//         {isLoading ? (
//           <div className="mt-10 px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {[...Array(6)].map((_, index) => (
//               <LoadingCard key={index} />
//             ))}
//           </div>
//         ) : searchClassData?.results?.length > 0 ? (
//           <InfiniteScroll
//             dataLength={searchClassData.results.length}
//             next={fetchNextPage}
//             hasMore={hasNextPage}
//             loader={
//               <div className="mt-4 px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {[...Array(3)].map((_, index) => (
//                   <LoadingCard key={`loading-${index}`} />
//                 ))}
//               </div>
//             }
//             endMessage={
//               <div className="text-center py-8">
//                 <p className="text-gray-500 text-lg">🎉 You've seen all the classes!</p>
//               </div>
//             }
//             refreshFunction={() => window.location.reload()}
//             pullDownToRefresh
//             pullDownToRefreshThreshold={50}
//             pullDownToRefreshContent={<h3 style={{ textAlign: "center" }}>&#8595; Pull down to refresh</h3>}
//             releaseToRefreshContent={<h3 style={{ textAlign: "center" }}>&#8593; Release to refresh</h3>}
//           >
//             <div className="cursor-pointer grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 m-5">
//               {searchClassData.results
//                 ?.filter((each) => each && (each.id || each._id))
//                 ?.map((each, index) => (
//                   <InstituteCard
//                     institute={each}
//                     key={each.id || each._id || `institute-${index}`}
//                     onClick={() => navigate(`/class/${each._id}`)}
//                   />
//                 ))}
//             </div>
//           </InfiniteScroll>
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

import { useNavigate } from "react-router-dom";
import InstituteCard from "./InstituteCard";
import LoadingCard from "../loading-skeleton/LoadingCard";
import ClassSearchBar from "./../SearchComp/ClassSearchBar";
import dataNotFound from "../../assets/images/dataNotFound.jpg";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const InstituteMultiCard = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [searchClassData, setSearchClassData] = useState({ results: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [fetchNextPage, setFetchNextPage] = useState(() => () => {});
  const [isFetchingNextPage, setIsFetchingNextPage] = useState(false);

  // Debug logging
  console.log("Current searchClassData:", searchClassData);
  console.log("Is loading:", isLoading);
  console.log("Results length:", searchClassData?.results?.length);

  return (
    <>
      <ClassSearchBar
        setQuery={setQuery}
        query={query}
        setSearchClassData={setSearchClassData}
        setIsLoading={setIsLoading}
        setHasNextPage={setHasNextPage}
        setFetchNextPage={setFetchNextPage}
        setIsFetchingNextPage={setIsFetchingNextPage}
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

      <div className="">
        {isLoading ? (
          <div className="mt-10 px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <LoadingCard key={index} />
            ))}
          </div>
        ) : searchClassData?.results?.length > 0 ? (
          <InfiniteScroll
            dataLength={searchClassData.results.length}
            next={() => {
              console.log("Fetching next page...");
              fetchNextPage();
            }}
            hasMore={hasNextPage}
            loader={
              // <div className="mt-4 px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              //   {[...Array(3)].map((_, index) => (
              //     <LoadingCard key={`loading-${index}`} />
              //   ))}
              // </div>
              <LoadingCard/>
            }
            endMessage={
              <div className="text-center py-8">
                <p className="text-gray-500 text-lg">
                  🎉 You've seen all the classes!
                </p>
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
        ) : (
          <div className="flex justify-center items-center flex-col mt-5">
            <img
              src={dataNotFound || "/placeholder.svg"}
              alt="No image found"
              className="w-40 sm:w-56 md:w-64 lg:w-72 xl:w-80 object-contain"
            />
            <h1 className="text-red-700">No Class Data Found</h1>
            <p className="text-gray-500 mt-2">
              Try adjusting your search filters
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default InstituteMultiCard;
