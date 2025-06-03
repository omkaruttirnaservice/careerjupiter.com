import React from "react";
import {
  FaBuilding,
  FaBed,
  FaBook,
  FaHospital,
  FaChalkboardTeacher,
  FaFlask,
  FaFutbol,
  FaBus,
  FaUtensils,
} from "react-icons/fa";

const Infrastructure = ({ infrastructure }) => {
  const infra = Array.isArray(infrastructure?.infrastructure)
    ? infrastructure.infrastructure[0]
    : null;

  if (!infra) {
    return (
      <p className="text-center text-xl text-red-400 font-semibold mt-8">
        No infrastructure data available yet.
      </p>
    );
  }

  const infraItems = [
    {
      icon: <FaBuilding className="text-blue-500 text-lg" />,
      label: "Campus Area",
      value: infra.campusArea || "N/A",
    },
    {
      icon: <FaBed className="text-green-500 text-lg" />,
      label: "Hostel Availability",
      value: infra.hostelAvailability ? "Available" : "Not Available",
    },
    {
      icon: <FaBed className="text-purple-500 text-lg" />,
      label: "Hostel Details",
      value: infra.hostelDetails || "N/A",
    },
    {
      icon: <FaBook className="text-orange-500 text-lg" />,
      label: "Library",
      value: infra.library?.size || "N/A",
    },
    {
      icon: <FaHospital className="text-red-500 text-lg" />,
      label: "Medical Facilities",
      value: infra.medicalFacilities ? "Available" : "Not Available",
    },
    {
      icon: <FaChalkboardTeacher className="text-yellow-500 text-lg" />,
      label: "Number of Classrooms",
      value: infra.numberOfClassrooms || "N/A",
    },
    {
      icon: <FaFlask className="text-teal-500 text-lg" />,
      label: "Number of Labs",
      value: infra.numberOfLabs || "N/A",
    },
    {
      icon: <FaFutbol className="text-indigo-500 text-lg" />,
      label: "Sports Facilities",
      value: infra.sportsFacilities?.join(", ") || "N/A",
    },
    {
      icon: <FaBus className="text-blue-400 text-lg" />,
      label: "Transport Facility",
      value: infra.transportFacility?.join(", ") || "N/A",
    },
    {
      icon: <FaUtensils className="text-pink-500 text-lg" />,
      label: "Canteen & Food Services",
      value: infra.canteenAndFoodServices ? "Available" : "Not Available",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Infrastructure Details
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {infraItems.map((item, index) => (
          <div
            key={index}
            className="flex items-start bg-gray-200 rounded-xl p-4 shadow hover:shadow-lg transition duration-200 gap-4"
          >
            <div className="pt-1">{item.icon}</div>
            <div>
              <p className="font-semibold text-gray-700">{item.label}:</p>
              <p className="text-gray-600 text-sm">{item.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Infrastructure;
