const CourseList = ({ courses }) => {
    if (!courses || courses.length === 0) {
      // return <p className="text-center text-gray-600">No courses available.</p>;
    }
  
    return (
      <section className="mt-20 p-8 bg-gray-50 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Courses Available</h2>
        {courses.map((course) => (
          <div key={course._id} className="p-4 mb-4 border rounded-md bg-white shadow-md">
            <h3 className="text-xl font-semibold">{course.courseName}</h3>
            <p>Type: {course.courseType || "N/A"}</p>
            <p>Duration: {course.duration || "N/A"}</p>
            <p>Fee: ₹{course.feeStructure?.amount || "N/A"} ({course.feeStructure?.type || "N/A"})</p>
            <p>Scholarship: {course.scholarshipOrDiscounts || "N/A"}</p>
            <p>Study Material Provided: {course.studyMaterialProvided ? "Yes" : "No"}</p>
          </div>
        ))}
      </section>
    );
  };
  
  export default CourseList;
  