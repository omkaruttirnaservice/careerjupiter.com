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
      return JSON.parse(result.data); // Parse the nested JSON string
    }
    throw new Error(result.errMsg || "Failed to fetch class details");
  };

const ImageGallery = () => {
  const { id } = useParams();
  
  const { data: institute, error, isLoading } = useQuery({
    queryKey: ["institute", id],
    queryFn: () => fetchInstitute(id),
  });
//   console.log( "institute images",institute)

  if (isLoading) {
    return <p className="text-center text-gray-600 mt-8">Loading images...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600 mt-8">Error: {error.message}</p>;
  }

  const images = institute?.class?.imageGallery || [];
  console.log( "institute images",images)

  if (!images.length) {
    return <p className="text-center text-gray-600 mt-8">No images available.</p>;
  }

  return (
    <section className="mt-10 p-4 bg-gray-50 rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Image Gallery</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((imageGallery, index) => (
          <motion.div 
            key={index}
            className="overflow-hidden rounded-lg shadow-lg"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <img 
              src={`${BASE_URL}${imageGallery}`} 
              alt={`Gallery Image ${index + 1}`} 
              className="w-full h-48 object-cover rounded-lg hover:scale-105 transition-transform duration-300" 
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ImageGallery;
