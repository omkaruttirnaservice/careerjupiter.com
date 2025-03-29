import React from "react";

const LoadingProfilePage = () => {
  return (
    <div className="flex flex-col items-center justify-center p-6 animate-pulse">
      {/* Profile Header */}
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center gap-6">
          {/* Profile Picture */}
          <div className="w-32 h-32 bg-gray-300 rounded-full"></div>
          <div className="flex flex-col gap-4 flex-grow">
            <div className="h-6 bg-gray-300 rounded w-1/3"></div>
            <div className="h-4 bg-gray-300 rounded w-1/4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/5"></div>
          </div>
        </div>
      </div>

      {/* Profile Details */}
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6 mt-6">
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="h-5 bg-gray-300 rounded w-1/2"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            <div className="h-4 bg-gray-300 rounded w-2/3"></div>
          </div>
          <div className="space-y-4">
            <div className="h-5 bg-gray-300 rounded w-1/2"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            <div className="h-4 bg-gray-300 rounded w-2/3"></div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6 mt-6">
        <div className="h-5 bg-gray-300 rounded w-1/4 mb-4"></div>
        <div className="h-4 bg-gray-300 rounded w-full"></div>
      </div>

      {/* Education Details */}
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6 mt-6">
        <div className="h-5 bg-gray-300 rounded w-1/4 mb-4"></div>
        <div className="space-y-4">
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6"></div>
          <div className="h-4 bg-gray-300 rounded w-4/6"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingProfilePage;
