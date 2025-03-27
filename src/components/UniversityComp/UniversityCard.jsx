

import React from "react";
import { MapPin, Medal } from "lucide-react"; // Importing icons
import Lotify from "../TestComp/Lotify";

const UniversityCard = ({ university, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="relative overflow-hidden bg-white rounded-lg shadow-lg
                 transition-transform transform hover:-translate-y-2 hover:shadow-2xl
                 cursor-pointer"
    >
      {/* Image Container */}
      <div className="h-48 overflow-hidden relative">
        <img
          src={university.image}
          alt={university.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          onError={(e) => {
            e.target.onerror = null; // Prevent infinite loop

            // Encode university name for SVG URL
            const encodedName = encodeURIComponent(university.name || "No Image");

            // Set a custom SVG with the university name
            e.target.src = `data:image/svg+xml;charset=UTF-8,
              %3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 200'%3E
                %3Crect width='100%25' height='100%25' fill='%23667eea'/%3E
                %3Ctext x='50%25' y='50%25' dominant-baseline='middle'
                  text-anchor='middle' font-size='20' fill='white'%3E${encodedName}%3C/text%3E
              %3C/svg%3E`;
          }}
        />
      </div>

      {/* Card Content */}
      <div className="p-4">
        <div className="flex flex-row items-center justify-between">
          <h3 className="text-xl font-bold mb-1">{university.name}</h3>
          <span className="bg-green-100 text-green-600 text-xs md:text-sm font-medium px-3 py-1 rounded-full">
            {university.category}
          </span>
        </div>
        {/* Location with Icon */}
        <div className="flex items-center text-gray-500 text-sm mb-2">
         <span className="w-6 h-6">
                       <Lotify icon="\Lottiefiles\Animation - 1742988929198 (1).json" />
                     </span>
          {university.location}
        </div>

        <p className="text-gray-600 text-sm leading-relaxed">
          {university.description}
        </p>
      </div>

      {/* Rank Tag with Icon (top-right corner) */}
      <div
        className="absolute top-0 right-0 bg-red-500 text-white
                      text-sm font-semibold px-3 py-1 rounded-bl-lg flex items-center"
      >
        <Medal size={14} className="mr-1" />#{university.rank}
      </div>
    </div>
  );
};

export default UniversityCard;
