import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const CheckEligibility = () => {
  const navigate = useNavigate();

  const handleCheckEligibility = () => {
    document.getElementById('container').classList.add('fade-out');
    setTimeout(() => {
      navigate('/my-eligibility');
    }, 600); // Matches the animation duration
  };

  return (
    <motion.div 
      id="container"
      className="flex items-center justify-between min-h-[60vh] bg-cover bg-center transition-all duration-500 p-10" 
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?fit=crop&w=1600&q=80')" }}
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Left side with content */}
      <motion.div 
        className="bg-blue-300 opacity-100 p-12 rounded-3xl shadow-2xl max-w-lg w-1/2 border backdrop-blur-md"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-5xl font-extrabold text-indigo-700 mb-6 text-left">Are You Eligible?</h1>
        <p className="text-lg text-gray-800 mb-8 text-left">Explore the possibilities and see if you're qualified for the next big step in your career journey.</p>
        <motion.button 
          onClick={handleCheckEligibility} 
          className="cursor-pointer px-8 py-4 text-white bg-indigo-700 rounded-full font-bold text-xl shadow-lg flex items-center gap-2 hover:bg-purple-700 transition-all"
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

      {/* Right side with image */}
      <motion.div 
        className="w-1/2 flex items-center justify-center"
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <img 
          src="https://medicaldialogues.in/h-upload/2024/08/21/248880-eligibility-criteria.webp" 
          alt="Eligibility Check" 
          className="rounded-2xl shadow-lg w-full max-w-md bg-opacity-50"
        />
      </motion.div>
    </motion.div>
  );
};

export default CheckEligibility;

/* Add fade-out animation in CSS */
const style = document.createElement('style');
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
