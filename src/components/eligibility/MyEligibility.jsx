"use client"

import { useState } from "react"
import { FiMapPin, FiPercent, FiFilter, FiStar, FiX, FiNavigation } from "react-icons/fi"

const MyEligibility = () => {
  const [selectedEducation, setSelectedEducation] = useState("")
  const [examOptions, setExamOptions] = useState([])
  const [selectedExam, setSelectedExam] = useState("")
  const [percentage, setPercentage] = useState("")
  const [selectedDistrict, setSelectedDistrict] = useState("")
  const [selectedCaste, setSelectedCaste] = useState("")
  const [sortOrder, setSortOrder] = useState("")
  const [colleges, setColleges] = useState([])
  const [showFilter, setShowFilter] = useState(false)

  const [phoneNumber, setPhoneNumber] = useState("")
  const [otp, setOtp] = useState("")
  const [isOtpSent, setIsOtpSent] = useState(false)
  const [isOtpVerified, setIsOtpVerified] = useState(false)

  // Added mock distances for demonstration
  const collegeData = {
    Pune: [
      {
        name: "MIT Pune",
        location: "Pune",
        cutoff: { Open: 85, OBC: 75, SC: 65, ST: 60 },
        rating: 4.5,
        distance: 2.5,
        popularity: 95,
      },
      {
        name: "COEP",
        location: "Pune",
        cutoff: { Open: 90, OBC: 80, SC: 70, ST: 65 },
        rating: 4.8,
        distance: 1.8,
        popularity: 98,
      },
      {
        name: "VIT Pune",
        location: "Pune",
        cutoff: { Open: 80, OBC: 70, SC: 60, ST: 55 },
        rating: 4.2,
        distance: 3.7,
        popularity: 90,
      },
    ],
    Mumbai: [
      {
        name: "IIT Bombay",
        location: "Mumbai",
        cutoff: { Open: 98, OBC: 88, SC: 78, ST: 75 },
        rating: 4.9,
        distance: 5.2,
        popularity: 100,
      },
      {
        name: "NMIMS",
        location: "Mumbai",
        cutoff: { Open: 92, OBC: 82, SC: 72, ST: 68 },
        rating: 4.6,
        distance: 4.1,
        popularity: 92,
      },
    ],
    Nagpur: [
      {
        name: "VNIT Nagpur",
        location: "Nagpur",
        cutoff: { Open: 95, OBC: 85, SC: 75, ST: 70 },
        rating: 4.7,
        distance: 6.3,
        popularity: 94,
      },
      {
        name: "Ramdeobaba College",
        location: "Nagpur",
        cutoff: { Open: 85, OBC: 75, SC: 65, ST: 60 },
        rating: 4.3,
        distance: 7.8,
        popularity: 88,
      },
    ],
  }

  const casteOptions = ["Open", "OBC", "SC", "ST"]

  const handleEducationChange = (education) => {
    setSelectedEducation(education)
    setSelectedExam("")
    setExamOptions(education === "12th" ? ["JEE", "NEET", "CET"] : education === "Pharmacy" ? ["GPAT", "CET"] : [])
    setColleges([])
  }

  const handleDistrictChange = (district) => {
    setSelectedDistrict(district)
    const districtColleges = collegeData[district] || []
    setColleges(districtColleges)
    // Apply current sort if any
    if (sortOrder) {
      handleSortChange(sortOrder, districtColleges)
    }
  }

  const handleCasteChange = (caste) => {
    setSelectedCaste(caste)
  }

  const handleSortChange = (order, collegeList = colleges) => {
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
          const aCutoff = a.cutoff[selectedCaste] || 0
          const bCutoff = b.cutoff[selectedCaste] || 0
          return aCutoff - bCutoff
        })
        break
      case "cutoffHighToLow":
        sortedColleges.sort((a, b) => {
          const aCutoff = a.cutoff[selectedCaste] || 0
          const bCutoff = b.cutoff[selectedCaste] || 0
          return bCutoff - aCutoff
        })
        break
      case "distance":
        sortedColleges.sort((a, b) => a.distance - b.distance)
        break
      default:
        // No sorting
        break
    }

    setColleges(sortedColleges)
  }

  const handleClearAll = () => {
    setSortOrder("")
    if (selectedDistrict) {
      setColleges(collegeData[selectedDistrict] || [])
    }
  }

  const handleFilterToggle = () => {
    setShowFilter(!showFilter)
  }

  const handleCloseFilter = () => {
    setShowFilter(false)
  }

  // Handle OTP actions
  const handleGetOtp = () => {
    // Here, you can integrate OTP sending logic (like calling an API to send OTP).
    // For now, we simulate OTP sending by showing the OTP input field.
    setIsOtpSent(true)
  }

  const handleVerifyOtp = () => {
    // Here, you can integrate OTP verification logic (like calling an API to verify OTP).
    // For now, we simulate OTP verification.
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
              className="bg-indigo-500 text-white rounded-lg px-4 py-2 hover:bg-indigo-600"
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
                className="bg-indigo-500 text-white rounded-lg px-4 py-2 hover:bg-indigo-600"
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
            <option value="10th">10th</option>
            <option value="12th">12th</option>
            <option value="Graduation">Graduation</option>
            <option value="Pharmacy">Pharmacy</option>
          </select>

          {/* Only show exam select if education is not 10th or Graduation */}
          {selectedEducation !== "10th" && selectedEducation !== "Graduation" && (
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
            {Object.keys(collegeData).map((district, i) => (
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

        {/* Filter Button */}
        <button
          onClick={handleFilterToggle}
          className="cursor-pointer flex items-center justify-center gap-2 bg-indigo-500 text-white rounded-lg px-4 py-2 hover:bg-indigo-600"
        >
          <FiFilter /> Filter
        </button>

        {/* Filter Popup */}
        {showFilter && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-md flex overflow-hidden">
              {/* Left sidebar */}
              <div className="w-[40%] bg-gray-50 py-4">
                <div className="px-4 py-2 font-medium text-red-500 border-l-4 border-red-500 bg-white">Sort by</div>
                <div className="px-4 py-2 font-medium">College Type</div>
                <div className="px-4 py-2 font-medium">Rating</div>
                <div className="px-4 py-2 font-medium">Cutoff Range</div>
                <div className="px-4 py-2 font-medium">More filters</div>
              </div>

              {/* Main content */}
              <div className="w-[60%] flex flex-col">
                <div className="flex justify-between items-center p-4 border-b">
                  <h3 className="text-xl font-medium">Filters</h3>
                  <button onClick={handleCloseFilter} className="text-gray-600 hover:text-gray-800">
                    <FiX size={20} />
                  </button>
                </div>

                <div className="flex-1 p-4 overflow-y-auto">
                  <div className="mb-4">
                    <div className="text-lg font-medium mb-2">Sort by</div>

                    <div className="space-y-3 mt-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="sort"
                          className="w-4 h-4 text-red-500 focus:ring-red-500"
                          checked={sortOrder === "popularity"}
                          onChange={() => handleSortChange("popularity")}
                        />
                        <span>Popularity</span>
                      </label>

                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="sort"
                          className="w-4 h-4 text-red-500 focus:ring-red-500"
                          checked={sortOrder === "ratingHighToLow"}
                          onChange={() => handleSortChange("ratingHighToLow")}
                        />
                        <span>Rating: High to Low</span>
                      </label>

                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="sort"
                          className="w-4 h-4 text-red-500 focus:ring-red-500"
                          checked={sortOrder === "cutoffLowToHigh"}
                          onChange={() => handleSortChange("cutoffLowToHigh")}
                        />
                        <span>Cutoff: Low to High</span>
                      </label>

                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="sort"
                          className="w-4 h-4 text-red-500 focus:ring-red-500"
                          checked={sortOrder === "cutoffHighToLow"}
                          onChange={() => handleSortChange("cutoffHighToLow")}
                        />
                        <span>Cutoff: High to Low</span>
                      </label>

                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="sort"
                          className="w-4 h-4 text-red-500 focus:ring-red-500"
                          checked={sortOrder === "distance"}
                          onChange={() => handleSortChange("distance")}
                        />
                        <span>Distance</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex justify-between items-center p-4 border-t">
                  <button onClick={handleClearAll} className="text-gray-600 hover:text-gray-800 cursor-pointer">
                    Clear all
                  </button>
                  <button
                    onClick={handleCloseFilter}
                    className="bg-red-500 text-white rounded-lg px-6 py-2 hover:bg-red-600 cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* College List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {colleges.length > 0 ? (
            colleges.map((college, i) => (
              <div key={i} className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start">
                  <h2 className="text-xl font-bold">{college.name}</h2>
                  <div className="flex items-center gap-1 bg-green-100 text-green-800 px-2 py-1 rounded">
                    <FiStar className="fill-current" />
                    <span>{college.rating}</span>
                  </div>
                </div>

                <div className="mt-2">
                  <div className="text-sm text-gray-600">Location: {college.location}</div>
                  <div className="text-sm text-gray-600">Cutoff: {college.cutoff[selectedCaste]}</div>
                  <div className="text-sm text-gray-600">Distance: {college.distance} km</div>
                </div>
              </div>
            ))
          ) : (
            <p>No colleges found</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default MyEligibility
