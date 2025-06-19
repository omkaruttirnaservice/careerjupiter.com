"use client"
import { motion } from "framer-motion"
import { FaBriefcase, FaRupeeSign, FaChartLine, FaUsers, FaHandshake, FaGlobe } from "react-icons/fa"

const PlacementSection = ({ placements }) => {
  const formatNumber = (num) => {
    return num ? num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "N/A"
  }

  return (
    <motion.section
      className="mb-16"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.8 }}
    >
      <div className="text-center mb-12">
        <div className="w-16 h-16 bg-gray-700 rounded-xl flex items-center justify-center mx-auto mb-6">
          <FaBriefcase className="text-white text-2xl" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Placement Statistics</h2>
        <div className="w-24 h-1 bg-gray-700 mx-auto"></div>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
          Exceptional placement records with top companies recruiting our graduates year after year.
        </p>
      </div>

      {placements.map((placementBlock, blockIdx) =>
        placementBlock.placement?.map((placement, idx) => (
          <motion.div
            key={`${blockIdx}-${idx}`}
            className="bg-white rounded-xl shadow-lg p-8 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-blue-50 p-6 rounded-xl text-center">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <FaRupeeSign className="text-white text-xl" />
                </div>
                <p className="text-sm text-gray-600 uppercase tracking-wide mb-1">Highest Package</p>
                <p className="text-2xl font-bold text-gray-900">₹{formatNumber(placement.highestPackage)}</p>
                <p className="text-blue-600 font-medium">LPA</p>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl text-center">
                <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <FaChartLine className="text-white text-xl" />
                </div>
                <p className="text-sm text-gray-600 uppercase tracking-wide mb-1">Average Package</p>
                <p className="text-2xl font-bold text-gray-900">
                  ₹{placement.averagePackage ? formatNumber(placement.averagePackage) : "N/A"}
                </p>
                <p className="text-gray-700 font-medium">LPA</p>
              </div>

              <div className="bg-blue-50 p-6 rounded-xl text-center">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <FaUsers className="text-white text-xl" />
                </div>
                <p className="text-sm text-gray-600 uppercase tracking-wide mb-1">Placement Rate</p>
                <p className="text-2xl font-bold text-gray-900">{placement.placementPercentage}%</p>
                <p className="text-blue-600 font-medium">Success Rate</p>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl text-center">
                <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <FaHandshake className="text-white text-xl" />
                </div>
                <p className="text-sm text-gray-600 uppercase tracking-wide mb-1">Students Placed</p>
                <p className="text-2xl font-bold text-gray-900">{formatNumber(placement.noOfStudents)}</p>
                <p className="text-gray-700 font-medium">Total</p>
              </div>
            </div>

            {/* Opportunities and Recruiters */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Opportunities */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <FaGlobe className="text-blue-600 mr-3" />
                  Career Opportunities
                </h3>
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-gray-900">Internship Opportunities</span>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          placement.internshipOpportunities ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {placement.internshipOpportunities ? "Available" : "Not Available"}
                      </span>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-gray-900">International Placements</span>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          placement.internationalPlacements ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {placement.internationalPlacements ? "Available" : "Not Available"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Top Recruiters */}
              {placement.topRecruiters && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <FaHandshake className="text-gray-700 mr-3" />
                    Top Recruiters
                  </h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="grid grid-cols-2 gap-3">
                      {placement.topRecruiters
                        .split(",")
                        .slice(0, 8)
                        .map((recruiter, i) => (
                          <div key={i} className="bg-white p-3 rounded-lg shadow-sm text-center border">
                            <span className="font-medium text-gray-900">{recruiter.trim()}</span>
                          </div>
                        ))}
                    </div>
                    {placement.topRecruiters.split(",").length > 8 && (
                      <p className="text-center text-gray-600 mt-3">
                        +{placement.topRecruiters.split(",").length - 8} more companies
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )),
      )}
    </motion.section>
  )
}

export default PlacementSection
