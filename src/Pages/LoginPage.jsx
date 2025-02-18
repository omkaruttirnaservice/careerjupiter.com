import { useFormik } from "formik";
import * as Yup from "yup";

const LoginPage = () => {
  const initialValues = {
    email: "",
    password: "",
  };

  const loginValidationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required")
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Email must be a valid email address (e.g., user@example.com)"
      )
      .test(
        "no-disposable-email",
        "Disposable email addresses are not allowed",
        (value) => {
          const disposableDomains = [
            "yopmail.com",
            "mailinator.com",
            "tempmail.com",
            "guerrillamail.com",
          ];
          const domain = value.split("@")[1];
          return !disposableDomains.includes(domain);
        }
      ),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters long")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
  });

  const { values, errors, touched, handleSubmit, handleChange, handleBlur } =
    useFormik({
      initialValues: initialValues,
      validationSchema: loginValidationSchema,
      onSubmit: (values, action) => {
        console.log("login user data :", values);
        alert("Login Successfully...");
        action.resetForm();
      },
    });
  return (
    <>
      <div className="flex items-center justify-center mt-10">
        <div className="flex-1 flex items-center flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                Login in to your account
              </h2>
            </div>

            <div className="mt-8">
              <div className="mt-6">
                <form
                  action="#"
                  method="POST"
                  className="space-y-6"
                  onSubmit={handleSubmit}
                >
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email address
                    </label>
                    <div className="mt-1">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                          touched.email && errors.email
                            ? "focus:ring-red-500 border-red-500 cursor-pointer"
                            : "focus:ring-blue-500 cursor-pointer"
                        }`}
                      />
                      {touched.email && errors.email ? (
                        <div className="text-red-500 text-sm mt-1">
                          {errors.email}
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Password
                    </label>
                    <div className="mt-1">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        autoComplete="current-password"
                        required
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                          touched.password && errors.password
                            ? "focus:ring-red-500 border-red-500 cursor-pointer"
                            : "focus:ring-blue-500 cursor-pointer"
                        }`}
                      />
                      {touched.password && errors.password ? (
                        <div className="text-red-500 text-sm mt-1">
                          {errors.password}
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm">
                      <a
                        href="#"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Forgot your password?
                      </a>
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Login
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
