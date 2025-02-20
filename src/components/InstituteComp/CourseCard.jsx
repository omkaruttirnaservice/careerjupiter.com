import { FaIndianRupeeSign } from "react-icons/fa6";

const CourseCard = ({ courses }) => {
  return (
    <div className="py-12 m-2 bg-gray-50 text-center">
      <h2 className="text-lg text-blue-500 font-semibold uppercase">Courses</h2>
      <h1 className="text-3xl font-bold text-gray-800 mt-2 mb-8">
        Popular Courses
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white shadow-lg overflow-hidden relative"
          >
            <div className="relative">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-52 object-cover"
              />
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                <button className=" hover:bg-transparent hover:cursor-pointer bg-blue-300 bg-opacity-10 border-2 border-white text-white px-4 py-2 rounded-full text-sm shadow-md backdrop-blur-md">
                  Join Now
                </button>
              </div>
            </div>
            <div className="p-4 bg-blue-50">
              <h3 className="text-xl font-bold text-gray-800 flex items-center justify-center gap-1">
                <FaIndianRupeeSign className="text-lg" />
                {course.price}
              </h3>
              <p className="text-yellow-500 flex justify-center mt-1">
                {"★".repeat(course.rating)} ({course.reviews})
              </p>
              <h4 className="text-lg font-semibold text-gray-700 mt-2">
                {course.title}
              </h4>
              <div className="flex justify-between text-gray-600 text-sm mt-4 border-t pt-3">
                <span>👤 {course.instructor}</span>
                <div className="w-[1px] h-[25px] bg-gray-600 mx-auto"></div>
                <span>⏳ {course.duration}</span>
                <div className="w-[1px] h-[25px] bg-gray-600 mx-auto"></div>
                <span>🎓 {course.students} Students</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseCard;
