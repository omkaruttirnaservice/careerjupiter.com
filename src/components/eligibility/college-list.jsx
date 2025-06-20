

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/constansts";
import { BACKEND_SERVER_IP } from "../../Constant/constantData";

const CollegeList = () => {
  const navigate = useNavigate();

  // Get data from Redux store
  const collegeList = useSelector((state) => state.eligibility.collegeList);
  const filters = useSelector((state) => state.eligibility.searchParams);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {collegeList.map((college, i) => (
        <div
          key={i}
          onClick={() =>
                navigate(`/college/${college._id}`, {
                  state: { status: false, searchData: filters },
                })
              }
          className="shadow-md hover:shadow-2xl transition-transform p-4 bg-white flex flex-col overflow-hidden rounded-lg hover:scale-105 duration-300"
        >
          <img
  src={
    college?.image?.trim()
      ? `${BACKEND_SERVER_IP}${college.image}`
      : "https://www.shutterstock.com/image-photo/group-students-digital-tablet-laptop-600nw-2347371743.jpg"
  }
  alt="College"
  className="h-34 object-cover"
/>

          <div className="p-3 flex-1 flex flex-col gap-2">
            <h2 className="text-base font-bold text-gray-800 truncate">
              {college.collegeName}
            </h2>
            <p className="text-xs text-gray-600">
              📍 {college.address?.[0]?.dist}, {college.address?.[0]?.state}
            </p>
            <p className="text-xs text-gray-600">
              🏫 {college.affiliatedUniversity}
            </p>
            <p className="text-xs">
              🏷️ <strong>Type:</strong> {college.collegeType}
            </p>
            <p className="text-xs">
              📅 <strong>Established:</strong>{" "}
              {college.establishedYear || "N/A"}
            </p>
            <p className="text-xs">
              📊 <strong>Cutoff Matched:</strong>{" "}
              {college.cutoffMatched || "N/A"}%
            </p>
            <p className="text-xs">
              🌿 <strong>Branch:</strong> {college.branch_name}
            </p>
          </div>

          {/* <div className="flex gap-2 mt-auto">
            <button
              onClick={() =>
                navigate(`/college/${college._id}`, {
                  state: { status: false, searchData: filters },
                })
              }
              className="flex-1 bg-indigo-100 text-indigo-700 text-center py-2 rounded-md text-xs flex items-center justify-center gap-1 hover:bg-indigo-200"
            >
              📞 Contact
            </button>

            <a
              href={college.applicationFormURL || college.websiteURL || "#"}
              onClick={() =>
                navigate(`/college/${college._id}`, {
                  state: { status: false, searchData: filters },
                })
              }
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-indigo-600 text-white text-center py-2 rounded-md text-xs flex items-center justify-center gap-1 hover:bg-indigo-700"
            >
              📝 Apply
            </a>
          </div> */}
        </div>
      ))}
    </div>
  );
};

export default CollegeList;
