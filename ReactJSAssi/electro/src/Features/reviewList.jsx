import React from 'react';
import { FaRegCircleUser } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";

const ReviewList = ({ reviews }) => {
  if (!reviews || reviews.length === 0) {
    return <p className="text-gray-500">No reviews yet.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 space-x-5">
      {reviews.map((review, index) => (
        <div key={index} className="bg-white shadow-md rounded-xl px-4 py-6 flex flex-col justify-around">
          <div className="text-xl text-gray-400 mt-3 flex justify-end">
            {review.date ? new Date(review.date).toLocaleDateString() : 'Date unknown'}
          </div>
          <div className="flex items-center gap-2 mb-2">
            <FaRegCircleUser size={68} className="text-gray-600" />
            <div>
              <h3 className='font-bold text-2xl'>{review.productTitle}</h3>
              <h4 className="font-semibold text-base">{review.reviewerName || 'Anonymous'}</h4>
              <p className="text-xs text-gray-500">{review.reviewerEmail || 'N/A'}</p>
              
              {/*  Star Rating */}
              <div className="flex items-center gap-1 mt-1 text-yellow-500">
                {[...Array(review.rating || 0)].map((_, i) => (
                  <FaStar key={i} size={18} />
                ))}
              </div>

              <p className="text-gray-700 italic mt-2">"{review.comment || 'No comment provided.'}"</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
