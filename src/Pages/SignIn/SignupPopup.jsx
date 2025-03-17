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
      toast.success("Signup successful!");
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
      toast.success("Login successful!");
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
                    } text-white py-2 px-4 rounded-md hover:opacity-90 transition-opacity`}
                  >
                    {showLogin ? "Sign In" : "Sign Up"}
                  </button>

                  <p className="text-center text-sm text-gray-600">
                    {showLogin ? "New User? " : "Already have an account? "}
                    <button
                      type="button"
                      onClick={() => setShowLogin(!showLogin)}
                      className="text-blue-600 hover:underline font-medium"
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

// import { useEffect, useState } from "react";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import { useDispatch, useSelector } from "react-redux";
// import { toast } from "react-toastify";
// import { userSignUp } from "./Api";
// import { useMutation } from "@tanstack/react-query";
// import { loginUser } from "../Login/Api";
// import Cookies from "js-cookie";
// import { login } from "../../store-redux/AuthSlice";

// const validationSchema = Yup.object().shape({
//   firstName: Yup.string()
//     .min(2, "Too Short!")
//     .max(50, "Too Long!")
//     .required("First Name is required"),
//   lastName: Yup.string()
//     .min(2, "Too Short!")
//     .max(50, "Too Long!")
//     .required("Last Name is required"),
//   contactNumber: Yup.string()
//     .matches(/^[0-9]{10}$/, "Contact number must be 10 digits")
//     .required("Contact number is required"),
//   email: Yup.string().email("Invalid email").required("Email is required"),
//   password: Yup.string()
//     .min(8, "Password must be at least 8 characters")
//     .matches(/[A-Z]/, "Must contain at least one uppercase letter")
//     .matches(/[a-z]/, "Must contain at least one lowercase letter")
//     .matches(/[0-9]/, "Must contain at least one number")
//     .matches(/[@$!%*?&#]/, "Must contain at least one special character")
//     .required("Password is required"),
//   confirmPassword: Yup.string()
//     .oneOf([Yup.ref("password"), null], "Passwords must match")
//     .required("Confirm Password is required"),
// });
// const SignupPopup = () => {
//   const [isOpen, setIsOpen] = useState(true);
//   const [loginData, setLoginData] = useState({
//     email_id: null,
//     password: null,
//   });
//   const dispatch = useDispatch();
//   const authState = useSelector((state) => state.auth);

//   const [showLogin, setShowLogin] = useState(true);

//   const handleShowLogin = () => {
//     setShowLogin(!showLogin);
//   };

//   const mutation = useMutation({
//     mutationFn: userSignUp,
//     onSuccess: (data) => {
//       toast.success("Form submitted successfully!");

//       // loginMutation.mutate(loginData);
//     },
//     onError: (error) => {
//       const errorData = error?.response?.data;
//       console.error("Error details:", errorData);
//     },
//   });

//   // login api call

//   const loginMutation = useMutation({
//     mutationFn: loginUser,
//     onSuccess: (data) => {
//       let parsedData = typeof data.data === "string" ? data.data : data.data;
//       const userId =
//         parsedData._id || parsedData.user_id || parsedData.user?._id;
//       Cookies.set("token", parsedData.token, { expires: 1 });
//       Cookies.set("userId", parsedData.user_id, { expires: 1 });
//       dispatch(login(parsedData.user_id));
//     },
//   });

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsOpen(!authState.isLoggedIn);
//       // console.log('log....', authState.isLoggedIn);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [authState.isLoggedIn]);

//   useEffect(() => {
//     setIsOpen(!authState.isLoggedIn);
//   }, [authState.isLoggedIn]);

//   return (
//     <div>
//       {isOpen && (
//         <div className="fixed z-50 top-0 left-0 w-full h-full bg-black/50 backdrop-blur-sm flex justify-center items-center">
//           <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
//             <button
//               onClick={() => setIsOpen(false)}
//               className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
//             >
//               ✕
//             </button>
//             <h2 className="text-2xl font-bold mb-6 text-gray-800">
//               Get started
//             </h2>
//             <Formik
//               initialValues={{
//                 firstName: "",
//                 lastName: "",
//                 contactNumber: "",
//                 email: "",
//                 password: "",
//                 confirmPassword: "",
//               }}
//               validationSchema={!showLogin ? validationSchema : null} // Apply validation only for signup
//               onSubmit={(values, { setSubmitting }) => {
//                 if (showLogin) {
//                   // Login Form Submission
//                   loginMutation.mutate({
//                     email_id: values.email,
//                     password: values.password,
//                   });
//                 } else {
//                   // Sign Up Form Submission
//                   const finalData = {
//                     f_name: values.firstName,
//                     l_name: values.lastName,
//                     mobile_no: values.contactNumber,
//                     email_id: values.email,
//                     password: values.password,
//                   };
//                   mutation.mutate(finalData);
//                 }
//               }}
//             >
//               {({ isSubmitting }) => (
//                 <Form className="space-y-4">
//                   {showLogin ? (
//                     <>
//                       <div>
//                         <Field
//                           name="email"
//                           type="email"
//                           placeholder="Email"
//                           className="w-full p-2 border rounded"
//                         />
//                         <ErrorMessage
//                           name="email"
//                           component="div"
//                           className="text-red-500 text-sm mt-1"
//                         />
//                       </div>
//                       <div>
//                         <Field
//                           name="password"
//                           type="password"
//                           placeholder="Password"
//                           className="w-full p-2 border rounded"
//                         />
//                         <ErrorMessage
//                           name="password"
//                           component="div"
//                           className="text-red-500 text-sm mt-1"
//                         />
//                       </div>
//                       <button
//                         type="submit"
//                         className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-300"
//                       >
//                         Login
//                       </button>
//                     </>
//                   ) : (
//                     <>
//                       <div className="grid grid-cols-2 gap-4">
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700">
//                             First Name
//                           </label>
//                           <Field
//                             name="firstName"
//                             type="text"
//                             placeholder="First Name"
//                             className="mt-1 block w-full rounded-md border p-2"
//                           />
//                           <ErrorMessage
//                             name="firstName"
//                             component="div"
//                             className="text-red-500 text-sm mt-1"
//                           />
//                         </div>
//                         <div>
//                           <label className="block text-sm font-medium  text-gray-700">
//                             Last Name
//                           </label>
//                           <Field
//                             name="lastName"
//                             type="text"
//                             placeholder="Last Name"
//                             className="mt-1 block w-full rounded-md border p-2"
//                           />
//                           <ErrorMessage
//                             name="lastName"
//                             component="div"
//                             className="text-red-500 text-sm mt-1"
//                           />
//                         </div>
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700">
//                           Contact Number
//                         </label>
//                         <Field
//                           name="contactNumber"
//                           type="tel"
//                           placeholder="Contact Number"
//                           className="mt-1 block w-full rounded-md border p-2"
//                         />
//                         <ErrorMessage
//                           name="contactNumber"
//                           component="div"
//                           className="text-red-500 text-sm mt-1"
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700">
//                           Email
//                         </label>
//                         <Field
//                           name="email"
//                           type="email"
//                           placeholder="Email"
//                           className="mt-1 block w-full rounded-md border p-2"
//                         />
//                         <ErrorMessage
//                           name="email"
//                           component="div"
//                           className="text-red-500 text-sm mt-1"
//                         />
//                       </div>
//                       <div className="grid grid-cols-2 gap-4">
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700">
//                             Password
//                           </label>
//                           <Field
//                             name="password"
//                             type="password"
//                             placeholder="Password"
//                             className="mt-1 block w-full rounded-md border p-2"
//                           />
//                           <ErrorMessage
//                             name="password"
//                             component="div"
//                             className="text-red-500 text-sm mt-1"
//                           />
//                         </div>
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700">
//                             Confirm Password
//                           </label>
//                           <Field
//                             name="confirmPassword"
//                             type="password"
//                             placeholder="Confirm Password"
//                             className="mt-1 block w-full rounded-md border p-2"
//                           />
//                           <ErrorMessage
//                             name="confirmPassword"
//                             component="div"
//                             className="text-red-500 text-sm mt-1"
//                           />
//                         </div>
//                       </div>
//                       <button
//                         type="submit"
//                         disabled={isSubmitting}
//                         className="w-full block bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-300"
//                       >
//                         Sign Up
//                       </button>
//                     </>
//                   )}

//                   <p>
//                     {showLogin
//                       ? "You Haven't registered? "
//                       : "Already registered? "}
//                     <button
//                       type="button"
//                       onClick={handleShowLogin}
//                       className="text-blue-500 underline"
//                     >
//                       {showLogin ? "Sign Up" : "Login"}
//                     </button>
//                   </p>
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

// import { useEffect, useState } from "react";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import { useDispatch, useSelector } from "react-redux";
// import { toast } from "react-toastify";
// import { userSignUp } from "./Api";
// import { useMutation } from "@tanstack/react-query";
// import { loginUser } from "../Login/Api";
// import Cookies from "js-cookie";
// import { login } from "../../store-redux/AuthSlice";

// const validationSchema = Yup.object().shape({
//   firstName: Yup.string()
//     .min(2, "Too Short!")
//     .max(50, "Too Long!")
//     .required("First Name is required"),
//   lastName: Yup.string()
//     .min(2, "Too Short!")
//     .max(50, "Too Long!")
//     .required("Last Name is required"),
//   contactNumber: Yup.string()
//     .matches(/^[0-9]{10}$/, "Contact number must be 10 digits")
//     .required("Contact number is required"),
//   email: Yup.string().email("Invalid email").required("Email is required"),
//   password: Yup.string()
//     .min(8, "Password must be at least 8 characters")
//     .matches(/[A-Z]/, "Must contain at least one uppercase letter")
//     .matches(/[a-z]/, "Must contain at least one lowercase letter")
//     .matches(/[0-9]/, "Must contain at least one number")
//     .matches(/[@$!%*?&#]/, "Must contain at least one special character")
//     .required("Password is required"),
//   confirmPassword: Yup.string()
//     .oneOf([Yup.ref("password"), null], "Passwords must match")
//     .required("Confirm Password is required"),
// });

// const SignupPopup = () => {
//   const [isOpen, setIsOpen] = useState(true);
//   const [showLogin, setShowLogin] = useState(true);
//   const dispatch = useDispatch();
//   const authState = useSelector((state) => state.auth);

//   const handleShowLogin = () => {
//     setShowLogin(!showLogin);
//   };

//   const mutation = useMutation({
//     mutationFn: userSignUp,
//     onSuccess: (data) => {
//       toast.success("Signup successful! Logging in...");
//       loginMutation.mutate({
//         email_id: data.email_id,
//         password: data.password,
//       });
//     },
//     onError: (error) => {
//       const errorData = error?.response?.data;
//       console.error("Signup Error:", errorData);
//       toast.error("User already exists! Please sign in.");
//       setShowLogin(true);
//     },
//   });

//   const loginMutation = useMutation({
//     mutationFn: loginUser,
//     onSuccess: (data) => {
//       let parsedData =
//         typeof data.data === "string" ? JSON.parse(data.data) : data.data;
//       Cookies.set("token", parsedData.token, { expires: 1 });
//       Cookies.set("userId", parsedData.user_id, { expires: 1 });
//       dispatch(login(parsedData.user_id));
//       toast.success("Login Successful!");
//       setIsOpen(false);
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
//             <button
//               onClick={() => setIsOpen(false)}
//               className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
//             >
//               ✕
//             </button>
//             <h2 className="text-2xl font-bold mb-6 text-gray-800">
//               {showLogin ? "Sign In" : "Sign Up"}
//             </h2>
//             <Formik
//               initialValues={{
//                 firstName: "",
//                 lastName: "",
//                 contactNumber: "",
//                 email: "",
//                 password: "",
//                 confirmPassword: "",
//               }}
//               validationSchema={!showLogin ? validationSchema : null}
//               onSubmit={(values, { setSubmitting }) => {
//                 if (
//                   window.confirm(
//                     `Do you want to proceed with ${showLogin ? "Sign In" : "Sign Up"}?`
//                   )
//                 ) {
//                   if (showLogin) {
//                     loginMutation.mutate({
//                       email_id: values.email,
//                       password: values.password,
//                     });
//                   } else {
//                     const finalData = {
//                       f_name: values.firstName,
//                       l_name: values.lastName,
//                       mobile_no: values.contactNumber,
//                       email_id: values.email,
//                       password: values.password,
//                     };
//                     mutation.mutate(finalData);
//                   }
//                 } else {
//                   setSubmitting(false);
//                 }
//               }}
//             >
//               {({ isSubmitting }) => (
//                 <Form className="space-y-4">
//                   {showLogin ? (
//                     <>
//                       <div>
//                         <Field
//                           name="email"
//                           type="email"
//                           placeholder="Email"
//                           className="w-full p-2 border rounded"
//                         />
//                         <ErrorMessage
//                           name="email"
//                           component="div"
//                           className="text-red-500 text-sm mt-1"
//                         />
//                       </div>
//                       <div>
//                         <Field
//                           name="password"
//                           type="password"
//                           placeholder="Password"
//                           className="w-full p-2 border rounded"
//                         />
//                         <ErrorMessage
//                           name="password"
//                           component="div"
//                           className="text-red-500 text-sm mt-1"
//                         />
//                       </div>
//                       <button
//                         type="submit"
//                         className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-300"
//                       >
//                         Sign In
//                       </button>
//                     </>
//                   ) : (
//                     <>
//                       <div className="grid grid-cols-2 gap-4">
//                         <Field
//                           name="firstName"
//                           type="text"
//                           placeholder="First Name"
//                           className="w-full p-2 border rounded"
//                         />
//                         <Field
//                           name="lastName"
//                           type="text"
//                           placeholder="Last Name"
//                           className="w-full p-2 border rounded"
//                         />
//                       </div>
//                       <Field
//                         name="contactNumber"
//                         type="tel"
//                         placeholder="Contact Number"
//                         className="w-full p-2 border rounded"
//                       />
//                       <Field
//                         name="email"
//                         type="email"
//                         placeholder="Email"
//                         className="w-full p-2 border rounded"
//                       />
//                       <Field
//                         name="password"
//                         type="password"
//                         placeholder="Password"
//                         className="w-full p-2 border rounded"
//                       />
//                       <Field
//                         name="confirmPassword"
//                         type="password"
//                         placeholder="Confirm Password"
//                         className="w-full p-2 border rounded"
//                       />
//                       <button
//                         type="submit"
//                         disabled={isSubmitting}
//                         className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-300"
//                       >
//                         Sign Up
//                       </button>
//                     </>
//                   )}
//                   <p className="text-center">
//                     {showLogin
//                       ? "Don't have an account?"
//                       : "Already have an account?"}{" "}
//                     <button
//                       type="button"
//                       onClick={handleShowLogin}
//                       className="text-blue-500 underline"
//                     >
//                       {showLogin ? "Sign Up" : "Sign In"}
//                     </button>
//                   </p>
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

// import { useState, useEffect } from "react";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import { useMutation } from "@tanstack/react-query";
// import { toast } from "react-toastify";
// import { userSignUp } from "./Api";
// import SigninPopup from "./SigninPopup";
// import Cookies from "js-cookie";

// // **Validation Schema**
// const signupValidationSchema = Yup.object().shape({
//   firstName: Yup.string()
//     .min(2, "Too Short!")
//     .max(50, "Too Long!")
//     .required("First Name is required"),
//   lastName: Yup.string()
//     .min(2, "Too Short!")
//     .max(50, "Too Long!")
//     .required("Last Name is required"),
//   contactNumber: Yup.string()
//     .matches(/^[0-9]{10}$/, "Contact number must be 10 digits")
//     .required("Contact number is required"),
//   email: Yup.string().email("Invalid email").required("Email is required"),
//   password: Yup.string()
//     .min(8, "Password must be at least 8 characters")
//     .matches(/[A-Z]/, "Must contain at least one uppercase letter")
//     .matches(/[a-z]/, "Must contain at least one lowercase letter")
//     .matches(/[0-9]/, "Must contain at least one number")
//     .matches(/[@$!%*?&#]/, "Must contain at least one special character")
//     .required("Password is required"),
//   confirmPassword: Yup.string()
//     .oneOf([Yup.ref("password"), null], "Passwords must match")
//     .required("Confirm Password is required"),
// });

// const SignupPopup = () => {
//   const [showSignup, setShowSignup] = useState(true);
//   const [signupCompleted, setSignupCompleted] = useState(false);

//   // **Check if user is already signed up (token exists)**
//   useEffect(() => {
//     const token = Cookies.get("token");
//     if (token) {
//       setSignupCompleted(true);
//     }
//   }, []);

//   const mutation = useMutation({
//     mutationFn: userSignUp,
//     onSuccess: (data) => {
//       toast.success("Signup successful! Please Sign in.");
//       Cookies.set("token", data.data.token, { expires: 1 }); // ✅ Set Token
//       setSignupCompleted(true);
//       setShowSignup(false);
//     },
//     onError: (error) => {
//       console.error("Signup Error:", error?.response?.data);
//     },
//   });

//   return (
//     <div>
//       {!signupCompleted && showSignup ? (
//         <div className="fixed z-50 top-0 left-0 w-full h-full bg-black/50 backdrop-blur-sm flex justify-center items-center">
//           <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
//             <button
//               onClick={() => setShowSignup(false)}
//               className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
//             >
//               ✕
//             </button>

//             <h2 className="text-2xl font-bold mb-6 text-gray-800">Sign Up</h2>

//             <Formik
//               initialValues={{
//                 firstName: "",
//                 lastName: "",
//                 contactNumber: "",
//                 email: "",
//                 password: "",
//                 confirmPassword: "",
//               }}
//               validationSchema={signupValidationSchema}
//               onSubmit={(values) => {
//                 const finalData = {
//                   f_name: values.firstName,
//                   l_name: values.lastName,
//                   mobile_no: values.contactNumber,
//                   email_id: values.email,
//                   password: values.password,
//                 };
//                 mutation.mutate(finalData);
//               }}
//             >
//               {({ isSubmitting }) => (
//                 <Form className="space-y-4">
//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700">
//                         First Name
//                       </label>
//                       <Field
//                         name="firstName"
//                         type="text"
//                         className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
//                       />
//                       <ErrorMessage
//                         name="firstName"
//                         component="div"
//                         className="text-red-500 text-sm mt-1"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700">
//                         Last Name
//                       </label>
//                       <Field
//                         name="lastName"
//                         type="text"
//                         className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
//                       />
//                       <ErrorMessage
//                         name="lastName"
//                         component="div"
//                         className="text-red-500 text-sm mt-1"
//                       />
//                     </div>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">
//                       Contact Number
//                     </label>
//                     <Field
//                       name="contactNumber"
//                       type="tel"
//                       className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
//                     />
//                     <ErrorMessage
//                       name="contactNumber"
//                       component="div"
//                       className="text-red-500 text-sm mt-1"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">
//                       Email
//                     </label>
//                     <Field
//                       name="email"
//                       type="email"
//                       className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
//                     />
//                     <ErrorMessage
//                       name="email"
//                       component="div"
//                       className="text-red-500 text-sm mt-1"
//                     />
//                   </div>

//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700">
//                         Password
//                       </label>
//                       <Field
//                         name="password"
//                         type="password"
//                         className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
//                       />
//                       <ErrorMessage
//                         name="password"
//                         component="div"
//                         className="text-red-500 text-sm mt-1"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700">
//                         Confirm Password
//                       </label>
//                       <Field
//                         name="confirmPassword"
//                         type="password"
//                         className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2"
//                       />
//                       <ErrorMessage
//                         name="confirmPassword"
//                         component="div"
//                         className="text-red-500 text-sm mt-1"
//                       />
//                     </div>
//                   </div>

//                   <button
//                     type="submit"
//                     disabled={isSubmitting}
//                     className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
//                   >
//                     Sign Up
//                   </button>
//                 </Form>
//               )}
//             </Formik>

//             <p className="mt-4 text-center text-sm">
//               Already have an account?{" "}
//               <button
//                 onClick={() => setShowSignup(false)}
//                 className="text-blue-600 underline"
//               >
//                 Sign In
//               </button>
//             </p>
//           </div>
//         </div>
//       ) : null}
//     </div>
//   );
// };

// export default SignupPopup;

// import { useEffect, useState } from "react";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import { useDispatch, useSelector } from "react-redux";
// import { toast } from "react-toastify";
// import { userSignUp } from "./Api";
// import { useMutation } from "@tanstack/react-query";
// import { loginUser } from "../Login/Api";
// import Cookies from "js-cookie";
// import { login } from "../../store-redux/AuthSlice";

// const educationOptions = ["Diploma", "Engineering", "HSC", "SSC", "ITI"];

// const validationSchema = Yup.object().shape({
//   firstName: Yup.string()
//     .min(2, "Too Short!")
//     .max(50, "Too Long!")
//     .required("First Name is required"),
//   lastName: Yup.string()
//     .min(2, "Too Short!")
//     .max(50, "Too Long!")
//     .required("Last Name is required"),
//   contactNumber: Yup.string()
//     .matches(/^[0-9]{10}$/, "Contact number must be 10 digits")
//     .required("Contact number is required"),
//   current_education: Yup.string().required("Education is required"),

//   email: Yup.string().email("Invalid email").required("Email is required"),
//   password: Yup.string()
//     .min(8, "Password must be at least 8 characters")
//     .matches(/[A-Z]/, "Must contain at least one uppercase letter")
//     .matches(/[a-z]/, "Must contain at least one lowercase letter")
//     .matches(/[0-9]/, "Must contain at least one number")
//     .matches(/[@$!%*?&#]/, "Must contain at least one special character")
//     .required("Password is required"),
//   confirmPassword: Yup.string()
//     .oneOf([Yup.ref("password"), null], "Passwords must match")
//     .required("Confirm Password is required"),
// });

// const SignupPopup = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [loginData, setLoginData] = useState({
//     email_id: null,
//     password: null,
//   });
//   const dispatch = useDispatch();
//   const authState = useSelector((state) => state.auth);

//   const mutation = useMutation({
//     mutationFn: userSignUp,
//     onSuccess: (data) => {
//       toast.success("Form submitted successfully!");
//       loginMutation.mutate(loginData);
//     },
//     onError: (error) => {
//       const errorData = error?.response?.data;
//       console.error("Error details:", errorData);
//     },
//   });

//   const loginMutation = useMutation({
//     mutationFn: loginUser,
//     onSuccess: (data) => {
//       let parsedData = typeof data.data === "string" ? data.data : data.data;
//       const userId =
//         parsedData._id || parsedData.user_id || parsedData.user?._id;

//       Cookies.set("token", parsedData.token, { expires: 1 });
//       Cookies.set("userId", parsedData.user_id, { expires: 1 });

//       dispatch(login(parsedData.user_id));
//     },
//   });

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsOpen(!authState.isLoggedIn);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [authState.isLoggedIn]);

//   useEffect(() => {
//     setIsOpen(!authState.isLoggedIn);
//   }, [authState.isLoggedIn]);

//   return (
//     <div>
//       {isOpen && (
//         <div className="fixed z-50 top-0 left-0 w-full h-full bg-black/50 backdrop-blur-sm flex justify-center items-center">
//           <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
//             <button
//               onClick={() => setIsOpen(false)}
//               className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
//             >
//               ✕
//             </button>

//             <h2 className="text-2xl font-bold mb-6 text-gray-800">Sign Up</h2>

//             <Formik
//               initialValues={{
//                 firstName: "",
//                 lastName: "",
//                 contactNumber: "",
//                 current_education: "",
//                 email: "",
//                 password: "",
//                 confirmPassword: "",
//               }}
//               validationSchema={validationSchema}
//               onSubmit={(values, { setSubmitting }) => {
//                 const finalData = {
//                   f_name: values.firstName,
//                   l_name: values.lastName,
//                   mobile_no: values.contactNumber,
//                   current_education: values.current_education,
//                   email_id: values.email,
//                   password: values.password,
//                 };

//                 const loginData = {
//                   email_id: values.email,
//                   password: values.password,
//                 };
//                 mutation.mutate(finalData);
//                 setLoginData(loginData);

//                 //  navigate("/");
//               }}
//             >
//               {({ isSubmitting }) => (
//                 <Form className="space-y-4">
//                   {/* First Name & Last Name in a Single Line */}
//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700">
//                         First Name
//                       </label>
//                       <Field
//                         name="firstName"
//                         type="text"
//                         className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
//                       />
//                       <ErrorMessage
//                         name="firstName"
//                         component="div"
//                         className="text-red-500 text-sm mt-1"
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700">
//                         Last Name
//                       </label>
//                       <Field
//                         name="lastName"
//                         type="text"
//                         className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
//                       />
//                       <ErrorMessage
//                         name="lastName"
//                         component="div"
//                         className="text-red-500 text-sm mt-1"
//                       />
//                     </div>
//                   </div>

//                   {/* Contact Number */}
//                   <div className="flex flex-col md:flex-row gap-4">
//                     <div className="w-full md:w-1/2">
//                       <label className="block text-sm font-medium text-gray-700">
//                         Contact Number
//                       </label>
//                       <Field
//                         name="contactNumber"
//                         type="tel"
//                         className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
//                       />
//                       <ErrorMessage
//                         name="contactNumber"
//                         component="div"
//                         className="text-red-500 text-sm mt-1"
//                       />
//                     </div>
//                     <div className="w-full md:w-1/2">
//                       <label className="block text-sm font-medium text-gray-700">
//                         Education
//                       </label>
//                       <Field
//                         as="select"
//                         name="current_education"
//                         className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
//                       >
//                         <option value="">Select Education</option>
//                         {educationOptions.map((option) => (
//                           <option key={option} value={option}>
//                             {option}
//                           </option>
//                         ))}
//                       </Field>
//                       <ErrorMessage
//                         name="current_education"
//                         component="div"
//                         className="text-red-500 text-sm mt-1"
//                       />
//                     </div>
//                   </div>

//                   {/* Email */}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700">
//                       Email
//                     </label>
//                     <Field
//                       name="email"
//                       type="email"
//                       className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
//                     />
//                     <ErrorMessage
//                       name="email"
//                       component="div"
//                       className="text-red-500 text-sm mt-1"
//                     />
//                   </div>

//                   {/* Password & Confirm Password in a Single Line */}
//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700">
//                         Password
//                       </label>
//                       <Field
//                         name="password"
//                         type="password"
//                         className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
//                       />
//                       <ErrorMessage
//                         name="password"
//                         component="div"
//                         className="text-red-500 text-sm mt-1"
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700">
//                         Confirm Password
//                       </label>
//                       <Field
//                         name="confirmPassword"
//                         type="password"
//                         className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
//                       />
//                       <ErrorMessage
//                         name="confirmPassword"
//                         component="div"
//                         className="text-red-500 text-sm mt-1"
//                       />
//                     </div>
//                   </div>

//                   {/* Submit Button */}
//                   <button
//                     type="submit"
//                     disabled={isSubmitting}
//                     className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-300"
//                   >
//                     Sign Up
//                   </button>
//                   <div className="text-center mt-4">
//                     <span className="text-gray-600">Already registered? </span>
//                     <a
//                       href="/SigninPopup"
//                       className="text-blue-600 hover:underline"
//                     >
//                       Sign In
//                     </a>
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

// import { useState, useEffect } from "react";
// import SignUpForm from "./SignupForm";
// import SignInForm from "./SignInForm";
// import Cookies from "js-cookie";

// const SignupPopup = () => {
//   const [isOpen, setIsOpen] = useState(true);
//   const [isSignIn, setIsSignIn] = useState(false);

//   useEffect(() => {
//     if (Cookies.get("token")) {
//       setIsOpen(false);
//     }
//   }, []);

//   return (
//     <>
//       {isOpen && (
//         <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex justify-center items-center p-4">
//           <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full transform scale-100 transition-transform duration-300">
//             <button
//               onClick={() => setIsOpen(false)}
//               className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-2xl"
//             >
//               ✕
//             </button>

//             <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
//               {isSignIn ? "Welcome Back!" : "Create Account"}
//             </h2>

//             {isSignIn ? (
//               <SignInForm setIsOpen={setIsOpen} />
//             ) : (
//               <SignUpForm setIsSignIn={setIsSignIn} />
//             )}

//             <p className="text-center text-gray-600 mt-4">
//               {isSignIn ? "New user?" : "Already have an account?"}{" "}
//               <button
//                 className="text-blue-600 font-semibold hover:underline"
//                 onClick={() => setIsSignIn(!isSignIn)}
//               >
//                 {isSignIn ? "Sign Up" : "Sign In"}
//               </button>
//             </p>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default SignupPopup;
