import { useParams } from "react-router-dom";
import { useEffect } from "react";

const SingleInstitute = ()=>{
    const {id} = useParams();

    const institutes = [
    {
      id: 1,
      name: "Institute A",
      rank: 1,
      successRatio: 95,
      image:
        "https://images.unsplash.com/photo-1592069915234-2a5c74fbd347?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGluc3RpdHV0ZXxlbnwwfHwwfHx8MA%3D%3D",
    }
    ];

      const institute = institutes.find((I) => I.id === parseInt(id));
    
      useEffect(() => {
        window.scrollTo(0, 0);
      }, [institute]);
    
      if (!institute) {
        return <p className="text-center text-gray-600 mt-8">No data found.</p>;
      }
      

    return (
      <>
        <div className="max-w-sm rounded overflow-hidden shadow-lg m-4">
          <img
            className="w-full h-48 object-cover"
            src={institute.image}
            alt={institute.name}
          />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{institute.name}</div>
            <p className="text-gray-700 text-base">Rank: {institute.rank}</p>
            <p className="text-gray-700 text-base">
              Success Ratio: {institute.successRatio}%
            </p>
          </div>
        </div>
      </>
    );
}

export default SingleInstitute;