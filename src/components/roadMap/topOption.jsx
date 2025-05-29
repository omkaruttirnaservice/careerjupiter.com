import { motion } from "framer-motion";
import { FaUniversity, FaSchool } from "react-icons/fa";

const gradientButtonStyles =
  "relative px-5 py-3 sm:px-6 sm:py-3 rounded-full text-white font-semibold text-xs sm:text-sm overflow-hidden bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 bg-[length:200%_200%]";

const TopOptions = ({ navigate }) => {
  return (
    <div className="flex justify-center gap-4 mb-6">
      {/* College Button */}
      <motion.button
        className={`${gradientButtonStyles} flex items-center gap-2 shadow-lg`}
        initial={{ scale: 0.95 }}
        animate={{
          scale: [0.95, 1.05, 0.95],
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          scale: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          },
          backgroundPosition: {
            duration: 4,
            repeat: Infinity,
            ease: "linear",
          },
        }}
        whileHover={{
          scale: 1.1,
          boxShadow: "0 0 20px rgba(107, 33, 255, 0.6)",
        }}
        whileTap={{ scale: 0.9 }}
        onClick={() => navigate("/college")}
      >
        <FaUniversity className="text-white" />
        <span className="relative z-10">Search Best College</span>
        <motion.span
          className="absolute inset-0 bg-white opacity-0 hover:opacity-10"
          transition={{ duration: 0.3 }}
        />
      </motion.button>

      {/* Classes Button */}
      <motion.button
        className={`${gradientButtonStyles} flex items-center gap-2 shadow-lg`}
        initial={{ scale: 0.95 }}
        animate={{
          scale: [0.95, 1.05, 0.95],
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          scale: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          },
          backgroundPosition: {
            duration: 4,
            repeat: Infinity,
            ease: "linear",
          },
        }}
        whileHover={{
          scale: 1.1,
          boxShadow: "0 0 20px rgba(107, 33, 255, 0.6)",
        }}
        whileTap={{ scale: 0.9 }}
        onClick={() => navigate("/class")}
      >
        <FaSchool className="text-white" />
        <span className="relative z-10">Search Best Classes</span>
        <motion.span
          className="absolute inset-0 bg-white opacity-0 hover:opacity-10"
          transition={{ duration: 0.3 }}
        />
      </motion.button>
    </div>
  );
};

export default TopOptions;
