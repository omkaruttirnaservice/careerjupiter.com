// import { useEffect, useRef, useState } from "react";
// import { NavLink, useParams, useSearchParams } from "react-router-dom";
// import { FaPhone, FaEnvelope, FaGlobe, FaMapMarkerAlt } from "react-icons/fa";
// import HandleNavComp from "./HandleNavComp";
// import { useQuery } from "@tanstack/react-query";
// import { getCollege } from "./Api";
// import { BACKEND_SERVER_IP } from "../Constant/constantData";
// import { FaPhoneAlt } from "react-icons/fa"; // Contact icon
// import Nav from "../Layouts/Nav";
// import Lotify from "./TestComp/Lotify";

// const CardDetails = () => {
//   const navItem = [
//     // "Overview",
//     "Courses & Fees",
//     // "Scholarship",
//     "Placements",
//     // "CutOffs",
//     // "Ranking",
//     "Infrastructure",
//     "Gallery",
//     "Reviews",
//     // "News",
//     // "QnA",
//   ];

//   const { id } = useParams();

//   const [searchParams, setSearchParams] = useSearchParams();

//   const initialTab = searchParams.get("tab") || "Overview";
//   const [navName, setNavName] = useState(initialTab);

//   const sectionRef = useRef(null);
//   const tabRefs = useRef({});

//   const [isManualClick, setIsManualClick] = useState(false);

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
//   console.log(college , 'collegessss')
//   const courses = data?.courses;
//   const infrastructure = data?.infrastructure;
//   const placements = data?.placements;
//   const imageGallery = data?.college?.imageGallery;
//   const typeOfCourse = data?.college?.typeOfCourse;
//   const subCategory = data?.college?.subCategory;

//   if (!college) {
//     return <p className="text-center text-gray-600 mt-8">No data found.</p>;
//   }

//   return (
//     <>
//       <Nav />
//       <a
//         href="tel:+1234567890"
//         className="fixed mt-110  right-5  z-50 flex items-center   transition-all duration-300"
//       >
//          <span className="w-28 h-28">
//           <Lotify icon="/public/Lottiefiles/Animation - 1743060162749.json" />
//         </span>

//       </a>
//       <div className="max-w-full mx-auto p-4 mt-15">
//         {/* College Name at the Top */}
//         <h1
//           className="text-2xl font-extrabold text-center text-gray-900 mb-6
//                xs:text-1xl
//                sm:text-1xl
//                md:text-3xl
//                lg:text-4xl"
//         >
//           {college.collegeName}
//         </h1>

//         {/* Image and Gallery Section */}
//         <div className="w-full flex flex-col md:flex-row gap-8 relative group">
//           {/* Overlay with 50% opacity */}
//           <div className="absolute inset-0 bg-black opacity-50 rounded-lg"></div>

//           {/* Main College Image - Takes Full Width If No Gallery Exists */}
//           <div
//             className={`relative ${college.imageGallery?.length > 0 ? "w-full md:w-1/2" : "w-full"}`}
//           >
//             <img
//               src={
//                 college.image?.trim() ||
//                 "https://cdn.pixabay.com/photo/2017/09/01/13/56/university-2704306_640.jpg"
//               }
//               alt={college.collegeName || "College Image"}
//               className="rounded-lg w-full h-72 object-cover shadow-lg"
//               loading="lazy"
//             />

//             {/* College Name - Always Visible on Overlay */}
//             <div className="absolute inset-0 flex items-center justify-center">
//               <h2 className="text-white text-3xl sm:text-1xl font-bold text-center px-4">
//                 {/* {college.collegeName || "Unknown College"} */}
//               </h2>
//             </div>
//           </div>

//           {/* Image Gallery - Show only if images exist */}
//           {college.imageGallery?.length > 0 && (
//             <div className="w-full md:w-1/2 grid grid-cols-2 gap-4 relative">
//               {college.imageGallery.slice(0, 4).map((img, index) => (
//                 <img
//                   key={index}
//                   src={`${BACKEND_SERVER_IP}${img}`}
//                   alt={`Gallery Image ${index + 1}`}
//                   className="rounded-lg w-full h-32 object-cover shadow-md"
//                 />
//               ))}
//             </div>
//           )}

//           {/* Hover Effect on the entire div */}
//           <div className="absolute inset-0 bg-black opacity-60 group-hover:opacity-30 transition-opacity duration-300 rounded-lg"></div>
//         </div>

//         <div className="bg-gray-50 p-5 rounded-lg w-full mt-8 shadow-md grid grid-cols-1 md:grid-cols-2 gap-8">
//           {/* Left Side - Contact Details */}
//           <div className="space-y-4">
//             <h2 className="text-2xl font-bold text-gray-800">
//               Contact Details
//             </h2>
//             <div className="flex items-center text-gray-800">
//               📞 <p className="ml-3 font-medium">{college.contactDetails}</p>
//             </div>
//             <div className="flex items-center text-gray-800">
//               ✉️ <p className="ml-3 font-medium">{college.email_id}</p>
//             </div>
//             <div className="flex items-center text-gray-800">
//               🌐
//               <a
//                 href={college.websiteURL}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="ml-3 text-indigo-600 hover:text-indigo-800 font-medium underline"
//               >
//                 {college.websiteURL}
//               </a>
//             </div>
//             <div className="flex items-center text-gray-800">
//               📍{" "}
//               <p className="ml-3 font-medium">{`${college.address.dist}, ${college.address.state}`}</p>
//             </div>
//           </div>

//           {/* Right Side - College Information */}
//           <div className="space-y-6">
//             <h2 className="text-2xl font-bold text-gray-800">
//               College Information
//             </h2>
//             <p className="text-gray-700 text-base leading-relaxed">
//               {college.info?.description}
//             </p>
//             <p>Course Type :{typeOfCourse}</p>
//           </div>
//         </div>

//         {/* Action Buttons */}

//         {/* Tabs Section */}
//         <div className="relative mt-10 border-b text-gray-600 text-sm">
//           <div className="flex justify-center px-4">
//             <div className="w-full max-w-6xl">
//               <div className="flex overflow-x-auto scrollbar-hide pb-2">
//                 <div className="flex space-x-2 md:space-x-4 min-w-max mx-auto">
//                   {navItem.map((each) => (
//                     <button
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
//                     >
//                       {each}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div ref={sectionRef} className="mt-4">
//           <HandleNavComp
//             navName={navName}
//             courses={courses}
//             infrastructure={infrastructure}
//             placementData={placements}
//             imageGallery={imageGallery}
//             review={college.collegeName}
//           />
//         </div>
//       </div>
//     </>
//   );
// };

// export default CardDetails;

import { useEffect, useRef, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
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
import { getCollege } from "./Api";
import { BACKEND_SERVER_IP } from "../Constant/constantData";
import Nav from "../Layouts/Nav";
import Lotify from "./TestComp/Lotify";

const CardDetails = () => {
  const navItem = [
    "Courses & Fees",
    "Placements",
    "Infrastructure",
    "Gallery",
    "Reviews",
  ];

  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = searchParams.get("tab") || "Overview";
  const [navName, setNavName] = useState(initialTab);
  const [isHovered, setIsHovered] = useState(false);

  const sectionRef = useRef(null);
  const tabRefs = useRef({});
  const [isManualClick, setIsManualClick] = useState(false);

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
  console.log(college , 'collegsssss')
  const courses = data?.courses;
  const infrastructure = data?.infrastructure;
  const placements = data?.placements;
  const imageGallery = data?.college?.imageGallery;
  const typeOfCourse = data?.college?.typeOfCourse;
  const subCategory = data?.college?.subCategory;

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
          className="fixed mt-110 right-5 z-50 flex items-center transition-all duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
        >
          <motion.span
            className="w-28 h-28"
            animate={isHovered ? { rotate: 10 } : { rotate: 0 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Lotify icon="/public/Lottiefiles/Animation - 1743060162749.json" />
          </motion.span>
          {isHovered && (
            <motion.span
              className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium ml-2"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
            >
              Call Now
            </motion.span>
          )}
        </motion.a>
      </AnimatePresence>

      <motion.div
        className="max-w-full mx-auto p-4 mt-15"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
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
  className="w-full flex flex-col md:flex-row gap-8"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.4 }}
>
  {/* Left Side - Main College Image (Always shown) */}
  <div className="w-full md:w-1/2">
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

  {/* Right Side - Gallery Images (Only shown if gallery exists) */}
  {college.imageGallery?.length > 0 && (
    <motion.div
      className="w-full md:w-1/2"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Single Image Case - Takes full width */}
      {college.imageGallery.length === 1 && (
        <motion.img
          src={`${BACKEND_SERVER_IP}${college.imageGallery[0]}`}
          alt="Gallery Image 1"
          className="rounded-lg w-full h-72 object-cover shadow-lg"
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
        />
      )}

      {/* Two Images Case - Shows both in grid */}
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
          className="bg-gray-50 p-5 rounded-lg w-full mt-8 shadow-md grid grid-cols-1 md:grid-cols-2 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {/* Left Side - Contact Details */}
          <motion.div
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h2
              className="text-2xl font-bold text-gray-800"
              variants={itemVariants}
            >
              Contact Details
            </motion.h2>

            <motion.div
              className="bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              variants={itemVariants}
              whileHover={{ x: 5 }}
            >
              <div className="flex items-center text-gray-800">
                <FaPhoneAlt className="mr-3 text-blue-600" />
                <p className="font-medium">{college.contactDetails || "N/A"}</p>
              </div>
            </motion.div>

            <motion.div
              className="bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              variants={itemVariants}
              whileHover={{ x: 5 }}
            >
              <div className="flex items-center text-gray-800">
                <FaEnvelope className="mr-3 text-blue-600" />
                <p className="font-medium">{college.email_id || "N/A"}</p>
              </div>
            </motion.div>

            <motion.div
              className="bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              variants={itemVariants}
              whileHover={{ x: 5 }}
            >
              <div className="flex items-center text-gray-800">
                <FaGlobe className="mr-3 text-blue-600" />
                {college.websiteURL ? (
                  <a
                    href={college.websiteURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:text-indigo-800 font-medium underline"
                  >
                    {college.websiteURL}
                  </a>
                ) : (
                  <p className="font-medium">N/A</p>
                )}
              </div>
            </motion.div>

            <motion.div
              className="bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              variants={itemVariants}
              whileHover={{ x: 5 }}
            >
              <div className="flex items-center text-gray-800">
                <FaMapMarkerAlt className="mr-3 text-blue-600" />
                <p className="font-medium">
                  {college.address?.[0]?.line1 &&
                    `${college.address[0].line1}, `}
                  {college.address?.[0]?.line2 &&
                    `${college.address[0].line2}, `}
                  {college.address?.[0]?.dist && `${college.address[0].dist}, `}
                  {college.address?.[0]?.state &&
                    `${college.address[0].state}, `}
                  {college.address?.[0]?.pincode && college.address[0].pincode}
                  {!college.address?.[0] && "N/A"}
                </p>
              </div>
            </motion.div>
            {college.keywords?.length > 0 && (
          <motion.div 
            className="flex flex-wrap justify-center gap-2 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {college.keywords.map((keyword, index) => (
              <motion.span
                key={index}
                className="bg-gray-100 text-gray-800 text-xs font-medium px-3 py-1 rounded-full"
                whileHover={{ scale: 1.05, backgroundColor: "#EFF6FF", color: "#2563EB" }}
              >
                #{keyword}
              </motion.span>
            ))}
          </motion.div>
        )}
          </motion.div>

          {/* Right Side - College Information */}
          <motion.div
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h2
              className="text-2xl font-bold text-gray-800"
              variants={itemVariants}
            >
              College Information
            </motion.h2>

            <motion.div
              className="grid grid-cols-2 gap-4"
              variants={containerVariants}
            >
              <motion.div
                variants={itemVariants}
                className="bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center mb-1">
                  <FaCalendarAlt className="mr-2 text-blue-600" />
                  <h3 className="font-semibold text-gray-700">
                    Established Year
                  </h3>
                </div>
                <p className="text-gray-600 ml-6">
                  {college.establishedYear || "N/A"}
                </p>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center mb-1">
                  <FaUniversity className="mr-2 text-blue-600" />
                  <h3 className="font-semibold text-gray-700">
                    Affiliated University
                  </h3>
                </div>
                <p className="text-gray-600 ml-6">
                  {college.affiliatedUniversity || "N/A"}
                </p>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center mb-1">
                  <FaGraduationCap className="mr-2 text-blue-600" />
                  <h3 className="font-semibold text-gray-700">Category</h3>
                </div>
                <p className="text-gray-600 ml-6">
                  {college.category || "N/A"}
                </p>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center mb-1">
                  <FaBook className="mr-2 text-blue-600" />
                  <h3 className="font-semibold text-gray-700">
                    Sub Categories
                  </h3>
                </div>
                <p className="text-gray-600 ml-6">
                  {college.subCategory?.join(", ") || "N/A"}
                </p>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow col-span-2"
              >
                <div className="flex items-center mb-1">
                  <FaClipboardList className="mr-2 text-blue-600" />
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
                className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
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

        {/* Tabs Section */}
        <motion.div
          className="relative mt-10 border-b text-gray-600 text-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
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
            logo={college.logo}
          />
        </motion.div>
      </motion.div>
    </>
  );
};

export default CardDetails;
