import { useLayoutEffect, useState } from "react";
import { useSearchContext } from "../store/SearchContext";

const TagsSection = ({ tags }) => {
  const [selectedTag, setSelectedTag] = useState("All");
  const { setTagName, setIsLoading, setUniversityData, setInstitutesData } =
    useSearchContext();

  const handleSelectedTab = (value) => {
    setSelectedTag(value);
    setTagName(value);
    setIsLoading(true);
    setUniversityData([]);
    setInstitutesData([]);
  };

  useLayoutEffect(() => {
    setTagName(selectedTag);
  }, []);

  return (
    <div className="flex items-center justify-center mt-10 mb-5">
  <div className="text-center w-full px-4">
    <div className="flex flex-wrap justify-center gap-4 sm:gap-3 md:w[30vh]">
      {tags.map((tag, index) => (
        <label key={index} className="cursor-pointer">
          <input
            type="radio"
            name="tags"
            value={tag}
            checked={selectedTag === tag}
            onChange={() => handleSelectedTab(tag)}
            className="hidden"
          />
          <span
            className={`px-3 py-1 sm:px-4 sm:py-2 rounded-full text-sm md:text-base transition-colors cursor-pointer ${
              selectedTag === tag
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-500 hover:bg-blue-200 hover:text-white"
            }`}
          >
            {tag}
          </span>
        </label>
      ))}
    </div>
  </div>
</div>

  );
    
};

export default TagsSection;
