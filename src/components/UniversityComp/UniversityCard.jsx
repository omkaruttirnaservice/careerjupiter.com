import React from "react";

const UniversityCard = ({ university, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="relative overflow-hidden bg-white rounded-lg shadow-lg
                 transition-transform transform hover:-translate-y-2 hover:shadow-2xl
                 cursor-pointer"
    >
      {/* Image Container */}
      <div className="h-48 overflow-hidden">
        <img
          src={university.image}
          alt={university.name}
          className="w-full h-full object-cover
                     transition-transform duration-500
                     hover:scale-110"
        />
      </div>

      {/* Card Content */}
      <div className="p-4">
        <h3 className="text-xl font-bold mb-1">{university.name}</h3>
        <p className="text-gray-500 text-sm mb-2">{university.location}</p>
        <p className="text-gray-600 text-sm leading-relaxed">
          {university.description}
        </p>
      </div>

      {/* Rank Tag (top-right corner) */}
      <div className="absolute top-0 right-0 bg-red-500 text-white
                      text-sm font-semibold px-3 py-1 rounded-bl-lg">
        #{university.rank}
      </div>
    </div>
  );
};

export default UniversityCard;
