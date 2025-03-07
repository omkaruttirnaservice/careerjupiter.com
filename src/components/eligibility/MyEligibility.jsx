"use client";

import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FiFilter, FiStar, FiX } from "react-icons/fi";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: "http://192.168.1.5:5000/api", // Your API base URL
});

const MyEligibility = () => {
  const [selectedEducation, setSelectedEducation] = useState("");
  const [examOptions, setExamOptions] = useState([]);
  const [selectedExam, setSelectedExam] = useState("");
  const [percentage, setPercentage] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedCaste, setSelectedCaste] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [colleges, setColleges] = useState([]);
  const [filteredColleges, setFilteredColleges] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [activeFilters, setActiveFilters] = useState([]);
  const [collegeType, setCollegeType] = useState("");
  const [ratingFilter, setRatingFilter] = useState("");
  const [cutoffRange, setCutoffRange] = useState({ min: "", max: "" });
  const [selectedBranch, setSelectedBranch] = useState("");
  const [cutoffs, setCutoffs] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [casteOptions, setCasteOptions] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);

  // Define education options
  const educationOptions = {
    "10th": [],
    "12th": ["JEE", "NEET", "CET"],
  };

  // Fetch cutoffs using TanStack Query
  const { data: cutoffsData, isLoading: isCutoffsLoading } = useQuery({
    queryKey: ["cutoffs"],
    queryFn: async () => {
      const response = await axiosInstance.get("/cutoff/all");
      return response.data.usrMsg;
    },
  });

  // Extract unique districts and castes from cutoff data
  useEffect(() => {
    if (cutoffsData) {
      setCutoffs(cutoffsData);

      // Extract unique districts
      const uniqueDistricts = [...new Set(cutoffsData.map((item) => item.collegeId?.address?.dist).filter(Boolean))];
      setDistricts(uniqueDistricts);

      // Extract unique castes from the first cutoff marks (assuming all have the same structure)
      if (cutoffsData.length > 0 && cutoffsData[0].cutoff?.marks) {
        const casteList = Object.keys(cutoffsData[0].cutoff.marks);
        setCasteOptions(casteList);
      }
    }
  }, [cutoffsData]);

  // Fetch eligible colleges based on filters
  const fetchEligibleColleges = async () => {
    if (!selectedEducation || !percentage || !selectedCaste) {
      return;
    }

    setIsSearching(true);
    try {
      const district = selectedDistrict || "";
      const response = await axiosInstance.get(`/eligibility/colleges`, {
        params: {
          education: selectedEducation,
          percentage: percentage,
          caste: selectedCaste,
          district: district,
        },
      });

      console.log("API Response:", response.data); // Log the response

      if (response.data.success && response.data.data) {
        setColleges(response.data.data);
        setFilteredColleges(response.data.data);
      } else {
        setColleges([]);
        setFilteredColleges([]);
      }
    } catch (error) {
      console.error("Error fetching eligible colleges:", error);
      setColleges([]);
      setFilteredColleges([]);
    } finally {
      setIsSearching(false);
    }
  };

  // Handle search button click
  const handleSearch = () => {
    fetchEligibleColleges();
  };

  useEffect(() => {
    applyAllFilters();
  }, [collegeType, ratingFilter, cutoffRange.min, cutoffRange.max, sortOrder, selectedBranch, colleges]);

  const handleEducationChange = (education) => {
    setSelectedEducation(education);
    setSelectedExam("");
    setExamOptions(educationOptions[education] || []);
    setColleges([]);
    setFilteredColleges([]);
    setSelectedBranch(""); // Reset selected branch when education changes
  };

  const handleDistrictChange = (district) => {
    setSelectedDistrict(district);
  };

  const handleCasteChange = (caste) => {
    setSelectedCaste(caste);
  };

  const handleGetOtp = () => {
    // Simulate sending OTP (you can replace this with an actual API call)
    if (phoneNumber) {
      setIsOtpSent(true);
      alert(`OTP sent to ${phoneNumber}`);
    } else {
      alert("Please enter a valid phone number.");
    }
  };

  const handleVerifyOtp = () => {
    // Simulate OTP verification (you can replace this with an actual API call)
    if (otp === "1234") {
      // Replace "1234" with the actual OTP logic
      setIsOtpVerified(true);
    } else {
      alert("Invalid OTP");
    }
  };

  const applyAllFilters = () => {
    if (!colleges.length) return;

    let filtered = [...colleges];

    // Apply college type filter
    if (collegeType) {
      filtered = filtered.filter((college) => college.collegeType === collegeType);
    }

    // Apply branch filter
    if (selectedBranch) {
      filtered = filtered.filter((college) => {
        // Check if the college has the selected branch in cutoffs
        const collegeCutoffs = cutoffs.filter(
          (cutoff) => cutoff.collegeId?._id === college._id && cutoff.branch_name === selectedBranch,
        );
        return collegeCutoffs.length > 0;
      });
    }

    // Apply cutoff range filter
    if (cutoffRange.min || cutoffRange.max) {
      filtered = filtered.filter((college) => {
        // Find the cutoff for this college and selected branch/caste
        const collegeCutoff = cutoffs.find(
          (cutoff) =>
            cutoff.collegeId?._id === college._id && (!selectedBranch || cutoff.branch_name === selectedBranch),
        );

        if (!collegeCutoff) return false;

        const cutoffValue = collegeCutoff.cutoff.marks[selectedCaste] || 0;
        const min = cutoffRange.min ? Number.parseInt(cutoffRange.min) : 0;
        const max = cutoffRange.max ? Number.parseInt(cutoffRange.max) : 100;

        return cutoffValue >= min && cutoffValue <= max;
      });
    }

    // Apply sort order
    if (sortOrder) {
      filtered.sort((a, b) => {
        if (sortOrder === "cutoffLowToHigh") {
          const aCutoff = getCutoffForCollege(a._id, selectedBranch, selectedCaste);
          const bCutoff = getCutoffForCollege(b._id, selectedBranch, selectedCaste);
          return aCutoff - bCutoff;
        } else if (sortOrder === "cutoffHighToLow") {
          const aCutoff = getCutoffForCollege(a._id, selectedBranch, selectedCaste);
          const bCutoff = getCutoffForCollege(b._id, selectedBranch, selectedCaste);
          return bCutoff - aCutoff;
        }
        return 0;
      });
    }

    setFilteredColleges(filtered);

    // Update active filters
    const newActiveFilters = [];
    if (collegeType) newActiveFilters.push({ id: "collegeType", value: `Type: ${collegeType}` });
    if (selectedBranch) newActiveFilters.push({ id: "branch", value: `Branch: ${selectedBranch}` });
    if (cutoffRange.min || cutoffRange.max) {
      newActiveFilters.push({
        id: "cutoffRange",
        value: `Cutoff: ${cutoffRange.min || "0"} - ${cutoffRange.max || "100"}`,
      });
    }
    if (sortOrder) {
      const sortLabel =
        {
          cutoffLowToHigh: "Cutoff: Low to High",
          cutoffHighToLow: "Cutoff: High to Low",
        }[sortOrder] || sortOrder;
      newActiveFilters.push({ id: "sort", value: `Sort: ${sortLabel}` });
    }

    setActiveFilters(newActiveFilters);
  };

  // Helper function to get cutoff for a college
  const getCutoffForCollege = (collegeId, branch, caste) => {
    const collegeCutoff = cutoffs.find(
      (cutoff) => cutoff.collegeId?._id === collegeId && (!branch || cutoff.branch_name === branch),
    );

    if (!collegeCutoff) return 0;
    return collegeCutoff.cutoff.marks[caste] || 0;
  };

  // Handle sort change
  const handleSortChange = (sort) => {
    setSortOrder(sort);
  };

  // Handle college type change
  const handleCollegeTypeChange = (type) => {
    setCollegeType(type);
  };

  // Handle rating change
  const handleRatingChange = (rating) => {
    setRatingFilter(rating);
  };

  // Handle cutoff range change
  const handleCutoffRangeChange = (min, max) => {
    setCutoffRange({ min, max });
  };

  // Handle apply filters
  const handleApplyFilters = () => {
    applyAllFilters();
    setShowFilter(false);
  };

  // Handle clear all filters
  const handleClearAll = () => {
    setCollegeType("");
    setRatingFilter("");
    setCutoffRange({ min: "", max: "" });
    setSortOrder("");
    setActiveFilters([]);
  };

  // Handle remove filter
  const handleRemoveFilter = (filterId) => {
    if (filterId === "collegeType") setCollegeType("");
    if (filterId === "branch") setSelectedBranch("");
    if (filterId === "cutoffRange") setCutoffRange({ min: "", max: "" });
    if (filterId === "sort") setSortOrder("");

    setActiveFilters(activeFilters.filter((filter) => filter.id !== filterId));
  };

  // Get unique branches from cutoffs
  const getBranchOptions = () => {
    if (!cutoffs.length) return [];
    const branches = [...new Set(cutoffs.map((cutoff) => cutoff.branch_name))];
    return branches.filter(Boolean);
  };

  return (
    <div className="p-8 flex justify-center items-center">
      <div className="w-full max-w-4xl space-y-8">
        <h1 className="text-3xl font-bold text-center text-gray-800">Check Your Eligibility</h1>

        {/* Phone Number + OTP */}
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <input
            type="number"
            placeholder="Enter your phone number"
            className="w-full md:w-[60%] border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400"
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
                className="w-full md:w-[30%] border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400"
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
            <option value="">Select Caste</option>
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
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-4xl flex flex-col overflow-hidden">
              {/* Header */}
              <div className="flex justify-between items-center p-4 border-b">
                <h3 className="text-xl font-medium">Filters</h3>
                <button
                  onClick={() => setShowFilter(false)}
                  className="hover:bg-red-600 cursor-pointer text-gray-600 hover:text-white"
                >
                  <FiX size={20} />
                </button>
              </div>

              {/* Horizontal Layout */}
              <div className="flex flex-col space-y-6 p-4 overflow-y-auto">
                {/* Sort by Section */}
                <div>
                  <div className="text-lg font-medium mb-2">Sort by</div>
                  <div className="flex flex-wrap gap-4">
                    {["cutoffLowToHigh", "cutoffHighToLow"].map((sort, index) => (
                      <label key={index} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="sort"
                          className="w-4 h-4 text-red-500 focus:ring-red-500"
                          checked={sortOrder === sort}
                          onChange={() => handleSortChange(sort)}
                        />
                        <span>{sort === "cutoffLowToHigh" ? "Cutoff: Low to High" : "Cutoff: High to Low"}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* College Type Section */}
                <div>
                  <div className="text-lg font-medium mb-2">College Type</div>
                  <div className="flex flex-wrap gap-4">
                    {["Government", "Private", "Deemed", "Autonomous"].map((type, index) => (
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
          {isSearching ? (
            <div className="col-span-2 flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
          ) : (
            <>
              {filteredColleges.length > 0 ? (
                filteredColleges.map((college, i) => (
                  <div
                    key={i}
                    className="border rounded-lg shadow-md hover:shadow-lg transition-shadow relative overflow-hidden"
                  >
                    {/* Filter button on card */}
                    <button
                      onClick={() => setShowFilter(!showFilter)}
                      className="absolute top-2 right-2 cursor-pointer bg-gray-100 hover:bg-gray-200 p-1 rounded-full z-10"
                    >
                      <FiFilter size={16} />
                    </button>

                    {/* College Image */}
                    <img
                      src={college.image || "/placeholder.svg?height=200&width=400" || "/placeholder.svg"}
                      alt={college.collegeName}
                      className="w-full h-48 object-cover"
                    />

                    <div className="p-4">
                      <div className="flex justify-between items-start">
                        <h2 className="text-xl font-bold">{college.collegeName}</h2>
                        <div className="flex items-center gap-1 bg-green-100 text-green-800 px-2 py-1 rounded">
                          <FiStar className="fill-current" />
                          <span>{college.accreditation || "N/A"}</span>
                        </div>
                      </div>

                      <div className="mt-2 space-y-1 text-sm text-gray-600">
                        <p>
                          <strong>Location:</strong> {college.address?.dist}, {college.address?.state}
                        </p>
                        <p>
                          <strong>Type:</strong> {college.collegeType}
                        </p>
                        <p>
                          <strong>University:</strong> {college.affiliatedUniversity}
                        </p>
                        <p>
                          <strong>Established:</strong> {college.establishedYear}
                        </p>

                        {/* Display cutoff for selected caste and branch */}
                        {selectedCaste && (
                          <p>
                            <strong>Cutoff ({selectedCaste}):</strong>{" "}
                            {getCutoffForCollege(college._id, selectedBranch, selectedCaste) || "N/A"}%
                          </p>
                        )}
                      </div>

                      {/* College-specific cutoffs */}
                      {cutoffs.filter(
                        (cutoff) =>
                          cutoff.collegeId?._id === college._id &&
                          (!selectedBranch || cutoff.branch_name === selectedBranch),
                      ).length > 0 && (
                        <div className="mt-4 border-t pt-4">
                          <h3 className="font-semibold mb-2">Branch Cutoffs</h3>
                          <div className="grid grid-cols-1 gap-2">
                            {cutoffs
                              .filter(
                                (cutoff) =>
                                  cutoff.collegeId?._id === college._id &&
                                  (!selectedBranch || cutoff.branch_name === selectedBranch),
                              )
                              .map((cutoff, index) => (
                                <div key={index} className="bg-gray-50 p-3 rounded-lg">
                                  <div className="flex justify-between">
                                    <span className="font-medium">{cutoff.branch_name}</span>
                                    <span className="text-gray-500 text-sm">Year: {cutoff.year}</span>
                                  </div>
                                  <div className="mt-2 grid grid-cols-2 gap-2">
                                    {Object.entries(cutoff.cutoff.marks)
                                      .filter(([caste]) => !selectedCaste || caste === selectedCaste)
                                      .map(([caste, mark], idx) => (
                                        <div key={idx} className="flex justify-between">
                                          <span>{caste}:</span>
                                          <span className="font-medium">{mark}%</span>
                                        </div>
                                      ))}
                                  </div>
                                </div>
                              ))}
                          </div>
                        </div>
                      )}

                      {/* Contact and Apply buttons */}
                      <div className="mt-4 flex gap-2">
                        <a
                          href={`tel:${college.contactDetails}`}
                          className="flex-1 bg-indigo-100 text-indigo-700 text-center py-2 rounded-lg hover:bg-indigo-200"
                        >
                          Contact
                        </a>
                        <a
                          href={college.applicationFormURL || college.websiteURL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 bg-indigo-600 text-white text-center py-2 rounded-lg hover:bg-indigo-700"
                        >
                          Apply
                        </a>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="col-span-2 text-center py-8">
                  No colleges found matching your criteria.
                </p>
              )}
            </>
          )}
        </div>

        {/* Standalone Cutoff Cards */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4 text-center">Branch Cutoffs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {isCutoffsLoading ? (
              <div className="col-span-2 flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
              </div>
            ) : cutoffs.length > 0 ? (
              cutoffs
                .filter((cutoff) => !selectedBranch || cutoff.branch_name === selectedBranch)
                .slice(0, 6) // Limit to 6 cutoffs for better display
                .map((cutoff, index) => (
                  <div key={index} className="border rounded-lg shadow-md overflow-hidden">
                    <div className="bg-indigo-600 text-white p-3">
                      <div className="flex justify-between items-center">
                        <h3 className="text-xl font-bold">{cutoff.branch_name}</h3>
                        <span className="bg-white text-indigo-800 px-2 py-1 rounded text-sm font-medium">
                          Year: {cutoff.year}
                        </span>
                      </div>
                      <p className="text-sm mt-1">{cutoff.collegeId?.collegeName}</p>
                    </div>
                    <div className="p-4">
                      <div className="grid grid-cols-2 gap-y-3">
                        {Object.entries(cutoff.cutoff.marks)
                          .filter(([caste]) => !selectedCaste || caste === selectedCaste)
                          .map(([caste, mark], idx) => (
                            <div
                              key={idx}
                              className={`flex justify-between items-center p-2 rounded ${
                                selectedCaste === caste ? "bg-indigo-50 border border-indigo-200" : ""
                              }`}
                            >
                              <span className="font-medium">{caste}:</span>
                              <span
                                className={`font-bold text-lg ${
                                  Number(mark) >= 85
                                    ? "text-red-600"
                                    : Number(mark) >= 75
                                      ? "text-orange-600"
                                      : "text-green-600"
                                }`}
                              >
                                {mark}%
                              </span>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                ))
            ) : (
              <p className="col-span-2 text-center py-8">No cutoff data available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyEligibility;