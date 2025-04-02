

"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Field, Form, Formik, ErrorMessage } from "formik"
import * as Yup from "yup"
import { toast } from "react-toastify"
import { forgotPassword, verifyResetOtp, resetPassword } from "./Api" // Using your existing API functions
import { FaEye, FaEyeSlash } from "react-icons/fa";


function ForgetPasswordPage() {
  const [step, setStep] = useState(1) // 1: Mobile, 2: OTP, 3: New Password
  const [mobileNumber, setMobileNumber] = useState("")
  const [referenceId, setReferenceId] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const navigate = useNavigate()

  // Clean and validate mobile number before sending
  const cleanMobileNumber = (mobile_no) => {
    return mobile_no
      .replace(/^\+91|^91/, "") // Remove country code if present
      .replace(/\D/g, "") // Remove all non-digit characters
      .trim()
  }

  // Mobile number validation schema
  const mobileValidationSchema = Yup.object().shape({
    mobile_no: Yup.string()
      .required("Mobile number is required")
      .test("is-valid-mobile", "Invalid mobile number", (value) => {
        const cleaned = cleanMobileNumber(value)
        return /^[6-9]\d{9}$/.test(cleaned)
      }),
  })

  // OTP validation schema
  const otpValidationSchema = Yup.object().shape({
    otp: Yup.string()
      .required("OTP is required")
      .matches(/^\d+$/, "OTP must contain only digits")
      .length(6, "OTP must be 6 digits"),
  })

  // Password validation schema
  const passwordValidationSchema = Yup.object().shape({
    new_password: Yup.string().min(4, "Password must be at least 4 characters").required("Password is required"),
    confirm_password: Yup.string()
      .oneOf([Yup.ref("new_password"), null], "Passwords must match")
      .required("Confirm password is required"),
  })

  // Handle sending OTP
  const handleSendOtp = async (values, { setSubmitting }) => {
    setIsLoading(true)
    try {
      const cleanedMobile = cleanMobileNumber(values.mobile_no)
      setMobileNumber(cleanedMobile)

      const response = await forgotPassword(cleanedMobile)

      if (response.success) {
        setReferenceId(response.data.reference_id)
        setStep(2)
        toast.success(response.usrMsg || "OTP sent successfully!")
      } else {
        toast.error(response.errMsg || "Failed to send OTP")
      }
    } catch (error) {
      const errorMsg = error.response?.data?.errMsg || error.response?.data?.message || "Failed to send OTP"
      toast.error(errorMsg)
    } finally {
      setIsLoading(false)
      setSubmitting(false)
    }
  }

  // Handle verifying OTP
  const handleVerifyOtp = async (values, { setSubmitting }) => {
    setIsLoading(true)
    try {
      const payload = {
        mobile_no: mobileNumber,
        reference_id: referenceId,
        otp: Number.parseInt(values.otp),
      }

      const response = await verifyResetOtp(payload)

      if (response.success) {
        setStep(3)
        toast.success(response.usrMsg || "OTP verified successfully!")
      } else {
        toast.error(response.errMsg || "Invalid OTP")
      }
    } catch (error) {
      const errorMsg = error.response?.data?.errMsg || error.response?.data?.message || "Invalid OTP"
      toast.error(errorMsg)
    } finally {
      setIsLoading(false)
      setSubmitting(false)
    }
  }

  // Handle resetting password
  const handlePasswordReset = async (values, { setSubmitting }) => {
    setIsLoading(true)
    try {
      const payload = {
        mobile_no: mobileNumber,
        new_password: values.new_password,
        confirm_password: values.confirm_password,
      }

      const response = await resetPassword(payload)

      if (response.success) {
        toast.success(response.usrMsg || "Password updated successfully!")
        // Navigate to signin page after successful password reset
        setTimeout(() => {
          navigate("/Sign-in")
        }, 1500)
      } else {
        toast.error(response.errMsg || "Failed to update password")
      }
    } catch (error) {
      const errorMsg = error.response?.data?.errMsg || error.response?.data?.message || "Failed to update password"
      toast.error(errorMsg)
    } finally {
      setIsLoading(false)
      setSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-md m-3 p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Reset Password</h2>

      {/* Step 1: Mobile Number Input */}
      {step === 1 && (
        <Formik initialValues={{ mobile_no: "" }} validationSchema={mobileValidationSchema} onSubmit={handleSendOtp}>
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                <Field
                  name="mobile_no"
                  type="tel"
                  placeholder="Enter registered mobile number"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
                <ErrorMessage name="mobile_no" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                disabled={isLoading}
              >
                {isLoading ? "Sending..." : "Get OTP"}
              </button>
            </Form>
          )}
        </Formik>
      )}

      {/* Step 2: OTP Verification */}
      {step === 2 && (
        <Formik initialValues={{ otp: "" }} validationSchema={otpValidationSchema} onSubmit={handleVerifyOtp}>
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Enter OTP</label>
                <Field
                  name="otp"
                  type="text"
                  inputMode="numeric"
                  placeholder="Enter 6-digit OTP"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
                <ErrorMessage name="otp" component="div" className="text-red-500 text-sm mt-1" />
                <p className="text-sm text-gray-500 mt-2">OTP sent to {mobileNumber}</p>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                disabled={isLoading}
              >
                {isLoading ? "Verifying..." : "Verify OTP"}
              </button>

              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-full mt-2 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200"
              >
                Back
              </button>
            </Form>
          )}
        </Formik>
      )}

      {/* Step 3: New Password */}
      {step === 3 && (
        <Formik
          initialValues={{ new_password: "", confirm_password: "" }}
          validationSchema={passwordValidationSchema}
          onSubmit={handlePasswordReset}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
            {/* New Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <div className="relative">
                <Field
                  name="new_password"
                  type={showNewPassword ? "text" : "password"}
                  placeholder="Enter new password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? (
                    <FaEyeSlash className="h-5 w-5 text-gray-500" />
                  ) : (
                    <FaEye className="h-5 w-5 text-gray-500" />
                  )}
                </button>
              </div>
              <ErrorMessage
                name="new_password"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
      
            {/* Confirm Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <Field
                  name="confirm_password"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm new password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <FaEyeSlash className="h-5 w-5 text-gray-500" />
                  ) : (
                    <FaEye className="h-5 w-5 text-gray-500" />
                  )}
                </button>
              </div>
              <ErrorMessage
                name="confirm_password"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
      
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : "Update Password"}
            </button>
      
            {/* Back Button */}
            <button
              type="button"
              onClick={() => setStep(2)}
              className="w-full mt-2 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200"
            >
              Back
            </button>
          </Form>
          )}
        </Formik>
      )}

      
    </div>
  </div>
  )
}

export default ForgetPasswordPage

