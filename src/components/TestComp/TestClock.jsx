import React, { memo, useEffect, useState } from "react";
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
    <div
      className="w-full flex z-0 flex-col sm:flex-row 
    justify-between sm:justify-between px-4 sm:px-0"
    >
      {/* Clock & Progress Bar Container */}
      <div className="relative z-0 w-full max-w-lg flex flex-col justify-start">
        <h1 className="text-xl font-bold">{title}</h1>
        {/* Clock Icon - Moves with Progress */}
        <div
          className="absolute z-0 top-5 transition-all duration-300"
          style={{
            left: `${progressWidth}%`,
            transform: `translate(-50%, 0)`,
          }}
        >
          <FcAlarmClock className="text-2xl sm:text-3xl md:ml-80" />
        </div>

        {/* Responsive Progress Bar */}
        <div className="w-full z-0 bg-gray-300 rounded-full h-4 md:ml-42 sm:h-4 overflow-hidden mt-6 relative">
          {/* Progress Bar with Gradient */}
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${progressWidth}%`,
              background: `linear-gradient(to right, red 0%, yellow 50%, green 100%)`,
            }}
          ></div>
        </div>
      </div>

      {/* Timer Display - Mobile Center, Desktop Right */}
      <p className="text-lg mt-0 font-semibold sm:mt-0 sm:text-xl sm:ml-auto">
        ⏳ Time: {Math.floor(timeLeft / 60)}:
        {(timeLeft % 60).toString().padStart(2, "0")}
      </p>
    </div>
  );
}

export default memo(TestClock);
