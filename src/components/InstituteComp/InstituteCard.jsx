import { FaMapMarkerAlt } from "react-icons/fa";
import { motion } from "framer-motion";

const InstituteCard = ({ institute, onClick }) => {
  return (
    <motion.div
      onClick={onClick}
      className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white cursor-pointer"
      whileHover={{ scale: 1.02, y: -3 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Image */}
      <div className="overflow-hidden w-full h-48">
        <motion.img
          className="w-full h-full object-cover transform hover:scale-125 transition duration-500 ease-in-out"
          src={institute.image || "https://via.placeholder.com/600"}
          alt={institute.name || "Institute Image"}
        />
      </div>

      {/* Content */}
      <div className="p-4">
        <h2 className="text-lg font-bold text-gray-800">
          {institute.name || "Institute Name"}
        </h2>
        
        {/* Location */}
        <div className="flex items-center text-sm text-gray-600 mt-1">
          <FaMapMarkerAlt className="text-red-500 mr-1" />
          <p>{institute.location || "Location"}</p>
        </div>

        

        {/* Tags (Rank, Category, Success Ratio) */}
        <div className="flex flex-wrap gap-2 mt-3">
          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
            Rank: {institute.rank || "N/A"}
          </span>
          <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
            Category: {institute.category || "N/A"}
          </span>
          <span className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
            Success: {institute.studentSuccessRatio || "N/A"}
          </span>
        </div>
        Description
        <p className="text-gray-600 text-sm mt-2 line-clamp-3">
          {institute.description || "No description available."}
        </p>
      </div>
    </motion.div>
  );
};

export default InstituteCard;
