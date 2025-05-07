import React from "react";

const CollegeCoursesTable = ({ coursesData }) => {
  if (!coursesData || coursesData.length === 0 || !coursesData[0]?.courses) {
    return (
      <p className="text-center text-xl text-red-400 font-semibold mt-8">
        No courses data available yet.
      </p>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 ">
      <div className="flex flex-col gap-6 p-2">
        <div className="w-full">
          <h2 className="text-2xl font-bold text-indigo-700 mb-4">
            Course Fee Details
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm md:text-base border-collapse min-w-max">
              <thead className="bg-indigo-500 text-white">
                <tr>
                  <th className="px-4 py-2 text-left whitespace-nowrap">Course Name</th>
                  
                  <th className="px-4 py-2 text-left whitespace-nowrap">Section Intake</th>
                </tr>
              </thead>
              <tbody>
                {coursesData[0]?.courses.map((course, index) => (
                  <tr
                    key={index}
                    className="border-b hover:bg-indigo-50 transition-all"
                  >
                    <td className="px-4 py-2 whitespace-nowrap">{course.name}</td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      {course.sanctionedIntake} 
                    </td>
                    
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollegeCoursesTable;
