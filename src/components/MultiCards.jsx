// import { useNavigate } from "react-router-dom";
// import { BACKEND_SERVER_IP } from "../Constant/constantData";
// import LoadingCard from "./loading-skeleton/LoadingCard";
// import CollegeSearchBar from "./SearchComp/CollegeSearchBar";
// import { useState } from "react";
// import dataNotFound from "../assets/images/dataNotFound.jpg";
// import { FaLocationDot } from "react-icons/fa6";

// const MultiCards = () => {
//   const navigate = useNavigate();
//    const [searchCollegeData, setSearchCollegeData] = useState([]);
//    const [isLoading , setIsLoading] = useState(true);

   

//   return (
//     <>
//       <CollegeSearchBar
//         setSearchCollegeData={setSearchCollegeData}
//         setIsLoading={setIsLoading}
//       />

//       <div className="mt-20 px-4">
//         <h2 className="text-3xl font-bold text-center mb-6">
//           Explore Top Colleges
//         </h2>
//         <p className="text-center text-gray-600 max-w-xl mx-auto">
//           Find the best colleges with outstanding programs and excellent
//           learning opportunities.
//         </p>
//       </div>
//       {/* <TagsSection tags={tags} /> */}

//       {isLoading ? (
//         <div className="mt-10 px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {[...Array(6)].map((_, index) => (
//             <LoadingCard key={index} />
//           ))}
//         </div>
//       ) : searchCollegeData.results?.length > 0 ? (
//         <div className="mt-10 px-4">
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {searchCollegeData.results.map((college, index) => (
//               <div
//                 key={index}
//                 className="bg-white shadow-lg rounded-lg overflow-hidden hover:scale-105 transition-transform duration-200 cursor-pointer"
//                 onClick={() => navigate(`/college/${college._id}`)}
//               >
//                 <div className="relative w-full h-48 overflow-hidden rounded-t-lg">
//                   <img
//                     src={
//                       college.image
//                         ? `${BACKEND_SERVER_IP}${college.image}`
//                         : ""
//                     }
//                     alt={college.collegeName || "College Image"}
//                     className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
//                     onError={(e) => {
//                       e.target.onerror = null;
//                       e.target.style.display = "none";
//                       e.target.parentNode.style.background =
//                         "linear-gradient(to right, #667eea, #764ba2)";
//                     }}
//                   />
//                   {!college.image && (
//                     <div className="absolute inset-0 flex items-center justify-center">
//                       <h3 className="text-white text-xl font-bold text-center px-4">
//                         {college.collegeName || "Unknown College"}
//                       </h3>
//                     </div>
//                   )}
//                 </div>
//                 <div className="p-5">
//                   <h3 className="text-xl font-semibold">
//                     {college.collegeName}
//                   </h3>
//                   <p className="text-gray-500 text-sm mt-1 flex items-center gap-1">
//                     <span className="w-10 h-10 flex items-center justify-start text-red-500">
//                       <FaLocationDot className="w-5 h-5" />
//                     </span>
//                     {college?.address[0]?.state}
//                   </p>
//                   <p className="text-gray-600 mt-2 text-sm line-clamp-3">
//                     {college.info?.description || "No description available."}
//                   </p>
//                   <div className="flex flex-wrap gap-2 mt-1">
//                     {college.tags?.map((tag, i) => (
//                       <span
//                         key={i}
//                         className="bg-gray-200 text-gray-700 text-xs font-semibold px-3 py-1 rounded-full"
//                       >
//                         {tag}
//                       </span>
//                     ))}
//                   </div>
//                   <div className="flex flex-wrap gap-2 mt-1">
//                     <span className="bg-blue-100 text-blue-600 text-xs font-semibold px-3 py-1 rounded-full">
//                       {college.collegeType}
//                     </span>
//                     {college.Category && (
//                       <span className="bg-green-100 text-green-600 text-xs font-semibold px-3 py-1 rounded-full">
//                         {college.Category}
//                       </span>
//                     )}
//                     {college.accreditation && (
//                       <span className="bg-purple-100 text-purple-600 text-xs font-semibold px-3 py-1 rounded-full">
//                         {college.accreditation}
//                       </span>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       ) : (
//         <div className="flex justify-center items-center flex-col mt-10">
//           <img
//             src={dataNotFound}
//             alt="No image found"
//             className="w-40 sm:w-56 md:w-64 lg:w-72 xl:w-80 object-contain"
//           />
//           <h1 className="text-red-700">No College Data Found</h1>
//         </div>
//       )}
//     </>
//   );
// };

// export default MultiCards;




import { useNavigate } from "react-router-dom";
import { BACKEND_SERVER_IP } from "../Constant/constantData";
import LoadingCard from "./loading-skeleton/LoadingCard";
import CollegeSearchBar from "./SearchComp/CollegeSearchBar";
import { useState, useEffect } from "react";
import dataNotFound from "../assets/images/dataNotFound.jpg";
import { FaLocationDot } from "react-icons/fa6";
import InfiniteScroll from "react-infinite-scroll-component";
import { GetSearchCollege } from "./SearchComp/Api";

const MultiCards = () => {
  const navigate = useNavigate();
  const [searchCollegeData, setSearchCollegeData] = useState({
    results: [],
    pagination: {
      currentPage: 2,
      perPage: 50,
      totalResults: 0,
      totalPages: 0
    }
  });
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchParams, setSearchParams] = useState({
    searchKey: "",
    category: "",
    type: "college",
    dist: "",
    roadmap: ""
  });

  const fetchMoreData = async () => {
    if (page >= searchCollegeData.pagination?.totalPages) {
      setHasMore(false);
      return;
    }

    try {
      const nextPage = page + 1;
      const response = await GetSearchCollege({
        ...searchParams,
        page: nextPage
      });

      if (response?.data?.results) {
        setSearchCollegeData(prevData => ({
          ...response.data,
          results: [...prevData.results, ...response.data.results]
        }));
        setPage(nextPage);
      }
    } catch (error) {
      console.error("Error fetching more colleges:", error);
    }
  };

  // Update search parameters from CollegeSearchBar
  const handleSearchParamsUpdate = (params) => {
    setSearchParams(params);
    setPage(1);
    setHasMore(true);
  };

  // Reset data when new search is performed
  const handleNewSearchData = (data) => {
    setSearchCollegeData(data);
    setHasMore(data.pagination?.currentPage < data.pagination?.totalPages);
    setPage(data.pagination?.currentPage || 1);
  };

  return (
    <>
      <CollegeSearchBar
        setSearchCollegeData={handleNewSearchData}
        setIsLoading={setIsLoading}
        onSearchParamsUpdate={handleSearchParamsUpdate}
      />

      <div className="mt-20 px-4">
        <h2 className="text-3xl font-bold text-center mb-6">
          Explore Top Colleges
        </h2>
        <p className="text-center text-gray-600 max-w-xl mx-auto">
          Find the best colleges with outstanding programs and excellent
          learning opportunities.
        </p>
      </div>

      {isLoading ? (
        <div className="mt-10 px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <LoadingCard key={index} />
          ))}
        </div>
      ) : searchCollegeData.results?.length > 0 ? (
        <div className="mt-10 px-4">
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
            endMessage={
              <p className="text-center my-8 text-gray-500">
                You've seen all available colleges
              </p>
            }
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchCollegeData.results.map((college, index) => (
                <div
                  key={`${college._id}-${index}`}
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
          </InfiniteScroll>
        </div>
      ) : (
        <div className="flex justify-center items-center flex-col mt-10">
          <img
            src={dataNotFound || "/placeholder.svg"}
            alt="No image found"
            className="w-40 sm:w-56 md:w-64 lg:w-72 xl:w-80 object-contain"
          />
          <h1 className="text-red-700">No College Data Found</h1>
        </div>
      )}
    </>
  );
};

export default MultiCards;
