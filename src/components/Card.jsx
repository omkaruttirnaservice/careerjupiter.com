import { memo } from "react";
import { toPascalCase } from "../utils/StringUtils";
import { ImLocation } from "react-icons/im";
import { BACKEND_SERVER_IP } from "../Constant/constantData";

const Card = ({
  image,
  name,
  description,
  rating,
  state,
  dist,
  accreditation,
  Category,
  collegeType,
  onClick,
}) => {
  return (
    <>
      <div
        className="max-w-sm w-full sm:w-80 md:w-96 lg:w-[24rem] xl:w-[28rem] rounded-2xl overflow-hidden shadow-md bg-white hover:shadow-lg transition-all duration-300 cursor-pointer"
        onClick={onClick}
      >
        <img
          className="w-full h-52 object-cover rounded-t-2xl"
          src={`${BACKEND_SERVER_IP}${image}`}
          alt={name}
        />
        <div className="p-5">
          <div className="flex flex-col">
            <h2 className="font-semibold text-lg md:text-xl text-gray-900">
              {toPascalCase(name)}
            </h2>
            <div className="flex items-center gap-1 text-gray-500 text-sm">
              <ImLocation className="text-red-500" />
              <span>{`${dist}, ${state}`}</span>
            </div>
          </div>
          <p className="text-gray-600 text-sm md:text-base mt-2 line-clamp-3">
            {description?.length > 120
              ? `${description.slice(0, 120)}...`
              : description}
          </p>
          <div className="flex flex-wrap gap-2 mt-3 bottom-0">
            <span className="bg-blue-100 text-blue-600 text-xs md:text-sm font-medium px-3 py-1 rounded-full">
              {accreditation}
            </span>
            <span className="bg-green-100 text-green-600 text-xs md:text-sm font-medium px-3 py-1 rounded-full">
              {collegeType}
            </span>
            <span className="bg-purple-100 text-purple-600 text-xs md:text-sm font-medium px-3 py-1 rounded-full">
              {Category}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(Card);
