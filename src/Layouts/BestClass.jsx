import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaChalkboardTeacher } from 'react-icons/fa';

const BestClass = () => {
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate('/class');
  };

  return (
    <div className="w-full min-h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-r from-purple-600 via-pink-500 to-red-400 p-6 md:p-12 rounded-lg">
      {/* Right Side - Content */}
      <div className="w-full md:w-1/2 text-white text-center md:text-left p-6">
        <h1 className="text-2xl md:text-4xl font-bold flex items-center gap-3">
          <FaChalkboardTeacher className="text-4xl md:text-4xl" /> SEARCH BEST CLASS
        </h1>
        <p className="text-lg mb-6 mt-4 md:mt-5">
          Explore top classes tailored to elevate your skills and knowledge. The right class leads to a brighter future.
        </p>
        <button
          onClick={handleSearch}
          className="w-full border-2 flex items-center justify-center gap-3 bg-blue-600 text-white px-6 py-3 rounded-full font-semibold text-lg transition-transform duration-300 hover:scale-105"
        >
          <FaSearch /> Search Class
        </button>
      </div>

      {/* Left Side - Image */}
      <div className="w-full md:w-1/2 flex justify-center mt-6 md:mt-0">
        <img
          src="https://t3.ftcdn.net/jpg/03/35/00/02/360_F_335000208_XJyUUnkg2TPfrMfiHPWW9LtCvea3x46K.jpg"
          alt="Class Illustration"
          className="cursor-pointer rounded-lg shadow-lg w-full max-w-md transition-transform duration-500 hover:scale-105"
        />
      </div>
    </div>
  );
};

export default BestClass;
