// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';

// const CheckEligibility = () => {
//   const navigate = useNavigate();

//   const handleCheckEligibility = () => {
//     document.getElementById('container').classList.add('fade-out');
//     setTimeout(() => {
//       navigate('/my-eligibility');
//     }, 600); // Matches the animation duration
//   };

//   return (
//     <motion.div 
//       id="container"
//       className="flex items-center justify-between min-h-[60vh] bg-cover bg-center transition-all duration-500 p-10" 
//       style={{ backgroundImage: "url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?fit=crop&w=1600&q=80')" }}
//       initial={{ opacity: 1 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//     >
//       {/* Left side with content */}
//       <motion.div 
//         className="bg-blue-300 opacity-100 p-12 rounded-3xl shadow-2xl max-w-lg w-1/2 border backdrop-blur-md"
//         initial={{ x: -50, opacity: 0 }}
//         animate={{ x: 0, opacity: 1 }}
//         transition={{ duration: 0.5 }}
//       >
//         <h1 className="text-5xl font-extrabold text-indigo-700 mb-6 text-left">Are You Eligible?</h1>
//         <p className="text-lg text-gray-800 mb-8 text-left">Explore the possibilities and see if you're qualified for the next big step in your career journey.</p>
//         <motion.button 
//           onClick={handleCheckEligibility} 
//           className="cursor-pointer px-8 py-4 text-white bg-indigo-700 rounded-full font-bold text-xl shadow-lg flex items-center gap-2 hover:bg-purple-700 transition-all"
//           whileHover={{ scale: 1.1 }}
//           whileTap={{ scale: 0.9 }}
//         >
//           Check Eligibility
//           <motion.span 
//             className="text-2xl ml-2" 
//             animate={{ x: [0, 10, 0] }}
//             transition={{ repeat: Infinity, duration: 1 }}
//           >
//             ➡️
//           </motion.span>
//         </motion.button>
//       </motion.div>

//       {/* Right side with image */}
//       <motion.div 
//         className="w-1/2 flex items-center justify-center"
//         initial={{ x: 50, opacity: 0 }}
//         animate={{ x: 0, opacity: 1 }}
//         transition={{ duration: 0.5 }}
//       >
//         <img 
//           src="https://medicaldialogues.in/h-upload/2024/08/21/248880-eligibility-criteria.webp" 
//           alt="Eligibility Check" 
//           className="rounded-2xl shadow-lg w-full max-w-md bg-opacity-50"
//         />
//       </motion.div>
//     </motion.div>
//   );
// };

// export default CheckEligibility;

// /* Add fade-out animation in CSS */
// const style = document.createElement('style');
// style.innerHTML = `
//   .fade-out {
//     animation: fadeOut 0.6s ease forwards;
//   }
//   @keyframes fadeOut {
//     from { opacity: 1; transform: scale(1); }
//     to { opacity: 0; transform: scale(0.9); }
//   }
// `;
// document.head.appendChild(style);

import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const CheckEligibility = () => {
  const navigate = useNavigate();

  const handleCheckEligibility = () => {
    document.getElementById("container").classList.add("fade-out");
    setTimeout(() => {
      navigate("/my-eligibility");
    }, 600);
  };

  return (
    <motion.div
      id="container"
      className="flex flex-col lg:flex-row items-center justify-center min-h-[70vh] bg-gray-900 transition-all duration-500 p-6 sm:p-10"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Left Side: Content Box */}
      <motion.div
        className="bg-white bg-opacity-90 p-8 sm:p-12 rounded-3xl shadow-xl w-full lg:w-1/2 max-w-lg border backdrop-blur-md"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-indigo-700 mb-6 leading-tight">
          Are You <span className="text-purple-700">Eligible?</span>
        </h1>
        <p className="text-base sm:text-lg text-gray-800 mb-8">
          Find out if you qualify for the next big opportunity in your career journey. Take the first step toward success!
        </p>
        <motion.button
          onClick={handleCheckEligibility}
          className="cursor-pointer px-6 sm:px-8 py-3 sm:py-4 text-white bg-indigo-700 rounded-full font-bold text-lg sm:text-xl shadow-lg flex items-center gap-2 hover:bg-purple-700 transition-all"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Check Eligibility
          <motion.span
            className="text-2xl ml-2"
            animate={{ x: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1 }}
          >
            ➡️
          </motion.span>
        </motion.button>
      </motion.div>

      {/* Right Side: Image with Overlay */}
      <motion.div
        className="relative w-full lg:w-1/2 flex items-center justify-center mt-10 lg:mt-0"
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
          <img
            src="https://images.unsplash.com/photo-1573497491208-6b1acb260507?q=80&w=1080" // Image of a professional person thinking about career choices
            alt="Career Path"
            className="rounded-2xl shadow-lg w-full h-auto"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-70 rounded-2xl"></div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CheckEligibility;

/* Fade-out Animation */
const style = document.createElement("style");
style.innerHTML = `
  .fade-out {
    animation: fadeOut 0.6s ease forwards;
  }
  @keyframes fadeOut {
    from { opacity: 1; transform: scale(1); }
    to { opacity: 0; transform: scale(0.9); }
  }
`;
document.head.appendChild(style);

