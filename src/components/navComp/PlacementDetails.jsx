import React from "react";

const PlacementDetails = ({ coursesData }) => {
  console.log(
    "inside PlacementDetail component:",
    coursesData[0]?.courses[0].placementDetails
  );

  // const placementData = coursesData[0]?.courses[0].placementDetails;

   const placementData =[
        {
          "company": "Infosys",
          "package": 600000
        },
        {
          "company": "TCS",
          "package": 550000
        }
      ];

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {placementData.map((item, index) => (
          <div
            key={index}
            className="w-full max-w-lg bg-gradient-to-br from-blue-300 to-blue-400 rounded-lg shadow-lg hover:shadow-2xl transition-transform duration-300 hover:scale-105"
          >
            <div className="p-6 md:p-8">
              <h2 className="text-white text-2xl md:text-3xl font-bold mb-4">
                {item.company}
              </h2>
              <div className="bg-red-400/20 p-4 rounded-lg backdrop-blur-md">
                <div className="text-white/80 text-sm mb-1">Annual Package</div>
                <div className="text-3xl md:text-4xl font-bold text-white">
                  ₹{item.package}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlacementDetails;
