import React from 'react'
import { FaUniversity, FaBookOpen, FaTrophy, FaUserGraduate, FaClipboardCheck, FaBuilding, FaMedal } from "react-icons/fa";

const OfferedCourse = () => {
    const courses = ["BCA", "BBA", "BCS", "MBA", "MCA", "B.Tech", "M.Tech", "PhD"];

  return (
    
         <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow-md hover:shadow-lg transform transition duration-300 hover:scale-101">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                            <FaBookOpen className="text-green-600 text-xl" /> Offered Courses
                        </h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-2">
                            {courses.map((course, index) => (
                                <div key={index} className="p-2 bg-blue-100 rounded-lg text-center text-sm font-medium text-blue-700 hover:bg-blue-200 transition duration-300">
                                    {course}
                                </div>
                            ))}
                        </div>
                    </div>
      
    
  )
}

export default OfferedCourse
