
// import { useEffect, useState } from "react";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import { useDispatch, useSelector } from "react-redux";
// import { toast } from "react-toastify";
// import { userSignUp, updateUserProfile, fetchProfileStatusAPI, sendOTP, verifyOTP } from "./Api";
// import { useMutation } from "@tanstack/react-query";
// import Cookies from "js-cookie";
// import { login } from "../../store-redux/AuthSlice";
// import { useLocation } from "react-router-dom";

// const educationOptions = [
//   "Diploma",
//   "Engineering",
//   "HSC",
//   "SSC",
//   "ITI",
//   "Graduation",
//   "Post Graduation",
// ];

// const getValidationSchema = (needsFirstName, needsLastName, needsEducation) => {
//   return Yup.object().shape({
//     mobile_no: needsFirstName || needsLastName || needsEducation
//       ? Yup.string()
//       : Yup.string()
//         .matches(/^[6-9][0-9]{9}$/, "Contact number must start with 6-9 and be 10 digits")
//         .required("Contact number is required"),
//     f_name: needsFirstName
//       ? Yup.string().required("First Name is required")
//       : Yup.string(),
//     l_name: needsLastName
//       ? Yup.string().required("Last Name is required")
//       : Yup.string(),
//     info: Yup.object().shape({
//       current_education: needsEducation
//         ? Yup.string().required("Current Education is required")
//         : Yup.string(),
//     }),
//   });
// };

// const SignupPopup = () => {
//   // const location = useLocation();
//   const authState = useSelector((state) => state.auth);
//   const [isOpen, setIsOpen] = useState(false);
//   const [needsFirstName, setNeedsFirstName] = useState(false);
//   const [needsLastName, setNeedsLastName] = useState(false);
//   const [needsEducation, setNeedsEducation] = useState(false);
//   const [userId, setUserId] = useState(null);
//   const [profileComplete, setProfileComplete] = useState(false);
//   const [showOTP, setShowOTP] = useState(false);
//   const [otpVerified, setOtpVerified] = useState(false);
//   const [referenceId, setReferenceId] = useState(null);
//   const [otp, setOtp] = useState("");
//   const [askLaterClicked, setAskLaterClicked] = useState(false);
//   const [showAskLater, setShowAskLater] = useState(true);
//   const [otpRequested, setOtpRequested] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   const dispatch = useDispatch();

//   // Hide popup if on profile route
//   useEffect(() => {
//     if (location.pathname.startsWith('/profile')) {
//       setIsOpen(false);
//     }
//   }, [location.pathname]);

//   const fetchProfileStatus = async (userId) => {
//     const token = Cookies.get("token");

//     if (!token) {
//       setIsOpen(true);
//       return;
//     }

//     try {
//       const data = await fetchProfileStatusAPI(userId);

//       if (data.usrMsg?.includes("First name")) {
//         setNeedsFirstName(true);
//         setNeedsLastName(false);
//         setNeedsEducation(false);
//         setIsOpen(true);
//         setShowAskLater(true);
//       } else if (data.usrMsg?.includes("Last name")) {
//         setNeedsFirstName(false);
//         setNeedsLastName(true);
//         setNeedsEducation(false);
//         setIsOpen(true);
//         setShowAskLater(true);
//       } else if (data.usrMsg?.includes("Education")) {
//         setNeedsFirstName(false);
//         setNeedsLastName(false);
//         setNeedsEducation(true);
//         setIsOpen(true);
//         setShowAskLater(true);
//       } else {
//         setNeedsFirstName(false);
//         setNeedsLastName(false);
//         setNeedsEducation(false);
//         setIsOpen(false);
//         setProfileComplete(true);
//       }
//     } catch (error) {
//       console.error("Error fetching profile status:", error);
//       if (error.response?.status === 401) {
//         setIsOpen(true);
//       }
//     }
//   };

//   const handleAskLater = () => {
//     setAskLaterClicked(true);
//     setIsOpen(false);
    
//     setTimeout(() => {
//       setIsOpen(true);
//       setShowAskLater(false);
//     }, 15000);
//   };

//   const handleSignUp = async (mobileNumber) => {
//     if (!otp) {
//       toast.error("Please enter OTP");
//       return;
//     }

//     setIsLoading(true);
//     try {
//       const payload = {
//         mobile_no: mobileNumber,
//         otp,
//         reference_id: referenceId,
//       };

//       const response = await mutation.mutateAsync(payload);
//       const parsedData = response.data.data;
//       const token = parsedData.token;
//       const userId = parsedData.userId || parsedData.data?.userId;

//       if (!token || !userId) {
//         throw new Error("Token or UserID missing");
//       }

//       Cookies.set("token", token, { expires: 1 });
//       Cookies.set("userId", userId, { expires: 1 });
//       dispatch(login(userId));

//       setUserId(userId);
//       setIsOpen(false);
//       setShowOTP(false);
//       setOtpVerified(false);
//       setOtpRequested(false);
//       setOtp("");
//       setReferenceId(null);

//       setTimeout(() => fetchProfileStatus(userId), 10000);
//     } catch (error) {
//       console.error("Signup Error:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const mutation = useMutation({
//     mutationFn: userSignUp,
//   });

//   const updateProfileMutation = useMutation({
//     mutationFn: async (values) => {
//       const payload = {};

//       if (needsFirstName) payload.f_name = values.f_name;
//       if (needsLastName) payload.l_name = values.l_name;
//       if (needsEducation) {
//         payload.info = {
//           current_education: values.info.current_education,
//         };
//       }

//       return updateUserProfile({ userId, values: payload });
//     },
//     onSuccess: () => {
//       if (needsFirstName) {
//         toast.success("Saved !");
//       } else if (needsLastName) {
//         toast.success("Saved !");
//       } else if (needsEducation) {
//         toast.success("Saved !");
//       }
      
//       setIsOpen(false);
//       setAskLaterClicked(false);
//       setTimeout(() => fetchProfileStatus(userId), 10000);
//     },
//     onError: (error) => {
//       console.error("[SignupPopup] Profile Update Error:", error?.response?.data);
      
//     },
//   });

//   const sendOTPMutation = useMutation({
//     mutationFn: sendOTP,
//     onSuccess: (data) => {
//       setReferenceId(data.data.reference_id);
//       setShowOTP(true);
//       setOtpRequested(true);
//       toast.success("OTP sent successfully!");
//     },
//     onError: (error) => {
//       console.error("OTP Send Error:", error?.response?.data);
//     },
//   });

//   const verifyOTPMutation = useMutation({
//     mutationFn: verifyOTP,
//     onSuccess: (data) => {
//       setOtpVerified(true);
//       toast.success("OTP varify successfully!");

//     },
//     onError: (error) => {
//       console.error("OTP Verification Error:", error?.response?.data);
//     },
//   });

//   // For first-time visitors or users without a token
//   useEffect(() => {
//     if (location.pathname.startsWith('/profile')) return;

//     const token = Cookies.get("token");
//     const storedUserId = Cookies.get("userId");

//     if (!token) {
//       const timer = setTimeout(() => {
//         setIsOpen(true);
//       }, 10000);
//       return () => clearTimeout(timer);
//     } else if (storedUserId) {
//       setUserId(storedUserId);
//       const timer = setTimeout(() => {
//         fetchProfileStatus(storedUserId);
//       }, 10000);
//       return () => clearTimeout(timer);
//     }
//   }, [location.pathname]);

//   // For profile status polling
//   useEffect(() => {
//     if (location.pathname.startsWith('/profile')) return;

//     let interval;

//     if (authState.isLoggedIn && !profileComplete && userId) {
//       interval = setInterval(() => {
//         fetchProfileStatus(userId);
//       }, 10000);
//     }

//     return () => {
//       if (interval) {
//         clearInterval(interval);
//       }
//     };
//   }, [authState.isLoggedIn, profileComplete, userId, location.pathname]);

//   const handleSendOTP = (mobileNumber) => {
//     if (!mobileNumber) {
//       toast.error("Please enter mobile number");
//       return;
//     }
//     sendOTPMutation.mutate({ mobile_no: mobileNumber });
//   };

//   const handleVerifyAndSignup = async (otpValue, mobileNumber) => {
//     if (!otpValue) {
//       toast.error("Please enter OTP");
//       return;
//     }

//     setIsLoading(true);
//     try {
//       // First verify OTP
//       await verifyOTPMutation.mutateAsync({
//         reference_id: referenceId,
//         otp: otpValue,
//         mobile_no: mobileNumber,
//       });

//       // If OTP verification succeeds, proceed with signup
//       await handleSignUp(mobileNumber);
//     } catch (error) {
//       console.error("Error in verification:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div>
//       {isOpen && !location.pathname.startsWith('/profile') && (
//         <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
//           <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
//             <div className="p-6">
//               <h2 className="text-2xl font-bold text-gray-800 mb-6">
//                 {needsFirstName
//                   ? "Complete Your Profile"
//                   : needsLastName
//                     ? "Last Name Required"
//                     : needsEducation
//                       ? "Education Details"
//                       : "Get Started"}
//               </h2>

//               <Formik
//                 initialValues={{
//                   f_name: "",
//                   l_name: "",
//                   mobile_no: "",
//                   info: {
//                     current_education: "",
//                   },
//                 }}
//                 validationSchema={getValidationSchema(
//                   needsFirstName,
//                   needsLastName,
//                   needsEducation
//                 )}
//                 onSubmit={(values, { setSubmitting }) => {
//                   if (needsFirstName || needsLastName || needsEducation) {
//                     updateProfileMutation.mutate(values);
//                   }
//                   setSubmitting(false);
//                 }}
//               >
//                 {({ values }) => (
//                   <Form className="space-y-4">
//                     {!needsFirstName && !needsLastName && !needsEducation ? (
//                       <>
//                         <div className="space-y-4">
//                           <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">
//                               Mobile Number
//                             </label>
//                             <div className="flex gap-2">
//                               <Field
//                                 name="mobile_no"
//                                 type="tel"
//                                 placeholder="Enter 10-digit mobile number"
//                                 className="flex-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
//                               />
//                               <button
//                                 type="button"
//                                 onClick={() => handleSendOTP(values.mobile_no)}
//                                 disabled={otpRequested}
//                                 className={`px-4 py-2 rounded-lg font-medium transition ${
//                                   otpRequested
//                                     ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                                     : 'bg-blue-600 text-white hover:bg-blue-700'
//                                 }`}
//                               >
//                                 {otpRequested ? 'Sent' : 'Get OTP'}
//                               </button>
//                             </div>
//                             <ErrorMessage
//                               name="mobile_no"
//                               component="div"
//                               className="text-red-500 text-sm mt-1"
//                             />
//                           </div>

//                           {showOTP && (
//                             <div className="space-y-2">
//                               <label className="block text-sm font-medium text-gray-700 mb-1">
//                                 Enter OTP
//                               </label>
//                               <div className="flex gap-2">
//                                 <input
//                                   type="text"
//                                   placeholder="Enter 6-digit OTP"
//                                   value={otp}
//                                   onChange={(e) => setOtp(e.target.value)}
//                                   className="flex-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
//                                   maxLength={6}
//                                 />
//                                 <button
//                                   type="button"
//                                   onClick={() => handleVerifyAndSignup(otp, values.mobile_no)}
//                                   disabled={isLoading}
//                                   className={`px-4 py-2 rounded-lg font-medium transition ${
//                                     isLoading
//                                       ? 'bg-blue-400 cursor-wait'
//                                       : 'bg-green-600 text-white hover:bg-green-700'
//                                   }`}
//                                 >
//                                   {isLoading ? 'Processing...' : 'Verify & Sign Up'}
//                                 </button>
//                               </div>
//                             </div>
//                           )}

//                           {showAskLater && !showOTP && (
//                             <button
//                               type="button"
//                               onClick={handleAskLater}
//                               className="w-full mt-4 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition"
//                             >
//                               Ask Me Later
//                             </button>
//                           )}
//                         </div>
//                       </>
//                     ) : (
//                       <>
//                         <div className="space-y-4">
//                           {needsFirstName && (
//                             <div>
//                               <label className="block text-sm font-medium text-gray-700 mb-1">
//                                 First Name
//                               </label>
//                               <Field
//                                 name="f_name"
//                                 type="text"
//                                 placeholder="Enter your first name"
//                                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
//                               />
//                               <ErrorMessage
//                                 name="f_name"
//                                 component="div"
//                                 className="text-red-500 text-sm mt-1"
//                               />
//                             </div>
//                           )}

//                           {needsLastName && (
//                             <div>
//                               <label className="block text-sm font-medium text-gray-700 mb-1">
//                                 Last Name
//                               </label>
//                               <Field
//                                 name="l_name"
//                                 type="text"
//                                 placeholder="Enter your last name"
//                                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
//                               />
//                               <ErrorMessage
//                                 name="l_name"
//                                 component="div"
//                                 className="text-red-500 text-sm mt-1"
//                               />
//                             </div>
//                           )}

//                           {needsEducation && (
//                             <div>
//                               <label className="block text-sm font-medium text-gray-700 mb-1">
//                                 Current Education
//                               </label>
//                               <Field
//                                 name="info.current_education"
//                                 as="select"
//                                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
//                               >
//                                 <option value="">Select your education</option>
//                                 {educationOptions.map((option) => (
//                                   <option key={option} value={option}>
//                                     {option}
//                                   </option>
//                                 ))}
//                               </Field>
//                               <ErrorMessage
//                                 name="info.current_education"
//                                 component="div"
//                                 className="text-red-500 text-sm mt-1"
//                               />
//                             </div>
//                           )}

//                           <div className="flex gap-3 pt-2">
//                             <button
//                               type="submit"
//                               disabled={updateProfileMutation.isLoading}
//                               className={`flex-1 px-4 py-2 rounded-lg font-medium transition ${
//                                 updateProfileMutation.isLoading
//                                   ? 'bg-blue-400 cursor-wait'
//                                   : 'bg-blue-600 text-white hover:bg-blue-700'
//                               }`}
//                             >
//                               {updateProfileMutation.isLoading ? 'Saving...' : 'Save'}
//                             </button>
                            
//                             {showAskLater && (
//                               <button
//                                 type="button"
//                                 onClick={handleAskLater}
//                                 className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition"
//                               >
//                                 Ask Me Later
//                               </button>
//                             )}
//                           </div>
//                         </div>
//                       </>
//                     )}
//                   </Form>
//                 )}
//               </Formik>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SignupPopup;

"use client"

import { useEffect, useState } from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { userSignUp, updateUserProfile, fetchProfileStatusAPI, sendOTP, verifyOTP } from "./Api"
import { useMutation } from "@tanstack/react-query"
import Cookies from "js-cookie"
import { login } from "../../store-redux/AuthSlice"
import { useLocation } from "react-router-dom"

const educationOptions = ["Diploma", "Engineering", "HSC", "SSC", "ITI", "Graduation", "Post Graduation"]

const getValidationSchema = (needsFirstName, needsLastName, needsEducation) => {
  return Yup.object().shape({
    mobile_no:
      needsFirstName || needsLastName || needsEducation
        ? Yup.string()
        : Yup.string()
            .matches(/^[6-9][0-9]{9}$/, "Contact number must start with 6-9 and be 10 digits")
            .required("Contact number is required"),
    f_name: needsFirstName ? Yup.string().required("First Name is required") : Yup.string(),
    l_name: needsLastName ? Yup.string().required("Last Name is required") : Yup.string(),
    info: Yup.object().shape({
      current_education: needsEducation ? Yup.string().required("Current Education is required") : Yup.string(),
    }),
  })
}

const SignupPopup = () => {
  // const location = useLocation()
  const authState = useSelector((state) => state.auth)
  const [isOpen, setIsOpen] = useState(false)
  const [needsFirstName, setNeedsFirstName] = useState(false)
  const [needsLastName, setNeedsLastName] = useState(false)
  const [needsEducation, setNeedsEducation] = useState(false)
  const [userId, setUserId] = useState(null)
  const [profileComplete, setProfileComplete] = useState(false)
  const [showOTP, setShowOTP] = useState(false)
  const [otpVerified, setOtpVerified] = useState(false)
  const [referenceId, setReferenceId] = useState(null)
  const [otp, setOtp] = useState("")
  const [askLaterClicked, setAskLaterClicked] = useState(false)
  const [showAskLater, setShowAskLater] = useState(true)
  const [otpRequested, setOtpRequested] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [askLaterTimer, setAskLaterTimer] = useState(null)

  const dispatch = useDispatch()

  // Hide popup if on profile route
  useEffect(() => {
    if (location.pathname.startsWith("/profile")) {
      setIsOpen(false)
    }
  }, [location.pathname])

  const fetchProfileStatus = async (userId) => {
    const token = Cookies.get("token")

    if (!token) {
      setIsOpen(true)
      return
    }

    try {
      const data = await fetchProfileStatusAPI(userId)

      if (data.usrMsg?.includes("First name")) {
        setNeedsFirstName(true)
        setNeedsLastName(false)
        setNeedsEducation(false)
        setIsOpen(true)
        setShowAskLater(true)
      } else if (data.usrMsg?.includes("Last name")) {
        setNeedsFirstName(false)
        setNeedsLastName(true)
        setNeedsEducation(false)
        setIsOpen(true)
        setShowAskLater(true)
      } else if (data.usrMsg?.includes("Education")) {
        setNeedsFirstName(false)
        setNeedsLastName(false)
        setNeedsEducation(true)
        setIsOpen(true)
        setShowAskLater(true)
      } else {
        setNeedsFirstName(false)
        setNeedsLastName(false)
        setNeedsEducation(false)
        setIsOpen(false)
        setProfileComplete(true)
      }
    } catch (error) {
      console.error("Error fetching profile status:", error)
      if (error.response?.status === 401) {
        setIsOpen(true)
      }
    }
  }

  // Fixed "Ask me later" functionality
  const handleAskLater = () => {
    setAskLaterClicked(true)
    setIsOpen(false)

    // Clear any existing timer
    if (askLaterTimer) {
      clearTimeout(askLaterTimer)
    }

    // Set new timer to show popup after exactly 15 seconds
    const timer = setTimeout(() => {
      setIsOpen(true)
      setShowAskLater(false) // Hide the "Ask me later" button when popup reappears
    }, 15000)

    setAskLaterTimer(timer)
  }

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (askLaterTimer) {
        clearTimeout(askLaterTimer)
      }
    }
  }, [askLaterTimer])

  const handleSignUp = async (mobileNumber) => {
    if (!otp) {
      toast.error("Please enter OTP")
      return
    }

    setIsLoading(true)
    try {
      const payload = {
        mobile_no: mobileNumber,
        otp,
        reference_id: referenceId,
      }

      const response = await mutation.mutateAsync(payload)
      const parsedData = response.data.data
      const token = parsedData.token
      const userId = parsedData.userId || parsedData.data?.userId

      if (!token || !userId) {
        throw new Error("Token or UserID missing")
      }

      Cookies.set("token", token, { expires: 1 })
      Cookies.set("userId", userId, { expires: 1 })
      dispatch(login(userId))

      setUserId(userId)
      setIsOpen(false)
      setShowOTP(false)
      setOtpVerified(false)
      setOtpRequested(false)
      setOtp("")
      setReferenceId(null)

      // Reduced API calls by using a longer timeout
      setTimeout(() => fetchProfileStatus(userId), 10000)
    } catch (error) {
      console.error("Signup Error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const mutation = useMutation({
    mutationFn: userSignUp,
  })

  const updateProfileMutation = useMutation({
    mutationFn: async (values) => {
      const payload = {}

      if (needsFirstName) payload.f_name = values.f_name
      if (needsLastName) payload.l_name = values.l_name
      if (needsEducation) {
        payload.info = {
          current_education: values.info.current_education,
        }
      }

      return updateUserProfile({ userId, values: payload })
    },
    onSuccess: () => {
      if (needsFirstName) {
        toast.success("Saved !")
      } else if (needsLastName) {
        toast.success("Saved !")
      } else if (needsEducation) {
        toast.success("Saved !")
      }

      setIsOpen(false)
      setAskLaterClicked(false)

      // Reduced API calls by using a longer timeout
      setTimeout(() => fetchProfileStatus(userId), 10000)
    },
    onError: (error) => {
      console.error("[SignupPopup] Profile Update Error:", error?.response?.data)
    },
  })

  const sendOTPMutation = useMutation({
    mutationFn: sendOTP,
    onSuccess: (data) => {
      setReferenceId(data.data.reference_id)
      setShowOTP(true)
      setOtpRequested(true)
      toast.success("OTP sent successfully!")
    },
    onError: (error) => {
      console.error("OTP Send Error:", error?.response?.data)
    },
  })

  const verifyOTPMutation = useMutation({
    mutationFn: verifyOTP,
    onSuccess: (data) => {
      setOtpVerified(true)
      toast.success("OTP verify successfully!")
    },
    onError: (error) => {
      console.error("OTP Verification Error:", error?.response?.data)
    },
  })

  // For first-time visitors or users without a token
  useEffect(() => {
    if (location.pathname.startsWith("/profile")) return

    const token = Cookies.get("token")
    const storedUserId = Cookies.get("userId")

    if (!token) {
      const timer = setTimeout(() => {
        setIsOpen(true)
      }, 10000)
      return () => clearTimeout(timer)
    } else if (storedUserId) {
      setUserId(storedUserId)
      const timer = setTimeout(() => {
        fetchProfileStatus(storedUserId)
      }, 10000)
      return () => clearTimeout(timer)
    }
  }, [location.pathname])

  // For profile status polling - reduced frequency to avoid unnecessary API calls
  useEffect(() => {
    if (location.pathname.startsWith("/profile")) return

    let interval

    if (authState.isLoggedIn && !profileComplete && userId) {
      interval = setInterval(() => {
        fetchProfileStatus(userId)
      }, 30000) // Increased interval to 30 seconds to reduce API calls
    }

    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [authState.isLoggedIn, profileComplete, userId, location.pathname])

  const handleSendOTP = (mobileNumber) => {
    if (!mobileNumber) {
      toast.error("Please enter mobile number")
      return
    }
    sendOTPMutation.mutate({ mobile_no: mobileNumber })
  }

  const handleVerifyAndSignup = async (otpValue, mobileNumber) => {
    if (!otpValue) {
      toast.error("Please enter OTP")
      return
    }

    setIsLoading(true)
    try {
      // First verify OTP
      await verifyOTPMutation.mutateAsync({
        reference_id: referenceId,
        otp: otpValue,
        mobile_no: mobileNumber,
      })

      // If OTP verification succeeds, proceed with signup
      await handleSignUp(mobileNumber)
    } catch (error) {
      console.error("Error in verification:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      {isOpen && !location.pathname.startsWith("/profile") && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                {needsFirstName
                  ? "Complete Your Profile"
                  : needsLastName
                    ? "Last Name Required"
                    : needsEducation
                      ? "Education Details"
                      : "Get Started"}
              </h2>

              <Formik
                initialValues={{
                  f_name: "",
                  l_name: "",
                  mobile_no: "",
                  info: {
                    current_education: "",
                  },
                }}
                validationSchema={getValidationSchema(needsFirstName, needsLastName, needsEducation)}
                onSubmit={(values, { setSubmitting }) => {
                  if (needsFirstName || needsLastName || needsEducation) {
                    updateProfileMutation.mutate(values)
                  }
                  setSubmitting(false)
                }}
              >
                {({ values }) => (
                  <Form className="space-y-4">
                    {!needsFirstName && !needsLastName && !needsEducation ? (
                      <>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                            <div className="flex gap-2">
                              <Field
                                name="mobile_no"
                                type="tel"
                                placeholder="Enter 10-digit mobile number"
                                className="flex-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                              />
                              <button
                                type="button"
                                onClick={() => handleSendOTP(values.mobile_no)}
                                disabled={otpRequested}
                                className={`px-4 py-2 rounded-lg font-medium transition ${
                                  otpRequested
                                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                    : "bg-blue-600 text-white hover:bg-blue-700"
                                }`}
                              >
                                {otpRequested ? "Sent" : "Get OTP"}
                              </button>
                            </div>
                            <ErrorMessage name="mobile_no" component="div" className="text-red-500 text-sm mt-1" />
                          </div>

                          {showOTP && (
                            <div className="space-y-2">
                              <label className="block text-sm font-medium text-gray-700 mb-1">Enter OTP</label>
                              <div className="flex gap-2">
                                <input
                                  type="text"
                                  placeholder="Enter 6-digit OTP"
                                  value={otp}
                                  onChange={(e) => setOtp(e.target.value)}
                                  className="flex-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                  maxLength={6}
                                />
                                <button
                                  type="button"
                                  onClick={() => handleVerifyAndSignup(otp, values.mobile_no)}
                                  disabled={isLoading}
                                  className={`px-4 py-2 rounded-lg font-medium transition ${
                                    isLoading ? "bg-blue-400 cursor-wait" : "bg-green-600 text-white hover:bg-green-700"
                                  }`}
                                >
                                  {isLoading ? "Processing..." : "Verify & Sign Up"}
                                </button>
                              </div>
                            </div>
                          )}

                          {showAskLater && !showOTP && (
                            <button
                              type="button"
                              onClick={handleAskLater}
                              className="w-full mt-4 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition"
                            >
                              Ask Me Later
                            </button>
                          )}
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="space-y-4">
                          {needsFirstName && (
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                              <Field
                                name="f_name"
                                type="text"
                                placeholder="Enter your first name"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                              />
                              <ErrorMessage name="f_name" component="div" className="text-red-500 text-sm mt-1" />
                            </div>
                          )}

                          {needsLastName && (
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                              <Field
                                name="l_name"
                                type="text"
                                placeholder="Enter your last name"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                              />
                              <ErrorMessage name="l_name" component="div" className="text-red-500 text-sm mt-1" />
                            </div>
                          )}

                          {needsEducation && (
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Current Education</label>
                              <Field
                                name="info.current_education"
                                as="select"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                              >
                                <option value="">Select your education</option>
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

                          <div className="flex gap-3 pt-2">
                            <button
                              type="submit"
                              disabled={updateProfileMutation.isLoading}
                              className={`flex-1 px-4 py-2 rounded-lg font-medium transition ${
                                updateProfileMutation.isLoading
                                  ? "bg-blue-400 cursor-wait"
                                  : "bg-blue-600 text-white hover:bg-blue-700"
                              }`}
                            >
                              {updateProfileMutation.isLoading ? "Saving..." : "Save"}
                            </button>

                            {showAskLater && (
                              <button
                                type="button"
                                onClick={handleAskLater}
                                className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition"
                              >
                                Ask Me Later
                              </button>
                            )}
                          </div>
                        </div>
                      </>
                    )}
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SignupPopup

