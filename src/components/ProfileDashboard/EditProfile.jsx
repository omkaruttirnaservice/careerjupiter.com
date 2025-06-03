import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { X } from "lucide-react";
import { updateUserProfile } from "./Api";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { EDUCATION_LIST } from "../../utils/constansts";

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
    custom_education: Yup.string().when("current_education", {
      is: "Other",
      then: (schema) => schema.required("Please enter your education"),
      otherwise: (schema) => schema.notRequired(),
    }),
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
    custom_education: "",
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
      const education =
        values.current_education === "Other"
          ? values.custom_education
          : values.current_education;

      const age = calculateAge(values.dob);

      const dataToSend = {
        ...values,
        current_education: education,
        age,
        info: {
          current_education: education,
          education: user?.info?.education || [],
        },
      };
      delete dataToSend.custom_education;

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
    document.body.style.overflow = isOpen ? "" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
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
          {({ values, isSubmitting, setFieldValue }) => (
            <Form className="overflow-y-auto px-6 py-4 flex-1 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { name: "f_name", label: "First Name" },
                  { name: "m_name", label: "Middle Name" },
                  { name: "l_name", label: "Last Name" },
                  { name: "mobile_no", label: "Mobile Number", readOnly: true },
                  { name: "email_id", label: "Email", type: "email" },
                  { name: "dob", label: "Date of Birth", type: "date" },
                ].map(({ name, label, type = "text", readOnly = false }) => (
                  <div className="space-y-2" key={name}>
                    <label className="text-sm font-medium text-gray-700">
                      {label}
                    </label>
                    <Field
                      type={type}
                      name={name}
                      readOnly={readOnly}
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
                      className={`w-full p-3 border-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                        readOnly ? "bg-gray-100 cursor-not-allowed" : ""
                      }`}
                    />
                    <ErrorMessage
                      name={name}
                      component="div"
                      className="text-sm text-red-500"
                    />
                  </div>
                ))}

                {/* Current Education dropdown with conditional input */}
                <div className="space-y-2 col-span-1 md:col-span-2">
                  <label className="text-sm font-medium text-gray-700">
                    Current Education
                  </label>
                  <Field
                    as="select"
                    name="current_education"
                    onChange={(e) => {
                      setFieldValue("current_education", e.target.value);
                      if (e.target.value !== "Other") {
                        setFieldValue("custom_education", "");
                      }
                    }}
                    className="w-full p-3 border-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="">Select an option</option>
                    {EDUCATION_LIST.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="current_education"
                    component="div"
                    className="text-sm text-red-500"
                  />

                  {values.current_education === "Other" && (
                    <div className="mt-2">
                      <Field
                        type="text"
                        name="custom_education"
                        placeholder="Enter your education"
                        className="w-full p-3 border-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                      <ErrorMessage
                        name="custom_education"
                        component="div"
                        className="text-sm text-red-500 mt-1"
                      />
                    </div>
                  )}
                </div>

                {[
                  { name: "address.line1", label: "Address Line 1" },
                  { name: "address.line2", label: "Address Line 2" },
                  { name: "address.landmark", label: "Landmark" },
                  { name: "address.state", label: "State" },
                  { name: "address.dist", label: "District" },
                  { name: "address.pincode", label: "Pincode" },
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

              <div className=" bottom-0 bg-white p-4 border-t rounded-b-3xl">
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


// import { useEffect, useState } from "react";
// import { useMutation } from "@tanstack/react-query";
// import { X } from "lucide-react";
// import { updateUserProfile } from "./Api";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import { EDUCATION_LIST } from "../../utils/constansts";
// import { cityData } from "../../Constant/constantData";

  

// const EditProfileModal = ({ isOpen, onClose, user, onSave }) => {
//   if (!isOpen) return null;

//   const validationSchema = Yup.object().shape({
//     f_name: Yup.string().required("First name is required"),
//     m_name: Yup.string(),
//     l_name: Yup.string().required("Last name is required"),
//     mobile_no: Yup.string()
//       .required("Mobile number is required")
//       .matches(/^[6-9]\d{9}$/, "Mobile number must be valid"),
//     email_id: Yup.string().required("Email is required").email("Invalid email"),
//     dob: Yup.date()
//       .required("Date of Birth is required")
//       .max(
//         new Date(new Date().setFullYear(new Date().getFullYear() - 10)),
//         "You must be at least 10 years old"
//       ),
//     current_education: Yup.string().required("Current education is required"),
//     custom_education: Yup.string().when("current_education", {
//       is: "Other",
//       then: (schema) => schema.required("Please enter your education"),
//     }),
//     address: Yup.object().shape({
//       line1: Yup.string().required("Address Line 1 is required"),
//       line2: Yup.string(),
//       dist: Yup.string().required("District is required"),
//       state: Yup.string().required("State is required"),
//       pincode: Yup.string()
//         .matches(/^\d{6}$/, "Pincode must be 6 digits")
//         .required("Pincode is required"),
//       landmark: Yup.string().required("Landmark is required"),
//     }),
//   });

//   const initialValues = {
//     f_name: user?.f_name || "",
//     m_name: user?.m_name || "",
//     l_name: user?.l_name || "",
//     mobile_no: user?.mobile_no || "",
//     email_id: user?.email_id || "",
//     dob: user?.dob || "",
//     current_education: user?.info?.current_education || "",
//     custom_education: "",
//     address: {
//       line1: user?.address?.line1 || "",
//       line2: user?.address?.line2 || "",
//       dist: user?.address?.dist || "",
//       state: user?.address?.state || "",
//       pincode: user?.address?.pincode || "",
//       landmark: user?.address?.landmark || "",
//     },
//   };

//   const calculateAge = (dobString) => {
//     const birthDate = new Date(dobString);
//     const today = new Date();
//     let age = today.getFullYear() - birthDate.getFullYear();
//     const monthDiff = today.getMonth() - birthDate.getMonth();
//     if (
//       monthDiff < 0 ||
//       (monthDiff === 0 && today.getDate() < birthDate.getDate())
//     ) {
//       age--;
//     }
//     return age < 0 ? "" : age.toString();
//   };

//   const updateProfileMutation = useMutation({
//     mutationFn: async (values) => {
//       const education =
//         values.current_education === "Other"
//           ? values.custom_education
//           : values.current_education;
//       const age = calculateAge(values.dob);
//       const dataToSend = {
//         ...values,
//         current_education: education,
//         age,
//         info: {
//           current_education: education,
//           education: user?.info?.education || [],
//         },
//       };
//       delete dataToSend.custom_education;
//       await updateUserProfile(user?._id, dataToSend);
//     },
//     onSuccess: () => {
//       onSave();
//       onClose();
//     },
//   });

//   useEffect(() => {
//     document.body.style.overflow = isOpen ? "hidden" : "auto";
//     return () => (document.body.style.overflow = "auto");
//   }, [isOpen]);

//   return (
//     <div className="fixed inset-0 flex items-center justify-center z-50">
//       <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
//       <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl relative flex flex-col max-h-[90vh]">
//         <div className="p-6 border-b flex justify-between items-center sticky top-0 z-10 bg-white rounded-t-3xl">
//           <div className="flex items-center gap-4">
//             <div className="w-16 h-16 rounded-full border-4 border-indigo-500 shadow-lg overflow-hidden">
//               <img
//                 src={
//                   user?.profile_image ||
//                   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsEJHmI0MlIGvH9CYkbsLEWQ5_ee8Qtl5V-Q&s"
//                 }
//                 alt="Profile"
//                 className="w-full h-full object-cover"
//               />
//             </div>
//             <h2 className="text-2xl font-bold text-gray-800">Edit Profile</h2>
//           </div>
//           <button
//             onClick={onClose}
//             className="text-gray-500 hover:text-gray-700 rounded-full p-2 hover:bg-gray-100"
//           >
//             <X className="w-6 h-6" />
//           </button>
//         </div>

//         <Formik
//           initialValues={initialValues}
//           validationSchema={validationSchema}
//           onSubmit={(values) => updateProfileMutation.mutate(values)}
//         >
//           {({ values, isSubmitting, setFieldValue }) => {
//             const [districts, setDistricts] = useState([]);

//             useEffect(() => {
//               const found = cityData.find(
//                 (c) => c.state === values.address.state
//               );
//               setDistricts(found ? found.districts : []);
//               if (!found || !found.districts.includes(values.address.dist)) {
//                 setFieldValue("address.dist", "");
//               }
//             }, [values.address.state, setFieldValue]);

//             return (
//               <Form className="overflow-y-auto px-6 py-4 flex-1 space-y-4">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   {[
//                     "first name",
//                     "middle name",
//                     "last name",
//                     "mobile_no",
//                     "email_id",
//                     "dob",
//                   ].map((name) => (
//                     <div key={name} className="space-y-2">
//                       <label className="text-sm font-medium text-gray-700">
//                         {name.replace("_", " ")}
//                       </label>
//                       <Field
//                         name={name}
//                         type={
//                           name === "dob"
//                             ? "date"
//                             : name.includes("email")
//                               ? "email"
//                               : "text"
//                         }
//                         className="w-full p-3 border-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                         readOnly={name === "mobile_no"}
//                       />
//                       <ErrorMessage
//                         name={name}
//                         component="div"
//                         className="text-sm text-red-500"
//                       />
//                     </div>
//                   ))}

//                   {/* Education */}
//                   <div className="col-span-1 md:col-span-2 space-y-2">
//                     <label className="text-sm font-medium text-gray-700">
//                       Current Education
//                     </label>
//                     <Field
//                       as="select"
//                       name="current_education"
//                       onChange={(e) => {
//                         setFieldValue("current_education", e.target.value);
//                         if (e.target.value !== "Other")
//                           setFieldValue("custom_education", "");
//                       }}
//                       className="w-full p-3 border-2 rounded-lg"
//                     >
//                       <option value="">Select</option>
//                       {EDUCATION_LIST.map((opt) => (
//                         <option key={opt} value={opt}>
//                           {opt}
//                         </option>
//                       ))}
//                     </Field>
//                     <ErrorMessage
//                       name="current_education"
//                       component="div"
//                       className="text-sm text-red-500"
//                     />
//                     {values.current_education === "Other" && (
//                       <Field
//                         name="custom_education"
//                         placeholder="Enter your education"
//                         className="w-full p-3 border-2 rounded-lg"
//                       />
//                     )}
//                   </div>

//                   {/* Address Fields */}
//                   {[
//                     { name: "address.line1", label: "Address Line 1" },
//                     { name: "address.line2", label: "Address Line 2" },
//                     { name: "address.landmark", label: "Landmark" },
//                   ].map(({ name, label }) => (
//                     <div key={name} className="space-y-2">
//                       <label className="text-sm font-medium text-gray-700">
//                         {label}
//                       </label>
//                       <Field
//                         name={name}
//                         className="w-full p-3 border-2 rounded-lg"
//                       />
//                       <ErrorMessage
//                         name={name}
//                         component="div"
//                         className="text-sm text-red-500"
//                       />
//                     </div>
//                   ))}

//                   {/* State Dropdown */}
//                   <div className="space-y-2">
//                     <label className="text-sm font-medium text-gray-700">
//                       State
//                     </label>
//                     <Field
//                       as="select"
//                       name="address.state"
//                       className="w-full p-3 border-2 rounded-lg"
//                     >
//                       <option value="">Select a state</option>
//                       {cityData.map((item) => (
//                         <option key={item.state} value={item.state}>
//                           {item.state}
//                         </option>
//                       ))}
//                     </Field>
//                     <ErrorMessage
//                       name="address.state"
//                       component="div"
//                       className="text-sm text-red-500"
//                     />
//                   </div>

//                   {/* District Dropdown */}
//                   <div className="space-y-2">
//                     <label className="text-sm font-medium text-gray-700">
//                       District
//                     </label>
//                     <Field
//                       as="select"
//                       name="address.dist"
//                       className="w-full p-3 border-2 rounded-lg"
//                     >
//                       <option value="">Select a district</option>
//                       {districts.map((dist) => (
//                         <option key={dist} value={dist}>
//                           {dist}
//                         </option>
//                       ))}
//                     </Field>
//                     <ErrorMessage
//                       name="address.dist"
//                       component="div"
//                       className="text-sm text-red-500"
//                     />
//                   </div>

//                   <div className="space-y-2">
//                     <label className="text-sm font-medium text-gray-700">
//                       Pincode
//                     </label>
//                     <Field
//                       name="address.pincode"
//                       className="w-full p-3 border-2 rounded-lg"
//                     />
//                     <ErrorMessage
//                       name="address.pincode"
//                       component="div"
//                       className="text-sm text-red-500"
//                     />
//                   </div>
//                 </div>

//                 <div className="bottom-0 bg-white p-4 border-t rounded-b-3xl">
//                   <button
//                     type="submit"
//                     disabled={isSubmitting || updateProfileMutation.isLoading}
//                     className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
//                   >
//                     {isSubmitting || updateProfileMutation.isLoading ? (
//                       <div className="flex items-center justify-center gap-2">
//                         <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                         <span>Saving...</span>
//                       </div>
//                     ) : (
//                       "Save Changes"
//                     )}
//                   </button>
//                 </div>
//               </Form>
//             );
//           }}
//         </Formik>
//       </div>
//     </div>
//   );
// };

// export default EditProfileModal;

