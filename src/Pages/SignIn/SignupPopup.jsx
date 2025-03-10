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
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Must contain at least one uppercase letter")
    .matches(/[a-z]/, "Must contain at least one lowercase letter")
    .matches(/[0-9]/, "Must contain at least one number")
    .matches(/[@$!%*?&]/, "Must contain at least one special character")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const SignupPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loginData, setLoginData] = useState({
    email_id: null,
    password: null,
  });
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);

  const mutation = useMutation({
    mutationFn: userSignUp,
    onSuccess: (data) => {
      toast.success("Form submitted successfully!");
      loginMutation.mutate(loginData);
    },
    onError: (error) => {
      const errorData = error?.response?.data;
      console.error("Error details:", errorData);
    },
  });

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      let parsedData = typeof data.data === "string" ? data.data : data.data;
      const userId =
        parsedData._id || parsedData.user_id || parsedData.user?._id;

      Cookies.set("token", parsedData.token, { expires: 1 });
      Cookies.set("userId", parsedData.user_id, { expires: 1 });

      dispatch(login(parsedData.user_id));
    },
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsOpen(!authState.isLoggedIn);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [authState.isLoggedIn]);

  useEffect(() => {
    setIsOpen(!authState.isLoggedIn);
  }, [authState.isLoggedIn]);

  return (
    <div>
      {isOpen && (
        <div className="fixed z-50 top-0 left-0 w-full h-full bg-black/50 backdrop-blur-sm flex justify-center items-center">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold mb-6 text-gray-800">Sign Up</h2>

            <Formik
              initialValues={{
                firstName: "",
                lastName: "",
                contactNumber: "",
                email: "",
                password: "",
                confirmPassword: "",
              }}
              validationSchema={validationSchema}
              onSubmit={(values, { setSubmitting }) => {
                // setTimeout(() => {
                //   setSubmitting(false);
                //   setIsOpen(false);
                // }, 400);
                const finalData = {
                  f_name: values.firstName,
                  l_name: values.lastName,
                  mobile_no: values.contactNumber,
                  email_id: values.email,
                  password: values.password,
                };
                const loginData = {
                  email_id: values.email,
                  password: values.password,
                };
                mutation.mutate(finalData);
                setLoginData(loginData);

                //  navigate("/");
              }}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-4">
                  {/* First Name & Last Name in a Single Line */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        First Name
                      </label>
                      <Field
                        name="firstName"
                        type="text"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
                      />
                      <ErrorMessage
                        name="firstName"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Last Name
                      </label>
                      <Field
                        name="lastName"
                        type="text"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
                      />
                      <ErrorMessage
                        name="lastName"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                  </div>

                  {/* Contact Number */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Contact Number
                    </label>
                    <Field
                      name="contactNumber"
                      type="tel"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
                    />
                    <ErrorMessage
                      name="contactNumber"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <Field
                      name="email"
                      type="email"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  {/* Password & Confirm Password in a Single Line */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Password
                      </label>
                      <Field
                        name="password"
                        type="password"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
                      />
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Confirm Password
                      </label>
                      <Field
                        name="confirmPassword"
                        type="password"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
                      />
                      <ErrorMessage
                        name="confirmPassword"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-300"
                  >
                    Sign Up
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

export default SignupPopup;
