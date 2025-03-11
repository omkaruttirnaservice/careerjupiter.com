import { useState, useEffect } from 'react';

const Loader = ({ isLoading, data }) => {
  return (
    <div className="h-4 mt-10 mb-10 w-full flex flex-row gap-3 items-center justify-center">
      {isLoading ? (
        <div role="status" className="flex items-center gap-3">
          <svg
            aria-hidden="true"
            className="animate-spin rounded-full h-8 w-8 border-t-4 border-b-4 border-indigo-500"
            viewBox="0 0 50 50"
            xmlns="http://www.w3.org/2000/svg"
          ></svg>
          <p className="text-sm text-gray-700">Search...</p>
        </div>
      ) : data && data.length > 0 ? (
        <p className="text-sm text-gray-700">Data fetched successfully!</p>
      ) : (
        <div className="flex flex-col items-center">
          <img
            src="/path/to/not-found-image.png"
            alt="Not Found"
            className="h-40 w-40"
          />
          <p className="text-sm text-gray-700 mt-4">No results found.</p>
        </div>
      )}
    </div>
  );
};

export default Loader;