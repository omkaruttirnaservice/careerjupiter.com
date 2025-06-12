// import React from "react";
// import { MapPin, Medal } from "lucide-react"; // Importing icons
// import Lotify from "../TestComp/Lotify";
// import { BASE_URL } from "../../utils/constansts";

// const UniversityCard = ({ university, onClick }) => {
//   return (
//     <div
//       onClick={onClick}
//       className="relative overflow-hidden bg-white rounded-lg shadow-lg
//                  transition-transform transform hover:-translate-y-2 hover:shadow-2xl
//                  cursor-pointer"
//     >
//       {/* Image Container */}
//       <div className="h-48 overflow-hidden relative">
//         <img
//   src={`${BASE_URL}${university.image}`}
//   alt={university.name}
//   className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
//   onError={(e) => {
//     e.target.onerror = null;

//     const encodedName = encodeURIComponent(university.name || "No Image");
//     e.target.src = `data:image/svg+xml;charset=UTF-8,
//       %3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 200'%3E
//         %3Crect width='100%25' height='100%25' fill='%23667eea'/%3E
//         %3Ctext x='50%25' y='50%25' dominant-baseline='middle'
//           text-anchor='middle' font-size='20' fill='white'%3E${encodedName}%3C/text%3E
//       %3C/svg%3E`;
//   }}
// />
//       </div>

//       {/* Card Content */}
//       <div className="p-4">
//         <div className="flex flex-row items-center justify-between">
//           <h3 className="text-lg mb-1">{university.universityName}</h3>
//           <span className="bg-green-100 text-green-600 text-xs md:text-sm font-medium px-3 py-1 rounded-full">
//             {university.category}
//           </span>
//         </div>
       

//         {university.address && (
//           <div className="flex items-center text-gray-500 text-sm ">
//             <span className="w-6 h-6 mr-1">
//               <Lotify icon="\Lottiefiles\Animation - 1742988929198 (1).json" />
//             </span>
//             <span>
//               {university.address.line1}, {university.address.line2},{" "}
//               {university.address.taluka}, {university.address.dist},{" "}
//               {university.address.state}
//             </span>
//           </div>
//         )}
//       </div>

//       <div className="flex flex-wrap gap-2 mb-3 ml-4">
//         {university.accreditation?.map((item, index) => (
//           <span
//             key={index}
//             className="bg-blue-100 text-blue-600 text-xs md:text-sm font-medium px-3 py-1 rounded-full"
//           >
//             {item}
//           </span>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default UniversityCard;

import Lotify from "../TestComp/Lotify"
import { BASE_URL } from "../../utils/constansts"
import { useEffect, useState } from "react"

const UniversityCard = ({ university, onClick, isNewItem }) => {
  const [highlight, setHighlight] = useState(false)

  useEffect(() => {
    if (isNewItem) {
      setHighlight(true)
      const timer = setTimeout(() => {
        setHighlight(false)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [isNewItem])

  return (
    <div
      onClick={onClick}
      className={`relative overflow-hidden bg-white rounded-lg shadow-lg
                 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl
                 cursor-pointer ${highlight ? "ring-2 ring-blue-500 shadow-blue-200" : ""}`}
    >
      {isNewItem && (
        <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10 animate-pulse">
          New
        </div>
      )}

      {/* Image Container */}
      <div className="h-48 overflow-hidden relative">
        <img
          src={`${BASE_URL}${university.image}`}
          alt={university.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          onError={(e) => {
            e.target.onerror = null
            const encodedName = encodeURIComponent(university.name || "No Image")
            e.target.src = `data:image/svg+xml;charset=UTF-8,
              %3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 200'%3E
                %3Crect width='100%25' height='100%25' fill='%23667eea'/%3E
                %3Ctext x='50%25' y='50%25' dominantBaseline='middle'
                  textAnchor='middle' fontSize='20' fill='white'%3E${encodedName}%3C/text%3E
              %3C/svg%3E`
          }}
        />
      </div>

      {/* Card Content */}
      <div className="p-4">
        <div className="flex flex-row items-center justify-between">
          <h3 className="text-lg mb-1">{university.universityName}</h3>
          <span className="bg-green-100 text-green-600 text-xs md:text-sm font-medium px-3 py-1 rounded-full">
            {university.category}
          </span>
        </div>

        {university.address && (
          <div className="flex items-center text-gray-500 text-sm">
            <span className="w-6 h-6 mr-1">
              <Lotify icon="\Lottiefiles\Animation - 1742988929198 (1).json" />
            </span>
            <span>
              {university.address.line1}, {university.address.line2}, {university.address.taluka},{" "}
              {university.address.dist}, {university.address.state}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-2 mb-3 ml-4">
        {university.accreditation?.map((item, index) => (
          <span key={index} className="bg-blue-100 text-blue-600 text-xs md:text-sm font-medium px-3 py-1 rounded-full">
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

export default UniversityCard
