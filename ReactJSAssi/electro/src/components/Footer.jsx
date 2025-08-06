import React from 'react';
import Logo from './Logo';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#0f2027] via-[#203a43] to-[#2c5364] text-white py-12 px-6 mt-16">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 text-center md:text-left items-center">

        {/* Logo */}
        <div className="space-y-3">
          <Link to="/" className="text-4xl font-extrabold tracking-wide inline-block hover:scale-110 transition-transform duration-300">
            <Logo />
          </Link>
          <p className="text-sm opacity-80">Your trusted shopping partner</p>
        </div>

        {/* Navigation Links */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Categories</h3>
          <ul className="space-y-1">
            {[
              { path: '/laptop', label: 'Laptops' },
              { path: '/phone', label: 'smartphone' },
              { path: '/tab', label: 'tablets' },
              { path: '/watches', label: 'Watches' },
              { path: '/access', label: 'Accessories' },
            ].map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className="hover:text-yellow-300 transition-colors duration-300"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter + Social */}
        <div className="space-y-6">
         
          <div className="flex justify-center md:justify-start gap-5 text-xl">
            <a href="#" className="hover:text-yellow-300 transition"><FaFacebookF /></a>
            <a href="#" className="hover:text-yellow-300 transition"><FaInstagram /></a>
            <a href="#" className="hover:text-yellow-300 transition"><FaTwitter /></a>
            <a href="#" className="hover:text-yellow-300 transition"><FaLinkedin /></a>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-white/30 mt-10 pt-4 text-center text-sm">
        &copy; 2025 <span className="font-semibold">electo;</span> All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
