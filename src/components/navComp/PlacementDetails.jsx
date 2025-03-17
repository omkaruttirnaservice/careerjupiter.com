import React from "react";

const PlacementDetails = ({ placementData }) => {
  const placement = placementData[0];

  if (!placement) {
    return (
      <p className="text-center text-xl text-red-400 font-semibold mt-8">
        No placement data available yet.
      </p>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Highest Package Card */}
        <div className="relative bg-gradient-to-br from-blue-300 to-blue-500 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-white/90 text-lg font-semibold mb-2">
                Highest Package
              </h3>
              <p className="text-3xl md:text-2xl font-bold text-white">
                ₹{placement.highestPackage} LPA
              </p>
            </div>
            <div className="bg-white/10 p-2 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Placement Percentage Card */}
        <div className="relative bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-white/90 text-lg font-semibold mb-2">
                Placement Rate
              </h3>
              <p className="text-3xl md:text-4xl font-bold text-white">
                {placement.placementPercentage}%
              </p>
            </div>
            <div className="bg-white/10 p-2 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Internship Opportunities Card */}
        <div className="relative bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-white/90 text-lg font-semibold mb-2">
                Internships
              </h3>
              <p
                className={`text-2xl md:text-3xl font-bold ${placement.internshipOpportunities ? "text-green-300" : "text-red-300"}`}
              >
                {placement.internshipOpportunities
                  ? "Available"
                  : "Not Available"}
              </p>
            </div>
            <div className="bg-white/10 p-2 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Top Recruiters Card */}
        <div className="relative bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
          <div className="flex justify-between items-start">
            <div className="w-full">
              <h3 className="text-white/90 text-lg font-semibold mb-4">
                Top Recruiters
              </h3>
              <div className="flex flex-wrap gap-2">
                {placement.topRecruiters.map((recruiter, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 bg-white/10 text-white/90 rounded-full text-sm font-medium"
                  >
                    {recruiter}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-white/10 p-2 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlacementDetails;
