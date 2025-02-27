import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "./Api";
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../features/auth/authSlice";
import loginImage from "../../assets/images/images";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [popup, setPopup] = useState(null);

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      if (!data.data) {
        setPopup({ type: "error", message: "Invalid login response." });
        return;
      }

      let parsedData = typeof data.data === "string" ? JSON.parse(data.data) : data.data;
      const userId = parsedData._id || parsedData.user_id || parsedData.user?._id;

      if (!parsedData.token || !userId) {
        setPopup({ type: "error", message: "Token or User ID missing in response." });
        return;
      }

      const userData = {
        user: { mobile_no: formik.values.mobile_no, _id: userId },
        token: parsedData.token,
      };

      dispatch(login(userData));
      localStorage.setItem("auth", JSON.stringify(userData));

      setPopup({ type: "success", message: "Login Successful!" });
      setTimeout(() => {
        setPopup(null);
        navigate("/dashboard");
      }, 2000);
    },
    onError: (error) => {
      setPopup({ type: "error", message: error.message || "Invalid user." });
      setTimeout(() => setPopup(null), 2000);
    },
  });

  const formik = useFormik({
    initialValues: {
      mobile_no: "",
      password: "",
    },
    validationSchema: Yup.object({
      mobile_no: Yup.string()
        .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits")
        .required("Mobile number is required"),
      password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters long")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/,
          "Password must contain at least one uppercase, one lowercase, one number, and one special character"
        ),
    }),
    onSubmit: (values) => {
      loginMutation.mutate(values);
    },
  });

  return (

    
    <div
      className="relative bg-gradient-to-br  from-green-500 via-green-400 to-green-500 flex items-center justify-center min-h-screen bg-cover bg-center px-4"
      style={{
        
      }}
    
    >
      {/* <img src={loginImage} alt="" /> */}
      <div className="absolute inset-0 bg-opacity-50"></div>

      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative flex flex-col md:flex-row w-full max-w-4xl bg-white shadow-2xl rounded-2xl overflow-hidden"
      >
        {/* Left Side - Login Form */}
        <div className="w-full md:w-1/2 p-6 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-gray-900 text-center">
            Login 
          </h2>
          <p className="text-gray-500 text-center mt-2">
            
          </p>

          <form className="mt-6 space-y-4" onSubmit={formik.handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mobile Number
              </label>
              <input
                name="mobile_no"
                type="number"
                value={formik.values.mobile_no}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full px-2 py-2 rounded-lg border ${
                  formik.touched.mobile_no && formik.errors.mobile_no
                    ? "border-red-500"
                    : "border-green-500"
                } focus:outline-none focus:ring-2 focus:ring-black-500`}
              />
              <div className="h-5 text-red-500 text-sm mt-1">
                {formik.touched.mobile_no && formik.errors.mobile_no}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                name="password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full px-2 py-2 rounded-lg border ${
                  formik.touched.password && formik.errors.password
                    ? "border-red-500"
                    : "border-green-600"
                } focus:outline-none focus:ring-2 focus:ring-black-500`}
              />
              <div className="h-5 text-red-500 text-sm mt-1">
                {formik.touched.password && formik.errors.password}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className=" cursor-pointer w-full py-3 rounded-full text-white bg-gradient-to-br from-orange-500 via-orange-500 to-orange-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 disabled:bg-gray-400 disabled:cursor-not-allowed"
                disabled={loginMutation.isPending}
              >
                {loginMutation.isPending ? "Logging in..." : "Log in"}
              </button>
            </div>
          </form>

          {/* OR Separator */}
          <div className="flex items-center my-4">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-4 text-gray-500">or</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-gray-600 mt-2">
            Don't have an account?{" "}
            <span
              onClick={() => navigate("../sign")}
              className="text-yellow-500 font-semibold cursor-pointer hover:underline"
            >
              Sign Up
            </span>
          </p>
        </div>

        {/* Right Side - Image */}
        <div className="block md:w-1/2">
          <img
            src={loginImage}
            alt="Login"
            className="w-full h-48 md:h-full object-cover"
          />
        </div>
      </motion.div>

      {popup && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className={`fixed top-5 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg text-white text-center ${
            popup.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {popup.message}
        </motion.div>
      )}
    </div>
  );
};

export default LoginPage;
