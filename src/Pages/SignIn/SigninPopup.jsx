import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../Login/Api";
import { login } from "../../store-redux/AuthSlice";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const SignInPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      let parsedData =
        typeof data.data === "string" ? JSON.parse(data.data) : data.data;
      Cookies.set("token", parsedData.token, { expires: 1 });
      Cookies.set("userId", parsedData.user_id, { expires: 1 });
      dispatch(login(parsedData.user_id));
      toast.success("Login successful!");
      setIsOpen(false);
    },
    onError: (error) => {
      toast.error("Invalid credentials. Please try again.");
      console.error("Login error:", error.response?.data || error.message);
    },
  });

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
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Sign In</h2>
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                loginMutation.mutate(values);
              }}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-4">
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
                  {/* Password */}
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
                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-300"
                  >
                    Sign In
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

export default SignInPopup;
