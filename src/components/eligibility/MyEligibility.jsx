import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  fetchEligibleColleges,
  getCastList,
  getDist,
  getFutureCategory,
} from "./Api"; // Import the API functions
import { useLocation } from "react-router-dom";
import Nav from "../../Layouts/Nav";
import Footer from "../Footer";
import SearchForm from "./search-form";

const MyEligibility = () => {
  const location = useLocation();

  // Default percentage from route (if passed)
  const percentage1 = location.state?.inputValue || 0;

  // States for all inputs and selections
  const [selectedEducation, setSelectedEducation] = useState("");
  const [examOptions, setExamOptions] = useState([]);
  const [selectedExam, setSelectedExam] = useState("");
  const [percentage, setPercentage] = useState(80);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedCaste, setSelectedCaste] = useState("");
  const [colleges, setColleges] = useState([]); // Final result colleges
  const [selectedBranch, setSelectedBranch] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [collegesData, setCollegesData] = useState([]); // Payload to send to API
  const [districts, setDistricts] = useState([]);
  const [currentEducation, setCurrentEducation] = useState([]); // Castes for form dropdown
  const [subBranch, setSubBranch] = useState([]);
  const [castList, setCastList] = useState([]);
  const [category, setCategory] = useState([]);
  

  // -------------------------------------------------------------

  // Fetch districts using react-query
  const { data: district } = useQuery({
    queryKey: ["dist"],
    queryFn: getDist,
  });

  useEffect(() => {
    setDistricts(district?.data?.data); // Update on success
  }, [district]);

  // Fetch future education categories
  // const { data: FutureCategory } = useQuery({
  //   queryKey: ["currentEducation"],
  //   queryFn: getFutureCategory,
  // });

//   const {
//   data: FutureCategory,
//   isSuccess: isFutureCategoryLoaded
// } = useQuery({
//   queryKey: ["currentEducation"],
//   queryFn: getFutureCategory,
// });

// const {
//   data: FutureCategory,
//   isSuccess: isFutureCategoryLoaded,
// } = useQuery({
//   queryKey: ["futureCategory", selectedEducation], // depends on selectedEducation
//   queryFn: async ({ queryKey }) => {
//     const selectedId = queryKey[1];

//     const selectedObj = currentEducation.find(item => item.nextLearn === selectedId); // changed line

//     if (!selectedObj?.nextLearn) return;

//     const response = await getFutureCategory(selectedObj.nextLearn);
//     return response;
//   },
//   // enabled: !!selectedEducation && currentEducation.length > 0,
// });

const {
  data: FutureCategory,
  isSuccess: isFutureCategoryLoaded,
} = useQuery({
  queryKey: ["futureCategory", selectedEducation],
  queryFn: async ({ queryKey }) => {
    const selectedValue = queryKey[1];
    const selectedObj = currentEducation.find(
      (item) => item.nextLearn === selectedValue
    );

    // Defensive check
    if (!selectedObj || !selectedObj.nextLearn) {
      return { data: { data: [] } }; // return empty data instead of crashing
    }

    return getFutureCategory(selectedObj.nextLearn);
  },
  enabled: !!selectedEducation && Array.isArray(currentEducation) && currentEducation.length > 0

  // enabled: !!selectedEducation && currentEducation.length > 0,
});


useEffect(() => {
  if (isFutureCategoryLoaded && FutureCategory?.data) {
    setCategory(FutureCategory.data.data); // ✅ Set in state
    localStorage.setItem("futureCategory", JSON.stringify(FutureCategory.data.data)); // ✅ Save in localStorage
  }
}, [FutureCategory, isFutureCategoryLoaded]);


useEffect(() => {
  console.log("🔍 selectedEducation →", selectedEducation);
  console.log("🔍 currentEducation →", currentEducation);
}, [selectedEducation, currentEducation]);


useEffect(() => {
  const cachedCategory = localStorage.getItem("futureCategory");
  if (cachedCategory) {
    try {
      const parsed = JSON.parse(cachedCategory);
      if (Array.isArray(parsed)) {
        setCategory(parsed); // ✅ Restore category list
      }
    } catch (err) {
      console.error("Failed to parse cached category:", err);
    }
  }
}, []);



  // useEffect(() => {
  //   setCategory(FutureCategory?.data?.data); // Save category list
  // }, [FutureCategory]);

  // Fetch caste list
  const { data: educationData } = useQuery({
    queryKey: ["cast"],
    queryFn: getCastList,
  });

  // Fetch eligible colleges when collegesData is set
  const { data } = useQuery({
    queryKey: ["eligibleColleges", collegesData],
    queryFn: () => fetchEligibleColleges(collegesData),
    enabled: false,
  });

  useEffect(() => {
    if (data?.data) {
      setColleges(data.data); // Set fetched colleges
    }
  }, [data]);

  // useEffect(() => {
  //   setCurrentEducation(educationData?.data?.data?.castes); // Save castes
  // }, [educationData]);


  useEffect(() => {
  const casteList = educationData?.data?.data?.castes || [];
  setCurrentEducation(casteList); // ✅ ensures array
}, [educationData]);

  // -------------------------------------------------------------

  // Handlers passed to SearchForm
  const handleDistrictChange = (district) => {
    setSelectedDistrict(district);
  };

  const handleCasteChange = (caste) => {
    setSelectedCaste(caste);
  };

  return (
    <>
      <Nav />
      <div className="p-1 md:p-8 mt-19 flex justify-center items-center">
        <div className="w-full  space-y-8">
          <h1 className="text-3xl font-bold text-center text-gray-800">
            Check Your Eligibility
          </h1>

          {/* Reusable search form with props */}
          <SearchForm
            selectedEducation={selectedEducation}
             setSelectedEducation={setSelectedEducation} // ✅ Add this
            selectedExam={selectedExam}
            setSelectedExam={setSelectedExam}
            examOptions={examOptions}
             setExamOptions={setExamOptions} // ✅ Add this
            percentage1={percentage1}
            setPercentage={setPercentage}
            selectedDistrict={selectedDistrict}
            handleDistrictChange={handleDistrictChange}
            districts={districts}
            selectedCaste={selectedCaste}
            handleCasteChange={handleCasteChange}
            selectedBranch={selectedBranch}
            setSelectedBranch={setSelectedBranch}
            isSearching={isSearching}
            currentEducation={currentEducation}
             setCurrentEducation={setCurrentEducation} // ✅ Add this
            subBranch={subBranch}
            setSubBranch={setSubBranch}
            castList={castList}
            category={category}
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyEligibility;
