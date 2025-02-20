import React from "react";

const CutoffTable = () => {
  const cutoffData = [
    {
      courseName: "Aerospace Engineering",
      seatType: "GEN",
      gender: "Gender-Neutral",
      openingRank: 1469,
      closingRank: 2815,
    },
    {
      courseName: "Aerospace Engineering",
      seatType: "GEN",
      gender: "Female-only (including Supernumerary)",
      openingRank: 5475,
      closingRank: 6845,
    },
    {
      courseName: "Aerospace Engineering (Dual Degree)",
      seatType: "GEN",
      gender: "Gender-Neutral",
      openingRank: 2199,
      closingRank: 2984,
    },
    {
      courseName: "Aerospace Engineering (Dual Degree)",
      seatType: "GEN",
      gender: "Female-only (including Supernumerary)",
      openingRank: 2184,
      closingRank: 2184,
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-extrabold text-center text-indigo-700 mb-6">
        Engineering Cutoff 2024
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-lg">
          <thead className="bg-gradient-to-r from-indigo-600 to-indigo-500 text-white">
            <tr>
              <th className="py-3 px-4 border-b">Course Name</th>
              <th className="py-3 px-4 border-b">Seat Type</th>
              <th className="py-3 px-4 border-b">Gender</th>
              <th className="py-3 px-4 border-b">Opening Rank</th>
              <th className="py-3 px-4 border-b">Closing Rank</th>
            </tr>
          </thead>
          <tbody>
            {cutoffData.map((data, index) => (
              <tr
                key={index}
                className={`hover:bg-gray-50 ${
                  index % 2 === 0 ? "bg-gray-100" : "bg-white"
                } transition-colors`}
              >
                <td className="py-3 px-4 border-b">{data.courseName}</td>
                <td
                  className={`py-3 px-4 border-b ${
                    data.seatType === "GEN" ? "text-blue-600" : "text-green-600"
                  }`}
                >
                  {data.seatType}
                </td>
                <td className="py-3 px-4 border-b">{data.gender}</td>
                <td className="py-3 px-4 border-b">{data.openingRank}</td>
                <td className="py-3 px-4 border-b">{data.closingRank}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CutoffTable;
