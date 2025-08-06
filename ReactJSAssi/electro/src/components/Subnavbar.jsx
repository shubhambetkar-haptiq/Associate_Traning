import React from 'react';
import { Link } from 'react-router-dom';

const Subnavbar = () => {
  return (
    <div className="flex flex-wrap items-center justify-between px-6 py-4 bg-white shadow-md">
      {/* All Categories Button */}
      <div>
        <Link
          to="/categories"
          className="bg-orange-600 hover:bg-orange-700 text-white font-medium px-5 py-2 rounded-full transition transform hover:scale-105 shadow"
        >
          All Categories
        </Link>
      </div>

      {/* Sub Links */}
      <ul className="flex gap-5 flex-wrap text-gray-700 font-medium">
        {[
          { label: "Laptops", path: "/laptop" },
          { label: "Clothes", path: "/clothes" },
          { label: "Shoes", path: "/shoes" },
          { label: "Watches", path: "/watches" },
          { label: "Women Bags", path: "/bags" },
        ].map(({ label, path }) => (
          <li key={path}>
            <Link
              to={path}
              className="hover:text-orange-600 hover:underline transition duration-200 ease-in-out"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Subnavbar;
