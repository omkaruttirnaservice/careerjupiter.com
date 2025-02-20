import React from 'react'
import { FaUniversity, FaBookOpen, FaTrophy, FaUserGraduate, FaClipboardCheck, FaBuilding, FaMedal } from "react-icons/fa";


const UniversityInformation = () => {
  return (
    <>
        <div className="p-4 bg-gray-50 rounded-lg shadow-md transform transition duration-300 hover:scale-101 hover:shadow-lg">
                                    <div className="flex items-center space-x-3 mb-2">
                                        <FaUniversity className="text-blue-600 text-xl" />
                                        <h3 className="text-lg font-semibold">History & Foundation</h3>
                                    </div>
                                    <p className="text-gray-700 text-sm">
                                        Established in 1965, the university has been a center of excellence in higher education, offering diverse programs and fostering innovation.
                                    </p>
                                </div>
        
                                <div className="p-4 bg-gray-50 rounded-lg shadow-md transform transition duration-300 hover:scale-101 hover:shadow-lg">
                                    <div className="flex items-center space-x-3 mb-2">
                                        <FaBookOpen className="text-green-600 text-xl" />
                                        <h3 className="text-lg font-semibold">Programs & Research</h3>
                                    </div>
                                    <p className="text-gray-700 text-sm">
                                        The university offers over 150 undergraduate and postgraduate programs with cutting-edge research facilities and globally recognized faculty.
                                    </p>
                                </div>
                            
                                </>
    
  )
}

export default UniversityInformation
