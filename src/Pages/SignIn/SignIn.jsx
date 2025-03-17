import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../Login/Api";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { login } from "../../store-redux/AuthSlice";
import { toast } from "react-toastify";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const SignIn = ({ setAlreadySignedUp }) => {
  const dispatch = useDispatch();

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      let parsedData = typeof data.data === "string" ? data.data : data.data;
      const userId =
        parsedData._id || parsedData.user_id || parsedData.user?._id;
      Cookies.set("token", parsedData.token, { expires: 1 });
      Cookies.set("userId", parsedData.user_id, { expires: 1 });
      dispatch(login(parsedData.user_id));
      toast.success("Login successful!");
    },
    onError: () => {
      toast.error("Invalid email or password");
    },
  });

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Sign In</h2>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          loginMutation.mutate(values);
          setSubmitting(false);
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

      {/* Switch to SignUp */}
      <p className="mt-4 text-center text-gray-600">
        Don't have an account?{" "}
        <button
          onClick={() => setAlreadySignedUp(false)}
          className="text-blue-600 hover:underline"
        >
          Sign Up
        </button>
      </p>
    </div>
  );
};

export default SignIn;
