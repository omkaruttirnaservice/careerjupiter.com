import { FaTrophy, FaChartLine, FaTags, FaMapMarkerAlt } from "react-icons/fa";

const InstituteCard = ({ institute, onClick }) => {
  return (
    <div
      className="max-w-sm rounded-lg overflow-hidden shadow-md m-4 cursor-pointer hover:shadow-lg transition-transform duration-300 transform hover:-translate-y-1 bg-white"
      onClick={onClick}
    >
      {/* Image */}
      <img
        className="w-full h-36 object-cover"
        src={institute.image}
        alt={institute.name}
      />

      {/* Content */}
      <div className="p-4">
        <h2 className="font-bold text-xl text-gray-800 mb-3">{institute.name}</h2>

        {/* Rank & Success Ratio */}
        <div className="flex justify-between items-center mb-3 text-sm text-gray-700">
          <div className="flex items-center space-x-1">
            <FaTrophy className="text-yellow-500" />
            <p><strong>Rank:</strong> {institute.rank}</p>
          </div>
          <div className="flex items-center space-x-1">
            <FaChartLine className="text-green-500" />
            <p><strong>Success Ratio:</strong> {institute.successRatio}%</p>
          </div>
        </div>

        {/* Category */}
        <div className="flex items-center space-x-1 text-sm text-gray-700 mb-3">
          <FaTags className="text-blue-500" />
          <p><strong>Category:</strong> {institute.category || "N/A"}</p>
        </div>

        {/* Location at the bottom */}
        <div className="flex items-center space-x-1 text-sm text-gray-700">
          <FaMapMarkerAlt className="text-red-500" />
          <p><strong>Location:</strong> {institute.location}</p>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-xs mt-4 line-clamp-2">
          {institute.description}
        </p>
      </div>
    </div>
  );
};

export default InstituteCard;