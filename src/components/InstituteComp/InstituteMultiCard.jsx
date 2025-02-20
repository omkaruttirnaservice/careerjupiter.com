import { useNavigate } from "react-router-dom";
import InstituteCard from "./InstituteCard";

const InstituteMultiCard = () => {

    const navigate = useNavigate();

  const institutes = [
    {
      id: 1,
      name: "Institute A",
      rank: 5,
      successRatio: 95,
      image:
        "https://images.unsplash.com/photo-1592069915234-2a5c74fbd347?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGluc3RpdHV0ZXxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      id: 2,
      name: "Institute B",
      rank: 5,
      successRatio: 90,
      image:
        "https://plus.unsplash.com/premium_photo-1676892435585-d29aee82ad6d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGluc3RpdHV0ZXxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      id: 3,
      name: "Institute C",
      rank: 5,
      successRatio: 85,
      image:
        "https://images.unsplash.com/photo-1592069915234-2a5c74fbd347?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGluc3RpdHV0ZXxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      id: 4,
      name: "Institute D",
      rank: 5,
      successRatio: 80,
      image:
        "https://plus.unsplash.com/premium_photo-1676892435585-d29aee82ad6d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGluc3RpdHV0ZXxlbnwwfHwwfHx8MA%3D%3D",
    },
  ];

  return (
    <>
      <div className=" cursor-pointer grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 m-5">
        {institutes.map((each , index) => {
          return (
            <InstituteCard
              institute={each}
              key={index}
              onClick={() => navigate(`/institute/${each.id}`)}
            />
          );
        })}
      </div>
    </>
  );
};

export default InstituteMultiCard;
