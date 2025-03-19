"use client"

import { useState, useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import { fetchCutoffs , fetchEligibleColleges } from "./Api" // Import the API functions
import { FiFilter, FiX } from "react-icons/fi"
import { useLocation } from "react-router-dom";

const MyEligibility = () => {

  const location = useLocation();
    const percentage1 = location.state?.percentage || 0; // Default value 0

  const [selectedEducation, setSelectedEducation] = useState("")
  const [examOptions, setExamOptions] = useState([])
  const [selectedExam, setSelectedExam] = useState("")
  const [percentage, setPercentage] = useState(0);
  const [selectedDistrict, setSelectedDistrict] = useState("")
  const [selectedCaste, setSelectedCaste] = useState("")
  const [sortOrder, setSortOrder] = useState("")
  const [colleges, setColleges] = useState([])
  const [filteredColleges, setFilteredColleges] = useState([])
  const [showFilter, setShowFilter] = useState(false)
  const [activeFilters, setActiveFilters] = useState([])
  const [collegeType, setCollegeType] = useState("")
  const [ratingFilter, setRatingFilter] = useState("")
  const [cutoffRange, setCutoffRange] = useState({ min: "", max: "" })
  const [selectedBranch, setSelectedBranch] = useState("")
  const [cutoffs, setCutoffs] = useState([])
  const [districts, setDistricts] = useState([])
  const [casteOptions, setCasteOptions] = useState([])
  const [isSearching, setIsSearching] = useState(false)

  // Define education options
  const educationOptions = {
    "10th": [],
    "12th": ["JEE", "NEET", "CET"],
  }

  // Fetch cutoffs using TanStack Query
  const { data: cutoffsData, isLoading: isCutoffsLoading } = useQuery({
    queryKey: ["cutoffs"],
    queryFn: fetchCutoffs, // Use the imported function
  })

  // Extract unique districts and castes from cutoff data
  useEffect(() => {
    if (cutoffsData) {
      setCutoffs(cutoffsData)

      // Extract unique districts
      const uniqueDistricts = [...new Set(cutoffsData.map((item) => item.collegeId?.address?.dist).filter(Boolean))]
      setDistricts(uniqueDistricts)

      // Extract unique castes from the first cutoff marks (assuming all have the same structure)
      if (cutoffsData.length > 0 && cutoffsData[0].cutoff?.marks) {
        const casteList = Object.keys(cutoffsData[0].cutoff.marks)
        setCasteOptions(casteList)
      }
    }
  }, [cutoffsData])

  // Fetch eligible colleges based on filters
  const fetchEligibleCollegesData = async () => {
    if (!selectedEducation || !percentage || !selectedCaste) {
      return
    }

    setIsSearching(true)
    try {
      const district = selectedDistrict || ""
      const response = await fetchEligibleColleges({
        education: selectedEducation,
        percentage: percentage,
        caste: selectedCaste,
        district: district,
        year: 2012
      });
      console.log("API Response:", response);


      if (response.success && response.data) {
        setColleges(response.data)
        setFilteredColleges(response.data)
      } else {
        setColleges([])
        setFilteredColleges([])
      }
    } catch (error) {
      console.error("Error fetching eligible colleges:", error.response ? error.response.data : error.message)
      setColleges([])
      setFilteredColleges([])
    } finally {
      setIsSearching(false)
    }
  }

  // Handle search button click
  const handleSearch = () => {
    fetchEligibleCollegesData()
  }

  useEffect(() => {
    applyAllFilters()
  }, [collegeType, ratingFilter,  cutoffRange.min, cutoffRange.max, sortOrder, selectedBranch, colleges])

  const handleEducationChange = (education) => {
    setSelectedEducation(education)
    setSelectedExam("")
    setExamOptions(educationOptions[education] || [])
    setColleges([])
    setFilteredColleges([])
    setSelectedBranch("") // Reset selected branch when education changes
  }

  const handleDistrictChange = (district) => {
    setSelectedDistrict(district)
  }

  const handleCasteChange = (caste) => {
    setSelectedCaste(caste)
  }

  const applyAllFilters = () => {
    if (!colleges.length) return

    let filtered = [...colleges]

    // Apply college type filter
    if (collegeType) {
      filtered = filtered.filter((college) => college.collegeType === collegeType)
    }

    // Apply branch filter
    if (selectedBranch) {
      filtered = filtered.filter((college) => {
        // Check if the college has the selected branch in cutoffs
        const collegeCutoffs = cutoffs.filter(
          (cutoff) => cutoff.collegeId?._id === college._id && cutoff.branch_name === selectedBranch,
        )
        return collegeCutoffs.length > 0
      })
    }

    // Apply cutoff range filter
    if (cutoffRange.min || cutoffRange.max) {
      filtered = filtered.filter((college) => {
        // Find the cutoff for this college and selected branch/caste
        const collegeCutoff = cutoffs.find(
          (cutoff) =>
            cutoff.collegeId?._id === college._id && (!selectedBranch || cutoff.branch_name === selectedBranch),
        )

        if (!collegeCutoff) return false

        const cutoffValue = collegeCutoff.cutoff.marks[selectedCaste] || 0
        const min = cutoffRange.min ? Number.parseInt(cutoffRange.min) : 0
        const max = cutoffRange.max ? Number.parseInt(cutoffRange.max) : 100

        return cutoffValue >= min && cutoffValue <= max
      })
    }

    // Apply sort order
    if (sortOrder) {
      filtered.sort((a, b) => {
        if (sortOrder === "cutoffLowToHigh") {
          const aCutoff = getCutoffForCollege(a._id, selectedBranch, selectedCaste)
          const bCutoff = getCutoffForCollege(b._id, selectedBranch, selectedCaste)
          return aCutoff - bCutoff
        } else if (sortOrder === "cutoffHighToLow") {
          const aCutoff = getCutoffForCollege(a._id, selectedBranch, selectedCaste)
          const bCutoff = getCutoffForCollege(b._id, selectedBranch, selectedCaste)
          return bCutoff - aCutoff
        }
        return 0
      })
    }

    setFilteredColleges(filtered)

    // Update active filters
    const newActiveFilters = []
    if (collegeType) newActiveFilters.push({ id: "collegeType", value: `Type: ${collegeType}` })
    if (selectedBranch) newActiveFilters.push({ id: "branch", value: `Branch: ${selectedBranch}` })
    if (cutoffRange.min || cutoffRange.max) {
      newActiveFilters.push({
        id: "cutoffRange",
        value: `Cutoff: ${cutoffRange.min || "0"} - ${cutoffRange.max || "100"}`,
      })
    }
    if (sortOrder) {
      const sortLabel =
        {
          cutoffLowToHigh: "Cutoff: Low to High",
          cutoffHighToLow: "Cutoff: High to Low",
        }[sortOrder] || sortOrder
      newActiveFilters.push({ id: "sort", value: `Sort: ${sortLabel}` })
    }

    setActiveFilters(newActiveFilters)
  }

  // Helper function to get cutoff for a college
  const getCutoffForCollege = (collegeId, branch, caste) => {
    const collegeCutoff = cutoffs.find(
      (cutoff) => cutoff.collegeId?._id === collegeId && (!branch || cutoff.branch_name === branch),
    )

    if (!collegeCutoff) return 0
    return collegeCutoff.cutoff.marks[caste] || 0
  }

  // Handle sort change
  const handleSortChange = (sort) => {
    setSortOrder(sort)
  }

  // Handle college type change
  const handleCollegeTypeChange = (type) => {
    setCollegeType(type)
  }

  // Handle rating change
  const handleRatingChange = (rating) => {
    setRatingFilter(rating)
  }

  // Handle cutoff range change
  const handleCutoffRangeChange = (min, max) => {
    setCutoffRange({ min, max })
  }

  // Handle apply filters
  const handleApplyFilters = () => {
    applyAllFilters()
    setShowFilter(false)
  }

  // Handle clear all filters
  const handleClearAll = () => {
    setCollegeType("")
    setRatingFilter("")
    setCutoffRange({ min: "", max: "" })
    setSortOrder("")
    setActiveFilters([])
  }

  // Handle remove filter
  const handleRemoveFilter = (filterId) => {
    if (filterId === "collegeType") setCollegeType("")
    if (filterId === "branch") setSelectedBranch("")
    if (filterId === "cutoffRange") setCutoffRange({ min: "", max: "" })
    if (filterId === "sort") setSortOrder("")

    setActiveFilters(activeFilters.filter((filter) => filter.id !== filterId))
  }

  // Get unique branches from cutoffs
  const getBranchOptions = () => {
    if (!cutoffs.length) return []
    const branches = [...new Set(cutoffs.map((cutoff) => cutoff.branch_name))]
    return branches.filter(Boolean)
  }

  return (
    <div className="p-8 flex justify-center items-center">
      <div className="w-full max-w-4xl space-y-8">
        <h1 className="text-3xl font-bold text-center text-gray-800">Check Your Eligibility</h1>

        {/* Education + Exam + Percentage */}
        <div className="flex flex-col md:flex-row gap-4">
          <select
            value={selectedEducation}
            onChange={(e) => handleEducationChange(e.target.value)}
            className="w-full border rounded-lg px-4 py-2"
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
              className="w-full border rounded-lg px-4 py-2"
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
            className="w-full border rounded-lg px-4 py-2"
          />
        </div>

        {/* District + Caste */}
        <div className="flex flex-col md:flex-row gap-4">
          <select
            value={selectedDistrict}
            onChange={(e) => handleDistrictChange(e.target.value)}
            className="w-full border rounded-lg px-4 py-2"
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
            className="w-full border rounded-lg px-4 py-2"
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
        <div className="flex flex-col md:flex-row gap-4">
          <select
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(e.target.value)}
            className="w-full border rounded-lg px-4 py-2"
          >
            <option value="">Select Branch</option>
            {getBranchOptions().map((branch, index) => (
              <option key={index} value={branch}>
                {branch}
              </option>
            ))}
          </select>

          <button
            onClick={handleSearch}
            className="w-full md:w-auto bg-indigo-600 text-white rounded-lg px-6 py-2 hover:bg-indigo-700 cursor-pointer"
            disabled={isSearching || !selectedEducation || !percentage || !selectedCaste}
          >
            {isSearching ? "Searching..." : "Search Colleges"}
          </button>
        </div>

        {/* Filter and Sort Controls */}
        <div className="flex justify-between items-center">
          {/* Filter Button */}
          <button
            onClick={() => setShowFilter(!showFilter)}
            className="cursor-pointer flex items-center justify-center gap-2 bg-indigo-500 text-white rounded-lg px-4 py-2 hover:bg-indigo-600"
          >
            <FiFilter /> Filter
          </button>
        </div>

        {/* Active Filters Display */}
        {activeFilters.length > 0 && (
          <div className="flex flex-wrap gap-2 items-center bg-gray-50 p-3 rounded-lg">
            <span className="text-sm font-medium">Active Filters:</span>
            {activeFilters.map((filter, index) => (
              <div key={index} className="flex items-center bg-white border rounded-full px-3 py-1 text-sm">
                {filter.value}
                <button
                  onClick={() => handleRemoveFilter(filter.id)}
                  className="cursor-pointer ml-2 text-gray-500 hover:text-gray-700"
                >
                  <FiX size={14} />
                </button>
              </div>
            ))}
            <button
              onClick={handleClearAll}
              className="cursor-pointer text-indigo-500 hover:text-indigo-700 text-sm ml-2 font-medium"
            >
              Clear All
            </button>
          </div>
        )}


{/* Filter Popup */}
{showFilter && (
  <div className="fixed top-0 left-0 w-full h-full bg-gradient-to-b from-black/50 to-black/50 backdrop-blur-xs flex justify-center items-center">

    <div className="bg-white rounded-2xl shadow-2xl w-[40%] max-w-4xl flex flex-col overflow-hidden transform transition-all duration-300 scale-105">
      {/* Header */}
      <div className="flex justify-between items-center p-5 border-b border-gray-200">
        <h3 className="text-2xl font-semibold text-gray-800">Filters</h3>
        <button
          onClick={() => setShowFilter(false)}
          className="p-2 rounded-full cursor-pointer bg-gray-200 hover:bg-red-500 hover:text-white transition"
        >
          <FiX size={24} />
        </button>
      </div>

      {/* Filter Content */}
      <div className="flex flex-col space-y-8 p-6 overflow-y-auto max-h-[70vh]">
        
        {/* Sort by Section */}
        <div>
          <h4 className="text-lg font-semibold text-gray-700 mb-3">Sort by</h4>
          <div className="flex flex-wrap gap-4">
            {["cutoffLowToHigh", "cutoffHighToLow"].map((sort, index) => (
              <label key={index} className="flex items-center gap-3 cursor-pointer text-gray-600 hover:text-red-500 transition">
                <input
                  type="radio"
                  name="sort"
                  className="w-5 h-5 text-red-500 accent-red-500"
                  checked={sortOrder === sort}
                  onChange={() => handleSortChange(sort)}
                />
                <span className="text-base">
                  {sort === "cutoffLowToHigh" ? "Cutoff: Low to High" : "Cutoff: High to Low"}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* College Type Section */}
        <div>
          <h4 className="text-lg font-semibold text-gray-700 mb-3">College Type</h4>
          <div className="flex flex-wrap gap-4">
            {["Government", "Private", "Deemed", "Autonomous"].map((type, index) => (
              <label key={index} className="flex items-center gap-3 cursor-pointer text-gray-600 hover:text-red-500 transition">
                <input
                  type="radio"
                  name="collegeType"
                  className="w-5 h-5 text-red-500 accent-red-500"
                  checked={collegeType === type}
                  onChange={() => handleCollegeTypeChange(type)}
                />
                <span className="text-base">{type}</span>
              </label>
            ))}
          </div>
        </div>

      </div>


              {/* Footer */}
              <div className="flex justify-between items-center p-4 border-t">
                <button onClick={handleClearAll} className="bg-red-600 text-white rounded-lg px-6 py-2 cursor-pointer">
                  Clear all
                </button>
                <button
                  onClick={handleApplyFilters}
                  className="bg-green-600 text-white rounded-lg px-6 py-2 cursor-pointer"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        )}

        {/* College card */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 ">
          {isSearching ? (
            <div className="col-span-full flex justify-center items-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-indigo-500"></div>
            </div>
          ) : filteredColleges.length > 0 ? (
            filteredColleges.map((college, i) => (
              <div
                key={i}
                className="shadow-md hover:shadow-2xl transition-transform p-4 bg-white flex flex-col overflow-hidden rounded-lg hover:scale-105 duration-300"
              >
                <img
                  src="https://www.shutterstock.com/image-photo/group-students-digital-tablet-laptop-600nw-2347371743.jpg"
                  alt="No Found"
                  className="h-34 object-cover "
                />

                <div className="p-3 flex-1 flex flex-col gap-2">
                  <h2 className="text-base font-bold text-gray-800 truncate">{college.collegeName}</h2>
                  <p className="text-xs text-gray-600">📍 {college.address?.dist}, {college.address?.state}</p>
                  <p className="text-xs text-gray-600">🏫 {college.affiliatedUniversity}</p>
                  <p className="text-xs">🏷️ <strong>Type:</strong> {college.collegeType}</p>
                  <p className="text-xs">📅 <strong>Established:</strong> {college.establishedYear}</p>
                  {selectedCaste && (
                    <p className="text-xs">📊 <strong>Cutoff ({selectedCaste}):</strong> {getCutoffForCollege(college._id, selectedBranch, selectedCaste) || 'N/A'}%</p>
                  )}
                  {cutoffs
                    .filter(cutoff => cutoff.collegeId?._id === college._id && (!selectedBranch || cutoff.branch_name === selectedBranch))
                    .map((cutoff, index) => (
                      <p key={index} className="text-xs">🌿 <strong>Branch:</strong> {cutoff.branch_name} <br/>  📅 <strong>Year:</strong> {cutoff.year}</p>
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
              {selectedEducation && percentage && selectedCaste ? 'No colleges found matching your criteria.' : 'Select education, percentage, and caste to search for colleges.'}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default MyEligibility