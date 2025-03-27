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
import { MdOutlineDiscount } from "react-icons/md";
import Nav from "../../Layouts/Nav";
import { motion } from "framer-motion";
const fetchInstitute = async (id) => {
  const response = await fetch(`${BASE_URL}/api/class/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch class details");
  }
  const result = await response.json();

  if (result.success && result.data) {
    return result.data; // Parse the nested JSON string
  }
  throw new Error(result.errMsg || "Failed to fetch class details");
};

// console.log(fetchInstitute.response, 'response')
const fetchCourses = async (id) => {
  const response = await fetch(`${BASE_URL}/api/class/course/${id}`);

  const result = await response.json();

  // console.log('Raw API Response:', result); // Debugging

  return result.success && result.data ? result.data : []; // Ensure it's an array
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
  });
  console.log("institute data :", institute);

  const {
    data: courses,
    error: coursesError,
    isLoading: coursesLoading,
  } = useQuery({
    queryKey: ["courses", id],
    queryFn: () => fetchCourses(id),
  });

  // console.log('Courses Data:', courses); // Debugging

  // if (isLoading || coursesLoading) {
  //   return <p className="text-center text-gray-600 mt-8">Loading class details...</p>;
  // }dssdk

  if (error) {
    return (
      <p className="text-center text-red-600 mt-8">Error: {error.message}</p>
    );
  }

  // if (coursesError) {
  //   return <p className="text-center text-red-600 mt-8">Error loading courses: {coursesError.message}</p>;
  // }

  if (!institute) {
    return (
      <p className="text-center text-gray-600 mt-8">No class details found.</p>
    );
  }

  return (
    <>
      <Nav />
      <div className="flex items-center justify-center bg-gray-100 relative">
        <div className="w-full relative">
          <div className="w-full h-auto relative">
            {/* Background Image with Fallback */}
            <img
              src={
                institute?.class?.image
                  ? `${BACKEND_SERVER_IP}${institute.class.image}`
                  : "https://cdn.pixabay.com/photo/2017/09/01/13/56/university-2704306_640.jpg"
              }
              alt={institute?.class?.className || "Class Image"}
              className="w-full h-auto max-h-[400px] sm:max-h-[450px] md:max-h-[500px] rounded-xl object-cover shadow-md transition-transform duration-300 ease-in-out hover:scale-105"
              onError={(e) => {
                e.target.onerror = null; // Prevent infinite loop
                e.target.src =
                  "https://cdn.pixabay.com/photo/2017/09/01/13/56/university-2704306_640.jpg"; // Fallback image
              }}
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black opacity-70"></div>

            {/* Class Name (Centered) */}
            <div className="absolute inset-0 flex justify-center items-center px-4 text-center">
              <h1 className="text-white text-2xl sm:text-3xl md:text-4xl  font-bold">
                {institute?.class?.className || "Class Name"}
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full bg-white py-6 px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-full mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              {/* Location */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="p-5 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border-l-4 border-blue-500"
              >
                <div className="flex items-start">
                  <span className="text-2xl mr-4 text-blue-500">📍</span>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">
                      Location
                    </h3>
                    <p className="text-gray-600">
                      {institute.class.address?.line1 || "N/A"},<br />
                      {institute.class.address?.dist || "N/A"}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Mode of Teaching */}
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
                      {institute.class.modeOfTeaching || "N/A"}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Teaching Medium */}
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
                      {institute.class.teachingMedium?.join(", ") || "N/A"}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Courses Offered */}
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
                      {institute.class.subjectsOrCourses?.join(", ") || "N/A"}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              {/* Owner / Institute */}
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
                      {institute.class.ownerOrInstituteName || "N/A"}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Contact */}
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
                      {institute.class.contactDetails || "N/A"}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Franchise or Independent */}
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
                      {institute.class.franchiseOrIndependent || "N/A"}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Website */}
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
                      href={institute.class.websiteURL || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-200 inline-flex items-center"
                    >
                      Visit Website
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 ml-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              </motion.div>

              {/* Established Year */}
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
                      {institute.class.yearEstablished || "N/A"}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
      {Array.isArray(courses) && courses.length > 0 && (
        <section className="mt-20 p-6 bg-gradient-to-r from-blue-50 to-gray-100 rounded-lg shadow-lg">
          <h2 className="text-3xl font-extrabold mb-8 text-center text-gray-800">
            🚀 Courses Available
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div
                key={course._id}
                className="p-6 rounded-lg bg-gray-50 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105"
              >
                <h3 className="text-xl font-semibold mb-3 flex items-center">
                  <AiOutlineBook className="mr-2 text-blue-600" />
                  {course.courseName}
                </h3>
                <p className="text-gray-700 mb-1 flex items-center">
                  <span className="font-medium">Type:</span> {course.courseType}
                </p>
                <p className="text-gray-700 mb-1 flex items-center">
                  <BiTimeFive className="mr-2 text-green-600" />
                  <span className="font-medium">Duration:</span>{" "}
                  {course.duration}
                </p>
                <p className="text-gray-700 mb-1 flex items-center">
                  <FaRupeeSign className="mr-2 text-yellow-600" />
                  <span className="font-medium">Fee:</span> ₹
                  {course.feeStructure?.amount} ({course.feeStructure?.type})
                </p>
                <p className="text-gray-700 mb-1 flex items-center">
                  <MdOutlineDiscount className="mr-2 text-red-600" />
                  <span className="font-medium">Scholarship:</span>{" "}
                  {course.scholarshipOrDiscounts || "N/A"}
                </p>
                <p className="text-gray-700 flex items-center">
                  <span className="font-medium">Study Material Provided:</span>{" "}
                  {course.studyMaterialProvided ? "Yes" : "No"}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      <ImageGallery />
      <FacultyDetails />
      <ReviewPage />
    </>
  );
};

export default SingleInstitute;
