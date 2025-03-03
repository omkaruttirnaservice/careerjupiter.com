import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InstituteCard from "./InstituteCard";
import TagsSection from "./../TagsSection";
import { fetchInstitutesData } from "./institute-api";

const InstituteMultiCard = () => {
  const [institutes, setInstitutes] = useState([]);
  const [filteredInstitutes, setFilteredInstitutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTag, setSelectedTag] = useState("All");
  const navigate = useNavigate();

  const tags = ["All", "Diploma", "Engineering"];

  useEffect(() => {
    const getInstitutes = async () => {
      try {
        const data = await fetchInstitutesData();
        setInstitutes(data);
        setFilteredInstitutes(data);
      } catch (error) {
        setError("Failed to load data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    getInstitutes();
  }, []);

  // Filter institutes when selectedTag or institutes changes
  useEffect(() => {
    if (selectedTag === "All") {
      setFilteredInstitutes(institutes);
    } else {
      const filtered = institutes.filter(
        (inst) => inst.category.toLowerCase() === selectedTag.toLowerCase()
      );
      setFilteredInstitutes(filtered);
    }
  }, [selectedTag, institutes]);

  if (loading) {
    return <p className="text-center mt-10">Loading classes...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 mt-10">{error}</p>;
  }

  return (
    <div className="mt-10">
      <TagsSection
        tags={tags}
        selectedTag={selectedTag}
        onTagSelect={setSelectedTag}
      />
      <div className="cursor-pointer grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 m-5">
        {filteredInstitutes.map((each) => (
          <InstituteCard
            institute={each}
            key={each.id}
            onClick={() => navigate(`/institute/${each.id}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default InstituteMultiCard;
