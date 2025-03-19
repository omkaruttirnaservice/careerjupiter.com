import { useEffect, useRef, useState } from "react";
import { NavLink, useParams, useSearchParams } from "react-router-dom";
import { FaPhone, FaEnvelope, FaGlobe, FaMapMarkerAlt } from "react-icons/fa";
import HandleNavComp from "./HandleNavComp";
import { useQuery } from "@tanstack/react-query";
import { getCollege } from "./Api";
import { BACKEND_SERVER_IP } from "../Constant/constantData";
import { FaPhoneAlt } from 'react-icons/fa'; // Contact icon
import Nav from "../Layouts/Nav";


const CardDetails = () => {
  const navItem = [
    // "Overview",
    "Courses & Fees",
    // "Scholarship",
    "Placements",
    // "CutOffs",
    // "Ranking",
    "Infrastructure",
    "Gallery",
    "Reviews",
    // "News",
    // "QnA",
  ];

  const { id } = useParams();

  const [searchParams, setSearchParams] = useSearchParams();

  const initialTab = searchParams.get("tab") || "Overview";
  const [navName, setNavName] = useState(initialTab);

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
  const courses = data?.courses;
  const infrastructure = data?.infrastructure;
  const placements = data?.placements;
  const imageGallery = data?.college?.imageGallery;

  if (!college) {
    return <p className="text-center text-gray-600 mt-8">No data found.</p>;
  }

  return (
    <>
    <Nav/>
      <a
        href="tel:+1234567890" // Replace with your phone number
        className="fixed bottom-6 right-6 z-5 flex items-center gap-3 bg-green-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-green-700 transition-all duration-300 hover:scale-100 animate-bounce"
      >
        <FaPhoneAlt className="text-2xl animate-wiggle" /> {/* Animated icon */}
        <span className="font-bold text-lg">Call Now</span>
      </a>
      <div className="max-w-7xl mx-auto p-4 mt-5">
        {/* College Name at the Top */}
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-8">
          {college.collegeName}
        </h1>

        {/* Image and Gallery Section */}
        <div className="w-full flex flex-col md:flex-row gap-8 relative group">
  {/* Overlay with 50% opacity */}
  <div className="absolute inset-0 bg-black opacity-50 rounded-lg"></div>

  {/* Main College Image - Takes Full Width If No Gallery Exists */}
  <div className={`relative ${college.imageGallery?.length > 0 ? "w-full md:w-1/2" : "w-full"}`}>
    <img
      src={college.image?.trim() || "https://cdn.pixabay.com/photo/2017/09/01/13/56/university-2704306_640.jpg"}
      alt={college.collegeName || "College Image"}
      className="rounded-lg w-full h-72 object-cover shadow-lg"
      loading="lazy"
    />
    
    {/* College Name - Always Visible on Overlay */}
    <div className="absolute inset-0 flex items-center justify-center">
      <h2 className="text-white text-3xl font-bold text-center px-4">
        {college.collegeName || "Unknown College"}
      </h2>
    </div>
  </div>

  {/* Image Gallery - Show only if images exist */}
  {college.imageGallery?.length > 0 && (
    <div className="w-full md:w-1/2 grid grid-cols-2 gap-4 relative">
      {college.imageGallery.slice(0, 4).map((img, index) => (
        <img
          key={index}
          src={`${BACKEND_SERVER_IP}${img}`}
          alt={`Gallery Image ${index + 1}`}
          className="rounded-lg w-full h-32 object-cover shadow-md"
        />
      ))}
    </div>
  )}

  {/* Hover Effect on the entire div */}
  <div className="absolute inset-0 bg-black opacity-60 group-hover:opacity-30 transition-opacity duration-300 rounded-lg"></div>
</div>

        <div className="bg-gray-50 p-8 rounded-lg w-full mt-8 shadow-md grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Side - Contact Details */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">Contact Details</h2>
            <div className="flex items-center text-gray-800">
              📞 <p className="ml-3 font-medium">{college.contactDetails}</p>
            </div>
            <div className="flex items-center text-gray-800">
              ✉️ <p className="ml-3 font-medium">{college.email_id}</p>
            </div>
            <div className="flex items-center text-gray-800">
              🌐
              <a
                href={college.websiteURL}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-3 text-indigo-600 hover:text-indigo-800 font-medium underline"
              >
                {college.websiteURL}
              </a>
            </div>
            <div className="flex items-center text-gray-800">
              📍 <p className="ml-3 font-medium">{`${college.address.dist}, ${college.address.state}`}</p>
            </div>
          </div>

          {/* Right Side - College Information */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">College Information</h2>
            <p className="text-gray-700 text-base leading-relaxed">
              {college.info?.description}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        {/* <div className="flex flex-col sm:flex-row gap-6 justify-center mt-8">
  <button className="cursor-pointer bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-8 py-3 rounded-full hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg text-lg font-semibold">
    📥 Download Brochure
  </button>
  <button className="cursor-pointer border-2 border-indigo-600 text-indigo-600 px-8 py-3 rounded-full hover:bg-indigo-600 hover:text-white transition-all shadow-lg text-lg font-semibold">
    ⭐ Show Reviews
  </button>
</div> */}



        {/* Tabs Section */}
        <div className="relative mt-10 border-b text-gray-600 text-sm">
          <div className="flex justify-center">
            <div className="flex items-center overflow-x-auto scrollbar-hide scroll-smooth w-full max-w-3xl justify-center md:space-x-4">
              <div className="flex space-x-6 px-4 md:px-0 overflow-x-auto scrollbar-hide">
                {navItem.map((each) => (
                  <div
                    key={each}
                    ref={(el) => (tabRefs.current[each] = el)}
                    onClick={(e) => {
                      e.preventDefault(); // Prevent scrolling to top
                      handleNavName(each);
                    }}
                    className={`cursor-pointer h-8 px-6 rounded-md transition-all duration-300 font-bold flex items-center justify-center ${each === navName
                        ? "text-blue-600 bg-gray-200"
                        : "text-gray-600 hover:text-blue-600 hover:bg-gray-300 hover:h-12"
                      }`}
                  >
                    {each}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>





        <div ref={sectionRef} className="mt-4">
          <HandleNavComp
            navName={navName}
            courses={courses}
            infrastructure={infrastructure}
            placementData={placements}
            imageGallery={imageGallery}
            review={college.collegeName}
          />
        </div>
      </div>
    </>
  );
};

export default CardDetails;
