import { useEffect, useRef, useState } from "react";
import { NavLink, useParams, useSearchParams } from "react-router-dom";
import { FaPhone, FaEnvelope, FaGlobe, FaMapMarkerAlt } from "react-icons/fa";
import HandleNavComp from "./HandleNavComp";

const CardDetails = () => {
  const navItem = [
    "Overview",
    "Courses & Fees",
    "Scholarship",
    "Placements",
    "CutOffs",
    "Ranking",
    "Campus",
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

  // Manual click tracking
  const [isManualClick, setIsManualClick] = useState(false);

  const handleNavName = (tabName) => {
    setNavName(tabName);
    setSearchParams({ tab: tabName });

    // User manually click kela -> Scroll to section + Tab Focus
    setIsManualClick(true);

    setTimeout(() => {
      sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      tabRefs.current[tabName]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }, 100);
  };

  const cards = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1562774053-701939374585?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y29sbGVnZXxlbnwwfHwwfHx8MA%3D%3D",
      name: "first",
      description:
        "A leading institution offering world-class education in various fields A leading institution offering world-class education in various fields .A leading institution offering world-class education in various fields",
      rating: 4.5,
    },
  ];

  const card = cards.find((c) => c.id === parseInt(id));

  // On manual click - scroll to section
  useEffect(() => {
    if (isManualClick) {
      sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      tabRefs.current[navName]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
      setIsManualClick(false); // Reset
    }
  }, [navName]);

  // Page load zalyavar top lach rahava (refresh case)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!card) {
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
            <h1 className="text-2xl font-bold">
              IIT Madras - Admission 2025 {card.name}
            </h1>
            <div className="flex items-center mt-2 text-gray-600">
              <span className="bg-yellow-400 text-white px-2 py-1 rounded text-sm">
                {card.rating} ⭐
              </span>
            </div>
            <p className="mt-2 text-gray-700 text-sm">{card.description}</p>
            <div className="mx-auto bg-white mt-5 space-y-3">
              <div className="flex items-center">
                <FaPhone className="text-blue-500 mr-4" size={15} />
                <p className="text-gray-800 ">+91 12345 67890</p>
              </div>
              <div className="flex items-center">
                <FaEnvelope className="text-blue-500 mr-4" size={15} />
                <p className="text-gray-800 ">info@example.com</p>
              </div>
              <div className="flex items-center">
                <FaGlobe className="text-blue-500 mr-4" size={15} />
                <a
                  href="https://example.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  https://example.com
                </a>
              </div>
              <div className="flex items-center">
                <FaMapMarkerAlt className="text-blue-500 mr-4" size={15} />
                <p className="text-gray-800 ">123 Main Street, Chennai, India</p>
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
              src={card.image}
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
          <HandleNavComp navName={navName} />
        </div>
      </div>
    </>
  );
};

export default CardDetails;
