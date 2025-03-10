import React from 'react';
import Footer from '../components/Footer';
import Nav from '../Layouts/Nav.jsx'
const ContactUs = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Nav />
      <div className="flex-grow mt-30 p-10 max-w-2xl mx-auto bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-2xl shadow-2xl">
        <h2 className="text-3xl font-extrabold mb-6 text-center">Contact Us</h2>
        <div className="bg-white p-6 rounded-lg text-gray-800 shadow-md space-y-4">
          <p className="flex items-center space-x-3">
            <span className="text-green-600 text-xl">📍</span>
            <span>
              <strong>Address:</strong> College Road Nashik, Maharashtra - 422003, India.
            </span>
          </p>
          <p className="flex items-center space-x-3">
            <span className="text-blue-600 text-xl">📞</span>
            <span>
              <strong>Phone:</strong> +91 1234567890
            </span>
          </p>
          <p className="flex items-center space-x-3">
            <span className="text-red-600 text-xl">📧</span>
            <span>
              <strong>Email:</strong> admin@gmail.com
            </span>
          </p>
        </div>
      </div>
      <br/>
      <Footer />
    </div>
  );
};

export default ContactUs;
