import { FaTrophy, FaChartLine, FaTags, FaMapMarkerAlt } from "react-icons/fa";
import { BACKEND_SERVER_IP } from "../../Constant/constantData";
import Lotify from "../TestComp/Lotify";

const InstituteCard = ({ institute, onClick }) => {
  // Check if the image is available
  const imageUrl = institute.image ? `${BACKEND_SERVER_IP}${institute.image}` : null;

  console.log("institute data------", institute);
  

  return (
    <div
      className="max-w-2xl mt-5 rounded-lg overflow-hidden shadow-lg cursor-pointer hover:shadow-xl transition duration-300 transform hover:-translate-y-1 bg-white"
      onClick={onClick}
    >
      <div
        className="w-full h-60 relative flex items-center justify-center text-white text-lg font-bold"
        style={{
          backgroundImage: imageUrl
            ? `url(${imageUrl})`
            : "linear-gradient(to right, #667eea, #764ba2)", // Apply gradient if image is null
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {imageUrl && (
          <img
            src={imageUrl}
            alt={institute?.className || "Institute Image"}
            className="absolute inset-0  w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = "none";
              e.target.parentNode.style.backgroundImage =
                "linear-gradient(to right, #667eea, #764ba2)";
            }}
          />
        )}
        <span className="absolute text-xl z-10">
          {institute?.className || "No Image Available"}
        </span>
      </div>
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-3">
          {institute.className || "Institute Name"}
        </h2>
        <div className="flex ml-2 items-center space-x-2 text-sm text-gray-700 mb-3">
          <FaTags className="text-blue-500" />
          <p>
            <strong>Category:</strong> {institute.Category || "N/A"}
          </p>
        </div>

        <div className="flex items-center space-x-2 text-sm text-gray-700">
          <p className="text-gray-500 text-sm mt-1 flex items-center gap-1">
            <span className="w-8 h-8">
              <Lotify icon="\Lottiefiles\Animation - 1742988929198 (1).json" />
            </span>
            <p>
              <strong>Location:</strong>{" "}
              {Array.isArray(institute.address) && institute.address.length > 0
                ? `${institute.address.length} address${institute.address.length > 1 ? "es" : ""} available`
                : "No address available"}
            </p>
          </p>
        </div>

        <p className="text-gray-600 text-sm mt-4 line-clamp-3">
          Description :
          {institute.info?.description || "No description available."}
        </p>
      </div>
    </div>
  );
};

export default InstituteCard;
