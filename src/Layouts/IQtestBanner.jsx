import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setIsOpen } from "../store-redux/iqTestSlice";

const IQtestBanner = () => {
  const authState = useSelector((state) => state.auth);
   let dispatch = useDispatch();
  const navigate = useNavigate();

     const handleClick = () => {
       if (!authState.isLoggedIn) {
         dispatch(setIsOpen(true));
       } else {
         navigate("/profile/test");
       }
     };

  return (
    <div className="flex justify-center items-center py-5 " onClick={handleClick}>
      <motion.button
        className="relative px-8 py-3 rounded-full text-white font-bold text-lg overflow-hidden bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 bg-[length:200%_200%]"
        initial={{ scale: 0.95 }}
        animate={{
          scale: [0.95, 1.05, 0.95],
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          scale: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          },
          backgroundPosition: {
            duration: 4,
            repeat: Infinity,
            ease: "linear",
          },
        }}
        whileHover={{
          scale: 1.1,
          boxShadow: "0 0 20px rgba(107, 33, 255, 0.6)",
        }}
        whileTap={{ scale: 0.9 }}
      >
        <span className="relative z-10">Take IQ Test</span>
        <motion.span
          className="absolute inset-0 bg-white opacity-0 hover:opacity-10"
          transition={{ duration: 0.3 }}
        />
      </motion.button>
    </div>
  );
};

export default IQtestBanner;