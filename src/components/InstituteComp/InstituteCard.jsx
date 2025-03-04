import { FaTrophy, FaChartLine, FaTags, FaMapMarkerAlt } from "react-icons/fa";
import { BACKEND_SERVER_IP } from "../../Constant/constantData";

const InstituteCard = ({ institute, onClick }) => {
  return (
    <div
      className="max-w-2xl rounded-lg overflow-hidden shadow-lg cursor-pointer hover:shadow-xl transition duration-300 transform hover:-translate-y-1 bg-white"
      onClick={onClick}
    >
      {/* Image */}
      <img
        className="w-full h-60 object-cover"
        src={`${BACKEND_SERVER_IP}${institute.image}`}
        alt={institute.className || "Institute Image"}
      />

      {/* Content */}
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-3">
          {institute.className || "Institute Name"}
        </h2>

        {/* Rank & Success Ratio */}
        <div className="flex justify-between items-center mb-4 text-sm text-gray-700">
          <div className="flex items-center space-x-2">
            <FaTrophy className="text-yellow-500" />
            <p>
              <strong>Rank:</strong> {institute.rank || "N/A"}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <FaChartLine className="text-green-500" />
            <p>
              <strong>Success Ratio:</strong>{" "}
              {institute.studentSuccessRatio || "N/A"}
            </p>
          </div>
        </div>

        {/* Category */}
        <div className="flex items-center space-x-2 text-sm text-gray-700 mb-3">
          <FaTags className="text-blue-500" />
          <p>
            <strong>Category:</strong> {institute.Category || "N/A"}
          </p>
        </div>

        {/* Location */}
        <div className="flex items-center space-x-2 text-sm text-gray-700">
          <FaMapMarkerAlt className="text-red-500" />
          <p>
            <strong>Location:</strong>{" "}
            {`${institute.address.dist}, ${institute.address.state}` || "N/A"}
          </p>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mt-4 line-clamp-3">
          {institute.info.description || "No description available."}
        </p>
      </div>
    </div>
  );
};

export default InstituteCard;
