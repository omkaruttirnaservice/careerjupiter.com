import React, { memo, useEffect, useState } from "react";
import { FcAlarmClock } from "react-icons/fc";

function TestClock({ testDuration, handleSubmit }) {
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
    <div className="w-full flex flex-col sm:flex-row items-center sm:justify-between px-4 sm:px-0">
      {/* Clock & Progress Bar Container */}
      <div className="relative w-full max-w-lg flex flex-col items-center">
        {/* Clock Icon - Moves with Progress */}
        <div
          className="absolute -top-3 transition-all duration-300"
          style={{
            left: `${progressWidth}%`,
            transform: `translate(-50%, 0)`,
          }}
        >
          <FcAlarmClock className="text-4xl sm:text-4xl md:ml-38" />
        </div>

        {/* Responsive Progress Bar */}
        <div className="w-full bg-gray-300 rounded-full h-4 md:ml-42 sm:h-6 overflow-hidden mt-6 relative">
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
      <p className="text-lg font-semibold mt-2 sm:mt-0 sm:text-xl sm:ml-auto">
        ⏳ Time: {Math.floor(timeLeft / 60)}:
        {(timeLeft % 60).toString().padStart(2, "0")}
      </p>
    </div>
  );
}

export default memo(TestClock);
