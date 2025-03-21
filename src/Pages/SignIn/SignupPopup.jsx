
import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { userSignUp, updateUserProfile, fetchProfileStatusAPI } from "./Api";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { login } from "../../store-redux/AuthSlice";
import { useSelector } from "react-redux";


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
  const dispatch = useDispatch();

  const fetchProfileStatus = async (userId) => {
    const token = Cookies.get("token");
  
    // Check if token is missing
    if (!token) {
      console.log("[SignupPopup] Token missing, showing popup immediately");
      setIsOpen(true); // Show popup immediately if token is missing
      return;
    }
  
    try {
      const data = await fetchProfileStatusAPI(userId);
      console.log("Profile Status API Response:", data);
  
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
  
      // If the API fails due to token invalidity, show the popup
      if (error.response?.status === 401) {
        console.log("[SignupPopup] Token invalid, showing popup immediately");
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
  });

  const updateProfileMutation = useMutation({
    mutationFn: async (values) => {
      // Create a payload with only the fields that need to be updated
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

  useEffect(() => {
    const token = Cookies.get("token");
    const storedUserId = Cookies.get("userId");

    if (!token) {
      console.log("[SignupPopup] No token found, showing popup in 10 seconds");
      setTimeout(() => setIsOpen(true), 10000);
    } else {
      console.log("[SignupPopup] Token found, fetching profile status for user:", storedUserId);
      setUserId(storedUserId);
      setTimeout(() => fetchProfileStatus(storedUserId), 10000);
    }
  }, []); 

  useEffect(() => {
    setIsOpen(!authState.isLoggedIn);
  }, [authState.isLoggedIn]);

  useEffect(() => {
    let interval;
  
    if (!profileComplete && userId) {
      // Start the interval only if the profile is not complete
      interval = setInterval(() => {
        fetchProfileStatus(userId);
      }, 10000);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [profileComplete, userId]);


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
                  current_education: "", // Initialize with empty value
                },
              }}
              validationSchema={getValidationSchema(needsFirstName, needsLastName, needsPassword, needsEducation)}
              onSubmit={(values, { setSubmitting }) => {
                console.log({values})
                if (needsFirstName || needsLastName || needsPassword || needsEducation) {
                  console.log("Updating Profile...");
                  updateProfileMutation.mutate(values);
                } else {
                  console.log("Signing Up...");
                  mutation.mutate(values);
                }
                setSubmitting(false);
              }}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-4">
                  {!needsFirstName && !needsLastName && !needsPassword && !needsEducation ? (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Mobile Number
                        </label>
                        <Field
                          name="mobile_no"
                          type="tel"
                          placeholder="Enter Mobile Number"
                          className="mt-1 block w-full rounded-md border p-2"
                        />
                        <ErrorMessage
                          name="mobile_no"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full block cursor-pointer bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-300"
                      >
                        Sign Up
                      </button>
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
                        className="w-full block bg-green-600 cursor-pointer text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors disabled:bg-green-300"
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