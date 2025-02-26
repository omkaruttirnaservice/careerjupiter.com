import { useParams } from "react-router-dom";
import { useEffect } from "react";
import CourseMultiCard from "./CourseMultiCard";

const SingleInstitute = ()=>{
    const {id} = useParams();

    const institutes = [
      {
        id: 1, 
        image:
          "https://plus.unsplash.com/premium_photo-1733306464128-d6b80ed2f2e2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGNsYXNzcm9vbSUyMGltYWdlfGVufDB8fDB8fHww",
        name: "Institute Name",
        rank: "#1 in Engineering",
        offeredCourses: [
          "Computer Science",
          "Electrical Engineering",
          "Mechanical Engineering",
        ],
        fees: "$10,000/year",
        discountEntranceTest: "20% off",
        typeOfExam: "Standardized Test",
        location: "New York, USA",
        studentSuccessRatio:
          "95% employment rate within 6 months of graduation",
      },
    ];

      const institute = institutes.find((I) => I.id === parseInt(id));
    
      useEffect(() => {
        window.scrollTo(0, 0);
      }, [institute]);
    
      if (!institute) {
        return <p className="text-center text-gray-600 mt-8">No data found.</p>;
      }
      

    return (
      <>
        <div className=" flex items-center justify-center bg-gray-100 relative">
          {institutes.map((institute) => (
            <div key={institute.id} className="w-full relative">
              <div
                className="w-full h-[70vh] bg-cover bg-center relative"
                style={{
                  backgroundImage: `url(${institute.image})`,
                }}
              >
                <div className="flex  justify-center">
                  <h1 className="mt-20 text-white text-4xl font-bold">
                    Institute Name
                  </h1>
                </div>
                <div className="absolute "></div>
              </div>

              <div className="absolute w-[95%] md:w-[85%] lg:w-[75%] xl:w-[70%] left-1/2 -translate-x-1/2 bottom-[-70px] bg-white shadow-lg rounded-lg p-8 flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-10">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {institute.name}
                  </h2>
                  <p className="text-sm text-gray-600">{institute.rank}</p>
                  <p className="text-gray-700 text-sm mt-2">
                    {institute.studentSuccessRatio}
                  </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-700">
                  <div className="p-3 bg-gray-100 rounded-md">
                    <span className="font-semibold">📍 Location:</span>{" "}
                    {institute.location}
                  </div>
                  <div className="p-3 bg-gray-100 rounded-md">
                    <span className="font-semibold">💰 Fees:</span>{" "}
                    {institute.fees}
                  </div>
                  <div className="p-3 bg-gray-100 rounded-md">
                    <span className="font-semibold">🎓 Exam:</span>{" "}
                    {institute.typeOfExam}
                  </div>
                  <div className="p-3 bg-gray-100 rounded-md">
                    <span className="font-semibold">🏷️ Discount:</span>{" "}
                    {institute.discountEntranceTest}
                  </div>
                  <div className="col-span-2 p-3 bg-gray-100 rounded-md">
                    <span className="font-semibold">📚 Courses:</span>{" "}
                    {institute.offeredCourses.join(", ")}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <CourseMultiCard />
      </>
    );
}

export default SingleInstitute;