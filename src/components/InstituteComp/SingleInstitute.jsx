import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import CourseMultiCard from "./CourseMultiCard";

const fetchInstitute = async (id) => {
  const response = await fetch(`http://192.168.1.5:5000/api/class/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch class details");
  }
  const result = await response.json();
  if (result.success && result.data) {
    return JSON.parse(result.data); // Parse the nested JSON string
  }
  throw new Error(result.errMsg || "Failed to fetch class details");
};

const SingleInstitute = () => {
  const { id } = useParams();

  const { data, error, isLoading } = useQuery({
    queryKey: ["institute", id],
    queryFn: () => fetchInstitute(id),
  });

  if (isLoading) {
    return <p className="text-center text-gray-600 mt-8">Loading class details...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600 mt-8">Error: {error.message}</p>;
  }

  const { class: institute, courses } = data || {};

  if (!institute) {
    return <p className="text-center text-gray-600 mt-8">No class details found.</p>;
  }

  return (
    <>
      <div className="flex items-center justify-center bg-gray-100 relative">
        <div className="w-full relative">
          <div
            className="w-full h-[70vh] bg-cover bg-center relative"
            style={{
              backgroundImage: `url(${institute.image || 'https://via.placeholder.com/600'})`,
            }}
          >
            <div className="flex justify-center">
              <h1 className="mt-20 text-white text-4xl font-bold">
                {institute.className || "Class Name"}
              </h1>
            </div>
          </div>

          <div className="absolute w-[95%] md:w-[85%] lg:w-[75%] xl:w-[70%] left-1/2 -translate-x-1/2 bottom-[-70px] bg-white shadow-lg rounded-lg p-8 flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-10">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900">
                {institute.className}
              </h2>
              <p className="text-sm text-gray-600">Type: {institute.typeOfClass || "N/A"}</p>
              <p className="text-sm text-gray-600">Owner: {institute.ownerOrInstituteName || "N/A"}</p>
              <p className="text-sm text-gray-600">Established: {institute.yearEstablished || "N/A"}</p>
              <p className="text-gray-700 text-sm mt-2">
                Contact: {institute.contactDetails || "N/A"}
              </p>
              <a
                href={institute.websiteURL || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline text-sm mt-2"
              >
                Visit Website
              </a>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-700">
              <div className="p-3 bg-gray-100 rounded-md">
                <span className="font-semibold">📍 Location:</span>{" "}
                {institute.address?.line1 || "N/A"}, {institute.address?.dist || "N/A"}
              </div>
              <div className="p-3 bg-gray-100 rounded-md">
                <span className="font-semibold">🎓 Mode of Teaching:</span>{" "}
                {institute.modeOfTeaching || "N/A"}
              </div>
              <div className="p-3 bg-gray-100 rounded-md">
                <span className="font-semibold">🗣️ Teaching Medium:</span>{" "}
                {institute.teachingMedium?.join(", ") || "N/A"}
              </div>
              <div className="col-span-2 p-3 bg-gray-100 rounded-md">
                <span className="font-semibold">📚 Courses Offered:</span>{" "}
                {institute.subjectsOrCourses?.join(", ") || "N/A"}
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="mt-20 p-8 bg-gray-50 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Courses Available</h2>
        {courses && courses.length > 0 ? (
          courses.map((course) => (
            <div key={course._id} className="p-4 mb-4 border rounded-md bg-white">
              <h3 className="text-xl font-semibold">{course.courseName}</h3>
              <p>Type: {course.courseType}</p>
              <p>Duration: {course.duration}</p>
              <p>Fee: ₹{course.feeStructure?.amount} ({course.feeStructure?.type})</p>
              <p>Scholarship: {course.scholarshipOrDiscounts || "N/A"}</p>
              <p>Study Material Provided: {course.studyMaterialProvided ? "Yes" : "No"}</p>
            </div>
          ))
        ) : (
          <p>No courses available.</p>
        )}
      </section>

      <CourseMultiCard />

      
    </>
  );
};

export default SingleInstitute;
