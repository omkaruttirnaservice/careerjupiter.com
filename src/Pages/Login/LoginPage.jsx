// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import { useMutation } from '@tanstack/react-query';
// import { loginUser } from './Api';
// import { motion } from 'framer-motion';
// import { useEffect, useLayoutEffect, useState } from 'react';
// import { Navigate, useLocation, useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import loginImage from '../../assets/images/images';
// import Cookie from 'js-cookie';
// import { login } from '../../store-redux/AuthSlice.js';
// const LoginPage = () => {
// 	const navigate = useNavigate();
// 	const dispatch = useDispatch();
// 	const [popup, setPopup] = useState(null);

// 	const authState = useSelector((state) => state.auth);
// 	useEffect(() => {
// 		const redirectPath =
// 			location.state && location.state.from ? location.state.from : '/';

// 		console.log(redirectPath, '====');

// 		if (authState.isLoggedIn) {
// 			navigate(redirectPath);
// 		}
// 	}, []);

// 	const loginMutation = useMutation({
// 		mutationFn: loginUser,
// 		onSuccess: (data) => {
// 			if (!data.data) {
// 				setPopup({ type: 'error', message: 'Invalid login response.' });
// 				return;
// 			}

// 			let parsedData = typeof data.data === 'string' ? data.data : data.data;
// 			console.log('parsedData', parsedData);

// 			const userId =
// 				parsedData._id || parsedData.user_id || parsedData.user?._id;

// 			if (!parsedData.token || !userId) {
// 				setPopup({
// 					type: 'error',
// 					message: 'Token or User ID missing in response.',
// 				});
// 				return;
// 			}

// 			Cookie.set('token', parsedData.token, { expires: 1 });
// 			Cookie.set('userId', parsedData.user_id, { expires: 1 });

// 			dispatch(login(parsedData.user_id));

// 			setPopup({ type: 'success', message: 'Login Successful!' });
// 			setTimeout(() => {
// 				setPopup(null);
// 				navigate('/');
// 			}, 2000);
// 		},
// 		onError: (error) => {
// 			setPopup({ type: 'error', message: error.message || 'Invalid user.' });
// 			setTimeout(() => setPopup(null), 2000);
// 		},
// 	});

// 	const formik = useFormik({
// 		initialValues: {
// 			email_id: '',
// 			password: '',
// 		},

// 		validationSchema: Yup.object({
// 			email_id: Yup.string()
// 				.email('Invalid email format') // 'email_id' नुसार email validation
// 				.required('Email is required'),
// 			password: Yup.string()
// 				.required('Password is required')
// 				.min(8, 'Password must be at least 8 characters long')
// 				.matches(
// 					/^(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/,
// 					'Password must contain at least one uppercase, one lowercase, and one special character'
// 				),
// 		}),

// 		onSubmit: (values) => {
// 			loginMutation.mutate(values); // email_id आता पुढे नेला जाईल
// 		},
// 	});

// 	return (
// 		<div
// 			className="relative bg-gradient-to-br  from-green-500 via-green-400 to-green-500 flex items-center justify-center min-h-screen bg-cover bg-center px-4"
// 			style={{}}
// 		>
// 			{/* <img src={loginImage} alt="" /> */}
// 			<div className="absolute inset-0 bg-opacity-50"></div>

// 			<motion.div
// 				initial={{ opacity: 0, y: -50 }}
// 				animate={{ opacity: 1, y: 0 }}
// 				transition={{ duration: 0.6 }}
// 				className="relative flex flex-col md:flex-row w-full max-w-4xl bg-white shadow-2xl rounded-2xl overflow-hidden"
// 			>
// 				{/* Left Side - Login Form */}
// 				<div className="w-full md:w-1/2 p-6 flex flex-col justify-center">
// 					<h2 className="text-3xl font-bold text-gray-900 text-center">
// 						Login
// 					</h2>
// 					<p className="text-gray-500 text-center mt-2"></p>

// 					<form className="mt-6 space-y-4" onSubmit={formik.handleSubmit}>
// 						{/* Email Field */}
// 						{/* Email Field */}
// 						<div>
// 							<label className="block text-sm font-medium text-gray-700 mb-2">
// 								Email
// 							</label>
// 							<input
// 								name="email_id" // email ऐवजी आता email_id
// 								type="email"
// 								value={formik.values.email_id}
// 								onChange={formik.handleChange}
// 								onBlur={formik.handleBlur}
// 								className={`w-full px-2 py-2 rounded-lg border ${
// 									formik.touched.email_id && formik.errors.email_id
// 										? 'border-red-500'
// 										: 'border-green-500'
// 								} focus:outline-none focus:ring-2 focus:ring-black-500`}
// 							/>
// 							<div className="h-5 text-red-500 text-sm mt-1">
// 								{formik.touched.email_id && formik.errors.email_id}
// 							</div>
// 						</div>

// 						{/* Password Field */}
// 						<div>
// 							<label className="block text-sm font-medium text-gray-700 mb-2">
// 								Password
// 							</label>
// 							<input
// 								name="password"
// 								type="password"
// 								value={formik.values.password}
// 								onChange={formik.handleChange}
// 								onBlur={formik.handleBlur}
// 								className={`w-full px-2 py-2 rounded-lg border ${
// 									formik.touched.password && formik.errors.password
// 										? 'border-red-500'
// 										: 'border-green-600'
// 								} focus:outline-none focus:ring-2 focus:ring-black-500`}
// 							/>
// 							<div className="h-5 text-red-500 text-sm mt-1">
// 								{formik.touched.password && formik.errors.password}
// 							</div>
// 						</div>

// 						<div>
// 							<button
// 								type="submit"
// 								className=" cursor-pointer w-full py-3 rounded-full text-white bg-gradient-to-br from-orange-500 via-orange-500 to-orange-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 disabled:bg-gray-400 disabled:cursor-not-allowed"
// 								disabled={loginMutation.isPending}
// 							>
// 								{loginMutation.isPending ? 'Logging in...' : 'Log in'}
// 							</button>
// 						</div>
// 					</form>

// 					{/* OR Separator */}
// 					<div className="flex items-center my-4">
// 						<div className="flex-1 border-t border-gray-300"></div>
// 						<span className="px-4 text-gray-500">or</span>
// 						<div className="flex-1 border-t border-gray-300"></div>
// 					</div>

// 					{/* Sign Up Link */}
// 					<p className="text-center text-gray-600 mt-2">
// 						Don't have an account?{' '}
// 						<span
// 							onClick={() => navigate('../sign')}
// 							className="text-yellow-500 font-semibold cursor-pointer hover:underline"
// 						>
// 							Sign Up
// 						</span>
// 					</p>
// 				</div>

// 				{/* Right Side - Image */}
// 				<div className="block md:w-1/2">
// 					<img
// 						src={loginImage}
// 						alt="Login"
// 						className="w-full h-48 md:h-full object-cover"
// 					/>
// 				</div>
// 			</motion.div>

// 			{popup && (
// 				<motion.div
// 					initial={{ opacity: 0, scale: 0.8 }}
// 					animate={{ opacity: 1, scale: 1 }}
// 					exit={{ opacity: 0, scale: 0.8 }}
// 					className={`fixed top-5 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg text-white text-center ${
// 						popup.type === 'success' ? 'bg-green-500' : 'bg-red-500'
// 					}`}
// 				>
// 					{popup.message}
// 				</motion.div>
// 			)}
// 		</div>
// 	);
// };

// export default LoginPage;

// import { useEffect, useState } from "react";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import { useDispatch } from "react-redux";
// import { toast } from "react-toastify";
// import { useMutation } from "@tanstack/react-query";
// import Cookies from "js-cookie";
// import { loginUser } from "../Login/Api";
// import { login } from "../../store-redux/AuthSlice";

// const validationSchema = Yup.object().shape({
//   mobile_no: Yup.string()
//     .matches(/^[6-9]\d{9}$/, "Enter valid 10-digit mobile number")
//     .required("Mobile number is required"),
//   password: Yup.string().required("Password is required"),
// });

// const SignInPopup = ({ setShowSignUp }) => {
//   const [isOpen, setIsOpen] = useState(true);
//   const [showPassword, setShowPassword] = useState(false);
//   const dispatch = useDispatch();

//   const loginMutation = useMutation({
//     mutationFn: loginUser,
//     onSuccess: (data) => {
//       const parsedData = data.data;
//       const userId = parsedData.user_id || parsedData.user?._id;

//       if (!userId) {
//         toast.error("Invalid credentials");
//         return;
//       }

//       Cookies.set("token", parsedData.token, { expires: 1 });
//       Cookies.set("userId", userId, { expires: 1 });
//       dispatch(login(userId));

//       toast.success("Logged in successfully!");
//       setIsOpen(false);
//       window.location.reload(); // Refresh to show authenticated content
//     },
//     onError: (error) => {
//       toast.error(error.response?.data?.message || "Invalid credentials");
//     },
//   });

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   return (
//     <>
//       {isOpen && (
//         <div className="fixed z-50 top-0 left-0 w-full h-full bg-black/50 backdrop-blur-sm flex justify-center items-center">
//           <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
//             <button
//               onClick={() => setIsOpen(false)}
//               className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
//             >
//               ✕
//             </button>
//             <h2 className="text-2xl font-bold mb-6 text-gray-800">Sign In</h2>
//             <Formik
//               initialValues={{
//                 mobile_no: "",
//                 password: "",
//               }}
//               validationSchema={validationSchema}
//               onSubmit={(values) => {
//                 loginMutation.mutate({
//                   mobile_no: values.mobile_no,
//                   password: values.password,
//                 });
//               }}
//             >
//               {({ isSubmitting }) => (
//                 <Form className="space-y-4">
//                   {/* Mobile Number */}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">
//                       Mobile Number
//                     </label>
//                     <Field
//                       name="mobile_no"
//                       type="tel"
//                       placeholder="Enter 10-digit mobile number"
//                       className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
//                     />
//                     <ErrorMessage
//                       name="mobile_no"
//                       component="div"
//                       className="text-red-500 text-sm mt-1"
//                     />
//                   </div>

//                   {/* Password with toggle */}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">
//                       Password
//                     </label>
//                     <div className="relative">
//                       <Field
//                         name="password"
//                         type={showPassword ? "text" : "password"}
//                         className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 pr-10"
//                       />
//                       <button
//                         type="button"
//                         onClick={togglePasswordVisibility}
//                         className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
//                       >
//                         {showPassword ? (
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             className="h-5 w-5"
//                             viewBox="0 0 20 20"
//                             fill="currentColor"
//                           >
//                             <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
//                             <path
//                               fillRule="evenodd"
//                               d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
//                               clipRule="evenodd"
//                             />
//                           </svg>
//                         ) : (
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             className="h-5 w-5"
//                             viewBox="0 0 20 20"
//                             fill="currentColor"
//                           >
//                             <path
//                               fillRule="evenodd"
//                               d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
//                               clipRule="evenodd"
//                             />
//                             <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
//                           </svg>
//                         )}
//                       </button>
//                     </div>
//                     <ErrorMessage
//                       name="password"
//                       component="div"
//                       className="text-red-500 text-sm mt-1"
//                     />
//                   </div>

//                   {/* Submit Button */}
//                   <button
//                     type="submit"
//                     disabled={isSubmitting}
//                     className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-300"
//                   >
//                     {loginMutation.isLoading ? "Signing In..." : "Sign In"}
//                   </button>
//                 </Form>
//               )}
//             </Formik>
//             {/* Sign Up Link */}
//             <p className="mt-4 text-center text-gray-600">
//               Don't have an account?{" "}
//               <button
//                 onClick={() => setShowSignUp(true)}
//                 className="text-blue-600 hover:underline"
//               >
//                 Sign Up
//               </button>
//             </p>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default SignInPopup;

import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { loginUser } from "../SignIn/Api";
import { login } from "../../store-redux/AuthSlice";

const validationSchema = Yup.object().shape({
  mobile_no: Yup.string()
    .matches(/^[6-9]\d{9}$/, "Enter valid 10-digit mobile number")
    .required("Mobile number is required"),
  password: Yup.string().required("Password is required"),
});

const SignInPopup = ({ setShowSignUp }) => {
  const authState = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(!authState.isLoggedIn); // Only open if not logged in
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      const parsedData = data.data;
      const userId = parsedData.user_id || parsedData.user?._id;

      if (!userId) {
        toast.error("Invalid credentials");
        return;
      }

      Cookies.set("token", parsedData.token, { expires: 1 });
      Cookies.set("userId", userId, { expires: 1 });
      dispatch(login(userId));

      toast.success("Logged in successfully!");
      setIsOpen(false); // Just close the popup without refresh
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Invalid credentials");
    },
  });

  // Close popup if user is already logged in
  useEffect(() => {
    if (authState.isLoggedIn) {
      setIsOpen(false);
    }
  }, [authState.isLoggedIn]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  if (!isOpen) return null; // Don't render anything if not open

  return (
    <div className="fixed z-50 top-0 left-0 w-full h-full bg-black/50 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
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
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              {/* Mobile Number */}
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

              {/* Password with toggle */}
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

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-300"
              >
                {loginMutation.isLoading ? "Signing In..." : "Sign In"}
              </button>
            </Form>
          )}
        </Formik>
        <p className="mt-4 text-center text-gray-600">
          Don't have an account?{" "}
          <button
            onClick={() => setShowSignUp(true)}
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