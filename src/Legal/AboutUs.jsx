import Footer from '../components/Footer';
import Nav from '../Layouts/Nav.jsx';
import React from 'react';

const AboutUs = () => {
  return (
    <>
      <Nav />
      <div className="mt-20  max-w-3xl mx-auto p-6 h-[70vh] bg-white rounded-lg shadow-md text-center">
        <h2 className="text-3xl font-bold text-blue-600 mb-4">About Us</h2>
        <p className="text-gray-700 mb-6">
          Welcome to <strong>"CARRER NITI"</strong>. We are a creative and innovative team dedicated to providing top-tier solutions. Our goal is to bridge the gap between technology and human needs.
        </p>

        <div className="space-y-4">
          <div className="p-4 bg-blue-500 text-white rounded-md">
            <h3 className="text-xl font-semibold">Our Mission</h3>
            <p>Empower businesses with innovative solutions.</p>
          </div>

          <div className="p-4 bg-purple-500 text-white rounded-md">
            <h3 className="text-xl font-semibold">Our Vision</h3>
            <p>Be a global leader in technology-driven transformations.</p>
          </div>

          <div className="p-4 bg-green-500 text-white rounded-md">
            <h3 className="text-xl font-semibold">Our Values</h3>
            <p>Integrity, creativity, collaboration, and excellence.</p>
          </div>
        </div>
      </div>
      <br/>
      <Footer />
    </>
  );
};

export default AboutUs;
