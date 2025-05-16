// import { useState, useEffect } from "react";
// import {
//   FaGraduationCap,
//   FaBriefcase,
//   FaArrowRight,
//   FaClock,
//   FaChevronRight,
//   FaHome,
//   FaRedo,
//   FaLightbulb,
// } from "react-icons/fa";
// import { useQuery } from "@tanstack/react-query";
// import Swal from "sweetalert2";
// import SearchRoadmap from "./SearchRoadmap";
// import { getSubType } from "./Api";

// export default function Roadmap() {
//   const [path, setPath] = useState([]);
//   const [showSearchPopup, setShowSearchPopup] = useState(false);
//   const [typeId, setTypeId] = useState("");
//   const [subTypeOption, setSubTypeOptions] = useState([]);

//   const { data: subTypes } = useQuery({
//     queryKey: ["subType", typeId],
//     queryFn: () => getSubType(typeId),
//     enabled: !!typeId,
//   });

//   useEffect(() => {
//     if (subTypes?.data?.data) {
//       setSubTypeOptions(subTypes.data.data);
//     }
//   }, [subTypes]);

//   useEffect(() => {
//     const visited = localStorage.getItem("visitedRoadmap");
//     if (!visited) {
//       setShowSearchPopup(true);
//       localStorage.setItem("visitedRoadmap", "true");
//     }
//   }, []);

//   const handleSearchSelect = (selectedItem) => {
//     setPath([selectedItem]);
//   };

//   const resetPath = () => {
//     setPath([]);
//     setShowSearchPopup(true);
//     setSubTypeOptions([]);
//   };

//   const navigateTo = (index) => {
//     setPath(path.slice(0, index + 1));
//   };

//   const handleSelect = (option) => {
//     if (!option.roadmap) {
//       Swal.fire({
//         icon: "info",
//         title: "No Further Career Options",
//         text: "There are no further career paths available for this selection.",
//       });
//       return;
//     }

//     const nextType = option.roadmap.type?.type || option.type;
//     const nextId = option.roadmap.type?.type_id || option.type_id;
//     setPath([...path, { name: nextType, type_id: nextId }]);
//     setSubTypeOptions(option.roadmap.sub_type || []);
//   };

//   return (
//     <>
//       {showSearchPopup && (
//         <SearchRoadmap
//           onClose={() => setShowSearchPopup(false)}
//           onSelect={handleSearchSelect}
//           setTypeId={setTypeId}
//         />
//       )}
//       <div className="max-w-6xl mx-auto p-4 md:p-6 relative">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center">
//             <FaGraduationCap className="mr-2 text-indigo-600" />
//             Career Roadmap Explorer
//           </h1>
//           <button
//             onClick={resetPath}
//             className="flex items-center gap-1 bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded-lg transition-colors"
//           >
//             <FaRedo className="text-sm" />
//             <span>Restart Roadmap</span>
//           </button>
//         </div>

//         {/* Breadcrumb Navigation */}
//         <div className="mb-6 bg-gray-50 p-3 rounded-lg shadow-sm">
//           <div className="flex items-center flex-wrap">
//             <button
//               onClick={resetPath}
//               className="flex items-center text-indigo-600 hover:text-indigo-800 font-medium"
//             >
//               <FaHome className="mr-1" />
//               <span>Start</span>
//             </button>
//             {path.map((item, index) => (
//               <div key={index} className="flex items-center">
//                 <FaChevronRight className="mx-2 text-gray-400" />
//                 <button
//                   onClick={() => navigateTo(index)}
//                   className={`flex items-center ${
//                     index === path.length - 1
//                       ? "font-semibold text-indigo-700"
//                       : "text-indigo-600 hover:text-indigo-800"
//                   }`}
//                 >
//                   {item.name}
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Current Path Display */}
//         {path.length > 0 && (
//           <div className="mb-6">
//             <h2 className="text-xl font-semibold text-gray-700 mb-2">
//               Your Current Path:
//             </h2>
//             <div className="flex items-center flex-wrap bg-indigo-50 p-4 rounded-lg">
//               {path.map((step, index) => (
//                 <div key={index} className="flex items-center">
//                   <span className="font-medium text-indigo-700">{step.name}</span>
//                   {index < path.length - 1 && (
//                     <FaArrowRight className="mx-2 text-gray-400" />
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Options Grid */}
//         <div className="mb-8">
//           <h2 className="text-xl font-semibold text-gray-700 mb-4">
//             {path.length === 0
//               ? "Select Your Starting Point"
//               : `Options after ${path[path.length - 1]?.name}`}
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//             {subTypeOption.map((option) => {
//               const hasRoadmap = !!option.roadmap;
//               const opportunities = hasRoadmap
//                 ? option.roadmap.sub_type?.length || 0
//                 : 0;
//               return (
//                 <div
//                   key={option._id}
//                   onClick={() => handleSelect(option)}
//                   className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer bg-white hover:bg-indigo-50"
//                 >
//                   <div className="flex items-start mb-2">
//                     {option.type.toLowerCase().includes("job") ? (
//                       <FaBriefcase className="text-indigo-600 mr-2 mt-1 text-xl" />
//                     ) : (
//                       <FaGraduationCap className="text-indigo-600 mr-2 mt-1 text-xl" />
//                     )}
//                     <h3 className="text-lg font-semibold text-gray-800">
//                       {option.type}
//                     </h3>
//                   </div>
//                   <div className="flex items-center text-gray-600 mb-2">
//                     <FaClock className="mr-1" />
//                     <span>Duration: 3 year</span>
//                   </div>
//                   <div className="flex items-center text-gray-600 mb-2">
//                     <FaLightbulb className="mr-1" />
//                     <span>
//                       Opportunities:{" "}
//                       {hasRoadmap
//                         ? `${opportunities} future career opportunities`
//                         : "No future career opportunities."}
//                     </span>
//                   </div>
//                   <p className="text-gray-600">
//                     {hasRoadmap
//                       ? `Explore paths after ${option.type}`
//                       : "No further career path data available for this selection."}
//                   </p>
//                   <div className="mt-3 flex justify-end">
//                     <span className="text-indigo-600 flex items-center text-sm font-medium">
//                       Explore <FaArrowRight className="ml-1" />
//                     </span>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>

//         {/* Instructions */}
//         <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mt-6">
//           <h3 className="font-semibold text-gray-700 mb-2">
//             How to use this roadmap:
//           </h3>
//           <ul className="list-disc pl-5 text-gray-600 space-y-1">
//             <li>
//               Click on any option to explore career paths after that
//               qualification
//             </li>
//             <li>
//               Use the breadcrumb navigation at the top to go back to previous
//               steps
//             </li>
//             <li>Click "Start" to reset and begin from the beginning</li>
//             <li>
//               Each card shows the qualification name, duration, and brief
//               description
//             </li>
//             <li>
//               Use the "Restart Roadmap" button to search for a specific career
//               path
//             </li>
//           </ul>
//         </div>
//       </div>
//     </>
//   );
// }


import { useState, useEffect } from "react";
import {
  FaGraduationCap,
  FaBriefcase,
  FaArrowRight,
  FaClock,
  FaChevronRight,
  FaHome,
  FaRedo,
  FaLightbulb,
} from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import SearchRoadmap from "./SearchRoadmap";
import { getSubType } from "./Api";

export default function Roadmap() {
  const [path, setPath] = useState([]);
  const [showSearchPopup, setShowSearchPopup] = useState(false);
  const [typeId, setTypeId] = useState("");
  const [subTypeOption, setSubTypeOptions] = useState([]);

  const { data: subTypes } = useQuery({
    queryKey: ["subType", typeId],
    queryFn: () => getSubType(typeId),
    enabled: !!typeId,
  });
  
  useEffect(() => {
    if (subTypes?.data?.data) {
      setSubTypeOptions(subTypes.data.data);
    }
  }, [subTypes]);

  useEffect(() => {
    const visited = localStorage.getItem("visitedRoadmap");
    if (!visited) {
      setShowSearchPopup(true);
      localStorage.setItem("visitedRoadmap", "true");
    }
  }, []);

  const handleSearchSelect = (selectedItem) => {
    setPath([selectedItem]);
    setTypeId(selectedItem.type_id);
  };

  const resetPath = () => {
    setPath([]);
    setShowSearchPopup(true);
    setSubTypeOptions([]);
    setTypeId("");
  };

  const navigateTo = (index) => {
  const selectedItem = path[index];

  console.log("selectedItem",selectedItem);
  

  // Slice the path up to the clicked breadcrumb
  const newPath = path.slice(0, index + 1);
  setPath(newPath);

  // Set the current typeId to trigger useQuery API
  setTypeId(selectedItem.type_id);

  // Optional: clear previous subType options until new data loads
  setSubTypeOptions([]);
};

  const fetchNextSubTypes = (option) => {
  if (option.roadmap?.type?._id) {
    setTypeId(option.roadmap.type._id); // This triggers the query
  }
};

const handleSelect = (option) => {
  if (!option.roadmap) {
    Swal.fire({
      icon: "info",
      title: "No Further Career Options",
      text: "There are no further career paths available for this selection.",
    });
    return;
  }

  console.log("handleSelect option",option);
  

  const nextType = option.roadmap.type?.type || option.type;
  const nextId = option.roadmap.type?._id || option.type._id;

  setPath([...path, { name: nextType, type_id: nextId }]);
  setSubTypeOptions(option.roadmap.sub_type || []);

  // Fetch next sub types if available
  fetchNextSubTypes(option);
};


  return (
    <>
      {showSearchPopup && (
        <SearchRoadmap
          onClose={() => setShowSearchPopup(false)}
          onSelect={handleSearchSelect}
          setTypeId={setTypeId}
        />
      )}

      <div className="max-w-6xl mx-auto p-4 md:p-6 relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center">
            <FaGraduationCap className="mr-2 text-indigo-600" />
            Career Roadmap Explorer
          </h1>
          <button
            onClick={resetPath}
            className="flex items-center gap-1 bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded-lg transition-colors"
          >
            <FaRedo className="text-sm" />
            <span>Restart Roadmap</span>
          </button>
        </div>

        {/* Breadcrumb Navigation */}
        <div className="mb-6 bg-gray-50 p-3 rounded-lg shadow-sm">
          <div className="flex items-center flex-wrap">
            <button
              onClick={resetPath}
              className="flex items-center text-indigo-600 hover:text-indigo-800 font-medium"
            >
              <FaHome className="mr-1" />
              <span>Start</span>
            </button>
            {path.map((item, index) => (
              <div key={index} className="flex items-center">
                <FaChevronRight className="mx-2 text-gray-400" />
                <button
                  onClick={() => navigateTo(index)}
                  className={`flex items-center ${index === path.length - 1
                    ? "font-semibold text-indigo-700"
                    : "text-indigo-600 hover:text-indigo-800"
                    }`}
                >
                  {item.name}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Current Path Display */}
        {path.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Your Current Path:
            </h2>
            <div className="flex items-center flex-wrap bg-indigo-50 p-4 rounded-lg">
              {path.map((step, index) => (
                <div key={index} className="flex items-center">
                  <span className="font-medium text-indigo-700">{step.name}</span>
                  {index < path.length - 1 && (
                    <FaArrowRight className="mx-2 text-gray-400" />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Options Grid */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            {path.length === 0
              ? "Select Your Starting Point"
              : `Options after ${path[path.length - 1]?.name}`}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {subTypeOption.map((option) => {
              const hasRoadmap = !!option.roadmap;
              const opportunities = hasRoadmap
                ? option.roadmap?.sub_type?.length || 0
                : 0;

              return (
                <div
                  key={option._id}
                  onClick={() => handleSelect(option)}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer bg-white hover:bg-indigo-50"
                >
                  <div className="flex items-start mb-2">
                    {option.type?.toLowerCase().includes("job") ? (
                      <FaBriefcase className="text-indigo-600 mr-2 mt-1 text-xl" />
                    ) : (
                      <FaGraduationCap className="text-indigo-600 mr-2 mt-1 text-xl" />
                    )}
                    <h3 className="text-lg font-semibold text-gray-800">
                      {option.type}
                    </h3>
                  </div>
                  <div className="flex items-center text-black font-semibold mb-2">
                    <FaClock className="mr-1" />
                    <span>
                      Duration:{" "}
                      <span className="font-normal text-gray-700">3 year</span>
                    </span>
                  </div>

                  <div
                    className={`flex items-center mb-2 font-semibold text-black`}
                  >
                    <FaLightbulb className="mr-1" />
                    <span>
                      Opportunities:{" "}
                      {hasRoadmap ? (
                        <span className="font-semibold text-green-800">
                          {opportunities} future career opportunities
                        </span>
                      ) : (
                        <span className="font-semibold text-red-700">
                          No future career opportunities.
                        </span>
                      )}
                    </span>
                  </div>

                  <p className={`text-sm ${hasRoadmap ? "text-green-800" : "text-red-700"}`}>
                    {hasRoadmap ? (
                      <>
                        Explore paths after{" "}
                        <span className="font-semibold underline">{option.type}</span>
                      </>
                    ) : (
                      ""
                    )}
                  </p>


                  <div className="mt-3 flex justify-end">
                    <span className="text-indigo-600 flex items-center text-sm font-medium">
                      Explore <FaArrowRight className="ml-1" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mt-6">
          <h3 className="font-semibold text-gray-700 mb-2">
            How to use this roadmap:
          </h3>
          <ul className="list-disc pl-5 text-gray-600 space-y-1">
            <li>Click on any option to explore career paths after that qualification</li>
            <li>Use the breadcrumb navigation at the top to go back to previous steps</li>
            <li>Click "Start" to reset and begin from the beginning</li>
            <li>Each card shows the qualification name, duration, and brief description</li>
            <li>Use the "Restart Roadmap" button to search for a specific career path</li>
          </ul>
        </div>
      </div>
    </>
  );
}
