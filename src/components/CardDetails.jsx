import { useEffect, useRef, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
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
import CoursesFee from "./navComp/CoursesFee";
import CoursesSection from "./CourseSection";
import CollegeCoursesTable from "./CourseSection";
import ContactDetails from "./ContactDetails";

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
