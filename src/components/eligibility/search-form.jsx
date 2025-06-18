import { MapPin, Users, BookOpen, Search } from "lucide-react";
import { useState, useEffect } from "react";
import { getEligibleColleges } from "./Api";
import CollegeList from "./college-list";
import { useDispatch } from "react-redux";
import { setCollegeList, setSearchParams } from "../../store-redux/eligibilitySlice";

const SearchForm = ({
  selectedExam,
  setSelectedExam,
  percentage1,
  setPercentage,
  selectedDistrict,
  handleDistrictChange,
  districts,
  selectedCaste,
  handleCasteChange,
  selectedBranch,
  setSelectedBranch,
  currentEducation,
  category,
}) => {
  const dispatch = useDispatch();

  const [selectedEducation, setSelectedEducation] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [collegeData, setCollegeData] = useState([]);
  const [exams, setExams] = useState([]);
  const [casts, setCasts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [availableSubCategories, setAvailableSubCategories] = useState([]);

  // Restore from localStorage on mount
  useEffect(() => {
    const savedForm = JSON.parse(localStorage.getItem("eligibilityForm")) || {};
    const savedCollegeData = JSON.parse(localStorage.getItem("collegeData")) || [];

    setSelectedEducation(savedForm.selectedEducation || "");
    setSelectedExam(savedForm.selectedExam || "");
    setPercentage(savedForm.percentage1 || "");
    handleDistrictChange(savedForm.selectedDistrict || "");
    handleCasteChange(savedForm.selectedCaste || "");
    setSelectedCategory(savedForm.selectedCategory || "");
    setSelectedBranch(savedForm.selectedBranch || "");
    setCollegeData(savedCollegeData);

    // Auto-load exam and caste options if education is already selected
    const eduMatch = currentEducation?.find(item => item.nextLearn === savedForm.selectedEducation);
    if (eduMatch) {
      setExams(eduMatch.exam || []);
      setCasts(eduMatch.caste || []);
    }

    // Auto-load branch options
    const catMatch = category?.find(item => item.category === savedForm.selectedCategory);
    if (catMatch) {
      setAvailableSubCategories(catMatch.subCategory || []);
    }
  }, [currentEducation, category]);

  const handleEducationChange = (selected) => {
    setSelectedEducation(selected);
    const match = currentEducation.find((item) => item?.nextLearn === selected);
    if (match) {
      setCasts(match.caste || []);
      setExams(match.exam || []);
    } else {
      setCasts([]);
      setExams([]);
    }
  };

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    const matched = category.find((cat) => cat.category === value);
    setAvailableSubCategories(matched?.subCategory || []);
    setSelectedBranch("");
  };

  const handleFetch = async () => {
    setIsSearching(true);
    const payload = {
      percentage: percentage1,
      caste: selectedCaste,
      category: selectedCategory,
      district: selectedDistrict,
      subCategory: selectedBranch,
    };

    try {
      dispatch(setSearchParams(payload));
      const response = await getEligibleColleges(payload);
      const colleges = response?.data?.data || [];
      dispatch(setCollegeList(colleges));
      setCollegeData(colleges);

      // Save to localStorage
      const formValues = {
        selectedEducation,
        selectedExam,
        percentage1,
        selectedDistrict,
        selectedCaste,
        selectedCategory,
        selectedBranch,
      };
      localStorage.setItem("eligibilityForm", JSON.stringify(formValues));
      localStorage.setItem("collegeData", JSON.stringify(colleges));
    } catch (error) {
      console.error("Error fetching colleges:", error);
    } finally {
      setIsSearching(false);
    }
  };

  return (
      <div className="w-full md:w-[90%] mx-auto p-4 sm:p-6 bg-white rounded-xl shadow-lg border border-gray-100 my-6 relative">
  {/* Clear History Button */}
  <button
    onClick={() => {
      localStorage.removeItem("eligibilityForm");
      localStorage.removeItem("collegeData");

      setSelectedEducation("");
      setSelectedExam("");
      setPercentage("");
      handleDistrictChange("");
      handleCasteChange("");
      setSelectedCategory("");
      setSelectedBranch("");
      setCollegeData([]);
      setExams([]);
      setCasts([]);
      setAvailableSubCategories([]);
    }}
    className="absolute top-4 right-4 text-sm px-4 py-1 bg-red-100 text-red-600 border border-red-300 rounded-md hover:bg-red-200 transition"
  >
    Clear History
  </button>

      {/* Academic Info */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
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
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm"
            >
              <option value="">Select Current Education</option>
              {currentEducation?.map((edu, idx) => (
                <option key={idx} value={edu.nextLearn}>{edu.nextLearn}</option>
              ))}
            </select>
          </div>

          {selectedEducation !== "10th" && (
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-600">Qualifying Exam</label>
              <select
                value={selectedExam}
                onChange={(e) => setSelectedExam(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm"
              >
                <option value="">Select Exam</option>
                {exams?.map((exam, idx) => (
                  <option key={idx} value={exam}>{exam}</option>
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
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm"
              min="0"
              max="100"
              step="0.01"
            />
          </div>
        </div>
      </div>

      {/* Location + Category & Course */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Location & Caste */}
        <div>
          <div className="flex items-center gap-3 mb-4">
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
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 text-sm"
              >
                <option value="">Select District</option>
                {districts?.map((district, idx) => (
                  <option key={idx} value={district}>{district}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-600">Caste Category</label>
              <select
                value={selectedCaste}
                onChange={(e) => handleCasteChange(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 text-sm"
              >
                <option value="">Select Category</option>
                {casts?.map((cast, idx) => (
                  <option key={idx} value={cast}>{cast}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Future Eligibility + Branch */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Users className="w-5 h-5 text-purple-600" />
            </div>
            <h2 className="text-base font-semibold text-gray-700">Course Selection</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-600">Future Eligibility</label>
              <select
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 text-sm"
              >
                <option value="">Select Future Eligibility</option>
                {category?.map((cat, idx) => (
                  <option key={idx} value={cat.category}>{cat.category}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-600">Preferred Branch/Course</label>
              <select
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 text-sm"
              >
                <option value="">Select Branch</option>
                {availableSubCategories?.map((branch, idx) => (
                  <option key={idx} value={branch}>{branch}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Search Button */}
      <div className="pt-10 flex justify-center">
        <button
          onClick={handleFetch}
          disabled={isSearching}
          className="w-full sm:w-auto px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
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

      {/* College List */}
      <div className="mt-8">
        {collegeData.length > 0 ? (
          <CollegeList givenData={collegeData} />
        ) : (
          !isSearching && <p className="text-center text-gray-500">No colleges found matching your criteria.</p>
        )}
      </div>
    </div>
  );
};

export default SearchForm;
