import React from "react";

const TagsSection = () => {
    
  const tags = [
    "Parul University",
    "K.R. Mangalam University",
    "SPPU University",
    "B Tech",
    "M Tech",
    "Bachelor of Engineering",
  ];

  return (
    <div className=" flex items-center justify-center mb-5">
      <div className="text-center">
        <div className="flex flex-wrap justify-center gap-3">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="bg-white text-gray-500 px-4 py-2 rounded-full text-sm md:text-base hover:bg-blue-200 hover:text-white transition-colors cursor-pointer"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TagsSection;
