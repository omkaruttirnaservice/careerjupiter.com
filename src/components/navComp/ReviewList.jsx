import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { handleReviews } from "../InstituteComp/Api"; // Import the unified API handler

// Star rating component with golden stars
const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const emptyStars = 5 - fullStars;

  return (
    <div className="flex items-center">
      {Array(fullStars)
        .fill()
        .map((_, i) => (
          <span key={`full-${i}`} className="text-yellow-400 text-xl">★</span>
        ))}
      {Array(emptyStars)
        .fill()
        .map((_, i) => (
          <span key={`empty-${i}`} className="text-gray-300 text-xl">★</span>
        ))}
      <span className="text-gray-600 ml-2 font-medium">({rating}/5)</span>
    </div>
  );
};

// Calculate "time ago" for reviews
const timeAgo = (date) => {
  const now = new Date();
  const reviewDate = new Date(date);
  const diffInSeconds = Math.floor((now - reviewDate) / 1000);

  if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours} hours ago`;
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) return `${diffInDays} days ago`;
  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) return `${diffInWeeks} weeks ago`;
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) return `${diffInMonths} months ago`;
  const diffInYears = Math.floor(diffInDays / 365);
  return `${diffInYears} years ago`;
};

const ShowReviews = () => {
  const { id } = useParams();

  const { data: reviews = [], isLoading, isError } = useQuery({
    queryKey: ["reviews", id],
    queryFn: () => handleReviews("fetch", { id }),
    enabled: !!id,
  });

  if (isLoading) {
    return <p className="text-gray-600 text-center text-lg">⏳ Loading reviews...</p>;
  }

  if (isError) {
    return <p className="text-red-600 text-center text-lg">❌ Failed to load reviews. Please try again later.</p>;
  }

  return (
    <div className="mt-10 bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-8 text-center">📚 College Reviews</h2>

      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review._id} className="flex items-start gap-4 border-b pb-6 mb-6 last:border-b-0">
            <img
              src="https://img.freepik.com/premium-vector/portrait-male-student-with-glasses_684058-1126.jpg"
              alt="User profile"
              className="w-12 h-12 rounded-full border-2 border-gray-300"
            />

            <div className="w-full">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-bold text-lg text-gray-800">
                    {review.studentMobile.slice(0, 3)}****{review.studentMobile.slice(-2)}
                  </p>
                  <p className="text-sm text-gray-500">{timeAgo(review.createdAt)}</p>
                </div>
                <StarRating rating={review.starRating} />
              </div>

              <p className="text-gray-700 mt-4 leading-relaxed">{review.description}</p>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-center text-lg">No reviews available for this college yet.</p>
      )}
    </div>
  );
};

export default ShowReviews;
