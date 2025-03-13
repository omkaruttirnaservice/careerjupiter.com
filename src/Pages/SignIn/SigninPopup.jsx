// import { useEffect, useState } from "react";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import { useDispatch, useSelector } from "react-redux";
// import { toast } from "react-toastify";
// import { useMutation } from "@tanstack/react-query";
// import { loginUser, userSignUp } from "./Api";  // 🔴 API functions IMPORT kar
// import Cookies from "js-cookie";
// import { login } from "../../store-redux/AuthSlice"; // 🔴 Redux Auth Slice import

// const validationSchema = Yup.object().shape({
//   email: Yup.string().email("Invalid email").required("Email is required"),
//   password: Yup.string()
//     .min(8, "Password must be at least 8 characters")
//     .matches(/[A-Z]/, "Must contain at least one uppercase letter")
//     .matches(/[a-z]/, "Must contain at least one lowercase letter")
//     .matches(/[0-9]/, "Must contain at least one number")
//     .matches(/[@$!%*?&#]/, "Must contain at least one special character")
//     .required("Password is required"),
// });

// const SignupPopup = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isSignUpMode, setIsSignUpMode] = useState(false); // ✅ Toggle mode
//   const dispatch = useDispatch();
//   const authState = useSelector((state) => state.auth);

//   // ✅ LOGIN MUTATION
//   const loginMutation = useMutation({
//     mutationFn: loginUser,
//     onSuccess: (data) => {
//       const parsedData = data.data;
//       Cookies.set("token", parsedData.token, { expires: 1 });
//       Cookies.set("userId", parsedData.user_id, { expires: 1 });

//       dispatch(login(parsedData.user_id));
//       toast.success("Login Successful!");
//       setIsOpen(false);
//     },
//     onError: () => {
//       toast.error("Invalid credentials!");
//     },
//   });

//   // ✅ SIGNUP MUTATION
//   const signUpMutation = useMutation({
//     mutationFn: userSignUp,
//     onSuccess: (data, values) => {
//       toast.success("Signup Successful! Please Sign In.");
//       setIsSignUpMode(false); // ✅ Auto Switch to Sign In
//     },
//     onError: () => {
//       toast.error("Signup failed! Try again.");
//     },
//   });

//   useEffect(() => {
//     setIsOpen(!authState.isLoggedIn);
//   }, [authState.isLoggedIn]);

//   return (
//     <div>
//       {isOpen && (
//         <div className="fixed z-50 top-0 left-0 w-full h-full bg-black/50 backdrop-blur-sm flex justify-center items-center">
//           <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
//             {/* Close Button */}
//             <button
//               onClick={() => setIsOpen(false)}
//               className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
//             >
//               ✕
//             </button>

//             <h2 className="text-2xl font-bold mb-6 text-gray-800">
//               {isSignUpMode ? "Sign Up" : "Sign In"}
//             </h2>

//             {/* Form */}
//             <Formik
//               initialValues={{ email: "", password: "" }}
//               validationSchema={validationSchema}
//               onSubmit={(values, { setSubmitting }) => {
//                 if (isSignUpMode) {
//                   signUpMutation.mutate({ email_id: values.email, password: values.password });
//                 } else {
//                   loginMutation.mutate({ email_id: values.email, password: values.password });
//                 }
//                 setSubmitting(false);
//               }}
//             >
//               {({ isSubmitting }) => (
//                 <Form className="space-y-4">
//                   {/* Email Field */}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">Email</label>
//                     <Field
//                       name="email"
//                       type="email"
//                       className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
//                     />
//                     <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
//                   </div>

//                   {/* Password Field */}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">Password</label>
//                     <Field
//                       name="password"
//                       type="password"
//                       className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
//                     />
//                     <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
//                   </div>

//                   {/* Submit Button */}
//                   <button
//                     type="submit"
//                     disabled={isSubmitting}
//                     className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-300"
//                   >
//                     {isSignUpMode ? "Sign Up" : "Sign In"}
//                   </button>

//                   {/* Toggle Sign Up / Sign In */}
//                   <div className="text-center mt-4">
//                     <span className="text-gray-600">
//                       {isSignUpMode ? "Already registered?" : "Don't have an account?"}
//                     </span>
//                     <button
//                       type="button"
//                       onClick={() => setIsSignUpMode(!isSignUpMode)}
//                       className="text-blue-600 hover:underline ml-1"
//                     >
//                       {isSignUpMode ? "Sign In" : "Sign Up"}
//                     </button>
//                   </div>
//                 </Form>
//               )}
//             </Formik>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SignupPopup;
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "./Api";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { login } from "../../store-redux/AuthSlice";
import { toast } from "react-toastify";

// ✅ Validation Schema
const signinValidationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const SigninPopup = ({ setShowSignup, setShowPopup }) => {
  const dispatch = useDispatch();

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      console.log("✅ Login Success:", data);

      if (data?.data?.token) {
        Cookies.set("token", data.data.token, { expires: 1 });
        dispatch(login(data.data.user_id));
        toast.success("Login successful! 🎉");

        // ✅ Close the popup after login success
        setShowPopup(false);
      } else {
        toast.error("Login failed! Invalid response.");
      }
    },
    onError: (error) => {
      console.error("❌ Login Error:", error);
      toast.error(error?.response?.data?.message || "Invalid credentials! 🚫");
    },
  });

  return (
    <div className="fixed z-50 top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative">
        {/* Close Button */}
        <button
          onClick={() => setShowPopup(false)}
          className="absolute top-4 right-4 text-lg font-bold"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-6">Sign In</h2>

        {/* Formik Form */}
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={signinValidationSchema}
          onSubmit={(values, { setSubmitting }) => {
            console.log("📤 Submitting Form:", values);
            mutation.mutate(values, {
              onSettled: () => setSubmitting(false),
            });
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              {/* Email Field */}
              <div>
                <Field
                  name="email"
                  type="email"
                  placeholder="Email"
                  className="w-full p-2 border rounded"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Password Field */}
              <div>
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

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-2 rounded-md transition ${
                  isSubmitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                {isSubmitting ? "Signing In..." : "Sign In"}
              </button>
            </Form>
          )}
        </Formik>

        {/* Signup Redirect */}
        <p className="mt-4 text-center">
          Haven't registered?{" "}
          <button
            onClick={() => {
              setShowSignup(true);
              setShowPopup(false); // ✅ Close Sign-in popup
            }}
            className="text-blue-600 underline"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

export default SigninPopup;
