import React from 'react';

const AboutUs = () => {
  return (
    <div className=" mt-10 h-[90vh] w-[80vw] max-w-6xl mx-auto bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center p-10 rounded-3xl shadow-2xl">
      <div className="bg-white rounded-3xl shadow-lg p-12 w-full text-center">
        <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-8">
          About Us
        </h2>
        <p className="text-gray-600  leading-relaxed mb-10">
          Welcome to <strong className='text-lg'>"CARRER NITI"</strong> We are a creative and innovative team dedicated to providing top-tier solutions. 
          Our goal is to bridge the gap between technology and human needs, ensuring impactful and sustainable results for our clients.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-xl shadow-md transform hover:scale-105 transition duration-300">
            <h3 className="text-2xl font-bold mb-2">Our Mission</h3>
            <p>
              To empower businesses with innovative solutions, fostering growth and creativity.
            </p>
          </div>

          <div className="p-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl shadow-md transform hover:scale-105 transition duration-300">
            <h3 className="text-2xl font-bold mb-2">Our Vision</h3>
            <p>
              To be a global leader in technology-driven transformations and sustainable innovation.
            </p>
          </div>

          <div className="p-6 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-xl shadow-md transform hover:scale-105 transition duration-300">
            <h3 className="text-2xl font-bold mb-2">Our Values</h3>
            <p>
              Integrity, creativity, collaboration, and excellence drive everything we do.
            </p>
          </div>
        </div>

       
      </div>
    </div>
  );
};

export default AboutUs;
