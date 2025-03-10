import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Logopage = () => {
  const [totalCount, setTotalCount] = useState(0);
  const [partyCount, setPartyCount] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: false });

  useEffect(() => {
    if (inView) {
      let total = 0;
      let party = 0;
      const interval = setInterval(() => {
        total += 20;
        party += 2;
        if (total >= 800) {
          total = 800;
        }
        if (party >= 50) {
          party = 50;
        }
        setTotalCount(total);
        setPartyCount(party);
        if (total === 800 && party === 50) {
          clearInterval(interval);
        }
      }, 50);
    }
  }, [inView]);

  return (
    <div className="w-full bg-gray-100 py-10 px-5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
      <div ref={ref} className="w-full md:w-1/4 flex flex-wrap justify-center md:block text-center md:text-left mb-6 md:mb-0">
  <div className="flex w-full md:block justify-between items-center md:items-start">
    <div className="text-center md:text-left">
      <h2 className="text-5xl sm:text-6xl text-red-500 font-bold">{totalCount}+</h2>
      <p className="text-lg sm:text-xl">Total</p>
    </div>
    <div className="text-center md:text-left">
      <h2 className="text-5xl sm:text-6xl text-red-500 font-bold">{partyCount}+</h2>
      <p className="text-lg sm:text-xl">Parties</p>
    </div>
  </div>
</div>


        <div className="w-full md:w-3/4 relative flex flex-col items-center overflow-hidden">
          {/* Top Row - Moves Right */}
          <motion.div
            className="flex space-x-0 mb-4"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ ease: "linear", duration: 20, repeat: Infinity }}
          >
            {[...Array(8)].map((_, index) => (
              <div
                key={index}
                className="w-18 sm:w-26 md:w-30 h-18 sm:h-26 md:h-30 bg-white rounded-full shadow-lg flex items-center justify-center text-lg sm:text-xl font-semibold m-2"
              >
                Card {index + 1}    
              </div>
            ))}
          </motion.div>
          
          {/* Bottom Row - Moves Left */}
          <motion.div
            className="flex space-x-0"
            initial={{ x: "100%" }}
            animate={{ x: "-100%" }}
            transition={{ ease: "linear", duration: 20, repeat: Infinity }}
          >
            {[...Array(8)].map((_, index) => (
              <div
                key={index + 8}
                className="w-18 sm:w-26 md:w-30 h-18 sm:h-26 md:h-30 m bg-white rounded-full shadow-lg flex items-center justify-center text-lg sm:text-xl m-2 font-semibold"
              >
                Card {index + 9}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Logopage;

