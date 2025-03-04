import { useEffect, useRef, useState } from "react";
import { NavLink, useParams, useSearchParams } from "react-router-dom";
import { FaPhone, FaEnvelope, FaGlobe, FaMapMarkerAlt } from "react-icons/fa";
import HandleNavComp from "./HandleNavComp";
import { useQuery } from "@tanstack/react-query";
import { getCollege } from "./Api";
import { BACKEND_SERVER_IP } from "../Constant/constantData";

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
      <button className="fixed bottom-6 right-6 z-10 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition duration-300">
        <NavLink to="/review"> 📝 Review</NavLink>
      </button>
      <div className="max-w-7xl mx-auto p-4 mt-5">
        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col md:flex-row gap-6 relative max-w-4xl mx-auto">
          <div className="md:w-2/3 space-y-4">
            <h1 className="text-2xl font-bold text-gray-900">
              {college.collegeName}
            </h1>
            <div className="flex items-center text-gray-600">
              <span className="bg-yellow-400 text-white px-2 py-1 rounded text-sm font-semibold">
                {data.rating} ⭐
              </span>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">
              {college.info?.description}
            </p>

            {/* Contact Details */}
            <div className="bg-gray-50 p-4 rounded-lg space-y-3">
              <div className="flex items-center text-gray-700">
                <FaPhone className="text-blue-500 mr-3" size={18} />
                <p>{college.contactDetails}</p>
              </div>
              <div className="flex items-center text-gray-700">
                <FaEnvelope className="text-blue-500 mr-3" size={18} />
                <p>{college.email_id}</p>
              </div>
              <div className="flex items-center text-gray-700">
                <FaGlobe className="text-blue-500 mr-3" size={18} />
                <a
                  href={college.websiteURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {college.websiteURL}
                </a>
              </div>
              <div className="flex items-center text-gray-700">
                <FaMapMarkerAlt className="text-blue-500 mr-3" size={18} />
                <p>{`${college.address.dist}, ${college.address.state}`}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
                Download Brochure
              </button>
              <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded-md hover:bg-blue-600 hover:text-white transition">
                Show Reviews
              </button>
            </div>
          </div>

          {/* Image Section */}
          <div className="w-full flex justify-center items-center mt-10">
            <img
              src={`${BACKEND_SERVER_IP}${college.image}`}
              alt="College Building"
              className="rounded-lg w-full h-auto max-w-3xl object-cover shadow-md"
            />
          </div>
        </div>

        {/* Tabs Section */}

        <div className="relative mt-6 border-b text-gray-600 text-sm">
          <div className="flex justify-center">
            <div className="flex items-center overflow-x-auto scrollbar-hide scroll-smooth w-full max-w-3xl justify-center md:space-x-2">
              <div className="flex space-x-4 md:space-x-6 px-4 md:px-0 overflow-x-auto scrollbar-hide">
                {navItem.map((each) => (
                  <div
                    key={each}
                    ref={(el) => (tabRefs.current[each] = el)}
                    onClick={() => handleNavName(each)}
                    className={`cursor-pointer h-10 px-4 whitespace-nowrap transition-all rounded-md snap-start ${
                      each === navName
                        ? "text-blue-600 hover:bg-gray-200 border-b-2 border-blue-600 font-semibold"
                        : "text-gray-600 hover:bg-gray-200"
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
