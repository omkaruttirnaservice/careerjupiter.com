import { useLayoutEffect, useState } from "react";
import { useSearchContext } from "../store/SearchContext";

const TagsSection = ({ tags }) => {
  const [selectedTag, setSelectedTag] = useState("All");
  const { setTagName } = useSearchContext();

  const handleSelectedTab = (value) => {
    setSelectedTag(value);
    setTagName(value);
  };

  useLayoutEffect(() => {
    setTagName(selectedTag);
  }, []);

  return (
    <div className="flex items-center justify-center mb-5">
      <div className="text-center">
        <div className="flex flex-wrap justify-center gap-3">
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
                className={` hover:bg-blue-200 hover:text-white px-4 py-2 rounded-full text-sm md:text-base transition-colors cursor-pointer ${
                  selectedTag === tag
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-500"
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
