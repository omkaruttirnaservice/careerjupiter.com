import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const SignInPage = () => {
  const [step, setStep] = useState(1);
  const [hasInteracted, setHasInteracted] = useState(false);

    const handleInputChange = (e) => {
      setHasInteracted(true); // Mark interaction
      formik.handleChange(e); // Update Formik value
    };

  const questions = [
    { key: "name", text: "What is your name?" },
    { key: "color", text: "What is your favorite color?" },
    { key: "age", text: "What is your age?" },
    { key: "food", text: "What is your favorite food?" },
    { key: "hobby", text: "What is your hobby?" },
  ];

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    color: Yup.string().required("Color is required"),
    age: Yup.number()
      .typeError("Age must be a number")
      .required("Age is required")
      .positive("Age must be positive")
      .integer("Age must be an integer"),
    food: Yup.string().required("Food is required"),
    hobby: Yup.string().required("Hobby is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      color: "",
      age: "",
      food: "",
      hobby: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Form submitted with values:", values);
      alert("Form submitted successfully!");
    },
  });

  const handleNext = () => {
    if (step < questions.length) {
      setStep(step + 1);
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const currentQuestionKey = questions[step - 1].key;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Step {step}</h1>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            {questions[step - 1].text}
          </label>
          <input
            type="text"
            name={currentQuestionKey}
            value={formik.values[currentQuestionKey]}
            onChange={handleInputChange}
            onBlur={formik.handleBlur}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
              formik.touched[currentQuestionKey] &&
              formik.errors[currentQuestionKey]
                ? "focus:ring-red-500 border-red-500 cursor-pointer"
                : "focus:ring-blue-500 cursor-pointer"
            }`}
            placeholder="Your answer"
          />
          {formik.touched[currentQuestionKey] &&
          formik.errors[currentQuestionKey] ? (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors[currentQuestionKey]}
            </div>
          ) : null}
        </div>
        <div className="flex justify-between">
          {step > 1 && (
            <button
              type="button"
              onClick={handlePrevious}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
            >
              Previous
            </button>
          )}
          {step < questions.length ? (
            <button
              type="button"
              onClick={handleNext}
              disabled={!!formik.errors[currentQuestionKey] || !hasInteracted}
              className={`bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 ${
                formik.errors[currentQuestionKey] || !hasInteracted
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              onClick={formik.handleSubmit}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
