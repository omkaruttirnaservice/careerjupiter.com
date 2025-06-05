import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaLinkedin,
  FaWhatsapp,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
<div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h2 className="text-lg font-bold mb-4">Company</h2>
            <ul className="space-y-2">
              <li>
                <NavLink to="/" className="hover:text-blue-400 transition-colors">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/service-provider"
                  className="hover:text-blue-400 transition-colors"
                >
                  Service Providers
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about-us"
                  className="hover:text-blue-400 transition-colors"
                >
                  About Us
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact-us"
                  className="hover:text-blue-400 transition-colors"
                >
                  Contact Us
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h2 className="text-lg font-bold mb-4">Services</h2>
            <ul className="space-y-2">
              <li>
                <NavLink
                  to="/college"
                  className="hover:text-blue-400 transition-colors"
                >
                  Search College
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/class"
                  className="hover:text-blue-400 transition-colors"
                >
                  Search Class
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/university"
                  className="hover:text-blue-400 transition-colors"
                >
                  Search University
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h2 className="text-lg font-bold mb-4">Resources</h2>
            <ul className="space-y-2">
              <li>
                <NavLink to="#" className="hover:text-blue-400 transition-colors">
                  Help Center
                </NavLink>
              </li>
              <li>
                <NavLink to="#" className="hover:text-blue-400 transition-colors">
                  Guides
                </NavLink>
              </li>
              <li>
                <NavLink to="#" className="hover:text-blue-400 transition-colors">
                  Privacy Policy
                </NavLink>
              </li>
              <li>
                <NavLink to="#" className="hover:text-blue-400 transition-colors">
                  Terms of Service
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Contact + Social */}
          <div>
            <h2 className="text-lg font-bold mb-4">Contact Us</h2>
            <ul className="space-y-2 text-sm">
              <li>
                Email:{" "}
                <a
                  href="mailto:careerjupiter4u@gmail.com"
                  className="hover:text-blue-400 transition-colors"
                >
                  careerjupiter4u@gmail.com
                </a>
              </li>
              <li>Address: 123 Street, City, Country</li>
            </ul>

            <div className="mt-4">
  <a
    href="https://whatsapp.com/channel/0029VbADrN54IBh95nFJiR3e"
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center justify-center w-full sm:w-auto px-4 py-2 bg-green-500 rounded-full text-white font-semibold hover:bg-green-600 transition"
  >
    <FaWhatsapp className="mr-2" size={18} />
    <span>Join WhatsApp</span>
  </a>
</div>


            <div className="flex justify-start sm:justify-start mt-5 gap-4 flex-wrap">
              <a
                href="#"
                aria-label="Facebook"
                className="text-xl text-blue-600 hover:opacity-75 transition-opacity"
              >
                <FaFacebookF />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="text-xl text-pink-500 hover:opacity-75 transition-opacity"
              >
                <FaInstagram />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="text-xl text-sky-400 hover:opacity-75 transition-opacity"
              >
                <FaTwitter />
              </a>
              <a
                href="#"
                aria-label="YouTube"
                className="text-xl text-red-600 hover:opacity-75 transition-opacity"
              >
                <FaYoutube />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="text-xl text-blue-800 hover:opacity-75 transition-opacity"
              >
                <FaLinkedin />
              </a>
              <a
                href="#"
                aria-label="WhatsApp"
                className="text-xl text-green-500 hover:opacity-75 transition-opacity"
              >
                <FaWhatsapp />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-400">
          © {new Date().getFullYear()}{" "}
          <span className="text-white font-semibold">Career Jupiter</span>. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
