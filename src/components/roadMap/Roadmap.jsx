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
//     setTypeId(selectedItem.type_id);
//   };

//   const resetPath = () => {
//     setPath([]);
//     setShowSearchPopup(true);
//     setSubTypeOptions([]);
//     setTypeId("");
//   };

//   const navigateTo = (index) => {
//   const selectedItem = path[index];

//   console.log("selectedItem",selectedItem);
  

//   // Slice the path up to the clicked breadcrumb
//   const newPath = path.slice(0, index + 1);
//   setPath(newPath);

//   // Set the current typeId to trigger useQuery API
//   setTypeId(selectedItem.type_id);

//   // Optional: clear previous subType options until new data loads
//   setSubTypeOptions([]);
// };

//   const fetchNextSubTypes = (option) => {
//   if (option.roadmap?.type?._id) {
//     setTypeId(option.roadmap.type._id); // This triggers the query
//   }
// };

// const handleSelect = (option) => {
//   if (!option.roadmap) {
//     Swal.fire({
//       icon: "info",
//       title: "No Further Career Options",
//       text: "There are no further career paths available for this selection.",
//     });
//     return;
//   }

//   console.log("handleSelect option",option);
  

//   const nextType = option.roadmap.type?.type || option.type;
//   const nextId = option.roadmap.type?._id || option.type._id;

//   setPath([...path, { name: nextType, type_id: nextId }]);
//   setSubTypeOptions(option.roadmap.sub_type || []);

//   // Fetch next sub types if available
//   fetchNextSubTypes(option);
// };


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
//                   className={`flex items-center ${index === path.length - 1
//                     ? "font-semibold text-indigo-700"
//                     : "text-indigo-600 hover:text-indigo-800"
//                     }`}
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
//                 ? option.roadmap?.sub_type?.length || 0
//                 : 0;

//               return (
//                 <div
//                   key={option._id}
//                   onClick={() => handleSelect(option)}
//                   className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer bg-white hover:bg-indigo-50"
//                 >
//                   <div className="flex items-start mb-2">
//                     {option.type?.toLowerCase().includes("job") ? (
//                       <FaBriefcase className="text-indigo-600 mr-2 mt-1 text-xl" />
//                     ) : (
//                       <FaGraduationCap className="text-indigo-600 mr-2 mt-1 text-xl" />
//                     )}
//                     <h3 className="text-lg font-semibold text-gray-800">
//                       {option.type}
//                     </h3>
//                   </div>
//                   <div className="flex items-center text-black font-semibold mb-2">
//                     <FaClock className="mr-1" />
//                     <span>
//                       Duration:{" "}
//                       <span className="font-normal text-gray-700">3 year</span>
//                     </span>
//                   </div>

//                   <div
//                     className={`flex items-center mb-2 font-semibold text-black`}
//                   >
//                     <FaLightbulb className="mr-1" />
//                     <span>
//                       Opportunities:{" "}
//                       {hasRoadmap ? (
//                         <span className="font-semibold text-green-800">
//                           {opportunities} future career opportunities
//                         </span>
//                       ) : (
//                         <span className="font-semibold text-red-700">
//                           No future career opportunities.
//                         </span>
//                       )}
//                     </span>
//                   </div>

//                   <p className={`text-sm ${hasRoadmap ? "text-green-800" : "text-red-700"}`}>
//                     {hasRoadmap ? (
//                       <>
//                         Explore paths after{" "}
//                         <span className="font-semibold underline">{option.type}</span>
//                       </>
//                     ) : (
//                       ""
//                     )}
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
//             <li>Click on any option to explore career paths after that qualification</li>
//             <li>Use the breadcrumb navigation at the top to go back to previous steps</li>
//             <li>Click "Start" to reset and begin from the beginning</li>
//             <li>Each card shows the qualification name, duration, and brief description</li>
//             <li>Use the "Restart Roadmap" button to search for a specific career path</li>
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
  FaSearch,
  FaLayerGroup,
  FaRoute,
  FaStar,
  FaRocket,
  FaMedal,
  FaUserTie,
  FaCode,
  FaFlask,
  FaPalette,
  FaChartLine,
  FaUniversity,
  FaHeartbeat
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import SearchRoadmap from "./SearchRoadmap";
import { getSubType } from "./Api";

// Expanded color palette
const COLORS = {
  primary: "#a5b4fc",   // Light Indigo
  secondary: "#c4b5fd", // Light Purple
  accent: "#f9a8d4",    // Light Pink
  success: "#6ee7b7",   // Light Green
  warning: "#fde68a",   // Soft Yellow
  danger: "#fca5a5",    // Soft Red
  info: "#93c5fd",      // Light Blue
  dark: "#475569",      // Cool Gray
  light: "#f1f5f9",     // Very Light Gray
  purple: "#d8b4fe",    // Soft Lavender
  pink: "#fbcfe8",      // Pastel Pink
  indigo: "#c7d2fe",    // Soft Indigo
  blue: "#bfdbfe",      // Light Sky Blue
  teal: "#99f6e4",      // Minty Teal
  emerald: "#a7f3d0",   // Light Emerald
  amber: "#fde68a"      // Pastel Amber
};


// Icon mapping for different career types
const CAREER_ICONS = {
  "engineering": <FaCode className="text-blue-500" />,
  "medical": <FaHeartbeat className="text-red-500" />,
  "design": <FaPalette className="text-purple-500" />,
  "business": <FaChartLine className="text-emerald-500" />,
  "science": <FaFlask className="text-amber-500" />,
  "education": <FaUniversity className="text-indigo-500" />,
  "management": <FaUserTie className="text-teal-500" />,
  "default": <FaBriefcase className="text-gray-500" />
};

const getCareerIcon = (type) => {
  if (!type) return CAREER_ICONS.default;
  
  const lowerType = type.toLowerCase();
  if (lowerType.includes("engineer")) return CAREER_ICONS.engineering;
  if (lowerType.includes("medical") || lowerType.includes("doctor") || lowerType.includes("nurse")) return CAREER_ICONS.medical;
  if (lowerType.includes("design")) return CAREER_ICONS.design;
  if (lowerType.includes("business") || lowerType.includes("manager")) return CAREER_ICONS.business;
  if (lowerType.includes("science") || lowerType.includes("research")) return CAREER_ICONS.science;
  if (lowerType.includes("teacher") || lowerType.includes("professor") || lowerType.includes("education")) return CAREER_ICONS.education;
  if (lowerType.includes("executive") || lowerType.includes("director") || lowerType.includes("ceo")) return CAREER_ICONS.management;
  
  return CAREER_ICONS.default;
};

const RoadmapNode = ({ node, onClick, isLast }) => {
  const isJob = node.type?.toLowerCase().includes("job");
  const careerIcon = getCareerIcon(node.type);
  const colors = [
    "from-purple-300 to-pink-300",
    "from-blue-300 to-teal-300",
    "from-amber-300 to-orange-300",
    "from-emerald-300 to-cyan-300",
    "from-indigo-300 to-violet-300",
    "from-rose-300 to-red-300"
  ];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
      className={`relative p-4 rounded-2xl cursor-pointer transition-all duration-300 overflow-hidden ${isLast ? "ring-2 ring-white shadow-xl" : "shadow-lg hover:shadow-xl"} bg-gradient-to-br ${randomColor}`}
    >
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-16 h-16 rounded-full bg-white/10 -mr-4 -mt-4"></div>
      <div className="absolute bottom-0 left-0 w-12 h-12 rounded-full bg-white/10 -ml-4 -mb-4"></div>
      
      <div className="relative z-10 flex items-start space-x-3">
        <div className={`p-3 rounded-xl bg-white/20 backdrop-blur-sm text-white`}>
          {careerIcon}
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-gray-800">{node.type}</h3>
          {/* <div className="flex items-center mt-2 text-sm text-white/90">
            <FaClock className="mr-1" />
            <span>Duration: ~3 years</span>
          </div> */}
          {node.roadmap && (
            // <div className="mt-2 flex items-center text-sm text-white">
            //   <FaLightbulb className="mr-1" />
            //   <span>{node.roadmap.sub_type?.length || 0} paths available</span>
            // </div>
<div
  className="mt-2 flex items-center text-sm font-semibold text-red-500 drop-shadow-[0_0_16px_#dc2626] animate-pulse"
  style={{ animationDuration: '700ms', animationTimingFunction: 'linear' }}
>
  <FaLightbulb
    className="mr-2 text-red-600 drop-shadow-[0_0_20px_#dc2626] animate-pulse"
    style={{ animationDuration: '700ms', animationTimingFunction: 'linear' }}
  />
  <span
    className="text-black drop-shadow-[0_0_10px_#dc2626] tracking-wide uppercase animate-pulse"
    style={{ animationDuration: '700ms', animationTimingFunction: 'linear' }}
  >
    {node.roadmap.sub_type?.length || 0} paths available
  </span>
</div>

          )}
        </div>
      </div>
      
      {!isLast && (
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
          <motion.div 
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="text-white/80"
          >
            <FaChevronRight />
          </motion.div>
        </div>
      )}
      
      {isLast && (
        <div className="absolute top-2 right-2 text-yellow-300">
          <FaStar />
        </div>
      )}
    </motion.div>
  );
};

const PathBreadcrumb = ({ item, index, isActive, onClick }) => {
  const colors = [
    "bg-indigo-500 text-white",
    "bg-purple-500 text-white",
    "bg-pink-500 text-white",
    "bg-blue-500 text-white",
    "bg-teal-500 text-white",
    "bg-emerald-500 text-white",
    "bg-amber-500 text-white"
  ];
  const colorClass = colors[index % colors.length] || colors[0];
  
  return (
    <motion.div 
      whileHover={{ scale: 1.05 }}
      className="flex items-center"
    >
      <button
        onClick={onClick}
        className={`flex items-center px-4 py-2 rounded-full ${isActive ? "ring-2 ring-white ring-offset-2 shadow-lg " + colorClass : colorClass + " opacity-80 hover:opacity-100"}`}
      >
        {index === 0 && <FaHome className="mr-2" />}
        <span>{item.name}</span>
        {isActive && <FaMedal className="ml-2" />}
      </button>
      {!isActive && (
        <FaChevronRight className="mx-2 text-gray-400" />
      )}
    </motion.div>
  );
};

const WavyPath = ({ path }) => {
  return (
    <div className="relative h-44 w-full my-4 overflow-hidden">
      {/* Wavy line */}
      <svg 
        viewBox="0 0 1200 300" 
        className="absolute top-0 left-0 w-full h-full"
        preserveAspectRatio="none"
      >
        <path 
          d="M0,150 C150,50 450,250 600,150 C750,50 1050,250 1200,150" 
          stroke="url(#gradient)"
          strokeWidth="8"
          fill="none"
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="50%" stopColor="#ec4899" />
            <stop offset="100%" stopColor="#6366f1" />
          </linearGradient>
        </defs>
      </svg>
      
      {/* Checkpoints along the wavy path */}
      {path.map((step, index) => {
        const position = (index + 1) / (path.length + 1) * 100;
        const colors = ["#8b5cf6", "#ec4899", "#6366f1", "#3b82f6", "#10b981", "#f59e0b"];
        const color = colors[index % colors.length];
        
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.2 }}
            className="absolute"
            style={{
              left: `${position}%`,
              top: `calc(50% - 40px + ${Math.sin(index) * 30}px)`,
              transform: 'translateX(-50%)'
            }}
          >
            <div 
              className={`w-12 h-12 rounded-full flex items-center justify-center text-white shadow-xl`}
              style={{ 
                backgroundColor: color,
                border: '3px solid white'
              }}
            >
              {index === 0 ? <FaGraduationCap /> : 
               index === path.length - 1 ? <FaRocket /> : 
               <FaBriefcase />}
            </div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-center mt-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md shadow-sm"
            >
              <p className="text-xs font-semibold text-gray-800">{step.name}</p>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
};

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
      setTimeout(() => {
        setShowSearchPopup(true);
      }, 1000);
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
    const newPath = path.slice(0, index + 1);
    setPath(newPath);
    setTypeId(selectedItem.type_id);
    setSubTypeOptions([]);
  };

  const fetchNextSubTypes = (option) => {
    if (option.roadmap?.type?._id) {
      setTypeId(option.roadmap.type._id);
    }
  };

  const handleSelect = (option) => {
    if (!option.roadmap) {
      Swal.fire({
        icon: "info",
        title: "Destination Reached!",
        text: "You've arrived at your career destination. Consider specializing or exploring related fields.",
        background: '#fff',
        color: COLORS.dark,
        confirmButtonColor: COLORS.purple,
      });
      return;
    }

    const nextType = option.roadmap.type?.type || option.type;
    const nextId = option.roadmap.type?._id || option.type._id;

    setPath([...path, { name: nextType, type_id: nextId }]);
    setSubTypeOptions(option.roadmap.sub_type || []);
    fetchNextSubTypes(option);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {showSearchPopup && (
        <SearchRoadmap
          onClose={() => setShowSearchPopup(false)}
          onSelect={handleSearchSelect}
          setTypeId={setTypeId}
        />
      )}

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, repeatType: "reverse", duration: 3 }}
            className="inline-flex items-center justify-center p-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full mb-4 shadow-lg"
          >
            <FaRoute className="text-white text-3xl" />
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-3 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-pink-500">
            Career Path
          </h1>
        </motion.header>

        {/* Controls */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowSearchPopup(true)}
            className="flex items-center gap-2 bg-white text-indigo-600 px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all border-2 border-indigo-200"
          >
            <FaSearch className="text-indigo-500" />
            <span className="font-medium">Search Career Path</span>
          </motion.button>
          
          {path.length > 0 && (
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={resetPath}
              className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all"
            >
              <FaRedo />
              <span className="font-medium">Start New Journey</span>
            </motion.button>
          )}
        </div>

        {/* Wavy Path Visualization */}
        {path.length > 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-0"
          >
            <h2 className="text-2xl font-semibold text-gray-700 mb-2 flex items-center justify-center">
              <FaLayerGroup className="mr-3 text-indigo-500" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-pink-500">
                Your Career Journey
              </span>
            </h2>
            <WavyPath path={path} />
          </motion.div>
        )}

        {/* Breadcrumb Navigation */}
        {path.length > 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8 bg-white/80 backdrop-blur-sm p-4 rounded-2xl shadow-sm"
          >
            <div className="flex flex-wrap items-center justify-center gap-2">
              <PathBreadcrumb 
                item={{ name: "Start" }} 
                index={-1} 
                onClick={resetPath}
                isActive={false}
              />
              {path.map((item, index) => (
                <PathBreadcrumb 
                  key={index}
                  item={item}
                  index={index}
                  onClick={() => navigateTo(index)}
                  isActive={index === path.length - 1}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Options Section */}
        <motion.section 
          layout
          className="mb-12"
        >
          <h2 className="text-2xl font-semibold text-gray-700 mb-6 flex items-center justify-center">
            {path.length === 0 ? (
              <>
                <FaGraduationCap className="mr-3 text-indigo-500" />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-pink-500">
                  Begin Your Professional Adventure
                </span>
              </>
            ) : (
              <>
                {/* <FaArrowRight className="mr-3 text-indigo-500" /> */}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-pink-500">
                  Next Steps After {path[path.length - 1]?.name}
                </span>
              </>
            )}
          </h2>

          {subTypeOption.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {subTypeOption.map((option, idx) => (
                <RoadmapNode 
                  key={option._id} 
                  node={option} 
                  onClick={() => handleSelect(option)}
                  isLast={!option.roadmap}
                />
              ))}
            </div>
          ) : path.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl p-8 text-center shadow-xl max-w-2xl mx-auto border-2 border-indigo-100"
            >
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="inline-flex p-4 bg-gradient-to-r from-indigo-100 to-pink-100 rounded-full mb-4 shadow-md"
              >
                <FaSearch className="text-indigo-600 text-3xl" />
              </motion.div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Start Exploring Career Paths</h3>
              <p className="text-gray-600 mb-6 text-lg">
                Discover your ideal career trajectory with our interactive roadmap explorer
              </p>
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowSearchPopup(true)}
                className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all text-lg font-medium"
              >
                Begin Your Journey
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-2xl p-8 text-center shadow-xl max-w-2xl mx-auto border-2 border-green-100"
            >
              <div className="inline-flex p-4 bg-gradient-to-r from-green-100 to-teal-100 rounded-full mb-4 shadow-md">
                <FaRocket className="text-green-600 text-3xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Destination Achieved!</h3>
              <p className="text-gray-600 mb-6 text-lg">
                You've reached {path[path.length - 1]?.name}. This could be your dream career destination!
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={resetPath}
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all font-medium"
                >
                  Explore New Path
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigateTo(path.length - 2)}
                  className="bg-white text-indigo-600 px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all font-medium border-2 border-indigo-200"
                >
                  Go Back One Step
                </motion.button>
              </div>
            </motion.div>
          )}
        </motion.section>

        {/* Info Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-3xl p-8 text-white shadow-2xl"
        >
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-4 flex items-center">
                <FaLightbulb className="mr-3 text-yellow-300" />
                How to Navigate Your Career Journey
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center bg-white/20 rounded-full p-2 mr-4">
                    <FaSearch className="text-white" />
                  </span>
                  <span className="text-lg">Search for specific careers or browse our suggestions</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center bg-white/20 rounded-full p-2 mr-4">
                    <FaChevronRight className="text-white" />
                  </span>
                  <span className="text-lg">Click on any career node to explore subsequent options</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center bg-white/20 rounded-full p-2 mr-4">
                    <FaHome className="text-white" />
                  </span>
                  <span className="text-lg">Use the breadcrumbs to navigate back to previous steps</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center bg-white/20 rounded-full p-2 mr-4">
                    <FaRedo className="text-white" />
                  </span>
                  <span className="text-lg">Start over anytime to explore different career trajectories</span>
                </li>
              </ul>
            </div>
            <div className="hidden md:block flex-1">
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );

  
}

