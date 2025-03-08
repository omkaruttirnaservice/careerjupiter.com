import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const images = [
  "https://img.freepik.com/free-photo/career-employment-job-work-concept_53876-123876.jpg",
  "https://img.freepik.com/premium-photo/human-resources-recruitment-people-networking-concept_31965-13335.jpg",
  "https://img.freepik.com/free-photo/career-hiring-human-resources-job-occupation-concept_53876-13893.jpg"
];

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-4xl mx-auto overflow-hidden py-10 bg-purple-500 flex justify-center items-center">
      <div className="relative flex w-full h-80 sm:h-[400px] justify-center items-center">
        {images.map((img, index) => {
          let position = "hidden";
          if (index === currentIndex) position = "scale-100 z-10 shadow-2xl";
          else if (index === (currentIndex - 1 + images.length) % images.length)
            position = "scale-90 -translate-x-32 opacity-50 -z-0";
          else if (index === (currentIndex + 1) % images.length)
            position = "scale-90 translate-x-32 opacity-50 -z-0";

          return (
            <motion.img
              key={index}
              src={img}
              alt={`Slide ${index + 1}`}
              className={`absolute w-2/3 sm:w-1/2 rounded-lg transition-all duration-500 ease-in-out ${position}`}
            />
          );
        })}
      </div>
    </div>
  );
}
