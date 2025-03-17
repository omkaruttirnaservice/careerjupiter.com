const Scholarship = () => {
  const scholarships = [
    {
      id: 1,
      title: 'STEM Excellence Scholarship',
      description: 'Supporting students pursuing degrees in Science, Technology, Engineering, and Mathematics.',
      eligibility: 'Open to undergraduate students pursuing STEM degrees.',
      amount: '$5,000',
      deadline: 'March 31, 2025',
      provider: 'National STEM Foundation',
      applicationLink: 'https://example.com/stem-scholarship'
    },
    {
      id: 2,
      title: 'Creative Arts Grant',
      description: 'Encouraging creativity and innovation in arts and design.',
      eligibility: 'Open to art and design students.',
      amount: '$3,000',
      deadline: 'April 15, 2025',
      provider: 'Creative Arts Council',
      applicationLink: 'https://example.com/arts-grant'
    },
    {
      id: 3,
      title: 'Future Leaders Award',
      description: 'Recognizing leadership potential and community impact.',
      eligibility: 'Open to students demonstrating leadership qualities.',
      amount: '$10,000',
      deadline: 'May 1, 2025',
      provider: 'Global Leaders Initiative',
      applicationLink: 'https://example.com/future-leaders'
    }
  ];

  return (
    <div className="bg-gradient-to-r from-blue-50 to-blue-100 min-h-screen p-8 w-full">
      <h1 className="text-4xl font-extrabold text-center mb-10 text-blue-700">Scholarship Opportunities</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {scholarships.map((scholarship) => (
          <div
            key={scholarship.id}
            className=" border-2 p-6 transform transition-transform hover:-translate-y-2 hover:shadow-3xl  w-full max-w-sm mx-auto"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-3">{scholarship.title}</h2>
            <p className="text-gray-700 mb-2">{scholarship.description}</p>
            <p className="text-gray-600 mb-1"><strong>Eligibility:</strong> {scholarship.eligibility}</p>
            <p className="text-gray-600 mb-1"><strong>Award Amount:</strong> {scholarship.amount}</p>
            <p className="text-gray-600 mb-1"><strong>Deadline:</strong> {scholarship.deadline}</p>
            <p className="text-gray-600 mb-4"><strong>Provider:</strong> {scholarship.provider}</p>
            <a
              href={scholarship.applicationLink}
              target="_blank"
              rel="noopener noreferrer"
              className=" bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors block text-center"
            >
              Apply Now
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Scholarship;
