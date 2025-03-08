const Loader = () => {
  return (
    <div
      role="status"
      className="h-4 mt-10 w-full flex flex-row gap-3 items-center justify-center"
    >
      <svg
        aria-hidden="true"
        className="animate-spin rounded-full h-8 w-8 border-t-4 border-b-4 border-indigo-500"
        viewBox="0 0 50 50"
        xmlns="http://www.w3.org/2000/svg"
      >
      </svg>
      <p className="text-sm text-gray-700">Search...</p>
    </div>
  );
};

export default Loader;
