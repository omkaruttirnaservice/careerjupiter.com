"use client";

import { useEffect, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  getTest,
  getResult,
  getIQTestData,
  getUserDetail,
  deleteTest,
} from "./Api";
import { FaBrain } from "react-icons/fa";
import Swal from "sweetalert2";
import { testOption } from "../../Constant/constantData";
import IQTest from "./IQTest";
import { useDispatch, useSelector } from "react-redux";
import { setTestResult } from "../../store-redux/testResultSlice";
import { useNavigate } from "react-router-dom";
import LoadingTestCard from "../loading-skeleton/LoadingTestCard";
import { setUserRole } from "../../store-redux/userRoleSlice";
import { Opacity } from "@mui/icons-material";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { setResultsId } from "../../store-redux/resultSlice";

function TestCard() {
  const [selectedTest, setSelectedTest] = useState(null);
  const [testDuration, setTestDuration] = useState(0);
  const [testName, setTestName] = useState("");
  const [testId, setTestId] = useState(null);
  const [testLevel, setTestLevel] = useState("all");
  const [resultId, setResultId] = useState();
  const [userType, setUserType] = useState();
  const [iqTestDataPayload, setIqTestDataPayload] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userId } = useSelector((state) => state.auth);
  const resultsId = useSelector((state) => state.result.resultsId);
  // resultsId;

  const token = Cookies.get("token");
  const decodedToken = jwtDecode(token);
  const userRole = decodedToken.role;
  console.log("Decoded Token test card:", decodedToken.role);
  console.log("========", userRole);

  // Fetch User Details
  // const { data: userData } = useQuery({
  //   queryKey: ["getUserDetail", userId],
  //   queryFn: () => getUserDetail(userId),
  //   enabled: true,
  //   refetchOnMount: true,
  // });
  // useEffect(() => {
  //   if (userData?.data?.data?.role) {
  //     dispatch(setUserRole(userData.data.data.role));
  //   }
  // }, [userData, dispatch]);

  // Fetch available tests
  const { data, isPending, refetch } = useQuery({
    queryKey: ["getTest", testLevel],
    queryFn: () => getTest(testLevel),
    staleTime: 0,
  });

  const getIQTestDataMutation = useMutation({
    mutationFn: getIQTestData,
    onSuccess: (response) => {
      setSelectedTest(response?.data?.questions);
      setTestDuration(response?.data?.testDuration);
      setTestName(response?.data?.title);
      setResultId(response?.data?.resultId);

      console.log("coming hereeeee---------");
      dispatch(setResultsId(response?.data?.resultId));
    },
  });

  const { mutate: fetchResult, data: resultData } = useMutation({
    mutationFn: () => getResult({ iqTestId: testId, userId }),
  });
  useEffect(() => {
    if (resultData?.data) {
      dispatch(setTestResult(resultData.data));
      navigate("/profile/test/?type=result");
    }
  }, [resultData?.data, dispatch, navigate]);
  useEffect(() => {
    refetch();
  }, [testLevel, refetch]);

  const deleteTestMutation = useMutation({
    mutationFn: deleteTest,
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Test Reset!",
        text: "You can now re-attempt the test.",
        confirmButtonColor: "#28a745",
      }).then(() => {
        refetch(); // Refresh the test list if needed
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
        deleteTestMutation.mutate({
          iqTestId: test._id,
          userId: userId,
          // resultId: resultsId, // Adjust this based on your API structure
        });
      }
    });
  };

  const handleResult = async (test) => {
    console.log("hello - 1");

    if (test.attempted === 1) {
      setTestId(test._id);
      await fetchResult();
      console.log("hello - 2");
      return;
    }
  };

  const handleTestClick = async (test) => {
    // Set userType from the current test
    setUserType(test.userType);

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

    // if (test.attempted === 1) {
    //   setTestId(test._id);
    //   await fetchResult();
    //   return;
    // }

    const newIqTestDataPayload = { iqTestId: test._id, userId };

    if (test?.attempted === 0 || test?.attempted === -1) {
      Swal.fire({
        title: `${test?.attempted === -1 ? "Resume" : "Start"} ${test.title}?`,
        text: `Duration: ${test.testDuration.minutes} min | Total Marks: ${test.totalMarks}`,
        icon: "info",
        showCancelButton: true,
        confirmButtonText: `${test?.attempted === -1 ? "Resume Test" : "Start Test"}`,
        cancelButtonText: "Cancel",
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
      />
    );
  }
  return (
    <div className="p-4">
      <div className="mb-4">
        <label className="block text-lg font-medium mb-2">
          IQ Test Level:
          <select
            className="p-2 ml-3 w-50 border rounded-lg"
            value={testLevel}
            onChange={(e) => setTestLevel(e.target.value)}
          >
            {testOption.map((testType) => (
              <option key={testType} value={testType}>
                {testType}
              </option>
            ))}
          </select>
        </label>
      </div>
      {isPending ? (
        <LoadingTestCard />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.data?.map((test) => {
            const isAccessible =
              (userRole === "GUEST" && test.userType === "0") ||
              (userRole === "USER" &&
                (test.userType === "0" || test.userType === "1"));
            console.log({ isAccessible });
            console.log("userType:", test?.userType);
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
                  Test Level:{" "}
                  <span className="font-medium">{test.testLevel || "N/A"}</span>
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
