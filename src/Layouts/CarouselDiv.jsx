import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const slides = [
  {
    id: 1,
    bgImage: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29sbGVnZSUyMGNhbXB1c3xlbnwwfHwwfHx8MA%3D%3D",
    text: "Search College",
    link: "/college",
  },
  {
    id: 2,
    bgImage: "https://t3.ftcdn.net/jpg/03/35/00/02/360_F_335000208_XJyUUnkg2TPfrMfiHPWW9LtCvea3x46K.jpg",
    text: "Search Class",
    link: "/class",
  },
  {
    id: 3,
    bgImage: "https://c0.wallpaperflare.com/preview/416/179/610/kings-college-cambridge-uk-university.jpg",
    text: "Search University",
    link: "/university",
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
    <div className="relative w-full max-w-7xl mx-auto overflow-hidden flex justify-center items-center" style={{ height: "70vh" }}>
      <div className="relative flex w-full h-full justify-center items-center">
        {slides.map((slide, index) => {
          let position = "hidden";
          
          if (index === currentIndex) {
            position = "lg:scale-100 md:scale-95 sm:scale-90 z-30 shadow-2xl border-4 border-white";
          } else if (index === (currentIndex - 1 + slides.length) % slides.length) {
            position = "lg:scale-90 md:scale-75 sm:scale-50 -translate-x-[70%] opacity-70 blur-sm z-10";
          } else if (index === (currentIndex + 1) % slides.length) {
            position = "lg:scale-90 md:scale-75 sm:scale-50 translate-x-[70%] opacity-70 blur-sm z-10";
          }
          
          return (
            <motion.div
              key={slide.id}
              className={`absolute w-4/5 sm:w-3/4 h-80 sm:h-[28rem] rounded-lg transition-all duration-700 ease-in-out flex justify-center items-center text-white font-bold text-xl cursor-pointer ${position}`}
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

export default Carouseldiv;