import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaCrown } from 'react-icons/fa';
import { motion } from 'framer-motion';


const BestUniversity = () => {
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate('/university');
  };

  return (
    <div id='search-university' className="w-full min-h-80 flex flex-col items-center justify-center bg-cover bg-center relative p-6 rounded-lg"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1503676260728-1c00da094a0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fHVuaXZlcnNpdHl8ZW58MHx8fHwxNjc4MDMwMjUw&ixlib=rb-1.2.1&q=80&w=1080')" }}>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-60 rounded-lg"></div>

      {/* Content */}
      <div className="z-10 text-center text-white max-w-2xl ">
        <h1 className=" md:text-4xl font-bold flex items-center ml-7 md:ml-21 gap-3">
          <FaCrown className="text-yellow-400 animate-pulse text-xl md:text-4xl" /> SEARCH BEST UNIVERSITY
        </h1>
        <p className="text-lg mt-5 mb-6">
          Unleash your potential by exploring top universities designed to match your aspirations and build a successful future.
        </p>
        <button
          onClick={handleSearch}
          className="w-full cursor-pointer border-1 flex items-center justify-center gap-3 bg-blue-500 text-white px-2 py-3 rounded-full font-bold text-lg shadow-lg hover:bg-blue-600 transition-transform duration-300 hover:scale-105"
        >
          <FaSearch /> Search Universities

          <motion.span
  className="text-xl ml-4 h-8 w-8"
  animate={{ 
    y: [0, -3, 0],
    scale: [1, 1.05, 1]
  }}
  transition={{ 
    repeat: Infinity, 
    duration: 2.5,
    ease: "easeInOut" 
  }}
>
  🏛️
</motion.span>
        </button>
      </div>
    </div>
  );
};

export default BestUniversity;
