"use client"

import { useState, useEffect } from "react"
import { FiFilter, FiStar, FiX } from "react-icons/fi"

const MyEligibility = () => {
  const [selectedEducation, setSelectedEducation] = useState("")
  const [examOptions, setExamOptions] = useState([])
  const [selectedExam, setSelectedExam] = useState("")
  const [percentage, setPercentage] = useState("")
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
  const [selectedBranch, setSelectedBranch] = useState("") // State for selected branch

  const [phoneNumber, setPhoneNumber] = useState("")
  const [otp, setOtp] = useState("")
  const [isOtpSent, setIsOtpSent] = useState(false)
  const [isOtpVerified, setIsOtpVerified] = useState(false)

  // Dynamic college data with branches and last year's cutoff based on caste
  const localCollegeData = {
    Pune: [
      {
        name: "Local School Pune",
        location: "Pune",
        rating: 4.0,
        distance: 1.0,
        popularity: 80,
        type: "Local",
        cutoff: { Open: 75, OBC: 70, SC: 65, ST: 60 }, // Added cutoff for 10th
      },
      {
        name: "Local College Pune",
        location: "Pune",
        rating: 4.2,
        distance: 1.5,
        popularity: 85,
        type: "Local",
        cutoff: { Open: 80, OBC: 75, SC: 70, ST: 65 }, // Added cutoff for 10th
      },
    ],
  }

  const higherLevelCollegeData = {
    Pune: [
      {
        name: "MIT Pune",
        location: "Pune",
        branches: {
          "Computer Science": { lastYearCutoff: { Open: 85, OBC: 80, SC: 75, ST: 70 } },
          "Mechanical": { lastYearCutoff: { Open: 80, OBC: 75, SC: 70, ST: 65 } },
        },
        rating: 4.5,
        distance: 2.5,
        popularity: 95,
        type: "Private",
      },
      {
        name: "COEP",
        location: "Pune",
        branches: {
          "Computer Science": { lastYearCutoff: { Open: 90, OBC: 85, SC: 80, ST: 75 } },
          "Civil": { lastYearCutoff: { Open: 85, OBC: 80, SC: 75, ST: 70 } },
        },
        rating: 4.8,
        distance: 1.8,
        popularity: 98,
        type: "Government",
      },
    ],
    Mumbai: [
      {
        name: "IIT Bombay",
        location: "Mumbai",
        branches: {
          "Computer Science": { lastYearCutoff: { Open: 98, OBC: 95, SC: 90, ST: 85 } },
          "Electrical": { lastYearCutoff: { Open: 95, OBC: 92, SC: 88, ST: 85 } },
        },
        rating: 4.9,
        distance: 5.2,
        popularity: 100,
        type: "Government",
      },
    ],
    Nagpur: [
      {
        name: "VNIT Nagpur",
        location: "Nagpur",
        branches: {
          "Computer Science": { lastYearCutoff: { Open: 95, OBC: 90, SC: 85, ST: 80 } },
          "Mechanical": { lastYearCutoff: { Open: 90, OBC: 85, SC: 80, ST: 75 } },
        },
        rating: 4.7,
        distance: 6.3,
        popularity: 94,
        type: "Government",
      },
    ],
  }

  const educationOptions = {
    "10th": ["Diploma", "ITI"],
    "11th": ["Science", "Commerce", "Arts"],
    "12th": ["JEE", "NEET", "CET"],
  }

  const casteOptions = ["Open", "OBC", "SC", "ST"]
  const collegeTypes = ["Government", "Private", "Deemed", "Autonomous"]
  const ratingOptions = ["4+ Stars", "3+ Stars", "2+ Stars"]

  useEffect(() => {
    if (selectedDistrict) {
      applyAllFilters()
    }
  }, [selectedDistrict, collegeType, ratingFilter, cutoffRange.min, cutoffRange.max, sortOrder, selectedCaste, selectedBranch])

  const handleEducationChange = (education) => {
    setSelectedEducation(education)
    setSelectedExam("")
    setExamOptions(educationOptions[education] || [])
    setColleges([])
    setFilteredColleges([])
    setSelectedBranch(""); // Reset selected branch when education changes
  }

  const handleDistrictChange = (district) => {
    setSelectedDistrict(district)
    const districtColleges = selectedEducation === "10th" ? localCollegeData[district] || [] : higherLevelCollegeData[district] || [];
    setColleges(districtColleges)
    setFilteredColleges(districtColleges)

    // Reset selected branch when district changes
    setSelectedBranch("");

    // Apply current filters
    applyAllFilters(districtColleges)
  }

  const handleCasteChange = (caste) => {
    setSelectedCaste(caste)
  }

  const handleSortChange = (order, collegeList = filteredColleges) => {
    setSortOrder(order)
    const sortedColleges = [...collegeList]

    switch (order) {
      case "popularity":
        sortedColleges.sort((a, b) => b.popularity - a.popularity)
        break
      case "ratingHighToLow":
        sortedColleges.sort((a, b) => b.rating - a.rating)
        break
      case "cutoffLowToHigh":
        sortedColleges.sort((a, b) => {
          const aCutoff = a.branches[selectedBranch]?.lastYearCutoff[selectedCaste] || 0
          const bCutoff = b.branches[selectedBranch]?.lastYearCutoff[selectedCaste] || 0
          return aCutoff - bCutoff
        })
        break
      case "cutoffHighToLow":
        sortedColleges.sort((a, b) => {
          const aCutoff = a.branches[selectedBranch]?.lastYearCutoff[selectedCaste] || 0
          const bCutoff = b.branches[selectedBranch]?.lastYearCutoff[selectedCaste] || 0
          return bCutoff - aCutoff
        })
        break
      case "distance":
        sortedColleges.sort((a, b) => a.distance - b.distance)
        break
      default:
        break
    }

    setFilteredColleges(sortedColleges)

    // Add to active filters if not already there
    if (order && !activeFilters.some((filter) => filter.type === "sort")) {
      setActiveFilters([...activeFilters, { type: "sort", value: getSortLabel(order), id: "sort" }])
    } else if (order) {
      setActiveFilters(
        activeFilters.map((filter) => (filter.type === "sort" ? { ...filter, value: getSortLabel(order) } : filter)),
      )
    }
  }

  const getSortLabel = (sortType) => {
    switch (sortType) {
      case "popularity":
        return "Popularity"
      case "ratingHighToLow":
        return "Rating: High to Low"
      case "cutoffLowToHigh":
        return "Cutoff: Low to High"
      case "cutoffHighToLow":
        return "Cutoff: High to Low"
      case "distance":
        return "Distance"
      default:
        return sortType
    }
  }

  const handleCollegeTypeChange = (type) => {
    setCollegeType(type)

    // Add to active filters
    if (type && !activeFilters.some((filter) => filter.type === "collegeType")) {
      setActiveFilters([...activeFilters, { type: "collegeType", value: `Type: ${type}`, id: "collegeType" }])
    } else if (type) {
      setActiveFilters(
        activeFilters.map((filter) => (filter.type === "collegeType" ? { ...filter, value: `Type: ${type}` } : filter)),
      )
    }
  }

  const handleRatingChange = (rating) => {
    setRatingFilter(rating)

    // Add to active filters
    if (rating && !activeFilters.some((filter) => filter.type === "rating")) {
      setActiveFilters([...activeFilters, { type: "rating", value: `Rating: ${rating}`, id: "rating" }])
    } else if (rating) {
      setActiveFilters(
        activeFilters.map((filter) => (filter.type === "rating" ? { ...filter, value: `Rating: ${rating}` } : filter)),
      )
    }
  }

  const handleCutoffRangeChange = (min, max) => {
    setCutoffRange({ min, max })

    // Add to active filters
    if ((min || max) && !activeFilters.some((filter) => filter.type === "cutoff")) {
      setActiveFilters([
        ...activeFilters,
        {
          type: "cutoff",
          value: `Cutoff: ${min || "0"}-${max || "100"}%`,
          id: "cutoff",
        },
      ])
    } else if (min || max) {
      setActiveFilters(
        activeFilters.map((filter) =>
          filter.type === "cutoff"
            ? {
                ...filter,
                value: `Cutoff: ${min || "0"}-${max || "100"}%`,
              }
            : filter,
        ),
      )
    }
  }

  const applyAllFilters = (initialColleges = null) => {
    let filteredColleges = initialColleges || (selectedDistrict ? (selectedEducation === "10th" ? localCollegeData[selectedDistrict] : higherLevelCollegeData[selectedDistrict]) : [])

    // Apply college type filter
    if (collegeType) {
      filteredColleges = filteredColleges.filter((college) => college.type === collegeType)
    }

    // Apply rating filter
    if (ratingFilter) {
      const minRating = Number.parseInt(ratingFilter.split("+")[0])
      filteredColleges = filteredColleges.filter((college) => college.rating >= minRating)
    }

    // Apply cutoff range filter
    if (cutoffRange.min || cutoffRange.max) {
      filteredColleges = filteredColleges.filter((college) => {
        const cutoff = selectedEducation === "10th" ? college.cutoff[selectedCaste] : college.branches[selectedBranch]?.lastYearCutoff[selectedCaste] || 0;
        const min = cutoffRange.min ? Number.parseInt(cutoffRange.min) : 0
        const max = cutoffRange.max ? Number.parseInt(cutoffRange.max) : 100
        return cutoff >= min && cutoff <= max
      })
    }

    // Apply current sort
    if (sortOrder) {
      handleSortChange(sortOrder, filteredColleges)
    } else {
      setFilteredColleges(filteredColleges)
    }
  }

  const handleRemoveFilter = (filterId) => {
    // Remove from active filters
    setActiveFilters(activeFilters.filter((filter) => filter.id !== filterId))

    // Reset the corresponding filter state
    switch (filterId) {
      case "sort":
        setSortOrder("")
        break
      case "collegeType":
        setCollegeType("")
        break
      case "rating":
        setRatingFilter("")
        break
      case "cutoff":
        setCutoffRange({ min: "", max: "" })
        break
      default:
        break
    }
  }

  const handleClearAll = () => {
    setSortOrder("")
    setCollegeType("")
    setRatingFilter("")
    setCutoffRange({ min: "", max: "" })
    setActiveFilters([])

    if (selectedDistrict) {
      setFilteredColleges(localCollegeData[selectedDistrict] || [])
    }
  }

  const handleFilterToggle = () => {
    setShowFilter(!showFilter)
  }

  const handleCloseFilter = () => {
    setShowFilter(false)
  }

  const handleApplyFilters = () => {
    applyAllFilters()
    setShowFilter(false)
  }

  // Handle OTP actions
  const handleGetOtp = () => {
    setIsOtpSent(true)
  }

  const handleVerifyOtp = () => {
    if (otp === "1234") {
      setIsOtpVerified(true)
    } else {
      alert("Invalid OTP")
    }
  }

  return (
    <div className="p-8 flex justify-center items-center">
      <div className="w-full max-w-4xl space-y-8">
        <h1 className="text-3xl font-bold text-center text-gray-800">Check Your Eligibility</h1>

        {/* Phone Number + OTP */}
        <div className="flex justify-center gap-4">
          <input
            type="number"
            placeholder="Enter your phone number"
            className="w-[80%] border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            disabled={isOtpVerified}
          />
          {!isOtpSent ? (
            <button
              onClick={handleGetOtp}
              className="bg-indigo-500 cursor-pointer text-white rounded-lg px-4 py-2 hover:bg-indigo-600"
              disabled={isOtpVerified}
            >
              Get OTP
            </button>
          ) : (
            <>
              <input
                type="text"
                placeholder="Enter OTP"
                className="w-[60%] border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <button
                onClick={handleVerifyOtp}
                className="bg-indigo-500 cursor-pointer text-white rounded-lg px-4 py-2 hover:bg-indigo-600"
              >
                Verify
              </button>
            </>
          )}
        </div>

        {/* OTP Status */}
        {isOtpVerified && <p className="text-green-500 text-center">OTP Verified Successfully!</p>}

        {/* Education + Exam + Percentage */}
        <div className="flex flex-col md:flex-row gap-4">
          <select
            value={selectedEducation}
            onChange={(e) => handleEducationChange(e.target.value)}
            className="w-full border rounded-lg px-4 py-2"
          >
            <option value="">Select Education</option>
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
            value={percentage}
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
            {Object.keys(localCollegeData).map((district, i) => (
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
            <option value="">Select Caste</option>
            {casteOptions.map((caste, i) => (
              <option key={i} value={caste}>
                {caste}
              </option>
            ))}
          </select>
        </div>

        {/* Branch Selection */}
        {selectedEducation && selectedDistrict && percentage && filteredColleges.length > 0 && selectedEducation !== "10th" && (
          <div className="flex flex-col md:flex-row gap-4">
            <select
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              className="w-full border rounded-lg px-4 py-2"
            >
              <option value="">Select Branch</option>
              {Object.keys(filteredColleges[0].branches).map((branch, index) => (
                <option key={index} value={branch}>
                  {branch}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Filter and Sort Controls */}
        <div className="flex justify-between items-center">
          {/* Filter Button */}
          <button
            onClick={handleFilterToggle}
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
            <button onClick={handleClearAll} className="cursor-pointer text-indigo-500 hover:text-indigo-700 text-sm ml-2 font-medium">
              Clear All
            </button>
          </div>
        )}

        {/* Filter Popup */}
        {showFilter && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-4xl flex flex-col overflow-hidden">
              {/* Header */}
              <div className="flex justify-between items-center p-4 border-b">
                <h3 className="text-xl font-medium">Filters</h3>
                <button onClick={handleCloseFilter} className="hover:bg-red-600 cursor-pointer text-gray-600 hover:text-white">
                  <FiX size={20} />
                </button>
              </div>

              {/* Horizontal Layout */}
              <div className="flex flex-col space-y-6 p-4 overflow-y-auto">
                {/* Sort by Section */}
                <div>
                  <div className="text-lg font-medium mb-2">Sort by</div>
                  <div className="flex space-x-4">
                    {["popularity", "ratingHighToLow", "cutoffLowToHigh", "cutoffHighToLow", "distance"].map((sort, index) => (
                      <label key={index} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="sort"
                          className="w-4 h-4 text-red-500 focus:ring-red-500"
                          checked={sortOrder === sort}
                          onChange={() => handleSortChange(sort)}
                        />
                        <span>{sort.replace(/([A-Z])/g, ' $1').trim()}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* College Type Section */}
                <div>
                  <div className="text-lg font-medium mb-2">College Type</div>
                  <div className="flex space-x-4">
                    {collegeTypes.map((type, index) => (
                      <label key={index} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="collegeType"
                          className="w-4 h-4 text-red-500 focus:ring-red-500"
                          checked={collegeType === type}
                          onChange={() => handleCollegeTypeChange(type)}
                        />
                        <span>{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Rating Section */}
                <div>
                  <div className="text-lg font-medium mb-2">Rating</div>
                  <div className="flex space-x-4">
                    {ratingOptions.map((rating, index) => (
                      <label key={index} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="rating"
                          className="w-4 h-4 text-red-500 focus:ring-red-500"
                          checked={ratingFilter === rating}
                          onChange={() => handleRatingChange(rating)}
                        />
                        <span>{rating}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Cutoff Range Section */}
                <div>
                  <div className="text-lg font-medium mb-2">Cutoff Range</div>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      className="border rounded-lg px-4 py-2 w-1/2"
                      value={cutoffRange.min}
                      onChange={(e) => handleCutoffRangeChange(e.target.value, cutoffRange.max)}
                    />
                    <span>-</span>
                    <input
                      type="number"
                      placeholder="Max"
                      className="border rounded-lg px-4 py-2 w-1/2"
                      value={cutoffRange.max}
                      onChange={(e) => handleCutoffRangeChange(cutoffRange.min, e.target.value)}
                    />
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

        {/* College List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {selectedEducation && percentage && filteredColleges.length > 0 ? (
            filteredColleges.map((college, i) => (
              <div key={i} className="border rounded-lg shadow-md hover:shadow-lg transition-shadow relative overflow-hidden">
                {/* Filter button on card */}
                <button
                  onClick={handleFilterToggle}
                  className="absolute top-2 right-2 cursor-pointer bg-gray-100 hover:bg-gray-200 p-1 rounded-full z-10"
                >
                  <FiFilter size={16} />
                </button>

                {/* Full-size College Image */}
                <img
                  src={college.image || "https://media.glassdoor.com/l/a5/4a/cc/32/jecc.jpg?signature=83117c2acc85cc1adaff4f3a1bf8203738d3dff1960dc9cd332df6c614edb15d"}
                  alt={college.name}
                  className="w-full h-55 object-cover"
                />

                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <h2 className="text-xl font-bold">{college.name}</h2>
                    <div className="flex items-center gap-1 bg-green-100 text-green-800 px-2 py-1 rounded">
                      <FiStar className="fill-current" />
                      <span>{college.rating}</span>
                    </div>
                  </div>

                  <div className="mt-2 space-y-1 text-sm text-gray-600">
                    <p><strong>Location:</strong> {college.location}</p>
                    <p><strong>Type:</strong> {college.type}</p>
                    <p><strong>Branch:</strong> {selectedBranch || "N/A"}</p>
                    <p><strong>Last Year Cutoff:</strong> {selectedEducation === "10th" ? college.cutoff[selectedCaste] : college.branches[selectedBranch]?.lastYearCutoff[selectedCaste] || "N/A"}</p>
                    <p><strong>Distance:</strong> {college.distance} km</p>
                    <p><strong>Popularity:</strong> {college.popularity}%</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-2 text-center py-8">No colleges found</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default MyEligibility