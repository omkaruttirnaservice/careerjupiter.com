// const Roadmap = () => {
//      const timelineData = [
//        {
//          week: 1,
//          title: "Back End Developer",
//          details: "C#, Asp.net, VB.Net, Net Core",
//          side: "left",
//        },
//        {
//          week: 2,
//          title: "Front End Developer",
//          details: "HTML, CSS, Bootstrap, Javascript, jQuery",
//          side: "right",
//        },
//        {
//          week: 3,
//          title: "Software Testing",
//          details: "Manual Testing, Selenium",
//          side: "left",
//        },
//        {
//          week: 4,
//          title: "Database",
//          details: "ADO.net, MySQL Server",
//          side: "right",
//        },
//        {
//          week: 5,
//          title: "Capstone Project",
//          details: "Full Stack Project",
//          side: "left",
//        },
//        {
//          week: 6,
//          title: "Cloud Computing",
//          details: "AWS/AZURE/GCP",
//          side: "right",
//        },
//        {
//          week: 7,
//          title: "Interview Preparation",
//          details: "Mock Interviews, Mini Projects",
//          side: "left",
//        },
//        {
//          week: 8,
//          title: "Training",
//          details: "Hands-On Job Training",
//          side: "right",
//        },
//        {
//          week: 9,
//          title: "Ready To Deploy",
//          details: "Job Ready",
//          side: "left",
//        },
//      ];

//        const colors = [
//          "bg-green-200 text-green-800",
//          "bg-blue-200 text-blue-800",
//          "bg-yellow-200 text-yellow-800",
//          "bg-purple-200 text-purple-800",
//        ];

//   return (
//     <>
//       <div className="flex flex-col items-center bg-gray-50 py-10 px-5">
//         <div className="flex flex-col items-center mb-10">
//           <div className="w-16 h-16 rounded-full bg-yellow-400 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
//             👤
//           </div>
//           <h2 className="text-2xl font-semibold mt-3 text-gray-700">Learner</h2>
//         </div>

//         <div className="relative w-full max-w-2xl">
//           <div className="absolute top-0 bottom-0 left-1/2 w-[3px] bg-gray-300 transform -translate-x-1/2 md:block hidden"></div>

//           {timelineData.map((item, index) => {
//             const colorClass = colors[index % colors.length]; // Pick color dynamically
//             const isLeft = index % 2 === 0; // Alternate side dynamically

//             return (
//               <div
//                 key={index}
//                 className={`flex flex-col md:flex-row ${isLeft ? "md:justify-start" : "md:justify-end"} items-center mb-12 relative`}
//               >
//                 <div
//                   className={`${colorClass} font-semibold px-4 py-1 rounded-md shadow-md mb-4 md:mb-0`}
//                 >
//                   Week {item.week}
//                 </div>

//                 <div
//                   className={`bg-white p-5 shadow-md rounded-lg w-full md:w-50 border-l-4 md:ml-4 ${isLeft ? "border-blue-500" : "border-green-500"} ${isLeft ? "md:ml-4" : "md:mr-4"}`}
//                 >
//                   <h3 className="font-semibold text-lg text-gray-800">
//                     {item.title}
//                   </h3>
//                   <p className="text-gray-600 text-sm mt-1">{item.details}</p>
//                 </div>

//                 <div className="w-6 h-6 bg-blue-500 rounded-full absolute left-1/2 transform -translate-x-1/2 border-4 border-white md:block hidden"></div>
//               </div>
//             );
//           })}
//         </div>

//         <div className="flex flex-col items-center mt-10">
//           <div className="w-16 h-16 rounded-full bg-yellow-500 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
//             🎓
//           </div>
//           <h2 className="text-2xl font-semibold mt-3 text-gray-700">
//             Ready Resource
//           </h2>
//         </div>
//       </div>
//       ;
//     </>
//   );
// };

// export default Roadmap;

import React, { useState } from "react";

const Roadmap = () => {
  const [activeWeek, setActiveWeek] = useState(1); // Start with week 1

  const timelineData = [
    {
      week: 1,
      title: "Back End Developer",
      details: "C#, Asp.net, VB.Net, Net Core",
      side: "left",
    },
    {
      week: 2,
      title: "Front End Developer",
      details: "HTML, CSS, Bootstrap, Javascript, jQuery",
      side: "right",
    },
    {
      week: 3,
      title: "Software Testing",
      details: "Manual Testing, Selenium",
      side: "left",
    },
    {
      week: 4,
      title: "Database",
      details: "ADO.net, MySQL Server",
      side: "right",
    },
    {
      week: 5,
      title: "Capstone Project",
      details: "Full Stack Project",
      side: "left",
    },
    {
      week: 6,
      title: "Cloud Computing",
      details: "AWS/AZURE/GCP",
      side: "right",
    },
    {
      week: 7,
      title: "Interview Preparation",
      details: "Mock Interviews, Mini Projects",
      side: "left",
    },
    {
      week: 8,
      title: "Training",
      details: "Hands-On Job Training",
      side: "right",
    },
    {
      week: 9,
      title: "Ready To Deploy",
      details: "Job Ready",
      side: "left",
    },
  ];

  const colors = [
    "bg-green-200 text-green-800",
    "bg-blue-200 text-blue-800",
    "bg-yellow-200 text-yellow-800",
    "bg-purple-200 text-purple-800",
  ];

  return (
    <>
      <div className="flex flex-col items-center bg-gray-50 py-10 px-5">
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 rounded-full bg-yellow-400 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
            👤
          </div>
          <h2 className="text-2xl font-semibold mt-3 text-gray-700">Learner</h2>
        </div>

        <div className="relative w-full max-w-2xl">
          <div className="absolute top-0 bottom-0 left-1/2 w-[3px] bg-gray-300 transform -translate-x-1/2 md:block hidden"></div>

          {timelineData.slice(0, activeWeek).map((item, index) => {
            // Only show up to the active week
            const colorClass = colors[index % colors.length]; // Pick color dynamically
            const isLeft = index % 2 === 0; // Alternate side dynamically
            const isActive = item.week <= activeWeek; // Check if week should be opened

            return (
              <div
                key={index}
                className={`flex flex-col md:flex-row ${isLeft ? "md:justify-start" : "md:justify-end"} items-center mb-12 relative`}
                onClick={() => setActiveWeek(item.week + 1)} // Show next week when clicked
              >
                <div
                  className={`${colorClass} font-semibold px-4 py-1 rounded-md shadow-md mb-4 md:mb-0`}
                >
                  Week {item.week}
                </div>

                {isActive && ( // Show details only if the week is active
                  <div
                    className={`bg-white p-5 shadow-md rounded-lg w-full md:w-50 border-l-4 md:ml-4 ${isLeft ? "border-blue-500" : "border-green-500"} ${isLeft ? "md:ml-4" : "md:mr-4"}`}
                  >
                    <h3 className="font-semibold text-lg text-gray-800">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm mt-1">{item.details}</p>
                  </div>
                )}

                <div className="w-6 h-6 bg-blue-500 rounded-full absolute left-1/2 transform -translate-x-1/2 border-4 border-white md:block hidden"></div>
              </div>
            );
          })}
        </div>

        <div className="flex flex-col items-center mt-10">
          <div className="w-16 h-16 rounded-full bg-yellow-500 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
            🎓
          </div>
          <h2 className="text-2xl font-semibold mt-3 text-gray-700">
            Ready Resource
          </h2>
        </div>
      </div>
    </>
  );
};

export default Roadmap;

