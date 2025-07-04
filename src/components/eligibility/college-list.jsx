// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { BACKEND_SERVER_IP } from "../../Constant/constantData";

// const CollegeList = () => {
//   const navigate = useNavigate();

//   // Get data from Redux store
//   const collegeList = useSelector((state) => state.eligibility.collegeList);
//   const filters = useSelector((state) => state.eligibility.searchParams);
//   const searchedBranch = filters?.subCategory?.toLowerCase()?.trim();

//   // Split colleges based on whether they have the searched branch
//   const matchingBranchColleges = [];
//   const otherColleges = [];

//   collegeList.forEach((college) => {
//     const branches = (college.branch_name || []).map((b) =>
//       b.toLowerCase().trim()
//     );
//     if (branches.includes(searchedBranch)) {
//       matchingBranchColleges.push(college);
//     } else {
//       otherColleges.push(college);
//     }
//   });

//   const renderCollegeCard = (college, i) => (
//     <div
//       key={i}
//       onClick={() =>
//         navigate(`/college/${college._id}`, {
//           state: { status: false, searchData: filters },
//         })
//       }
//       className="shadow-md hover:shadow-2xl transition-transform md:p-4 bg-white flex flex-col overflow-hidden rounded-lg hover:scale-105 duration-300"
//     >
//       <img
//         src={
//           college?.image?.trim()
//             ? `${BACKEND_SERVER_IP}${college.image}`
//             : "https://www.shutterstock.com/image-photo/group-students-digital-tablet-laptop-600nw-2347371743.jpg"
//         }
//         alt="College"
//         className="h-34 object-cover"
//       />

//       <div className="p-3 flex-1 flex flex-col gap-2">
//         <h2 className="text-base font-bold text-gray-800 truncate">
//           {college.collegeName}
//         </h2>
//         <p className="text-xs text-gray-600">
//           📍 {college.address?.[0]?.dist}, {college.address?.[0]?.state}
//         </p>
//         <p className="text-xs text-gray-600">
//           🏫 {college.affiliatedUniversity}
//         </p>
//         <p className="text-xs">
//           🏷️ <strong>Type:</strong> {college.collegeType}
//         </p>
//         <p className="text-xs">
//           📅 <strong>Established:</strong> {college.establishedYear || "N/A"}
//         </p>
//         <p className="text-xs">
//           📊 <strong>Cutoff Matched:</strong> {college.cutoffMatched || "N/A"}%
//         </p>
//         <p className="text-xs">
//           🌿 <strong>Branch:</strong> {(college.branch_name || []).join(", ")}
//         </p>
//       </div>
//     </div>
//   );

//   return (
//     <div className="space-y-8 mt-6">
//       {/* Matching Branch Section */}
//       <div>
//         <h3 className="text-lg font-semibold text-blue-800 mb-4">
//           🎯 Colleges offering your selected branch: {filters.subCategory}
//         </h3>
//         {matchingBranchColleges.length > 0 ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//             {matchingBranchColleges.map(renderCollegeCard)}
//           </div>
//         ) : (
//           <p className="text-sm text-gray-500 text-center">
//             ❌ No colleges found for the selected branch "{filters.subCategory}
//             ".
//           </p>
//         )}
//       </div>

//       {/* Other Colleges Section */}
//       <div>
//         <h3 className="text-lg font-semibold text-green-800 mb-4">
//           🏫 Other eligible colleges in {filters.district}
//         </h3>
//         {otherColleges.length > 0 ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//             {otherColleges.map(renderCollegeCard)}
//           </div>
//         ) : (
//           <p className="text-sm text-gray-500 text-center">
//             ❌ No other colleges found in district "{filters.district}".
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CollegeList;

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import { BACKEND_SERVER_IP } from "../../Constant/constantData";
import OtpLoginPopup from "./OtpLoginPopup";
import { logUserActivity } from "../Api"; // ✅ your reusable function

const CollegeList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showOtpPopup, setShowOtpPopup] = useState(false);
  const [selectedCollegeId, setSelectedCollegeId] = useState("");

  // Redux: Get college list and search filters
  const collegeList = useSelector((state) => state.eligibility.collegeList);
  const filters = useSelector((state) => state.eligibility.searchParams);
  const searchedBranch = filters?.subCategory?.toLowerCase()?.trim();

  // Split college list
  const matchingBranchColleges = [];
  const otherColleges = [];

  collegeList.forEach((college) => {
    const branches = (college.branch_name || []).map((b) =>
      b.toLowerCase().trim()
    );
    if (branches.includes(searchedBranch)) {
      matchingBranchColleges.push(college);
    } else {
      otherColleges.push(college);
    }
  });

  // ✅ Handle click based on auth
  const handleCollegeClick = async (college) => {
    const token = Cookies.get("token");
    const userId = Cookies.get("userId");

    if (token && userId) {
      try {
        console.log("token", token);
        console.log("userId", userId);
        await logUserActivity({ userId, collegeId: college._id, token });
        navigate(`/college/${college._id}`, {
          state: { status: false, searchData: college },
        });
      } catch (error) {
        console.error("User activity API error:", error);
      }
      return;
    } else {
      setSelectedCollegeId(college._id);
      setShowOtpPopup(true); // 👈 This only runs when user is NOT logged in
    }
  };

  // 🔷 Render single college card
  const renderCollegeCard = (college, i) => (
    <div
      key={i}
      onClick={() => handleCollegeClick(college)}
      className="cursor-pointer shadow-md hover:shadow-2xl transition-transform md:p-4 bg-white flex flex-col overflow-hidden rounded-lg hover:scale-105 duration-300"
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
          📅 <strong>Established:</strong> {college.establishedYear || "N/A"}
        </p>
        <p className="text-xs">
          📊 <strong>Cutoff Matched:</strong> {college.cutoffMatched || "N/A"}%
        </p>
        <p className="text-xs">
          🌿 <strong>Branch:</strong> {(college.branch_name || []).join(", ")}
        </p>
      </div>
    </div>
  );

  return (
    <div className="space-y-8 mt-6">
      {/* Matching Branch Section */}
      <div>
        <h3 className="text-lg font-semibold text-blue-800 mb-4">
          🎯 Colleges offering your selected branch: {filters.subCategory}
        </h3>
{/* 
        {filters.subCategory ? (
          matchingBranchColleges.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {matchingBranchColleges.map(renderCollegeCard)}
            </div>
          ) : (
            <p className="text-sm text-gray-500 text-center">
              ❌ No colleges found for the selected branch "
              {filters.subCategory}".
            </p>
          )
        ) : // Nothing is shown if no branch is selected
        null} */}

        {filters.subCategory ? (
  matchingBranchColleges.length > 0 ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {matchingBranchColleges.map(renderCollegeCard)}
    </div>
  ) : (
    <p className="text-sm text-gray-500 text-center">
      ❌ No colleges found for the selected branch "{filters.subCategory}".
    </p>
  )
) : (
  <p className="text-sm text-gray-500 text-center">
    🎓 Please select a branch to view matching colleges.
  </p>
)}

      </div>

      {/* Other Colleges Section */}
      <div>
        <h3 className="text-lg font-semibold text-green-800 mb-4">
          🏫 Other eligible colleges in {filters.district}
        </h3>
        {otherColleges.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {otherColleges.map(renderCollegeCard)}
          </div>
        ) : (
          <p className="text-sm text-gray-500 text-center">
            ❌ No other colleges found in district "{filters.district}".
          </p>
        )}
      </div>

      {showOtpPopup && (
        <OtpLoginPopup
          onClose={() => setShowOtpPopup()}
          collegeId={selectedCollegeId}
        />
      )}
    </div>
  );
};

export default CollegeList;
