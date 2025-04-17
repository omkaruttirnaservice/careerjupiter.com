import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const TestResultSkeleton = () => {
  return (
    <div className="w-full h-auto rounded-md p-4 shadow-sm">
      <h2 className="text-center font-bold mb-4">
        <Skeleton width={200} height={40} />
      </h2>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center">
          <Skeleton height={20} width={100} className="mx-auto mb-1" />
          <Skeleton height={25} width={40} className="mx-auto" />
        </div>
        <div className="text-center">
          <Skeleton height={20} width={100} className="mx-auto mb-1" />
          <Skeleton height={25} width={40} className="mx-auto" />
        </div>
        <div className="text-center">
          <Skeleton height={20} width={100} className="mx-auto mb-1" />
          <Skeleton height={25} width={40} className="mx-auto" />
        </div>
      </div>

      <div className="text-center mb-4">
        <Skeleton height={20} width={180} className="mx-auto" />
      </div>

      <div className="flex justify-center mb-4">
        <Skeleton circle height={40} width={40} />
      </div>

      <div className="text-center mb-4">
        <Skeleton height={20} width={220} className="mx-auto" />
      </div>

      <div className="text-center">
        <Skeleton height={35} width={150} className="mx-auto rounded" />
      </div>
    </div>
  );
};

export default TestResultSkeleton;
