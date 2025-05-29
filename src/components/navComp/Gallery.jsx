import React from "react";
import { BACKEND_SERVER_IP } from "../../Constant/constantData";

const Gallery = ({ imageGallery }) => {

   if (!imageGallery) {
     return (
       <p className="text-center text-xl text-red-400 font-semibold mt-8">
         No college gallery data available yet.
       </p>
     );
   }

  return (
    <div className=" h-auto p-2 w-full">
      <h1 className="text-2xl md:text-3xl font-extrabold text-center mb-5 text-grey-700">
        College Image Gallery 
      </h1>

      <div className="">
     

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {imageGallery.map((image) => (
            <div className="rounded-lg overflow-hidden shadow-lg transform transition-all hover:scale-105">
              <img
                src={`${BACKEND_SERVER_IP}${image}`}
                alt=""
                className="w-full h-64 object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
