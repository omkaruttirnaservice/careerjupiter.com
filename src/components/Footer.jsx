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
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Grid layout with 2 columns on mobile and 4 columns on larger screens */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h2 className="text-lg font-bold mb-4">Company</h2>
            <ul className="space-y-3">
              <li>
                <NavLink
                  to="/"
                  className="hover:text-blue-400 transition-colors"
                >
                  Home
                </NavLink>
              </li>
              {/* <li>
                <NavLink
                  to=""
                  className="hover:text-blue-400 transition-colors"
                >
                  Students Corner
                </NavLink>
              </li> */}
              <li>
                <NavLink
                  to="services-provieder"
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
            <ul className="space-y-3">
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
              {/* <li>
                <NavLink
                  to=""
                  className="hover:text-blue-400 transition-colors"
                >
                  Check Eligibility
                </NavLink>
              </li> */}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h2 className="text-lg font-bold mb-4">Resources</h2>
            <ul className="space-y-3">
              <li>
                <NavLink
                  to="#"
                  className="hover:text-blue-400 transition-colors"
                >
                  Help Center
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="#"
                  className="hover:text-blue-400 transition-colors"
                >
                  Guides
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="#"
                  className="hover:text-blue-400 transition-colors"
                >
                  Privacy Policy
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="#"
                  className="hover:text-blue-400 transition-colors"
                >
                  Terms of Service
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Contact + Social */}
          <div>
            <h2 className="text-lg font-bold mb-4">Contact Us</h2>
            <ul className="space-y-3">
              <li>
                Email:{" "}
                <NavLink
                  to="mailto:info@company.com"
                  className="hover:text-blue-400 transition-colors"
                >
                  info@company.com
                </NavLink>
              </li>
              <li>
                Phone:{" "}
                <NavLink
                  to="tel:+1234567890"
                  className="hover:text-blue-400 transition-colors"
                >
                  +1 234 567 890
                </NavLink>
              </li>
              <li>Address: 123 Street, City, Country</li>
            </ul>

            {/* Follow Us (center on mobile) */}
            <h2 className="text-lg font-bold mt-6 mb-4 text-center"></h2>
            <div className="flex justify-center md:mr-23  md:gap-4 gap-3">
              <NavLink
                to="#"
                className="text-xl text-blue-600 hover:opacity-75 transition-opacity"
              >
                <FaFacebookF />
              </NavLink>
              <NavLink
                to="#"
                className="text-xl text-pink-500 hover:opacity-75 transition-opacity"
              >
                <FaInstagram />
              </NavLink>
              <NavLink
                to="#"
                className="text-xl text-sky-400 hover:opacity-75 transition-opacity"
              >
                <FaTwitter />
              </NavLink>
              <NavLink
                to="#"
                className="text-xl text-red-600 hover:opacity-75 transition-opacity"
              >
                <FaYoutube />
              </NavLink>
              <NavLink
                to="#"
                className="text-xl text-blue-800 hover:opacity-75 transition-opacity"
              >
                <FaLinkedin />
              </NavLink>
              <NavLink
                to="#"
                className="text-xl text-green-500 hover:opacity-75 transition-opacity"
              >
                <FaWhatsapp />
              </NavLink>
            </div>
          </div>
        </div>

        {/* Bottom copyright text */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-400">
          © {new Date().getFullYear()}{" "}
          <span className="text-white font-semibold">Career Jupiter</span>.
          All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
