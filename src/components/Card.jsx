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
  collegeCategory,
  collegeType,
  onClick,
}) => {
  return (
    <>
      <div
        className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white hover:cursor-pointer hover:shadow-xl transition-shadow duration-300"
        onClick={onClick}
      >
        <img
          className="w-full h-48 object-cover"
          src={`${BACKEND_SERVER_IP}${image}`}
          alt={name}
        />
        <div className="px-6 py-4">
          <div className="flex flex-row justify-between">
            <div className="font-bold text-xl ">{toPascalCase(name)}</div>
            <div className="flex flex-row gap-1 items-center justify-center mt-0">
              <ImLocation className="text-red-400 " />
              <p className="text-gray-500 text-xs">{`${dist},${state}`}</p>
            </div>
          </div>
          <p className="text-gray-700 text-base mt-2">
            {description?.length > 100
              ? description.slice(0, 100) + "..."
              : description}
          </p>
        </div>
        <div className="px-6 pb-4 flex gap-2">
          <span className="inline-block bg-blue-200 rounded-full px-3 py-1 text-sm font-semibold text-blue-700">
            {accreditation}
          </span>
          <span className="inline-block bg-blue-200 rounded-full px-3 py-1 text-sm font-semibold text-blue-700">
            {collegeType}
          </span>
          <span className="inline-block px-3 py-1 bg-blue-200 rounded-full text-sm font-semibold text-blue-700">
            {collegeCategory}
          </span>
        </div>
      </div>
    </>
  );
};

export default memo(Card);
