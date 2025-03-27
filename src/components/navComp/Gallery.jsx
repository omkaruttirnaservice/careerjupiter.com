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
    <div className="bg-gradient-to-r  from-indigo-50 to-indigo-100 h-auto p-8 w-full">
      <h1 className="text-2xl md:text-3xl font-extrabold text-center mb-5 text-grey-700">
        College Gallery
      </h1>

      <div className="">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gre-700 mb-6 pl-2">
            Explore Our Campus
          </h2>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
