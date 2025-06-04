"use client"
import { motion } from "framer-motion"
import { FaGraduationCap, FaRupeeSign, FaClock, FaBookOpen } from "react-icons/fa"

const CoursesSection = ({ courses }) => {
  const formatNumber = (num) => {
    return num ? num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "N/A"
  }

  return (
    <motion.section
      className="mb-16"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6 }}
    >
      <div className="text-center mb-12">
        <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-6">
          <FaGraduationCap className="text-white text-2xl" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Academic Programs</h2>
        <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
          Explore our comprehensive range of undergraduate and postgraduate programs designed to shape future leaders.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((courseBlock) =>
          courseBlock.courses?.map((course, index) => (
            <motion.div
              key={course._id}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{course.name}</h3>
                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                      {course.category}
                    </span>
                  </div>
                  <div className="text-right ml-4">
                    <div className="flex items-center text-2xl font-bold text-gray-900">
                      <FaRupeeSign className="text-lg mr-1" />
                      {formatNumber(course.annualFees)}
                    </div>
                    <p className="text-gray-600 text-sm">per year</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <FaClock className="text-blue-600 mr-2" />
                    <div>
                      <p className="text-xs text-gray-600 uppercase tracking-wide">Duration</p>
                      <p className="font-semibold text-gray-900">{course.duration} months</p>
                    </div>
                  </div>
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <FaBookOpen className="text-blue-600 mr-2" />
                    <div>
                      <p className="text-xs text-gray-600 uppercase tracking-wide">Type</p>
                      <p className="font-semibold text-gray-900">{course.category}</p>
                    </div>
                  </div>
                </div>

                {course.eligibility && (
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Eligibility</h4>
                    <p className="text-gray-600 text-sm bg-gray-50 p-3 rounded-lg">{course.eligibility}</p>
                  </div>
                )}

                {course.subCategory?.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Specializations</h4>
                    <div className="flex flex-wrap gap-2">
                      {course.subCategory.slice(0, 3).map((sub, i) => (
                        <span key={i} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                          {sub}
                        </span>
                      ))}
                      {course.subCategory.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                          +{course.subCategory.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )),
        )}
      </div>
    </motion.section>
  )
}

export default CoursesSection
