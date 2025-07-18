// import { useEffect, useRef, useState } from "react";
// import {
//   Link,
//   useParams,
//   useSearchParams,
//   useNavigate,
// } from "react-router-dom";
// import {
//   FaPhoneAlt,
//   FaEnvelope,
//   FaGlobe,
//   FaMapMarkerAlt,
//   FaCalendarAlt,
//   FaUniversity,
//   FaGraduationCap,
//   FaBook,
//   FaClipboardList,
// } from "react-icons/fa";
// import { motion, AnimatePresence } from "framer-motion";
// import HandleNavComp from "./HandleNavComp";
// import { useQuery } from "@tanstack/react-query";
// import { getCollege } from "./api.js";
// import { BACKEND_SERVER_IP } from "../Constant/constantData";
// import Nav from "../Layouts/Nav";
// import Lotify from "./TestComp/Lotify";
// import CoursesFee from "./navComp/CoursesFee";
// import CoursesSection from "./CourseSection";
// import CollegeCoursesTable from "./CourseSection";
// import ContactDetails from "./ContactDetails";
// import { useLocation } from "react-router-dom";

// const CardDetails = () => {
//   const navItem = [
//     "Courses & Fees",
//     "Placements",
//     "Infrastructure",
//     "Gallery",
//     "Reviews",
//     "Contact Details",
//   ];

//   const { id } = useParams();
//   const [searchParams, setSearchParams] = useSearchParams();
//   const initialTab = searchParams.get("tab") || "Overview";
//   const [navName, setNavName] = useState(initialTab);
//   const [isHovered, setIsHovered] = useState(false);

//   const sectionRef = useRef(null);
//   const tabRefs = useRef({});
//   const [isManualClick, setIsManualClick] = useState(false);
//   const navigate = useNavigate();
//   const location = useLocation();
// // const navigate = useNavigate();


// const status = location.state?.status;

//   const handleNavName = (tabName) => {
//     setNavName(tabName);
//     setSearchParams({ tab: tabName });
//     setIsManualClick(true);

//     setTimeout(() => {
//       sectionRef.current?.scrollIntoView({
//         behavior: "smooth",
//         block: "start",
//       });
//       tabRefs.current[tabName]?.scrollIntoView({
//         behavior: "smooth",
//         block: "nearest",
//         inline: "center",
//       });
//     }, 100);
//   };

//   useEffect(() => {
//     if (isManualClick) {
//       sectionRef.current?.scrollIntoView({
//         behavior: "smooth",
//         block: "start",
//       });
//       tabRefs.current[navName]?.scrollIntoView({
//         behavior: "smooth",
//         block: "nearest",
//         inline: "center",
//       });
//       setIsManualClick(false);
//     }
//   }, [navName]);

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, [id]);

//   const { data } = useQuery({
//     queryKey: ["college", id],
//     queryFn: () => getCollege(id),
//   });

//   const college = data?.college;
//   // console.log(college, "collegsssss");
//   const courses = data?.courses;
//   const infrastructure = data?.infrastructure;
//   const placements = data?.placements;
//   const imageGallery = data?.college?.imageGallery;
//   const typeOfCourse = data?.college?.typeOfCourse;
//   const subCategory = data?.college?.subCategory;

//   const Contact = {
//     phone: data?.college?.contactDetails || "Not Available",
//     email: data?.college?.email_id || "Not Available",
//     website: data?.college?.websiteURL || "Not Available",
//     address: {
//       line1: data?.college?.address?.[0]?.line1 || "",
//       line2: data?.college?.address?.[0]?.line2 || "",
//       district: data?.college?.address?.[0]?.dist || "",
//       state: data?.college?.address?.[0]?.state || "Maharashtra",
//       pincode: data?.college?.address?.[0]?.pincode || "",
//       fullAddress:
//         [
//           data?.college?.address?.[0]?.line1,
//           data?.college?.address?.[0]?.line2,
//           data?.college?.address?.[0]?.dist,
//           data?.college?.address?.[0]?.state,
//           data?.college?.address?.[0]?.pincode,
//         ]
//           .filter(Boolean)
//           .join(", ") || "Address not available",
//     },
//   };
//   // console.log(Contact , 'ContactDetails')

//   if (!college) {
//     return <p className="text-center text-gray-600 mt-8">No data found.</p>;
//   }

//   // Animation variants
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//         when: "beforeChildren",
//       },
//     },
//   };

//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: {
//         type: "spring",
//         stiffness: 100,
//       },
//     },
//   };

//   return (
//     <>
//       <Nav />

//       <AnimatePresence>
//         <motion.a
//           href={`tel:${college.contactDetails}`}
//           className="fixed bottom-10 right-5 z-50 flex items-center"
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           onHoverStart={() => setIsHovered(true)}
//           onHoverEnd={() => setIsHovered(false)}
//         >
//           {/* "Call Now" text on the LEFT side */}
//           <AnimatePresence>
//             {isHovered && (
//               <motion.span
//                 className=" bg-blue-600 text-white px-2 py-2 rounded-full text-sm font-semibold shadow-lg"
//                 initial={{ opacity: 0, x: -10 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 exit={{ opacity: 0, x: -10 }}
//                 transition={{ duration: 0.2 }}
//               >
//                 Call Now
//               </motion.span>
//             )}
//           </AnimatePresence>

//           {/* Lottie icon on the RIGHT */}
//           <motion.span
//             className="w-30 h-30"
//             animate={isHovered ? { rotate: 10 } : { rotate: 0 }}
//             transition={{ type: "spring", stiffness: 300 }}
//           >
//             <Lotify icon="/public/Lottiefiles/Animation - 1743060162749.json" />
//           </motion.span>
//         </motion.a>
//       </AnimatePresence>

//       <motion.div
//         className="max-w-full mx-auto p-4 mt-15"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.5 }}
//       >
//         {/* <button
//           onClick={() => navigate("/college")}
//           style={{
//             background: "none",
//             border: "blue",
//             color: "blue",
//             cursor: "pointer",
//             display: "flex",
//             alignItems: "center",
//             gap: "5px",
//             padding: "0",
//             fontSize: "1rem",
//             textDecoration: "none",

//           }}
//           onMouseOver={(e) =>
//             (e.currentTarget.style.textDecoration = "underline")
//           }
//           onMouseOut={(e) => (e.currentTarget.style.textDecoration = "none")}
//         >
//           ← BACK
//         </button> */}

//         <button
//   onClick={() => {
//     if (status === true) {
//       navigate("/college");
//     } else {
//       navigate("/my-eligibility");
//     }
//   }}
//   style={{
//     background: "none",
//     border: "blue",
//     color: "blue",
//     cursor: "pointer",
//     display: "flex",
//     alignItems: "center",
//     gap: "5px",
//     padding: "0",
//     fontSize: "1rem",
//     textDecoration: "none",
//   }}
//   onMouseOver={(e) =>
//     (e.currentTarget.style.textDecoration = "underline")
//   }
//   onMouseOut={(e) => (e.currentTarget.style.textDecoration = "none")}
// >
//   ← BACK
// </button>


//         {/* College Name at the Top */}
//         <motion.h1
//           className="text-2xl font-extrabold text-center text-gray-900 mb-6 xs:text-1xl sm:text-1xl md:text-3xl lg:text-4xl"
//           initial={{ y: -20, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ delay: 0.2 }}
//         >
//           {college.collegeName}
//         </motion.h1>

//         {/* Accreditation Badge */}
//         {college.accreditation && (
//           <motion.div
//             className="flex justify-center mb-6"
//             initial={{ scale: 0.8, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             transition={{ delay: 0.3 }}
//           >
//             <span className="bg-blue-100 text-blue-800 text-sm font-medium px-4 py-1 rounded-full shadow-md">
//               {college.accreditation}
//             </span>
//           </motion.div>
//         )}

//         {/* Keywords */}

//         {/* Image and Gallery Section */}
//         <motion.div
//           className="w-full flex flex-col md:flex-row gap-2"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.4 }}
//         >
//           {/* Left Side - Main College Image */}
//           <div
//             className={
//               college.imageGallery?.length > 0 ? "w-full md:w-1/2" : "w-full"
//             }
//           >
//             <div className="flex justify-center items-center"></div>
//             <motion.img
//               src={
//                 college.image?.trim()
//                   ? `${BACKEND_SERVER_IP}${college.image}`
//                   : "https://cdn.pixabay.com/photo/2017/09/01/13/56/university-2704306_640.jpg"
//               }
//               alt={college.collegeName || "College Image"}
//               className="rounded-lg w-full h-72 object-cover shadow-lg"
//               loading="lazy"
//               whileHover={{ scale: 1.02 }}
//               transition={{ type: "spring", stiffness: 400 }}
//             />
//           </div>

//           {/* Right Side - Gallery Images (Only if exists) */}
//           {college.imageGallery?.length > 0 && (
//             <motion.div
//               className="w-full md:w-1/2"
//               variants={containerVariants}
//               initial="hidden"
//               animate="visible"
//             >
//               {college.imageGallery.length === 1 && (
//                 <motion.img
//                   src={`${BACKEND_SERVER_IP}${college.imageGallery[0]}`}
//                   alt="Gallery Image 1"
//                   className="rounded-lg w-full h-72 object-cover shadow-lg"
//                   variants={itemVariants}
//                   whileHover={{ scale: 1.02 }}
//                 />
//               )}

//               {college.imageGallery.length >= 2 && (
//                 <div className="grid grid-cols-2 gap-4 h-full">
//                   {college.imageGallery.slice(0, 2).map((img, index) => (
//                     <motion.img
//                       key={index}
//                       src={`${BACKEND_SERVER_IP}${img}`}
//                       alt={`Gallery Image ${index + 1}`}
//                       className="rounded-lg w-full h-full min-h-[160px] max-h-[280px] object-cover shadow-md"
//                       variants={itemVariants}
//                       whileHover={{ scale: 1.05 }}
//                     />
//                   ))}
//                 </div>
//               )}
//             </motion.div>
//           )}
//         </motion.div>

//         {/* College Info Section */}
//         <motion.div
//           className="  rounded-lg w-full mt-8 shadow-md grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.5 }}
//         >
//           {/* Left Side - Course Fee Details with div layout */}
//           <div className="bg-gray-20 p-4 md:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow h-full">
//             <h2 className="text-2xl font-bold text-black mb-6 border-b pb-2">
//               Stream Intake (Academic Year 2025-26)
//             </h2>
//             <div className="max-h-[450px] overflow-y-auto scrollbar-thin scrollbar-thumb-indigo-300 scrollbar-track-gray-100 space-y-4">
//               {data?.courses?.[0]?.courses?.map((course, index) => (
//                 <div
//                   key={index}
//                   className="bg-white p-4 rounded-lg hover:bg-indigo-50 transition-all"
//                 >
//                   <div className="flex justify-between items-center">
//                     <span className="font-medium text-gray-800">
//                       {course.name}
//                     </span>
//                     <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
//                       {course.sanctionedIntake}
//                     </span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Right Side - College Info (Fixed height matching left) */}
//           <motion.div
//             className="bg-grey-50 p-4 md:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow space-y-6 h-full"
//             variants={containerVariants}
//             initial="hidden"
//             animate="visible"
//           >
//             <motion.h2
//               className="text-2xl font-bold text-black border-b pb-2"
//               variants={itemVariants}
//             >
//               College Information
//             </motion.h2>

//             <motion.div
//               className="grid grid-cols-2 gap-4"
//               variants={containerVariants}
//             >
//               {/* Cards */}
//               <motion.div
//                 variants={itemVariants}
//                 className="bg-white p-3 rounded-md shadow hover:shadow-md transition-shadow"
//               >
//                 <div className="flex items-center mb-1">
//                   <FaCalendarAlt className="mr-2 text-indigo-600" />
//                   <h3 className="font-semibold text-gray-700">
//                     Established Year
//                   </h3>
//                 </div>
//                 <p className="bg-white ml-6">
//                   {college.establishedYear || "N/A"}
//                 </p>
//               </motion.div>

//               <motion.div
//                 variants={itemVariants}
//                 className="bg-white p-3 rounded-md shadow hover:shadow-md transition-shadow"
//               >
//                 <div className="flex items-center mb-1">
//                   <FaUniversity className="mr-2 text-indigo-600" />
//                   <h3 className="font-semibold text-gray-700">
//                     Affiliated University
//                   </h3>
//                 </div>
//                 <p className="bg-white ml-6">
//                   {college.affiliatedUniversity || "N/A"}
//                 </p>
//               </motion.div>

//               <motion.div
//                 variants={itemVariants}
//                 className="bg-white p-3 rounded-md shadow hover:shadow-md transition-shadow"
//               >
//                 <div className="flex items-center mb-1">
//                   <FaGraduationCap className="mr-2 text-indigo-600" />
//                   <h3 className="font-semibold text-gray-700">Category</h3>
//                 </div>
//                 <p className="text-gray-600 ml-6">
//                   {college.category || "N/A"}
//                 </p>
//               </motion.div>

//               <motion.div
//                 variants={itemVariants}
//                 className="bg-white p-3 rounded-md shadow hover:shadow-md transition-shadow"
//               >
//                 <div className="flex items-center mb-1">
//                   <FaBook className="mr-2 text-indigo-600" />
//                   <h3 className="font-semibold text-gray-700">
//                     Sub Categories
//                   </h3>
//                 </div>
//                 <p className="bg-white ml-6">
//                   {college.subCategory?.join(", ") || "N/A"}
//                 </p>
//               </motion.div>

//               <motion.div
//                 variants={itemVariants}
//                 className="bg-white p-3 rounded-md shadow hover:shadow-md transition-shadow col-span-2"
//               >
//                 <div className="flex items-center mb-1">
//                   <FaClipboardList className="mr-2 text-indigo-600" />
//                   <h3 className="font-semibold text-gray-700">
//                     Entrance Exams
//                   </h3>
//                 </div>
//                 <p className="text-gray-600 ml-6">
//                   {college.entrance_exam_required?.join(", ") || "N/A"}
//                 </p>
//               </motion.div>
//             </motion.div>

//             {college.info?.description && (
//               <motion.div
//                 variants={itemVariants}
//                 className="bg-white p-4 rounded-md shadow hover:shadow-md transition-shadow"
//               >
//                 <h3 className="font-semibold text-gray-700 mb-2">
//                   Description
//                 </h3>
//                 <p className="text-gray-700 text-base leading-relaxed">
//                   {college.info.description}
//                 </p>
//               </motion.div>
//             )}
//           </motion.div>
//         </motion.div>

//         {/* Tabs Section */}
//         <motion.div
//           className="relative mt-10 border-b text-gray-600 text-sm"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.6 }}
//         >
//           <Link to="/service-provider">
//             <u className="text-blue-600">
//               {" "}
//               <p className="text-blue-600 mb-2 text-center cursor-pointer hover:underline">
//                 "Want to update college details? Just click here to
//                 make changes!"
//               </p>
//             </u>
//           </Link>
//           <br />
//           <div className="flex justify-center px-4">
//             <div className="w-full max-w-6xl">
//               <div className="flex overflow-x-auto scrollbar-hide pb-2">
//                 <div className="flex space-x-2 md:space-x-4 min-w-max mx-auto">
//                   {navItem.map((each) => (
//                     <motion.button
//                       key={each}
//                       ref={(el) => (tabRefs.current[each] = el)}
//                       onClick={(e) => {
//                         e.preventDefault();
//                         handleNavName(each);
//                       }}
//                       className={`cursor-pointer h-8 px-3 md:px-6 rounded-md transition-all duration-300 font-medium flex items-center justify-center whitespace-nowrap ${
//                         each === navName
//                           ? "text-blue-600 bg-blue-100 shadow-inner"
//                           : "text-gray-600 hover:text-blue-600 hover:bg-gray-100"
//                       } text-xs sm:text-sm md:text-base`}
//                       whileHover={{ scale: 1.05 }}
//                       whileTap={{ scale: 0.95 }}
//                     >
//                       {each}
//                     </motion.button>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </motion.div>

//         <motion.div
//           ref={sectionRef}
//           className="mt-4"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.7 }}
//         >
//           <HandleNavComp
//             navName={navName}
//             courses={courses}
//             infrastructure={infrastructure}
//             placementData={placements}
//             imageGallery={imageGallery}
//             review={college.collegeName}
//             collegeId={college.collegeId}
//             Contact={Contact}
//             logo={college.logo}
//           />
//         </motion.div>
//       </motion.div>
//     </>
//   );
// };

// export default CardDetails;


import { useEffect, useRef, useState } from "react";
import {
  Link,
  useParams,
  useSearchParams,
  useNavigate,
} from "react-router-dom";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaGlobe,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUniversity,
  FaGraduationCap,
  FaBook,
  FaClipboardList,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import HandleNavComp from "./HandleNavComp";
import { useQuery } from "@tanstack/react-query";
// import { getCollege } from "./api.js";
import { BACKEND_SERVER_IP } from "../Constant/constantData";
import Nav from "../Layouts/Nav";
import Lotify from "./TestComp/Lotify";
import CoursesFee from "./navComp/CoursesFee";
import CoursesSection from "./CourseSection";
import CollegeCoursesTable from "./CourseSection";
import ContactDetails from "./ContactDetails";
import { useLocation } from "react-router-dom";
import { getIQTestData } from "./TestComp/Api.js";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { getCollege } from "./Api.js";
  // import { useSelector } from "react-redux";

const CardDetails = () => {
  const navItem = [
    "Courses & Fees",
    "Placements",
    "Infrastructure",
    "Gallery",
    "Reviews",
    "Contact Details",
  ];

  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = searchParams.get("tab") || "Overview";
  const [navName, setNavName] = useState(initialTab);
  const [isHovered, setIsHovered] = useState(false);

  const sectionRef = useRef(null);
  const tabRefs = useRef({});
  const [isManualClick, setIsManualClick] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  // Place this state at the top of your component
  const [showTestTable, setShowTestTable] = useState(false);
  // const [userRole, setUserRole] = useState(null);


const userRole = useSelector((state) => state.auth.userRole);

  // const navigate = useNavigate();
    const [iqTestDataPayload, setIqTestDataPayload] = useState(null);
     const [testId, setTestId] = useState(null);
       const [testDuration, setTestDuration] = useState(0);
       const [testName, setTestName] = useState("");
         const [selectedTest, setSelectedTest] = useState(null);

  const status = location.state?.status;
  const userId = useSelector((state) => state.auth.userId);

  // const handleGiveTest = (test) => {
  //   navigate(
  //     `/profile/test/?type=Test_Card&id=${test.mainCategoryId}&sub_category=${test.sub_category}&sub_sub_name=${test.sub}&main_name=${test.main_category}`
  //   );
  // };

//   const handleGiveTest = async (test) => {
//   // const isAccessible =
//   //   (userRole === "GUEST" && test.userType === "0") ||
//   //   (userRole === "USER" && (test.userType === "0" || test.userType === "1"));

//   // if (!isAccessible) {
//   //   Swal.fire({
//   //     icon: "warning",
//   //     title: "Access Denied",
//   //     text: "Please sign up and access this test.",
//   //   });
//   //   return;
//   // }

//    console.log("Give Test Clicked", test);

//   Swal.fire({
//     title: `Start ${test.title}?`,
//     text: `This is a test popup for debugging.`,
//     confirmButtonText: "Start",
//   });

//   const newIqTestDataPayload = {
//     testID: test._id,
//     userId: userId,
//     collegeId: college._id, // assuming this exists
//   };

//   if (test) {
//     console.log("Test Attempted Value:", test?.attempted);

//     Swal.fire({
//       title: `${test?.attempted === -1 ? "Resume" : "Start"} ${test.title}?`,
//       html: `
//         <div class="text-left max-h-[60vh] overflow-y-auto">
//           <div class="flex items-center mb-4">
//             <svg class="w-6 h-6 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
//             </svg>
//             <h3 class="text-lg font-bold">Test Instructions</h3>
//           </div>
//           <div class="bg-blue-50 p-4 rounded-lg mb-4">
//             <h4 class="font-semibold text-blue-800 mb-2">General Guidelines:</h4>
//             <ul class="space-y-2 list-disc pl-5 text-blue-700">
//               <li>Total duration: ${test.testDuration.minutes} minutes</li>
//               <li>Total questions: ${test.totalMarks}</li>
//               <li>Each question carries equal marks</li>
//               <li>No negative marking</li>
//             </ul>
//           </div>
//           <div class="bg-yellow-50 p-4 rounded-lg mb-4">
//             <h4 class="font-semibold text-yellow-800 mb-2">During the Test:</h4>
//             <ul class="space-y-2 list-disc pl-5 text-yellow-700">
//               <li>Click on radio buttons to select answers</li>
//               <li>You can change answers before final submission</li>
//               <li>Don't refresh the page during the test</li>
//               <li>Timer starts immediately when you begin</li>
//             </ul>
//           </div>
//           <div class="flex items-start mt-4">
//             <input type="checkbox" id="agreeTerms" class="w-5 h-5 mt-1 mr-2 cursor-pointer" />
//             <label for="agreeTerms" class="text-gray-700 cursor-pointer">
//               I confirm that I have read and understood all instructions
//             </label>
//           </div>
//         </div>
//       `,
//       showCancelButton: true,
//       confirmButtonText: `
//         <span class="flex items-center gap-2">
//           ${test?.attempted === -1 ? "Resume Test" : "Start Test"}
//         </span>
//       `,
//       cancelButtonText: "Cancel",
//       didOpen: () => {
//         const confirmBtn = Swal.getConfirmButton();
//         const checkbox = Swal.getPopup().querySelector("#agreeTerms");
//         confirmBtn.disabled = true;
//         checkbox.addEventListener("change", () => {
//           confirmBtn.disabled = !checkbox.checked;
//         });
//       },
//     }).then(async (result) => {
//     if (result.isConfirmed) {
//      try {
//   const response = await getIQTestData(newIqTestDataPayload);
//   console.log("✅ Raw API response from getIQTestData:", response);

//   const data = response.data; // ✅ already contains { questions, title, etc. }
// if (
//   !data ||
//   !Array.isArray(data.questions) ||
//   data.questions.length === 0 ||
//   !data.testDuration
// ) {
//   Swal.fire({
//     icon: "error",
//     title: "Test Error",
//     text: "Test data is incomplete or missing. Please try again later.",
//   });
//   return;
// }

// navigate("/iq", {
//   state: {
//     questions: data.questions,
//     testDuration: data.testDuration,
//     title: data.title,
//     testId: data.testID,
//     resultId: data.iqTestId,
//     iqTestDataPayload: newIqTestDataPayload,
//     newTestId: data.testID,
//   },
// });




// }catch (error) {
//       console.error("Failed to load test data:", error);
//       Swal.fire("Error", "Failed to load test. Please try again later.", "error");
//     }
//   }
//     });
//   }
// };

const handleGiveTest = (test) => {
// navigate(
//   `/profile/test/?type=Test_Card&id=${test.mainCategoryId}&sub_category=${test.sub_category}&sub_sub_name=${test.sub}&main_name=${test.main_category}&testid=${test._id}&popup=auto`,
//   {
//     state: {
//       triggerTest: test,         // for easy access from state
//       autoPopup: true,           // optional, in case state is preferred
//     },
//   }

// );


navigate(
  `/profile/test/?type=Test_Card&id=${test.mainCategoryId}&sub_category=${test.sub_category}&sub_sub_name=${test.sub}&main_name=${test.main_category}&testid=${test._id}&popup=auto&collegeId=${college._id}`,
  {
    state: {
      triggerTest: test,
      autoPopup: true,
    },
  }
);

};


  const handleNavName = (tabName) => {
    setNavName(tabName);
    setSearchParams({ tab: tabName });
    setIsManualClick(true);

    setTimeout(() => {
      sectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      tabRefs.current[tabName]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }, 100);
  };

  useEffect(() => {
    if (isManualClick) {
      sectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      tabRefs.current[navName]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
      setIsManualClick(false);
    }
  }, [navName]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const { data } = useQuery({
    queryKey: ["college", id],
    queryFn: () => getCollege(id),
  });

  const college = data?.college;
  // console.log(college, "collegsssss");
  const courses = data?.courses;
  const infrastructure = data?.infrastructure;
  const placements = data?.placements;
  const imageGallery = data?.college?.imageGallery;
  const typeOfCourse = data?.college?.typeOfCourse;
  const subCategory = data?.college?.subCategory;

  const Contact = {
    phone: data?.college?.contactDetails || "Not Available",
    email: data?.college?.email_id || "Not Available",
    website: data?.college?.websiteURL || "Not Available",
    address: {
      line1: data?.college?.address?.[0]?.line1 || "",
      line2: data?.college?.address?.[0]?.line2 || "",
      district: data?.college?.address?.[0]?.dist || "",
      state: data?.college?.address?.[0]?.state || "Maharashtra",
      pincode: data?.college?.address?.[0]?.pincode || "",
      fullAddress:
        [
          data?.college?.address?.[0]?.line1,
          data?.college?.address?.[0]?.line2,
          data?.college?.address?.[0]?.dist,
          data?.college?.address?.[0]?.state,
          data?.college?.address?.[0]?.pincode,
        ]
          .filter(Boolean)
          .join(", ") || "Address not available",
    },
  };
  // console.log(Contact , 'ContactDetails')

  if (!college) {
    return <p className="text-center text-gray-600 mt-8">No data found.</p>;
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren",
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <>
      <Nav />

      <AnimatePresence>
        <motion.a
          href={`tel:${college.contactDetails}`}
          className="fixed bottom-10 right-5 z-50 flex items-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
        >
          {/* "Call Now" text on the LEFT side */}
          <AnimatePresence>
            {isHovered && (
              <motion.span
                className=" bg-blue-600 text-white px-2 py-2 rounded-full text-sm font-semibold shadow-lg"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
              >
                Call Now
              </motion.span>
            )}
          </AnimatePresence>

          {/* Lottie icon on the RIGHT */}
          <motion.span
            className="w-30 h-30"
            animate={isHovered ? { rotate: 10 } : { rotate: 0 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Lotify icon="/public/Lottiefiles/Animation - 1743060162749.json" />
          </motion.span>
        </motion.a>
      </AnimatePresence>

      {/* Floating Bottom Bar */}
      <AnimatePresence>
        {true && (
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="fixed bottom-5 left-5 z-50 w-[300px] sm:w-[350px] md:w-[400px]"
          >
            <motion.button
              onClick={() => setShowTestTable(!showTestTable)}
              whileHover={{
                scale: 1.05,
                backgroundColor: "#2563eb",
              }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl shadow-xl font-semibold text-base tracking-wide transition-all duration-300 flex items-center justify-center gap-2"
            >
              🎯 Give IQ Test
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="max-w-full mx-auto p-4 mt-15"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* <button
          onClick={() => navigate("/college")}
          style={{
            background: "none",
            border: "blue",
            color: "blue",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "5px",
            padding: "0",
            fontSize: "1rem",
            textDecoration: "none",

          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.textDecoration = "underline")
          }
          onMouseOut={(e) => (e.currentTarget.style.textDecoration = "none")}
        >
          ← BACK
        </button> */}

        <button
          onClick={() => {
            if (status === true) {
              navigate("/college");
            } else {
              navigate("/my-eligibility");
            }
          }}
          style={{
            background: "none",
            border: "blue",
            color: "blue",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "5px",
            padding: "0",
            fontSize: "1rem",
            textDecoration: "none",
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.textDecoration = "underline")
          }
          onMouseOut={(e) => (e.currentTarget.style.textDecoration = "none")}
        >
          ← BACK
        </button>

        {/* College Name at the Top */}
        <motion.h1
          className="text-2xl font-extrabold text-center text-gray-900 mb-6 xs:text-1xl sm:text-1xl md:text-3xl lg:text-4xl"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {college.collegeName}
        </motion.h1>

        {/* Accreditation Badge */}
        {college.accreditation && (
          <motion.div
            className="flex justify-center mb-6"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <span className="bg-blue-100 text-blue-800 text-sm font-medium px-4 py-1 rounded-full shadow-md">
              {college.accreditation}
            </span>
          </motion.div>
        )}

        {/* Keywords */}

        {/* Image and Gallery Section */}
        <motion.div
          className="w-full flex flex-col md:flex-row gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {/* Left Side - Main College Image */}
          <div
            className={
              college.imageGallery?.length > 0 ? "w-full md:w-1/2" : "w-full"
            }
          >
            <div className="flex justify-center items-center"></div>
            <motion.img
              src={
                college.image?.trim()
                  ? `${BACKEND_SERVER_IP}${college.image}`
                  : "https://cdn.pixabay.com/photo/2017/09/01/13/56/university-2704306_640.jpg"
              }
              alt={college.collegeName || "College Image"}
              className="rounded-lg w-full h-72 object-cover shadow-lg"
              loading="lazy"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400 }}
            />
          </div>

          {/* Right Side - Gallery Images (Only if exists) */}
          {college.imageGallery?.length > 0 && (
            <motion.div
              className="w-full md:w-1/2"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {college.imageGallery.length === 1 && (
                <motion.img
                  src={`${BACKEND_SERVER_IP}${college.imageGallery[0]}`}
                  alt="Gallery Image 1"
                  className="rounded-lg w-full h-72 object-cover shadow-lg"
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                />
              )}

              {college.imageGallery.length >= 2 && (
                <div className="grid grid-cols-2 gap-4 h-full">
                  {college.imageGallery.slice(0, 2).map((img, index) => (
                    <motion.img
                      key={index}
                      src={`${BACKEND_SERVER_IP}${img}`}
                      alt={`Gallery Image ${index + 1}`}
                      className="rounded-lg w-full h-full min-h-[160px] max-h-[280px] object-cover shadow-md"
                      variants={itemVariants}
                      whileHover={{ scale: 1.05 }}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </motion.div>

        {/* College Info Section */}
        <motion.div
          className="  rounded-lg w-full mt-8 shadow-md grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {/* Left Side - Course Fee Details with div layout */}
          <div className="bg-gray-20 p-4 md:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow h-full">
            <h2 className="text-2xl font-bold text-black mb-6 border-b pb-2">
              Stream Intake (Academic Year 2025-26)
            </h2>
            <div className="max-h-[450px] overflow-y-auto scrollbar-thin scrollbar-thumb-indigo-300 scrollbar-track-gray-100 space-y-4">
              {data?.courses?.[0]?.courses?.map((course, index) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded-lg hover:bg-indigo-50 transition-all"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-800">
                      {course.name}
                    </span>
                    <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
                      {course.sanctionedIntake}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - College Info (Fixed height matching left) */}
          <motion.div
            className="bg-grey-50 p-4 md:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow space-y-6 h-full"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h2
              className="text-2xl font-bold text-black border-b pb-2"
              variants={itemVariants}
            >
              College Information
            </motion.h2>

            <motion.div
              className="grid grid-cols-2 gap-4"
              variants={containerVariants}
            >
              {/* Cards */}
              <motion.div
                variants={itemVariants}
                className="bg-white p-3 rounded-md shadow hover:shadow-md transition-shadow"
              >
                <div className="flex items-center mb-1">
                  <FaCalendarAlt className="mr-2 text-indigo-600" />
                  <h3 className="font-semibold text-gray-700">
                    Established Year
                  </h3>
                </div>
                <p className="bg-white ml-6">
                  {college.establishedYear || "N/A"}
                </p>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="bg-white p-3 rounded-md shadow hover:shadow-md transition-shadow"
              >
                <div className="flex items-center mb-1">
                  <FaUniversity className="mr-2 text-indigo-600" />
                  <h3 className="font-semibold text-gray-700">
                    Affiliated University
                  </h3>
                </div>
                <p className="bg-white ml-6">
                  {college.affiliatedUniversity || "N/A"}
                </p>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="bg-white p-3 rounded-md shadow hover:shadow-md transition-shadow"
              >
                <div className="flex items-center mb-1">
                  <FaGraduationCap className="mr-2 text-indigo-600" />
                  <h3 className="font-semibold text-gray-700">Category</h3>
                </div>
                <p className="text-gray-600 ml-6">
                  {college.category || "N/A"}
                </p>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="bg-white p-3 rounded-md shadow hover:shadow-md transition-shadow"
              >
                <div className="flex items-center mb-1">
                  <FaBook className="mr-2 text-indigo-600" />
                  <h3 className="font-semibold text-gray-700">
                    Sub Categories
                  </h3>
                </div>
                <p className="bg-white ml-6">
                  {college.subCategory?.join(", ") || "N/A"}
                </p>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="bg-white p-3 rounded-md shadow hover:shadow-md transition-shadow col-span-2"
              >
                <div className="flex items-center mb-1">
                  <FaClipboardList className="mr-2 text-indigo-600" />
                  <h3 className="font-semibold text-gray-700">
                    Entrance Exams
                  </h3>
                </div>
                <p className="text-gray-600 ml-6">
                  {college.entrance_exam_required?.join(", ") || "N/A"}
                </p>
              </motion.div>
            </motion.div>

            {college.info?.description && (
              <motion.div
                variants={itemVariants}
                className="bg-white p-4 rounded-md shadow hover:shadow-md transition-shadow"
              >
                <h3 className="font-semibold text-gray-700 mb-2">
                  Description
                </h3>
                <p className="text-gray-700 text-base leading-relaxed">
                  {college.info.description}
                </p>
              </motion.div>
            )}
          </motion.div>
        </motion.div>

        {/* Test List Table */}
        {showTestTable && (
          <div className="bg-white mt-8 p-6 rounded-xl shadow-xl overflow-x-auto border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-blue-200 pb-2">
              📝 Test List
            </h2>

            {data?.tests?.length > 0 ? (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gradient-to-r from-blue-50 to-blue-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider rounded-tl-xl">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                      Questions
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                      Marks
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                      Passing
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                      Duration
                    </th>
                    <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700 uppercase tracking-wider rounded-tr-xl">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200 text-sm text-gray-700">
                  {data.tests.map((test, index) => (
                    <tr
                      key={test._id}
                      className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-blue-50 transition`}
                    >
                      <td className="px-6 py-3 font-medium text-gray-800">
                        {test.title}
                      </td>
                      <td className="px-6 py-3">{test.totalQuestions}</td>
                      <td className="px-6 py-3">{test.totalMarks}</td>
                      <td className="px-6 py-3">{test.passingMarks}</td>
                      <td className="px-6 py-3">
                        {test.testDuration?.minutes ?? 0}m :{" "}
                        {test.testDuration?.seconds ?? 0}s
                      </td>
                      {/* <td className="px-6 py-3 text-center">
                        <button
                          onClick={() => handleGiveTest(test)}
                          className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-2 rounded-lg shadow-md hover:from-blue-600 hover:to-indigo-600 transition"
                        >
                          Give Test
                        </button>
                      </td> */}
<td className="px-6 py-3 text-center">
  <button
    onClick={() => {
      console.log("Give Test Clicked"); // Debug
      // const isAccessible =
      //   (userRole === "GUEST" && test.userType === "0") ||
      //   (userRole === "USER" &&
      //     (test.userType === "0" || test.userType === "1"));

      // if (!isAccessible) {
      //   Swal.fire({
      //     icon: "warning",
      //     title: "Access Denied",
      //     text: "Please sign up and access this test.",
      //   });
      //   return;
      // }

      handleGiveTest(test); // ✅ Main logic
    }}
    // disabled={
    //   !(
    //     (userRole === "GUEST" && test.userType === "0") ||
    //     (userRole === "USER" && ["0", "1"].includes(test.userType))
    //   )
    // }
    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg shadow-md hover:from-blue-600 hover:to-indigo-600 transition"
  >
    {test?.attempted === -1 ? "Resume Test" : test?.attempted === 1 ? "Re-Test" : "Give Test"}
  </button>
</td>


                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-gray-500 italic">No tests available.</p>
            )}
          </div>
        )}

        {/* Tabs Section */}
        <motion.div
          className="relative mt-10 border-b text-gray-600 text-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Link to="/service-provider">
            <u className="text-blue-600">
              {" "}
              <p className="text-blue-600 mb-2 text-center cursor-pointer hover:underline">
                "Want to update college details? Just click here to
                make changes!"
              </p>
            </u>
          </Link>
          <br />
          <div className="flex justify-center px-4">
            <div className="w-full max-w-6xl">
              <div className="flex overflow-x-auto scrollbar-hide pb-2">
                <div className="flex space-x-2 md:space-x-4 min-w-max mx-auto">
                  {navItem.map((each) => (
                    <motion.button
                      key={each}
                      ref={(el) => (tabRefs.current[each] = el)}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavName(each);
                      }}
                      className={`cursor-pointer h-8 px-3 md:px-6 rounded-md transition-all duration-300 font-medium flex items-center justify-center whitespace-nowrap ${
                        each === navName
                          ? "text-blue-600 bg-blue-100 shadow-inner"
                          : "text-gray-600 hover:text-blue-600 hover:bg-gray-100"
                      } text-xs sm:text-sm md:text-base`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {each}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          ref={sectionRef}
          className="mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <HandleNavComp
            navName={navName}
            courses={courses}
            infrastructure={infrastructure}
            placementData={placements}
            imageGallery={imageGallery}
            review={college.collegeName}
            collegeId={college.collegeId}
            Contact={Contact}
            logo={college.logo}
          />
        </motion.div>
      </motion.div>
    </>
  );
};

export default CardDetails;
