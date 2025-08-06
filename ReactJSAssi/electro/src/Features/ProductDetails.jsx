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

  const [reviews, setReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [ratings, setRatings] = useState({});
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

        setReviews(commentsWithRatings);
        countRatings(commentsWithRatings);
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
        setReviews([]);
      } finally {
        setLoadingReviews(false);
      }
    };

    fetchReviews();
  }, [id]);

  const countRatings = (comments) => {
    const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    comments.forEach((r) => counts[r.rating]++);
    setRatings(counts);
  };

  const maxRatingCount = Math.max(...Object.values(ratings));

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const visibleReviews = showAll ? reviews : reviews.slice(0, 5);

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

      {/* <div className="max-w-2xl mx-auto px-4 mt-10">
        <h4 className="text-2xl font-semibold mb-4 text-gray-800">
          Rating Breakdown
        </h4>
        <div className="space-y-3">
          {[5, 4, 3, 2, 1].map((star) => {
            const count = ratings[star] || 0;
            const total = Object.values(ratings).reduce((sum, val) => sum + val, 0);
            const percentage = total ? (count / total) * 100 : 0;

            return (
              <div key={star} className="flex items-center space-x-4">
                <span className="w-10 text-sm text-slate-800">{star} ★</span>
                <div className="w-full bg-slate-300 rounded-full h-4 relative">
                  <div
                    className="bg-amber-500 h-4 rounded-full"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <span className="w-10 text-sm text-slate-700">{count}</span>
              </div>
            );
          })}
        </div>
      </div> */}

  

{/* <div className="max-w-7xl mx-auto mt-10 px-4">
  <h3 className="text-3xl font-bold mb-6 text-gray-800 text-center">Customer Reviews</h3>

  {loadingReviews ? (
    <div className="text-slate-500 flex items-center gap-2 justify-center">
      <FaSpinner className="animate-spin" /> Loading reviews...
    </div>
  ) : reviews.length === 0 ? (
    <p className="text-slate-500 text-center">No reviews available.</p>
  ) : (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleReviews.map((review) => (
          <div
            key={review.id}
            className="bg-white p-5 shadow-md rounded-xl border border-slate-200 hover:shadow-xl transition duration-300"
          >
            <div className="flex justify-between items-center mb-3">
              <span className="font-semibold text-gray-800">
                {review.user?.username || "Anonymous"}
              </span>
              <span className="text-amber-500 text-sm flex items-center">
                {[...Array(review.rating)].map((_, i) => (
                  <FaStar key={i} className="inline mr-0.5" />
                ))}
              </span>
            </div>
            <p className="text-slate-700 mb-2 line-clamp-4">{review.body}</p>
            <p className="text-xs text-slate-400 text-right">
              {new Date(review.date || review.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>

      {reviews.length > 5 && (
        <div className="mt-8 text-center">
          <button
            onClick={() => setShowAll((prev) => !prev)}
            className="px-6 py-2 text-sm font-semibold bg-gray-100 hover:bg-gray-200 rounded-full shadow-sm transition flex items-center justify-center mx-auto gap-2"
          >
            {showAll ? (
              <>
                Show Less <FaChevronUp className="text-xs" />
              </>
            ) : (
              <>
                Show More <FaChevronDown className="text-xs" />
              </>
            )}
          </button>
        </div>
      )}
    </>
  )}
</div> */}

   
    </>
  );
};

export default ProductDetails;
