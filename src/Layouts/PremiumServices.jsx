import React from 'react';
import { useNavigate } from 'react-router-dom';

const PremiumServices = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/premium-services');
  };

  return (
    <div className="relative h-[70vh] w-full">
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
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-lg">
          Premium Career Services For Students 🌟
        </h1>
        <p className="text-lg md:text-xl mb-6 max-w-xl drop-shadow-md">
          Unlock expert guidance, resume support, and exclusive tools for a brighter future.
        </p>
        <button
          onClick={handleClick}
          className="bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 hover:scale-105 text-white font-bold py-3 px-8 rounded-full shadow-xl transition-all duration-300"
        >
          🚀 Explore Premium
        </button>
      </div>
    </div>
  );
};

export default PremiumServices;
