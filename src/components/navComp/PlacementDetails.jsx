import React from "react";

const PlacementDetails = () => {
  return (
    <div className="p-4 space-y-6">
      <div className="bg-blue-50 p-4 rounded-lg">
        <h1 className="text-2xl font-bold text-center">Placement Details</h1>
        <div className=" mt-4 flex flex-col md:flex-row justify-center items-center gap-4">
          <select className=" cursor-pointer w-full md:w-auto p-2 border rounded">
            <option>Year</option>
            <option>2022</option>
            <option>2023</option>
          </select>
          <select className=" cursor-pointer w-full md:w-auto p-2 border rounded">
            <option>Course</option>
            <option>Computer Science</option>
            <option>Electrical Engineering</option>
          </select>
          <select className=" cursor-pointer w-full md:w-auto p-2 border rounded">
            <option>Branch</option>
            <option>Main Campus</option>
            <option>Remote Campus</option>
          </select>
        </div>
      </div>
      <div className="bg-green-50 p-4 rounded-lg">
        <h2 className="text-xl font-semibold">Placement Statistics</h2>
        <div className="mt-2 space-y-2">
          <p>Average Package: $XX,XXX</p>
          <p>Highest Package: $XX,XXX</p>
          <p>Placement Rate: XX%</p>
        </div>
      </div>

      <div className="bg-yellow-50 p-4 rounded-lg">
        <h2 className="text-xl font-semibold">Top Recruiters</h2>
        <div className="mt-2 flex flex-wrap gap-4">
          <img src="company1.png" alt="Company 1" className="w-20 h-20" />
          <img src="company2.png" alt="Company 2" className="w-20 h-20" />
        </div>
      </div>

      <div className="bg-purple-50 p-4 rounded-lg">
        <h2 className="text-xl font-semibold">Placement Trends</h2>
        <div className="mt-2">
          <img
            src="trends-chart.png"
            alt="Placement Trends"
            className="w-full"
          />
        </div>
      </div>

      <div className="bg-red-50 p-4 rounded-lg">
        <h2 className="text-xl font-semibold">Placement Process</h2>
        <div className="mt-2 space-y-2">
          <p>1. Registration</p>
          <p>2. Pre-Placement Talk</p>
          <p>3. Written Test</p>
          <p>4. Interview</p>
          <p>5. Job Offer</p>
        </div>
      </div>

      <div className="bg-pink-50 p-4 rounded-lg">
        <h2 className="text-xl font-semibold">Student Testimonials</h2>
        <div className="mt-2 space-y-2">
          <p>"Great experience with the placement process!" - Student A</p>
          <p>"Very supportive staff and great opportunities." - Student B</p>
        </div>
      </div>
    </div>
  );
};

export default PlacementDetails;
