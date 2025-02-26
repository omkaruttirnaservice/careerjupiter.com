import React from "react";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";

const submitReview = async (reviewData) => {
  const response = await fetch("http://192.168.1.17:5000/api/reviews/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reviewData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to submit review");
  }

  return await response.json(); // Successful response data
};

const ReviewPage = () => {
  const { id } = useParams(); // College ID from URL

  const mutation = useMutation({
    mutationFn: submitReview,
    onSuccess: (data) => {
      console.log("✅ Review submitted successfully:", data);
      formik.resetForm();
    },
    onError: (error) => {
      console.error("❌ Submission error:", error.message);
    },
  });

  const formik = useFormik({
    initialValues: {
      studentMobile: "",
      rating: 5,
      comment: "",
    },
    validationSchema: Yup.object({
      studentMobile: Yup.string()
        .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits")
        .required("Mobile number is required"),
      rating: Yup.number().required("Rating is required").min(1).max(5),
      comment: Yup.string().required("Comment is required"),
    }),
    onSubmit: (values) => {
      if (!id) {
        alert("❌ Cannot submit review — College ID is missing.");
        return;
      }

      const reviewData = {
        id, // College ID from URL
        studentMobile: values.studentMobile,
        starRating: values.rating,
        description: values.comment,
      };

      console.log("🚀 Sending review data:", reviewData);
      mutation.mutate(reviewData); // Trigger TanStack Query mutation
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

      {/* {mutation.isError && (
        <p className="text-red-600 bg-red-100 p-2 rounded text-center">
          ❌ {mutation.error.message}
        </p>
      )} */}

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
          className="cursor-pointer w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          disabled={mutation.isLoading}
        >
          {mutation.isLoading ? "Submitting..." : "Submit Review"}
        </button>
      </form>
    </div>
  );
};

export default ReviewPage;
