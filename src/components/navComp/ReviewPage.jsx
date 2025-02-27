import React from "react";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ShowReviews from "./ReviewList";
import { handleReviews } from "./Api";

const ReviewPage = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();

  // Submit review mutation
  const mutation = useMutation({
    mutationFn: (reviewData) => handleReviews("submit", reviewData),
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews", id]); // Refresh the reviews
      formik.resetForm();
    },
    onError: (error) => {
      console.error("Error submitting review:", error.message);
    },
  });

  // Formik setup
  const formik = useFormik({
    initialValues: {
      studentMobile: "",
      rating: 5,
      comment: "",
    },
    validationSchema: Yup.object({
      studentMobile: Yup.string()
        .matches(/^\d{10}$/, "Mobile number must be exactly 10 digits")
        .required("Mobile number is required"),
      rating: Yup.number().min(1).max(5).required("Rating is required"),
      comment: Yup.string().required("Comment is required"),
    }),
    onSubmit: (values) => {
      if (!id) {
        alert("College ID is missing.");
        return;
      }

      const reviewData = {
        id,
        studentMobile: values.studentMobile,
        starRating: values.rating,
        description: values.comment,
      };

      mutation.mutate(reviewData); // Submit review
    },
  });

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Leave a Review</h2>

      {id ? (
        <p className="mb-4 text-gray-600">
          College ID: <strong>{id}</strong>
        </p>
      ) : (
        <p className="text-red-600 font-bold">College ID not found. Please check the URL.</p>
      )}

      {mutation.isSuccess && (
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
            <div className="text-red-500 text-sm">{formik.errors.studentMobile}</div>
          )}
        </div>

        <div className="mb-3">
          <select
            name="rating"
            className="w-full p-2 border rounded"
            {...formik.getFieldProps("rating")}
          >
            {[5, 4, 3, 2, 1].map((num) => (
              <option key={num} value={num}>
                {num} Star{num > 1 ? "s" : ""}
              </option>
            ))}
          </select>
          {formik.touched.rating && formik.errors.rating && (
            <div className="text-red-500 text-sm">{formik.errors.rating}</div>
          )}
        </div>

        <div className="mb-3">
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
        </div>

        <button
          type="submit"
          className={`w-full p-2 rounded text-white ${
            mutation.isLoading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          }`}
          disabled={mutation.isLoading}
        >
          {mutation.isLoading ? "Submitting..." : "Submit Review"}
        </button>
      </form>

      <ShowReviews />
    </div>
  );
};

export default ReviewPage;
