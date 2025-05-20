import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const slides = [
  {
    id: 1,
    bgImage: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29sbGVnZSUyMGNhbXB1c3xlbnwwfHwwfHx8MA%3D%3D",
    link: "/college",
    title: "College",
  },
  {
    id: 2,
    bgImage: "https://t3.ftcdn.net/jpg/03/35/00/02/360_F_335000208_XJyUUnkg2TPfrMfiHPWW9LtCvea3x46K.jpg",
    link: "/class",
    title: "Classroom",
  },
  {
    id: 3,
    bgImage: "https://c0.wallpaperflare.com/preview/416/179/610/kings-college-cambridge-uk-university.jpg",
    link: "/university",
    title: "University",
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
    <div className=" relative md:w-480  max-w-full flex justify-center items-center overflow-hidden h-110 ">
      <div className="relative flex w-700  h-full justify-center items-center">
        {slides.map((slide, index) => {
          let position = "hidden";

          if (index === currentIndex) {
            position = "scale-100 z-30 shadow-xl border-4 border-white";
          } else if (index === (currentIndex - 1 + slides.length) % slides.length) {
            position = "scale-75 -translate-x-[50%] opacity-50 blur-sm z-10";
          } else if (index === (currentIndex + 1) % slides.length) {
            position = "scale-75 translate-x-[50%] opacity-50 blur-sm z-10";
          }

          return (
            <motion.div
  key={slide.id}
  className={`absolute w-full sm:w-[75%] md:w-[65%] lg:w-[50%] h-full sm:h-[65vh] md:h-[70vh] rounded-lg transition-all duration-700 ease-in-out cursor-pointer ${position}`}
  style={{
    backgroundImage: `url(${slide.bgImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
  onClick={() => navigate(slide.link)}
>
  {index === currentIndex && (
    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-opacity-60 px-6 py-2 rounded-lg">
      <h2 className="text-white text-3xl md:text-4xl font-bold font-serif tracking-wide">
        {slide.title}
      </h2>
    </div>
  )}
</motion.div>

          );
        })}
      </div>
    </div>
  );
}

export default Carouseldiv;
