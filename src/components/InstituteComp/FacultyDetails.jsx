import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { BASE_URL } from "../../utils/constansts";

const fetchInstitute = async (id) => {
  const response = await fetch(`${BASE_URL}/api/class/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch class details");
  }
  const result = await response.json();
  if (result.success && result.data) {
    return (result.data);
  }
  throw new Error(result.errMsg || "Failed to fetch class details");
};

const FacultyDetails = () => {
  const { id } = useParams();
  
  const { data, institute, error, isLoading } = useQuery({
    queryKey: ["institute", id],
    queryFn: () => fetchInstitute(id),
  });

  

  const faculty = institute?.class?.faculty_Details || [];
  // const staf_profile = institute?.class?.staff_profile || [];
  // console.log("profile",staf_profile)
  console.log( " faculty details......",data.class.faculty_Details )


  return (
   <>
   {Array.isArray(faculty) && faculty.length > 0 && (
  <section className="mt-10 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg shadow-lg">
    <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Meet Our Faculty</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {faculty.map((member, index) => (
        <motion.div
          key={index}
          className="bg-white shadow-md rounded-2xl p-6 flex flex-col items-center text-center hover:shadow-2xl transition-shadow duration-300 relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.2 }}
          whileHover={{ scale: 1.05 }}
        >
          <div className="relative">
            <img
              src={`${BASE_URL}${member.staff_Profile}`}
              alt={member.name}
              className="w-28 h-28 rounded-full object-cover mb-4 border-4 border-indigo-300 shadow-lg"
            />
            <div className="absolute inset-0 bg-indigo-500 opacity-10 rounded-full"></div>
          </div>
          <h3 className="text-lg font-semibold text-gray-800">{member.staff_Name}</h3>
          <p className="text-gray-600 text-sm mt-1">{member.subject}</p>
          <p className="text-gray-500 text-xs mt-1">Experience: {member.experiences} years</p>
          <div className="mt-4 px-4 py-1 text-sm bg-indigo-100 text-indigo-700 rounded-full">Faculty Member</div>
        </motion.div>
      ))}
    </div>
  </section>
)}

   </>
  );
};

export default FacultyDetails;
