import React, { useState } from "react";
import { motion } from "framer-motion";
import DrawingPopup from "../Pages/DrawingPopup";

const DrawingBanner = () => {
  const [showPopup, setShowPopup] = useState(false);

  // Open popup instantly ( NO delay )
  const handleOpenPopup = () => {
    setShowPopup(true);
  };

return (
  <>
    <div
      id="bannerContainer"
      className="w-full flex flex-col md:flex-row items-center justify-between bg-gradient-to-r from-pink-300 via-purple-300 to-yellow-300 px-6 md:px-16 py-10 md:py-14 rounded-xl shadow-lg"
    >
     

      {/* RIGHT — TEXT + BTN */}
     <motion.div
  className="w-full md:w-1/2 flex flex-col justify-center text-center md:text-left text-gray-900 px-4 md:px-0"
  initial={{ opacity: 0, x: 40 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.6 }}
>
  <h1 className="text-3xl md:text-4xl font-extrabold flex items-center justify-center md:justify-start gap-3 mb-4">
    ✏️ Drawing & Essay Competition
  </h1>

  <p className="text-lg md:text-xl mb-6">
    Join the most exciting competition of the year!  
    Show your creativity and win certificates & prizes.
  </p>

  <motion.button
    onClick={handleOpenPopup}
    className="inline-flex w-full md:w-auto px-8 py-3 bg-blue-600 text-white items-center justify-center gap-3 rounded-full font-semibold text-lg shadow-lg transition-transform hover:scale-105"
    whileTap={{ scale: 0.95 }}
  >
    Participate Now
    <motion.img
      src="https://cdn-icons-png.flaticon.com/512/2232/2232688.png"
      alt="Arrow Icon"
      className="ml-2"
      style={{ width: "28px", height: "28px" }}
      animate={{ y: [0, -5, 0] }}
      transition={{ repeat: Infinity, duration: 1.2 }}
    />
  </motion.button>
</motion.div>


       {/* LEFT — Image */}
      <div className="w-full md:w-3/5 flex justify-center mb-6 md:mb-0">
  <motion.img
    src="/drawing_banner.jpg"
    alt="Drawing Competition Banner"
    className="rounded-xl shadow-xl w-full max-w-lg md:max-w-xl object-cover"
    initial={{ opacity: 0, x: -40 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6 }}
  />
</div>
    </div>

    {/* POPUP */}
    {showPopup && (
      <DrawingPopup 
        openedManually={true} 
        onClose={() => setShowPopup(false)} 
      />
    )}
  </>
);


};

export default DrawingBanner;
