import React from 'react';
import { useNavigate } from 'react-router-dom';

const PremiumServices = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/premium-services');
  };

  return (
    <div className="relative h-[50vh] w-full">
      {/* Background Image with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80")',
        }}
      >
        {/* Slightly transparent black overlay */}
        <div className="absolute inset-0 bg-black opacity-80 rounded-lg" />
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
        <h1 className="text-xl md:text-5xl font-extrabold mb-4 drop-shadow-lg">
          Premium Career Services For Students 🌟
        </h1>
        <p className="text-md md:text-xl mb-6 max-w-xl drop-shadow-md">
          Unlock expert guidance, resume support, and exclusive tools for a brighter future.
        </p>
        <button
          onClick={handleClick}
          className=" w-full md:w-160 cursor-pointer border-1 flex items-center justify-center gap-3 bg-yellow-500 text-white px-2 py-3 rounded-full font-bold text-lg shadow-lg hover:bg-yellow-600 transition-transform duration-300 hover:scale-105"
        
        >
          
          
          🚀 Explore Premium
        </button > 
      </div>
    </div>
  );
};

export default PremiumServices;
