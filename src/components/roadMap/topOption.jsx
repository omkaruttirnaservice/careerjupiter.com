
import { motion } from "framer-motion"
import { FaUniversity, FaSchool } from "react-icons/fa"

// Component for the options at the top of the blue div
const TopOptions = ({ navigate }) => {
  return (
    <div className="flex justify-center gap-4 mb-6">
      <motion.button
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate("/college")}
        className="flex items-center gap-2 bg-white text-indigo-600 px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all border-2 border-indigo-200"
      >
        <FaUniversity className="text-indigo-500" />
        <span className="font-medium">Search Best College</span>
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate("/class")}
        className="flex items-center gap-2 bg-white text-indigo-600 px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all border-2 border-indigo-200"
      >
        <FaSchool className="text-indigo-500" />
        <span className="font-medium">Search Best Classes</span>
      </motion.button>
    </div>
  )
}

export default TopOptions
