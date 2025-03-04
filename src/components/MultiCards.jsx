import Card from "./Card";
import { useNavigate } from "react-router-dom";
import TagsSection from "./TagsSection";
import { useSearchContext } from "../store/SearchContext";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { BACKEND_SERVER_IP } from "../Constant/constantData";
import Loader from "./Loader";

const MultiCards = () => {
  const navigate = useNavigate();

  let { tags, collegesData, errorMsg, isLoading } = useSearchContext();

  useEffect(() => {
    toast.error(errorMsg || "Server error");
  }, [errorMsg]);

  console.log("inside college data:---------", collegesData);
  

  return (
    <>
      <TagsSection tags={tags} />

      {isLoading && <Loader />}
      {!isLoading && collegesData?.length === 0 && (
        <h1 className="text-red-500 text-center mt-5">No data found.</h1>
      )}

      {!isLoading && collegesData?.length !== 0 && (
        <div className="mt-3 flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 m-5">
            {collegesData?.map((card, index) => (
              <Card
                key={index}
                id={card._id}
                card={card}
                image={card.image}
                name={card.collegeName}
                description={card.info?.description}
                state={card.address?.state}
                dist={card.address?.dist}
                accreditation={card.accreditation}
                collegeType={card.collegeType}
                Category={card.Category}
                rating="4.5"
                onClick={() => navigate(`/college/${card._id}`)}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default MultiCards;
