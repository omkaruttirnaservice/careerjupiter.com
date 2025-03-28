"use client";
import { FiFilter, FiX } from "react-icons/fi";

const FilterSection = ({
  collegesData,
  showFilter,
  setShowFilter,
  activeFilters,
  handleRemoveFilter,
  handleClearAll,
  sortOrder,
  handleSortChange,
  collegeType,
  handleCollegeTypeChange,
  handleApplyFilters,
}) => {
  return (
    <>
      {collegesData?.length === 0 ? (
        <></>
      ) : (
        <div className="flex justify-between items-center">
          <button
            onClick={() => setShowFilter(!showFilter)}
            className="cursor-pointer flex items-center justify-center gap-2 bg-indigo-500 text-white rounded-lg px-4 py-2 hover:bg-indigo-600"
          >
            <FiFilter /> Filter
          </button>
        </div>
      )}

      {/* Active Filters Display */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2 items-center bg-gray-50 p-3 rounded-lg">
          <span className="text-sm font-medium">Active Filters:</span>
          {activeFilters.map((filter, index) => (
            <div
              key={index}
              className="flex items-center bg-white border rounded-full px-3 py-1 text-sm"
            >
              {filter.value}
              <button
                onClick={() => handleRemoveFilter(filter.id)}
                className="cursor-pointer ml-2 text-gray-500 hover:text-gray-700"
              >
                <FiX size={14} />
              </button>
            </div>
          ))}
          <button
            onClick={handleClearAll}
            className="cursor-pointer text-indigo-500 hover:text-indigo-700 text-sm ml-2 font-medium"
          >
            Clear All
          </button>
        </div>
      )}

      {/* Filter Popup */}
      {showFilter && (
        <div className="fixed top-0 left-0 w-full h-full bg-gradient-to-b from-black/50 to-black/50 backdrop-blur-xs flex justify-center items-center">
          <div className="bg-white rounded-2xl shadow-2xl w-[40%] max-w-4xl flex flex-col overflow-hidden transform transition-all duration-300 scale-105">
            {/* Header */}
            <div className="flex justify-between items-center p-5 border-b border-gray-200">
              <h3 className="text-2xl font-semibold text-gray-800">Filters</h3>
              <button
                onClick={() => setShowFilter(false)}
                className="p-2 rounded-full cursor-pointer bg-gray-200 hover:bg-red-500 hover:text-white transition"
              >
                <FiX size={24} />
              </button>
            </div>

            {/* Filter Content */}
            <div className="flex flex-col space-y-8 p-6 overflow-y-auto max-h-[70vh]">
              {/* Sort by Section */}
              <div>
                <h4 className="text-lg font-semibold text-gray-700 mb-3">
                  Sort by
                </h4>
                <div className="flex flex-wrap gap-4">
                  {["cutoffLowToHigh", "cutoffHighToLow"].map((sort, index) => (
                    <label
                      key={index}
                      className="flex items-center gap-3 cursor-pointer text-gray-600 hover:text-red-500 transition"
                    >
                      <input
                        type="radio"
                        name="sort"
                        className="w-5 h-5 text-red-500 accent-red-500"
                        checked={sortOrder === sort}
                        onChange={() => handleSortChange(sort)}
                      />
                      <span className="text-base">
                        {sort === "cutoffLowToHigh"
                          ? "Cutoff: Low to High"
                          : "Cutoff: High to Low"}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* College Type Section */}
              <div>
                <h4 className="text-lg font-semibold text-gray-700 mb-3">
                  College Type
                </h4>
                <div className="flex flex-wrap gap-4">
                  {["Government", "Private", "Deemed", "Autonomous"].map(
                    (type, index) => (
                      <label
                        key={index}
                        className="flex items-center gap-3 cursor-pointer text-gray-600 hover:text-red-500 transition"
                      >
                        <input
                          type="radio"
                          name="collegeType"
                          className="w-5 h-5 text-red-500 accent-red-500"
                          checked={collegeType === type}
                          onChange={() => handleCollegeTypeChange(type)}
                        />
                        <span className="text-base">{type}</span>
                      </label>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center p-4 border-t">
              <button
                onClick={handleClearAll}
                className="bg-red-600 text-white rounded-lg px-6 py-2 cursor-pointer"
              >
                Clear all
              </button>
              <button
                onClick={handleApplyFilters}
                className="bg-green-600 text-white rounded-lg px-6 py-2 cursor-pointer"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FilterSection;
