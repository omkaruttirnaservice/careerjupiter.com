import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { userSignUp } from "../../api/ApiService";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { cityData } from "../../Constant/constantData";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const educationOptions = ["BE", "BCom", "MCA", "BCS", "BSc", "BA", "MBA"];

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
  const [step, setStep] = useState(0);
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [districtOptions, setDistrictOptions] = useState([]);

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: userSignUp,
    onSuccess: (data) => {
      toast.success("Form submitted successfully!");
      navigate("/login");
    },
    onError: (error) => {
      if (error.response?.status === 400) {
        toast.error("Invalid input. Please check your details.");
      } else if (error.response?.status === 409) {
        toast.error("This email is already registered. Try logging in.");
      } else if (error.response?.status === 500) {
        toast.error("Server error. Please try again later.");
      } else {
        toast.error("Something went wrong. Please try again.");
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
      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
        <form
          onSubmit={formik.handleSubmit}
          className="w-full max-w-lg bg-white shadow-2xl rounded-2xl p-8"
        >
          <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
            <div
              className="bg-blue-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>

          <h2 className="text-2xl font-bold text-blue-600 text-center mb-6">
            Step {step + 1} of {steps.length}
          </h2>

          {steps[step].name === "location" ? (
            <div className="mb-6 text-center">
              <label className="block text-lg font-semibold text-gray-700 mb-2">
                Select Your Location on the Map:
              </label>
              <button
                type="button"
                onClick={handleGetCurrentLocation}
                className="bg-green-500 text-white px-4 py-2 rounded-lg mb-4 hover:bg-green-600 transition"
              >
                Get Current Location
              </button>
              <div className="w-full h-72 rounded-lg overflow-hidden shadow-lg border">
                <MapContainer
                  center={[20.5937, 78.9629]}
                  zoom={5}
                  style={{ height: "100%", width: "100%" }}
                >
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <LocationMarker
                    setLocation={setLocation}
                    location={location}
                  />
                </MapContainer>
              </div>
              {location.lat && location.lng && (
                <p className="mt-3 text-lg font-medium text-gray-600">
                  📍 Latitude: {location.lat}, Longitude: {location.lng}
                </p>
              )}
            </div>
          ) : (
            <div className="mb-6">
              <label className="block text-lg font-semibold text-gray-700 mb-2">
                {steps[step].label}
              </label>
              {steps[step].type === "select" ? (
                <select
                  {...formik.getFieldProps(steps[step].name)}
                  onChange={(e) => {
                    if (steps[step].name === "state") handleStateChange(e);
                    else if (steps[step].name === "district")
                      handleDistrictChange(e);
                    else if (steps[step].name === "education")
                      handleEducationChange(e);
                  }}
                  className="border p-3 w-full rounded-lg text-lg focus:ring-2 focus:ring-blue-400 outline-none"
                >
                  <option value="">Select {steps[step].label}</option>
                  {steps[step].options.map((option) => (
                    <option key={option} value={option} className="text-lg">
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={steps[step].type}
                  {...formik.getFieldProps(steps[step].name)}
                  className="border p-3 w-full rounded-lg text-lg focus:ring-2 focus:ring-blue-400 outline-none"
                />
              )}
              {formik.touched[steps[step].name] &&
                formik.errors[steps[step].name] && (
                  <p className="text-red-500 mt-2 text-lg">
                    {formik.errors[steps[step].name]}
                  </p>
                )}
            </div>
          )}

          <div className="mt-6 flex justify-between">
            {step > 0 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="bg-gray-500 text-white px-6 py-2 rounded-lg text-lg hover:bg-gray-600 transition"
              >
                Previous
              </button>
            )}
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded-lg text-lg hover:bg-blue-600 transition"
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
