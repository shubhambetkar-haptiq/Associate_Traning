import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {  FaStar } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/CartSlice";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  // const [isFav, setIsFav] = useState(false);
  const dispatch = useDispatch();
 const handleAddToCart = ()=>{
 dispatch(addToCart(product));
 }
  const handleBuyNow = () => {
    navigate(`/product/${product.id}`, { state: { product } });
  };

  // const toggleFavorite = () => setIsFav(!isFav);

  return (
    <div className="w-full max-w-sm bg-gradient-to-br from-teal-50 to-indigo-100 rounded-3xl shadow-[8px_8px_16px_#d1d9e6,_-8px_-8px_16px_#ffffff] p-4 transition-all hover:scale-[1.03] hover:shadow-xl duration-300 relative">
      {/* Favorite Icon */}
      {/* <button
        onClick={toggleFavorite}
        className="absolute top-4 right-4 text-xl text-teal-600 hover:text-pink-500"
      >
        <FaHeart className={isFav ? "fill-current" : "text-gray-300"} />
      </button> */}

      {/* Image */}
      <div className="rounded-xl overflow-hidden mb-4">
        <img
          src={product.thumbnail || product.images?.[0]}
          alt={product.title}
          className="h-48 w-full object-cover transition-transform duration-300 hover:scale-110"
        />
      </div>

      {/* Title & Brand */}
      <h2 className="text-lg font-semibold text-indigo-800 line-clamp-1 text-center">
        {product.title}
      </h2>
      <p className="text-sm text-gray-500 text-center">{product.brand}</p>

      {/* Rating */}
      <div className="flex justify-center items-center mt-2 mb-3">
        {[...Array(5)].map((_, i) => (
          <FaStar
            key={i}
            className={`text-xs mx-0.5 ${
              i < Math.round(product.rating) ? "text-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
        <span className="ml-1 text-xs text-gray-500">({product.rating})</span>
      </div>

      {/* Price */}
      <div className="flex justify-center mb-4">
        <span className="bg-teal-100 text-teal-800 font-bold px-3 py-1 rounded-full shadow-inner text-sm">
          ${product.price}
        </span>
        {product.discountPercentage && (
          <span className="ml-2 text-xs text-green-600 font-medium">
            {product.discountPercentage}% OFF
          </span>
        )}
      </div>

      {/* Buttons */}
      <div className="flex gap-3 justify-center">
        <button
          onClick={handleBuyNow}
          className="bg-indigo-600 text-white text-sm px-4 py-2 rounded-full shadow hover:bg-indigo-700 transition"
        >
          View
        </button>
        <button onClick={handleAddToCart}
          className="bg-white border border-indigo-200 text-indigo-600 text-sm px-4 py-2 rounded-full shadow hover:bg-indigo-50 transition"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
