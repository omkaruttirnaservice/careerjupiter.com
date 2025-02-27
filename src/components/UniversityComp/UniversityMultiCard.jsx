import React from "react";
import { useNavigate } from "react-router-dom";
import UniversityCard from "./UniversityCard";
import TagsSection from "../TagsSection";
import { useSearchContext } from "../../store/SearchContext";

const UniversityMultiCard = () => {
  const navigate = useNavigate();

  const { UniversityData } = useSearchContext();

  console.log("universityData inside university component:.....",UniversityData?.data);
  

  const tags = ["All", "Harvard University", "Stanford University"];

  const universities = [
    {
      id: 1,
      name: "Harvard University",
      rank: 1,
      location: "Cambridge, MA, USA",
      image:
        "https://2u.com/static/84f4025b19c2bf44a1c9b049994c1eff/ee8ba/baker-library-harvard-university_OPxWuDn.max-2880x1800.jpg",
      description:
        "Harvard University is known for its prestigious academic programs and world-class research.",
    },
    {
      id: 2,
      name: "MIT",
      rank: 2,
      location: "Cambridge, MA, USA",
      image:
        "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=600&q=60",
      description:
        "MIT leads in technology and innovation, with cutting-edge research and teaching.",
    },
    {
      id: 3,
      name: "Stanford University",
      rank: 3,
      location: "Stanford, CA, USA",
      image:
        "https://images.unsplash.com/photo-1573164574572-cb89e39749b4?auto=format&fit=crop&w=600&q=60",
      description:
        "Stanford University fosters innovation and entrepreneurship in a vibrant campus community.",
    },
    {
      id: 4,
      name: "Oxford University",
      rank: 4,
      location: "Oxford, UK",
      image:
        "https://images.unsplash.com/photo-1612563958093-2c3bcfbd8760?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8b3hmb3JkJTIwdW5pdmVyc2l0eXxlbnwwfHwwfHx8MA%3D%3D",
      description:
        "Oxford University is renowned for its rich history, academic excellence, and research.",
    },
    {
      id: 5,
      name: "Cambridge University",
      rank: 5,
      location: "Cambridge, UK",
      image:
        "https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?auto=format&fit=crop&w=600&q=60",
      description:
        "Cambridge University offers a unique blend of tradition and cutting-edge research.",
    },
    {
      id: 6,
      name: "Tokyo University",
      rank: 6,
      location: "Tokyo, Japan",
      image:
        "https://images.unsplash.com/photo-1612563958093-2c3bcfbd8760?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8b3hmb3JkJTIwdW5pdmVyc2l0eXxlbnwwfHwwfHx8MA%3D%3D",
      description:
        "Tokyo University is a leader in research and innovation in Asia, providing outstanding education.",
    },
  ];

  return (
    <div className="mt-10">
    <TagsSection tags={tags}/>
      <div className="bg-gray-30 py-10">
        <div className="container mx-auto px-4">
          {/* Page Title */}
          <h2 className="text-3xl font-bold mb-6 text-center">
            Welcome to Education
          </h2>
          <p className="text-center text-gray-600 mb-10 max-w-xl mx-auto">
            Discover the world's top universities with outstanding programs,
            cutting-edge research, and vibrant campus communities.
          </p>

          {/* Grid of Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {universities.map((uni) => (
              <UniversityCard
                key={uni.id}
                university={uni}
                onClick={() => navigate(`/university/${uni.id}`)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniversityMultiCard;
