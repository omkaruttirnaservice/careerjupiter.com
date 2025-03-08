

import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ShowReviews from "./ReviewList";
import { submitReview } from "./Api";


const ReviewPage = ({ reviewCollegeName }) => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [selectedRating, setSelectedRating] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const { pathname } = useLocation();
  const reviewType = pathname.split('/')[1];

  // Submit review mutation
  const mutation = useMutation({
    mutationFn: submitReview, // Calls submitReview function
  
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews", id]); // Refresh the reviews
      
      formik.resetForm();
      setSelectedRating(null); // Reset rating
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 5000); 
    },
    // onError: (error) => {
    //   console.error("Error submitting review:", error.message);
    // },
  });

  // Formik setup
  const formik = useFormik({
    initialValues: {
      studentMobile: "",
      comment: "",
    },
    validationSchema: Yup.object({
      studentMobile: Yup.string()
        .matches(/^\d{10}$/, "Mobile number must be exactly 10 digits")
        .required("Mobile number is required"),
      comment: Yup.string().required("Comment is required"),
    }),
    onSubmit: (values) => {
      if (!id || selectedRating === null) {
        alert("College ID is missing or rating not selected.");
        return;
      }
      const reviewData = {
        id,
        studentMobile: values.studentMobile,
        starRating: selectedRating,
        description: values.comment,
        type: reviewType
      };
      console.log(reviewData)
      mutation.mutate(reviewData); // Submit review using mutation
    },
  });

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Leave a Review</h2>
      {id ? (
        <p className="mb-4 text-gray-600">
          College Name: <strong>{reviewCollegeName}</strong>
        </p>
      ) : (
        <p className="text-red-600 font-bold">
          College ID not found. Please check the URL.
        </p>
      )}

      {showSuccess && (
        <p className="text-green-600 bg-green-100 p-2 rounded text-center">
          ✅ Review submitted successfully!
        </p>
      )}
      {mutation.isError && (
        <p className="text-red-600 bg-red-100 p-2 rounded text-center">
          ❌ Failed to submit review. Please try again.
        </p>
      )}
      <form onSubmit={formik.handleSubmit} className="mb-6">
        <div className="mb-3">
          <input
            type="tel"
            name="studentMobile"
            placeholder="Your Mobile Number"
            className="w-full p-2 border rounded"
            {...formik.getFieldProps("studentMobile")}
          />
          {formik.touched.studentMobile && formik.errors.studentMobile && (
            <div className="text-red-500 text-sm">
              {formik.errors.studentMobile}
            </div>
          )}
        </div>
        <div className="mb-3 flex space-x-2">
          {[1, 2, 3, 4, 5].map((num) => (
            <span
              key={num}
              className={`cursor-pointer text-3xl ${
                num <= selectedRating ? "text-yellow-500" : "text-gray-400"
              }`}
              onClick={() => setSelectedRating(num)}
            >
              ★
            </span>
          ))}
        </div>
        {/* <div className="mb-3">
          <textarea
            name="comment"
            placeholder="Your Review"
            className="w-full p-2 border rounded"
            rows="3"
            {...formik.getFieldProps("comment")}
          />
          {formik.touched.comment && formik.errors.comment && (
            <div className="text-red-500 text-sm">{formik.errors.comment}</div>
          )}
        </div> */}
        <button
          type="submit"
          className={`w-full p-2 rounded text-white ${
            mutation.isLoading || selectedRating === null
              ? "bg-gray-400"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
          disabled={mutation.isLoading || selectedRating === null}
        >
          {mutation.isLoading ? "Submitting..." : "Submit Review"}
        </button>
      </form>
      <ShowReviews />
    </div>
  );
};

export default ReviewPage;
