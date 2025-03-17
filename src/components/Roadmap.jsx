"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function EnhancedVisualEducationRoadmap() {
  const [path, setPath] = useState([])
  const [history, setHistory] = useState([[]])
  const [historyIndex, setHistoryIndex] = useState(0)

  const navigate = useNavigate()

  const levelData = {
    "10th Pass": ["HSC", "Diploma", "ITI"],
    HSC: ["Science", "Commerce", "Arts"],
    Diploma: ["Engineering Diploma", "Polytechnic", "Computer Diploma"],
    ITI: ["Electrician", "Fitter", "Plumber", "Welder", "Machinist", "Turner", "Computer Operator"],
    Science: ["Engineering", "Medical", "B.Sc"],
    Commerce: ["CA", "CS", "B.Com", "MBA", "Finance"],
    Arts: ["BA", "Law", "UPSC", "Journalism"],
    "Engineering Diploma": ["Civil", "Mechanical", "IT", "Electrical"],
    Polytechnic: ["Automobile_Engineering", "Computer_Science", "Electronics_Engineering"]
  }

  const descriptions = {
    Engineering: "⚙️ B.Tech, B.E - Core Engineering Fields.",
    Medical: "🩺 MBBS, BDS - Medical and Health Science",
    "B.Sc": "🔬 B.Sc in Physics, Chemistry, Maths",
    CA: "💼 Chartered Accountant",
    CS: "💼 Company Secretary",
    "B.Com": "📊 Bachelor of Commerce",
    MBA: "📈 Master of Business Administration",
    Finance: "🏦 Finance, Banking, Accounting",
    BA: "🎨 Sociology, History, Psychology",
    Law: "⚖️ Legal Field, Advocacy, Corporate Law",
    UPSC: "🏛️ Civil Services Examination",
    Journalism: "📰 Media, Reporting, News Industry",
    Civil: "🏗️ Construction, Structural Engineering",
    Mechanical: "⚙️ Machinery, Manufacturing",
    IT: "💻 Software, Hardware, Networking",
    Electrical: "⚡ Power, Electronics, Circuit Design",
    Automobile_Engineering: "🚗 Design, development, manufacturing of cars, trucks, motorcycles.",
    Computer_Science: "💻 Software development, programming, data structures, networking, AI.",
    Electronics_Engineering: "📡 Electronic circuits, devices, semiconductors, microprocessors, communication systems."
  }

  const itiCareerOptions = [
    "Government Sector (Railways, PSU, Electricity Dept.)",
    "Private Sector (Factories, Industries)",
    "Self-Employment (Own Workshop, Repair Services)"
  ]

  const handleClick = (option) => {
    const newPath = [...path, option]
    setPath(newPath)
    const newHistory = [...history.slice(0, historyIndex + 1), newPath]
    setHistory(newHistory)
    setHistoryIndex(newHistory.length - 1)
  }

  const resetPath = () => {
    setPath([])
    setHistory([[]])
    setHistoryIndex(0)
  }

  const handleBack = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1)
      setPath(history[historyIndex - 1])
    }
  }

  const handleForward = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1)
      setPath(history[historyIndex + 1])
    }
  }

  const handleNavigate = (destination) => {
    navigate(`/${destination}`)
  }

  const currentLevelData = path.length === 0 ? levelData["10th Pass"] : levelData[path[path.length - 1]]
  const currentStep = path[path.length - 1]
  const isFinalStep = descriptions[currentStep] || path[0] === "ITI"

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex flex-col items-center p-4 sm:p-8 font-sans">
      <h1 className="sm:text-4xl font-extrabold mb-8 text-gray-800 drop-shadow-lg animate-pulse text-center">
        📚 10th Pass ➜ Future Roadmap 🚀
      </h1>

      {/* Path Navigation */}
      <div className="flex flex-wrap items-center space-x-2 mb-6 bg-white p-3 rounded-full shadow-md border border-purple-300 text-purple-800 font-medium w-full max-w-3xl">
        <button onClick={handleBack} disabled={historyIndex <= 0} className={`p-2 rounded-full ${historyIndex <= 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-purple-100"}`}>
          ⬅️
        </button>

        <button onClick={resetPath} className="cursor-pointer hover:underline">10th Pass</button>

        {path.map((step, index) => (
          <span key={index} className="flex items-center">
            <span className="mx-1">➜</span>
            <button className={`hover:underline ${index === path.length - 1 ? "font-bold text-purple-900" : ""}`} onClick={() => setPath(path.slice(0, index + 1))}>
              {step}
            </button>
          </span>
        ))}

        <button onClick={handleForward} disabled={historyIndex >= history.length - 1} className={`p-2 rounded-full ${historyIndex >= history.length - 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-purple-100"}`}>
          ➡️
        </button>
      </div>

      {/* Icon Navigation */}
      <div className="w-180 flex flex-wrap justify-center sm:justify-end gap-3 mb-4">
  <button
    onClick={() => handleNavigate('institute')}
    className=" cursor-pointer bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-lg px-3 py-2 shadow-md hover:shadow-lg transform transition-transform duration-300 hover:-translate-y-1 flex items-center gap-1 text-xs sm:text-sm"
  >
    🏫 <span>Class</span>
  </button>

  <button
    onClick={() => handleNavigate('college')}
    className=" cursor-pointer bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg px-3 py-2 shadow-md hover:shadow-lg transform transition-transform duration-300 hover:-translate-y-1 flex items-center gap-1 text-xs sm:text-sm"
  >
    🏛️ <span>College</span>
  </button>

  <button
    onClick={() => handleNavigate('university')}
    className=" cursor-pointer bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg px-3 py-2 shadow-md hover:shadow-lg transform transition-transform duration-300 hover:-translate-y-1 flex items-center gap-1 text-xs sm:text-sm"
  >
    🎓 <span>University</span>
  </button>
</div>




      {/* Options or Description */}
      <div className="bg-white bg-opacity-90 backdrop-blur-lg p-6 sm:p-8 rounded-3xl shadow-xl w-full max-w-3xl border-t-4 border-purple-500">
        {isFinalStep ? (
          <div className="text-center">
            <h3 className="text-2xl font-bold text-purple-800 mb-4">{currentStep}</h3>
            {path[0] === "ITI" ? (
              <ul className="list-disc pl-5 text-gray-700">
                {itiCareerOptions.map((option, index) => (
                  <li key={index}>{option}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-700">{descriptions[currentStep]}</p>
            )}
          </div>
        ) : (
          <div className="flex flex-wrap gap-4 justify-center">
            {currentLevelData?.map((option) => (
              <button key={option} onClick={() => handleClick(option)} className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full shadow-md hover:scale-105">
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
