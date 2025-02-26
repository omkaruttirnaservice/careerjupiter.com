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
  if (!infrastructure)
    return <p className="text-center text-red-500">No data available</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Infrastructure Details
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-100 p-4 rounded-lg flex items-center gap-2">
          <FaBuilding className="text-blue-500" />
          <p className="font-semibold">Campus Area:</p>
          <p>{infrastructure.campusArea || "N/A"}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg flex items-center gap-2">
          <FaBed className="text-green-500" />
          <p className="font-semibold">Hostel Availability:</p>
          <p>{infrastructure.hostelAvailability ? "Available" : "Not Available"}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg flex items-center gap-2">
          <FaBed className="text-purple-500" />
          <p className="font-semibold">Hostel Details:</p>
          <p>{infrastructure.hostelDetails || "N/A"}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg flex items-center gap-2">
          <FaBook className="text-orange-500" />
          <p className="font-semibold">Library:</p>
          <p>{infrastructure.library?.size || "N/A"}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg flex items-center gap-2">
          <FaHospital className="text-red-500" />
          <p className="font-semibold">Medical Facilities:</p>
          <p>{infrastructure.medicalFacilities ? "Available" : "Not Available"}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg flex items-center gap-2">
          <FaChalkboardTeacher className="text-yellow-500" />
          <p className="font-semibold">Number of Classrooms:</p>
          <p>{infrastructure.numberOfClassrooms || "N/A"}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg flex items-center gap-2">
          <FaFlask className="text-teal-500" />
          <p className="font-semibold">Number of Labs:</p>
          <p>{infrastructure.numberOfLabs || "N/A"}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg flex items-center gap-2">
          <FaFutbol className="text-indigo-500" />
          <p className="font-semibold">Sports Facilities:</p>
          <p>{infrastructure.sportsFacilities?.join(", ") || "N/A"}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg flex items-center gap-2">
          <FaBus className="text-blue-400" />
          <p className="font-semibold">Transport Facility:</p>
          <p>{infrastructure.transportFacility?.join(", ") || "N/A"}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg flex items-center gap-2">
          <FaUtensils className="text-pink-500" />
          <p className="font-semibold">Canteen & Food Services:</p>
          <p>{infrastructure.canteenAndFoodServices ? "Available" : "Not Available"}</p>
        </div>
      </div>
    </div>
  );
};

export default Infrastructure;
