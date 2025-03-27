import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaUniversity } from 'react-icons/fa';

const BestCollege = () => {
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate('/college');
  };

  return (
    <div id='search-college' className="w-auto flex flex-col md:flex-row items-center justify-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-6 md:p-12 rounded-lg">
      {/* Left Side - Image */}
      <div className="w-full md:w-1/2 flex justify-center">
        <img
          src="https://media.istockphoto.com/id/1072194864/photo/the-graduation-day-is-finally-here.jpg?s=612x612&w=0&k=20&c=DTlXxmE4alF7LihCc5GEijS4vprLei8Ro_JUT-Am4aM="
          alt="College Illustration"
          className="cursor-pointer rounded-lg shadow-lg w-full max-w-md transition-transform duration-500 hover:scale-105"
        />
      </div>

      {/* Right Side - Content */}
      <div className="w-auto md:w-1/2 text-white text-center md:text-left mt-6 md:mt-0 p-6">
        <h1 className="text-xl tb:text-sm md:text-4xl font-bold flex items-center gap-3">
          <FaUniversity className="text-3xl md:text-4xl" /> SEARCH BEST COLLEGE
        </h1>
        <p className="text-lg mb-6 mt-4 md:mt-5">
          Discover top colleges that match your dreams and goals. Your future starts with the right choice.
        </p>
        <button
          onClick={handleSearch}
          className="w-full cursor-pointer border-2 flex items-center justify-center gap-3 bg-green-400 text-white px-6 py-3 rounded-full font-semibold text-lg hover:bg-green-500 transition-transform duration-300 hover:scale-105"
        >
          <FaSearch /> Search College
        </button>
      </div>
    </div>
  );
};

export default BestCollege;
