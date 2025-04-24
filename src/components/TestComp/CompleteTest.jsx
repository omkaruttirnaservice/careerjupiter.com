import { useSelector } from "react-redux";
import TestCard from "./TestCard";
import { useMutation } from "@tanstack/react-query";
import { getCompletedTest } from "./Api";
import { useEffect, useState } from "react";
import { getAuthHeader } from "../../utils/mics";
import dataNotFound from "../../assets/images/dataNotFound.jpg";
import LoadingTestCard from "../loading-skeleton/LoadingTestCard";

const CompleteTest = () => {
  const { userId } = useSelector((state) => state.auth);
  const [isPreloading, setIsPreloading] = useState(true);

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
    onSuccess: () => {
      setTimeout(() => setIsPreloading(false), 1000); // Optional preload effect
    },
    onError: () => {
      setIsPreloading(false);
    },
  });

  useEffect(() => {
    if (userId) {
      fetchInCompetedTests({ userId });
    }
  }, [userId, fetchInCompetedTests]);

  const testList = inCompletedTestData?.data?.data;

  return (
    <>
      {(isInCompletedLoading || isPreloading) && <LoadingTestCard />}

      {!isInCompletedLoading && !isCompetedError && testList?.length === 0 && !isPreloading && (
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
      )}

      {!isInCompletedLoading && !isPreloading && testList?.length > 0 && (
        <TestCard externalCompetedTestList={testList} />
      )}
    </>
  );
};

export default CompleteTest;
