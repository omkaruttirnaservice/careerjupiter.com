
import { useState, useEffect } from "react";
import TypewriterComponent from "typewriter-effect";

const images = [
  "https://png.pngtree.com/thumb_back/fh260/background/20241030/pngtree-personal-development-or-career-growth-success-ai-illustration-image_16473836.jpg",
  "https://img.freepik.com/premium-photo/human-resources-people-networking-concept_31965-1980.jpg?semt=ais_hybrid",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwnqZeP_Du5Z1qWx4AlBkdjlIUTl8Q5ZOKRk7YV-fRdnrXBwDDpXvw2PGySIOUP5lZS8M&usqp=CAU",
  "https://img.freepik.com/free-photo/career-employment-job-work-concept_53876-123876.jpg",
  "https://img.freepik.com/premium-photo/human-resources-recruitment-people-networking-concept_31965-13335.jpg",
  "https://img.freepik.com/free-photo/career-hiring-human-resources-job-occupation-concept_53876-13893.jpg",
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideInterval = 4000; // 4 seconds

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, slideInterval);
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="relative w-full h-auto md:h-auto lg:h-[80vh] overflow-hidden flex items-center justify-center">
      {/* Image Slider */}
      <div className="relative w-[99%] h-full rounded-2xl shadow-lg overflow-hidden">
        {/* Black Overlay */}
        <div className="absolute inset-0 bg-black opacity-60 z-10"></div>

        {/* Image Carousel */}
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover flex-shrink-0"
            />
          ))}
        </div>

        {/* Text Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4 z-20">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold flex flex-wrap justify-center items-center gap-2">
            FIND YOUR
            <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 animate-gradient">
              <TypewriterComponent
                options={{ loop: true }}
                onInit={(typewriter) => {
                  typewriter
                    .typeString("Best College")
                    .pauseFor(1000)
                    .deleteAll()
                    .typeString("Best School")
                    .pauseFor(1000)
                    .deleteAll()
                    .typeString("Best Class")
                    .pauseFor(1000)
                    .start();
                }}
              />
            </span>
          </h1>

          <p className="mt-8 max-w-md sm:max-w-lg lg:max-w-2xl mx-auto text-sm sm:text-lg md:text-xl font-bold leading-tight">
            "EMPOWER YOUR FUTURE, UNLOCK YOUR POTENTIAL AND BUILD  
            <br className="hidden lg:block" />
            THE CAREER OF YOUR DREAMS!" 🌟
          </p>
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-4 transform -translate-y-1/2  sm:bg-none bg-opacity-10 text-white p-3 rounded-full hover:bg-opacity-80 z-50 "
        >
          &#9665;
        </button>

        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-60 text-white p-3 rounded-full hover:bg-opacity-80 z-50"
        >
          &#9655;
        </button>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-4 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentIndex === index ? "bg-white w-4" : "bg-gray-400"
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
