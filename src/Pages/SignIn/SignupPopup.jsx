
import { useEffect, useState } from "react"
import { Formik, Form } from "formik"
import * as Yup from "yup"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import Cookies from "js-cookie"
import { useLocation, useNavigate } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"

import MobileForm from "./MobileForm"
import ProfileForm from "./ProfileForm"
import SignInPopup from "./Signinpopup"
import { ASK_LATER_DELAY, PROFILE_CHECK_DELAY, PROFILE_POLL_INTERVAL } from "../../Constant/constantData"
import { login } from "../../store-redux/AuthSlice"
import { userSignUp, updateUserProfile, fetchProfileStatusAPI, sendOTP, verifyOTP } from "./Api"

const getValidationSchema = (requirement) => {
  return Yup.object().shape({
    mobile_no: requirement !== "none" 
      ? Yup.string()
      : Yup.string()
          .matches(/^[6-9][0-9]{9}$/, "Contact number must start with 6-9 and be 10 digits")
          .required("Contact number is required"),
    f_name: requirement === "firstName" ? Yup.string().required("First Name is required") : Yup.string(),
    info: Yup.object().shape({
      education: requirement === "education" 
        ? Yup.string().required("Current Education is required") 
        : Yup.string(),
    }),
    password: requirement === "password"
      ? Yup.string().min(4, "Password must be at least 4 characters").required("Password is required")
      : Yup.string(),
      confirmPassword: Yup.string()
      .required("Confirm your password")
      .oneOf([Yup.ref("password"), null], "Passwords must match") 
  })
  

}

export default function SignupPopup() {
  let location;
  try {
    location = useLocation?.() || { pathname: '/' };
  } catch (e) {
    location = { pathname: '/' };
  }
  const navigate = useNavigate()
  const authState = useSelector((state) => state.auth)
  const [isOpen, setIsOpen] = useState(false)
  const [requirement, setRequirement] = useState("none")
  const [userId, setUserId] = useState(null)
  const [profileComplete, setProfileComplete] = useState(false)
  const [referenceId, setReferenceId] = useState(null)
  const [askLaterClicked, setAskLaterClicked] = useState(false)
  const [showAskLater, setShowAskLater] = useState(true)
  const [askLaterTimer, setAskLaterTimer] = useState(null)
  const [otpSent, setOtpSent] = useState(false)
  const dispatch = useDispatch()
  const [otpCooldown, setOtpCooldown] = useState(false)
  const [otpTimer, setOtpTimer] = useState(0)
  const [isAlreadyRegistered, setIsAlreadyRegistered] = useState(false)
  const [showSignIn, setShowSignIn] = useState(false)

  

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
      // console.log("SignUpPopup------", data)

      if (data.usrMsg?.includes("First name")) {
        setRequirement("firstName")
        setIsOpen(true)
        setShowAskLater(true)
      } else if (data.usrMsg?.includes("Last name")) {
        setRequirement("lastName")
        setIsOpen(true)
        setShowAskLater(true)
      } else if (data.usrMsg?.includes("Education")) {
        setRequirement("education")
        setIsOpen(true)
        setShowAskLater(true)
      } else if (data.usrMsg?.includes("password") || data.usrMsg?.includes("Password")) {
        setRequirement("password")
        setIsOpen(true)
        setShowAskLater(false)
      } else {
        setRequirement("none")
        setIsOpen(false)
        setProfileComplete(true)
      }
    } catch (error) {
      // console.error("Error fetching profile status:", error)
      if (error?.response?.status === 401) {
        setIsOpen(true)
      }
    }
  }

  const handleAskLater = () => {
    setAskLaterClicked(true)
    setIsOpen(false)
  
    if (askLaterTimer) {
      clearTimeout(askLaterTimer)
    }
  
    const timer = setTimeout(() => {
      setIsOpen(true)
      setShowAskLater(true) // ✅ Keep it visible again
    }, ASK_LATER_DELAY)
  
    setAskLaterTimer(timer)
  }
  
  useEffect(() => {
    return () => {
      askLaterTimer && clearTimeout(askLaterTimer)
    }
  }, [askLaterTimer])

  const handleSignUp = async (mobileNumber, otp) => {
    if (!otp) {
      toast.error("Please enter OTP")
      return
    }

    try {
      const payload = {
        mobile_no: mobileNumber,
        otp,
        reference_id: referenceId,
      }

      const response = await signupMutation.mutateAsync(payload)
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
      setOtpSent(false)
      setReferenceId(null)

      setTimeout(() => fetchProfileStatus(userId), PROFILE_CHECK_DELAY)
    } catch (error) {
      // console.error("Signup Error:", error)
    }
  }

  const signupMutation = useMutation({
    mutationFn: userSignUp,
  })

  const updateProfileMutation = useMutation({
    mutationFn: async (values) => {
      console.log(values);
      const payload = {
        f_name: values.f_name,
        password: values.password,
        education: values.info.education,
      }

      return updateUserProfile({ userId, values: payload })
    },
    onSuccess: () => {
      toast.success("Profile updated successfully!")
      setIsOpen(false)
      setAskLaterClicked(false)
      setTimeout(() => fetchProfileStatus(userId), PROFILE_CHECK_DELAY)
    },
    onError: (error) => {
      // console.error("Update error:", error)
      toast.error(error.response?.data?.message || "Failed to update profile")
    },
  })

  const sendOTPMutation = useMutation({
    mutationFn: sendOTP,
    onSuccess: (data) => {
      setReferenceId(data.data.reference_id)
      setOtpSent(true)
      toast.success("OTP sent successfully!")
    },
    onError: () => {
      console.error("OTP Send Error:", error?.response?.data)

      if (error?.response?.data?.statusCode === 400 && error?.response?.data?.data?.is_issued === true) {
        setIsAlreadyRegistered(true)
      } else {
        toast.error(error?.response?.data?.usrMsg || "Failed to send OTP")
        console.log(error?.response?.data?.usrMsg , 'sent otp errror msg')
      }
    },
  })

  const verifyOTPMutation = useMutation({
    mutationFn: verifyOTP,
    onSuccess: () => {
      toast.success("OTP verified successfully!")
    },
    onError: (error) => {
      console.error("OTP Verification Error:", error?.response?.data)
      toast.error(error?.response?.data?.usrMsg || "Failed to verify OTP")
    },
  })

  useEffect(() => {                                                                                         
    let interval = null;
    if (otpCooldown && otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer((prev) => prev - 1)
      }, 1000)
    } else if (otpTimer === 0 && otpCooldown) {
      setOtpCooldown(false)
    }
    return () => clearInterval(interval)
  }, [otpCooldown, otpTimer])

  const handleSendOTP = (mobileNumber) => {
    if (!mobileNumber) {
      toast.error("Please enter mobile number")
      return
    }
    if (!/^[6-9][0-9]{9}$/.test(mobileNumber)) {
      toast.error("Please enter valid 10-digit mobile number")
      return
    }

    setOtpCooldown(true)
    setOtpTimer(60)
    sendOTPMutation.mutate({ mobile_no: mobileNumber })
  }
 
  

  const handleVerifyAndSignup = async (otp, mobileNumber) => {
    if (!otp) {
      toast.error("Please enter OTP")
      return
    }

    try {
      await verifyOTPMutation.mutateAsync({
        reference_id: referenceId,
        otp,
        mobile_no: mobileNumber,
      })

      await handleSignUp(mobileNumber, otp)
    } catch (error) {
      // console.error("Error in verification:", error)
      if (error?.response?.data?.statusCode === 400 && error?.response?.data?.data?.is_issued === true) {
        setIsAlreadyRegistered(true)
      }
    }
  }

  const handleSuccessfulSignIn = () => {
    setIsOpen(false)
    setShowSignIn(false)
  }

  const handleCloseAlreadyRegisteredModal = () => {
    setIsAlreadyRegistered(false)
    setIsOpen(false)
  }

  const handleNavigateToSignIn = () => {
    setIsAlreadyRegistered(false)
    setIsOpen(false)
    setShowSignIn(true)
  }

  const getTitle = () => {
    switch (requirement) {
      case "firstName": return "Complete Your Profile"
   
      default: return "Get Started"
    }
  }

  useEffect(() => {
    if (["/profile", "/Sign-in", "/forget-password"].some(path => location.pathname.startsWith(path))) return;

    const token = Cookies.get("token")
    const storedUserId = Cookies.get("userId")
    // console.log(token)
    if (!token) {
      const timer = setTimeout(() => {
        setIsOpen(true)
      }, PROFILE_CHECK_DELAY)
      return () => clearTimeout(timer)
    } else if (storedUserId) {
      setUserId(storedUserId)
      const timer = setTimeout(() => {
        fetchProfileStatus(storedUserId)
      }, PROFILE_CHECK_DELAY)
      return () => clearTimeout(timer)
    }
  }, [location.pathname])

  useEffect(() => {
    if (["/profile", "/Sign-in", "/forget-password"].some(path => location.pathname.startsWith(path))) return;

    let interval

    if (authState.isLoggedIn && !profileComplete && userId) {
      interval = setInterval(() => {
        fetchProfileStatus(userId)
      }, PROFILE_POLL_INTERVAL)
    }

    return () => {
      interval && clearInterval(interval)
    }
  }, [authState.isLoggedIn, profileComplete, userId, location.pathname])

  return (
    <>
     {isOpen && !location.pathname.startsWith("/profile") && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">{getTitle()}</h2>

              <Formik
                initialValues={{
                  f_name: "",
                  mobile_no: "",
                  info: { education: "" },
                  password: "",
                }}
                validationSchema={getValidationSchema(requirement)}
                onSubmit={(values, { setSubmitting }) => {
                  // Always update the profile when Save is clicked
                  updateProfileMutation.mutate(values)
                  setSubmitting(false)
                }}
              >
                <Form className="space-y-4">
                  {requirement === "none" ? (
                    <MobileForm
                      onSendOtp={handleSendOTP}
                      onVerifyAndSignup={handleVerifyAndSignup}
                      otpSent={otpSent}
                      isLoading={signupMutation.isLoading || verifyOTPMutation.isLoading}
                      showAskLater={showAskLater}
                      onAskLater={handleAskLater}
                      referenceId={referenceId}
                      otpCooldown={otpCooldown}
                      otpTimer={otpTimer}
                      isSendingOtp={sendOTPMutation.isLoading}
                      isAlreadyRegistered={isAlreadyRegistered}
                      onCloseAlreadyRegisteredModal={handleCloseAlreadyRegisteredModal}
                      onNavigateToSignIn={handleNavigateToSignIn}
                    />
                  ) : (
                    <ProfileForm
                      isLoading={updateProfileMutation.isLoading}
                      showAskLater={showAskLater}
                      onAskLater={handleAskLater}
                    />
                  )}
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      )}

      {showSignIn && (
        <SignInPopup 
          setShowSignUp={() => {
            setShowSignIn(false)
            setIsOpen(true)
          }}
          onSuccessfulSignIn={handleSuccessfulSignIn}
        />
      )}
    </>
  )
}

