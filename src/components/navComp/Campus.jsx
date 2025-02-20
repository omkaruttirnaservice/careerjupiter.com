import React from 'react';

const Campus = () => {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-blue-100 min-h-screen p-8 w-full">
      <h1 className="text-2xl font-extrabold text-center mb-10 text-blue-700">
        Welcome to Our Campus
      </h1>
      
      <div className="">
        <h2 className="text-3xl font-semibold text-blue-600 mb-6">Campus Overview</h2>
        <p className="text-gray-800 mb-6">
          Our campus is located in a vibrant, scenic area, offering state-of-the-art facilities and a thriving community for students to live and learn. The campus has been designed to promote both academic success and student well-being, providing all the amenities needed for a well-rounded college experience.
        </p>

        <h3 className="text-2xl font-semibold text-blue-600 mb-4">Key Features:</h3>
        <ul className="list-disc pl-6 text-gray-800">
          <li>Modern lecture halls and classrooms</li>
          <li>State-of-the-art labs and research facilities</li>
          <li>Extensive sports and recreation areas</li>
          <li>Beautiful green spaces for relaxation and study</li>
          <li>Multiple dining options with diverse food choices</li>
        </ul>

        <h3 className="text-2xl font-semibold text-blue-600 mt-8 mb-4">Campus Photos:</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <img
            src="https://media.istockphoto.com/id/499551389/photo/harvard-campus-with-brilliant-fall-foliage.jpg?s=612x612&w=0&k=20&c=ijWPxJP7NEidtSKCLzoMZzgaXotb02nLl9n4_XDvjvM="
            alt="Campus Image 1"
            className="rounded-xl shadow-lg transform transition-all hover:scale-105"
          />
          <img
            src="https://s3.amazonaws.com/thumbnails.thecrimson.com/photos/2020/05/26/163346_1344696.jpg.1500x1000_q95_crop-smart_upscale.jpg"
            alt="Campus Image 2"
            className="rounded-xl shadow-lg transform transition-all hover:scale-105"
          />
          <img
            src="https://www.howtogetinto-harvard.com/wp-content/uploads/2019/06/harvard-university-campus-Weekends-at-Harvard-yard.jpg"
            alt="Campus Image 3"
            className="rounded-xl shadow-lg transform transition-all hover:scale-105"
          />
        </div>

        <h3 className="text-2xl font-semibold text-blue-600 mt-8 mb-4">Location:</h3>
        <p className="text-gray-800">
          The campus is located at the heart of the city, easily accessible by public transport. It is surrounded by a vibrant community and provides easy access to nearby shopping, dining, and entertainment areas.
        </p>
        <p className="text-gray-800">
          <strong>Address:</strong> 123 College Avenue, City, Country
        </p>
      </div>
    </div>
  );
};

export default Campus;
