const CollegeList = ({
  givenData,
  selectedCaste,
  getCutoffForCollege,
  selectedBranch,
  cutoffs,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
      {false ? (
        <div className="col-span-full flex justify-center items-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-indigo-500"></div>
        </div>
      ) : givenData?.length > 0 ? (
        givenData?.map((college, i) => (
          <div
            key={i}
            className="shadow-md hover:shadow-2xl transition-transform p-4 bg-white flex flex-col overflow-hidden rounded-lg hover:scale-105 duration-300"
          >
            <img
              src="https://www.shutterstock.com/image-photo/group-students-digital-tablet-laptop-600nw-2347371743.jpg"
              alt="No Found"
              className="h-34 object-cover"
            />

            <div className="p-3 flex-1 flex flex-col gap-2">
              <h2 className="text-base font-bold text-gray-800 truncate">
                {college.collegeName}
              </h2>
              <p className="text-xs text-gray-600">
                📍 {college.address?.dist}, {college.address?.state}
              </p>
              <p className="text-xs text-gray-600">
                🏫 {college.affiliatedUniversity}
              </p>
              <p className="text-xs">
                🏷️ <strong>Type:</strong> {college.collegeType}
              </p>
              <p className="text-xs">
                📅 <strong>Established:</strong> {college.establishedYear}
              </p>
              {selectedCaste && (
                <p className="text-xs">
                  📊 <strong>Cutoff ({selectedCaste}):</strong>{" "}
                  {getCutoffForCollege(
                    college._id,
                    selectedBranch,
                    selectedCaste
                  ) || "N/A"}
                  %
                </p>
              )}
              {cutoffs
                .filter(
                  (cutoff) =>
                    cutoff.collegeId?._id === college._id &&
                    (!selectedBranch || cutoff.branch_name === selectedBranch)
                )
                .map((cutoff, index) => (
                  <p key={index} className="text-xs">
                    🌿 <strong>Branch:</strong> {cutoff.branch_name} <br /> 📅{" "}
                    <strong>Year:</strong> {cutoff.year}
                  </p>
                ))}
            </div>

            <div className="flex gap-2 mt-auto">
              <a
                href={`tel:${college.contactDetails}`}
                className="flex-1 bg-indigo-100 text-indigo-700 text-center py-2 rounded-md text-xs flex items-center justify-center gap-1 hover:bg-indigo-200"
              >
                📞 Contact
              </a>
              <a
                href={college.applicationFormURL || college.websiteURL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-indigo-600 text-white text-center py-2 rounded-md text-xs flex items-center justify-center gap-1 hover:bg-indigo-700"
              >
                📝 Apply
              </a>
            </div>
          </div>
        ))
      ) : (
        <p className="col-span-full text-center py-16 text-gray-500">
          {selectedCaste
            ? "No colleges found matching your criteria."
            : "Select education, percentage, and caste to search for colleges."}
        </p>
      )}
    </div>
  );
};

export default CollegeList;
