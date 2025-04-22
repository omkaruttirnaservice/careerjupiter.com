import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ShowReviews from "./ReviewList";
import { submitReview, fetchUserDetails } from "./Api";
import Cookies from "js-cookie";

const ReviewPage = ({ reviewCollegeName, reviewUniversityName }) => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [selectedRating, setSelectedRating] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [loggedInMobile, setLoggedInMobile] = useState("");
  const [userNameValue, setUserNameValue] = useState(null);
  const [hasReviewed, setHasReviewed] = useState(false); // ✅ NEW

  const { pathname } = useLocation();
  const reviewType = pathname.split("/")[1];

  // Fetch user details
  useEffect(() => {
    const userId = Cookies.get("userId");
    if (userId) {
      fetchUserDetails(userId)
        .then((data) => {
          const mobile = data?.data?.mobile_no;
          // console.log(mobile , 'mobilelllll')
          if (mobile) {
            setLoggedInMobile(mobile);
            Cookies.set("userMobile", mobile);
          }
          setUserNameValue(data?.data?.f_name);
        })
        .catch((error) => console.error("Error fetching user details:", error));
    }
  }, []);

  // ✅ Check if user already reviewed
  useEffect(() => {
    const mobile = Cookies.get("userMobile");
    if (id && mobile) {
      fetch(`/api/check-review?id=${id}&mobile=${mobile}`)
        // .then((res) => res.json())
        .then((data) => {
          if (data?.exists) {
            setHasReviewed(true);
          }
        })
        .catch((err) => console.error("Check review failed:", err));
    }
  }, [id, loggedInMobile]);

  // Submit review mutation
  const mutation = useMutation({
    mutationFn: submitReview,
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews", id]);
      formik.resetForm();
      setSelectedRating(null);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 5000);
      setHasReviewed(true); // ✅ Mark reviewed after success
    },
  });

  // Formik setup
  const formik = useFormik({
    initialValues: {
      studentMobile: loggedInMobile || "",
      comment: "",
      commentTags: [],
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      studentMobile: Yup.string()
        .matches(/^\d{10}$/, "Mobile number must be exactly 10 digits")
        .required("Mobile number is required"),
      comment: Yup.string().trim(),
    }),
    onSubmit: (values) => {
      const storedMobile = Cookies.get("userMobile");

      if (hasReviewed) {
        alert("You’ve already submitted a review.");
        return;
      }

      if (values.studentMobile.trim() !== storedMobile?.trim()) {
        alert("Invalid number. Enter the same number used for login.");
        return;
      }

      const reviewData = {
        id,
        studentMobile: values.studentMobile,
        starRating: selectedRating,
        description: values.comment.trim() || " ",
        type: reviewType,
      };

      mutation.mutate(reviewData);
    },
  });

  return (
    <div className="max-w-full">
      <h2 className="text-3xl font-bold text-gray-800  mt-6 text-center">
        Leave a Review
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2  gap-6">
        {/* Left Column - Review Form */}
        <div className="bg-white shadow-lg rounded-lg p-5 ">
          {id ? (
            <p className="mb-4 text-gray-600 text-left">
              <strong>{reviewCollegeName}</strong>
            </p>
          ) : (
            <p className="text-red-600 font-bold text-center">
              ID not found. Please check the URL.
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

          {hasReviewed && (
            <p className="text-blue-600 font-semibold text-center mb-3">
              You’ve already submitted a review for this.
            </p>
          )}

          <form onSubmit={formik.handleSubmit} className="mb-6">
            {/* Mobile Number */}
            <div className="mb-3">
              <input
                type="tel"
                name="studentMobile"
                placeholder="Your Mobile Number"
                className="w-full p-2 border rounded"
                {...formik.getFieldProps("studentMobile")}
                readOnly
              />
              {formik.touched.studentMobile && formik.errors.studentMobile && (
                <div className="text-red-500 text-sm">
                  {formik.errors.studentMobile}
                </div>
              )}
            </div>

            {/* Star Rating */}
            <div className="mb-3 flex space-x-2 justify-right">
              {[1, 2, 3, 4, 5].map((num) => (
                <span
                  key={num}
                  className={`cursor-pointer text-3xl ${num <= selectedRating ? "text-yellow-500" : "text-gray-400"}`}
                  onClick={() => !hasReviewed && setSelectedRating(num)}
                >
                  ★
                </span>
              ))}
            </div>

            {/* Tags */}
            <div className="mb-3">
              <p className="mb-2 text-gray-700 font-semibold">
                Select up to 3 tags to describe your experience:
              </p>
              <div className="flex flex-wrap gap-2">
                {["Good", "Beautiful", "Awesome", "Very Best", "Excellent", "Well Disciplined", "Supportive Staff", "Clean Campus"].map((tag) => {
                  const currentTags = formik.values.commentTags || [];
                  const isSelected = currentTags.includes(tag);

                  return (
                    <span
                      key={tag}
                      className={`px-3 py-1 rounded-full border text-sm cursor-pointer ${isSelected
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-700"
                        }`}
                      onClick={() => {
                        if (hasReviewed) return;
                        let updatedTags = [...currentTags];
                        if (isSelected) {
                          updatedTags = updatedTags.filter((t) => t !== tag);
                        } else if (updatedTags.length < 3) {
                          updatedTags.push(tag);
                        }

                        const sentences = updatedTags.map((t, index) => {
                          if (index === 0) return `This college is ${t}.`;
                          if (index === 1) return `It is ${t}.`;
                          return `Staff is ${t}.`;
                        });

                        const finalComment = sentences.join(" ");
                        formik.setFieldValue("commentTags", updatedTags);
                        formik.setFieldValue("comment", finalComment);
                      }}
                    >
                      {tag}
                    </span>
                  );
                })}
              </div>

              {/* Show generated sentence */}
              {formik.values.comment && (
                <div className="mt-3 text-sm text-gray-600 italic whitespace-pre-line">
                  {formik.values.comment}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={`w-full p-2 cursor-pointer rounded text-white ${mutation.isLoading || selectedRating === null || hasReviewed
                ? "bg-gray-400"
                : "bg-blue-600 hover:bg-blue-700"
                }`}
              disabled={mutation.isLoading || selectedRating === null || hasReviewed}
            >
              {hasReviewed
                ? "Review Already Submitted"
                : mutation.isLoading
                  ? "Submitting..."
                  : "Submit Review"}
            </button>
          </form>
        </div>

        {/* Right Column - Reviews List */}
        <div className="bg-white shadow-lg rounded-lg h-full ">
          <ShowReviews userName={userNameValue} />
        </div>
      </div>
    </div>
  );
};

export default ReviewPage;
