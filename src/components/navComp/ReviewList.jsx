import React from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchReviews } from "./Api";

// Star rating component
const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const emptyStars = 5 - fullStars;

  return (
    <div className="flex items-center">
      {Array(fullStars)
        .fill()
        .map((_, i) => (
          <span key={`full-${i}`} className="text-yellow-400 text-xl">
            ★
          </span>
        ))}
      {Array(emptyStars)
        .fill()
        .map((_, i) => (
          <span key={`empty-${i}`} className="text-gray-300 text-xl">
            ★
          </span>
        ))}
      <span className="text-gray-600 ml-2 font-medium">({rating}/5)</span>
    </div>
  );
};

// Skeleton Loader for Loading Effect
const ReviewSkeleton = () => (
  <div className="flex items-start gap-4 border-b pb-6 mb-6 animate-pulse">
    <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
    <div className="w-full">
      <div className="flex justify-between items-center">
        <div className="h-4 bg-gray-300 w-24 rounded"></div>
        <div className="h-4 bg-gray-300 w-20 rounded"></div>
      </div>
      <div className="h-3 bg-gray-300 w-36 mt-2 rounded"></div>
      <div className="h-4 bg-gray-300 w-full mt-4 rounded"></div>
      <div className="h-4 bg-gray-300 w-3/4 mt-2 rounded"></div>
    </div>
  </div>
);

const ShowReviews = ({userName}) => {
  const { id } = useParams();
  const { pathname } = useLocation();
  const reviewType = pathname.split("/")[1];
    const navigate = useNavigate();


  // Fetch reviews using React Query
  const {
    data: reviews = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["reviews", id],
    queryFn: () => fetchReviews({ id, type: reviewType }),
    enabled: !!id, // Only fetch if ID exists
  });
  // Sort reviews by createdAt in descending order (latest first)
  const sortedReviews = [...reviews].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const currentUrl = `${window.location.origin}/${reviewType}/${id}/review`;

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Write a Review",
          text: "Click here to write your review.",
          url: currentUrl,
        })
        .catch((err) => console.error("Sharing failed:", err));
    } else {
      window.open(
        `https://wa.me/?text=${encodeURIComponent("Click here to write a review: " + currentUrl)}`,
        "_blank"
      );
    }
  };

  return (
    <div className="mt-3 bg-white p-2 rounded-lg shadow-lg max-w-4xl">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-8 text-center">
        Reviews
      </h2>

      {/* Loading State with Scroll Effect */}
      {isLoading ? (
        <div className="h-60 overflow-y-auto">
          {Array(5)
            .fill()
            .map((_, i) => (
              <ReviewSkeleton key={i} />
            ))}
        </div>
      ) : isError ? (
        <p className="text-red-600 text-center text-lg">
          ❌ Failed to load reviews. Please try again later.
        </p>
      ) : sortedReviews.length > 0 ? (
        <div className="h-60 overflow-y-auto">
          {sortedReviews.map((review) => (
            <div
              key={review._id}
              className="flex items-start gap-4 p-4 border-b pb-6 mb-6 last:border-b-0"
            >
              <img
                src="https://img.freepik.com/premium-vector/portrait-male-student-with-glasses_684058-1126.jpg"
                alt="User profile"
                className="w-12 h-12 rounded-full border-2 border-gray-300"
              />
              <div className="w-full">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-bold text-lg text-gray-800">
                    {userName ? ` ${userName}'s review` : "No reviews yet."}
                      
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <StarRating rating={review.starRating} />
                </div>
                <p className="text-gray-700 mt-4 leading-relaxed">
                  {review.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center text-lg">
          No reviews available for this yet.
        </p>
      )}
        {/* Share Review Button */}
      <div className="flex justify-end mb-4 px-2">
        <button
          onClick={handleShare}
          className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2 rounded flex items-center gap-2"
        >
          <img
            src="https://img.icons8.com/ios-filled/20/ffffff/share.png"
            alt="share"
          />
          Share Review
        </button>
      </div>
    </div>
  );
};

export default ShowReviews;
