import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InstituteCard from "./InstituteCard";
import TagsSection from "./../TagsSection";

const InstituteMultiCard = () => {
  const [institutes, setInstitutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const tags = ["All", "Physics", "Maths", "MERN", "English Speaking"];

  useEffect(() => {
    const fetchInstitutes = async () => {
      try {
        const response = await fetch("http://192.168.1.5:5000/api/class/all/");
        const result = await response.json();
        
        if (result.success && result.data) {
          const parsedData = JSON.parse(result.data).classes;

          const formattedInstitutes = parsedData.map((cls) => ({
            id: cls._id,
            name: cls.className,
            rank: 5,
            successRatio: cls.admissionEntranceDetails?.lastYearCutoffMarks || "N/A",
            image: cls.image.startsWith("http") ? cls.image : `http://192.168.1.5:5000${cls.image}`,
            description: cls.info?.description || "No description available",
            category: cls.Category || "N/A",
            location: `${cls.address?.line1}, ${cls.address?.line2}, ${cls.address?.dist}`,
          }));

          setInstitutes(formattedInstitutes);
        }
      } catch (error) {
        console.error("Error fetching institutes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInstitutes();
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading classes...</p>;
  }

  return (
    <div className="mt-10">
      <TagsSection tags={tags} />
      <div className="cursor-pointer grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 m-5">
        {institutes.map((each) => (
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
