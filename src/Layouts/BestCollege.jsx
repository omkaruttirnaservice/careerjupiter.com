import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaUniversity } from 'react-icons/fa';

const BestCollege = () => {
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate('/college');
  };

  return (
    <div className="w-full min-h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-6 md:p-12 rounded-lg">
      {/* Left Side - Image */}
      <div className="w-full md:w-1/2 flex justify-center">
        <img
          src="https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29sbGVnZSUyMGNhbXB1c3xlbnwwfHwwfHx8MA%3D%3D"
          alt="College Illustration"
          className="cursor-pointer rounded-lg shadow-lg w-full max-w-md transition-transform duration-500 hover:scale-105"
        />
      </div>

      {/* Right Side - Content */}
      <div className="w-full md:w-1/2 text-white text-center md:text-left mt-6 md:mt-0 p-6">
        <h1 className="text-2xl md:text-4xl font-bold flex items-center gap-3">
          <FaUniversity className="text-4xl md:text-4xl" /> SEARCH BEST COLLEGE
        </h1>
        <p className="text-lg mb-6 mt-4 md:mt-5">
          Discover top colleges that match your dreams and goals. Your future starts with the right choice.
        </p>
        <button
          onClick={handleSearch}
          className="w-full border-2 flex items-center justify-center gap-3 bg-green-400 text-white px-6 py-3 rounded-full font-semibold text-lg hover:bg-green-500 transition-transform duration-300 hover:scale-105"
        >
          <FaSearch /> Search College
        </button>
      </div>
    </div>
  );
};

export default BestCollege;
