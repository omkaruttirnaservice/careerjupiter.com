import React from "react";

const CoursesFee = ({ coursesData }) => {
  console.log("inside course component:", coursesData[0]?.courses);

  return (
    <>
      <div className="max-w-7xl mx-auto p-4 md:p-6 mt-6">
        <div className="flex flex-col gap-6 p-4">
          {/* Course Fee Table */}
          <div className="w-full md:w-2/3">
            <h2 className="text-2xl font-bold text-indigo-700 mb-4">
              Course Fee Details
            </h2>
            <div>
              <table className="w-full text-sm md:text-base border-collapse">
                <thead className="bg-indigo-500 text-white">
                  <tr>
                    <th className="px-4 py-2 text-left">Course</th>
                    <th className="px-4 py-2 text-left">Duration</th>
                    <th className="px-4 py-2 text-left">Fees</th>
                    <th className="px-4 py-2 text-left">Eligibility</th>
                  </tr>
                </thead>
                <tbody>
                  {coursesData[0]?.courses.map((course, index) => (
                    <tr
                      key={index}
                      className="border-b hover:bg-indigo-50 transition-all"
                    >
                      <td className="px-4 py-2">{course.name}</td>
                      <td className="px-4 py-2">{course.duration} Years</td>
                      <td className="px-4 py-2">₹{course.annualFees}</td>
                      <td className="px-4 py-2">{course.eligibility}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Course Summary Card Grid */}
      {/* <div className="max-w-7xl mx-auto p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {coursesData[0]?.courses.map((course, index) => {
            return (
              <div
                key={index}
                className="bg-white border border-gray-200 shadow-md rounded-lg p-4 flex flex-col"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold text-indigo-700">
                    {course.name}
                  </h3>
                  <div className="text-gray-500 space-x-2">
                    <i className="fas fa-share-alt"></i>
                    <i className="far fa-heart"></i>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm text-gray-700 my-4">
                  <div>
                    <p className="font-medium">Fees:</p>
                    <p className="text-indigo-600">₹{course.annualFees}</p>
                  </div>
                  <div>
                    <p className="font-medium">Duration:</p>
                    <p>{course.duration}</p>
                  </div>
                  <div>
                    <p className="font-medium">Study Mode:</p>
                     <p>{courseData.studyMode}</p>
                  </div>
                </div>

                <div className="mb-4 text-sm">
                  <p className="font-medium text-gray-700">Exams Accepted:</p>
                  <p className="text-blue-600">{courseData.exams.join(", ")}</p>
                </div>

                <div className="mb-4 text-sm">
                  <p className="font-medium text-gray-700">Courses Offered:</p>
                  <p>{courseData.offeredCourses.join(", ")}</p>
                </div>

                <div className="mb-4 text-sm">
                  <p className="font-medium text-gray-700">Eligibility:</p>
                  <p className="text-xs text-gray-600">{course.eligibility}</p>
                </div>

                <button className="bg-indigo-600 cursor-pointer text-white w-full py-2 rounded-lg hover:bg-indigo-700 text-sm mt-auto">
                  Download Brochure
                </button>
              </div>
            );
          })}
        </div>
      </div> */}
    </>
  );
};

export default CoursesFee;
