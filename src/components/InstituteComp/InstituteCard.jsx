

import { FaTags, FaMapMarkerAlt } from "react-icons/fa";
import { BACKEND_SERVER_IP } from "../../Constant/constantData";
import Lotify from "../TestComp/Lotify";

const InstituteCard = ({ institute, onClick }) => {
  const imageUrl = institute.image ? `${BACKEND_SERVER_IP}${institute.image}` : null;
  const discount = institute.discount || institute.discount === 0 ? institute.discount : null;
  const originalPrice = 10000; // Replace with actual price from your data
  const discountedPrice = originalPrice * (1 - discount/100);
    // console.log("institute data------", institute);


  return (
    <div
      className="max-w-2xl mt-5 rounded-lg overflow-hidden shadow-lg cursor-pointer hover:shadow-xl transition duration-300 transform hover:-translate-y-1 bg-white relative"
      onClick={onClick}
    >
      {/* Image Section */}
      <div
        className="w-full h-60 relative flex items-center justify-center text-white text-lg font-bold"
        style={{
          backgroundImage: imageUrl
            ? `url(${imageUrl})`
            : "linear-gradient(to right, #667eea, #764ba2)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {imageUrl && (
          <img
            src={imageUrl}
            alt={institute?.className || "Institute Image"}
            className="absolute inset-0 w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = "none";
              e.target.parentNode.style.backgroundImage =
                "linear-gradient(to right, #667eea, #764ba2)";
            }}
          />
        )}
        <span className="absolute text-xl z-10  px-3 py-1 rounded-lg">
          {institute?.className || "No Image Available"}
        </span>
      </div>
      
      {/* Discount Price Section - Now properly aligned like in your image */}
      {discount !== null && (
        <div className="px-6 pt-4">
          <div className="flex items-center gap-4 mb-2">
            <div className="bg-red-600 text-white px-3 py-1 rounded-md text-lg font-bold">
              {discount}% OFF
            </div>
            <div className="text-gray-700">
              <span className="text-gray-500 line-through mr-2">₹{originalPrice}</span>
              <span className="text-red-600 font-bold">₹{discountedPrice.toFixed(0)}</span>
            </div>
          </div>
          <div className="text-sm text-green-600 font-medium mb-3">
            Save ₹{(originalPrice - discountedPrice).toFixed(0)}
          </div>
        </div>
      )}

      {/* Institute Details */}
      <div className="p-6 pt-2">
      <div className="flex ml-2 items-center space-x-2 text-sm text-gray-700 mb-3">
  <FaTags className="text-blue-500" />
  <p>
    <strong>Category : </strong> 
    {institute.category?.length > 0 ? (
      <>
        {institute.category[0]}
        {institute.category.length > 1 && (
          <span className="text-blue-600 ml-1 cursor-pointer hover:underline">
            +{institute.category.length - 1} more
          </span>
        )}
      </>
    ) : "N/A"}
  </p>
</div>

        <div className="flex items-center space-x-2 text-sm text-gray-700">
          <p className="text-gray-500 text-sm mt-1 flex items-center gap-1">
            <span className="w-8 h-8">
              <Lotify icon="\Lottiefiles\Animation - 1742988929198 (1).json" />
            </span>
            <p>
              <strong>Location :</strong>{" "}
              {Array.isArray(institute.address) && institute.address.length > 0
                ? `${institute.address.length} address${institute.address.length > 1 ? "es" : ""} available`
                : "No address available"}
            </p>
          </p>
        </div>

        <p className="text-gray-600 text-sm mt-4 line-clamp-3">
          Description : {institute.info?.description || "No description available."}
        </p>
      </div>
    </div>
  );
};

export default InstituteCard;