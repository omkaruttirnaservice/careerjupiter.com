import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube, FaLinkedin, FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-6">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

          {/* Company Info */}
          <div>
            <h2 className="text-lg font-bold mb-4">Company</h2>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-blue-400 transition-colors">Home</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Students Corner</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Service Providers</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h2 className="text-lg font-bold mb-4">Services</h2>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-blue-400 transition-colors">Search College</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Search Class</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Search University</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Check Eligibility</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h2 className="text-lg font-bold mb-4">Resources</h2>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-blue-400 transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Guides</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          {/* Contact + Social */}
          <div>
            <h2 className="text-lg font-bold mb-4">Contact Us</h2>
            <ul className="space-y-3">
              <li>Email: <a href="mailto:info@company.com" className="hover:text-blue-400 transition-colors">info@company.com</a></li>
              <li>Phone: <a href="tel:+1234567890" className="hover:text-blue-400 transition-colors">+1 234 567 890</a></li>
              <li>Address: 123 Street, City, Country</li>
            </ul>
            
            {/* Follow Us with Real Colors */}
            <h2 className="text-lg font-bold mt-6 mb-4">Follow Us</h2>
            <div className="flex space-x-4">
              <a href="#" className="text-xl text-blue-600 hover:opacity-75 transition-opacity"><FaFacebookF /></a>
              <a href="#" className="text-xl text-pink-500 hover:opacity-75 transition-opacity"><FaInstagram /></a>
              <a href="#" className="text-xl text-sky-400 hover:opacity-75 transition-opacity"><FaTwitter /></a>
              <a href="#" className="text-xl text-red-600 hover:opacity-75 transition-opacity"><FaYoutube /></a>
              <a href="#" className="text-xl text-blue-800 hover:opacity-75 transition-opacity"><FaLinkedin /></a>
              <a href="#" className="text-xl text-green-500 hover:opacity-75 transition-opacity"><FaWhatsapp /></a>
            </div>
          </div>

        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} <span className="text-white font-semibold">UTTIRNA Services</span>. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
