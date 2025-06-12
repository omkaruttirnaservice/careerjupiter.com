
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  FaGraduationCap,
  FaBriefcase,
  FaChevronRight,
  FaHome,
  FaRedo,
  FaLightbulb,
  FaSearch,
  FaLayerGroup,
  FaRoute,
  FaStar,
  FaRocket,
  FaMedal,
  FaUserTie,
  FaCode,
  FaFlask,
  FaPalette,
  FaChartLine,
  FaUniversity,
  FaHeartbeat,
  FaArrowLeft,
  FaSchool,
  FaBrain,
} from "react-icons/fa"
import { motion } from "framer-motion"
import { useQuery } from "@tanstack/react-query"
import SearchRoadmap from "./SearchRoadmap"
import { getSubType } from "./Api"
import { useNavigate } from "react-router-dom"
import TopOptions from "./topOption"
import ImprovedWavyPath from "./ImprovedWavyPath"
import { CardSkeleton, BreadcrumbSkeleton } from "./skeleton"
import { setPath, setTypeId, setSubTypeOptions, resetRoadmap, checkExpiry } from "../../store-redux/roadmapSlice"
// import { useSelector, useDispatch } from "react-redux";


// Expanded color palette
const COLORS = {
  primary: "#a5b4fc",
  secondary: "#c4b5fd",
  accent: "#f9a8d4",
  success: "#6ee7b7",
  warning: "#fde68a",
  danger: "#fca5a5",
  info: "#93c5fd",
  dark: "#475569",
  light: "#f1f5f9",
  purple: "#d8b4fe",
  pink: "#fbcfe8",
  indigo: "#c7d2fe",
  blue: "#bfdbfe",
  teal: "#99f6e4",
  emerald: "#a7f3d0",
  amber: "#fde68a",
}

// Icon mapping for different career types
const CAREER_ICONS = {
  engineering: <FaCode className="text-blue-500" />,
  medical: <FaHeartbeat className="text-red-500" />,
  design: <FaPalette className="text-purple-500" />,
  business: <FaChartLine className="text-emerald-500" />,
  science: <FaFlask className="text-amber-500" />,
  education: <FaUniversity className="text-indigo-500" />,
  management: <FaUserTie className="text-teal-500" />,
  default: <FaBriefcase className="text-gray-500" />,
}

const getCareerIcon = (type) => {
  if (!type) return CAREER_ICONS.default

  const lowerType = type.toLowerCase()
  if (lowerType.includes("engineer")) return CAREER_ICONS.engineering
  if (lowerType.includes("medical") || lowerType.includes("doctor") || lowerType.includes("nurse"))
    return CAREER_ICONS.medical
  if (lowerType.includes("design")) return CAREER_ICONS.design
  if (lowerType.includes("business") || lowerType.includes("manager")) return CAREER_ICONS.business
  if (lowerType.includes("science") || lowerType.includes("research")) return CAREER_ICONS.science
  if (lowerType.includes("teacher") || lowerType.includes("professor") || lowerType.includes("education"))
    return CAREER_ICONS.education
  if (lowerType.includes("executive") || lowerType.includes("director") || lowerType.includes("ceo"))
    return CAREER_ICONS.management

  return CAREER_ICONS.default
}

// Back button component
const BackButton = ({ onClick }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="flex items-center justify-center gap-2 bg-white text-indigo-600 px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all border-2 border-indigo-200 mx-auto mt-8"
    >
      <FaArrowLeft className="text-indigo-500" />
      <span className="font-medium">Go Back One Step</span>
    </motion.button>
  )
}

// Updated RoadmapNode with three icons for end paths
const RoadmapNode = ({ node, onClick, navigate }) => {
  const isJob = node.type?.toLowerCase().includes("job")
  const careerIcon = getCareerIcon(node.type)
  const colors = [
    "from-purple-300 to-pink-300",
    "from-blue-300 to-teal-300",
    "from-amber-300 to-orange-300",
    "from-emerald-300 to-cyan-300",
    "from-indigo-300 to-violet-300",
    "from-rose-300 to-red-300",
  ]
  const randomColor = colors[Math.floor(Math.random() * colors.length)]
  const isLast = !node.roadmap

  const handleIconClick = (e, type) => {
    e.stopPropagation()
    const queryParams = new URLSearchParams({ roadmap: node._id })

    switch (type) {
      case "college":
        navigate(`/college?${queryParams.toString()}`)
        break
      case "class":
        navigate(`/class?${queryParams.toString()}`)
        break
      case "iq-test":
        navigate(`/profile/test?${queryParams.toString()}`)
        break
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
      className={`relative p-4 rounded-2xl cursor-pointer transition-all duration-300 overflow-hidden ${
        isLast ? "ring-2 ring-white shadow-xl" : "shadow-lg hover:shadow-xl"
      } bg-gradient-to-br ${randomColor}`}
    >
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-16 h-16 rounded-full bg-white/10 -mr-4 -mt-4"></div>
      <div className="absolute bottom-0 left-0 w-12 h-12 rounded-full bg-white/10 -ml-4 -mb-4"></div>

      <div className="relative z-10 flex items-center space-x-3">
        <div className="p-3 rounded-xl bg-white/20 backdrop-blur-sm text-white">{careerIcon}</div>
        <div className="flex-1">
          <h3 className="font-bold text-gray-800">{node.type}</h3>
          {node.roadmap ? (
            <div
              className="mt-2 flex items-center text-sm font-semibold text-red-500 drop-shadow-[0_0_16px_#dc2626] animate-pulse"
              style={{
                animationDuration: "700ms",
                animationTimingFunction: "linear",
              }}
            >
              <FaLightbulb
                className="mr-2 text-red-600 drop-shadow-[0_0_20px_#dc2626] animate-pulse"
                style={{
                  animationDuration: "700ms",
                  animationTimingFunction: "linear",
                }}
              />
              <span
                className="text-black drop-shadow-[0_0_10px_#dc2626] tracking-wide uppercase animate-pulse"
                style={{
                  animationDuration: "700ms",
                  animationTimingFunction: "linear",
                }}
              >
                {node.roadmap.sub_type?.length || 0} paths available
              </span>
            </div>
          ) : (
            // Three icons for end paths
            <div className="mt-3 flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => handleIconClick(e, "college")}
                className="p-2 bg-indigo-500 hover:bg-indigo-600 rounded-full text-white shadow-md transition-colors"
                title="Search Best College"
              >
                <FaUniversity className="text-sm" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => handleIconClick(e, "class")}
                className="p-2 bg-purple-500 hover:bg-purple-600 rounded-full text-white shadow-md transition-colors"
                title="Search Best Classes"
              >
                <FaSchool className="text-sm" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => handleIconClick(e, "iq-test")}
                className="p-2 bg-emerald-500 hover:bg-emerald-600 rounded-full text-white shadow-md transition-colors"
                title="Take IQ Test"
              >
                <FaBrain className="text-sm" />
              </motion.button>
            </div>
          )}
        </div>
      </div>

      {!isLast && (
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
            className="text-white/80"
          >
            <FaChevronRight />
          </motion.div>
        </div>
      )}

      {isLast && (
        <div className="absolute top-2 right-2 text-yellow-300">
          <FaStar />
        </div>
      )}
    </motion.div>
  )
}

const PathBreadcrumb = ({ item, index, isActive, onClick }) => {
  const colors = [
    "bg-indigo-500 text-white",
    "bg-purple-500 text-white",
    "bg-pink-500 text-white",
    "bg-blue-500 text-white",
    "bg-teal-500 text-white",
    "bg-emerald-500 text-white",
    "bg-amber-500 text-white",
  ]
  const colorClass = colors[index % colors.length] || colors[0]

  return (
    <motion.div whileHover={{ scale: 1.05 }} className="flex items-center">
      <button
        onClick={onClick}
        className={`flex items-center px-4 py-2 rounded-full ${
          isActive
            ? "ring-2 ring-white ring-offset-2 shadow-lg " + colorClass
            : colorClass + " opacity-80 hover:opacity-100"
        }`}
      >
        {index === 0 && <FaHome className="mr-2" />}
        <span>{item.name}</span>
        {isActive && <FaMedal className="ml-2" />}
      </button>
      {!isActive && <FaChevronRight className="mx-2 text-gray-400" />}
    </motion.div>
  )
}

function Roadmap() {
  const dispatch = useDispatch()
  const { path, typeId, subTypeOptions } = useSelector((state) => state.roadmap || {});
  const [showSearchPopup, setShowSearchPopup] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const { data: subTypes, isLoading: subTypesLoading } = useQuery({
    queryKey: ["subType", typeId],
    queryFn: () => getSubType(typeId),
    enabled: !!typeId,
  })

  useEffect(() => {
    // Check for expired data on component mount
    dispatch(checkExpiry())
  }, [dispatch])

  useEffect(() => {
    if (subTypes?.data?.data) {
      dispatch(setSubTypeOptions(subTypes.data.data))
      setIsLoading(false)
    }
  }, [subTypes, dispatch])

  useEffect(() => {
    const visited = localStorage.getItem("visitedRoadmap")
    if (!visited && path.length === 0) {
      setTimeout(() => {
        setShowSearchPopup(true)
      }, 1000)
      localStorage.setItem("visitedRoadmap", "true")
    }
  }, [path.length])

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      const confirmationMessage = "Are you sure you want to exit the career map?"
      e.returnValue = confirmationMessage
      return confirmationMessage
    }

    window.addEventListener("beforeunload", handleBeforeUnload)

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload)
    }
  }, [])

  const handleSearchSelect = (selectedItem) => {
    dispatch(setPath([selectedItem]))
    dispatch(setTypeId(selectedItem.type_id))
    setIsLoading(true)
  }

  const resetPath = () => {
    dispatch(resetRoadmap())
    setShowSearchPopup(true)
  }

  const navigateTo = (index) => {
    const selectedItem = path[index]
    const newPath = path.slice(0, index + 1)
    dispatch(setPath(newPath))
    dispatch(setTypeId(selectedItem.type_id))
    dispatch(setSubTypeOptions([]))
    setIsLoading(true)
  }

  const fetchNextSubTypes = (option) => {
    if (option.roadmap?.type?._id) {
      dispatch(setTypeId(option.roadmap.type._id))
      setIsLoading(true)
    }
  }

  const handleBackStep = () => {
    if (path.length > 1) {
      const newPath = path.slice(0, path.length - 1)
      dispatch(setPath(newPath))
      dispatch(setTypeId(newPath[newPath.length - 1].type_id))
      setIsLoading(true)
    }
  }

  const handleWaveStepClick = (stepIndex) => {
    navigateTo(stepIndex)
  }

  const handleSelect = (option) => {
    if (!option.roadmap) {
      return
    }

    const nextType = option.roadmap.type?.type || option.type
    const nextId = option.roadmap.type?._id || option.type._id

    dispatch(setPath([...path, { name: nextType, type_id: nextId }]))
    dispatch(setSubTypeOptions(option.roadmap.sub_type || []))
    fetchNextSubTypes(option)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {showSearchPopup && (
        <SearchRoadmap
          onClose={() => setShowSearchPopup(false)}
          onSelect={handleSearchSelect}
          setTypeId={(id) => dispatch(setTypeId(id))}
        />
      )}

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.header initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 text-center">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              duration: 3,
            }}
            className="inline-flex items-center justify-center p-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full mb-4 shadow-lg"
          >
            <FaRoute className="text-white text-3xl" />
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-3 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-pink-500">
            Career Path
          </h1>
        </motion.header>

        {/* Controls */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowSearchPopup(true)}
            className="flex items-center gap-2 bg-white text-indigo-600 px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all border-2 border-indigo-200"
          >
            <FaSearch className="text-indigo-500" />
            <span className="font-medium">Search Career Path</span>
          </motion.button>

          {path.length > 0 && (
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={resetPath}
              className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all"
            >
              <FaRedo />
              <span className="font-medium">Start New Journey</span>
            </motion.button>
          )}
        </div>

        {/* Improved Wavy Path Visualization */}
        {path.length > 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4 flex items-center justify-center">
              <FaLayerGroup className="mr-3 text-indigo-500" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-pink-500">
                Your Career Journey
              </span>
            </h2>
            <ImprovedWavyPath path={path} onStepClick={handleWaveStepClick} />
          </motion.div>
        )}

        {/* Breadcrumb Navigation */}
        {/* {path.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-4 sm:mb-8 bg-white/80 backdrop-blur-sm p-2 sm:p-4 rounded-xl sm:rounded-2xl shadow-sm"
          >
            {isLoading ? (
              <BreadcrumbSkeleton />
            ) : (
              <div className="custom-scrollbar overflow-x-auto whitespace-nowrap pb-2 px-1 sm:px-2 flex items-center gap-2 text-xs sm:text-sm">
                <PathBreadcrumb item={{ name: "Start" }} index={-1} onClick={resetPath} isActive={false} />
                {path.map((item, index) => (
                  <PathBreadcrumb
                    key={index}
                    item={item}
                    index={index}
                    onClick={() => navigateTo(index)}
                    isActive={index === path.length - 1}
                  />
                ))}
              </div>
            )}
          </motion.div>
        )} */}

        {/* Options Section */}
        <motion.section layout className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6 flex items-center justify-center">
            {path.length === 0 ? (
              <>
                <FaGraduationCap className="mr-3 text-indigo-500" />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-pink-500">
                  Begin Your Professional Adventure
                </span>
              </>
            ) : (
              <>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-pink-500">
                  Next Steps After {path[path.length - 1]?.name}
                </span>
              </>
            )}
          </h2>

          {isLoading || subTypesLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, idx) => (
                <CardSkeleton key={idx} />
              ))}
            </div>
          ) : subTypeOptions.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {subTypeOptions.map((option, idx) => (
                  <RoadmapNode
                    key={option._id}
                    node={option}
                    onClick={() => handleSelect(option)}
                    navigate={navigate}
                  />
                ))}
              </div>

              {path.length > 1 && <BackButton onClick={handleBackStep} />}
            </>
          ) : path.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl p-8 text-center shadow-xl max-w-2xl mx-auto border-2 border-indigo-100"
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Start Exploring Career Paths</h3>
              <p className="text-gray-600 mb-6 text-lg">
                Discover your ideal career trajectory with our interactive roadmap explorer
              </p>
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowSearchPopup(true)}
                className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all text-lg font-medium"
              >
                Begin Your Journey
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-2xl p-8 text-center shadow-xl max-w-2xl mx-auto border-2 border-green-100"
            >
              <div className="inline-flex p-4 bg-gradient-to-r from-green-100 to-teal-100 rounded-full mb-4 shadow-md">
                <FaRocket className="text-green-600 text-3xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Destination Achieved!</h3>
              <p className="text-gray-600 mb-6 text-lg">
                You've reached {path[path.length - 1]?.name}. This could be your dream career destination!
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={resetPath}
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all font-medium"
                >
                  Explore New Path
                </motion.button>
                {path.length > 1 && (
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigateTo(path.length - 2)}
                    className="bg-white text-indigo-600 px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all font-medium border-2 border-indigo-200"
                  >
                    Go Back One Step
                  </motion.button>
                )}
              </div>
            </motion.div>
          )}
        </motion.section>

        <TopOptions navigate={navigate} />

        {/* Info Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-2xl sm:rounded-3xl p-4 sm:p-8 text-white shadow-2xl"
        >
          <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center justify-center text-center">
            <FaLightbulb className="mr-2 sm:mr-3 text-yellow-300" />
            How to Navigate Your Career Journey
          </h3>

          <div className="flex flex-col md:flex-row gap-6 sm:gap-8">
            <div className="flex-1">
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center bg-white/20 rounded-full p-2 mr-3 sm:mr-4">
                    <FaSearch className="text-white text-base sm:text-lg" />
                  </span>
                  <span className="text-sm sm:text-lg">Search for specific careers or browse our suggestions</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center bg-white/20 rounded-full p-2 mr-3 sm:mr-4">
                    <FaChevronRight className="text-white text-base sm:text-lg" />
                  </span>
                  <span className="text-sm sm:text-lg">Click on any career node to explore subsequent options</span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col md:flex-1">
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center bg-white/20 rounded-full p-2 mr-3 sm:mr-4">
                    <FaHome className="text-white text-base sm:text-lg" />
                  </span>
                  <span className="text-sm sm:text-lg">Use the breadcrumbs to navigate back to previous steps</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center bg-white/20 rounded-full p-2 mr-3 sm:mr-4">
                    <FaRedo className="text-white text-base sm:text-lg" />
                  </span>
                  <span className="text-sm sm:text-lg">
                    Start over anytime to explore different career trajectories
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .custom-scrollbar::-webkit-scrollbar {
          height: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}</style>
    </div>
  )
}

export default Roadmap

