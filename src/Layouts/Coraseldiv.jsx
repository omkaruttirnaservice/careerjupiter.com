

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const slides = [
  {
    id: 1,
    bgImage: "https://files.oaiusercontent.com/file-KztxFipdGRSf6E9M3fS2xD?se=2025-03-08T04%3A35%3A06Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3Da3b054fa-ae40-42e9-989d-2fbdd3f05933.webp&sig=YsxAK35IZHHXWxZg5DM9tOIKdFQOSMnXNauV3iXCvI8%3D",
    text: "Search College",
    link: "/search-college",
  },
  {
    id: 2,
    bgImage: "https://files.oaiusercontent.com/file-1SxStMGrA7AWTSb5PwtCnw?se=2025-03-08T04%3A36%3A26Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3De9b4d02d-b562-456d-89af-b1156efe8154.webp&sig=%2Bi1vrDrEr6iN7l%2BRrlp7Ul/pt%2BxUHEhyY2McqG/fgPc%3D",
    text: "Search Class",
    link: "/search-class",
  },
  {
    id: 3,
    bgImage: "https://files.oaiusercontent.com/file-Q6MYaaqCha4wRfctQj8YSj?se=2025-03-08T04%3A36%3A31Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3D2e393f5e-c38d-46fe-901c-65dcd9a2a9d8.webp&sig=1pwfwIO%2BMLNFP/z9uxOQBow7Ef%2BuCyM1kr3IFFQPdn0%3D",
    text: "Search University",
    link: "/search-university",
  },
];
function Carouseldiv() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-4xl mx-auto overflow-hidden flex justify-center items-center" style={{ height: "70vh" }}>
      <div className="relative flex w-full h-full justify-center items-center">
        {slides.map((slide, index) => {
          let position = "hidden";
          if (index === currentIndex) position = "scale-100 z-10 shadow-2xl";
          else if (index === (currentIndex - 1 + slides.length) % slides.length)
            position = "scale-90 -translate-x-32 opacity-50 -z-0";
          else if (index === (currentIndex + 1) % slides.length)
            position = "scale-90 translate-x-32 opacity-50 -z-0";

          return (
            <motion.div
              key={slide.id}
              className={`absolute w-3/4 sm:w-2/3 h-80 sm:h-[28rem] rounded-lg transition-all duration-500 ease-in-out flex justify-center items-center text-white font-bold text-xl cursor-pointer ${position}`}
              style={{ backgroundImage: `url(${slide.bgImage})`, backgroundSize: "cover", backgroundPosition: "center" }}
              onClick={() => navigate(slide.link)}
            >
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default Carouseldiv