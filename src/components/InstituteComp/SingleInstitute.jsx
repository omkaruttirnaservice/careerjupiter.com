import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../../utils/constansts";
import { BACKEND_SERVER_IP } from "../../Constant/constantData";
import ImageGallery from "./ImageGallery";
import FacultyDetails from "./FacultyDetails";

const fetchInstitute = async (id) => {
  const response = await fetch(`${BASE_URL}/api/class/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch class details");
  }
  const result = await response.json();
  if (result.success && result.data) {
    return JSON.parse(result.data); // Parse the nested JSON string
  }
  throw new Error(result.errMsg || "Failed to fetch class details");
};

const fetchCourses = async (id) => {
  const response = await fetch(`${BASE_URL}/api/class/course/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch courses");
  }
  const result = await response.json();

  console.log("Raw API Response:", result); // Debugging

  return result.success && result.data ? JSON.parse(result.data) : []; // Ensure it's an array
};


const SingleInstitute = () => {
  const { id } = useParams();

  const { data: institute, error, isLoading } = useQuery({
    queryKey: ["institute", id],
    queryFn: () => fetchInstitute(id),
  });
  console.log("institute data :",institute)

  const { data: courses, error: coursesError, isLoading: coursesLoading } = useQuery({
    queryKey: ["courses", id],
    queryFn: () => fetchCourses(id),
  });

  console.log("Courses Data:", courses); // Debugging


  // if (isLoading || coursesLoading) {
  //   return <p className="text-center text-gray-600 mt-8">Loading class details...</p>;
  // }

  if (error) {
    return <p className="text-center text-red-600 mt-8">Error: {error.message}</p>;
  }

  // if (coursesError) {
  //   return <p className="text-center text-red-600 mt-8">Error loading courses: {coursesError.message}</p>;
  // }

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
              backgroundImage: `url(${BACKEND_SERVER_IP}${institute.class.image})`
            }}
             >
            {console.log(institute?.class?.image )}
            <div className="flex justify-center">
              <h1 className="mt-20 text-white text-4xl font-bold">
                {institute.class.className || "Class Name"}
              </h1>
            </div>
          </div>
          <div className="absolute w-[95%] sm:w-[90%] md:w-[80%] lg:w-[70%] left-1/2 -translate-x-1/2 bottom-[-50px] bg-white shadow-lg rounded-xl p-4 md:p-6 flex flex-col space-y-4 animate-fadeIn">
  {/* Title */}
  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 text-center">
    {institute.class.className}
  </h2>

  {/* Info Grid */}
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 text-gray-700">
    <div className="p-3 bg-gray-100 rounded-lg flex items-center space-x-2 text-sm sm:text-base">
      📍 <span className="font-semibold">Location:</span> 
      <span>{institute.class.address?.line1 || "N/A"}, {institute.class.address?.dist || "N/A"}</span>
    </div>
    <div className="p-3 bg-gray-100 rounded-lg flex items-center space-x-2 text-sm sm:text-base">
      🎓 <span className="font-semibold">Mode of Teaching:</span> 
      <span>{institute.class.modeOfTeaching || "N/A"}</span>
    </div>
    <div className="p-3 bg-gray-100 rounded-lg flex items-center space-x-2 text-sm sm:text-base">
      🗣️ <span className="font-semibold">Teaching Medium:</span> 
      <span>{institute.class.teachingMedium?.join(", ") || "N/A"}</span>
    </div>
    <div className="col-span-1 sm:col-span-2 p-3 bg-gray-100 rounded-lg flex items-center space-x-2 text-sm sm:text-base">
      📚 <span className="font-semibold">Courses Offered:</span> 
      <span>{institute.class.subjectsOrCourses?.join(", ") || "N/A"}</span>
    </div>
  </div>

  {/* Owner Info */}
  <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center text-gray-700 space-y-2 sm:space-y-0">
    <p className="text-sm sm:text-base">
      <span className="font-semibold">Owner / Institute:</span> {institute.class.ownerOrInstituteName || "N/A"}
    </p>
    <p className="text-sm sm:text-base">
      📞 <span className="font-semibold">Contact:</span> {institute.class.contactDetails || "N/A"}
      
    </p>
    <p className="text-sm sm:text-base">
      <span className="font-semibold">franchise or Independent:</span> {institute.class.franchiseOrIndependent || "N/A"}
      
    </p>
    <a
      href={institute.class.websiteURL || "#"}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-500 underline text-sm sm:text-base"
    >
      Visit Website
    </a>
  </div>
  <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center text-gray-700 space-y-2 sm:space-y-0">
    <p className="text-sm sm:text-base">
      <span className="font-semibold">Established Year:</span> {institute.class.yearEstablished || "N/A"}
    </p>
   
  </div>
</div>

        </div>
      </div>

  <section className="mt-20 p-4 bg-gray-50 rounded-lg">
  <h2 className="text-2xl font-bold mb-8 text-center">Courses Available</h2>
  {Array.isArray(courses) && courses.length > 0 ? (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {courses.map((course) => (
        <div
          key={course._id}
          className="p-6 border rounded-lg bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1"
        >
          <h3 className="text-xl font-semibold mb-2">{course.courseName}</h3>
          <p className="text-gray-600 mb-1"><span className="font-medium">Type:</span> {course.courseType}</p>
          <p className="text-gray-600 mb-1"><span className="font-medium">Duration:</span> {course.duration}</p>
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
  ) : (
    <p className="text-center text-gray-600">No courses available.</p>
  )}
</section>

<ImageGallery/>
<FacultyDetails/>
    </>
  );
};

export default SingleInstitute;
