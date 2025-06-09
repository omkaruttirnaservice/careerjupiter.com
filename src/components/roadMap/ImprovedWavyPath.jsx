
import { motion } from "framer-motion";
import {
  FaGraduationCap,
  FaRocket,
  FaHome,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { useRef, useEffect, useState } from "react";

const ImprovedWavyPath = ({ path, onStepClick, currentStepIndex }) => {
  const scrollRef = useRef(null);
  const [currentStartIndex, setCurrentStartIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [centerIndex, setCenterIndex] = useState(0);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // For mobile: center the current step or start from beginning
  useEffect(() => {
    if (isMobile) {
      setCenterIndex(currentStepIndex || 0);
    } else {
      // Desktop logic
      const itemsToShow = 4;
      const maxStartIndex = Math.max(0, path.length - itemsToShow);
      setCurrentStartIndex(maxStartIndex);
    }
  }, [path, isMobile, currentStepIndex]);

  useEffect(() => {
    if (isMobile && path?.length > 0) {
      setCenterIndex(path.length - 1);
    }
  }, [path]);

  useEffect(() => {
    const stepNode = document.querySelector(`#step-${centerIndex}`);
    if (stepNode)
      stepNode.scrollIntoView({ behavior: "smooth", inline: "center" });
  }, [centerIndex]);

  const handleStepClick = (index) => {
    if (onStepClick) onStepClick(index);

    // Always center the clicked step
    setCenterIndex(index);
  };

  // Mobile navigation functions
  const goToPreviousMobile = () => {
    setCenterIndex((prev) => Math.max(0, prev - 1));
  };

  const goToNextMobile = () => {
    setCenterIndex((prev) => Math.min(path.length - 1, prev + 1));
  };

  // Desktop navigation functions
  const goToPrevious = () => {
    setCurrentStartIndex((prev) => Math.max(0, prev - 1));
  };

  const goToNext = () => {
    const itemsToShow = 4;
    const maxStartIndex = Math.max(0, path.length - itemsToShow);
    setCurrentStartIndex((prev) => Math.min(maxStartIndex, prev + 1));
  };

  if (path.length === 0) return null;

  // Mobile view logic
  if (isMobile) {
    const canGoLeft = centerIndex > 0;
    const canGoRight = centerIndex < path.length - 1;
    const currentStep = path[centerIndex] || null;

    return (
      <div className="relative w-full my-8">
        {/* Mobile Step Container */}
        <div className="flex items-center justify-center px-4">
          {/* Left Navigation - Only show if there are previous steps */}
          <div className="flex-shrink-0 w-12 flex justify-center">
            {canGoLeft && (
              <button
                onClick={goToPreviousMobile}
                className="bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full p-3 shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300"
              >
                <FaChevronLeft className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Main Step Display */}
          <div className="flex-1 mx-4">
            {/* Progress Line Background */}
            <div className="relative w-full min-w-[250px] px-4">
              {/* Background line */}
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-gray-200 to-gray-300 transform -translate-y-1/2 rounded-full"></div>

              {/* Progress line */}
              <div
                className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 transform -translate-y-1/2 rounded-full transition-all duration-700 ease-out"
                style={{ width: `${((centerIndex + 1) / path.length) * 100}%` }}
              ></div>

              {/* Previous Steps Breadcrumb (left side) */}
              {centerIndex > 0 && (
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-2">
                  <div className="flex items-center space-x-1">
                    {centerIndex > 2 && (
                      <span className="text-xs text-gray-400">...</span>
                    )}
                    {path
                      .slice(Math.max(0, centerIndex - 2), centerIndex)
                      .map((step, idx) => {
                        const actualIndex = Math.max(0, centerIndex - 2) + idx;
                        return (
                          <button
                            key={actualIndex}
                            onClick={() => handleStepClick(actualIndex)}
                            className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-xs font-medium text-gray-600 hover:bg-gray-400 transition-colors"
                            title={step.name}
                          >
                            {actualIndex + 1}
                          </button>
                        );
                      })}
                  </div>
                </div>
              )}

              {/* Current Step Node */}
              <div className="relative flex justify-center">
                <motion.div
                  key={`step-${centerIndex}`}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    duration: 0.6,
                  }}
                  className="relative"
                >
                  {/* Glowing ring effect */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 animate-pulse opacity-30 scale-125"></div>

                  {/* Main node */}
                  <div
                    className="relative w-16 h-16 rounded-full flex items-center justify-center text-white shadow-2xl border-4 border-white transform transition-all duration-300 hover:scale-110"
                    style={{
                      background: `linear-gradient(135deg, ${
                        [
                          "#8b5cf6",
                          "#ec4899",
                          "#6366f1",
                          "#3b82f6",
                          "#10b981",
                          "#f59e0b",
                        ][centerIndex % 6]
                      }, ${["#a855f7", "#f472b6", "#818cf8", "#60a5fa", "#34d399", "#fbbf24"][centerIndex % 6]})`,
                    }}
                  >
                    {centerIndex === 0 ? (
                      <FaHome className="text-xl" />
                    ) : centerIndex === path.length - 1 ? (
                      <FaRocket className="text-xl" />
                    ) : (
                      <FaGraduationCap className="text-xl" />
                    )}
                  </div>

                  {/* Success indicator for last step */}
                  {centerIndex === path.length - 1 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 }}
                      className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg"
                    >
                      🎯
                    </motion.div>
                  )}
                </motion.div>
              </div>

              {centerIndex < path.length - 1 && (
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-2">
                  <div className="flex items-center space-x-1">
                    {path
                      .slice(
                        centerIndex + 1,
                        Math.min(path.length, centerIndex + 3)
                      )
                      .map((step, idx) => {
                        const actualIndex = centerIndex + 1 + idx;
                        return (
                          <button
                            key={actualIndex}
                            onClick={() => handleStepClick(actualIndex)}
                            className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-500 hover:bg-gray-300 transition-colors"
                            title={step.name}
                          >
                            {actualIndex + 1}
                          </button>
                        );
                      })}
                    {path.length - centerIndex > 3 && (
                      <span className="text-xs text-gray-400">...</span>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Step Information Card */}
            {currentStep && (
              <div
                onClick={() => handleStepClick(centerIndex)}
                className="cursor-pointer"
              >
                <motion.div
                  key={`info-${centerIndex}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="mt-6 bg-white rounded-2xl shadow-xl border border-gray-100 p-6 mx-2"
                >
                  <div className="text-center">
                    <h3 className="text-lg font-bold text-gray-800 mb-2">
                      {currentStep.name}
                    </h3>
                    {/* <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 mb-3">
                      <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full font-medium">
                        Step {centerIndex + 1}
                      </span>
                      <span className="text-gray-400">of</span>
                      <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full font-medium">
                        {path.length}
                      </span>
                    </div> */}
                  </div>
                </motion.div>
              </div>
            )}
          </div>

          {/* Right Navigation - Only show if there are next steps */}
          <div className="flex-shrink-0 w-12 flex justify-center">
            {canGoRight && (
              <button
                onClick={goToNextMobile}
                className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full p-3 shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300"
              >
                <FaChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Bottom Progress Dots - Make them clickable */}
        {/* <div className="flex justify-center mt-6 space-x-2">
          {path.map((step, index) => (
            <button
              key={index}
              onClick={() => handleStepClick(index)} // ✅ Proper handler
              className={`transition-all duration-300 rounded-full ${
                index === centerIndex
                  ? "w-8 h-3 bg-gradient-to-r from-purple-500 to-blue-500"
                  : index < centerIndex
                    ? "w-3 h-3 bg-purple-300"
                    : "w-3 h-3 bg-gray-300"
              }`}
              title={step.name}
            />
          ))}
        </div> */}
      </div>
    );
  }

  // Desktop view (original wavy design)
  const itemsToShow = 4;
  const visiblePath = path.slice(
    currentStartIndex,
    currentStartIndex + itemsToShow
  );
  const canGoLeft = currentStartIndex > 0;
  const canGoRight = currentStartIndex + itemsToShow < path.length;

  // Generate alternating positions for the wave
  const generateAlternatingPositions = (stepCount) => {
    const positions = [];
    const amplitude = 25;

    for (let i = 0; i < stepCount; i++) {
      const x = (i / Math.max(1, stepCount - 1)) * 100;
      const y = i % 2 === 0 ? -amplitude : amplitude;
      positions.push({ x, y });
    }
    return positions;
  };

  // Generate SVG path for the wave
  const generateWavePath = (positions) => {
    if (positions.length < 2) return "";

    let path = `M ${positions[0].x} ${50 + positions[0].y}`;

    for (let i = 1; i < positions.length; i++) {
      const prev = positions[i - 1];
      const curr = positions[i];
      const cpx1 = prev.x + (curr.x - prev.x) * 0.5;
      const cpy1 = 50 + prev.y;
      const cpx2 = prev.x + (curr.x - prev.x) * 0.5;
      const cpy2 = 50 + curr.y;

      path += ` C ${cpx1} ${cpy1}, ${cpx2} ${cpy2}, ${curr.x} ${50 + curr.y}`;
    }

    return path;
  };

  const wavePositions = generateAlternatingPositions(visiblePath.length);
  const wavePath = generateWavePath(wavePositions);

  return (
    <div className="relative w-full my-6">
      <div className="flex items-center justify-center">
        {/* Left Arrow - Desktop */}
        {canGoLeft && (
          <button
            onClick={goToPrevious}
            className="absolute left-2 z-20 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-all duration-200 hover:scale-110"
          >
            <FaChevronLeft className="w-4 h-4 text-gray-600" />
          </button>
        )}

        {/* Desktop Main Content Container */}
        <div className="relative w-full max-w-5xl mx-auto px-2">
          <div className="relative" style={{ height: "280px" }}>
            {/* SVG Wave Path */}
            {visiblePath.length > 1 && (
              <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient
                    id="waveGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#8b5cf6" />
                    <stop offset="25%" stopColor="#ec4899" />
                    <stop offset="50%" stopColor="#6366f1" />
                    <stop offset="75%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#10b981" />
                  </linearGradient>
                </defs>

                <motion.path
                  d={wavePath}
                  stroke="url(#waveGradient)"
                  strokeWidth="1"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                />

                <motion.path
                  d={wavePath}
                  stroke="url(#waveGradient)"
                  strokeWidth="2"
                  fill="none"
                  opacity="0.3"
                  filter="blur(3px)"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, ease: "easeInOut", delay: 0.3 }}
                />
              </svg>
            )}

            {/* Desktop Step Nodes */}
            {visiblePath.map((step, visibleIndex) => {
              const actualIndex = currentStartIndex + visibleIndex;
              const colors = [
                "#8b5cf6",
                "#ec4899",
                "#6366f1",
                "#3b82f6",
                "#10b981",
                "#f59e0b",
              ];
              const color = colors[actualIndex % colors.length];
              const isLast = actualIndex === path.length - 1;
              const position = wavePositions[visibleIndex] || {
                x: visibleIndex * 50,
                y: 0,
              };

              return (
                <motion.div
                  key={actualIndex}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: visibleIndex * 0.15, duration: 0.4 }}
                  className="absolute cursor-pointer group"
                  style={{
                    left: `${position.x}%`,
                    top: `${50 + position.y}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                  onClick={() => handleStepClick(actualIndex)}
                >
                  <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 group-hover:scale-150 transition-all duration-300" />

                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center text-white shadow-xl border-4 border-white group-hover:scale-110 transition-all duration-300 relative z-10 ${
                      isLast
                        ? "ring-4 ring-yellow-300 ring-opacity-50 animate-pulse"
                        : ""
                    }`}
                    style={{ backgroundColor: color }}
                  >
                    {actualIndex === 0 ? (
                      <FaHome className="text-xl" />
                    ) : isLast ? (
                      <FaRocket className="text-xl" />
                    ) : (
                      <FaGraduationCap className="text-xl" />
                    )}
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: visibleIndex * 0.15 + 0.2 }}
                    className={`absolute ${
                      visibleIndex % 2 === 0 ? "-bottom-16" : "-top-16"
                    } left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg px-3 py-2 max-w-[120px] border`}
                  >
                    <p className="text-sm font-semibold text-gray-800 text-center truncate">
                      {step.name}
                    </p>
                    <p className="text-xs text-gray-500 text-center">
                      Step {actualIndex + 1}
                    </p>
                  </motion.div>

                  {isLast && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: visibleIndex * 0.15 + 0.4 }}
                      className="absolute -top-3 -right-3 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg"
                    >
                      🎯 END
                    </motion.div>
                  )}

                  {isLast && (
                    <>
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-2 h-2 bg-yellow-400 rounded-full"
                          style={{
                            left: `${Math.random() * 40 - 20}px`,
                            top: `${Math.random() * 40 - 20}px`,
                          }}
                          animate={{
                            y: [-10, -30, -10],
                            opacity: [0, 1, 0],
                            scale: [0.5, 1, 0.5],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Number.POSITIVE_INFINITY,
                            delay: i * 0.5,
                          }}
                        />
                      ))}
                    </>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Right Arrow - Desktop */}
        {canGoRight && (
          <button
            onClick={goToNext}
            className="absolute right-2 z-20 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-all duration-200 hover:scale-110"
          >
            <FaChevronRight className="w-4 h-4 text-gray-600" />
          </button>
        )}
      </div>

      {/* Desktop Progress Indicator */}
      <div className="flex justify-center mt-4 space-x-1">
        {path.map((_, index) => {
          const isVisible =
            index >= currentStartIndex &&
            index < currentStartIndex + itemsToShow;
          return (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                isVisible ? "bg-purple-500 scale-125" : "bg-gray-300"
              }`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ImprovedWavyPath;
