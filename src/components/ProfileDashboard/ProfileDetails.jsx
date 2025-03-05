import { useSelector } from "react-redux";
import { getUser } from "./Api";
import { useQuery } from "@tanstack/react-query";
import {
  FaUserCircle,
  FaEnvelope,
  FaPhone,
  FaBirthdayCake,
  FaGraduationCap,
  FaMapMarkerAlt,
} from "react-icons/fa";

const ProfileDetails = () => {
  const { userId } = useSelector((state) => state.auth);

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["userData", userId],
    queryFn: () => getUser(userId),
  });

  if (isPending)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-indigo-500"></div>
      </div>
    );

  if (isError)
    return (
      <div className="text-center py-6">
        <p className="text-red-500 bg-red-50 px-4 py-2 rounded-xl border border-red-100">
          Error: {error.message}
        </p>
      </div>
    );

  const user = data?.data;

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-indigo-50 to-purple-50 min-h-screen">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Column - Details */}
        <div className="w-full md:w-2/3 space-y-8">
          {/* Personal Info Card */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 transition-all hover:shadow-xl">
            <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Personal Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-50 rounded-xl">
                  <FaBirthdayCake className="text-purple-600 w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Date of Birth</p>
                  <p className="font-semibold text-gray-800">{user?.dob}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-3 bg-indigo-50 rounded-xl">
                  <FaUserCircle className="text-indigo-600 w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Age</p>
                  <p className="font-semibold text-gray-800">{user?.age}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-50 rounded-xl">
                  <FaGraduationCap className="text-blue-600 w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Current Education</p>
                  <p className="font-semibold text-gray-800">
                    {user?.info?.current_education}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Address Card */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 transition-all hover:shadow-xl">
            <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Address Details
            </h3>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-green-50 rounded-xl mt-1">
                <FaMapMarkerAlt className="text-green-600 w-6 h-6" />
              </div>
              <div>
                <p className="font-medium text-gray-800">
                  {user?.address?.line1}, {user?.address?.line2}
                </p>
                <p className="text-gray-600 mt-2">
                  {user?.address?.dist}, {user?.address?.state}
                </p>
                <p className="text-gray-600">PIN: {user?.address?.pincode}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Profile Card */}
        <div className="w-full md:w-1/3 space-y-6">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 transition-all hover:shadow-xl">
            <div className="relative">
              <div className="bg-gradient-to-br from-indigo-400 to-purple-400 p-1.5 rounded-full inline-block">
                <img
                  src={user?.profile_image}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover border-4 border-white"
                />
              </div>
            </div>

            <h2 className="mt-6 text-3xl font-bold text-gray-900 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {user?.f_name} {user?.m_name} {user?.l_name}
            </h2>

            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-3 text-gray-700">
                <div className="p-2 bg-indigo-50 rounded-lg">
                  <FaEnvelope className="text-indigo-600 w-5 h-5" />
                </div>
                <span className="font-medium">{user?.email_id}</span>
              </div>

              <div className="flex items-center gap-3 text-gray-700">
                <div className="p-2 bg-indigo-50 rounded-lg">
                  <FaPhone className="text-indigo-600 w-5 h-5" />
                </div>
                <span className="font-medium">{user?.mobile_no}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
