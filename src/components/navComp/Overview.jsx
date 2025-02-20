import React from 'react';

const Overview = () => {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-blue-100 min-h-screen p-8 w-full">
      <h1 className="text-2xl font-extrabold text-center mb-10 text-blue-700">University Overview</h1>
      
      <div className="w-full border-2 shadow-xl rounded-2xl p-6">
        <h2 className="text-2xl font-semibold text-blue-600 mb-6">Our University</h2>
        <p className="text-gray-700 mb-6">
          Our university is committed to excellence in education, research, and community engagement. We offer a diverse range of programs across various disciplines, fostering an environment where students can thrive academically and socially. With state-of-the-art facilities and a dedicated faculty, we aim to inspire the leaders of tomorrow.
        </p>

        <h3 className="text-2xl font-semibold text-blue-600 mb-4">Our Mission</h3>
        <p className="text-gray-700 mb-4">
          The mission of our university is to provide a transformative education that equips students with the skills and knowledge to make a positive impact on society. We strive to foster a diverse and inclusive community that values creativity, innovation, and social responsibility.
        </p>

        <h3 className="text-2xl font-semibold text-blue-600 mb-4">Academic Excellence</h3>
        <p className="text-gray-700 mb-6">
          We offer a variety of programs ranging from undergraduate degrees to advanced graduate studies, with a strong focus on research and practical learning. Our faculty members are leaders in their fields, ensuring that students receive a world-class education. Our academic programs are designed to prepare students for success in their chosen careers.
        </p>

        <h3 className="text-2xl font-semibold text-blue-600 mb-4">Diversity & Inclusion</h3>
        <p className="text-gray-700 mb-6">
          Our university is a welcoming space for students of all backgrounds. We celebrate diversity and provide resources and support for students to succeed, regardless of their race, gender, or socioeconomic background. We are dedicated to building an inclusive environment where every student feels valued and respected.
        </p>

        <h3 className="text-2xl font-semibold text-blue-600 mb-4">Why Choose Us?</h3>
        <ul className="list-disc pl-6 text-gray-700">
          <li>World-class faculty and staff</li>
          <li>State-of-the-art research and learning facilities</li>
          <li>A diverse and vibrant student community</li>
          <li>Strong focus on employability and career development</li>
          <li>Located in a vibrant, dynamic city</li>
        </ul>
      </div>

      
    </div>
  );
};

export default Overview;
