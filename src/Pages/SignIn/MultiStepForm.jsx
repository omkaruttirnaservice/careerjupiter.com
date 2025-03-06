import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { userSignUp } from "./Api";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { cityData } from "../../Constant/constantData";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const educationOptions = ["SSC", "HSC", "ITI","Diploma", "Graduation", "Post Graduation", "MBA"];

const LocationMarker = ({ setLocation, location }) => {

  
  const map = useMapEvents({
    click(e) {
      setLocation({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
  });

  if (location.lat && location.lng) {
    return <Marker position={[location.lat, location.lng]} />;
  }
  return null;
};

const MultiStepForm = () => {
  let totalFormSteps = 15
  const [step, setStep] = useState(0);
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [districtOptions, setDistrictOptions] = useState([]);

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: userSignUp,
    onSuccess: (data) => {
      toast.success("Form submitted successfully!");
      navigate("/signin");
    },
    onError: (error) => {
      const status = error?.response?.status;
      const errorData = error?.response?.data;

      console.error("Error details:", errorData);

      if (status === 400 && errorData?.field) {
        // Handle specific field errors
        formik.setFieldError(errorData.field, errorData?.message || "Invalid input.");
      } else if (status === 409) {
        // Conflict error (like existing email or mobile)
        toast.error(errorData?.usrMsg || "This account already exists.");
      } else if (status === 500) {
        // Server error
        toast.error("Internal server error. Please try again later.");
      } else {
        // General error fallback
        toast.error(errorData?.usrMsg || "Something went wrong. Please check your details.");
      }
    },
  });


  const formik = useFormik({
    initialValues: {
      f_name: "",
      m_name: "",
      l_name: "",
      dob: "",
      age: "",
      mobile_no: "",
      email_id: "",
      password: "",
      confirm_password: "",
      location: "",
      address_line1: "",
      address_line2: "",
      pincode: "",
      state: "Maharashtra",
      district: "",
      education: "",
      latitude: "",
      longitude: "",
    },

    validationSchema: [
      Yup.object({ f_name: Yup.string().required("First Name is required") }),
      Yup.object({ m_name: Yup.string().required("Middle Name is required") }),
      Yup.object({ l_name: Yup.string().required("Last Name is required") }),
      Yup.object({ dob: Yup.date().required("Date of Birth is required") }),
      Yup.object({
        age: Yup.number()
          .required("Age is required")
          .min(10, "Must be 10 or older"),
      }),
      Yup.object({
        mobile_no: Yup.string()
          .matches(/^[0-9]{10}$/, "Must be a valid 10-digit number")
          .required("Mobile Number is required"),
      }),
      Yup.object({
        email_id: Yup.string()
          .email("Invalid email")
          .required("Email is required"),
      }),
      Yup.object({
        password: Yup.string()
          .min(8, "Password must be at least 8 characters")
          .matches(/[A-Z]/, "Must contain an uppercase letter")
          .matches(/[0-9]/, "Must contain a number")
          .required("Password is required"),
      }),
      Yup.object({
        confirm_password: Yup.string()
          .oneOf([Yup.ref("password"), null], "Passwords must match")
          .required("Confirm Password is required"),
      }),
      Yup.object({ location: Yup.string().required("Location is required") }),
      Yup.object({
        address_line1: Yup.string()
          .min(5, "Address Line 1 must be at least 5 characters")
          .required("Address is required"),
      }),
      Yup.object({
        address_line2: Yup.string().min(
          5,
          "Address Line 2 must be at least 5 characters"
        ),
      }),
      Yup.object({ pincode: Yup.string().required("Pincode is required") }),
      Yup.object({ state: Yup.string().required("State is required") }),
      Yup.object({ district: Yup.string().required("District is required") }),
      Yup.object({ education: Yup.string().required("Education is required") }),
    ][step],

    onSubmit: (values) => {
      if (step < steps.length - 1) {
        setStep(step + 1);
      } else {
        const finalData = {
          f_name: values.f_name,
          m_name: values.m_name,
          l_name: values.l_name,
          dob: values.dob,
          age: values.age,
          mobile_no: values.mobile_no,
          email_id: values.email_id,
          password: values.password,
          location: { lat: location.lat, lan: location.lng },
          address: {
            line1: values.address_line1,
            line2: values.address_line2,
            pincode: values.pincode,
            dist: values.district,
            state: values.state,
          },
          is_verified: false,
          info: { current_education: values.education },
        };
        mutation.mutate(finalData);
      }
    },
  });

  const steps = [
    { name: "f_name", label: "What is your First Name ?", type: "text" },
    { name: "m_name", label: "What is your Middle Name ?", type: "text" },
    { name: "l_name", label: "What is your Last Name ?", type: "text" },
    { name: "dob", label: "What is your Date of Birth ?", type: "date" },
    { name: "age", label: "What is your Age ?", type: "number" },
    { name: "mobile_no", label: "What is your Mobile Number ?", type: "text" },
    { name: "email_id", label: "What is your Email ?", type: "email" },
    { name: "password", label: "Enter your Password", type: "password" },
    {
      name: "confirm_password",
      label: "Confirm your Password",
      type: "password",
    },
    { name: "location", label: "What is your Location ?", type: "text" },
    { name: "address_line1", label: "Address Line 1", type: "text" },
    { name: "address_line2", label: "Address Line 2", type: "text" },
    { name: "pincode", label: "Pincode", type: "text" },
    {
      name: "state",
      label: "What is your State ?",
      type: "select",
      options: cityData.map((stateObj) => stateObj.state),
    },
    {
      name: "district",
      label: "What is your District ?",
      type: "select",
      options: districtOptions,
    },
    {
      name: "education",
      label: "Select your Education",
      type: "select",
      options: educationOptions,
    },
  ];

  // Update districts based on selected state
  useEffect(() => {
    const selectedStateObj = cityData.find(
      (stateObj) => stateObj.state === formik.values.state
    );
    if (selectedStateObj) {
      setDistrictOptions(selectedStateObj.districts);
      formik.setFieldValue("district", ""); // Clear district on state change
    }
  }, [formik.values.state]);

  const handleStateChange = (e) => {
    formik.setFieldValue("state", e.target.value);
  };

  const handleDistrictChange = (e) => {
    formik.setFieldValue("district", e.target.value);
  };

  const handleEducationChange = (e) => {
    formik.setFieldValue("education", e.target.value);
  };

  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });
          formik.setFieldValue("latitude", latitude);
          formik.setFieldValue("longitude", longitude);
          formik.setFieldValue(
            "location",
            `Lat: ${latitude}, Lng: ${longitude}`
          );
        },
        (error) => {
          console.error("Error fetching location:", error);
          toast.error(
            "Unable to fetch your location. Please enable location services."
          );
        }
      );
    } else {
      toast.error("Geolocation is not supported by your browser.");
    }
  };

  const progressPercentage = ((step + 1) / steps.length) * 100;

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4 sm:p-8">

        <form
          onSubmit={formik.handleSubmit}
          className="w-full max-w-lg sm:max-w-2xl bg-white shadow-2xl rounded-2xl sm:rounded-3xl p-6 sm:p-12 border-t-4 sm:border-t-8 border-indigo-600 transition-transform transform hover:scale-105 duration-300"
        >
          <div className="w-full bg-gray-300 rounded-full h-3 sm:h-5 mb-6 sm:mb-10 overflow-hidden shadow-md relative">
            <div
              className="bg-gradient-to-r from-indigo-500 to-pink-500 h-3 sm:h-5 rounded-full transition-all duration-500"
              style={{
                width: `${(step / totalFormSteps) * 100}%`,
              }}
            ></div>
            <span className="absolute top-0 left-1/2 transform -translate-x-1/2 text-xs sm:text-sm font-bold text-indigo-700 mt-4 sm:mt-6">
              {Math.round((step / totalFormSteps) * 100)}%
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-indigo-700 text-center mb-6 sm:mb-10">
            {Math.round((step / totalFormSteps) * 100)}% Completed
          </h2>


          {steps[step].name === "location" ? (
            <div className="mb-6 sm:mb-10 text-center">
              <label className="block text-lg sm:text-2xl font-semibold text-gray-800 mb-4 sm:mb-6">
                Select Your Location on the Map:
              </label>
              <button
                type="button"
                onClick={handleGetCurrentLocation}
                className="bg-green-600 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg sm:rounded-xl font-medium mb-4 sm:mb-6 hover:bg-green-700 transition duration-300"
              >
                Get Current Location
              </button>
              <div className="w-full h-64 sm:h-[450px] rounded-lg sm:rounded-xl overflow-hidden shadow-lg border-2 border-indigo-600">
                <MapContainer
                  center={[20.5937, 78.9629]}
                  zoom={5}
                  style={{ height: "100%", width: "100%" }}
                >
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <LocationMarker setLocation={setLocation} location={location} />
                </MapContainer>
              </div>
              {location.lat && location.lng && (
                <p className="mt-3 sm:mt-5 text-sm sm:text-lg font-medium text-gray-700">
                  📍 Latitude: {location.lat}, Longitude: {location.lng}
                </p>
              )}
            </div>
          ) : (
            <div className="mb-6 sm:mb-10">
              <label className="block text-lg sm:text-2xl font-semibold text-gray-800 mb-3 sm:mb-5">
                {steps[step].label}
              </label>
              {steps[step].type === "select" ? (
                <select
                  {...formik.getFieldProps(steps[step].name)}
                  onChange={(e) => {
                    if (steps[step].name === "state") handleStateChange(e);
                    else if (steps[step].name === "district") handleDistrictChange(e);
                    else if (steps[step].name === "education") handleEducationChange(e);
                  }}
                  className="border-2 border-indigo-400 p-3 sm:p-4 w-full rounded-lg sm:rounded-xl text-sm sm:text-lg focus:ring-4 focus:ring-indigo-500 outline-none transition-shadow shadow-md hover:shadow-lg"
                >
                  <option value="">Select {steps[step].label}</option>
                  {steps[step].options.map((option) => (
                    <option key={option} value={option} className="text-sm sm:text-lg">
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={steps[step].type}
                  {...formik.getFieldProps(steps[step].name)}
                  className="border-2 border-indigo-400 p-3 sm:p-4 w-full rounded-lg sm:rounded-xl text-sm sm:text-lg focus:ring-4 focus:ring-indigo-500 outline-none transition-shadow shadow-md hover:shadow-lg"
                />
              )}
              {formik.touched[steps[step].name] && formik.errors[steps[step].name] && (
                <p className="text-red-600 mt-2 sm:mt-4 text-sm sm:text-lg">
                  {formik.errors[steps[step].name]}
                </p>
              )}
            </div>
          )}

          <div className="mt-6 sm:mt-10 flex justify-between">
            {step > 0 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="bg-gray-700 text-white px-6 sm:px-10 py-2 sm:py-3 rounded-lg sm:rounded-xl text-sm sm:text-lg hover:bg-gray-800 transition duration-300"
              >
                Previous
              </button>
            )}
            <button
              type="submit"
              className="bg-indigo-600 text-white px-6 sm:px-10 py-2 sm:py-3 rounded-lg sm:rounded-xl text-sm sm:text-lg hover:bg-indigo-700 transition duration-300"
            >
              {step === steps.length - 1 ? "Submit" : "Next"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default MultiStepForm;
