import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const ReviewPage = () => {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: "John Doe",
      rating: 5,
      comment: "Amazing college experience! Great faculty and campus.",
      image: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      id: 2,
      name: "Jane Smith",
      rating: 4,
      comment: "Good infrastructure and well-maintained labs.",
      image: "https://randomuser.me/api/portraits/women/2.jpg",
    },
  ]);

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    rating: Yup.number().required("Rating is required"),
    comment: Yup.string().required("Comment is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      rating: 5,
      comment: "",
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      const newReview = {
        id: Date.now(),
        name: values.name,
        rating: values.rating,
        comment: values.comment,
        image: `https://randomuser.me/api/portraits/lego/${Math.floor(Math.random() * 10)}.jpg`,
      };

      setReviews([newReview, ...reviews]);
      resetForm();
    },
  });

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white p-5 shadow-lg rounded-xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Student Reviews
        </h2>

        <form
          onSubmit={formik.handleSubmit}
          className="bg-gray-100 p-4 rounded-lg"
        >
          <h3 className="text-lg font-semibold text-gray-700 mb-3">
            Leave a Review
          </h3>

          <div className="mb-2">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className="w-full p-2 border rounded"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="text-red-500 text-sm">{formik.errors.name}</div>
            ) : null}
          </div>

          <div className="mb-2">
            <select
              name="rating"
              className="w-full p-2 border rounded"
              value={formik.values.rating}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              {[5, 4, 3, 2, 1].map((num) => (
                <option key={num} value={num}>
                  {num} Star{num > 1 ? "s" : ""}
                </option>
              ))}
            </select>
            {formik.touched.rating && formik.errors.rating ? (
              <div className="text-red-500 text-sm">{formik.errors.rating}</div>
            ) : null}
          </div>

          <div className="mb-3">
            <textarea
              name="comment"
              placeholder="Your Review"
              className="w-full p-2 border rounded"
              rows="3"
              value={formik.values.comment}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.comment && formik.errors.comment ? (
              <div className="text-red-500 text-sm">
                {formik.errors.comment}
              </div>
            ) : null}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            Submit Review
          </button>
        </form>

        <div className="mt-6 space-y-4">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-gray-50 p-4 rounded-lg shadow-sm flex gap-4"
            >
              <img
                src={review.image}
                alt={review.name}
                className="w-12 h-12 rounded-full border"
              />
              <div>
                <h4 className="font-semibold text-gray-800">{review.name}</h4>
                <div className="flex text-yellow-500 text-sm">
                  {"★".repeat(review.rating)}{" "}
                  <span className="text-gray-400 ml-2">{review.rating}/5</span>
                </div>
                <p className="text-gray-600 mt-1">{review.comment}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewPage;
