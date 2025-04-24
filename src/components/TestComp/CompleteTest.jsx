import { useSelector } from "react-redux";
import TestCard from "./TestCard";
import { useMutation } from "@tanstack/react-query";
import { getCompletedTest} from "./Api";
import { useEffect } from "react";
import { getAuthHeader } from "../../utils/mics";
import dataNotFound from "../../assets/images/dataNotFound.jpg";
import LoadingTestCard from "../loading-skeleton/LoadingTestCard";

const CompleteTest = () => {
  const { userId } = useSelector((state) => state.auth);

  const {
    mutate: fetchInCompetedTests,
    data: inCompletedTestData,
    isLoading: isInCompletedLoading,
    isError: isCompetedError,
    error: inCompletedError,
  } = useMutation({
    mutationFn: (payload) =>
      getCompletedTest(payload, {
        headers: {
          Authorization: getAuthHeader(),
        },
      }),
  });

  useEffect(() => {
    if (userId) {
      fetchInCompetedTests({ userId });
    }
  }, [userId, fetchInCompetedTests]);

  const testList = inCompletedTestData?.data?.data;

  return (
    <>
      {/* <h2 className="text-center text-white text-xl sm:text-2xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-green-300 to-green-600 py-3 px-8 rounded-2xl shadow-lg w-full max-w-2xl mx-auto">
        Completed Tests
      </h2> */}
      {!isInCompletedLoading && !isCompetedError && testList?.length === 0 && (
        <>
          <div className="flex justify-center items-center flex-col mt-5">
            <img
              src={dataNotFound}
              alt="No image found"
              className="w-40 sm:w-56 md:w-64 lg:w-72 xl:w-80 object-contain"
            />
            <p className="text-center text-gray-800">
              No Completed test data found
            </p>
          </div>
        </>
      )}
      {isInCompletedLoading && <LoadingTestCard/>}
      <TestCard
        externalCompetedTestList={inCompletedTestData?.data?.data || []}
      />
    </>
  );
};

export default CompleteTest;
