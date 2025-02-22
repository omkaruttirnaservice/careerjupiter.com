import Card from "./Card";
import { useContext, useState } from "react";
import { cardDataProvider } from "../store/DashbordData";
import { useNavigate } from "react-router-dom";
import TagsSection from "./TagsSection";
import { useSearchContext } from "./SearchComp/SearchContext";

const MultiCards = () => {
  const navigate = useNavigate();

  let { tags } = useSearchContext();

  const Data = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1562774053-701939374585?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y29sbGVnZXxlbnwwfHwwfHx8MA%3D%3D", // Replace with your image URL
      name: "first",
      description:
        "A leading institution offering world-class education in various fields.",
      rating: 4.5,
    },
    {
      id: 2,
      image:
        "https://media.istockphoto.com/id/472942802/photo/madras-university.webp?a=1&b=1&s=612x612&w=0&k=20&c=fXhlM6GIBVUNwb4Bxs7MWxL9wLgeiM-cw_Mr6MWdb3g=", // Replace with your image URL
      name: "second",
      description:
        "A leading institution offering world-class education in various fields.",
      rating: 4.5,
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1562774053-701939374585?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y29sbGVnZXxlbnwwfHwwfHx8MA%3D%3D", // Replace with your image URL
      name: "third",
      description:
        "A leading institution offering world-class education in various fields.",
      rating: 4.5,
    },
    {
      id: 4,
      image:
        "https://media.istockphoto.com/id/472942802/photo/madras-university.webp?a=1&b=1&s=612x612&w=0&k=20&c=fXhlM6GIBVUNwb4Bxs7MWxL9wLgeiM-cw_Mr6MWdb3g=", // Replace with your image URL
      name: "forth",
      description:
        "A leading institution offering world-class education in various fields.",
      rating: 4.5,
    },
  ];

  return (
    <>
      <div className="mt-10">
        <TagsSection tags={tags} />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 m-5">
          {Data.map((card, index) => {
            return (
              <Card
                key={index}
                id={card.id}
                card={card}
                image={card.image}
                name={card.name}
                description={card.description}
                rating={card.rating}
                onClick={() => navigate(`/card/${card.id}`)}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default MultiCards;
