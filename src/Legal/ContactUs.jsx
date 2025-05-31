// import React from 'react';
// import Footer from '../components/Footer';
// import Nav from '../Layouts/Nav.jsx'
// const ContactUs = () => {
//   return (
//     <div className="flex flex-col min-h-screen">
//       <Nav />
//       <div className="flex-grow mt-30 p-10 max-w-2xl mx-auto bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-2xl shadow-2xl">
//         <h2 className="text-3xl font-extrabold mb-6 text-center">Contact Us</h2>
//         <div className="bg-white p-6 rounded-lg text-gray-800 shadow-md space-y-4">
//           <p className="flex items-center space-x-3">
//             <span className="text-green-600 text-xl">📍</span>
//             <span>
//               <strong>Address:</strong> College Road Nashik, Maharashtra - 422003, India.
//             </span>
//           </p>
//           <p className="flex items-center space-x-3">
//             <span className="text-blue-600 text-xl">📞</span>
//             <span>
//               <strong>Phone:</strong> +91 1234567890
//             </span>
//           </p>
//           <p className="flex items-center space-x-3">
//             <span className="text-red-600 text-xl">📧</span>
//             <span>
//               <strong>Email:</strong> admin@gmail.com
//             </span>
//           </p>
//         </div>
//       </div>
//       <br/>
//       <Footer />
//     </div>
//   );
// };

// export default ContactUs;

import React from 'react';
import Footer from '../components/Footer';
import Nav from '../Layouts/Nav.jsx';
import { 
  FaGlobe, 
  FaFacebook, 
  FaInstagram, 
  FaWhatsapp 
} from 'react-icons/fa';

const ContactUs = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#e0f2fe] to-[#f8fafc]">
      <Nav />
      
      {/* <div className="flex-grow w-full py-16 px-6"> */}
        <div className="max-w-full mt-10 mx-auto rounded-3xl shadow-2xl p-10 md:p-16 animate-slide-in-up">
        <h2 className="text-4xl font-bold text-center text-indigo-600 mb-10">
            Connect with <span className="text-blue-700">Career Jupiter</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-10 text-gray-800">
            {/* Address */}
            <div className="bg-[#f0f9ff] p-6 rounded-xl hover:scale-105 transition duration-300 ease-in-out shadow-sm">
              <div className="text-3xl mb-3 text-indigo-500">📍</div>
              <h4 className="text-xl font-bold mb-2">Our Location</h4>
              <p>College Road, Nashik, Maharashtra 422003</p>
            </div>

            {/* Phone */}
            <div className="bg-[#eef2ff] p-6 rounded-xl hover:scale-105 transition duration-300 ease-in-out shadow-sm">
              <div className="text-3xl mb-3 text-blue-500">📞</div>
              <h4 className="text-xl font-bold mb-2">Call Us</h4>
              <p>+91 1234567890</p>
              <p className="text-sm text-gray-500 mt-1">Mon - Fri: 10am - 6pm</p>
            </div>

            {/* Email */}
            <div className="bg-[#ecfdf5] p-6 rounded-xl hover:scale-105 transition duration-300 ease-in-out shadow-sm">
              <div className="text-3xl mb-3 text-green-500">📧</div>
              <h4 className="text-xl font-bold mb-2">Email</h4>
              <p>admin@careerjupiter.com</p>
              <p className="text-sm text-gray-500 mt-1">Reply within 24 hours</p>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-16 grid md:grid-cols-2 gap-10">
            <div className="bg-[#fef9c3] p-6 rounded-xl shadow-md hover:shadow-xl transition">
              <h3 className="text-xl font-semibold text-yellow-700 mb-2">Why Contact Us?</h3>
              <p className="text-gray-700">
                Whether you’re a student looking for guidance, a parent seeking career options for your child,
                or a business interested in partnership — we’re here to help you.
              </p>
              <ul className="mt-3 list-disc pl-5 text-sm text-gray-600">
                <li>Career counselling and workshops</li>
                <li>Student support programs</li>
                <li>Collaboration and internships</li>
              </ul>
            </div>

           <div className="bg-[#f0fdf4] p-6 rounded-xl shadow-md hover:shadow-xl transition">
  <h3 className="text-xl font-semibold text-green-700 mb-2">Follow Us</h3>
  <p className="text-gray-700 mb-4">Stay connected and updated through our social handles:</p>
  <div className="flex space-x-4">
    <a 
      href="#" 
      className="flex flex-col items-center text-blue-600 hover:text-blue-800 transition"
      aria-label="Website"
    >
      <FaGlobe className="text-2xl" />
      <span className="text-xs mt-1">Website</span>
    </a>
    <a 
      href="#" 
      className="flex flex-col items-center text-blue-700 hover:text-blue-900 transition"
      aria-label="Facebook"
    >
      <FaFacebook className="text-2xl" />
      <span className="text-xs mt-1">Facebook</span>
    </a>
    <a 
      href="#" 
      className="flex flex-col items-center text-pink-600 hover:text-pink-800 transition"
      aria-label="Instagram"
    >
      <FaInstagram className="text-2xl" />
      <span className="text-xs mt-1">Instagram</span>
    </a>
    <a 
      href="#" 
      className="flex flex-col items-center text-green-600 hover:text-green-800 transition"
      aria-label="WhatsApp"
    >
      <FaWhatsapp className="text-2xl" />
      <span className="text-xs mt-1">WhatsApp</span>
    </a>
  </div>
</div>
          </div>
        {/* </div> */}
      </div>

      <Footer />
    </div>
  );
};

export default ContactUs;
