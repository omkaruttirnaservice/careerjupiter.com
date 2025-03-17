import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchCourses } from "../../api"; // Import your API function

const CourseCard = ({ id }) => {
  const { data: courses, error, isLoading } = useQuery({
    queryKey: ["courses", id],
    queryFn: () => fetchCourses(id),
  });

  console.log("Courses Data:", courses); // Debugging

  // ✅ Completely hide the component if courses are missing or empty
  if (!courses || !Array.isArray(courses) || courses.length === 0) {
    return null; // ❌ Component will not render at all
  }

  return (
    <section className="mt-20 p-8 bg-gray-50 rounded-lg">
      <h2 className="text-2xl font-bold mb-8 text-center">Courses Available</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courses.map((course) => (
          <div
            key={course._id}
            className="p-6 border rounded-lg bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1"
          >
            <h3 className="text-xl font-semibold mb-2">{course.courseName}</h3>
            <p className="text-gray-600 mb-1">
              <span className="font-medium">Type:</span> {course.courseType}
            </p>
            <p className="text-gray-600 mb-1">
              <span className="font-medium">Duration:</span> {course.duration}
            </p>
            <p className="text-gray-600 mb-1">
              <span className="font-medium">Fee:</span> ₹{course.feeStructure?.amount} ({course.feeStructure?.type})
            </p>
            <p className="text-gray-600 mb-1">
              <span className="font-medium">Scholarship:</span> {course.scholarshipOrDiscounts || "N/A"}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Study Material Provided:</span> {course.studyMaterialProvided ? "Yes" : "No"}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CourseCard;
