import { useEffect, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getResult, getIQTestData, deleteTest } from "./Api";
import { FaBrain } from "react-icons/fa";
import Swal from "sweetalert2";
import IQTest from "./IQTest";
import { useDispatch, useSelector } from "react-redux";
import { setTestResult } from "../../store-redux/testResultSlice";
import { useLocation, useNavigate } from "react-router-dom";
import LoadingTestCard from "../loading-skeleton/LoadingTestCard";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { setResultsId } from "../../store-redux/resultSlice";
import { BASE_URL } from "../../utils/constansts";
import axios from "axios";
import { getAuthHeader } from "../../utils/mics";
import Breadcrumb from "./Breadcrumb";
import { toast } from "react-toastify";

function TestCard({ externalTestList, externalCompetedTestList }) {
  const [selectedTest, setSelectedTest] = useState(null);
  const [testDuration, setTestDuration] = useState(0);
  const [testName, setTestName] = useState("");
  const [testId, setTestId] = useState(null);
  const [resultId, setResultId] = useState();
  const [iqTestDataPayload, setIqTestDataPayload] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userId } = useSelector((state) => state.auth);
  const [newTestId, setNewTestId] = useState(null);
  const [submitTest, setSubmitTest] = useState(null);
  const [resultsData, setResultsData] = useState(null);
  const [userRole, setUserRole] = useState(null);

  // const token = Cookies.get("token");
  // const decodedToken = jwtDecode(token);
  // const userRole = decodedToken.role;

  const [loadingIQTest, setLoadingIQTest] = useState(false);


   useEffect(() => {
     const token = Cookies.get("token");

     if (token && typeof token === "string") {
       try {
         const decodedToken = jwtDecode(token);
         setUserRole(decodedToken.role);
       } catch (err) {
         console.error("Token decode error:", err);
         toast.error("No user found.. Please login again.");
       }
     } else {
       toast.error("No user found. Please login.");
     }
   }, []);

  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const categoryId = query.get("id");
  const sub_Category = query.get("sub_category");
  const sub_sub_Category = query.get("sub_sub_name");
  const main_name = query.get("main_name");

  const mainCategoryName = main_name;
  const subCategoryName = sub_Category;
  const subSubCategoryName = sub_sub_Category;

  const {
    data: test_List,
    mutate: fetchTestList,
    isPending,
    isError,
  } = useMutation({
    mutationFn: () =>
      axios.post(
        `${BASE_URL}/api/iqtest/get-iq-test-list-by-user`,
        {
          mainCategoryId: categoryId,
          sub_category: sub_Category,
          sub: sub_sub_Category,
        },
        {
          headers: {
            Authorization: getAuthHeader(),
          },
        }
      ),
  });

  useEffect(() => {
    if (categoryId && sub_Category && sub_sub_Category) {
      fetchTestList();
    }
  }, [categoryId, sub_Category, sub_sub_Category]);

  const iqtests =
    externalTestList && externalTestList.length > 0
      ? externalTestList
      : externalCompetedTestList && externalCompetedTestList.length > 0
        ? externalCompetedTestList
        : test_List?.data?.data || [];

  const getIQTestDataMutation = useMutation({
    mutationFn: getIQTestData,
    onSuccess: (response) => {
      setNewTestId(response?.data?.testID);
      setSelectedTest(response?.data?.questions);
      setTestDuration(response?.data?.testDuration);
      setTestName(response?.data?.title);
      setResultId(response?.data?.iqTestId);
      dispatch(setResultsId(response?.data?.resultId));
    },
  });

  const { mutate: fetchResult, data: resultData } = useMutation({
    mutationFn: ({ testID, userId }) => getResult({ testID, userId }),
  });

  useEffect(() => {
    if (resultData?.data) {
      dispatch(setTestResult(resultData.data));
      navigate("/profile/test/?type=result");
    }
  }, [resultData?.data, dispatch, navigate]);

  const deleteTestMutation = useMutation({
    mutationFn: deleteTest,
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Test Reset!",
        text: "You can now re-attempt the test.",
        confirmButtonColor: "#28a745",
      }).then(() => {
        // refetch();
      });
    },
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Failed!",
        text: "Something went wrong while resetting the test.",
      });
    },
  });

  const showInstructionAndStart = (test) => {
    const newIqTestDataPayload = { testID: test._id, userId };
    setIqTestDataPayload(newIqTestDataPayload);
    getIQTestDataMutation.mutate(newIqTestDataPayload);
    setTestId(test._id);
  };

  const handleDeleteTest = (test) => {
    setTestId(test._id);
    Swal.fire({
      icon: "question",
      title: "Are you sure?",
      text: `You are about to re-attempt "${test.title}"`,
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, Re-Test!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteTestMutation.mutate(
          { testID: test._id, userId },
          {
            onSuccess: () => {
              showInstructionAndStart(test);
            },
          }
        );
      }
    });
  };

  const handleResult = async (test) => {
    if (test.attempted === 1) {
      setTestId(test._id);
      await fetchResult({ testID: test._id, userId });
      return;
    }
  };

  const handleTestClick = async (test) => {
    const isAccessible =
      (userRole === "GUEST" && test.userType === "0") ||
      (userRole === "USER" && (test.userType === "0" || test.userType === "1"));

    if (!isAccessible) {
      Swal.fire({
        icon: "warning",
        title: "Access Denied",
        text: "Please sign up and access this test.",
      });
      return;
    }

    const newIqTestDataPayload = { testID: test._id, userId };

    if (test?.attempted === 0 || test?.attempted === -1) {
      Swal.fire({
        title: `${test?.attempted === -1 ? "Resume" : "Start"} ${test.title}?`,
        html: `
      <div class="text-left max-h-[60vh] overflow-y-auto">
        <div class="flex items-center mb-4">
          <svg class="w-6 h-6 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <h3 class="text-lg font-bold">Test Instructions</h3>
        </div>
        
        <div class="bg-blue-50 p-4 rounded-lg mb-4">
          <h4 class="font-semibold text-blue-800 mb-2">General Guidelines:</h4>
          <ul class="space-y-2 list-disc pl-5 text-blue-700">
            <li>Total duration: ${test.testDuration.minutes} minutes</li>
            <li>Total questions: ${test.totalMarks}</li>
            <li>Each question carries equal marks</li>
            <li>No negative marking</li>
          </ul>
        </div>
        
        <div class="bg-yellow-50 p-4 rounded-lg mb-4">
          <h4 class="font-semibold text-yellow-800 mb-2">During the Test:</h4>
          <ul class="space-y-2 list-disc pl-5 text-yellow-700">
            <li>Click on radio buttons to select answers</li>
            <li>You can change answers before final submission</li>
            <li>Don't refresh the page during the test</li>
            <li>Timer starts immediately when you begin</li>
          </ul>
        </div>
        
        <div class="flex items-start mt-4">
          <input 
            type="checkbox" 
            id="agreeTerms" 
            class="w-5 h-5 mt-1 mr-2 cursor-pointer"
          >
          <label for="agreeTerms" class="text-gray-700 cursor-pointer">
            I confirm that I have read and understood all instructions
          </label>
        </div>
      </div>
    `,
        showCancelButton: true,
        confirmButtonText: `
      <span class="flex items-center gap-2">
        <VscDebugStart />
        ${test?.attempted === -1 ? "Resume Test" : "Start Test"}
      </span>
    `,
        cancelButtonText: "Cancel",
        didOpen: () => {
          const confirmBtn = Swal.getConfirmButton();
          const checkbox = Swal.getPopup().querySelector("#agreeTerms");
          confirmBtn.disabled = true;

          checkbox.addEventListener("change", () => {
            confirmBtn.disabled = !checkbox.checked;
          });
        },
      }).then((result) => {
        if (result.isConfirmed) {
          setIqTestDataPayload(newIqTestDataPayload);
          getIQTestDataMutation.mutate(newIqTestDataPayload);
          setTestId(test._id);
        }
      });
    }
  };
  if (selectedTest) {
    return (
      <IQTest
        questions={selectedTest}
        testDuration={testDuration}
        title={testName}
        testId={testId}
        resultId={resultId}
        getIQTestDataMutation={getIQTestDataMutation}
        iqTestDataPayload={iqTestDataPayload}
        newTestId={newTestId}
        setSubmitTest={setSubmitTest}
        setResultsData={setResultsData}
      />
    );
  }
  return (
    <div className="p-4">
      <Breadcrumb
        mainCategoryName={mainCategoryName}
        subCategoryName={subCategoryName}
        subSubCategoryName={subSubCategoryName}
      />
      {isPending ? (
       
        <LoadingTestCard />
       
      ) : (
        <div className="grid grid-cols-1  mt-5 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {iqtests?.map((test) => {
            const isAccessible =
              (userRole === "GUEST" && test.userType === "0") ||
              (userRole === "USER" &&
                (test.userType === "0" || test.userType === "1"));
            return (
              <div
                key={test._id}
                className={`relative p-4 rounded-lg shadow-lg border cursor-pointer transition-all duration-300
                  ${isAccessible ? "opacity-100" : "opacity-40"}
                  ${test?.attempted === 1 ? "shadow-green-500 shadow-md" : "bg-white shadow-lg"}
                  ${test?.attempted === -1 ? "shadow-yellow-500 shadow-md" : "bg-white shadow-lg"}`}
                onClick={() => handleTestClick(test)}
              >
                <div className="flex items-center space-x-3 mb-4">
                  <FaBrain className="text-blue-500 text-4xl" />
                  <h2 className="text-xl font-semibold">{test.title}</h2>
                </div>
                <p>
                  Main Category:{" "}
                  <span className="font-medium">
                    {test.main_category || main_name}
                  </span>
                </p>
                <p>
                  Duration:{" "}
                  <span className="font-medium">
                    {test?.testDuration?.minutes || "N/A"} min
                  </span>
                </p>
                <p>
                  Total Marks:{" "}
                  <span className="font-medium">
                    {test.totalMarks || "N/A"}
                  </span>
                </p>
                {test?.attempted === 1 && (
                  <div className="flex gap-1">
                    <button
                      onClick={() => handleResult(test)}
                      className="absolute bottom-2 right-18 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-md shadow"
                    >
                      View Result
                    </button>
                    <button
                      onClick={() => handleDeleteTest(test)}
                      className="absolute bottom-2 right-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-md shadow"
                    >
                      Re-Test
                    </button>
                  </div>
                )}
                {test?.attempted === -1 && (
                  <button className="absolute bottom-2 right-2 bg-yellow-600 text-white text-xs font-bold px-2 py-1 rounded-md shadow">
                    In-Progress
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
export default TestCard;
