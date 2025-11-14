import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { FaPaintBrush } from "react-icons/fa";
import { IoArrowForwardOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { BounceLoader } from "react-spinners";
import Swal from "sweetalert2";
import * as Yup from "yup";
import { cityData } from "../Constant/constantData";
import { BASE_URL } from "../utils/constansts";

// ✅ API call
const createGuestUser = async (formData) => {
  const url = `${BASE_URL}/api/student`;
  try {
    const response = await axios.post(url, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("API Error:", error.response || error.message);
    throw new Error("Failed to submit student data");
  }
};

// ✅ Toast function
const showToast = (icon, title) => {
  Swal.fire({
    toast: true,
    position: "top-end",
    icon,
    title,
    showConfirmButton: false,
    timer: 2500,
    timerProgressBar: true,
  });
};

const DrawingPopup = ({ openedManually = false, onClose }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isCompressing, setIsCompressing] = useState(false);
  const [errors, setErrors] = useState({});
  const [isBannerOpen, setIsBannerOpen] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    class: "",
    school: "",
    state: "Maharashtra",
    district: "",
    mobile: "",
    drawing: null,
  });

  const [previewUrl, setPreviewUrl] = useState(null);
  const [fileSizeKB, setFileSizeKB] = useState(null);

  const mutation = useMutation({
    mutationFn: createGuestUser,
    onSuccess: (data) => {
      showToast("success", "Form submitted successfully!");
      setIsOpen(false);
      //   navigate("/profile/test");
    },
    onError: (err) => {
      showToast("error", err.message);
    },
  });

  // Auto open popup after 3s
  // React.useEffect(() => {
  //   const timer = setTimeout(() => setIsOpen(true), 3000);
  //   return () => clearTimeout(timer);
  // }, []);

  React.useEffect(() => {
    if (openedManually) {
      setIsOpen(true); // open instantly
      setIsBannerOpen(true); // show banner instantly
      return;
    }

    // Auto-open after 3 seconds
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, [openedManually]);

  // ✅ Yup validation schema
  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required("Full Name is required"),
    class: Yup.string().required("Please select your class"),
    school: Yup.string().required("School name is required"),
    mobile: Yup.string()
      .matches(/^[0-9]{10}$/, "Enter a valid 10-digit mobile number")
      .required("Mobile number is required"),
    drawing: Yup.mixed().required("Please upload your drawing or essay"),
  });

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (!files) {
      setFormData((prev) => ({ ...prev, [name]: value }));
      setErrors((prev) => ({ ...prev, [name]: "" })); // clear error on input change
    }
  };

  const handleClose = () => {
    setIsBannerOpen(false);
    setIsFormOpen(false);
    onClose(); // tells parent to unmount
  };

  // ✅ Image compression function
  const compressImage = (file) =>
    new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target.result;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const maxWidth = 800;
          const maxHeight = 1000;
          const ratio = Math.min(maxWidth / img.width, maxHeight / img.height);
          canvas.width = img.width * ratio;
          canvas.height = img.height * ratio;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          canvas.toBlob(
            (blob) => {
              resolve(blob);
            },
            "image/jpeg",
            0.9
          );
        };
      };
      reader.readAsDataURL(file);
    });

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileType = file.type;
    const sizeKB = file.size / 1024; // Convert bytes → KB

    // ✅ If it's a PDF → limit 1 MB
    if (fileType === "application/pdf") {
      if (sizeKB > 1024) {
        showToast("error", "PDF size must be under 1 MB.");
        e.target.value = null;
        return;
      }

      setFormData((prev) => ({ ...prev, drawing: file }));
      setErrors((prev) => ({ ...prev, drawing: "" }));
      setPreviewUrl(null);
      setFileSizeKB(sizeKB.toFixed(2));
      return;
    }

    // ✅ Only allow images or PDFs
    if (!fileType.startsWith("image/")) {
      showToast("error", "Only images and PDFs are allowed.");
      e.target.value = null;
      return;
    }

    // ✅ Compress images automatically
    setIsCompressing(true);
    const compressedBlob = await compressImage(file);
    setIsCompressing(false);

    setFormData((prev) => ({ ...prev, drawing: compressedBlob }));
    setErrors((prev) => ({ ...prev, drawing: "" }));

    setPreviewUrl(URL.createObjectURL(compressedBlob));
    setFileSizeKB((compressedBlob.size / 1024).toFixed(2));
  };

  // ✅ Handle form submission
  const handleSubmit = async () => {
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      setErrors({});

      const payload = new FormData();
      payload.append("fullName", formData.fullName);
      payload.append("classStandard", formData.class);
      payload.append("schoolName", formData.school);
      payload.append("cityOrDistrict", formData.district || formData.state);
      payload.append("mobile_no", formData.mobile || "0000000000");
      payload.append("drawingFile", formData.drawing);

      mutation.mutate(payload);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const fieldErrors = {};
        err.inner.forEach((e) => {
          fieldErrors[e.path] = e.message;
        });
        setErrors(fieldErrors);
      } else {
        showToast("error", "Something went wrong!");
      }
    }
  };

  const districts =
    cityData.find((c) => c.state === formData.state)?.districts || [];

  if (!isOpen) return null;


  return (
    <>
      {/* -------------------------------------------------- */}
      {/* 1️⃣ FIRST POPUP — Banner + Register Button */}
      {/* -------------------------------------------------- */}
      {isBannerOpen && (
        <div className="fixed inset-0 z-[100] bg-black/20 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white p-6 sm:p-8 rounded-lg shadow-2xl w-full max-w-3xl relative">
            {/* Close Banner */}
            {/* <button
            onClick={() => setIsBannerOpen(false)}
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-xl"
          >
            ✕
          </button> */}

            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-xl"
            >
              ✕
            </button>

            {/* Banner */}
            <div className="relative rounded-lg overflow-hidden border-2">
              <img
                src="/drawing_banner.jpg"
                alt="Drawing Banner"
                className="w-full h-80 object-fill"
              />
            </div>

            {/* Register Now */}
            <button
              onClick={() => {
                setIsBannerOpen(false);
                setIsFormOpen(true);
              }}
              className="mt-6 w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl text-lg font-semibold shadow-md"
            >
              Register Now
            </button>
          </div>
        </div>
      )}

      {/* -------------------------------------------------- */}
      {/* 2️⃣ SECOND POPUP — Full Form */}
      {/* -------------------------------------------------- */}
      {isFormOpen && (
        <div className="fixed z-[100] inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-3xl p-6 sm:p-8 relative overflow-y-auto max-h-[90vh]">
            {/* Close Form */}
            {/* <button
              onClick={() => setIsFormOpen(false)}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-xl sm:text-2xl"
            >
              ✕
            </button> */}

            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-xl sm:text-2xl"
            >
              ✕
            </button>

            <div className="flex flex-col items-center gap-6">
              <div className="flex items-center justify-center md:justify-start space-x-2 sm:space-x-3">
                <FaPaintBrush className="text-3xl sm:text-4xl text-black" />
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 font-sans underline">
                  Drawing and Essay Competition - Student Details
                </h2>
              </div>

              {/* <div className="relative w-full sm:w-[95%] md:w-[95%] rounded-lg overflow-hidden shadow-2xl border-3 transition-all duration-300 ease-in-out hover:scale-[1.02]">
              <img
                src="/drawing_banner.jpg"
                alt="Drawing Banner"
                className="w-full h-48 sm:h-56 md:h-64 object-cover object-center"
              />
            </div> */}

              <div className="w-full text-center md:text-left">
                <form className="grid grid-cols-2 gap-4 text-left">
                  {/* Full Name */}
                  <label className="flex flex-col">
                    Full Name:
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
                    />
                    {errors.fullName && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.fullName}
                      </p>
                    )}
                  </label>

                  {/* Class */}
                  <label className="flex flex-col">
                    Class / Standard:
                    <select
                      name="class"
                      value={formData.class}
                      onChange={handleInputChange}
                      className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
                    >
                      <option value="">Select Class</option>
                      {Array.from({ length: 8 }, (_, i) => 5 + i).map((num) => (
                        <option key={num} value={num}>
                          {num}th
                        </option>
                      ))}
                    </select>
                    {errors.class && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.class}
                      </p>
                    )}
                  </label>

                  {/* School */}
                  <label className="flex flex-col">
                    School / College Name:
                    <input
                      type="text"
                      name="school"
                      value={formData.school}
                      onChange={handleInputChange}
                      className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
                    />
                    {errors.school && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.school}
                      </p>
                    )}
                  </label>

                  {/* State */}
                  <label className="flex flex-col">
                    State:
                    <select
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
                    >
                      {cityData.map((c) => (
                        <option key={c.state} value={c.state}>
                          {c.state}
                        </option>
                      ))}
                    </select>
                  </label>

                  {/* District */}
                  <label className="flex flex-col">
                    District:
                    <select
                      name="district"
                      value={formData.district}
                      onChange={handleInputChange}
                      className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
                    >
                      <option value="">Select District</option>
                      {districts.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                  </label>

                  {/* Mobile */}
                  <label className="flex flex-col">
                    Mobile Number:
                    <input
                      type="text"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleInputChange}
                      className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
                    />
                    {errors.mobile && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.mobile}
                      </p>
                    )}
                  </label>

                  {/* File Upload */}
                  <label className="flex flex-col col-span-2">
                    Upload Your Drawing / Essay (Image / PDF):
                    <input
                      type="file"
                      name="drawing"
                      accept="image/*,application/pdf"
                      onChange={handleFileUpload}
                      className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none"
                    />
                    {errors.drawing && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.drawing}
                      </p>
                    )}
                  </label>

                  {/* Loader */}
                  {isCompressing && (
                    <div className="col-span-2 flex justify-center mt-2">
                      <BounceLoader color="green" />
                    </div>
                  )}

                  {/* Preview */}
                  {previewUrl && !isCompressing && (
                    <div className="col-span-2 text-center mt-2">
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="w-full max-h-[200px] object-contain border border-gray-300 rounded"
                      />
                      <p className="text-sm text-gray-600">{fileSizeKB} KB</p>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="button"
                    className="col-span-2 w-full flex items-center justify-center bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-xl text-base font-semibold transition-all duration-300 shadow-lg mt-2"
                    onClick={handleSubmit}
                    disabled={mutation.isLoading || isCompressing}
                  >
                    {mutation.isLoading
                      ? "Submitting..."
                      : "Submit Your Drawing / Essay"}
                    <IoArrowForwardOutline className="ml-2 text-xl" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DrawingPopup;
