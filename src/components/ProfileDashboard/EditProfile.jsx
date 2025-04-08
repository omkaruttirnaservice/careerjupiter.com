// 'use client';

// import { useEffect, useState } from 'react';
// import { useMutation } from '@tanstack/react-query';
// // import axios from "axios"
// import { X } from 'lucide-react';
// import { updateUserProfile } from './Api';

// const EditProfileModal = ({ isOpen, onClose, user, onSave }) => {
// 	const [formData, setFormData] = useState({
//     f_name: user?.f_name || "",
//     m_name: user?.m_name || "",
//     l_name: user?.l_name || "",
//     mobile_no: user?.mobile_no || "",
//     email_id: user?.email_id || "",
//     dob: user?.dob || "",
//     age: user?.age || "",
//     current_education: user?.info?.current_education || "",
//     address: {
//       line1: user?.address?.line1 || "",
//       line2: user?.address?.line2 || "",
//       dist: user?.address?.dist || "",
//       state: user?.address?.state || "",
//       pincode: user?.address?.pincode || "",
//       landmark: user?.address?.landmark || "",
//     },
//     info: {
//       current_education: user?.info?.current_education || "",
//       education: user?.info?.education || [],
//     },
//   });

// 	useEffect(() => {
// 		if (user) {
// 			setFormData({
//         f_name: user?.f_name || "",
//         m_name: user?.m_name || "",
//         l_name: user?.l_name || "",
//         mobile_no: user?.mobile_no || "",
//         email_id: user?.email_id || "",
//         dob: user?.dob || "",
//         age: user?.age || "",
//         current_education: user?.info?.current_education || "",
//         address: {
//           line1: user?.address?.line1 || "",
//           line2: user?.address?.line2 || "",
//           dist: user?.address?.dist || "",
//           state: user?.address?.state || "",
//           pincode: user?.address?.pincode || "",
//           landmark: user?.address?.landmark || "",
//         },
//         info: {
//           current_education: user?.info?.current_education || "",
//           education: user?.info?.education || [],
//         },
//       });
// 		}
// 	}, [user]);

// 	const calculateProfileCompletion = () => {
// 		const fields = [
//       formData.f_name,
//       formData.l_name,
//       formData.mobile_no,
//       formData.email_id,
//       formData.dob,
//       formData.age,
//       formData.current_education || formData.info?.current_education,
//       formData.address.line1,
//       formData.address.dist,
//       formData.address.state,
//       formData.address.pincode,
//       formData.address.landmark,
//     ];

// 		const filledFields = fields.filter(
// 			(field) => field && field.toString().trim() !== ''
// 		).length;
// 		return Math.round((filledFields / fields.length) * 100);
// 	};

// 	const completionPercentage = calculateProfileCompletion();

// 	const calculateAge = (dobString) => {
// 		const birthDate = new Date(dobString);
// 		if (isNaN(birthDate.getTime())) return '';

// 		const today = new Date();
// 		let age = today.getFullYear() - birthDate.getFullYear();
// 		const monthDiff = today.getMonth() - birthDate.getMonth();

// 		if (
// 			monthDiff < 0 ||
// 			(monthDiff === 0 && today.getDate() < birthDate.getDate())
// 		) {
// 			age--;
// 		}

// 		return age < 0 ? '' : age.toString();
// 	};

// 	const handleChange = (e) => {
// 		const { name, value } = e.target;
// 		if (name.startsWith('address.')) {
// 			const field = name.split('.')[1];
// 			setFormData((prev) => ({
// 				...prev,
// 				address: { ...prev.address, [field]: value },
// 			}));
// 		} else if (name === 'current_education') {
// 			setFormData((prev) => ({
// 				...prev,
// 				current_education: value,
// 				info: {
// 					...prev.info,
// 					current_education: value,
// 				},
// 			}));
// 		} else {
// 			if (name === 'dob') {
// 				const age = calculateAge(value);
// 				setFormData((prev) => ({
// 					...prev,
// 					dob: value,
// 					age: age,
// 				}));
// 			} else {
// 				setFormData((prev) => ({ ...prev, [name]: value }));
// 			}
// 		}
// 	};

// 	const updateProfileMutation = useMutation({
// 		mutationFn: async () => {
// 			// Prepare data for API
// 			const dataToSend = {
// 				...formData,
// 				info: {
// 					...formData.info,
// 					current_education:
// 						formData.current_education || formData.info?.current_education,
// 				},
// 			};
// 			await updateUserProfile(user?._id, dataToSend);
// 		},
// 		onSuccess: () => {
// 			onSave();
// 			onClose();
// 		},
// 	});

// 	const handleSubmit = () => {
// 		updateProfileMutation.mutate();
// 	};

// 	useEffect(() => {
// 		document.body.style.overflow = isOpen ? 'hidden' : 'auto';
// 		return () => {
// 			document.body.style.overflow = 'auto';
// 		};
// 	}, [isOpen]);

// 	if (!isOpen) return null;

// 	return (
//     <div className="fixed inset-0 flex items-center justify-center z-50">
//       <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-all"></div>
//       <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl relative transform transition-all duration-300 flex flex-col max-h-[90vh]">
//         <div className="p-6 border-b bg-white sticky top-0 z-10 flex items-center justify-between rounded-t-3xl">
//           <div className="flex items-center space-x-4">
//             <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-indigo-500 shadow-lg">
//               <img
//                 src={
//                   user?.profile_image ||
//                   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsEJHmI0MlIGvH9CYkbsLEWQ5_ee8Qtl5V-Q&s" ||
//                   "/placeholder.svg" ||
//                   "/placeholder.svg"
//                 }
//                 alt="Profile"
//                 className="w-full h-full object-cover"
//               />
//             </div>
//             <h2 className="text-2xl cursor-pointer font-bold text-gray-800">
//               Edit Profile
//             </h2>
//           </div>

//           <button
//             className="text-gray-500 hover:text-gray-700 rounded-full p-2 hover:bg-gray-100 transition-colors"
//             onClick={onClose}
//           >
//             <X className="w-6 h-6" />
//           </button>
//         </div>
//         <div className="px-6 py-2 bg-white border-b">
//           <div className="flex justify-between mb-1">
//             <span className="text-sm font-medium text-indigo-700">
//               Profile Completion
//             </span>
//             <span className="text-sm font-medium text-indigo-700">
//               {completionPercentage}%
//             </span>
//           </div>
//           <div className="w-full bg-gray-200 rounded-full h-2.5">
//             <div
//               className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2.5 rounded-full transition-all duration-500 ease-in-out"
//               style={{ width: `${completionPercentage}%` }}
//             ></div>
//           </div>
//         </div>
//         <div className="overflow-y-auto px-6 py-4 flex-1">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="space-y-2">
//               <label className="text-sm font-medium text-gray-700">
//                 First Name
//               </label>
//               <input
//                 type="text"
//                 name="f_name"
//                 value={formData.f_name}
//                 onChange={handleChange}
//                 placeholder="First Name"
//                 className="w-full p-3 border-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
//               />
//             </div>

//             <div className="space-y-2">
//               <label className="text-sm font-medium text-gray-700">
//                 Middle Name
//               </label>
//               <input
//                 type="text"
//                 name="m_name"
//                 value={formData.m_name}
//                 onChange={handleChange}
//                 placeholder="Middle Name"
//                 className="w-full p-3 border-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
//               />
//             </div>

//             <div className="space-y-2">
//               <label className="text-sm font-medium text-gray-700">
//                 Last Name
//               </label>
//               <input
//                 type="text"
//                 name="l_name"
//                 value={formData.l_name}
//                 onChange={handleChange}
//                 placeholder="Last Name"
//                 className="w-full p-3 border-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
//               />
//             </div>

//             <div className="space-y-2">
//               <label className="text-sm font-medium text-gray-700">
//                 Mobile Number
//               </label>
//               <input
//                 type="text"
//                 name="mobile_no"
//                 value={formData.mobile_no}
//                 onChange={handleChange}
//                 placeholder="Mobile Number"
//                 className="w-full p-3 border-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
//               />
//             </div>

//             <div className="space-y-2">
//               <label className="text-sm font-medium text-gray-700">Email</label>
//               <input
//                 type="email"
//                 name="email_id"
//                 value={formData.email_id}
//                 onChange={handleChange}
//                 placeholder="Email"
//                 className="w-full p-3 border-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-gray-50"
//               />
//             </div>

//             <div className="space-y-2">
//               <label className="text-sm font-medium text-gray-700">
//                 Date of Birth
//               </label>
//               <input
//                 type="date"
//                 name="dob"
//                 value={formData.dob}
//                 onChange={handleChange}
//                 className="w-full p-3 border-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
//               />
//             </div>

//             <div className="space-y-2">
//               <label className="text-sm font-medium text-gray-700">
//                 Current Education
//               </label>
//               <input
//                 type="text"
//                 name="current_education"
//                 value={
//                   formData.current_education || formData.info?.current_education
//                 }
//                 onChange={handleChange}
//                 placeholder="Current Education"
//                 className="w-full p-3 border-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
//               />
//             </div>

//             <div className="space-y-2 md:col-span-2">
//               <label className="text-sm font-medium text-gray-700">
//                 Address Line 1
//               </label>
//               <input
//                 type="text"
//                 name="address.line1"
//                 value={formData.address.line1}
//                 onChange={handleChange}
//                 placeholder="Address Line 1"
//                 className="w-full p-3 border-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
//               />
//             </div>

//             <div className="space-y-2 md:col-span-2">
//               <label className="text-sm font-medium text-gray-700">
//                 Address Line 2
//               </label>
//               <input
//                 type="text"
//                 name="address.line2"
//                 value={formData.address.line2}
//                 onChange={handleChange}
//                 placeholder="Address Line 2"
//                 className="w-full p-3 border-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
//               />
//             </div>

//             <div className="space-y-2">
//               <label className="text-sm font-medium text-gray-700">State</label>
//               <input
//                 type="text"
//                 name="address.state"
//                 value={formData.address.state}
//                 onChange={handleChange}
//                 placeholder="State"
//                 className="w-full p-3 border-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
//               />
//             </div>
//             <div className="space-y-2">
//               <label className="text-sm font-medium text-gray-700">
//                 District
//               </label>
//               <input
//                 type="text"
//                 name="address.dist"
//                 value={formData.address.dist}
//                 onChange={handleChange}
//                 placeholder="District"
//                 className="w-full p-3 border-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
//               />
//             </div>

//             <div className="space-y-2">
//               <label className="text-sm font-medium text-gray-700">
//                 Pincode
//               </label>
//               <input
//                 type="text"
//                 name="address.pincode"
//                 value={formData.address.pincode}
//                 onChange={handleChange}
//                 placeholder="Pincode"
//                 className="w-full p-3 border-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
//               />
//             </div>
// 			<div className="space-y-2">
//               <label className="text-sm font-medium text-gray-700">
//                 Landmark
//               </label>
//               <input
//                 type="text"
//                 name="address.landmark"
//                 value={formData.address.landmark}
//                 onChange={handleChange}
//                 placeholder="Landmark"
//                 className="w-full p-3 border-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
//               />
//             </div>
//           </div>
//         </div>
//         <div className="p-4 border-t bg-white sticky bottom-0 z-10 rounded-b-3xl">
//           <button
//             className="w-full bg-gradient-to-r cursor-pointer from-indigo-500 to-purple-500 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:translate-y-[-2px] transition-all"
//             onClick={handleSubmit}
//             disabled={updateProfileMutation.isLoading}
//           >
//             {updateProfileMutation.isLoading ? (
//               <div className="flex cursor-pointer items-center justify-center gap-2">
//                 <div className="w-5 h-5 border-2 cursor-pointer border-white border-t-transparent rounded-full animate-spin"></div>
//                 <span>Saving...</span>
//               </div>
//             ) : (
//               "Save Changes"
//             )}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditProfileModal;

"use client";

import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { X } from "lucide-react";
import { updateUserProfile } from "./Api";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const EditProfileModal = ({ isOpen, onClose, user, onSave }) => {
  if (!isOpen) return null;

  const validationSchema = Yup.object().shape({
    f_name: Yup.string().required("First name is required"),
    m_name: Yup.string(),
    l_name: Yup.string().required("Last name is required"),
    mobile_no: Yup.string()
      .required("Mobile number is required")
      .matches(/^\d{10}$/, "Mobile number must be exactly 10 digits")
      .matches(/^[6-9]\d{9}$/, "Mobile number must start with 6, 7, 8, or 9")
      .test(
        "no-spaces",
        "Mobile number cannot contain spaces",
        (val) => val && !/\s/.test(val)
      ),

    email_id: Yup.string()
      .required("Email is required")
      .trim()
      .email("Enter a valid email")
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Enter a valid email address"
      )
      .test(
        "no-spaces",
        "Email cannot contain spaces",
        (val) => val && !/\s/.test(val)
      ),

    dob: Yup.date()
      .required("Date of Birth is required")
      .max(
        new Date(new Date().setFullYear(new Date().getFullYear() - 10)),
        "You must be at least 10 years old"
      ),

    current_education: Yup.string().required("Current education is required"),
    address: Yup.object().shape({
      line1: Yup.string().required("Address Line 1 is required"),
      line2: Yup.string(),
      dist: Yup.string().required("District is required"),
      state: Yup.string().required("State is required"),
      pincode: Yup.string()
        .required("Pincode is required")
        .matches(/^\d{6}$/, "Pincode must be 6 digits"),
      landmark: Yup.string().required("Landmark is required"),
    }),
  });

  const initialValues = {
    f_name: user?.f_name || "",
    m_name: user?.m_name || "",
    l_name: user?.l_name || "",
    mobile_no: user?.mobile_no || "",
    email_id: user?.email_id || "",
    dob: user?.dob || "",
    current_education: user?.info?.current_education || "",
    address: {
      line1: user?.address?.line1 || "",
      line2: user?.address?.line2 || "",
      dist: user?.address?.dist || "",
      state: user?.address?.state || "",
      pincode: user?.address?.pincode || "",
      landmark: user?.address?.landmark || "",
    },
  };

  const updateProfileMutation = useMutation({
    mutationFn: async (values) => {
      const age = calculateAge(values.dob);
      const dataToSend = {
        ...values,
        age,
        info: {
          current_education: values.current_education,
          education: user?.info?.education || [],
        },
      };
      await updateUserProfile(user?._id, dataToSend);
    },
    onSuccess: () => {
      onSave();
      onClose();
    },
  });

  const calculateAge = (dobString) => {
    const birthDate = new Date(dobString);
    if (isNaN(birthDate.getTime())) return "";
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age < 0 ? "" : age.toString();
  };

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl relative flex flex-col max-h-[90vh]">
        <div className="p-6 border-b flex justify-between items-center sticky top-0 z-10 bg-white rounded-t-3xl">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full border-4 border-indigo-500 shadow-lg overflow-hidden">
              <img
                src={
                  user?.profile_image ||
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsEJHmI0MlIGvH9CYkbsLEWQ5_ee8Qtl5V-Q&s"
                }
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Edit Profile</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 rounded-full p-2 hover:bg-gray-100"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => updateProfileMutation.mutate(values)}
        >
          {({ isSubmitting }) => (
            <Form className="overflow-y-auto px-6 py-4 flex-1 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { name: "f_name", label: "First Name" },
                  { name: "m_name", label: "Middle Name" },
                  { name: "l_name", label: "Last Name" },
                  { name: "mobile_no", label: "Mobile Number" },
                  { name: "email_id", label: "Email", type: "email" },
                  { name: "dob", label: "Date of Birth", type: "date" },
                  { name: "current_education", label: "Current Education" },
                ].map(({ name, label, type = "text" }) => (
                  <div className="space-y-2" key={name}>
                    <label className="text-sm font-medium text-gray-700">
                      {label}
                    </label>
                    <Field
                      type={type}
                      name={name}
                      max={
                        name === "dob"
                          ? new Date(
                              new Date().setFullYear(
                                new Date().getFullYear() - 10
                              )
                            )
                              .toISOString()
                              .split("T")[0]
                          : undefined
                      }
                      className="w-full p-3 border-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />

                    <ErrorMessage
                      name={name}
                      component="div"
                      className="text-sm text-red-500"
                    />
                  </div>
                ))}

                {[
                  { name: "address.line1", label: "Address Line 1" },
                  { name: "address.line2", label: "Address Line 2" },
                  { name: "address.state", label: "State" },
                  { name: "address.dist", label: "District" },
                  { name: "address.pincode", label: "Pincode" },
                  { name: "address.landmark", label: "Landmark" },
                ].map(({ name, label }) => (
                  <div className="space-y-2" key={name}>
                    <label className="text-sm font-medium text-gray-700">
                      {label}
                    </label>
                    <Field
                      type="text"
                      name={name}
                      className="w-full p-3 border-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <ErrorMessage
                      name={name}
                      component="div"
                      className="text-sm text-red-500"
                    />
                  </div>
                ))}
              </div>

              <div className="sticky bottom-0 bg-white p-4 border-t rounded-b-3xl">
                <button
                  type="submit"
                  disabled={isSubmitting || updateProfileMutation.isLoading}
                  className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                  {isSubmitting || updateProfileMutation.isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Saving...</span>
                    </div>
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EditProfileModal;
