import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchCutoffs, fetchEligibleColleges, getCastList, getCurrentEducaion, getDist } from "./Api"; // Import the API functions
import { useLocation } from "react-router-dom";
import Nav from "../../Layouts/Nav";
import Footer from "../Footer";
import SearchForm from "./search-form";
import FilterSection from "./filter-section";

const MyEligibility = () => {
  const location = useLocation();
  const percentage1 = location.state?.percentage || 0; // Default value 0

  const [selectedEducation, setSelectedEducation] = useState("");
  const [examOptions, setExamOptions] = useState([]);
  const [selectedExam, setSelectedExam] = useState("");
  const [percentage, setPercentage] = useState(80);
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
  const [isSearching, setIsSearching] = useState(false);
  const [collegesData, setCollegesData] = useState([]);
  const [givenData, setGivenData] = useState([]);

  const [districts, setDistricts] = useState([]);
  const [currentEducation, setCurrentEducation] = useState([]);
  const [subBranch , setSubBranch] = useState([]);
  const [castList , setCastList] = useState([]);

  // -------------------------------------------------------------

    const { data:district } = useQuery({ 
    queryKey: ['dist'], 
    queryFn: getDist 
  });

  useEffect(()=>{
    setDistricts(district?.data?.data);
  },[district]);

    const { data:CurrentEducaion  } = useQuery({ 
    queryKey: ['currentEducation'], 
    queryFn: getCurrentEducaion 
  });

  useEffect(()=>{
    setCurrentEducation(CurrentEducaion?.data?.data);
  },[CurrentEducaion]);

      const { data:casts } = useQuery({ 
    queryKey: ['cast'], 
    queryFn: getCastList 
  });
  

  useEffect(()=>{
    setCastList(casts?.data?.data?.castes);
  },[casts]);

  // -------------------------------------------------------------


  const handleFetch = () => {
    const newCollegesData = {
      education: selectedEducation,
      percentage: percentage,
      caste: selectedCaste,
      district: selectedDistrict,
      year: "",
    };
    setCollegesData(newCollegesData);
    refetch();
  };

  // useEffect(() => {
  //   setGivenData(data?.data);
  // }, [data]);

  useEffect(() => {
    applyAllFilters();
  }, [
    collegeType,
    ratingFilter,
    cutoffRange.min,
    cutoffRange.max,
    sortOrder,
    selectedBranch,
    colleges,
  ]);

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

  const applyAllFilters = () => {
    if (!colleges.length) return;

    let filtered = [...colleges];

    // Apply college type filter
    if (collegeType) {
      filtered = filtered.filter(
        (college) => college.collegeType === collegeType
      );
    }


    // Apply sort order
    if (sortOrder) {
      filtered.sort((a, b) => {
        if (sortOrder === "cutoffLowToHigh") {
          const aCutoff = getCutoffForCollege(
            a._id,
            selectedBranch,
            selectedCaste
          );
          const bCutoff = getCutoffForCollege(
            b._id,
            selectedBranch,
            selectedCaste
          );
          return aCutoff - bCutoff;
        } else if (sortOrder === "cutoffHighToLow") {
          const aCutoff = getCutoffForCollege(
            a._id,
            selectedBranch,
            selectedCaste
          );
          const bCutoff = getCutoffForCollege(
            b._id,
            selectedBranch,
            selectedCaste
          );
          return bCutoff - aCutoff;
        }
        return 0;
      });
    }

    setFilteredColleges(filtered);

    // Update active filters
    const newActiveFilters = [];
    if (collegeType)
      newActiveFilters.push({
        id: "collegeType",
        value: `Type: ${collegeType}`,
      });
    if (selectedBranch)
      newActiveFilters.push({
        id: "branch",
        value: `Branch: ${selectedBranch}`,
      });
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


  return (
    <>
      <Nav />
      <div className="p-8 mt-12 flex justify-center items-center">
        <div className="w-full  space-y-8">
          <h1 className="text-3xl font-bold text-center text-gray-800">
            Check Your Eligibility
          </h1>

          <SearchForm
            selectedEducation={selectedEducation}
            handleEducationChange={handleEducationChange}
            selectedExam={selectedExam}
            setSelectedExam={setSelectedExam}
            examOptions={examOptions}
            percentage1={percentage1}
            setPercentage={setPercentage}
            selectedDistrict={selectedDistrict}
            handleDistrictChange={handleDistrictChange}
            districts={districts}
            selectedCaste={selectedCaste}
            handleCasteChange={handleCasteChange}
            selectedBranch={selectedBranch}
            setSelectedBranch={setSelectedBranch}
            handleFetch={handleFetch}
            isSearching={isSearching}
            currentEducation={currentEducation}
            subBranch={subBranch}
            setSubBranch={setSubBranch}
            castList={castList}
          />

          <FilterSection
            collegesData={collegesData}
            showFilter={showFilter}
            setShowFilter={setShowFilter}
            activeFilters={activeFilters}
            handleRemoveFilter={handleRemoveFilter}
            handleClearAll={handleClearAll}
            sortOrder={sortOrder}
            handleSortChange={handleSortChange}
            collegeType={collegeType}
            handleCollegeTypeChange={handleCollegeTypeChange}
            handleApplyFilters={handleApplyFilters}
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyEligibility;
