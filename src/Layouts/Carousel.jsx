import React, { useState, useEffect } from 'react';

const images = [
  'https://png.pngtree.com/thumb_back/fh260/background/20241030/pngtree-personal-development-or-career-growth-success-ai-illustration-image_16473836.jpg',
  'https://img.freepik.com/premium-photo/human-resources-people-networking-concept_31965-1980.jpg?semt=ais_hybrid',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwnqZeP_Du5Z1qWx4AlBkdjlIUTl8Q5ZOKRk7YV-fRdnrXBwDDpXvw2PGySIOUP5lZS8M&usqp=CAU',
  'https://img.freepik.com/free-photo/career-employment-job-work-concept_53876-123876.jpg',
  'https://img.freepik.com/premium-photo/human-resources-recruitment-people-networking-concept_31965-13335.jpg',
  'https://img.freepik.com/free-photo/career-hiring-human-resources-job-occupation-concept_53876-13893.jpg',
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideInterval = 3000;

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
    <div className="flex flex-col items-center w-full   sm:h-[70vh] md:h-[80vh]">
      <div className="relative w-[99%] h-full overflow-hidden rounded-2xl shadow-lg">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Slide ${index + 1}`}
              className="w-full flex-shrink-0 h-full object-cover"
            />
          ))}
        </div>

        {/* Navigation buttons */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-2 sm:left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70"
        >
          &#9665;
        </button>

        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-2 sm:right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70"
        >
          &#9655;
        </button>
      </div>

      {/* Dots for navigation */}
      <div className="flex space-x-2 mt-4">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full ${
              currentIndex === index ? 'bg-blue-500' : 'bg-gray-300'
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
