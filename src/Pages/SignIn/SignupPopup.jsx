import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { userSignUp, updateUserProfile, fetchProfileStatusAPI, sendOTP, verifyOTP } from "./Api";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { login, logout } from "../../store-redux/AuthSlice";

const educationOptions = [
  "Diploma",
  "Engineering",
  "HSC",
  "SSC",
  "ITI",
  "Graduation",
  "Post Graduation",
];

const getValidationSchema = (needsFirstName, needsLastName, needsPassword, needsEducation) => {
  return Yup.object().shape({
    mobile_no: needsFirstName || needsLastName || needsPassword || needsEducation
      ? Yup.string()
      : Yup.string()
        .matches(/^[6-9][0-9]{9}$/, "Contact number must start with 6-9 and be 10 digits")
        .required("Contact number is required"),
    f_name: needsFirstName
      ? Yup.string().required("First Name is required")
      : Yup.string(),
    l_name: needsLastName
      ? Yup.string().required("Last Name is required")
      : Yup.string(),
    password: needsPassword
      ? Yup.string()
        .min(8, "Password must be at least 8 characters")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(/[0-9]/, "Password must contain at least one number")
        .matches(/[^A-Za-z0-9]/, "Password must contain at least one special character")
        .required("Password is required")
      : Yup.string(),
    info: Yup.object().shape({
      current_education: needsEducation
        ? Yup.string().required("Current Education is required")
        : Yup.string(),
    }),
  });
};

const SignupPopup = () => {
  const authState = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false);
  const [needsFirstName, setNeedsFirstName] = useState(false);
  const [needsLastName, setNeedsLastName] = useState(false);
  const [needsPassword, setNeedsPassword] = useState(false);
  const [needsEducation, setNeedsEducation] = useState(false);
  const [userId, setUserId] = useState(null);
  const [profileComplete, setProfileComplete] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [referenceId, setReferenceId] = useState(null);
  const [otp, setOtp] = useState("");

  const dispatch = useDispatch();

  const fetchProfileStatus = async (userId) => {
    const token = Cookies.get("token");

    if (!token) {
      setIsOpen(true);
      return;
    }

    try {
      const data = await fetchProfileStatusAPI(userId);

      if (data.usrMsg?.includes("First name")) {
        setNeedsFirstName(true);
        setNeedsLastName(false);
        setNeedsPassword(false);
        setNeedsEducation(false);
        setIsOpen(true);
      } else if (data.usrMsg?.includes("Last name")) {
        setNeedsFirstName(false);
        setNeedsLastName(true);
        setNeedsPassword(false);
        setNeedsEducation(false);
        setIsOpen(true);
      } else if (data.usrMsg?.includes("Password")) {
        setNeedsFirstName(false);
        setNeedsLastName(false);
        setNeedsPassword(true);
        setNeedsEducation(false);
        setIsOpen(true);
      } else if (data.usrMsg?.includes("Education")) {
        setNeedsFirstName(false);
        setNeedsLastName(false);
        setNeedsPassword(false);
        setNeedsEducation(true);
        setIsOpen(true);
      } else {
        setNeedsFirstName(false);
        setNeedsLastName(false);
        setNeedsPassword(false);
        setNeedsEducation(false);
        setIsOpen(false);
        setProfileComplete(true);
      }
    } catch (error) {
      console.error("Error fetching profile status:", error);

      if (error.response?.status === 401) {
        setIsOpen(true);
      }
    }
  };

  const mutation = useMutation({
    mutationFn: userSignUp,
    onSuccess: (data) => {
      console.log("Signup API Response:", data);
      const parsedData = data.data.data;
      const token = parsedData.token;
      const userId = parsedData.userId || parsedData.data?.userId;

      if (!token || !userId) {
        console.error("🚨 Token or UserID missing!", parsedData);
        toast.error("Signup successful but token/userId missing!");
        return;
      }

      Cookies.set("token", token, { expires: 1 });
      Cookies.set("userId", userId, { expires: 1 });

      dispatch(login(userId));

      setUserId(userId);
      setIsOpen(false);

      setTimeout(() => fetchProfileStatus(userId), 10000);
    },
    onError: (error) => {
      console.error("Signup Error:", error?.response?.data);
      toast.error("Signup failed! Please try again.");
    },
  });

  const updateProfileMutation = useMutation({
    mutationFn: async (values) => {
      const payload = {};

      if (needsFirstName) {
        payload.f_name = values.f_name;
      }
      if (needsLastName) {
        payload.l_name = values.l_name;
      }
      if (needsPassword) {
        payload.password = values.password;
      }
      if (needsEducation) {
        payload.info = {
          current_education: values.info.current_education,
        };
      }

      return updateUserProfile({ userId, values: payload });
    },
    onSuccess: () => {
      toast.success("Profile updated successfully!");
      setIsOpen(false);
      setTimeout(() => fetchProfileStatus(userId), 10000);
    },
    onError: (error) => {
      console.error("[SignupPopup] Profile Update Error:", error?.response?.data);
      toast.error("Failed to update profile!");
    },
  });

  const sendOTPMutation = useMutation({
    mutationFn: sendOTP,
    onSuccess: (data) => {
      console.log("OTP Sent Successfully:", data);
      setReferenceId(data.data.reference_id);
      setShowOTP(true); // Automatically show OTP input field after OTP is sent
      toast.success("OTP sent successfully!");
    },
    onError: (error) => {
      console.error("OTP Send Error:", error?.response?.data);
      toast.error("Failed to send OTP!");
    },
  });

  const verifyOTPMutation = useMutation({
    mutationFn: verifyOTP,
    onSuccess: (data) => {
      console.log("OTP Verified Successfully:", data);
      setOtpVerified(true);
      toast.success("OTP verified successfully!");
    },
    onError: (error) => {
      console.error("OTP Verification Error:", error?.response?.data);
      toast.error("Failed to verify OTP!");
    },
  });

  useEffect(() => {
    const token = Cookies.get("token");
    const storedUserId = Cookies.get("userId");

    if (!token) {
      setTimeout(() => setIsOpen(true), 10000);
    } else {
      setUserId(storedUserId);
      setTimeout(() => fetchProfileStatus(storedUserId), 10000);
    }
  }, []);

  useEffect(() => {
    let timer;

    if (!authState.isLoggedIn) {
      timer = setTimeout(() => {
        setIsOpen(true);
      }, 10000);
    } else {
      setIsOpen(false);
    }

    return () => clearTimeout(timer);
  }, [authState.isLoggedIn]);

  useEffect(() => {
    let interval;

    if (authState.isLoggedIn && !profileComplete && userId) {
      interval = setInterval(() => {
        fetchProfileStatus(userId);
      }, 10000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [authState.isLoggedIn, profileComplete, userId]);

  const handleSendOTP = (mobileNumber) => {
    sendOTPMutation.mutate({ mobile_no: mobileNumber });
  };

  const handleVerifyOTP = (otp, mobileNumber) => {
    verifyOTPMutation.mutate({
      reference_id: referenceId,
      otp,
      mobile_no: mobileNumber // Add mobile number to the payload
    });
  };
  return (
    <div>
      {isOpen && (
        <div className="fixed z-50 top-0 left-0 w-full h-full bg-black/50 backdrop-blur-sm flex justify-center items-center">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              {needsFirstName
                ? "First Name"
                : needsLastName
                  ? "Last Name"
                  : needsPassword
                    ? "Password"
                    : needsEducation
                      ? "Education"
                      : "Get Started"}
            </h2>
            <Formik
              initialValues={{
                f_name: "",
                l_name: "",
                password: "",
                mobile_no: "",
                info: {
                  current_education: "",
                },
              }}
              validationSchema={getValidationSchema(needsFirstName, needsLastName, needsPassword, needsEducation)}
              onSubmit={(values, { setSubmitting }) => {
                if (needsFirstName || needsLastName || needsPassword || needsEducation) {
                  updateProfileMutation.mutate(values);
                } else {
                  // Add OTP and reference_id to the signup payload
                  const signupPayload = {
                    ...values,
                    otp, // Include the OTP
                    reference_id: referenceId, // Include the reference_id
                  };
                  console.log("Signup Payload:", signupPayload); // Debugging log
                  mutation.mutate(signupPayload);
                }
                setSubmitting(false);
              }}
            >
              {({ isSubmitting, values }) => (
                <Form className="space-y-4">
                  {!needsFirstName && !needsLastName && !needsPassword && !needsEducation ? (
                    <>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                          Mobile Number
                        </label>
                        <div className="flex gap-2">
                          <Field
                            name="mobile_no"
                            type="tel"
                            placeholder="Enter Mobile Number"
                            className="mt-1 block w-full rounded-md border p-2"
                          />
                          <button
                            type="button"
                            onClick={() => handleSendOTP(values.mobile_no)}
                            className="mt-1 bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600"
                          >
                            Get OTP
                          </button>
                        </div>
                        <ErrorMessage
                          name="mobile_no"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>

                      {showOTP && (
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700">
                            Enter OTP
                          </label>
                          <div className="flex gap-2">
                            <Field
                              name="otp"
                              type="text"
                              placeholder="Enter OTP"
                              className="mt-1 block w-full rounded-md border p-2"
                              value={otp}
                              onChange={(e) => setOtp(e.target.value)}
                            />
                            <button
                              type="button"
                              onClick={() => handleVerifyOTP(otp, values.mobile_no)}
                              className="mt-1 bg-green-500 text-white px-3 py-2 rounded-md hover:bg-green-600"
                            >
                              Verify OTP
                            </button>
                          </div>
                        </div>
                      )}

                      {otpVerified && (
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full block cursor-pointer bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-300"
                        >
                          Sign Up
                        </button>
                      )}
                    </>
                  ) : (
                    <>
                      {needsFirstName && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            First Name
                          </label>
                          <Field
                            name="f_name"
                            type="text"
                            placeholder="Enter First Name"
                            className="mt-1 block w-full rounded-md border p-2"
                          />
                          <ErrorMessage
                            name="f_name"
                            component="div"
                            className="text-red-500 text-sm mt-1"
                          />
                        </div>
                      )}
                      {needsLastName && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Last Name
                          </label>
                          <Field
                            name="l_name"
                            type="text"
                            placeholder="Enter Last Name"
                            className="mt-1 block w-full rounded-md border p-2"
                          />
                          <ErrorMessage
                            name="l_name"
                            component="div"
                            className="text-red-500 text-sm mt-1"
                          />
                        </div>
                      )}
                      {needsPassword && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Password
                          </label>
                          <Field
                            name="password"
                            type="password"
                            placeholder="Enter Password"
                            className="mt-1 block w-full rounded-md border p-2"
                          />
                          <ErrorMessage
                            name="password"
                            component="div"
                            className="text-red-500 text-sm mt-1"
                          />
                        </div>
                      )}
                      {needsEducation && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Current Education
                          </label>
                          <Field
                            name="info.current_education"
                            as="select"
                            className="mt-1 block w-full rounded-md border p-2"
                          >
                            <option value="">Select Current Education</option>
                            {educationOptions.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </Field>

                          <ErrorMessage
                            name="info.current_education"
                            component="div"
                            className="text-red-500 text-sm mt-1"
                          />
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full block cursor-pointer bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors disabled:bg-green-300"
                      >
                        Save
                      </button>
                    </>
                  )}
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignupPopup;