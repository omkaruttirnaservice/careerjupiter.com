const SearchForm = ({
  selectedEducation,
  handleEducationChange,
  educationOptions,
  selectedExam,
  setSelectedExam,
  examOptions,
  percentage1,
  setPercentage,
  selectedDistrict,
  handleDistrictChange,
  districts,
  selectedCaste,
  handleCasteChange,
  casteOptions,
  selectedBranch,
  setSelectedBranch,
  getBranchOptions,
  handleFetch,
  isSearching,
}) => {
  return (
    <>
      {/* Education + Exam + Percentage */}
      <div className="flex flex-col md:flex-row gap-4">
        <select
          value={selectedEducation}
          onChange={(e) => handleEducationChange(e.target.value)}
          className="w-full border px-4 py-2"
        >
          <option value="">Select Current Education</option>
          {Object.keys(educationOptions).map((education, index) => (
            <option key={index} value={education}>
              {education}
            </option>
          ))}
        </select>

        {/* Only show exam select if education is not 10th */}
        {selectedEducation !== "10th" && (
          <select
            value={selectedExam}
            onChange={(e) => setSelectedExam(e.target.value)}
            className="w-full border px-4 py-2"
          >
            <option value="">Select Exam</option>
            {examOptions.map((exam, index) => (
              <option key={index} value={exam}>
                {exam}
              </option>
            ))}
          </select>
        )}

        <input
          type="number"
          value={percentage1}
          onChange={(e) => setPercentage(e.target.value)}
          placeholder="Enter percentage"
          className="w-full border px-4 py-2"
        />
      </div>

      {/* District + Caste */}
      <div className="flex flex-col md:flex-row gap-4">
        <select
          value={selectedDistrict}
          onChange={(e) => handleDistrictChange(e.target.value)}
          className="w-full border px-4 py-2"
        >
          <option value="">Select District</option>
          {districts.map((district, i) => (
            <option key={i} value={district}>
              {district}
            </option>
          ))}
        </select>

        <select
          value={selectedCaste}
          onChange={(e) => handleCasteChange(e.target.value)}
          className="w-full border px-4 py-2"
        >
          <option value="">Select category</option>
          {casteOptions.map((caste, i) => (
            <option key={i} value={caste}>
              {caste}
            </option>
          ))}
        </select>
      </div>

      {/* Branch Selection */}
      <div className="flex flex-col gap-4 items-center justify-center">
        <select
          value={selectedBranch}
          onChange={(e) => setSelectedBranch(e.target.value)}
          className="w-full border px-4 py-2"
        >
          <option value="">Select Branch</option>
          {getBranchOptions().map((branch, index) => (
            <option key={index} value={branch}>
              {branch}
            </option>
          ))}
        </select>

        <button
          onClick={handleFetch}
          className="w-full md:w-40 bg-indigo-600 text-white rounded-sm px-6 py-2 hover:bg-indigo-700 cursor-pointer"
        >
          {isSearching ? "Searching..." : "Search Colleges"}
        </button>
      </div>
    </>
  );
};

export default SearchForm;
