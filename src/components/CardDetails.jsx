import { useEffect, useRef, useState } from "react";
import { NavLink, useParams, useSearchParams } from "react-router-dom";
import { FaPhone, FaEnvelope, FaGlobe, FaMapMarkerAlt } from "react-icons/fa";
import HandleNavComp from "./HandleNavComp";
import { useQuery } from "@tanstack/react-query";
import { getCollege } from "../api/ApiService";
import { BACKEND_SERVER_IP } from "../Constant/constantData";

const CardDetails = () => {
  const navItem = [
    "Overview",
    "Courses & Fees",
    "Scholarship",
    "Placements",
    "CutOffs",
    "Ranking",
    "Infrastructure",
    "Gallery",
    "Reviews",
    "News",
    "QnA",
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
      setIsManualClick(false); // Reset
    }
  }, [navName]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const { data } = useQuery({
    queryKey: ["college", id],
    queryFn: () => getCollege(id),
  });

  useEffect(() => {
    console.log(data);
  }, [data]);

  const college = data?.college;
  const courses = data?.courses;
  const infrastructure = data?.infrastructure;

  console.log("college data:",data);

  if (!college) {
    return <p className="text-center text-gray-600 mt-8">No data found.</p>;
  }

  return (
    <>
      <button className="fixed bottom-6 right-6 z-10 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition duration-300">
        <NavLink to="/review"> 📝 Review</NavLink>
      </button>
      <div className="max-w-7xl mx-auto p-4 mt-15">
        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col md:flex-row relative">
          <div className="md:w-2/3 p-4">
            <h1 className="text-2xl font-bold">{college.collegeName}</h1>
            <div className="flex items-center mt-2 text-gray-600">
              <span className="bg-yellow-400 text-white px-2 py-1 rounded text-sm">
                {data.rating} ⭐
              </span>
            </div>
            <p className="mt-2 text-gray-700 text-sm">
              {college.info?.description}
            </p>
            <div className="mx-auto bg-white mt-5 space-y-3">
              <div className="flex items-center">
                <FaPhone className="text-blue-500 mr-4" size={15} />
                <p className="text-gray-800 ">{college.contactDetails}</p>
              </div>
              <div className="flex items-center">
                <FaEnvelope className="text-blue-500 mr-4" size={15} />
                <p className="text-gray-800 ">{college.email_id}</p>
              </div>
              <div className="flex items-center">
                <FaGlobe className="text-blue-500 mr-4" size={15} />
                <a
                  href={college.websiteURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {college.websiteURL}
                </a>
              </div>
              <div className="flex items-center">
                <FaMapMarkerAlt className="text-blue-500 mr-4" size={15} />
                <p className="text-gray-800 ">
                  {`${college.address.dist}`},&nbsp;
                  {`${college.address.state}`}
                </p>
              </div>
            </div>
            <div className="mt-4 flex space-x-4">
              <button className="bg-blue-600 cursor-pointer text-white px-4 py-2 rounded-md hover:bg-blue-700">
                Download Brochure
              </button>
              <button className="cursor-pointer border border-blue-600 text-blue-600 px-4 py-2 rounded-md hover:bg-blue-600 hover:text-white">
                Show Reviews
              </button>
            </div>
          </div>

          <div className="md:w-1/3 flex justify-center relative">
            <img
              src={`${BACKEND_SERVER_IP}${college.image}`}
              alt="College Building"
              className="rounded-lg w-full h-auto"
            />
          </div>
        </div>

        {/* Tabs Section */}
        <div className="gap-3 md:gap-1 mt-6 border-b flex items-center space-x-2 overflow-x-auto md:justify-start text-gray-600 text-sm scrollbar-hide">
          {navItem.map((each) => (
            <div
              key={each}
              ref={(el) => (tabRefs.current[each] = el)}
              onClick={() => handleNavName(each)}
              className={`cursor-pointer h-10 flex items-center justify-center px-4 whitespace-nowrap transition-all rounded-md ${
                each === navName
                  ? "text-blue-600 hover:bg-gray-200 border-b-2 border-blue-600 font-semibold"
                  : "text-gray-600 hover:bg-gray-200"
              }`}
            >
              {each}
            </div>
          ))}
        </div>

        <div ref={sectionRef} className="mt-4">
          <HandleNavComp
            navName={navName}
            courses={courses}
            infrastructure={infrastructure}
          />
        </div>
      </div>
    </>
  );
};

export default CardDetails;
