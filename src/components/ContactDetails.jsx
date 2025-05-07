import { FaPhoneAlt, FaEnvelope, FaGlobe, FaMapMarkerAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3
    }
  }
};

const ContactDetails = ({ college }) => {
//   console.log(college, 'collegessssssssssssssssssssssss');

  return (
    <motion.div
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* <motion.h2
        className="text-2xl font-bold text-gray-800"
        variants={itemVariants}
      >
        Contact Details
      </motion.h2> */}

      {/* 2-column grid layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ContactItem
          icon={<FaPhoneAlt className="mr-3 text-blue-600" />}
          content={college.contactDetails || "N/A"}
        />
        <ContactItem
          icon={<FaEnvelope className="mr-3 text-blue-600" />}
          content={college.email_id || "N/A"}
        />
        <ContactItem
          icon={<FaGlobe className="mr-3 text-blue-600" />}
          content={
            college.websiteURL ? (
              <a
                href={college.websiteURL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:text-indigo-800 font-medium underline"
              >
                {college.websiteURL}
              </a>
            ) : (
              "N/A"
            )
          }
        />
        <ContactItem
          icon={<FaMapMarkerAlt className="mr-3 text-blue-600" />}
          content={
            college.address?.[0] ? (
              <>
                {college.address[0].line1 && `${college.address[0].line1}, `}
                {college.address[0].line2 && `${college.address[0].line2}, `}
                {college.address[0].dist && `${college.address[0].dist}, `}
                {college.address[0].state && `${college.address[0].state}, `}
                {college.address[0].pincode && college.address[0].pincode}
              </>
            ) : (
              "N/A"
            )
          }
          
        />
        
      </div>

      {college.keywords?.length > 0 && (
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {college.keywords.map((keyword, index) => (
            <motion.span
              key={index}
              className="bg-gray-100 text-gray-800 text-xs font-medium px-3 py-1 rounded-full"
              whileHover={{ scale: 1.05, backgroundColor: "#EFF6FF", color: "#2563EB" }}
            >
              #{keyword}
            </motion.span>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};

// Reusable ContactItem sub-component
const ContactItem = ({ icon, content }) => (
  <motion.div
    className="bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow"
    variants={itemVariants}
    whileHover={{ x: 5 }}
  >
    <div className="flex items-center text-gray-800">
      {icon}
      <p className="font-medium">{content}</p>
    </div>
  </motion.div>
);

export default ContactDetails;
