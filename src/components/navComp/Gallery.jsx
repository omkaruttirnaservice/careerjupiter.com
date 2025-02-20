import React from 'react';

const Gallery = () => {
  return (
    <div className="bg-gradient-to-r  from-indigo-50 to-indigo-100 min-h-screen p-8 w-full">
      <h1 className="text-4xl font-extrabold text-center mb-10 text-indigo-700">
        College Gallery
      </h1>

      <div className="">
        <h4 className="text-2xl font-semibold text-indigo-600 mb-6">Explore Our Campus</h4>

        <div className="   grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {/* Image 1 */}
          <div className="rounded-lg overflow-hidden shadow-lg transform transition-all hover:scale-105">
            <img
              src="https://pdacek.ac.in/assets/images/placement/image1.jpg"
              alt="Campus Image 1"
              className="w-full h-64 object-cover"
            />
          </div>

          {/* Image 2 */}
          <div className="rounded-lg overflow-hidden shadow-lg transform transition-all hover:scale-105">
            <img
              src="https://kccollege.edu.in/wp-content/uploads/2021/08/20210802_105746-1-scaled.jpg"
              alt="Campus Image 2"
              className="w-full h-64 object-cover"
            />
          </div>

          {/* Image 3 */}
          <div className="rounded-lg overflow-hidden shadow-lg transform transition-all hover:scale-105">
            <img
              src="https://kccollege.edu.in/wp-content/uploads/2021/08/library2.jpg"
              alt="Campus Image 3"
              className="w-full h-64 object-cover"
            />
          </div>

          {/* Image 4 */}
          <div className="rounded-lg overflow-hidden shadow-lg transform transition-all hover:scale-105">
            <img
              src="https://image3.mouthshut.com/images/Restaurant/Photo/-32259_184523.png"
              alt="Campus Image 4"
              className="w-full h-64 object-cover"
            />
          </div>

          {/* Image 5 */}
          <div className="rounded-lg overflow-hidden shadow-lg transform transition-all hover:scale-105">
            <img
              src="https://images.shiksha.com/mediadata/images/1554202976phpciXJyA.jpeg"
              alt="Campus Image 5"
              className="w-full h-64 object-cover"
            />
          </div>

          {/* Image 6 */}
          <div className="rounded-lg overflow-hidden shadow-lg transform transition-all hover:scale-105">
            <img
              src="https://www.kdmch.in/image/college/kdmedical-college2.jpg"
              alt="Campus Image 6"
              className="w-full h-64 object-cover"
            />
          </div>

          {/* Image 7 */}
          <div className="rounded-lg overflow-hidden shadow-lg transform transition-all hover:scale-105">
            <img
              src="https://iippt.co.in/images/gallery/gallery18.jpg"
              alt="Campus Image 6"
              className="w-full h-64 object-cover"
            />
          </div>

          {/* Image 8 */}
          <div className="rounded-lg overflow-hidden shadow-lg transform transition-all hover:scale-105">
            <img
              src="https://rlkumc.edu.pk/images/gallery/gal%20(13).JPG"
              alt="Campus Image 6"
              className="w-full h-64 object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
