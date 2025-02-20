import { useState } from 'react';
import { motion } from 'framer-motion';

export default function VisualEducationRoadmap() {
  const [path, setPath] = useState([]);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const levelData = {
    '10th Pass': ['HSC', 'Diploma', 'ITI'],
    'HSC': ['Science', 'Commerce', 'Arts'],
    Diploma: ['Engineering Diploma', 'Polytechnic', 'Computer Diploma'],
    ITI: ['Electrician', 'Fitter', 'Plumber', 'Welder', 'Machinist', 'Turner', 'Computer Operator'],
    Science: ['Engineering', 'Medical', 'B.Sc'],
    Commerce: ['CA', 'CS', 'B.Com', 'MBA', 'Finance'],
    Arts: ['BA', 'Law', 'UPSC', 'Journalism'],
    'Engineering Diploma': ['Civil', 'Mechanical', 'IT', 'Electrical'],
  };

  const descriptions = {
    Engineering: '⚙️ B.Tech, B.E - Core Engineering Fields',
    Medical: '🩺 MBBS, BDS - Medical and Health Science',
    'B.Sc': '🔬 B.Sc in Physics, Chemistry, Maths',
    CA: '💼 Chartered Accountant',
    CS: '💼 Company Secretary',
    'B.Com': '📊 Bachelor of Commerce',
    MBA: '📈 Master of Business Administration',
    Finance: '🏦 Finance, Banking, Accounting',
    BA: '🎨 Sociology, History, Psychology',
    Law: '⚖️ Legal Field, Advocacy, Corporate Law',
    UPSC: '🏛️ Civil Services Examination',
    Journalism: '📰 Media, Reporting, News Industry',
    Civil: '🏗️ Construction, Structural Engineering',
    Mechanical: '⚙️ Machinery, Manufacturing',
    IT: '💻 Software, Hardware, Networking',
    Electrical: '⚡ Power, Electronics, Circuit Design',
  };

  const itiCareerOptions = [
    'Government Sector (Railways, PSU, Electricity Dept.)',
    'Private Sector (Factories, Industries)',
    'Self-Employment (Own Workshop, Repair Services)',
  ];

  const handleBreadcrumbClick = (level, value) => {
    const newPath = [...path.slice(0, level), value];
    setPath(newPath);

    // Update history for back/forward
    const newHistory = [...history.slice(0, historyIndex + 1), newPath];
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const resetPath = () => {
    setPath([]);
    setHistory([[]]);
    setHistoryIndex(0);
  };

  const handleBack = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setPath(history[historyIndex - 1]);
    }
  };

  const handleForward = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setPath(history[historyIndex + 1]);
    }
  };

  const breadcrumbTrail = [
    { label: '10th Pass', onClick: resetPath },
    ...path.map((step, index) => ({
      label: step,
      onClick: () => handleBreadcrumbClick(index, step),
    })),
  ];

  const currentLevelData =
    path.length === 0
      ? levelData['10th Pass']
      : levelData[path[path.length - 1]];

  const currentStep = path[path.length - 1];
  const isFinalStep = descriptions[currentStep] || path[0] === 'ITI';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex flex-col items-center p-8 font-sans">
    <h1 className="text-base sm:text-lg md:text-xl lg:text-3xl font-extrabold mb-12 text-gray-800 drop-shadow-lg animate-pulse">
      📚 10th Pass ➜ Future Roadmap 🚀
    </h1>

      {/* Breadcrumb & Arrows */}
      <div className="flex items-center space-x-4 mb-6 bg-white p-3 rounded-full shadow-md border border-purple-300 text-purple-800 font-medium">
        <button
          onClick={handleBack}
          disabled={historyIndex <= 0}
          className={`p-1 ${historyIndex <= 0 ? 'opacity-40 cursor-not-allowed' : 'hover:bg-purple-100 rounded-full'}`}
        >
          ⬅️
        </button>

        {breadcrumbTrail.map((item, index) => (
          <span key={index} className="flex items-center">
            <button
              className={`hover:underline ${
                index === breadcrumbTrail.length - 1
                  ? 'font-bold text-purple-900'
                  : ''
              }`}
              onClick={item.onClick}
            >
              {item.label}
            </button>
            {index < breadcrumbTrail.length - 1 && <span className="mx-1">➜</span>}
          </span>
        ))}

        <button
          onClick={handleForward}
          disabled={historyIndex >= history.length - 1}
          className={`p-1 ${historyIndex >= history.length - 1 ? 'opacity-40 cursor-not-allowed' : 'hover:bg-purple-100 rounded-full'}`}
        >
          ➡️
        </button>
      </div>

      <div className="bg-white bg-opacity-90 backdrop-blur-lg p-8 rounded-3xl shadow-xl w-full max-w-3xl border-t-4 border-purple-500">
        {isFinalStep ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center"
          >
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-purple-200 max-w-md text-center transition-transform transform hover:scale-105 hover:shadow-xl">
              <h3 className="text-xl font-bold text-purple-800 mb-2">
                {currentStep}
              </h3>
              {path[0] === 'ITI' ? (
                <ul className="list-disc pl-5 text-gray-700 space-y-2 text-left">
                  {itiCareerOptions.map((option, index) => (
                    <li key={index}>{option}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-700">{descriptions[currentStep]}</p>
              )}
            </div>
          </motion.div>
        ) : (
          <div className="flex flex-wrap gap-4 justify-center">
            {currentLevelData?.map((option) => (
              <motion.button
                key={option}
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-full shadow-md font-semibold"
                onClick={() => handleBreadcrumbClick(path.length, option)}
              >
                {option}
              </motion.button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
