"use client"
import { motion } from "framer-motion"
import { FaBuilding, FaBook, FaFlask, FaHome, FaBus, FaFootballBall } from "react-icons/fa"

const InfrastructureSection = ({ infrastructure }) => {
  return (
    <motion.section
      className="mb-16"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.7 }}
    >
      <div className="text-center mb-12">
        <div className="w-16 h-16 bg-gray-700 rounded-xl flex items-center justify-center mx-auto mb-6">
          <FaBuilding className="text-white text-2xl" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Campus Infrastructure</h2>
        <div className="w-24 h-1 bg-gray-700 mx-auto"></div>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
          State-of-the-art facilities designed to provide an optimal learning environment for students.
        </p>
      </div>

      {infrastructure.infrastructure.map((infra, idx) => (
        <motion.div
          key={idx}
          className="bg-white rounded-xl shadow-lg p-8 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Basic Facilities */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <FaBuilding className="text-blue-600 mr-3" />
                Basic Facilities
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <FaBuilding className="text-white" />
                  </div>
                  <h4 className="font-semibold text-gray-900">Campus Area</h4>
                  <p className="text-2xl font-bold text-blue-600 mt-1">{infra.campusArea || "N/A"}</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <FaBuilding className="text-white" />
                  </div>
                  <h4 className="font-semibold text-gray-900">Classrooms</h4>
                  <p className="text-2xl font-bold text-blue-600 mt-1">{infra.numberOfClassrooms || "N/A"}</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <FaFlask className="text-white" />
                  </div>
                  <h4 className="font-semibold text-gray-900">Laboratories</h4>
                  <p className="text-2xl font-bold text-blue-600 mt-1">{infra.numberOfLabs || "N/A"}</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <FaBook className="text-white" />
                  </div>
                  <h4 className="font-semibold text-gray-900">Library</h4>
                  <p className="text-2xl font-bold text-blue-600 mt-1">{infra.library?.size || "Available"}</p>
                </div>
              </div>
            </div>

            {/* Additional Facilities */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <FaHome className="text-gray-700 mr-3" />
                Additional Facilities
              </h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FaHome className="text-gray-700 mr-3" />
                      <span className="font-semibold text-gray-900">Hostel Facility</span>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        infra.hostelAvailability ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {infra.hostelAvailability ? "Available" : "Not Available"}
                    </span>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <FaBus className="text-gray-700 mr-3" />
                    <span className="font-semibold text-gray-900">Transport Facility</span>
                  </div>
                  <div className="flex flex-wrap gap-2 ml-6">
                    {infra.transportFacility?.length > 0 ? (
                      infra.transportFacility.map((transport, i) => (
                        <span key={i} className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                          {transport}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-600 text-sm">Information not available</span>
                    )}
                  </div>
                </div>

                {infra.sportsFacilities?.length > 0 && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <FaFootballBall className="text-gray-700 mr-3" />
                      <span className="font-semibold text-gray-900">Sports Facilities</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 ml-6">
                      {infra.sportsFacilities.map((sport, i) => (
                        <span key={i} className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-full text-center">
                          {sport}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.section>
  )
}

export default InfrastructureSection
