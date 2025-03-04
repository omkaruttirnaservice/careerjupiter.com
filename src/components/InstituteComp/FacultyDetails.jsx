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
    return JSON.parse(result.data);
  }
  throw new Error(result.errMsg || "Failed to fetch class details");
};

const FacultyDetails = () => {
  const { id } = useParams();
  
  const { data: institute, error, isLoading } = useQuery({
    queryKey: ["institute", id],
    queryFn: () => fetchInstitute(id),
  });

  if (isLoading) {
    return <p className="text-center text-gray-600 mt-8">Loading faculty details...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600 mt-8">Error: {error.message}</p>;
  }

  const faculty = institute?.class?.faculty_Details || [];
  console.log( " faculty details",faculty)

  if (!faculty.length) {
    return <p className="text-center text-gray-600 mt-8">No faculty details available.</p>;
  }

  return (
    <section className="mt-10 p-4 bg-gray-50 rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Faculty Members</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {faculty.map((member, index) => (
          <motion.div 
            key={index}
            className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <img 
              src={`${BASE_URL}${member.image}`} 
              alt={member.name} 
              className="w-24 h-24 rounded-full object-cover mb-4 border-2 border-gray-300" 
            />
            <h3 className="text-lg font-semibold">{member.staff_Name
            }</h3>
            <p className="text-gray-600 text-sm">{member.subject}</p>
            <p className="text-gray-500 text-xs">Experience: {member.experiences} years</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FacultyDetails;
