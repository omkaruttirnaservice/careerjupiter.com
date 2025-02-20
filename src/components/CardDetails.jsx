import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
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

  const [navName, setNavName] = useState("Overview");

  const handleNavName = (e)=>{
    setNavName(e.target.innerText);
  }


  const { id } = useParams();

  const cards = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1562774053-701939374585?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y29sbGVnZXxlbnwwfHwwfHx8MA%3D%3D", // Replace with your image URL
      name: "first",
      description:
        "A leading institution offering world-class education in various fields A leading institution offering world-class education in various fields .A leading institution offering world-class education in various fields",
      rating: 4.5,
    },
  ];

  const card = cards.find((c)=>c.id === parseInt(id));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [card]);

  if (!card) {
    return <p className="text-center text-gray-600 mt-8">No data found.</p>;
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-10 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition duration-300"
      >
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
            <div className=" mx-auto bg-white mt-5">
              {/* Contact Information */}
              <div className="flex items-center">
                <FaPhone className="text-blue-500 mr-4" size={15} />
                <div>
                  <p className="text-gray-800 ">+91 12345 67890</p>
                </div>
              </div>
              <div className="flex items-center">
                <FaEnvelope className="text-blue-500 mr-4" size={15} />
                <div>
                  <p className="text-gray-800 ">info@example.com</p>
                </div>
              </div>
              <div className="flex items-center">
                <FaGlobe className="text-blue-500 mr-4" size={15} />
                <div>
                  <a
                    href="https://example.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    https://example.com
                  </a>
                </div>
              </div>
              <div className="flex items-center">
                <FaMapMarkerAlt className="text-blue-500 mr-4" size={15} />
                <div>
                  <p className="text-gray-800 ">
                    123 Main Street, Chennai, India
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-4 flex space-x-4">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                Download Brochure
              </button>
              <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded-md hover:bg-blue-600 hover:text-white">
                Show Reviews
              </button>
            </div>
          </div>

          {/* Right Side - Image & Badges */}
          <div className="md:w-1/3 flex justify-center relative">
            <img
              src={card.image}
              alt="College Building"
              className="rounded-lg"
            />
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mt-6 border-b flex items-center justify-start md:justify-center space-x-6 text-gray-600 text-sm overflow-x-auto">
          {navItem.map((each) => {
            return (
              <span
                key={each}
                onClick={handleNavName}
                className={`cursor-pointer ${each === navName ? " text-blue-600 border-b-2 border-blue-600 pb-2" : ""}`}
              >
                {each}
              </span>
            );
          })}
        </div>
        <HandleNavComp navName={navName} />
      </div>
    </>
  );
};

export default CardDetails;
