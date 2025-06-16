import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchCutoffs, fetchEligibleColleges, getCurrentEducaion, getDist } from "./Api"; // Import the API functions
import { useLocation } from "react-router-dom";
import Nav from "../../Layouts/Nav";
import Footer from "../Footer";
import SearchForm from "./search-form";
import FilterSection from "./filter-section";
import CollegeList from "./college-list";

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
  const [cutoffs, setCutoffs] = useState([]);
  const [casteOptions, setCasteOptions] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [collegesData, setCollegesData] = useState([]);
  const [givenData, setGivenData] = useState([]);

  const [districts, setDistricts] = useState([]);
  const [currentEducation, setCurrentEducation] = useState([]);
  const [subBranch , setSubBranch] = useState([]);

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

  // -------------------------------------------------------------

  // Fetch cutoffs using TanStack Query
  const { data: cutoffsData, isLoading: isCutoffsLoading } = useQuery({
    queryKey: ["cutoffs"],
    queryFn: fetchCutoffs, // Use the imported function
  });

  // Extract unique districts and castes from cutoff data
  // useEffect(() => {
  //   if (cutoffsData) {
  //     setCutoffs(cutoffsData);

  //     // Extract unique districts
  //     const uniqueDistricts = [
  //       ...new Set(
  //         cutoffsData
  //           .map((item) => item.collegeId?.address?.dist)
  //           .filter(Boolean)
  //       ),
  //     ];
  //     // setDistricts(uniqueDistricts);

  //     // Extract unique castes from the first cutoff marks (assuming all have the same structure)
  //     if (cutoffsData.length > 0 && cutoffsData[0].cutoff?.marks) {
  //       const casteList = Object.keys(cutoffsData[0].cutoff.marks);
  //       setCasteOptions(casteList);
  //     }
  //   }
  // }, [cutoffsData]);

  // const { data, isPending, refetch } = useQuery({
  //   queryKey: ["getTest", collegesData],
  //   queryFn: () => fetchEligibleColleges(collegesData),
  //   staleTime: 0,
  //   enabled: !!collegesData,
  // });

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

    // Apply branch filter
    if (selectedBranch) {
      filtered = filtered.filter((college) => {
        // Check if the college has the selected branch in cutoffs
        const collegeCutoffs = cutoffs.filter(
          (cutoff) =>
            cutoff.collegeId?._id === college._id &&
            cutoff.branch_name === selectedBranch
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
            cutoff.collegeId?._id === college._id &&
            (!selectedBranch || cutoff.branch_name === selectedBranch)
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

  // Helper function to get cutoff for a college
  const getCutoffForCollege = (collegeId, branch, caste) => {
    const collegeCutoff = cutoffs.find(
      (cutoff) =>
        cutoff.collegeId?._id === collegeId &&
        (!branch || cutoff.branch_name === branch)
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
            casteOptions={casteOptions}
            selectedBranch={selectedBranch}
            setSelectedBranch={setSelectedBranch}
            getBranchOptions={getBranchOptions}
            handleFetch={handleFetch}
            isSearching={isSearching}
            currentEducation={currentEducation}
            subBranch={subBranch}
            setSubBranch={setSubBranch}
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

          <CollegeList
            givenData={givenData}
            selectedCaste={selectedCaste}
            getCutoffForCollege={getCutoffForCollege}
            selectedBranch={selectedBranch}
            cutoffs={cutoffs}
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyEligibility;
