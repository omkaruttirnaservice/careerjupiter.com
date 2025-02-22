import React from 'react';

const News = () => {
  const newsArticles = [
    {
      title: "University Hosts Annual Science Fair",
      date: "February 18, 2025",
      description:
        "The annual science fair at our university showcased groundbreaking student projects, bringing together students from different departments to present their innovative ideas and discoveries.",
      image:
        "https://media.istockphoto.com/id/1132367671/photo/science-fair-ideas.jpg?s=612x612&w=0&k=20&c=51_-UlgLlRtovSgFPvXBwvLg-WVj3m2d8FvzpDeURXs=",
    },
    {
      title: "New Student Housing Opens on Campus",
      date: "February 15, 2025",
      description:
        "The new student housing building offers modern amenities, eco-friendly features, and easy access to campus facilities, providing a comfortable living experience for students.",
      image:
        "https://media.istockphoto.com/id/1133247363/photo/modern-student-dormitory.jpg?s=612x612&w=0&k=20&c=foHnU3m4jvO2QZKzHrb18z1OHx8WqE9uA3_2dEpu4RY=",
    },
    {
      title: "College Hosts International Conference on AI",
      date: "February 10, 2025",
      description:
        "Our college hosted an international conference featuring leading AI researchers and experts from around the world. The event focused on the future of AI and its applications in various industries.",
      image:
        "https://media.istockphoto.com/id/1188673412/photo/modern-technology-concept.jpg?s=612x612&w=0&k=20&c=sk5oykIjI2HH2sTnK8hnvWrzRzV6jKk0ka53JfrvXMY=",
    },
  ];

  return (
    <div className="bg-gradient-to-r from-indigo-50 to-indigo-100 min-h-screen p-4 sm:p-8 w-full">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-center mb-6 sm:mb-10 text-indigo-700">
        Latest College News
      </h1>

      <div className="max-w-6xl mx-auto bg-blue-50  shadow-xl rounded-2xl p-4 sm:p-8">
        <h2 className="text-2xl sm:text-3xl font-semibold text-indigo-600 mb-4 sm:mb-6">Stay Updated</h2>
        <hr/>

        {newsArticles.map((article, index) => (
          <div
            key={index}
            className=""
          >
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center mb-3 sm:mb-4">
              <img
                src={article.image}
                alt={article.title}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover mb-3 sm:mb-0 sm:mr-6"
              />
              <div>
                <h3 className="text-xl sm:text-2xl font-semibold text-indigo-700">{article.title}</h3>
                <p className="text-sm text-gray-500">{article.date}</p>
              </div>
            </div>
            <p className="text-gray-700 text-sm sm:text-base">{article.description}</p>
            <hr/>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
