import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { addToCart } from "../redux/CartSlice";
import { useDispatch } from "react-redux";
import {  FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { FaCheckCircle, FaStar, FaSpinner } from "react-icons/fa";
const ProductDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const product = location.state?.product;

  
  const [addedToCart, setAddedToCart] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch(`https://dummyjson.com/comments?postId=${id}`);
        const data = await res.json();
        const comments = data.comments || [];
        const commentsWithRatings = comments.map((c) => ({
          ...c,
          rating: Math.floor(Math.random() * 5) + 1,
        }));

        
        countRatings(commentsWithRatings);
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
              } 
    };

    fetchReviews();
  }, [id]);

  const countRatings = (comments) => {
    const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    comments.forEach((r) => counts[r.rating]++);
    
  };

  

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  

  if (!product) {
    return (
      <div className="p-6 text-rose-600 text-center text-xl">
        No product data available for ID: {id}
      </div>
    );
  }

  return (
    <>
      <div className="p-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 bg-slate-100 items-start">
        <div className="flex justify-center items-center bg-white rounded-3xl shadow-xl p-6">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="max-w-xs md:max-w-sm lg:max-w-md object-contain rounded-2xl transition-transform duration-300 hover:scale-105"
          />
        </div>

        <div className="flex flex-col justify-start space-y-6 text-gray-900">
          

          <h2 className="text-4xl font-bold text-violet-700">{product.title}</h2>

          <p className="text-lg leading-relaxed text-slate-700">
            {product.description}
          </p>

          <div className="flex flex-col space-y-2">
            <span className="text-2xl font-semibold text-emerald-600">
              ${product.price}
            </span>
            <span className="text-lg text-amber-600">
              Rating: <span className="font-medium">{product.rating} ⭐</span>
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            className="mt-4 w-max px-6 py-3 bg-violet-600 hover:bg-violet-700 text-white text-lg font-semibold rounded-xl shadow-lg transition duration-300"
          >
            {addedToCart ? (
              <span className="flex items-center gap-2">
                <FaCheckCircle className="text-emerald-300 animate-pulse" /> Added!
              </span>
            ) : (
              "Add to Cart"
            )}
          </button>
        </div>
      </div>

      

   
    </>
  );
};

export default ProductDetails;
