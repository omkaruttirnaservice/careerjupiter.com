import { MapPin, Users, BookOpen, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { getEligibleColleges } from "./Api";
import CollegeList from "./college-list";
import { useDispatch } from "react-redux";
import { setCollegeList, setSearchParams } from "../../store-redux/eligibilitySlice";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

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
  const [collegeData, setCollegeData] = useState([]);
  const [exams, setExams] = useState([]);
  const [casts, setCasts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [availableSubCategories, setAvailableSubCategories] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const validationSchema = Yup.object({
    selectedEducation: Yup.string().required("Required"),
    percentage: Yup.number()
      .typeError("Must be a number")
      .min(0, "Minimum is 0")
      .max(100, "Maximum is 100")
      .required("Required"),
    selectedCategory: Yup.string().required("Required"),
    selectedCaste: Yup.string().required("Required"),
    selectedDistrict: Yup.string().required("Required"),
  });

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

    const eduMatch = currentEducation?.find(item => item.nextLearn === savedForm.selectedEducation);
    if (eduMatch) {
      setExams(eduMatch.exam || []);
      setCasts(eduMatch.caste || []);
    }

    const catMatch = category?.find(item => item.category === savedForm.selectedCategory);
    if (catMatch) {
      setAvailableSubCategories(catMatch.subCategory || []);
    }
  }, [currentEducation, category]);

  // const handleFetchColleges = async (values) => {
  //   setIsSearching(true);
  //   const payload = {
  //     percentage: values.percentage,
  //     caste: values.selectedCaste,
  //     category: values.selectedCategory,
  //     district: values.selectedDistrict,
  //     subCategory: values.selectedBranch || "",
  //   };

  //   try {
  //     dispatch(setSearchParams(payload));
  //     const response = await getEligibleColleges(payload);
  //     const colleges = response?.data?.data || [];
  //     dispatch(setCollegeList(colleges));
  //     setCollegeData(colleges);

  //     localStorage.setItem("eligibilityForm", JSON.stringify(values));
  //     localStorage.setItem("collegeData", JSON.stringify(colleges));
  //   } catch (error) {
  //     console.error("API error:", error);
  //   } finally {
  //     setIsSearching(false);
  //   }
  // };

const handleFetchColleges = async (values) => {
  setIsSearching(true);

  // Clear local storage before fetching new data
  localStorage.removeItem("collegeData");
  setCollegeData([]);

  const payload = {
    percentage: values.percentage,
    caste: values.selectedCaste,
    category: values.selectedCategory,
    district: values.selectedDistrict,
    subCategory: values.selectedBranch || "",
  };

  try {
    dispatch(setSearchParams(payload));
    const response = await getEligibleColleges(payload);
    const colleges = response?.data?.data || [];

    dispatch(setCollegeList(colleges));
    setCollegeData(colleges);

    localStorage.setItem("eligibilityForm", JSON.stringify(values));
    localStorage.setItem("collegeData", JSON.stringify(colleges)); // set after successful fetch
  } catch (error) {
    console.error("API error:", error);
  } finally {
    setIsSearching(false);
  }
};


  const handleEducationChange = (value, setFieldValue) => {
    setSelectedEducation(value);
    setFieldValue("selectedEducation", value);
    const match = currentEducation.find((item) => item.nextLearn === value);
    if (match) {
      setExams(match.exam || []);
      setCasts(match.caste || []);
    } else {
      setExams([]);
      setCasts([]);
    }
  };

  const handleCategoryChange = (value, setFieldValue) => {
    setSelectedCategory(value);
    setFieldValue("selectedCategory", value);
    const match = category?.find((cat) => cat.category === value);
    setAvailableSubCategories(match?.subCategory || []);
    setSelectedBranch("");
    setFieldValue("selectedBranch", "");
  };

  return (
    <Formik
      initialValues={{
        selectedEducation: selectedEducation || "",
        selectedExam: selectedExam || "",
        percentage: percentage1 || "",
        selectedCategory: selectedCategory || "",
        selectedCaste: selectedCaste || "",
        selectedDistrict: selectedDistrict || "",
        selectedBranch: selectedBranch || "",
      }}
      enableReinitialize
      validationSchema={validationSchema}
      onSubmit={(values) => handleFetchColleges(values)}
    >
      {({ values, setFieldValue }) => {
        useEffect(() => {
          if (
            values.selectedEducation &&
            values.percentage &&
            values.selectedCategory &&
            values.selectedCaste &&
            values.selectedDistrict
          ) {
            handleFetchColleges(values);
          }
        }, [
          values.selectedEducation,
          values.percentage,
          values.selectedCategory,
          values.selectedCaste,
          values.selectedDistrict,
          values.selectedBranch,
        ]);

        return (
          <Form className="w-full md:w-[90%] mx-auto p-4 sm:p-6 bg-white rounded-xl shadow-lg border border-gray-100 my-6 relative">
            <button
              type="button"
              onClick={() => {
                localStorage.removeItem("eligibilityForm");
                localStorage.removeItem("collegeData");
                setCollegeData([]);
                setCasts([]);
                setExams([]);
                setAvailableSubCategories([]);
                setSelectedBranch("");
              }}
              className="absolute top-4 right-4 text-sm px-4 py-1 bg-red-100 text-red-600 border border-red-300 rounded-md hover:bg-red-200"
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
                {/* Education Level */}
                <div>
                  <label className="block text-sm mb-1">Current Education Level</label>
                  <Field
                    as="select"
                    name="selectedEducation"
                    onChange={(e) => handleEducationChange(e.target.value, setFieldValue)}
                    className="w-full p-2 border rounded"
                  >
                    <option value="">Select Education</option>
                    {currentEducation?.map((edu, i) => (
                      <option key={i} value={edu.nextLearn}>{edu.nextLearn}</option>
                    ))}
                  </Field>
                  <ErrorMessage name="selectedEducation" component="div" className="text-red-500 text-xs mt-1" />
                </div>

                {/* Exam */}
                {values.selectedEducation !== "10th" && (
                  <div>
                    <label className="block text-sm mb-1">Qualifying Exam</label>
                    <Field as="select" name="selectedExam" className="w-full p-2 border rounded">
                      <option value="">Select Exam</option>
                      {exams?.map((exam, i) => (
                        <option key={i} value={exam}>{exam}</option>
                      ))}
                    </Field>
                  </div>
                )}

                {/* Percentage */}
                <div>
                  <label className="block text-sm mb-1">Percentage</label>
                  <Field
                    name="percentage"
                    type="number"
                    min="0"
                    max="100"
                    step="0.01"
                    className="w-full p-2 border rounded"
                  />
                  <ErrorMessage name="percentage" component="div" className="text-red-500 text-xs mt-1" />
                </div>
              </div>
            </div>

            {/* Course & Location */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-green-100 rounded-lg">
                  <MapPin className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="text-base font-semibold text-gray-700">Course & Location Preferences</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Future Eligibility */}
                <div>
                  <label className="block text-sm mb-1">Future Eligibility</label>
                  <Field
                    as="select"
                    name="selectedCategory"
                    onChange={(e) => handleCategoryChange(e.target.value, setFieldValue)}
                    className="w-full p-2 border rounded"
                  >
                    <option value="">Select Category</option>
                    {category?.map((cat, i) => (
                      <option key={i} value={cat.category}>{cat.category}</option>
                    ))}
                  </Field>
                  <ErrorMessage name="selectedCategory" component="div" className="text-red-500 text-xs mt-1" />
                </div>

                {/* Caste */}
                <div>
                  <label className="block text-sm mb-1">Caste Category</label>
                  <Field as="select" name="selectedCaste" className="w-full p-2 border rounded">
                    <option value="">Select Caste</option>
                    {casts?.map((cast, i) => (
                      <option key={i} value={cast}>{cast}</option>
                    ))}
                  </Field>
                  <ErrorMessage name="selectedCaste" component="div" className="text-red-500 text-xs mt-1" />
                </div>

                {/* District */}
                <div>
                  <label className="block text-sm mb-1">Preferred District</label>
                  <Field as="select" name="selectedDistrict" className="w-full p-2 border rounded">
                    <option value="">Select District</option>
                    {districts?.map((dist, i) => (
                      <option key={i} value={dist}>{dist}</option>
                    ))}
                  </Field>
                  <ErrorMessage name="selectedDistrict" component="div" className="text-red-500 text-xs mt-1" />
                </div>

                {/* Branch */}
                <div>
                  <label className="block text-sm mb-1">Preferred Branch</label>
                  <Field as="select" name="selectedBranch" className="w-full p-2 border rounded">
                    <option value="">Select Branch</option>
                    {availableSubCategories?.map((sub, i) => (
                      <option key={i} value={sub}>{sub}</option>
                    ))}
                  </Field>
                </div>
              </div>
            </div>

            {/* Search Button */}
            <div className="flex justify-center pt-6">
              <button
                type="submit"
                disabled={isSearching}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-md flex items-center gap-2 text-sm"
              >
                {isSearching ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Searching...
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4" />
                    Search Colleges
                  </>
                )}
              </button>
            </div>

            {/* College List */}
            <div className="mt-8">
              {collegeData?.length > 0 ? (
                <CollegeList givenData={collegeData} />
              ) : (
                !isSearching && <p className="text-center text-gray-500">No colleges found matching your criteria.</p>
              )}
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default SearchForm;
