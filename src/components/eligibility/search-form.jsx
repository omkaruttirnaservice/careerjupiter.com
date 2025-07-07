import { MapPin, Users, BookOpen, Search } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { getEligibleColleges } from "./Api";
import CollegeList from "./college-list";
import { useDispatch } from "react-redux";
import {
  setCollegeList,
  setSearchParams,
} from "../../store-redux/eligibilitySlice";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Flotingbutton from "../../Layouts/Flotingbutton";
import { FaWhatsapp } from "react-icons/fa";
import { useLocation } from "react-router-dom";

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
  selectedEducation,
  setSelectedEducation,
  examOptions,
  setExamOptions,
}) => {
  const dispatch = useDispatch();

  // const [selectedEducation, setSelectedEducation] = useState("");
  const [collegeData, setCollegeData] = useState([]);
  const [exams, setExams] = useState([]);
  const [casts, setCasts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [availableSubCategories, setAvailableSubCategories] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchClicked, setSearchClicked] = useState(false);
  const [showNoCollegeMsg, setShowNoCollegeMsg] = useState(false);
  const [initialFormValues, setInitialFormValues] = useState({
    selectedEducation: "",
    selectedExam: "",
    percentage: "",
    selectedCategory: "",
    selectedCaste: "",
    selectedDistrict: "",
    selectedBranch: "",
  });
  const location = useLocation();
  const percentageFromRoute = location?.state?.inputValue || "";

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
    const savedCollegeData =
      JSON.parse(localStorage.getItem("collegeData")) || [];

    if (!currentEducation || !category) return;

    // ✅ Use routing value only if it’s non-empty
    const fallbackPercentage =
      percentageFromRoute && percentageFromRoute.trim() !== ""
        ? percentageFromRoute
        : savedForm.percentage || "";

    setInitialFormValues({
      selectedEducation: savedForm.selectedEducation || "",
      selectedExam: savedForm.selectedExam || "",
      percentage: fallbackPercentage,
      selectedCategory: savedForm.selectedCategory || "",
      selectedCaste: savedForm.selectedCaste || "",
      selectedDistrict: savedForm.selectedDistrict || "",
      selectedBranch: savedForm.selectedBranch || "",
    });

    setSelectedEducation(savedForm.selectedEducation || "");
    setSelectedExam(savedForm.selectedExam || "");
    setPercentage(fallbackPercentage); // 👈 apply here too
    setSelectedCategory(savedForm.selectedCategory || "");
    setSelectedBranch(savedForm.selectedBranch || "");
    setCollegeData(savedCollegeData);

    const eduMatch = currentEducation.find(
      (item) => item.nextLearn === savedForm.selectedEducation
    );
    if (eduMatch) {
      setExamOptions(eduMatch.exam || []);
      setCasts(eduMatch.caste || []);
    }

    const catMatch = category.find(
      (item) => item.category === savedForm.selectedCategory
    );
    if (catMatch) {
      const subCats = catMatch.subCategory?.flat() || [];
      setAvailableSubCategories(subCats);
    }
  }, [currentEducation, category]);

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
      setExamOptions(match.exam || []);
      setCasts(match.caste || []);
    } else {
      setExamOptions([]); // ✅ update parent state
      setCasts([]);
    }
    setFieldValue("selectedExam", ""); // ✅ Clear selectedExam on education change
  };

  const handleCategoryChange = (value, setFieldValue) => {
    setSelectedCategory(value);
    setFieldValue("selectedCategory", value);

    const match = category?.find((cat) => cat.category === value);
    const subCats = match?.subCategory?.flat() || [];
    setAvailableSubCategories(subCats);

    // ✅ Just reset selectedBranch (not exam or education!)
    setSelectedBranch("");
    setFieldValue("selectedBranch", "");
  };

  return (
    <>
      <Formik
        initialValues={initialFormValues}
        enableReinitialize // ✅ You can keep this if needed
        validationSchema={validationSchema}
        onSubmit={(values) => {
          setSearchClicked(true);
          handleFetchColleges(values);
        }}
      >
        {({ values, setFieldValue, resetForm }) => {
          useEffect(() => {
            if (
              values.selectedEducation &&
              // values.percentage &&
              values.selectedCategory &&
              values.selectedCaste &&
              values.selectedDistrict
            ) {
              handleFetchColleges(values);
            }
          }, [
            values.selectedEducation,
            // values.percentage,
            values.selectedCategory,
            values.selectedCaste,
            values.selectedDistrict,
            values.selectedBranch,
          ]);

          useEffect(() => {
            if (
              (values.selectedDistrict || values.selectedBranch) &&
              collegeData?.length === 0 &&
              !isSearching
            ) {
              setShowNoCollegeMsg(true);
            } else {
              setShowNoCollegeMsg(false);
            }
          }, [
            values.selectedDistrict,
            values.selectedBranch,
            collegeData,
            isSearching,
          ]);

          const debounceRef = useRef(null);

          const debouncedFetch = (values) => {
            // Clear any existing debounce timer
            if (debounceRef.current) {
              clearTimeout(debounceRef.current);
            }

            // Set a new debounce timer
            debounceRef.current = setTimeout(() => {
              handleFetchColleges(values);
            }, 500); // 600ms delay (adjust if needed)
          };

          return (
            <Form className="w-full md:w-[90%] mx-auto p-4 sm:p-6 bg-white rounded-xl shadow-lg border border-gray-100 my-6 relative">
              {/* 🔴 Clear History Button */}
              <button
                type="button"
                onClick={() => {
                  localStorage.removeItem("eligibilityForm");
                  localStorage.removeItem("collegeData");

                  setCollegeData([]);
                  setExams([]);
                  setSelectedBranch("");
                  setPercentage(""); // clear props-based percentage

                  // ✅ Reset Formik form
                  setSearchClicked(false); // optional reset
                  setShowNoCollegeMsg(false);

                  // This will be called inside Formik render
                  resetForm({
                    values: {
                      selectedEducation: "",
                      selectedExam: "",
                      percentage: "",
                      selectedCategory: "",
                      selectedCaste: "",
                      selectedDistrict: "",
                      selectedBranch: "",
                    },
                  });
                }}
                className="absolute top-4 right-4 text-sm px-4 py-1 bg-red-100 text-red-600 border border-red-300 rounded-md hover:bg-red-200"
              >
                Clear History
              </button>

              {/* 📘 Academic Information */}
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                  </div>
                  <h2 className="text-base font-semibold text-gray-700">
                    Academic Information
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Education Level */}
                  <div>
                    <label className="block text-sm mb-1">
                      Current Education Level
                    </label>
                    <Field
                      as="select"
                      name="selectedEducation"
                      onChange={(e) =>
                        handleEducationChange(e.target.value, setFieldValue)
                      }
                      className="w-full p-2 border rounded"
                    >
                      <option value="">Select Education</option>
                      {currentEducation?.map((edu, i) => (
                        <option key={i} value={edu.nextLearn}>
                          {edu.nextLearn}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="selectedEducation"
                      component="div"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>

                  {/* Exam */}
                  {examOptions.length > 0 && (
                    <div>
                      <label className="block text-sm mb-1">
                        Qualifying Exam
                      </label>
                      <Field
                        as="select"
                        name="selectedExam"
                        className="w-full p-2 border rounded"
                      >
                        <option value="">Select Exam</option>
                        {examOptions.map((exam, i) => (
                          <option key={i} value={exam}>
                            {exam}
                          </option>
                        ))}
                      </Field>
                    </div>
                  )}

                  {/* Percentage */}
                  <div>
                    <label className="block text-sm mb-1">Percentage</label>
                    <Field name="percentage">
                      {({ field }) => (
                        <input
                          {...field}
                          type="number"
                          min="0"
                          max="100"
                          step="0.01"
                          className="w-full p-2 border rounded"
                          onChange={(e) => {
                            const value = e.target.value;
                            setFieldValue("percentage", value); // update Formik state

                            const perc = parseFloat(value);
                            if (
                              !isNaN(perc) &&
                              perc >= 0 &&
                              perc <= 100 &&
                              values.selectedEducation &&
                              values.selectedCategory &&
                              values.selectedCaste &&
                              values.selectedDistrict
                            ) {
                              debouncedFetch({
                                ...values,
                                percentage: value,
                              });
                            }
                          }}
                        />
                      )}
                    </Field>

                    <ErrorMessage
                      name="percentage"
                      component="div"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>
                </div>
              </div>

              {/* ✅ Conditionally show Course & Location Preferences */}
              {values.selectedEducation && (
                <>
                  {/* Course & Location Preferences */}
                  <div className="mb-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <MapPin className="w-5 h-5 text-green-600" />
                      </div>
                      <h2 className="text-base font-semibold text-gray-700">
                        Course & Location Preferences
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {/* Future Eligibility */}
                      <div>
                        <label className="block text-sm mb-1">
                          Future Eligibility
                        </label>
                        <Field
                          as="select"
                          name="selectedCategory"
                          onChange={(e) =>
                            handleCategoryChange(e.target.value, setFieldValue)
                          }
                          className="w-full p-2 border rounded"
                        >
                          <option value="">Select Category</option>
                          {category?.map((cat, i) => (
                            <option key={i} value={cat.category}>
                              {cat.category}
                            </option>
                          ))}
                        </Field>
                        <ErrorMessage
                          name="selectedCategory"
                          component="div"
                          className="text-red-500 text-xs mt-1"
                        />
                      </div>

                      {/* Caste */}
                      <div>
                        <label className="block text-sm mb-1">
                          Caste Category
                        </label>
                        <Field
                          as="select"
                          name="selectedCaste"
                          className="w-full p-2 border rounded"
                        >
                          <option value="">Select Caste</option>
                          {casts?.map((cast, i) => (
                            <option key={i} value={cast}>
                              {cast}
                            </option>
                          ))}
                        </Field>
                        <ErrorMessage
                          name="selectedCaste"
                          component="div"
                          className="text-red-500 text-xs mt-1"
                        />
                      </div>

                      {/* District */}
                      <div>
                        <label className="block text-sm mb-1">
                          Preferred District
                        </label>
                        <Field
                          as="select"
                          name="selectedDistrict"
                          className="w-full p-2 border rounded"
                        >
                          <option value="">Select District</option>
                          {districts?.map((dist, i) => (
                            <option key={i} value={dist}>
                              {dist}
                            </option>
                          ))}
                        </Field>
                        <ErrorMessage
                          name="selectedDistrict"
                          component="div"
                          className="text-red-500 text-xs mt-1"
                        />
                      </div>

                      {/* Branch */}
                      <div>
                        <label className="block text-sm mb-1">
                          Preferred Branch
                        </label>
                        <Field
                          as="select"
                          name="selectedBranch"
                          className="w-full p-2 border rounded"
                        >
                          <option value="">Select Branch</option>
                          {availableSubCategories?.map((sub, i) => (
                            <option key={i} value={sub}>
                              {sub}
                            </option>
                          ))}
                        </Field>
                      </div>
                    </div>
                  </div>

                  {/* 🔍 Search Button */}
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
                </>
              )}

              {/* 🏫 College List */}
              {/* <div className="mt-8">
                {collegeData?.length > 0 ? (
                  <CollegeList givenData={collegeData} />
                ) : (
                  // showNoCollegeMsg && (
                  //   <div className="bg-gradient-to-br from-green-50 to-white p-6 rounded-xl border border-green-100 shadow-xl text-center max-w-md w-full mt-6">
                  //     <p className="text-gray-700 text-base mb-3 leading-relaxed">
                  //       📚{" "}
                  //       <span className="font-semibold">
                  //         Need more details about this college ?
                  //       </span>
                  //       <br />
                  //       📲{" "}
                  //       <span className="font-medium">
                  //         Join our official WhatsApp group
                  //       </span>{" "}
                  //       for expert guidance and the latest updates!
                  //     </p>
                  //     <div className="mt-4 flex justify-center">
                  //       <a
                  //         href="https://whatsapp.com/channel/0029VbADrN54IBh95nFJiR3e"
                  //         target="_blank"
                  //         rel="noopener noreferrer"
                  //         className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-5 py-2.5 rounded-full shadow-md transition-all"
                  //       >
                  //         <FaWhatsapp size={20} />
                  //         Join WhatsApp
                  //       </a>
                  //     </div>
                  //   </div>
                  // )
                  
                )}
              </div> */}

              <div className="mt-8">
  {collegeData?.length > 0 ? (
    <CollegeList givenData={collegeData} />
  ) : (
    showNoCollegeMsg && (
      <div className="flex justify-center mt-6">
        <div className="bg-gradient-to-br from-green-50 to-white p-6 rounded-xl border border-green-100 shadow-xl text-center w-full max-w-md">
          <p className="text-gray-700 text-base mb-3 leading-relaxed">
            📚{" "}
            <span className="font-semibold">
              Need more details about this college?
            </span>
            <br />
            📲{" "}
            <span className="font-medium">
              Join our official WhatsApp group
            </span>{" "}
            for expert guidance and the latest updates!
          </p>
          <div className="mt-4 flex justify-center">
            <a
              href="https://whatsapp.com/channel/0029VbADrN54IBh95nFJiR3e"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-5 py-2.5 rounded-full shadow-md transition-all"
            >
              <FaWhatsapp size={20} />
              Join WhatsApp
            </a>
          </div>
        </div>
      </div>
    )
  )}
</div>

            </Form>
          );
        }}
      </Formik>
      <Flotingbutton />
    </>
  );
};

export default SearchForm;
