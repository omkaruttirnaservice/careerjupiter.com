"use client";
import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { loginUser } from "../SignIn/Api";
import { login } from "../../store-redux/AuthSlice";
import ForgetPasswordPage from "./ForgetPasswordPage";
import { useNavigate } from "react-router-dom"; // Added this import

const validationSchema = Yup.object().shape({
  mobile_no: Yup.string()
    .matches(/^[6-9]\d{9}$/, "Enter valid 10-digit mobile number")
    .required("Mobile number is required"),
  password: Yup.string().required("Password is required"),
});

const SignInPopup = ({ setShowSignUp, onSuccessfulSignIn }) => {
  const authState = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); // Initialize navigate

  const dispatch = useDispatch();

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      console.log(data, "-data");
      const parsedData = data.data.data;
      console.log(parsedData, "-parsedData");
      const userId = parsedData.user_id || parsedData.user?._id;

      if (!userId) {
        toast.error("Invalid credentials");
        return;
      }

      Cookies.set("token", parsedData.token, { expires: 1 });
      Cookies.set("userId", userId, { expires: 1 });
      dispatch(login(userId));

      toast.success("Logged in successfully!");
      setIsOpen(false);
      onSuccessfulSignIn?.();
      navigate("/profile/personal-details");
      setTimeout(() => {
        window.location.reload();
      });
    },
    // onError: (error) => {

    //   toast.warning(data.message);
    //   console.log("toast warning",data.message);

    // // error.response?.data?.message || "User Creaditional is invalid "
    // },
  });

  useEffect(() => {
    if (authState.isLoggedIn) {
      setIsOpen(false);
    }
  }, [authState.isLoggedIn]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 bg-blur-sm">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 mx-4 sm:mx-6 md:mx-0">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Sign In</h2>
        <Formik
          initialValues={{
            mobile_no: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            loginMutation.mutate({
              mobile_no: values.mobile_no,
              password: values.password,
            });
          }}
        >
          <Form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Mobile Number
              </label>
              <Field
                name="mobile_no"
                type="tel"
                placeholder="Enter 10-digit mobile number"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
              />
              <ErrorMessage
                name="mobile_no"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <Field
                  name="password"
                  type={showPassword ? "text" : "password"}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 pr-10"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <div className="flex justify-between w-full">
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  setTimeout(() => navigate("/forget-password"));
                }}
                className="text-blue-600 hover:underline"
              >
                Forgot password?
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  setTimeout(() => navigate("/create-password"));
                }}
                className="text-blue-600 hover:underline"
              >
                Create new password
              </button>
            </div>

            <button
              type="submit"
              // disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-300"
            >
              {loginMutation.isLoading ? "Signing In..." : "Sign In"}
            </button>
          </Form>
        </Formik>
        <p className="mt-4 text-center text-gray-600">
          Don't have an account?{" "}
          <button
            onClick={() => {
              setIsOpen(false); // Close the popup first
              setTimeout(() => navigate("/"));
            }}
            className="text-blue-600 hover:underline"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignInPopup;
