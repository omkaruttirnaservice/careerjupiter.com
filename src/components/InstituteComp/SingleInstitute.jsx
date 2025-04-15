// import { useParams } from "react-router-dom";
// import { useQuery } from "@tanstack/react-query";
// import { BASE_URL } from "../../utils/constansts";
// import { BACKEND_SERVER_IP } from "../../Constant/constantData";
// import ImageGallery from "./ImageGallery";
// import FacultyDetails from "./FacultyDetails";
// import ReviewPage from "../navComp/ReviewPage";
// import { AiOutlineBook } from "react-icons/ai";
// import { BiTimeFive } from "react-icons/bi";
// import { FaRupeeSign } from "react-icons/fa";
// import { MdOutlineDiscount } from "react-icons/md";
// import Nav from "../../Layouts/Nav";
// import { motion } from "framer-motion";
// const fetchInstitute = async (id) => {
//   const response = await fetch(`${BASE_URL}/api/class/${id}`);
//   if (!response.ok) {
//     throw new Error("Failed to fetch class details");
//   }
//   const result = await response.json();

//   if (result.success && result.data) {
//     return result.data;
//   }
//   throw new Error(result.errMsg || "Failed to fetch class details");
// };

// const fetchCourses = async (id) => {
//   const response = await fetch(`${BASE_URL}/api/class/course/${id}`);
//   const result = await response.json();
//   return result.success && result.data ? result.data : [];
// };

// const SingleInstitute = () => {
//   const { id } = useParams();
//   const {
//     data: institute,
//     error,
//     isLoading,
//   } = useQuery({
//     queryKey: ["institute", id],
//     queryFn: () => fetchInstitute(id),
//   });

//   const {
//     data: courses,
//     error: coursesError,
//     isLoading: coursesLoading,
//   } = useQuery({
//     queryKey: ["courses", id],
//     queryFn: () => fetchCourses(id),
//   });

//   if (!institute) {
//     return (
//       <p className="text-center text-gray-600 mt-8">No class details found.</p>
//     );
//   }

//   return (
//     <>
//       <Nav />
//       <div className="flex items-center justify-center bg-gray-100 relative">
//         <div className="w-full relative">
//           <div className="w-full h-auto relative">
//             {/* Background Image with Fallback */}
//             <img
//               src={
//                 institute?.class?.image
//                   ? `${BACKEND_SERVER_IP}${institute.class.image}`
//                   : "https://cdn.pixabay.com/photo/2017/09/01/13/56/university-2704306_640.jpg"
//               }
//               alt={institute?.class?.className || "Class Image"}
//               className="w-full h-auto max-h-[400px] sm:max-h-[450px] md:max-h-[500px] rounded-xl object-cover shadow-md transition-transform duration-300 ease-in-out hover:scale-105"
//               onError={(e) => {
//                 e.target.onerror = null; // Prevent infinite loop
//                 e.target.src =
//                   "https://cdn.pixabay.com/photo/2017/09/01/13/56/university-2704306_640.jpg"; // Fallback image
//               }}
//             />

//             {/* Overlay */}
//             <div className="absolute inset-0 bg-black opacity-70"></div>

//             {/* Class Name (Centered) */}
//             <div className="absolute inset-0 flex justify-center items-center px-4 text-center">
//               <h1 className="text-white text-2xl sm:text-3xl md:text-4xl  font-bold">
//                 {institute?.class?.className || "Class Name"}
//               </h1>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="w-full bg-white py-6 px-4 sm:px-6">
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.5 }}
//           className="max-w-full mx-auto"
//         >
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="space-y-4">
//               <motion.div
//                 whileHover={{ scale: 1.02 }}
//                 className="p-5 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border-l-4 border-blue-500"
//               >
//                 <div className="flex items-start">
//                   <span className="text-2xl mr-4 text-blue-500">📍</span>
//                   <div>
//                     <h3 className="font-semibold text-gray-800 mb-1">
//                       Location
//                     </h3>
//                     <p className="text-gray-600">
//                       {institute.class.address?.line1 || "N/A"},<br />
//                       {institute.class.address?.dist || "N/A"}
//                     </p>
//                   </div>
//                 </div>
//               </motion.div>
//               <motion.div
//                 whileHover={{ scale: 1.02 }}
//                 className="p-5 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border-l-4 border-green-500"
//               >
//                 <div className="flex items-start">
//                   <span className="text-2xl mr-4 text-green-500">🎓</span>
//                   <div>
//                     <h3 className="font-semibold text-gray-800 mb-1">
//                       Mode of Teaching
//                     </h3>
//                     <p className="text-gray-600">
//                       {institute.class.modeOfTeaching || "N/A"}
//                     </p>
//                   </div>
//                 </div>
//               </motion.div>

//               <motion.div
//                 whileHover={{ scale: 1.02 }}
//                 className="p-5 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border-l-4 border-purple-500"
//               >
//                 <div className="flex items-start">
//                   <span className="text-2xl mr-4 text-purple-500">🗣️</span>
//                   <div>
//                     <h3 className="font-semibold text-gray-800 mb-1">
//                       Teaching Medium
//                     </h3>
//                     <p className="text-gray-600">
//                       {institute.class.teachingMedium?.join(", ") || "N/A"}
//                     </p>
//                   </div>
//                 </div>
//               </motion.div>

//               <motion.div
//                 whileHover={{ scale: 1.02 }}
//                 className="p-5 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border-l-4 border-amber-500"
//               >
//                 <div className="flex items-start">
//                   <span className="text-2xl mr-4 text-amber-500">📚</span>
//                   <div>
//                     <h3 className="font-semibold text-gray-800 mb-1">
//                       Courses Offered
//                     </h3>
//                     <p className="text-gray-600">
//                       {institute.class.subjectsOrCourses?.join(", ") || "N/A"}
//                     </p>
//                   </div>
//                 </div>
//               </motion.div>
//             </div>

//             <div className="space-y-4">
//               <motion.div
//                 whileHover={{ scale: 1.02 }}
//                 className="p-5 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border-l-4 border-indigo-500"
//               >
//                 <div className="flex items-start">
//                   <span className="text-2xl mr-4 text-indigo-500">🏛️</span>
//                   <div>
//                     <h3 className="font-semibold text-gray-800 mb-1">
//                       Owner / Institute
//                     </h3>
//                     <p className="text-gray-600">
//                       {institute.class.ownerOrInstituteName || "N/A"}
//                     </p>
//                   </div>
//                 </div>
//               </motion.div>

//               <motion.div
//                 whileHover={{ scale: 1.02 }}
//                 className="p-5 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border-l-4 border-teal-500"
//               >
//                 <div className="flex items-start">
//                   <span className="text-2xl mr-4 text-teal-500">📞</span>
//                   <div>
//                     <h3 className="font-semibold text-gray-800 mb-1">
//                       Contact
//                     </h3>
//                     <p className="text-gray-600">
//                       {institute.class.contactDetails || "N/A"}
//                     </p>
//                   </div>
//                 </div>
//               </motion.div>

//               <motion.div
//                 whileHover={{ scale: 1.02 }}
//                 className="p-5 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border-l-4 border-red-500"
//               >
//                 <div className="flex items-start">
//                   <span className="text-2xl mr-4 text-red-500">🏷️</span>
//                   <div>
//                     <h3 className="font-semibold text-gray-800 mb-1">
//                       Franchise or Independent
//                     </h3>
//                     <p className="text-gray-600">
//                       {institute.class.franchiseOrIndependent || "N/A"}
//                     </p>
//                   </div>
//                 </div>
//               </motion.div>
//               <motion.div
//                 whileHover={{ scale: 1.02 }}
//                 className="p-5 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border-l-4 border-blue-500"
//               >
//                 <div className="flex items-start">
//                   <span className="text-2xl mr-4 text-blue-500">🌐</span>
//                   <div>
//                     <h3 className="font-semibold text-gray-800 mb-1">
//                       Website
//                     </h3>
//                     <a
//                       href={institute.class.websiteURL || "#"}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-200 inline-flex items-center"
//                     >
//                       Visit Website
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         className="h-4 w-4 ml-1"
//                         viewBox="0 0 20 20"
//                         fill="currentColor"
//                       >
//                         <path
//                           fillRule="evenodd"
//                           d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
//                           clipRule="evenodd"
//                         />
//                       </svg>
//                     </a>
//                   </div>
//                 </div>
//               </motion.div>

//               <motion.div
//                 whileHover={{ scale: 1.02 }}
//                 className="p-5 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border-l-4 border-green-500"
//               >
//                 <div className="flex items-start">
//                   <span className="text-2xl mr-4 text-green-500">📅</span>
//                   <div>
//                     <h3 className="font-semibold text-gray-800 mb-1">
//                       Established Year
//                     </h3>
//                     <p className="text-gray-600">
//                       {institute.class.yearEstablished || "N/A"}
//                     </p>
//                   </div>
//                 </div>
//               </motion.div>
//             </div>
//           </div>
//         </motion.div>
//       </div>
//       {Array.isArray(courses) && courses.length > 0 && (
//         <section className="mt-20 p-6 bg-gradient-to-r from-blue-50 to-gray-100 rounded-lg shadow-lg">
//           <h2 className="text-3xl font-extrabold mb-8 text-center text-gray-800">
//             🚀 Courses Available
//           </h2>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {courses.map((course) => (
//               <div
//                 key={course._id}
//                 className="p-6 rounded-lg bg-gray-50 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105"
//               >
//                 <h3 className="text-xl font-semibold mb-3 flex items-center">
//                   <AiOutlineBook className="mr-2 text-blue-600" />
//                   {course.courseName}
//                 </h3>
//                 <p className="text-gray-700 mb-1 flex items-center">
//                   <span className="font-medium">Type:</span> {course.courseType}
//                 </p>
//                 <p className="text-gray-700 mb-1 flex items-center">
//                   <BiTimeFive className="mr-2 text-green-600" />
//                   <span className="font-medium">Duration:</span>{" "}
//                   {course.duration}
//                 </p>
//                 <p className="text-gray-700 mb-1 flex items-center">
//                   <FaRupeeSign className="mr-2 text-yellow-600" />
//                   <span className="font-medium">Fee:</span> ₹
//                   {course.feeStructure?.amount} ({course.feeStructure?.type})
//                 </p>
//                 <p className="text-gray-700 mb-1 flex items-center">
//                   <MdOutlineDiscount className="mr-2 text-red-600" />
//                   <span className="font-medium">Scholarship:</span>{" "}
//                   {course.scholarshipOrDiscounts || "N/A"}
//                 </p>
//                 <p className="text-gray-700 flex items-center">
//                   <span className="font-medium">Study Material Provided:</span>{" "}
//                   {course.studyMaterialProvided ? "Yes" : "No"}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </section>
//       )}

//       <ImageGallery />
//       <FacultyDetails />
//       <ReviewPage />
//     </>
//   );
// };

// export default SingleInstitute;


import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../../utils/constansts";
import { BACKEND_SERVER_IP } from "../../Constant/constantData";
import ImageGallery from "./ImageGallery";
import FacultyDetails from "./FacultyDetails";
import ReviewPage from "../navComp/ReviewPage";
import { AiOutlineBook } from "react-icons/ai";
import { BiTimeFive } from "react-icons/bi";
import { FaRupeeSign } from "react-icons/fa";
import { MdOutlineDiscount, MdLocationOn } from "react-icons/md";
import { FiArrowRight } from "react-icons/fi";
import Nav from "../../Layouts/Nav";
import { motion } from "framer-motion";

const fetchInstitute = async (id) => {
  const response = await fetch(`${BASE_URL}/api/class/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch class details");
  }
  const result = await response.json();

  if (result.success && result.data) {
    return result.data;
  }
  throw new Error(result.errMsg || "Failed to fetch class details");
};

const fetchCourses = async (id) => {
  const response = await fetch(`${BASE_URL}/api/class/course/${id}`);
  const result = await response.json();
  return result.success && result.data ? result.data : [];
};

const SingleInstitute = () => {
  const { id } = useParams();

  const {
    data: institute,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["institute", id],
    queryFn: () => fetchInstitute(id),
    enabled: !!id,
  });

  const {
    data: courses,
    error: coursesError,
    isLoading: coursesLoading,
  } = useQuery({
    queryKey: ["courses", id],
    queryFn: () => fetchCourses(id),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!institute) {
    return (
      <div className="text-center text-gray-600 mt-8 p-4">
        <p className="text-xl">No class details found .</p>
      </div>
    );
  }

  const { class: instituteClass } = institute;

  return (
    <>
      <Nav />
      <div className="flex items-center justify-center bg-gray-100 relative">
        <div className="w-full relative">
          <div className="w-full h-auto relative">
            <img
              src={
                instituteClass?.image
                  ? `${BACKEND_SERVER_IP}${instituteClass.image}`
                  : "https://cdn.pixabay.com/photo/2017/09/01/13/56/university-2704306_640.jpg"
              }
              alt={instituteClass?.className || "Class Image"}
              className="w-full h-[200px] xs:h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px] object-cover shadow-md transition-transform duration-300 ease-in-out"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src =
                  "https://cdn.pixabay.com/photo/2017/09/01/13/56/university-2704306_640.jpg";
              }}
            />

            <div className="absolute inset-0 bg-black opacity-60"></div>

            <div className="absolute inset-0 flex flex-col justify-center items-center px-4 text-center">
              <h1 className="text-white text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold mb-2 md:mb-4">
                {instituteClass?.className || "Class Name"}
              </h1>
              {instituteClass?.Category?.length > 0 && (
                <div className="flex flex-wrap justify-center gap-2 mt-2">
                  {instituteClass.Category.map((category, index) => (
                    <span
                      key={index}
                      className="bg-blue-600 bg-opacity-80 text-white text-xs md:text-sm px-2 py-1 rounded-full"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="w-full bg-white py-6 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto"
        >
          {instituteClass?.info?.description && (
            <div className="mb-6 sm:mb-8 px-4 sm:px-6 md:px-8 py-5 bg-blue-50 rounded-2xl shadow-sm">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-2 sm:mb-3">
                About Us
              </h2>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                {instituteClass.info.description}
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div className="space-y-4">
              {instituteClass.address?.length > 0 && (
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="p-5 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border-l-4 border-blue-500"
                >
                  <div className="flex items-start">
                    <MdLocationOn className="h-6 w-6 mr-4 text-blue-500" />
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">
                        {instituteClass.address.length > 1
                          ? "Locations"
                          : "Location"}
                      </h3>
                      <div className="space-y-3">
                        {instituteClass.address.map((addr, index) => (
                          <div
                            key={index}
                            className={
                              index > 0 ? "pt-3 border-t border-gray-200" : ""
                            }
                          >
                            <p className="text-gray-600">
                              {addr.line1}
                              {addr.line2 && (
                                <>
                                  <br />
                                  {addr.line2}
                                </>
                              )}
                              {(addr.dist || addr.state) && (
                                <>
                                  <br />
                                  {[addr.dist, addr.state]
                                    .filter(Boolean)
                                    .join(", ")}
                                </>
                              )}
                              {addr.pincode && (
                                <>
                                  <br />
                                  PIN: {addr.pincode}
                                </>
                              )}
                              {addr.nearbyLandmarks && (
                                <span className="block mt-1 text-sm text-gray-500">
                                  <span className="font-medium">
                                    Landmarks:
                                  </span>{" "}
                                  {addr.nearbyLandmarks}
                                </span>
                              )}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {instituteClass.modeOfTeaching?.length > 0 && (
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="p-5 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border-l-4 border-green-500"
                >
                  <div className="flex items-start">
                    <span className="text-2xl mr-4 text-green-500">🎓</span>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">
                        Mode of Teaching
                      </h3>
                      <p className="text-gray-600">
                        {instituteClass.modeOfTeaching.join(", ")}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {instituteClass.teachingMedium?.length > 0 && (
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="p-5 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border-l-4 border-purple-500"
                >
                  <div className="flex items-start">
                    <span className="text-2xl mr-4 text-purple-500">🗣️</span>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">
                        Teaching Medium
                      </h3>
                      <p className="text-gray-600">
                        {instituteClass.teachingMedium.join(", ")}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {instituteClass.subjectsOrCourses?.length > 0 && (
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="p-5 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border-l-4 border-amber-500"
                >
                  <div className="flex items-start">
                    <span className="text-2xl mr-4 text-amber-500">📚</span>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">
                        Courses Offered
                      </h3>
                      <p className="text-gray-600">
                        {instituteClass.subjectsOrCourses.join(", ")}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            <div className="space-y-4">
              {instituteClass.ownerOrInstituteName && (
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="p-5 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border-l-4 border-indigo-500"
                >
                  <div className="flex items-start">
                    <span className="text-2xl mr-4 text-indigo-500">🏛️</span>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">
                        Owner / Institute
                      </h3>
                      <p className="text-gray-600">
                        {instituteClass.ownerOrInstituteName}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {instituteClass.contactDetails && (
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="p-5 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border-l-4 border-teal-500"
                >
                  <div className="flex items-start">
                    <span className="text-2xl mr-4 text-teal-500">📞</span>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">
                        Contact
                      </h3>
                      <p className="text-gray-600">
                        {instituteClass.contactDetails}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {instituteClass.franchiseOrIndependent && (
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="p-5 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border-l-4 border-red-500"
                >
                  <div className="flex items-start">
                    <span className="text-2xl mr-4 text-red-500">🏷️</span>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">
                        Franchise or Independent
                      </h3>
                      <p className="text-gray-600">
                        {instituteClass.franchiseOrIndependent}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {instituteClass.websiteURL && (
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="p-5 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border-l-4 border-blue-500"
                >
                  <div className="flex items-start">
                    <span className="text-2xl mr-4 text-blue-500">🌐</span>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">
                        Website
                      </h3>
                      <a
                        href={instituteClass.websiteURL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-200 inline-flex items-center"
                      >
                        Visit Website
                        <FiArrowRight className="h-4 w-4 ml-1" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              )}

              {instituteClass.yearEstablished > 0 && (
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="p-5 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border-l-4 border-green-500"
                >
                  <div className="flex items-start">
                    <span className="text-2xl mr-4 text-green-500">📅</span>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">
                        Established Year
                      </h3>
                      <p className="text-gray-600">
                        {instituteClass.yearEstablished}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {courses?.length > 0 && (
        <section className="mt-12 p-4 sm:p-6 md:p-8 bg-gradient-to-r from-blue-50 to-gray-100 rounded-lg shadow-lg mx-4 sm:mx-6 lg:mx-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-6 sm:mb-8 text-center text-gray-800">
            🚀 Courses Available
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {courses.map((course) => (
              <motion.div
                key={course._id}
                whileHover={{ scale: 1.03 }}
                className="p-4 sm:p-6 rounded-lg bg-white shadow-md hover:shadow-xl transition-all duration-300"
              >
                <h3 className="text-lg sm:text-xl font-semibold mb-3 flex items-center text-gray-800">
                  <AiOutlineBook className="mr-2 text-blue-600 flex-shrink-0" />
                  <span className="line-clamp-1">{course.courseName}</span>
                </h3>
                <div className="space-y-2">
                  <p className="text-sm sm:text-base text-gray-700 flex items-center">
                    <span className="font-medium mr-1">Type:</span>{" "}
                    {course.courseType}
                  </p>
                  <p className="text-sm sm:text-base text-gray-700 flex items-center">
                    <BiTimeFive className="mr-2 text-green-600 flex-shrink-0" />
                    <span className="font-medium mr-1">Duration:</span>{" "}
                    {course.duration}
                  </p>
                  <p className="text-sm sm:text-base text-gray-700 flex items-center">
                    <FaRupeeSign className="mr-2 text-yellow-600 flex-shrink-0" />
                    <span className="font-medium mr-1">Fee:</span> ₹
                    {course.feeStructure?.amount.toLocaleString("en-IN")}
                    <span className="text-gray-500 text-sm ml-1">
                      ({course.feeStructure?.type})
                    </span>
                  </p>
                  <p className="text-sm sm:text-base text-gray-700 flex items-center">
                    <MdOutlineDiscount className="mr-2 text-red-600 flex-shrink-0" />
                    <span className="font-medium mr-1">Scholarship:</span>{" "}
                    {course.scholarshipOrDiscounts || "N/A"}
                  </p>
                  <p className="text-sm sm:text-base text-gray-700 flex items-center">
                    <span className="font-medium mr-1">Study Material:</span>{" "}
                    <span
                      className={
                        course.studyMaterialProvided
                          ? "text-green-600"
                          : "text-red-600"
                      }
                    >
                      {course.studyMaterialProvided
                        ? "Provided"
                        : "Not Provided"}
                    </span>
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      <div className="mt-12">
        <ImageGallery />
      </div>
      <div className="mt-12">
        <FacultyDetails />
      </div>
      <div className="mt-12 mb-16">
        <ReviewPage />
      </div>
    </>
  );
};

export default SingleInstitute;