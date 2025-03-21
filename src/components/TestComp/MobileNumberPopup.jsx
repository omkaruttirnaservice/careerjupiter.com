import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { updateUserDetails } from "./Api";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";

const MobileNumberPopup = ({
  setShowMobileNumberPopup,
  resultGenerationMutation,
  resultData,
}) => {
  const [isOpen, setIsOpen] = useState(true); // Popup is open by default
  const { userId } = useSelector((state) => state.auth);

  // Validation schema using Yup
  const validationSchema = Yup.object().shape({
    mobileNumber: Yup.string()
      .matches(/^\d{10}$/, "Mobile number must be exactly 10 digits")
      .required("Mobile number is required"),
  });

  const mutation = useMutation({
    mutationFn: updateUserDetails,
    onSuccess: (response) => {
      Swal.fire({
        icon: "success",
        title: "Mobile Number Submitted!",
        text: "Your Mobile Number was submitted successfully!",
        confirmButtonColor: "#28a745",
      }).then(() => {
        resultGenerationMutation.mutate(resultData);
        setShowMobileNumberPopup(false);
      });
    },
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Submission Failed!",
        text: "Something went wrong. Please try again.",
        confirmButtonColor: "#dc3545",
      });
    },
  });

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      {/* Popup Modal (Always Visible) */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full relative">
            {/* Close Button inside Form (Top Right) */}
            {/* <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-xl"
            >
              ✖
            </button> */}

            <h2 className="text-xl font-semibold text-center mb-4">
              Enter Mobile Number
            </h2>

            {/* Form using Formik */}
            <Formik
              initialValues={{ mobileNumber: "" }}
              validationSchema={validationSchema}
              onSubmit={(values, { resetForm }) => {
                resetForm();
                setIsOpen(false);
                const data = {
                  userId: userId,
                  mobile_no: values.mobileNumber,
                };
                mutation.mutate(data);
              }}
            >
              {({ handleSubmit }) => (
                <Form onSubmit={handleSubmit} className="space-y-4">
                  {/* Input Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Mobile Number
                    </label>
                    <Field
                      type="text"
                      name="mobileNumber"
                      maxLength="10"
                      className="mt-1 w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
                    />
                    <ErrorMessage
                      name="mobileNumber"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
                  >
                    Submit
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileNumberPopup;
