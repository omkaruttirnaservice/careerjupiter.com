import React from 'react';
import { motion } from 'framer-motion';

const ServiceProvide = () => {
  const handleRegisterClassClick = () => {
    window.location.href = 'https://admin.careerjupiter.com/register-class';
  };

  const handleRegisterCollegeClick = () => {
    window.location.href = 'https://admin.careerjupiter.com/register-college'; 
  };

  const cardVariants = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
  };

  const Card = ({ title, description, image, buttonText, onClick }) => (
    <motion.div
      initial="initial"
      animate="animate"
      variants={cardVariants}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="w-full md:w-1/2 p-4"
    >
      <br />
      <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-200 h-full flex flex-col">
        <img src={image} alt={title} className="w-full h-52 sm:h-64 object-cover" />
        <div className="px-6 py-6 text-center flex flex-col flex-grow">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">{title}</h3>
          <p className="text-gray-600 mb-6 flex-grow">{description}</p>
          <button
            onClick={onClick}
            className="bg-blue-600 hover:bg-pink-700 transition-all duration-300 text-white font-semibold py-2 px-6 rounded-full shadow-md"
          >
            {buttonText}
          </button>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="flex flex-col md:flex-row max-w-6xl mx-auto mt-10 px-4">
      <Card
        title="Register Your Class"
        description="Join our platform and showcase your classes to thousands of students!"
        image="https://t4.ftcdn.net/jpg/00/88/68/17/360_F_88681735_DGekSlvZg1keWVRNtDinXmwERnJwokEs.jpg"
        buttonText="Register Class"
        onClick={handleRegisterClassClick}
      />
      <Card
        title="Edit Your College Details"
        description="Get your college listed and reach students nationwide!"
        image="https://media.istockphoto.com/id/1456749194/photo/college-students-arriving-for-night-school.jpg?s=612x612&w=0&k=20&c=qz7RMdg4cgioWYuKIQ0r4iZ7itIbTrhORTcr-y0K2Rk="
        buttonText="Register College"
        onClick={handleRegisterCollegeClick}
      />
    </div>
  );
};

export default ServiceProvide;
