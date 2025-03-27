"use client";

import { memo, useEffect, useState } from "react";
import { FcAlarmClock } from "react-icons/fc";

function TestClock({ testDuration, handleSubmit, title }) {
  const [timeLeft, setTimeLeft] = useState(testDuration * 60);

  useEffect(() => {
    if (timeLeft === 0) {
      handleSubmit();
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  // Progress bar width calculation
  const progressWidth = (timeLeft / (testDuration * 60)) * 100;

  return (
    <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4 px-2 sm:px-4">
      <div className="relative w-full sm:w-3/4 md:w-2/3 lg:w-1/2 flex flex-col justify-start">
        <h1 className="text-lg sm:text-xl md:text-2xl font-bold mb-1 sm:mb-2">
          {title}
        </h1>

        <div
          className="absolute transition-all duration-300 z-10"
          style={{
            left: `${progressWidth}%`,
            transform: `translate(-50%, 0)`,
            top: "2.5rem",
          }}
        >
          <FcAlarmClock className="text-2xl mt-2  sm:mt-6 md:mt-4 sm:text-3xl" />
        </div>

        <div className="w-full bg-gray-300 rounded-full h-3 sm:h-4 overflow-hidden mt-6 relative">
          <div
            className="h-full rounded-full border-1 transition-all duration-500"
            style={{
              width: `${progressWidth}%`,
              background: `linear-gradient(to right, red 0%, yellow 50%, green 100%)`,
            }}
          ></div>
        </div>
      </div>

      <p className="text-base sm:text-lg md:text-xl font-semibold mt-2 sm:mt-0 whitespace-nowrap">
        Time: {Math.floor(timeLeft / 60)}:
        {(timeLeft % 60).toString().padStart(2, "0")}
      </p>
    </div>
  );
}

export default memo(TestClock);


