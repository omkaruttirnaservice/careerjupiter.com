import React from 'react';
import { FaTwitter, FaYoutube, FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className="bg-gray-100 text-blcyan">
      <footer className="footer p-10">
        <nav className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h6 className="footer-title text-lg font-bold text-cyan-500">Services</h6> 
            <a className="link link-hover hover:text-cyan-400 transition-colors">Branding</a>
            <a className="link link-hover hover:text-cyan-400 transition-colors">Design</a>
            <a className="link link-hover hover:text-cyan-400 transition-colors">Marketing</a>
            <a className="link link-hover hover:text-cyan-400 transition-colors">Advertisement</a>
          </div>
          <div className="space-y-4">
            <h6 className="footer-title text-lg font-bold text-cyan-500">Company</h6>
            <a className="link link-hover hover:text-cyan-400 transition-colors">About us</a>
            <a className="link link-hover hover:text-cyan-400 transition-colors">Contact</a>
            <a className="link link-hover hover:text-cyan-400 transition-colors">Jobs</a>
            <a className="link link-hover hover:text-cyan-400 transition-colors">Press kit</a>
          </div>
          <div className="space-y-4">
            <h6 className="footer-title text-lg font-bold text-cyan-500">Legal</h6>
            <a className="link link-hover hover:text-cyan-400 transition-colors">Terms of use</a>
            <a className="link link-hover hover:text-cyan-400 transition-colors">Privacy policy</a>
            <a className="link link-hover hover:text-cyan-400 transition-colors">Cookie policy</a>
          </div>
          <div className="space-y-4">
            <h6 className="footer-title text-lg font-bold text-cyan-500">Follow Us</h6>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-cyan-400 transition-colors">
                <FaTwitter className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-cyan-400 transition-colors">
                <FaYoutube className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-cyan-400 transition-colors">
                <FaFacebook className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-cyan-400 transition-colors">
                <FaInstagram className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-cyan-400 transition-colors">
                <FaLinkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
        </nav>
      </footer>
      <footer className="footer px-10 py-4 border-t bg-gray-100 border-cyan-700">
        <aside className="items-center grid-flow-col">
          <p className="text-sm text-black font-bold ">
            Copyright © {new Date().getFullYear()} - All rights reserved by ACME Industries Ltd
          </p>
        </aside>
        <nav className="md:place-self-center md:justify-self-end">
          <div className="grid grid-flow-col gap-4">
            <a href="#" className="text-black font-bold hover:text-cyan-400 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-black font-bold hover:text-cyan-400 transition-colors">
              Terms of Service
            </a>
          </div>
        </nav>
      </footer>
    </div>
  );
};

export default Footer;