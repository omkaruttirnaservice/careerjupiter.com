import React from 'react';
import { motion } from 'framer-motion';


const ServiceProvide = () => {
  const handleRegisterClick = () => {
    window.location.href = 'https://admin.careerjupiter.com/register-class';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="max-w-md sm:max-w-auto md:max-w-xl lg:max-w-2xl  mx-auto mt-10 bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-200"
    >
      <img
        src="https://t4.ftcdn.net/jpg/00/88/68/17/360_F_88681735_DGekSlvZg1keWVRNtDinXmwERnJwokEs.jpg"
        alt="Register Class"
        className="w-full h-52 sm:h-64 object-cover"
      />
      <div className="px-6 py-6 text-center">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Register Your Class</h3>
        <p className="text-gray-600 mb-6">Join our platform and showcase your classes to thousands of students!</p>
        <button
          onClick={handleRegisterClick}
          className="bg-blue-600 flex-auto cursor-pointer hover:bg-pink-700 transition-all duration-300  text-white font-semibold py-2 px-6 rounded-full shadow-md"
        >
          Register Now
        </button>
      </div>
    </motion.div>
  
  );
};

export default ServiceProvide;