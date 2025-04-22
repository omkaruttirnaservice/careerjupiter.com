// import { useState } from "react";

// import { Field, ErrorMessage } from "formik";
// import { educationOptions } from "../../Constant/constantData";

// import { FaEye, FaEyeSlash } from "react-icons/fa";
// export default function ProfileForm({
//   requirement,
//   isLoading,
//   showAskLater,
//   onAskLater,
// }) {
//   const [showPassword, setShowPassword] = useState(false);

//   return (
//     <div className="space-y-4">
//       {requirement === "firstName" && (
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             First Name
//           </label>
//           <Field
//             name="f_name"
//             type="text"
//             placeholder="Enter your first name"
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
//           />
//           <ErrorMessage
//             name="f_name"
//             component="div"
//             className="text-red-500 text-sm mt-1"
//           />
//         </div>
//       )}

//       {requirement === "lastName" && (
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Last Name
//           </label>
//           <Field
//             name="l_name"
//             type="text"
//             placeholder="Enter your last name"
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
//           />
//           <ErrorMessage
//             name="l_name"
//             component="div"
//             className="text-red-500 text-sm mt-1"
//           />
//         </div>
//       )}

//       {requirement === "education" && (
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Current Education
//           </label>
//           <Field
//             name="info.current_education"
//             as="select"
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
//           >
//             <option value="">Select your education</option>
//             {educationOptions.map((option) => (
//               <option key={option} value={option}>
//                 {option}
//               </option>
//             ))}
//           </Field>
//           <ErrorMessage
//             name="info.current_education"
//             component="div"
//             className="text-red-500 text-sm mt-1"
//           />
//         </div>
//       )}
//       {requirement === "password" && (
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Password
//           </label>
//           <div className="relative">
//             <Field
//               name="password"
//               type={showPassword ? "text" : "password"}
//               placeholder="Enter your Password"
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
//             />
//             <button
//               type="button"
//               className="absolute inset-y-0 right-0 pr-3 flex items-center"
//               onClick={() => setShowPassword(!showPassword)}
//             >
//               {showPassword ? (
//                 <FaEyeSlash className="h-5 w-5 text-gray-500" />
//               ) : (
//                 <FaEye className="h-5 w-5 text-gray-500" />
//               )}
//             </button>
//           </div>
//           <ErrorMessage
//             name="password"
//             component="div"
//             className="text-red-500 text-sm mt-1"
//           />
//         </div>
//       )}

//       <div className="flex gap-3 pt-2">
//         <button
//           type="submit"
//           disabled={isLoading}
//           className={`flex-1 px-4 py-2 rounded-lg font-medium transition ${
//             isLoading
//               ? "bg-blue-400 cursor-wait"
//               : "bg-blue-600 text-white hover:bg-blue-700"
//           }`}
//         >
//           {isLoading ? "Saving..." : "Save"}
//         </button>

//         {showAskLater && (
//           <button
//             type="button"
//             onClick={onAskLater}
//             className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition"
//           >
//             Ask Me Later
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }


import { useState } from "react"
import { Field, ErrorMessage } from "formik"
import { educationOptions } from "../../Constant/constantData"
import { FaEye, FaEyeSlash } from "react-icons/fa"

export default function ProfileForm({ isLoading, showAskLater, onAskLater }) {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  return (
    <div className="space-y-4">
      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
        <Field
          name="f_name"
          type="text"
          placeholder="Enter your full name"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
        />
        <ErrorMessage name="f_name" component="div" className="text-red-500 text-sm mt-1" />
      </div>

      {/* Education */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Current Education</label>
        <Field
          name="info.education"
          as="select"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
        >
          <option value="">Select your education</option>
          {educationOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </Field>
        <ErrorMessage name="info.education" component="div" className="text-red-500 text-sm mt-1" />
      </div>

      {/* Password */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <div className="relative">
          <Field
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <FaEyeSlash className="h-5 w-5 text-gray-500" />
            ) : (
              <FaEye className="h-5 w-5 text-gray-500" />
            )}
          </button>
        </div>
        <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
      </div>

      {/* Confirm Password */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
        <div className="relative">
          <Field
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Re-enter your password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? (
              <FaEyeSlash className="h-5 w-5 text-gray-500" />
            ) : (
              <FaEye className="h-5 w-5 text-gray-500" />
            )}
          </button>
        </div>
        <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm mt-1" />
      </div>

      {/* Buttons */}
      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={isLoading}
          className={`flex-1 px-4 py-2 rounded-lg font-medium transition ${
            isLoading ? "bg-blue-400 cursor-wait" : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {isLoading ? "Saving..." : "Save"}
        </button>

        {showAskLater && (
          <button
            type="button"
            onClick={onAskLater}
            className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-red-400 transition"
          >
            CLOSE
          </button>
        )}
      </div>
    </div>
  )
}
