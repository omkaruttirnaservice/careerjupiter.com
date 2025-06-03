import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../../utils/constansts";
import { BACKEND_SERVER_IP } from "../../Constant/constantData";
import ImageGallery from "./ImageGallery";
import FacultyDetails from "./FacultyDetails";
import ReviewPage from "../navComp/ReviewPage";
import { AiOutlineBook } from "react-icons/ai";
import { BiTimeFive } from "react-icons/bi";
import { FaRupeeSign, FaTags } from "react-icons/fa";
import { MdOutlineDiscount, MdLocationOn } from "react-icons/md";
import { FiArrowRight } from "react-icons/fi";
import Nav from "../../Layouts/Nav";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
// import { FaTags } from 'react-icons/fa';

const fetchInstitute = async (id) => {
  const response = await fetch(`${BASE_URL}/api/class/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch class details");
  }
  const result = await response.json();

  // console.log(result, "classs details");

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
  const [showDiscountPopup, setShowDiscountPopup] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Auto-show the floating icon after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowDiscountPopup(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Prevent body scrolling when popup is open
  useEffect(() => {
    if (isPopupOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isPopupOpen]);

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
        <p className="text-xl">No class details found.</p>
      </div>
    );
  }

  const { class: instituteClass } = institute;

  return (
    <>
      <Nav />

      {/* Floating Discount Icon */}
      {instituteClass?.discount && showDiscountPopup && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{
            opacity: 1,
            y: 0,
            boxShadow: [
              "0 0 0 0 rgba(255, 105, 0, 0.7)",
              "0 0 0 15px rgba(255, 105, 0, 0)",
              "0 0 0 0 rgba(255, 105, 0, 0)",
            ],
          }}
          transition={{
            opacity: { duration: 0.5 },
            y: { duration: 0.7, type: "spring", stiffness: 100 },
            boxShadow: {
              duration: 2,
              repeat: Infinity,
              ease: "easeOut",
            },
          }}
          whileHover={{
            scale: 1.1,
            rotate: [0, -10, 10, -5, 5, 0],
          }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-8 right-8 z-50 cursor-pointer"
          onClick={() => setIsPopupOpen(true)}
        >
          <div className="relative">
            {/* Main button with improved gradient and shadow */}
            <motion.div
              className="w-20 h-20 bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 rounded-full flex items-center justify-center shadow-2xl"
              animate={{
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                rotate: {
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                },
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2zM10 8.5a.5.5 0 11-1 0 .5.5 0 011 0zm5 5a.5.5 0 11-1 0 .5.5 0 011 0z"
                />
              </svg>
            </motion.div>

            {/* Enhanced discount badge */}
            <motion.div
              className="absolute -top-3 -right-3 bg-gradient-to-br from-red-600 to-red-700 text-white text-sm font-bold rounded-full w-8 h-8 flex items-center justify-center shadow-lg"
              initial={{ scale: 0 }}
              animate={{
                scale: 1,
                rotate: [0, 20, -20, 10, -10, 0],
              }}
              transition={{
                scale: { duration: 0.5, type: "spring" },
                rotate: {
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                },
              }}
            >
              {instituteClass.discount}%{/* Ribbon effect */}
              <div className="absolute -bottom-1 w-4 h-2 bg-red-800 clip-ribbon"></div>
            </motion.div>

            {/* Optional floating text */}
            <motion.div
              className="absolute -left-8 top-1/2 -translate-y-1/2 bg-white text-red-600 font-bold px-3 py-1 rounded-full text-xs whitespace-nowrap shadow-md"
              initial={{ x: -20, opacity: 0 }}
              animate={{
                x: 0,
                opacity: 1,
                transition: { delay: 0.5 },
              }}
            >
              Special Offer!
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* Discount Popup Modal */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", damping: 20 }}
            className="relative bg-white rounded-xl w-full max-w-md"
          >
            <button
              onClick={() => setIsPopupOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 p-6 text-center">
              <div className="flex justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2zM10 8.5a.5.5 0 11-1 0 .5.5 0 011 0zm5 5a.5.5 0 11-1 0 .5.5 0 011 0z"
                  />
                </svg>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                SPECIAL DISCOUNT!
              </h3>
              <p className="text-lg text-gray-800 mb-4">
                Limited time offer for this course
              </p>

              <div className="relative inline-block mb-6">
                <div className="absolute inset-0 bg-white opacity-20 rounded-full animate-ping"></div>
                <div className="relative bg-white rounded-full py-3 px-8">
                  <span className="text-4xl font-extrabold text-yellow-600">
                    {instituteClass.discount}% OFF
                  </span>
                </div>
              </div>

              <div className="bg-white bg-opacity-20 rounded-lg p-4 mb-4">
                <p className="text-gray-800 font-medium">
                  Hurry up! This offer ends soon
                </p>
                <p className="text-sm text-gray-700 mt-1">
                  Don't miss this amazing opportunity
                </p>
              </div>

              <button
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
                onClick={() => {
                  // Add your action here (e.g., navigate to enrollment page)
                  setIsPopupOpen(false);
                }}
              >
                Claim Your Discount Now
              </button>
            </div>

            <div className="bg-gray-50 p-4 text-center">
              <p className="text-sm text-gray-600">
                Terms and conditions apply
              </p>
            </div>
          </motion.div>
        </div>
      )}
      <div className="flex items-center justify-center bg-gray-100 relative">
        <div className="w-full relative">
          <div className="w-full h-auto mt-16 relative">
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

              {/* {instituteClass.category?.length > 0 && (
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="p-5 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border-l-4 border-blue-500"
                >
                  <div className="flex items-start">
                    <span className="text-2xl mr-4 text-blue-500">
                    </span>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">
                        Categories
                      </h3>
                      <div className="text-gray-600">
                        {instituteClass.category[0]}
                        {instituteClass.category.length > 1 && (
                          <span
                            className="text-blue-600 ml-1 cursor-pointer hover:underline"
                            title={instituteClass.category.slice(1).join(", ")}
                          >
                            +{instituteClass.category.length - 1} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )} */}
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
