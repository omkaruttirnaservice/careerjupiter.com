import { MapPin, Users, BookOpen, Search } from "lucide-react";
import { useState } from "react";
import { getEligibleColleges } from "./Api";

const SearchForm = ({
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
  currentEducation,
  subBranch,
  setSubBranch
}) => {

    const [selectedEducation, setSelectedEducation] = useState("");
    const [isSearching, setIsSearching] = useState(false);


    // Handle when education is selected
  const handleEducationChange = (selected) => {
    setSelectedEducation(selected);
    // Find the matching education by its category
    const matching = currentEducation.find(
      (item) => item.category === selected
    );
    if (matching) {
      setSubBranch(matching.subCategory);
    } else {
      setSubBranch([]);
    }
  };

  const handleFetch = async () => {

  setIsSearching(true);
  
  try {
    const response = await getEligibleColleges({ 
      percentage: percentage1, 
      caste: selectedCaste, 
      category: selectedEducation, 
      district: selectedDistrict, 
      subCategory: selectedBranch 
    });

    console.log("Eligible Colleges", response.data);
    // Handle response as per your application
  } catch (error) {
    console.error(error);
    alert("Failed to fetch eligible colleges.");
  } finally {
    setIsSearching(false);
  }
};
  

  return (
    <div className="w-full md:w-[80%] mx-auto p-4 sm:p-6 bg-white rounded-xl shadow-lg border border-gray-100 my-4 md:my-8">
      {/* Academic Information */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <BookOpen className="w-5 h-5 text-blue-600" />
          </div>
          <h2 className="text-base font-semibold text-gray-700">Academic Information</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-600">Current Education Level</label>
            <select
              value={selectedEducation}
              onChange={(e) => handleEducationChange(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm cursor-pointer"
            >
              <option value="">Select Current Education</option>
              {currentEducation?.map((education, index) => (
                <option key={index} value={education.category}>
                  {education.category}
                </option>
              ))}
            </select>
          </div>

          {selectedEducation !== "10th" && (
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-600">Qualifying Exam</label>
              <select
                value={selectedExam}
                onChange={(e) => setSelectedExam(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer text-sm"
              >
                <option value="">Select Exam</option>
                {examOptions.map((exam, index) => (
                  <option key={index} value={exam}>
                    {exam}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-600">Percentage/Score</label>
            <input
              type="number"
              value={percentage1}
              onChange={(e) => setPercentage(e.target.value)}
              placeholder="Enter percentage"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm cursor-pointer"
              min="0"
              max="100"
              step="0.01"
            />
          </div>
        </div>
      </div>

      {/* Combined Location & Category + Course Selection */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Location & Category */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <MapPin className="w-5 h-5 text-green-600" />
            </div>
            <h2 className="text-base font-semibold text-gray-700">Location & Category</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-600">Preferred District</label>
              <select
                value={selectedDistrict}
                onChange={(e) => handleDistrictChange(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm cursor-pointer"
              >
                <option value="">Select District</option>
                {districts?.map((district, index) => (
                  <option key={index} value={district}>
                    {district}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-600">Category</label>
              <select
                value={selectedCaste}
                onChange={(e) => handleCasteChange(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm cursor-pointer"
              >
                <option value="">Select Category</option>
                {casteOptions.map((caste, index) => (
                  <option key={index} value={caste}>
                    {caste}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Course Selection */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Users className="w-5 h-5 text-purple-600" />
            </div>
            <h2 className="text-base font-semibold text-gray-700">Course Selection</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-600">Preferred Branch/Course</label>
              <select
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm cursor-pointer"
              >
                <option value="">Select Branch</option>
                {subBranch.map((branch, index) => (
                  <option key={index} value={branch}>
                    {branch}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-10 flex justify-center">
              <button
                onClick={handleFetch}
                disabled={isSearching}
                className="w-full sm:w-auto px-6 py-2  bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
              >
                {isSearching ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Searching...</span>
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4" />
                    <span>Search Colleges</span>
                  </>
                )}
              </button>
            </div>
    </div>
  );
};

export default SearchForm;