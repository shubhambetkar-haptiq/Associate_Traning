import React from 'react';
import { FaSearch } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchTerm } from '../redux/SearchSlice';

const Search = () => {
  const dispatch = useDispatch();
  const searchTerm = useSelector((state) => state.search.searchTerm);

  return (
    <div className="w-full max-w-md relative">
      <input
        type="search"
        placeholder="Search for products..."
        value={searchTerm}
        onChange={(e) => dispatch(setSearchTerm(e.target.value))}
        className="w-full pl-4 pr-10 py-2 rounded-xl shadow-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-400 bg-gradient-to-r from-white via-purple-50 to-white text-gray-800 placeholder-gray-500"
      />
      <FaSearch className="absolute top-1/2 right-3 transform -translate-y-1/2 text-purple-500" />
    </div>
  );
};

export default Search;
