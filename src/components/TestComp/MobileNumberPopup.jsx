import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { sendUserOTP, updateUserDetails, verifyUserOTP } from "./Api";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const MobileNumberPopup = ({
  setShowMobileNumberPopup,
  resultGenerationMutation,
  resultData,
}) => {
  const { userId } = useSelector((state) => state.auth);
  const [showOTP, setShowOTP] = useState(false);
  const [referenceId, setReferenceId] = useState(null);

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name cannot exceed 50 characters")
      .required("Name is required"),
    mobileNumber: Yup.string()
      .matches(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits")
      .required("Mobile number is required"),
    otp: Yup.string()
      .matches(/^[0-9]{6}$/, "OTP must be 6 digits")
      .required("OTP is required"),
  });

  const sendOTPMutation = useMutation({
    mutationFn: sendUserOTP,
    onSuccess: (data) => {
      setReferenceId(data.data.reference_id);
      setShowOTP(true);
      toast.success("OTP sent successfully!");
    },
    onError: () => toast.error("Failed to send OTP!"),
  });

  const updateUserMutation = useMutation({
    mutationFn: updateUserDetails,
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Details Submitted!",
        text: "Your details were updated successfully!",
      });
      resultGenerationMutation.mutate(resultData);
      setShowMobileNumberPopup(false);
    },
    onError: () =>
      Swal.fire({
        icon: "error",
        title: "Submission Failed!",
        text: "Something went wrong. Please try again.",
      }),
  });

  const verifyOTPMutation = useMutation({
    mutationFn: verifyUserOTP,
    onSuccess: (_, variables) => {
      toast.success("OTP verified successfully!");
      updateUserMutation.mutate({
        userId,
        f_name: variables.name,
        mobile_no: variables.mobile_no,
      });
    },
    onError: () => toast.error("Failed to verify OTP!"),
  });

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-xl font-semibold text-center mb-4">
          Enter Your Details
        </h2>
        <Formik
          initialValues={{ name: "", mobileNumber: "", otp: "" }}
          validationSchema={validationSchema}
          onSubmit={() => {}}
        >
          {({ values }) => (
            <Form className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Name</label>
                <Field
                  type="text"
                  name="name"
                  className="mt-1 w-full p-2 border rounded-md"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">
                  Mobile Number
                </label>
                <Field
                  type="text"
                  name="mobileNumber"
                  maxLength="10"
                  className="mt-1 w-full p-2 border rounded-md"
                />
                <ErrorMessage
                  name="mobileNumber"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
                <button
                  type="button"
                  onClick={() =>
                    sendOTPMutation.mutate({ mobile_no: values.mobileNumber })
                  }
                  className="mt-2 w-full bg-blue-500 text-white py-2 rounded-md"
                >
                  Get OTP
                </button>
              </div>

              {showOTP && (
                <div>
                  <label className="block text-sm font-medium">Enter OTP</label>
                  <Field
                    type="text"
                    name="otp"
                    maxLength="6"
                    className="mt-1 w-full p-2 border rounded-md"
                  />
                  <ErrorMessage
                    name="otp"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      verifyOTPMutation.mutate({
                        reference_id: referenceId,
                        otp: values.otp,
                        mobile_no: values.mobileNumber,
                        name: values.name,
                      })
                    }
                    className="mt-2 w-full bg-green-500 text-white py-2 rounded-md"
                  >
                    Verify OTP
                  </button>
                </div>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default MobileNumberPopup;
