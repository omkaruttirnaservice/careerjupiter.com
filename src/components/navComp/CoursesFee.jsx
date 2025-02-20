import React from "react";

const CoursesFee = () => {
  const courses = [
    { name: "B.Tech in Engineering Physics", duration: "4 Years", fees: "₹2,00,000" },
    { name: "B.Tech in Aerospace Engineering", duration: "4 Years", fees: "₹2,31,000" },
    { name: "B.Tech in Civil Engineering", duration: "4 Years", fees: "₹2,00,000" },
    { name: "B.Tech in Mechanical Engineering", duration: "4 Years", fees: "₹2,00,000" },
    { name: "B.Tech in Electrical Engineering", duration: "4 Years", fees: "₹2,00,000" },
  ];

  const courseData = {
    name: "B.Tech",
    fees: "2,00,000 - 2,31,000",
    duration: "4 Years",
    studyMode: "Regular",
    exams: ["JEE Main", "JEE Advanced"],
    offeredCourses: ["B.Tech in AI & Data Analytics", "B.Tech in Civil Engg."],
    eligibility:
      "To be eligible for admission to IIT Madras B.Tech programme, candidates must have passed Class 12 in Science stream (PCM) with a minimum of 60% marks and must have a valid rank in JEE Advanced.",
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 mt-6">
      <div className=" flex flex-col md:flex-row gap-6 p-4">
        {/* Course Fee Table */}
        <div className="w-full md:w-2/3">
          <h2 className="text-2xl font-bold text-indigo-700 mb-4">Course Fee Details</h2>
          <div className="">
            <table className="w-full text-sm md:text-base">
              <thead className="bg-indigo-500 text-white">
                <tr>
                  <th className="px-4 py-2 text-left">Course</th>
                  <th className="px-4 py-2 text-left">Duration</th>
                  <th className="px-4 py-2 text-left">Fees</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course, index) => (
                  <tr key={index} className="border-b hover:bg-indigo-50 transition-all">
                    <td className="px-4 py-2">{course.name}</td>
                    <td className="px-4 py-2">{course.duration}</td>
                    <td className="px-4 py-2">{course.fees}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Course Summary Card */}
        <div className="w-full md:w-1/3 bg-white border border-gray-200 shadow-md rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-indigo-700">{courseData.name}</h3>
            <div className="text-gray-500 space-x-2">
              <i className="fas fa-share-alt"></i>
              <i className="far fa-heart"></i>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm text-gray-700 mb-4">
            <div>
              <p className="font-medium">Fees:</p>
              <p className="text-indigo-600">₹{courseData.fees}</p>
            </div>
            <div>
              <p className="font-medium">Duration:</p>
              <p>{courseData.duration}</p>
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
            <p className="text-xs text-gray-600">{courseData.eligibility}</p>
          </div>

          <button className="bg-indigo-600 cursor-pointer text-white w-full py-2 rounded-lg hover:bg-indigo-700 text-sm">
            Download Brochure
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoursesFee;
