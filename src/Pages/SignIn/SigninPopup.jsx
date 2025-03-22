import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { userSignUp } from "./Api";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../Login/Api";
import Cookies from "js-cookie";
import { login } from "../../store-redux/AuthSlice";
import Swal from "sweetalert2";
import { SET_TIME } from "../../utils/constansts";

const educationOptions = [
  "Diploma",
  "Engineering",
  "HSC",
  "SSC",
  "ITI",
  "Graduation",
  "Post Graduation",
];

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("First Name is required"),
  lastName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Last Name is required"),
  contactNumber: Yup.string()
    .matches(/^[0-9]{10}$/, "Contact number must be 10 digits")
    .required("Contact number is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  education: Yup.string().required("Education is required"), // New field validation

  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Must contain at least one uppercase letter")
    .matches(/[a-z]/, "Must contain at least one lowercase letter")
    .matches(/[0-9]/, "Must contain at least one number")
    .matches(/[@$!%*?&#]/, "Must contain at least one special character")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const SignupPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);

  const mutation = useMutation({
    mutationFn: userSignUp,
    onSuccess: (data) => {
      console.log(data, "signup data");
      // toast.success("Signup successful!");
      setShowLogin(true);
    },

    onError: (error) => {
      const errorMessage = error.response?.data?.message || "Signup failed";
      toast.error(errorMessage);
      console.error("Signup Error Details:", {
        errorData: error.response?.data,
        requestData: error.config?.data,
      });
    },
  });

  // Login Mutation
  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      const parsedData = data.data;
      Cookies.set("token", parsedData.token, { expires: 1 });
      Cookies.set("userId", parsedData.user_id, { expires: 1 });
      dispatch(login(parsedData.user_id));
      setIsOpen(false);
      // toast.success("Login successful!");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Login failed");
    },
  });

  useEffect(() => {
    let timer;

    if (!authState.isLoggedIn) {
      timer = setTimeout(() => {
        setIsOpen(true);
      }, SET_TIME);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [authState.isLoggedIn]);

  const handleFormSubmit = async (values, { setSubmitting }) => {
    const isLogin = showLogin;
    const result = await Swal.fire({
      title: isLogin ? "Sign In Confirmation" : "Sign Up Confirmation",
      text: isLogin
        ? "Are you sure you want to sign in?"
        : "Are you sure you want to create an account?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) {
      setSubmitting(false);
      return;
    }

    if (isLogin) {
      loginMutation.mutate({
        email_id: values.email,
        password: values.password,
      });
    } else {
      mutation.mutate({
        f_name: values.firstName,
        l_name: values.lastName,
        mobile_no: values.contactNumber,
        email_id: values.email,
        info: {
          current_education: values.education, // ✅  location
        },
        password: values.password,
      });
    }
    setSubmitting(false);
  };

  return (
    <div>
      {isOpen && (
        <div className="fixed z-50 top-0 left-0 w-full h-full bg-black/50 backdrop-blur-sm flex justify-center items-center">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
            {/* <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button> */}

            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              {showLogin ? "Sign In to Continue" : "Create New Account"}
            </h2>

            <Formik
              initialValues={{
                firstName: "",
                lastName: "",
                contactNumber: "",
                email: "",
                education: "",
                password: "",
                confirmPassword: "",
              }}
              validationSchema={showLogin ? null : validationSchema}
              onSubmit={handleFormSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-4">
                  {!showLogin && (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Field
                          name="firstName"
                          placeholder="First Name"
                          className="w-full p-2 border rounded"
                        />
                        <ErrorMessage
                          name="firstName"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>
                      <div>
                        <Field
                          name="lastName"
                          placeholder="Last Name"
                          className="w-full p-2 border rounded"
                        />
                        <ErrorMessage
                          name="lastName"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>
                    </div>
                  )}

                  {!showLogin && (
                    <div>
                      <Field
                        name="contactNumber"
                        placeholder="Mobile Number"
                        className="w-full p-2 border rounded"
                      />
                      <ErrorMessage
                        name="contactNumber"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                  )}

                  <div>
                    <Field
                      name="email"
                      type="email"
                      placeholder="Email Address"
                      className="w-full p-2 border rounded"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  {!showLogin && (
                    <div>
                      <Field
                        as="select"
                        name="education"
                        className="w-full p-2 border rounded bg-white"
                      >
                        <option value="">Select Education</option>
                        {educationOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage
                        name="education"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                  )}

                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="w-full ">
                      <Field
                        name="password"
                        type="password"
                        placeholder="Password"
                        className="w-full p-2 border rounded"
                      />
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    {!showLogin && (
                      <div className="w-full ">
                        <Field
                          name="confirmPassword"
                          type="password"
                          placeholder="Confirm Password"
                          className="w-full p-2 border rounded"
                        />
                        <ErrorMessage
                          name="confirmPassword"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full ${
                      showLogin ? "bg-blue-600" : "bg-green-600"
                    } text-white py-2 px-4 cursor-pointer rounded-md hover:opacity-90 transition-opacity`}
                  >
                    {showLogin ? "Sign In" : "Sign Up"}
                  </button>

                  <p className="text-center text-sm text-gray-600">
                    {showLogin ? "New User? " : "Already have an account? "}
                    <button
                      type="button"
                      onClick={() => setShowLogin(!showLogin)}
                      className="text-blue-600 cursor-pointer hover:underline  font-medium"
                    >
                      {showLogin ? "Create Account" : "Login Here"}
                    </button>
                  </p>
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
