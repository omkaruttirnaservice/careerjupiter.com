const CoursesFee = () => {
    const courses = [
      {
        name: "B.Tech in Engineering Physics",
        duration: "4 Years",
        fees: "₹2,00,000",
      },
      {
        name: "B.Tech in Aerospace Engineering",
        duration: "4 Years",
        fees: "₹2,31,000",
      },
      {
        name: "B.Tech in Civil Engineering",
        duration: "4 Years",
        fees: "₹2,00,000",
      },
      {
        name: "B.Tech in Mechanical Engineering",
        duration: "4 Years",
        fees: "₹2,00,000",
      },
      {
        name: "B.Tech in Electrical Engineering",
        duration: "4 Years",
        fees: "₹2,00,000",
      },
    ];

    const courseData = {
      name: "B.Tech",
      fees: "2,00,000 - 2,31,000",
      duration: "4 Years",
      studyMode: "Regular",
      exams: ["JEE Main", "JEE Advanced"],
      offeredCourses: [
        "B.Tech in AI & Data Analytics",
        "B.Tech in Civil Engg.",
      ],
      eligibility:
        "To be eligible for admission to IIT Madras B.Tech programme, candidates must have passed Class 12 in Science stream (PCM) with a minimum of 60% marks and must have a valid rank in JEE Advanced.",
    };

  return (
    <>
      <div className="max-w-7xl mx-auto p-4 mt-15">
        <div className="bg-white shadow-lg rounded-lg md:flex-row relative">
          <div className="p-4">
            <div className="max-w-6xl mx-auto rounded-lg overflow-hidden">
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">Course Details</div>
                <div className="overflow-x-auto">
                  <table className="w-full table-auto">
                    <thead>
                      <tr className="bg-gray-200">
                        <th className="px-4 py-2">Course</th>
                        <th className="px-4 py-2">Duration</th>
                        <th className="px-4 py-2">Fees</th>
                      </tr>
                    </thead>
                    <tbody>
                      {courses.map((course, index) => (
                        <tr key={index} className="border-b">
                          <td className="px-4 py-2">{course.name}</td>
                          <td className="px-4 py-2">{course.duration}</td>
                          <td className="px-4 py-2">{course.fees}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-md bg-white shadow-lg rounded-2xl m-5 p-5 border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-blue-700">
                {courseData.name}
              </h2>
              <div className="flex space-x-2 text-gray-500">
                <i className="fas fa-share-alt"></i>
                <i className="far fa-heart"></i>
              </div>
            </div>

            <div className="flex flex-wrap justify-between text-sm text-gray-700 border-b pb-3 mb-3">
              <div>
                <p className="font-semibold">₹{courseData.fees}</p>
                <p className="text-xs text-gray-500">Fees</p>
              </div>
              <div>
                <p className="font-semibold">{courseData.duration}</p>
                <p className="text-xs text-gray-500">Duration</p>
              </div>
              <div>
                <p className="font-semibold">{courseData.studyMode}</p>
                <p className="text-xs text-gray-500">Study Mode</p>
              </div>
            </div>

            <div className="text-sm mb-3">
              <p className="font-semibold text-gray-700">Exams Accepted:</p>
              <p className="text-blue-600">
                {courseData.exams.map((exam, index) => (
                  <span key={index} className="mr-2">
                    {exam}
                  </span>
                ))}
              </p>
            </div>

            <div className="text-sm mb-3">
              <div className="flex justify-between">
                <p className="font-semibold text-gray-700">
                  courseDatas Offered
                </p>
              </div>
              <p className="text-gray-600">
                {courseData.offeredCourses.join(", ")}
              </p>
            </div>

            <div className="text-sm mb-4">
              <p className="font-semibold text-gray-700">Eligibility</p>
              <p className="text-gray-500 text-xs">{courseData.eligibility}</p>
            </div>

            <div className="flex justify-between">
              <button className="border border-blue-600 text-blue-600 px-3 py-2 rounded-lg text-sm w-1/2 mr-2">
                Download Brochure
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CoursesFee;
