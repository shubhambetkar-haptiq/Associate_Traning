import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaUserCircle, FaBars, FaTimes } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';

import Logo from './Logo';
import Search from './Search';
import { openCart } from '../redux/CartSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const cartItems = useSelector((state) => state.cart.items); // assuming products array
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const navLinks = [
    { name: 'Laptops', to: '/laptop' },
    { name: 'Mobiles', to: '/phone' },
    { name: 'Tables', to: '/tab' },
    { name: 'Watches', to: '/watches' },
    { name: 'Mobile Accessories', to: '/access' },
  ];

  return (
    <nav className="w-full bg-white shadow-md sticky top-0 z-50">
      <div className="flex justify-between items-center px-6 py-4 relative">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold hover:opacity-90">
          <Logo />
        </Link>

        {/* Search Bar */}
        <div className="hidden md:block w-1/3">
          <Search />
        </div>

        {/* Desktop Nav Links */}
        <ul className="hidden lg:flex gap-6 text-gray-600 font-medium">
          {navLinks.map((link) => (
            <li key={link.to} className="hover:underline hover:text-gray-800 transition">
              <Link to={link.to}>{link.name}</Link>
            </li>
          ))}
        </ul>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {/* Cart Icon with Count */}
          <button
            onClick={() => dispatch(openCart())}
            className="relative text-2xl text-gray-700 hover:text-indigo-600 transition"
          >
            <FaShoppingCart />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                {cartItems.length}
              </span>
            )}  
          </button>

          {/* Login/User */}
          {user ? (
            <Link
              to="/dashboard"
              className="flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-blue-500 text-white hover:from-indigo-600 hover:to-blue-600 transition"
              title={`Logged in as ${user.firstName}`}
            >
              <FaUserCircle className="text-xl" />
            </Link>
          ) : (
            <Link
              to="/login"
              className="px-4 py-1 rounded-full border text-indigo-600 border-indigo-500 hover:bg-indigo-50 transition"
            >
              Login
            </Link>
          )}

          {/* Mobile Toggle */}
          <button onClick={toggleMenu} className="text-2xl lg:hidden text-gray-600">
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Menu */}
      {menuOpen && (
        <ul className="lg:hidden flex flex-col gap-3 px-6 pb-4 text-gray-700 font-medium bg-white">
          {navLinks.map((link) => (
            <li key={link.to} className="hover:text-indigo-600 transition">
              <Link to={link.to} onClick={() => setMenuOpen(false)}>
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
