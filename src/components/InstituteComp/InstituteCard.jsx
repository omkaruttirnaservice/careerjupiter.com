
import { FaTags } from "react-icons/fa"
import { BACKEND_SERVER_IP } from "../../Constant/constantData"
import { FaLocationDot } from "react-icons/fa6"
import { useState } from "react"

const InstituteCard = ({ institute, onClick }) => {
  const imageUrl = institute.image ? `${BACKEND_SERVER_IP}${institute.image}` : null
  const discount = institute.discount || institute.discount === 0 ? institute.discount : null
  const originalPrice = 10000
  const discountedPrice = originalPrice * (1 - discount / 100)
  const [showAllCategories, setShowAllCategories] = useState(false)

  return (
    <div
      className="max-w-2xl mt-5 rounded-lg overflow-hidden shadow-lg cursor-pointer hover:shadow-xl transition duration-300 transform hover:-translate-y-1 bg-white relative"
      onClick={onClick}
    >
      {/* Image Section */}
      <div
        className="w-full h-60 relative flex items-center justify-center text-white text-lg font-bold"
        style={{
          backgroundImage: imageUrl ? `url(${imageUrl})` : "linear-gradient(to right, #667eea, #764ba2)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {imageUrl && (
          <img
            src={imageUrl || "/placeholder.svg"}
            alt={institute?.className || "Institute Image"}
            className="absolute inset-0 w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = "none"
              e.target.parentNode.style.backgroundImage = "linear-gradient(to right, #667eea, #764ba2)"
            }}
          />
        )}
        <span className="absolute text-xl z-10  px-3 py-1 rounded-lg">
          {/* {institute?.className || "No Image Available"} */}
        </span>
      </div>

      <div className="flex items-center  text-black">
        <h1 className="text-xl font-bold ml-5 mt-3">{institute?.className}</h1>
      </div>

      {/* Discount Price Section - Now properly aligned like in your image */}
      {discount !== null && (
        <div className="px-5 pt-2">
          <div className="flex items-center gap-6 mb-1">
            <div className="bg-red-600 text-white px-3 py-1 rounded-md text-md font-bold">{discount}% OFF</div>
            <div className="text-gray-700">
              <span className="text-gray-500 line-through mr-2">₹{originalPrice}</span>
              <span className="text-red-600 font-bold">₹{discountedPrice.toFixed(0)}</span>
            </div>
          </div>
          <div className="text-sm text-green-600 font-medium ">
            Save ₹{(originalPrice - discountedPrice).toFixed(0)}
          </div>
        </div>
      )}

      {/* Institute Details */}
      <div className="p-6 pt-2">
        <div className="flex items-center space-x-2 text-sm text-gray-700">
          <FaTags className="text-blue-500" />
          <p>
            <strong>Category : </strong>
            {institute.category?.length > 0 ? (
              <>
                {institute.category[0]}
                {institute.category.length > 1 && (
                  <div className="relative inline-block group">
                    <span className="text-blue-600 ml-1 cursor-pointer hover:underline">
                      +{institute.category.length - 1} more
                    </span>
                    <div className="absolute hidden group-hover:block z-10 bg-white p-2 shadow-lg rounded border border-gray-200 text-sm">
                      {institute.category.slice(1).join(", ")}
                    </div>
                  </div>
                )}
              </>
            ) : (
              "N/A"
            )}
          </p>
        </div>

        <div className="flex items-center space-x-2 text-sm text-gray-700">
          <p className="text-gray-500 text-sm mt-1 flex items-start gap-1">
            <span className=" w-3 h-8 flex items-center justify-start text-red-500">
              <FaLocationDot className="h-5" />
            </span>
            <span className="flex flex-col ml-2">
              {institute.address?.length > 0 ? (
                institute.address.map((addr, index) => (
                  <span key={addr._id} className="mt-2">
                    {addr.line1 && <span>{addr.line1}, </span>}
                    {addr.line2 && <span>{addr.line2}, </span>}
                    {addr.taluka && <span>{addr.taluka}, </span>}
                    {addr.dist && <span>{addr.dist}, </span>}
                    {addr.state && <span>{addr.state} - </span>}
                    {addr.pincode && <span>{addr.pincode}</span>}
                  </span>
                ))
              ) : (
                <span>No address available</span>
              )}
            </span>
          </p>
        </div>

        {/* <p className="text-gray-600 text-sm mt-4 line-clamp-3">
          Description :{" "}
          {institute.info?.description || "No description available."}
        </p> */}
      </div>
    </div>
  )
}

export default InstituteCard

